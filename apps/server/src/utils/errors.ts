import { TRPCError } from '@trpc/server'
import { ApiErrorCodes, type ApiErrorCode } from '@claude-builder/shared'

/**
 * Application Error Classes
 *
 * Provides structured error handling with:
 * - Type-safe error codes from shared package
 * - Automatic mapping to tRPC error types
 * - Detailed error context for debugging
 * - User-friendly error messages
 */

/**
 * Base application error with structured error codes.
 */
export class AppError extends Error {
  constructor(
    public readonly code: ApiErrorCode,
    message: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'AppError'
    Error.captureStackTrace?.(this, this.constructor)
  }

  /**
   * Converts to a plain object for logging/serialization.
   */
  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      details: this.details,
    }
  }
}

/**
 * Error for missing or invalid API credentials.
 */
export class CredentialsError extends AppError {
  constructor(
    message: string,
    code: ApiErrorCode = ApiErrorCodes.CREDENTIALS_NOT_CONFIGURED
  ) {
    super(code, message)
    this.name = 'CredentialsError'
  }
}

/**
 * Error for resource not found scenarios.
 */
export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    super(
      ApiErrorCodes.NOT_FOUND,
      id ? `${resource} with ID '${id}' not found` : `${resource} not found`,
      { resource, id }
    )
    this.name = 'NotFoundError'
  }
}

/**
 * Error for validation failures.
 */
export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(ApiErrorCodes.VALIDATION_ERROR, message, details)
    this.name = 'ValidationError'
  }
}

/**
 * Error for encryption/decryption failures.
 */
export class EncryptionError extends AppError {
  constructor(message: string) {
    super(ApiErrorCodes.ENCRYPTION_ERROR, message)
    this.name = 'EncryptionError'
  }
}

/**
 * Error for rate limiting scenarios.
 */
export class RateLimitError extends AppError {
  constructor(
    message: string = 'Rate limit exceeded. Please wait before retrying.',
    public readonly retryAfterMs?: number
  ) {
    super(ApiErrorCodes.RATE_LIMITED, message, { retryAfterMs })
    this.name = 'RateLimitError'
  }
}

/**
 * Error for external API failures.
 */
export class ApiUnavailableError extends AppError {
  constructor(provider: string, originalError?: Error) {
    super(
      ApiErrorCodes.API_UNAVAILABLE,
      `${provider} API is currently unavailable`,
      { provider, originalError: originalError?.message }
    )
    this.name = 'ApiUnavailableError'
  }
}

/**
 * Maps tRPC error codes from our AppError codes.
 */
const ERROR_CODE_TO_TRPC: Record<
  ApiErrorCode,
  TRPCError['code']
> = {
  [ApiErrorCodes.UNAUTHORIZED]: 'UNAUTHORIZED',
  [ApiErrorCodes.FORBIDDEN]: 'FORBIDDEN',
  [ApiErrorCodes.NOT_FOUND]: 'NOT_FOUND',
  [ApiErrorCodes.ALREADY_EXISTS]: 'CONFLICT',
  [ApiErrorCodes.VALIDATION_ERROR]: 'BAD_REQUEST',
  [ApiErrorCodes.INVALID_INPUT]: 'BAD_REQUEST',
  [ApiErrorCodes.CREDENTIALS_NOT_CONFIGURED]: 'PRECONDITION_FAILED',
  [ApiErrorCodes.CREDENTIALS_INVALID]: 'UNAUTHORIZED',
  [ApiErrorCodes.RATE_LIMITED]: 'TOO_MANY_REQUESTS',
  [ApiErrorCodes.API_UNAVAILABLE]: 'INTERNAL_SERVER_ERROR',
  [ApiErrorCodes.TIMEOUT]: 'TIMEOUT',
  [ApiErrorCodes.INTERNAL_ERROR]: 'INTERNAL_SERVER_ERROR',
  [ApiErrorCodes.ENCRYPTION_ERROR]: 'INTERNAL_SERVER_ERROR',
}

/**
 * Converts an AppError to a TRPCError for proper client handling.
 *
 * @example
 * throw toTRPCError(new NotFoundError('Skill', skillId))
 */
export function toTRPCError(error: AppError): TRPCError {
  const trpcCode = ERROR_CODE_TO_TRPC[error.code] ?? 'INTERNAL_SERVER_ERROR'

  return new TRPCError({
    code: trpcCode,
    message: error.message,
    cause: error,
  })
}

/**
 * Handles any error and converts it to a TRPCError.
 * Use this in catch blocks to ensure consistent error responses.
 *
 * @example
 * try {
 *   await someOperation()
 * } catch (error) {
 *   throw handleError(error)
 * }
 */
export function handleError(error: unknown): TRPCError {
  // Already a TRPCError - pass through
  if (error instanceof TRPCError) {
    return error
  }

  // Our custom AppError - convert to TRPCError
  if (error instanceof AppError) {
    return toTRPCError(error)
  }

  // Standard Error - wrap as internal error
  if (error instanceof Error) {
    return new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: error.message,
      cause: error,
    })
  }

  // Unknown error type
  return new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred',
    cause: error,
  })
}

/**
 * Type guard to check if an error is a specific AppError type.
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

/**
 * Type guard to check if error has a specific error code.
 */
export function hasErrorCode(
  error: unknown,
  code: ApiErrorCode
): error is AppError {
  return isAppError(error) && error.code === code
}
