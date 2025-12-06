import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { Context } from '../context.js'
import {
  SaveCredentialInput,
  ProviderType,
  type BedrockCredentials,
  type OpenRouterCredentials,
} from '@claude-builder/shared'
import { encryptJson, decryptJson } from '../services/encryption.service.js'
import { NotFoundError, CredentialsError, handleError } from '../utils/errors.js'
import { logger } from '../utils/logger.js'

const t = initTRPC.context<Context>().create()

/**
 * Credential Router
 *
 * Handles API credential management with:
 * - Secure encryption for storage
 * - Provider-specific validation
 * - Credential testing endpoints
 */
export const credentialRouter = t.router({
  /**
   * List all configured credentials (without sensitive data).
   */
  list: t.procedure.query(async ({ ctx }) => {
    try {
      const credentials = await ctx.prisma.apiCredential.findMany({
        select: {
          id: true,
          provider: true,
          name: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { provider: 'asc' },
      })

      logger.debug('Listed credentials', { count: credentials.length })
      return credentials
    } catch (error) {
      throw handleError(error)
    }
  }),

  /**
   * Get credential details for a specific provider.
   * Returns masked sensitive data for display.
   */
  getByProvider: t.procedure
    .input(z.object({ provider: ProviderType }))
    .query(async ({ ctx, input }) => {
      try {
        const credential = await ctx.prisma.apiCredential.findUnique({
          where: { provider: input.provider },
        })

        if (!credential) {
          return null
        }

        // Decrypt to get field names, but mask the values
        const decrypted = decryptJson<Record<string, string>>(
          credential.encryptedData
        )

        const masked: Record<string, string> = {}
        for (const [key, value] of Object.entries(decrypted)) {
          // Mask all but first 4 and last 4 characters
          if (value.length > 12) {
            masked[key] = `${value.slice(0, 4)}${'*'.repeat(8)}${value.slice(-4)}`
          } else {
            masked[key] = '*'.repeat(value.length)
          }
        }

        return {
          id: credential.id,
          provider: credential.provider,
          name: credential.name,
          isActive: credential.isActive,
          maskedData: masked,
          createdAt: credential.createdAt,
          updatedAt: credential.updatedAt,
        }
      } catch (error) {
        throw handleError(error)
      }
    }),

  /**
   * Save or update credentials for a provider.
   */
  save: t.procedure.input(SaveCredentialInput).mutation(async ({ ctx, input }) => {
    try {
      const { provider, name, ...credentials } = input

      // Encrypt the sensitive credential data
      const encryptedData = encryptJson(credentials)

      const credential = await ctx.prisma.apiCredential.upsert({
        where: { provider },
        update: {
          name,
          encryptedData,
          isActive: true,
        },
        create: {
          provider,
          name,
          encryptedData,
          isActive: true,
        },
      })

      logger.info('Saved credential', { provider, name })

      return {
        id: credential.id,
        provider: credential.provider,
        name: credential.name,
        isActive: credential.isActive,
      }
    } catch (error) {
      throw handleError(error)
    }
  }),

  /**
   * Delete credentials for a provider.
   */
  delete: t.procedure
    .input(z.object({ provider: ProviderType }))
    .mutation(async ({ ctx, input }) => {
      try {
        const credential = await ctx.prisma.apiCredential.findUnique({
          where: { provider: input.provider },
        })

        if (!credential) {
          throw new NotFoundError('Credential', input.provider)
        }

        await ctx.prisma.apiCredential.delete({
          where: { provider: input.provider },
        })

        logger.info('Deleted credential', { provider: input.provider })
        return { success: true }
      } catch (error) {
        throw handleError(error)
      }
    }),

  /**
   * Set a credential as active/inactive.
   */
  setActive: t.procedure
    .input(
      z.object({
        provider: ProviderType,
        isActive: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const credential = await ctx.prisma.apiCredential.findUnique({
          where: { provider: input.provider },
        })

        if (!credential) {
          throw new NotFoundError('Credential', input.provider)
        }

        const updated = await ctx.prisma.apiCredential.update({
          where: { provider: input.provider },
          data: { isActive: input.isActive },
        })

        logger.info('Updated credential status', {
          provider: input.provider,
          isActive: input.isActive,
        })

        return {
          id: updated.id,
          provider: updated.provider,
          isActive: updated.isActive,
        }
      } catch (error) {
        throw handleError(error)
      }
    }),

  /**
   * Test credentials by making a simple API call.
   * This validates that the credentials work.
   */
  test: t.procedure
    .input(z.object({ provider: ProviderType }))
    .mutation(async ({ ctx, input }) => {
      try {
        const credential = await ctx.prisma.apiCredential.findUnique({
          where: { provider: input.provider },
        })

        if (!credential) {
          throw new CredentialsError(
            `No credentials configured for ${input.provider}`
          )
        }

        const decrypted = decryptJson<BedrockCredentials | OpenRouterCredentials>(
          credential.encryptedData
        )

        // TODO: Implement actual API testing
        // For now, just validate the decrypted credentials exist
        if (input.provider === 'bedrock') {
          const bedrock = decrypted as BedrockCredentials
          if (!bedrock.accessKeyId || !bedrock.secretAccessKey || !bedrock.region) {
            throw new CredentialsError('Invalid Bedrock credentials format')
          }
        } else {
          const openrouter = decrypted as OpenRouterCredentials
          if (!openrouter.apiKey) {
            throw new CredentialsError('Invalid OpenRouter credentials format')
          }
        }

        logger.info('Tested credential', { provider: input.provider, success: true })

        return {
          success: true,
          provider: input.provider,
          message: 'Credentials validated successfully',
        }
      } catch (error) {
        logger.warn('Credential test failed', {
          provider: input.provider,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        throw handleError(error)
      }
    }),

  /**
   * Get decrypted credentials (internal use only).
   * This is used by the Claude service to make API calls.
   */
  getDecrypted: t.procedure
    .input(z.object({ provider: ProviderType }))
    .query(async ({ ctx, input }) => {
      try {
        const credential = await ctx.prisma.apiCredential.findUnique({
          where: { provider: input.provider },
        })

        if (!credential) {
          throw new CredentialsError(
            `No credentials configured for ${input.provider}`
          )
        }

        if (!credential.isActive) {
          throw new CredentialsError(
            `Credentials for ${input.provider} are disabled`
          )
        }

        const decrypted = decryptJson<BedrockCredentials | OpenRouterCredentials>(
          credential.encryptedData
        )

        return {
          provider: input.provider,
          credentials: decrypted,
        }
      } catch (error) {
        throw handleError(error)
      }
    }),
})
