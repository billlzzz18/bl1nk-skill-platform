/**
 * Credential Router Contract
 *
 * tRPC router definition for API credential management.
 * This is a contract specification - implementation will follow this interface.
 *
 * Related Requirements:
 * - FR-017: Support AWS Bedrock
 * - FR-018: Support OpenRouter
 * - FR-019: Configure and store credentials securely
 * - FR-020: Encrypt credentials at rest (AES-256)
 * - FR-021: Never expose plaintext credentials
 */

import { z } from 'zod'
import { router, publicProcedure } from '../trpc'

// ============================================
// INPUT/OUTPUT SCHEMAS
// ============================================

export const ProviderType = z.enum(['bedrock', 'openrouter'])

export const CredentialSummarySchema = z.object({
  id: z.string().cuid(),
  provider: ProviderType,
  name: z.string(),
  isActive: z.boolean(),
  isConfigured: z.boolean(), // Has credentials stored
  lastUsed: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Bedrock-specific input
export const BedrockCredentialInput = z.object({
  provider: z.literal('bedrock'),
  name: z.string().min(1).max(100),
  accessKeyId: z.string().min(16).max(128),
  secretAccessKey: z.string().min(16).max(128),
  region: z.string().regex(/^[a-z]{2}-[a-z]+-\d+$/), // e.g., us-east-1
})

// OpenRouter-specific input
export const OpenRouterCredentialInput = z.object({
  provider: z.literal('openrouter'),
  name: z.string().min(1).max(100),
  apiKey: z.string().min(20).max(256),
})

export const SaveCredentialInput = z.discriminatedUnion('provider', [
  BedrockCredentialInput,
  OpenRouterCredentialInput,
])

export const ValidateCredentialInput = z.object({
  provider: ProviderType,
})

// ============================================
// ROUTER DEFINITION
// ============================================

export const credentialRouter = router({
  /**
   * List all configured credentials (summary only, no secrets)
   *
   * @returns CredentialSummary[]
   */
  list: publicProcedure.query(async () => {
    // Implementation:
    // 1. Fetch all credentials from Prisma
    // 2. Return summary (NEVER include decrypted secrets)
    // 3. Include isConfigured flag based on encryptedData presence
    return [] as z.infer<typeof CredentialSummarySchema>[]
  }),

  /**
   * Get credential summary by provider (no secrets)
   *
   * @input { provider: 'bedrock' | 'openrouter' }
   * @returns CredentialSummary | null
   */
  getByProvider: publicProcedure
    .input(z.object({ provider: ProviderType }))
    .query(async ({ input }) => {
      // Implementation: Fetch credential by provider, return summary only
      return null as z.infer<typeof CredentialSummarySchema> | null
    }),

  /**
   * Save or update credentials for a provider
   *
   * @input SaveCredentialInput (discriminated union by provider)
   * @returns CredentialSummary
   */
  save: publicProcedure
    .input(SaveCredentialInput)
    .mutation(async ({ input }) => {
      // Implementation:
      // 1. Encrypt credentials using AES-256 (or keytar)
      // 2. Upsert credential record (unique by provider)
      // 3. Return summary (no secrets)
      // 4. Log save event (FR-027 - security audit)
      return {} as z.infer<typeof CredentialSummarySchema>
    }),

  /**
   * Delete credentials for a provider
   *
   * @input { provider: 'bedrock' | 'openrouter' }
   * @returns { success: boolean }
   */
  delete: publicProcedure
    .input(z.object({ provider: ProviderType }))
    .mutation(async ({ input }) => {
      // Implementation:
      // 1. Delete credential record
      // 2. Also remove from keytar if used
      // 3. Log deletion event
      return { success: true }
    }),

  /**
   * Validate stored credentials by making a test API call
   *
   * @input { provider: 'bedrock' | 'openrouter' }
   * @returns { valid: boolean, error?: string }
   */
  validate: publicProcedure
    .input(ValidateCredentialInput)
    .mutation(async ({ input }) => {
      // Implementation:
      // 1. Decrypt stored credentials
      // 2. Make minimal API call to verify credentials
      //    - Bedrock: ListFoundationModels
      //    - OpenRouter: GET /auth/key (or similar)
      // 3. Return validation result
      return { valid: true, error: undefined as string | undefined }
    }),

  /**
   * Set active provider for skill testing
   *
   * @input { provider: 'bedrock' | 'openrouter' }
   * @returns { success: boolean }
   */
  setActive: publicProcedure
    .input(z.object({ provider: ProviderType }))
    .mutation(async ({ input }) => {
      // Implementation:
      // 1. Update AppSettings with activeProvider
      // 2. Verify credentials exist for provider
      return { success: true }
    }),

  /**
   * Get currently active provider
   *
   * @returns { provider: 'bedrock' | 'openrouter' | null }
   */
  getActive: publicProcedure.query(async () => {
    // Implementation: Fetch activeProvider from AppSettings
    return { provider: null as z.infer<typeof ProviderType> | null }
  }),

  /**
   * Get masked credential preview (for UI display)
   * Shows only last 4 characters of sensitive fields
   *
   * @input { provider: 'bedrock' | 'openrouter' }
   * @returns Masked credential info
   */
  getMasked: publicProcedure
    .input(z.object({ provider: ProviderType }))
    .query(async ({ input }) => {
      // Implementation:
      // 1. Decrypt credentials
      // 2. Mask all but last 4 chars: "sk-...xxxx"
      // 3. Return masked preview

      // Bedrock response shape
      if (input.provider === 'bedrock') {
        return {
          provider: 'bedrock' as const,
          name: '',
          accessKeyId: '****...xxxx',
          secretAccessKey: '****...xxxx',
          region: 'us-east-1',
        }
      }

      // OpenRouter response shape
      return {
        provider: 'openrouter' as const,
        name: '',
        apiKey: '****...xxxx',
      }
    }),
})

export type CredentialRouter = typeof credentialRouter
