// Generic API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ApiError;
  meta?: ResponseMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  field?: string;
  timestamp?: Date;
}

export interface ResponseMeta {
  timestamp: Date;
  requestId?: string;
  version?: string;
}

// Paginated Response Types
export interface PaginatedResponse<T = unknown> {
  success: boolean;
  data: T[];
  pagination: PaginationMeta;
  message?: string;
  error?: ApiError;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

// API Request Types
export interface ApiRequestConfig {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  data?: unknown;
  timeout?: number;
  withCredentials?: boolean;
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

// Query Parameters
export interface QueryParams {
  search?: string;
  sort?: string;
  order?: SortOrder;
  page?: number;
  limit?: number;
  filters?: Record<string, unknown>;
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

// Filter Types
export interface FilterParams {
  field: string;
  operator: FilterOperator;
  value: string | number | boolean | Date | (string | number)[];
}

export enum FilterOperator {
  EQUALS = "eq",
  NOT_EQUALS = "ne",
  GREATER_THAN = "gt",
  GREATER_THAN_EQUAL = "gte",
  LESS_THAN = "lt",
  LESS_THAN_EQUAL = "lte",
  CONTAINS = "contains",
  STARTS_WITH = "startsWith",
  ENDS_WITH = "endsWith",
  IN = "in",
  NOT_IN = "notIn",
  BETWEEN = "between",
}

// API Error Types
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    statusCode: number;
    errors?: ValidationError[];
    stack?: string;
  };
  meta?: ResponseMeta;
}

// HTTP Status Codes
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

// Error Codes
export enum ApiErrorCode {
  // Authentication Errors
  UNAUTHORIZED = "UNAUTHORIZED",
  INVALID_TOKEN = "INVALID_TOKEN",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  
  // Authorization Errors
  FORBIDDEN = "FORBIDDEN",
  INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS",
  
  // Validation Errors
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INVALID_INPUT = "INVALID_INPUT",
  MISSING_REQUIRED_FIELD = "MISSING_REQUIRED_FIELD",
  
  // Resource Errors
  NOT_FOUND = "NOT_FOUND",
  ALREADY_EXISTS = "ALREADY_EXISTS",
  CONFLICT = "CONFLICT",
  
  // Server Errors
  INTERNAL_ERROR = "INTERNAL_ERROR",
  DATABASE_ERROR = "DATABASE_ERROR",
  EXTERNAL_SERVICE_ERROR = "EXTERNAL_SERVICE_ERROR",
  
  // Rate Limiting
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
  
  // Business Logic Errors
  INSUFFICIENT_STOCK = "INSUFFICIENT_STOCK",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  INVALID_OPERATION = "INVALID_OPERATION",
}

// Upload Types
export interface FileUploadResponse {
  success: boolean;
  data: {
    url: string;
    filename: string;
    size: number;
    mimeType: string;
    uploadedAt: Date;
  };
  error?: ApiError;
}

export interface MultipleFileUploadResponse {
  success: boolean;
  data: {
    files: {
      url: string;
      filename: string;
      size: number;
      mimeType: string;
    }[];
    totalSize: number;
  };
  error?: ApiError;
}

// Batch Operations
export interface BatchRequest<T = unknown> {
  operations: BatchOperation<T>[];
}

export interface BatchOperation<T = unknown> {
  method: HttpMethod;
  endpoint: string;
  data?: T;
}

export interface BatchResponse<T = unknown> {
  success: boolean;
  results: BatchOperationResult<T>[];
  meta?: {
    totalOperations: number;
    successfulOperations: number;
    failedOperations: number;
  };
}

export interface BatchOperationResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

// API Health Check
export interface HealthCheckResponse {
  status: HealthStatus;
  timestamp: Date;
  uptime: number;
  services: {
    database: ServiceStatus;
    cache: ServiceStatus;
    storage: ServiceStatus;
    email: ServiceStatus;
    payment?: ServiceStatus;
  };
  version: string;
}

export enum HealthStatus {
  HEALTHY = "healthy",
  DEGRADED = "degraded",
  UNHEALTHY = "unhealthy",
}

export enum ServiceStatus {
  UP = "up",
  DOWN = "down",
  DEGRADED = "degraded",
}

// Rate Limiting
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: Date;
  retryAfter?: number;
}

// API Versioning
export interface ApiVersion {
  version: string;
  releaseDate: Date;
  deprecated?: boolean;
  deprecationDate?: Date;
  sunsetDate?: Date;
  changelog?: string;
}

// Webhook Types
export interface WebhookPayload<T = unknown> {
  id: string;
  event: string;
  timestamp: Date;
  data: T;
  signature?: string;
}

export interface WebhookResponse {
  success: boolean;
  message?: string;
  processedAt: Date;
}

// Search Types
export interface SearchRequest {
  query: string;
  filters?: FilterParams[];
  facets?: string[];
  page?: number;
  limit?: number;
  sort?: {
    field: string;
    order: SortOrder;
  };
}

export interface SearchResponse<T = unknown> {
  success: boolean;
  data: {
    results: T[];
    facets?: SearchFacet[];
    suggestions?: string[];
    totalResults: number;
  };
  pagination: PaginationMeta;
}

export interface SearchFacet {
  field: string;
  values: {
    value: string;
    count: number;
  }[];
}

// Export/Import Types
export interface ExportRequest {
  format: ExportFormat;
  filters?: FilterParams[];
  fields?: string[];
}

export enum ExportFormat {
  CSV = "csv",
  EXCEL = "excel",
  JSON = "json",
  PDF = "pdf",
}

export interface ExportResponse {
  success: boolean;
  data: {
    downloadUrl: string;
    filename: string;
    format: ExportFormat;
    size: number;
    expiresAt: Date;
  };
}

export interface ImportRequest {
  file: File;
  format: ExportFormat;
  options?: {
    skipHeader?: boolean;
    delimiter?: string;
    encoding?: string;
  };
}

export interface ImportResponse {
  success: boolean;
  data: {
    imported: number;
    failed: number;
    errors?: {
      row: number;
      error: string;
    }[];
  };
}

// Cache Types
export interface CacheConfig {
  ttl?: number; // Time to live in seconds
  key?: string;
  tags?: string[];
  revalidate?: boolean;
}

// API Key Types
export interface ApiKey {
  key: string;
  name: string;
  permissions: string[];
  createdAt: Date;
  expiresAt?: Date;
  lastUsedAt?: Date;
  isActive: boolean;
}

// Audit Log Types
export interface AuditLog {
  id: string;
  action: string;
  resource: string;
  resourceId: string;
  userId: string;
  userName: string;
  changes?: Record<string, { old: unknown; new: unknown }>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

// Generic CRUD Response Types
export type CreateResponse<T> = ApiResponse<T>;
export type UpdateResponse<T> = ApiResponse<T>;
export type DeleteResponse = ApiResponse<{ deleted: boolean; deletedAt: Date }>;
export type GetResponse<T> = ApiResponse<T>;
export type ListResponse<T> = PaginatedResponse<T>;

// Type Guards
export function isApiError(response: unknown): response is ApiErrorResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    response.success === false &&
    "error" in response
  );
}

export function isPaginatedResponse<T>(
  response: unknown
): response is PaginatedResponse<T> {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    "data" in response &&
    "pagination" in response &&
    Array.isArray((response as PaginatedResponse<T>).data)
  );
}