import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

const CORS_CONFIG = {
  allowedOrigins: [
    'https://lomashwood.com',
    'https://www.lomashwood.com',
    'http://localhost:3000',
    'http://localhost:3001',
  ],

  allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-API-Key',
    'X-CSRF-Token',
  ],

  exposedHeaders: [
    'X-Total-Count',
    'X-Page-Count',
    'X-Rate-Limit-Limit',
    'X-Rate-Limit-Remaining',
    'X-Rate-Limit-Reset',
  ],
  
  credentials: true,

  maxAge: 3600,
};

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT_CONFIG = {

  maxRequests: 100,

  windowMs: 15 * 60 * 1000,

  message: 'Too many requests, please try again later.',
};

function applyCorsHeaders(
  request: NextRequest,
  response: NextResponse
): NextResponse {
  const origin = request.headers.get('origin');

  const isAllowedOrigin = origin && (
    CORS_CONFIG.allowedOrigins.includes(origin) ||
    CORS_CONFIG.allowedOrigins.includes('*')
  );
  
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  
  response.headers.set(
    'Access-Control-Allow-Methods',
    CORS_CONFIG.allowedMethods.join(', ')
  );
  
  response.headers.set(
    'Access-Control-Allow-Headers',
    CORS_CONFIG.allowedHeaders.join(', ')
  );
  
  response.headers.set(
    'Access-Control-Expose-Headers',
    CORS_CONFIG.exposedHeaders.join(', ')
  );
  
  if (CORS_CONFIG.credentials) {
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  
  response.headers.set(
    'Access-Control-Max-Age',
    CORS_CONFIG.maxAge.toString()
  );
  
  return response;
}

function handlePreflight(request: NextRequest): NextResponse {
  const response = new NextResponse(null, { status: 204 });
  return applyCorsHeaders(request, response);
}

function checkRateLimit(request: NextRequest): NextResponse | null {
  const clientId = 
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'anonymous';
  
  const now = Date.now();
  const entry = rateLimitStore.get(clientId);

  if (rateLimitStore.size > 10000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetAt < now) {
        rateLimitStore.delete(key);
      }
    }
  }
  
  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(clientId, {
      count: 1,
      resetAt: now + RATE_LIMIT_CONFIG.windowMs,
    });
    
    return null;
  }

  entry.count++;

  if (entry.count > RATE_LIMIT_CONFIG.maxRequests) {
    const response = NextResponse.json(
      {
        error: 'Rate Limit Exceeded',
        message: RATE_LIMIT_CONFIG.message,
        retryAfter: Math.ceil((entry.resetAt - now) / 1000),
      },
      { status: 429 }
    );

    response.headers.set('X-Rate-Limit-Limit', RATE_LIMIT_CONFIG.maxRequests.toString());
    response.headers.set('X-Rate-Limit-Remaining', '0');
    response.headers.set('X-Rate-Limit-Reset', entry.resetAt.toString());
    response.headers.set('Retry-After', Math.ceil((entry.resetAt - now) / 1000).toString());
    
    return response;
  }

  return null;
}

function addRateLimitHeaders(request: NextRequest, response: NextResponse): void {
  const clientId = 
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'anonymous';
  
  const entry = rateLimitStore.get(clientId);
  
  if (entry) {
    const remaining = Math.max(0, RATE_LIMIT_CONFIG.maxRequests - entry.count);
    
    response.headers.set('X-Rate-Limit-Limit', RATE_LIMIT_CONFIG.maxRequests.toString());
    response.headers.set('X-Rate-Limit-Remaining', remaining.toString());
    response.headers.set('X-Rate-Limit-Reset', entry.resetAt.toString());
  }
}

function validateRequest(request: NextRequest): NextResponse | null {

  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    const contentType = request.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        {
          error: 'Invalid Content-Type',
          message: 'Content-Type must be application/json',
        },
        { status: 415 }
      );
    }
  }

  
  return null;
}

function logRequest(request: NextRequest): void {
  const timestamp = new Date().toISOString();
  const method = request.method;
  const url = request.url;
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip} - UA: ${userAgent}`);
}

function handleError(error: any): NextResponse {
  console.error('API Error:', error);

  return NextResponse.json(
    {
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
    },
    { status: 500 }
  );
}

function addSecurityHeaders(response: NextResponse): void {

  response.headers.set('X-Frame-Options', 'DENY');
  
  response.headers.set('X-Content-Type-Options', 'nosniff');

  response.headers.set('X-XSS-Protection', '1; mode=block');

  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  response.headers.set('Content-Security-Policy', "default-src 'none'");

  response.headers.delete('X-Powered-By');
}

function addVersionHeader(response: NextResponse): void {
  response.headers.set('X-API-Version', 'v1');
}

export async function apiMiddleware(request: NextRequest): Promise<NextResponse> {
  try {
    logRequest(request);

    if (request.method === 'OPTIONS') {
      return handlePreflight(request);
    }

    const validationError = validateRequest(request);
    if (validationError) {
      return applyCorsHeaders(request, validationError);
    }

    const rateLimitError = checkRateLimit(request);
    if (rateLimitError) {
      return applyCorsHeaders(request, rateLimitError);
    }

    const response = NextResponse.next();

    applyCorsHeaders(request, response);

    addRateLimitHeaders(request, response);

    addSecurityHeaders(response);

    addVersionHeader(response);
    
    return response;
    
  } catch (error) {
    return handleError(error);
  }
}

export const apiConfig = {
  matcher: '/api/:path*',
};

export function createApiResponse<T = any>(
  data: T,
  options?: {
    status?: number;
    message?: string;
    meta?: Record<string, any>;
  }
): NextResponse {
  const response = {
    success: true,
    data,
    ...(options?.message && { message: options.message }),
    ...(options?.meta && { meta: options.meta }),
  };
  
  return NextResponse.json(response, {
    status: options?.status || 200,
  });
}

export function createApiError(
  message: string,
  options?: {
    status?: number;
    code?: string;
    details?: any;
  }
): NextResponse {
  const response = {
    success: false,
    error: {
      message,
      code: options?.code || 'UNKNOWN_ERROR',
      ...(options?.details && { details: options.details }),
    },
  };
  
  return NextResponse.json(response, {
    status: options?.status || 400,
  });
}

export function paginateResults<T>(
  items: T[],
  page: number = 1,
  limit: number = 10
): {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
} {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return {
    data: items.slice(start, end),
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

export function parsePaginationParams(request: NextRequest): {
  page: number;
  limit: number;
} {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = parseInt(url.searchParams.get('limit') || '10', 10);
  
  return {
    page: Math.max(1, page),
    limit: Math.min(100, Math.max(1, limit)), // Cap at 100 items per page
  };
}

export async function validateRequiredFields(
  request: NextRequest,
  requiredFields: string[]
): Promise<{ valid: boolean; error?: NextResponse; data?: any }> {
  try {
    const body = await request.json();
    
    const missingFields = requiredFields.filter(field => !(field in body));
    
    if (missingFields.length > 0) {
      return {
        valid: false,
        error: createApiError(
          `Missing required fields: ${missingFields.join(', ')}`,
          { status: 400, code: 'MISSING_FIELDS', details: { missingFields } }
        ),
      };
    }
    
    return { valid: true, data: body };
  } catch (error) {
    return {
      valid: false,
      error: createApiError(
        'Invalid JSON in request body',
        { status: 400, code: 'INVALID_JSON' }
      ),
    };
  }
}