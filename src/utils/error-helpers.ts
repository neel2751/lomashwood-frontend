/**
 * Error Helpers Utility
 * Provides functions for error handling, formatting, and user-friendly messages
 */

import { AxiosError } from 'axios';

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

/**
 * Custom application error class
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly severity: ErrorSeverity;
  public readonly isOperational: boolean;
  public readonly timestamp: Date;

  constructor(
    message: string,
    code: string = 'UNKNOWN_ERROR',
    statusCode: number = 500,
    severity: ErrorSeverity = ErrorSeverity.ERROR,
    isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.severity = severity;
    this.isOperational = isOperational;
    this.timestamp = new Date();

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Standard error codes
 */
export const ErrorCodes = {
  // Network errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  CONNECTION_ERROR: 'CONNECTION_ERROR',

  // Authentication errors
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',

  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',

  // Resource errors
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  RESOURCE_DELETED: 'RESOURCE_DELETED',

  // Business logic errors
  INSUFFICIENT_STOCK: 'INSUFFICIENT_STOCK',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  ORDER_PROCESSING_ERROR: 'ORDER_PROCESSING_ERROR',
  CART_ERROR: 'CART_ERROR',

  // Server errors
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  DATABASE_ERROR: 'DATABASE_ERROR',

  // Client errors
  BAD_REQUEST: 'BAD_REQUEST',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',

  // Unknown
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

// Type for error code values
export type ErrorCodeType = typeof ErrorCodes[keyof typeof ErrorCodes];

/**
 * User-friendly error messages
 */
export const ErrorMessages: Record<ErrorCodeType, string> = {
  // Network errors
  [ErrorCodes.NETWORK_ERROR]: 'Unable to connect to the server. Please check your internet connection.',
  [ErrorCodes.TIMEOUT_ERROR]: 'The request took too long. Please try again.',
  [ErrorCodes.CONNECTION_ERROR]: 'Connection failed. Please try again later.',

  // Authentication errors
  [ErrorCodes.UNAUTHORIZED]: 'You need to sign in to access this resource.',
  [ErrorCodes.FORBIDDEN]: "You don't have permission to access this resource.",
  [ErrorCodes.TOKEN_EXPIRED]: 'Your session has expired. Please sign in again.',
  [ErrorCodes.INVALID_CREDENTIALS]: 'Invalid email or password. Please try again.',

  // Validation errors
  [ErrorCodes.VALIDATION_ERROR]: 'Please check your input and try again.',
  [ErrorCodes.INVALID_INPUT]: 'The information provided is invalid.',
  [ErrorCodes.MISSING_REQUIRED_FIELD]: 'Please fill in all required fields.',

  // Resource errors
  [ErrorCodes.NOT_FOUND]: 'The requested resource was not found.',
  [ErrorCodes.ALREADY_EXISTS]: 'This resource already exists.',
  [ErrorCodes.RESOURCE_DELETED]: 'This resource has been deleted.',

  // Business logic errors
  [ErrorCodes.INSUFFICIENT_STOCK]: 'Sorry, this product is out of stock or has insufficient quantity.',
  [ErrorCodes.PAYMENT_FAILED]: 'Payment could not be processed. Please try again or use a different payment method.',
  [ErrorCodes.ORDER_PROCESSING_ERROR]: 'Unable to process your order. Please try again.',
  [ErrorCodes.CART_ERROR]: 'There was an error with your cart. Please try again.',

  // Server errors
  [ErrorCodes.INTERNAL_SERVER_ERROR]: 'Something went wrong on our end. Please try again later.',
  [ErrorCodes.SERVICE_UNAVAILABLE]: 'Service is temporarily unavailable. Please try again later.',
  [ErrorCodes.DATABASE_ERROR]: 'Unable to process your request. Please try again.',

  // Client errors
  [ErrorCodes.BAD_REQUEST]: 'Invalid request. Please check your input.',
  [ErrorCodes.RATE_LIMIT_EXCEEDED]: 'Too many requests. Please wait a moment and try again.',

  // Unknown
  [ErrorCodes.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again.',
};

/**
 * API Error Response interface
 */
interface ApiErrorResponse {
  message?: string;
  error?: string;
  code?: string;
  errorCode?: string;
  [key: string]: any;
}

/**
 * Checks if error is an Axios error
 */
export function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError === true;
}

/**
 * Checks if error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Gets error message from various error types
 */
export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null) {
    const errorObj = error as Record<string, any>;
    if ('message' in errorObj && typeof errorObj.message === 'string') {
      return errorObj.message;
    }
    if ('error' in errorObj && typeof errorObj.error === 'string') {
      return errorObj.error;
    }
  }

  return ErrorMessages[ErrorCodes.UNKNOWN_ERROR];
}

/**
 * Gets error code from various error types
 */
export function getErrorCode(error: unknown): ErrorCodeType {
  if (isAppError(error)) {
    return error.code as ErrorCodeType;
  }

  if (isAxiosError(error)) {
    return (error.code as ErrorCodeType) || ErrorCodes.NETWORK_ERROR;
  }

  return ErrorCodes.UNKNOWN_ERROR;
}

/**
 * Parses API error response
 */
export function parseApiError(error: unknown): {
  message: string;
  code: ErrorCodeType;
  statusCode: number;
  details?: Record<string, unknown>;
} {
  // Axios error
  if (isAxiosError(error)) {
    const statusCode = error.response?.status || 500;
    const data = error.response?.data as ApiErrorResponse | undefined;

    // Try to extract error message from response
    let message = ErrorMessages[ErrorCodes.UNKNOWN_ERROR];
    let code: ErrorCodeType = ErrorCodes.UNKNOWN_ERROR;

    if (data) {
      if (typeof data === 'string') {
        message = data;
      } else if (typeof data === 'object') {
        message = data.message || data.error || message;
        const dataCode = data.code || data.errorCode;
        if (dataCode && isValidErrorCode(dataCode)) {
          code = dataCode;
        }
      }
    }

    // Map status codes to error codes
    if (!data?.code) {
      code = mapStatusCodeToErrorCode(statusCode);
    }

    return {
      message: message || ErrorMessages[code],
      code,
      statusCode,
      details: typeof data === 'object' ? data : undefined,
    };
  }

  // AppError
  if (isAppError(error)) {
    return {
      message: error.message,
      code: error.code as ErrorCodeType,
      statusCode: error.statusCode,
    };
  }

  // Generic error
  return {
    message: getErrorMessage(error),
    code: ErrorCodes.UNKNOWN_ERROR,
    statusCode: 500,
  };
}

/**
 * Type guard to check if a string is a valid error code
 */
function isValidErrorCode(code: string): code is ErrorCodeType {
  return Object.values(ErrorCodes).includes(code as ErrorCodeType);
}

/**
 * Maps HTTP status codes to error codes
 */
export function mapStatusCodeToErrorCode(statusCode: number): ErrorCodeType {
  switch (statusCode) {
    case 400:
      return ErrorCodes.BAD_REQUEST;
    case 401:
      return ErrorCodes.UNAUTHORIZED;
    case 403:
      return ErrorCodes.FORBIDDEN;
    case 404:
      return ErrorCodes.NOT_FOUND;
    case 409:
      return ErrorCodes.ALREADY_EXISTS;
    case 422:
      return ErrorCodes.VALIDATION_ERROR;
    case 429:
      return ErrorCodes.RATE_LIMIT_EXCEEDED;
    case 500:
      return ErrorCodes.INTERNAL_SERVER_ERROR;
    case 503:
      return ErrorCodes.SERVICE_UNAVAILABLE;
    default:
      return ErrorCodes.UNKNOWN_ERROR;
  }
}

/**
 * Gets user-friendly error message
 */
export function getUserFriendlyError(error: unknown): string {
  const parsed = parseApiError(error);
  return ErrorMessages[parsed.code] || parsed.message || ErrorMessages[ErrorCodes.UNKNOWN_ERROR];
}

/**
 * Formats validation errors
 */
export function formatValidationErrors(
  errors: Record<string, string | string[]>
): Record<string, string> {
  const formatted: Record<string, string> = {};

  Object.entries(errors).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      formatted[key] = value[0]; // Take first error
    } else {
      formatted[key] = value;
    }
  });

  return formatted;
}

/**
 * Logs error to console (development) or error tracking service (production)
 */
export function logError(error: unknown, context?: Record<string, unknown>): void {
  const parsed = parseApiError(error);
  
  const errorInfo = {
    message: parsed.message,
    code: parsed.code,
    statusCode: parsed.statusCode,
    timestamp: new Date().toISOString(),
    context,
    stack: error instanceof Error ? error.stack : undefined,
  };

  if (process.env.NODE_ENV === 'development') {
    console.error('Error occurred:', errorInfo);
  } else {
    // In production, you would send this to an error tracking service
    // e.g., Sentry, LogRocket, etc.
    console.error('Error:', errorInfo.message);
  }
}

/**
 * Checks if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (isAxiosError(error)) {
    return !error.response && !!error.request;
  }
  
  const code = getErrorCode(error);
  const networkErrors: ErrorCodeType[] = [
    ErrorCodes.NETWORK_ERROR,
    ErrorCodes.TIMEOUT_ERROR,
    ErrorCodes.CONNECTION_ERROR,
  ];
  return networkErrors.includes(code);
}

/**
 * Checks if error is a validation error
 */
export function isValidationError(error: unknown): boolean {
  if (isAxiosError(error)) {
    return error.response?.status === 422;
  }
  
  const code = getErrorCode(error);
  const validationErrors: ErrorCodeType[] = [
    ErrorCodes.VALIDATION_ERROR,
    ErrorCodes.INVALID_INPUT,
    ErrorCodes.MISSING_REQUIRED_FIELD,
  ];
  return validationErrors.includes(code);
}

/**
 * Checks if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    return status === 401 || status === 403;
  }
  
  const code = getErrorCode(error);
  const authErrors: ErrorCodeType[] = [
    ErrorCodes.UNAUTHORIZED,
    ErrorCodes.FORBIDDEN,
    ErrorCodes.TOKEN_EXPIRED,
    ErrorCodes.INVALID_CREDENTIALS,
  ];
  return authErrors.includes(code);
}

/**
 * Checks if error is retryable
 */
export function isRetryableError(error: unknown): boolean {
  const code = getErrorCode(error);
  
  if (isAxiosError(error)) {
    const status = error.response?.status;
    // Retry on network errors and 5xx server errors
    return !status || status >= 500;
  }
  
  const retryableErrors: ErrorCodeType[] = [
    ErrorCodes.NETWORK_ERROR,
    ErrorCodes.TIMEOUT_ERROR,
    ErrorCodes.CONNECTION_ERROR,
    ErrorCodes.INTERNAL_SERVER_ERROR,
    ErrorCodes.SERVICE_UNAVAILABLE,
  ];
  return retryableErrors.includes(code);
}

/**
 * Creates a standardized error response
 */
export function createErrorResponse(
  message: string,
  code: ErrorCodeType = ErrorCodes.UNKNOWN_ERROR,
  details?: Record<string, unknown>
) {
  return {
    success: false,
    error: {
      message,
      code,
      timestamp: new Date().toISOString(),
      details,
    },
  };
}

/**
 * Safely executes an async function and returns result or error
 */
export async function safeAsync<T>(
  fn: () => Promise<T>
): Promise<[T | null, Error | null]> {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
}

/**
 * Retries an async function with exponential backoff
 */
export async function retryAsync<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    backoffMultiplier?: number;
    shouldRetry?: (error: unknown) => boolean;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffMultiplier = 2,
    shouldRetry = isRetryableError,
  } = options;

  let lastError: unknown;
  let delay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries || !shouldRetry(error)) {
        throw error;
      }

      // Wait before retry with exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay = Math.min(delay * backoffMultiplier, maxDelay);
    }
  }

  throw lastError;
}

/**
 * Error boundary helper for catching and handling errors
 */
export function withErrorBoundary<T extends (...args: any[]) => any>(
  fn: T,
  errorHandler?: (error: unknown, ...args: Parameters<T>) => void
): T {
  return ((...args: Parameters<T>) => {
    try {
      const result = fn(...args);
      
      // Handle async functions
      if (result instanceof Promise) {
        return result.catch((error) => {
          if (errorHandler) {
            errorHandler(error, ...args);
          }
          logError(error, { function: fn.name, args });
          throw error;
        });
      }
      
      return result;
    } catch (error) {
      if (errorHandler) {
        errorHandler(error, ...args);
      }
      logError(error, { function: fn.name, args });
      throw error;
    }
  }) as T;
}

/**
 * Type guard for checking if value is an Error
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/**
 * Aggregates multiple errors into a single error message
 */
export function aggregateErrors(errors: unknown[]): string {
  const messages = errors
    .map((error) => getErrorMessage(error))
    .filter(Boolean);
  
  if (messages.length === 0) {
    return ErrorMessages[ErrorCodes.UNKNOWN_ERROR];
  }
  
  if (messages.length === 1) {
    return messages[0];
  }
  
  return `Multiple errors occurred: ${messages.join('; ')}`;
}

/**
 * Error notification helper for toast messages
 */
export interface ErrorNotification {
  title: string;
  message: string;
  duration?: number;
}

export function getErrorNotification(error: unknown): ErrorNotification {
  const parsed = parseApiError(error);
  
  let title = 'Error';
  
  if (isAuthError(error)) {
    title = 'Authentication Error';
  } else if (isValidationError(error)) {
    title = 'Validation Error';
  } else if (isNetworkError(error)) {
    title = 'Connection Error';
  }
  
  return {
    title,
    message: ErrorMessages[parsed.code] || parsed.message,
    duration: 5000,
  };
}