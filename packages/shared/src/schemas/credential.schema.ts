/**
 * Credential Zod Schemas
 *
 * Shared validation schemas for API credential management.
 * Used by both client and server for type-safe validation.
 */

import { z } from 'zod'

// ============================================
// BASE SCHEMAS
// ============================================

export const ProviderType = z.enum(['bedrock', 'openrouter'])

export const CredentialSummarySchema = z.object({
  id: z.string().cuid(),
  provider: ProviderType,
  name: z.string(),
  isActive: z.boolean(),
  isConfigured: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// ============================================
// INPUT SCHEMAS
// ============================================

// Bedrock-specific credentials
export const BedrockCredentialInput = z.object({
  provider: z.literal('bedrock'),
  name: z.string().min(1, 'Name is required').max(100),
  accessKeyId: z.string().min(16, 'Access Key ID must be at least 16 characters').max(128),
  secretAccessKey: z.string().min(16, 'Secret Access Key must be at least 16 characters').max(128),
  region: z.string().regex(/^[a-z]{2}-[a-z]+-\d+$/, 'Invalid AWS region format (e.g., us-east-1)'),
})

// OpenRouter-specific credentials
export const OpenRouterCredentialInput = z.object({
  provider: z.literal('openrouter'),
  name: z.string().min(1, 'Name is required').max(100),
  apiKey: z.string().min(20, 'API Key must be at least 20 characters').max(256),
})

// Discriminated union for save input
export const SaveCredentialInput = z.discriminatedUnion('provider', [
  BedrockCredentialInput,
  OpenRouterCredentialInput,
])

export const GetCredentialInput = z.object({
  provider: ProviderType,
})

export const DeleteCredentialInput = z.object({
  provider: ProviderType,
})

export const SetActiveProviderInput = z.object({
  provider: ProviderType,
})

// ============================================
// OUTPUT SCHEMAS
// ============================================

export const ValidationResultSchema = z.object({
  valid: z.boolean(),
  error: z.string().optional(),
})

export const ActiveProviderSchema = z.object({
  provider: ProviderType.nullable(),
})

// Masked credential for UI display
export const MaskedBedrockCredentialSchema = z.object({
  provider: z.literal('bedrock'),
  name: z.string(),
  accessKeyId: z.string(), // Masked: "****...xxxx"
  secretAccessKey: z.string(), // Masked: "****...xxxx"
  region: z.string(),
})

export const MaskedOpenRouterCredentialSchema = z.object({
  provider: z.literal('openrouter'),
  name: z.string(),
  apiKey: z.string(), // Masked: "****...xxxx"
})

export const MaskedCredentialSchema = z.discriminatedUnion('provider', [
  MaskedBedrockCredentialSchema,
  MaskedOpenRouterCredentialSchema,
])

// ============================================
// DECRYPTED CREDENTIAL SCHEMAS (internal use)
// ============================================

/**
 * Shape of decrypted Bedrock credentials stored in the database.
 * Does not include provider field - that's stored separately.
 */
export const BedrockCredentialsSchema = z.object({
  accessKeyId: z.string(),
  secretAccessKey: z.string(),
  region: z.string(),
})

/**
 * Shape of decrypted OpenRouter credentials stored in the database.
 */
export const OpenRouterCredentialsSchema = z.object({
  apiKey: z.string(),
})

// ============================================
// TYPE EXPORTS
// ============================================

export type Provider = z.infer<typeof ProviderType>
export type CredentialSummary = z.infer<typeof CredentialSummarySchema>
export type BedrockCredentialInputType = z.infer<typeof BedrockCredentialInput>
export type OpenRouterCredentialInputType = z.infer<typeof OpenRouterCredentialInput>
export type SaveCredentialInputType = z.infer<typeof SaveCredentialInput>
export type ValidationResult = z.infer<typeof ValidationResultSchema>
export type MaskedCredential = z.infer<typeof MaskedCredentialSchema>

// Decrypted credential types (for encryption service)
export type BedrockCredentials = z.infer<typeof BedrockCredentialsSchema>
export type OpenRouterCredentials = z.infer<typeof OpenRouterCredentialsSchema>
