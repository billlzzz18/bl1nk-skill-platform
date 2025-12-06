import { prisma } from '../db/client.js'
import { encrypt, decrypt, encryptJson, decryptJson } from './encryption.service.js'
import { logger } from '../utils/logger.js'
import type { BedrockCredentials, OpenRouterCredentials, Provider } from '@claude-builder/shared'

/**
 * Credential Service
 *
 * Handles secure storage and retrieval of API credentials.
 * All credentials are encrypted at rest using AES-256-GCM.
 */

export const credentialService = {
  /**
   * Save credentials for a provider.
   */
  async save(
    provider: Provider,
    credentials: BedrockCredentials | OpenRouterCredentials
  ): Promise<void> {
    const encryptedData = encryptJson(credentials)

    await prisma.apiCredential.upsert({
      where: { provider },
      update: {
        encryptedData,
        updatedAt: new Date(),
      },
      create: {
        provider,
        name: provider === 'bedrock' ? 'AWS Bedrock' : 'OpenRouter',
        encryptedData,
      },
    })

    logger.info('Saved credentials', { provider })
  },

  /**
   * Get decrypted credentials for a provider.
   */
  async get(provider: Provider): Promise<BedrockCredentials | OpenRouterCredentials | null> {
    const record = await prisma.apiCredential.findUnique({
      where: { provider },
    })

    if (!record) {
      return null
    }

    try {
      const decrypted = decryptJson<BedrockCredentials | OpenRouterCredentials>(
        record.encryptedData
      )
      return decrypted
    } catch (error) {
      logger.error('Failed to decrypt credentials', {
        provider,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      return null
    }
  },

  /**
   * Delete credentials for a provider.
   */
  async delete(provider: Provider): Promise<boolean> {
    try {
      await prisma.apiCredential.delete({
        where: { provider },
      })
      logger.info('Deleted credentials', { provider })
      return true
    } catch (error) {
      // Record may not exist
      return false
    }
  },

  /**
   * Check if credentials exist for a provider (without decrypting).
   */
  async exists(provider: Provider): Promise<boolean> {
    const count = await prisma.apiCredential.count({
      where: { provider },
    })
    return count > 0
  },

  /**
   * Get masked credentials (for display purposes).
   */
  async getMasked(provider: Provider): Promise<Record<string, string> | null> {
    const credentials = await this.get(provider)

    if (!credentials) {
      return null
    }

    // Mask sensitive values
    const masked: Record<string, string> = {}

    for (const [key, value] of Object.entries(credentials)) {
      if (typeof value === 'string' && value.length > 8) {
        masked[key] = value.substring(0, 4) + '****' + value.substring(value.length - 4)
      } else if (typeof value === 'string') {
        masked[key] = '****'
      } else {
        masked[key] = String(value)
      }
    }

    return masked
  },
}
