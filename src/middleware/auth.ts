import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = [
  '/my-account',
  '/my-account/profile',
  '/my-account/orders',
  '/my-account/appointments',
  '/my-account/wishlist',
  '/my-account/saved-designs',
  '/my-account/settings',
];

const authRoutes = [
  '/login',
  '/register',
];

const protectedApiRoutes = [
  '/api/user',
  '/api/orders',
  '/api/appointments',
  '/api/wishlist',
  '/api/designs',
];

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
}

function isAuthRoute(pathname: string): boolean {
  return authRoutes.some(route => pathname === route);
}

function isProtectedApiRoute(pathname: string): boolean {
  return protectedApiRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
}

async function validateAuth(request: NextRequest): Promise<boolean> {

  const authToken = request.cookies.get('auth-token')?.value;
  const sessionId = request.cookies.get('session-id')?.value;

  if (!authToken && !sessionId) {
    return false;
  }

  if (authToken) {
    try {

      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }

  return false;
}

async function getUserFromAuth(request: NextRequest): Promise<any | null> {
  const authToken = request.cookies.get('auth-token')?.value;
  
  if (!authToken) {
    return null;
  }

  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/health') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const isAuthenticated = await validateAuth(request);

  if (isProtectedRoute(pathname)) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      
      return NextResponse.redirect(loginUrl);
    }

    const response = NextResponse.next();

    const user = await getUserFromAuth(request);
    if (user) {
      response.headers.set('x-user-id', user.id || '');
    }
    
    return response;
  }

  if (isAuthRoute(pathname) && isAuthenticated) {
    const redirectUrl = request.nextUrl.searchParams.get('redirect');
    const destination = redirectUrl || '/my-account';
    
    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (isProtectedApiRoute(pathname)) {
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 }
      );
    }

    const response = NextResponse.next();
    const user = await getUserFromAuth(request);
    if (user) {
      response.headers.set('x-user-id', user.id || '');
      response.headers.set('x-user-email', user.email || '');
    }
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [

    '/((?!_next/static|_next/image|favicon.ico|images|fonts|.*\\..*|api/health).*)',
  ],
};

export async function getCurrentUser() {

  return null;
}


export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('Authentication required');
  }
  
  return user;
}

export async function hasPermission(permission: string): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user) {
    return false;
  }

  console.log(`Permission check requested for: ${permission}`);
  
  return false;
}