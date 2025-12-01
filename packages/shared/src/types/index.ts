/**
 * Shared TypeScript Types
 *
 * Re-exports all types from schemas for convenient imports.
 * Also includes additional utility types.
 */

// Re-export all schema types
export * from '../schemas/skill.schema'
export * from '../schemas/credential.schema'
export * from '../schemas/chat.schema'

// ============================================
// UTILITY TYPES
// ============================================

/**
 * Result type for operations that can fail
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E }

/**
 * Pagination parameters
 */
export interface PaginationParams {
  limit: number
  offset: number
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

/**
 * Sort parameters
 */
export interface SortParams<T extends string = string> {
  sortBy: T
  sortOrder: 'asc' | 'desc'
}

// ============================================
// APP SETTINGS TYPES
// ============================================

export interface AppSettingsMap {
  activeProvider: 'bedrock' | 'openrouter' | null
  editorTheme: 'vs-dark' | 'vs-light' | 'hc-black'
  autoSaveEnabled: boolean
  autoSaveIntervalMs: number
}

export type AppSettingKey = keyof AppSettingsMap

// ============================================
// API ERROR TYPES
// ============================================

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}

export const ApiErrorCodes = {
  // Authentication/Authorization
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',

  // Resource errors
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',

  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',

  // API provider errors
  CREDENTIALS_NOT_CONFIGURED: 'CREDENTIALS_NOT_CONFIGURED',
  CREDENTIALS_INVALID: 'CREDENTIALS_INVALID',
  RATE_LIMITED: 'RATE_LIMITED',
  API_UNAVAILABLE: 'API_UNAVAILABLE',
  TIMEOUT: 'TIMEOUT',

  // Internal errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  ENCRYPTION_ERROR: 'ENCRYPTION_ERROR',
} as const

export type ApiErrorCode = (typeof ApiErrorCodes)[keyof typeof ApiErrorCodes]
