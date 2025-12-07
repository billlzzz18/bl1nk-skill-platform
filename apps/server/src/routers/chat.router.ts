import { initTRPC, TRPCError } from '@trpc/server'
import { z } from 'zod'
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime'
import axios from 'axios'
import { Context } from '../context.js'
import { credentialService } from '../services/credential.service.js'
import { settingsService } from '../services/settings.service.js'
import { logger } from '../utils/logger.js'
import { handleError } from '../utils/errors.js'

const t = initTRPC.context<Context>().create()

/**
 * Chat Router
 *
 * Handles skill testing with Claude via:
 * - AWS Bedrock
 * - OpenRouter
 *
 * Uses the skill content as a system prompt to test how Claude
 * responds when equipped with the skill.
 */

// Default models
const DEFAULT_BEDROCK_MODEL = 'anthropic.claude-3-5-sonnet-20241022-v2:0'
const DEFAULT_OPENROUTER_MODEL = 'anthropic/claude-3.5-sonnet'

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
})

const SendMessageInput = z.object({
  skillContent: z.string().min(1, 'Skill content is required'),
  messages: z.array(MessageSchema),
  userMessage: z.string().min(1, 'Message is required'),
})

export const chatRouter = t.router({
  /**
   * Send a message to test a skill.
   * Uses the configured provider (Bedrock or OpenRouter).
   */
  sendMessage: t.procedure
    .input(SendMessageInput)
    .mutation(async ({ input }) => {
      try {
        // Get active provider from settings
        const settings = await settingsService.getAll()
        const provider = settings.activeProvider

        if (!provider) {
          throw new TRPCError({
            code: 'PRECONDITION_FAILED',
            message: 'No API provider configured. Please set up credentials in Settings.',
          })
        }

        // Get credentials for the provider
        const credentials = await credentialService.get(provider)

        if (!credentials) {
          throw new TRPCError({
            code: 'PRECONDITION_FAILED',
            message: `No credentials found for ${provider}. Please configure in Settings.`,
          })
        }

        logger.info('Sending chat message', {
          provider,
          messagesCount: input.messages.length + 1,
        })

        // Build full message history
        const allMessages = [
          ...input.messages,
          { role: 'user' as const, content: input.userMessage },
        ]

        let response: string

        if (provider === 'bedrock') {
          response = await sendBedrockMessage(
            input.skillContent,
            allMessages,
            credentials as { region: string; accessKeyId: string; secretAccessKey: string }
          )
        } else {
          response = await sendOpenRouterMessage(
            input.skillContent,
            allMessages,
            credentials as { apiKey: string }
          )
        }

        logger.debug('Chat response received', {
          responseLength: response.length,
        })

        return {
          role: 'assistant' as const,
          content: response,
        }
      } catch (error) {
        logger.error('Chat message failed', {
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        throw handleError(error)
      }
    }),

  /**
   * Check if chat is ready (has configured credentials).
   */
  status: t.procedure.query(async () => {
    try {
      const settings = await settingsService.getAll()
      const provider = settings.activeProvider

      if (!provider) {
        return { ready: false, reason: 'No provider configured' }
      }

      const credentials = await credentialService.get(provider)

      if (!credentials) {
        return { ready: false, reason: `No credentials for ${provider}` }
      }

      return { ready: true, provider }
    } catch (error) {
      return { ready: false, reason: 'Error checking status' }
    }
  }),
})

/**
 * Send message via AWS Bedrock (non-streaming).
 */
async function sendBedrockMessage(
  skillContent: string,
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  credentials: { region: string; accessKeyId: string; secretAccessKey: string }
): Promise<string> {
  const client = new BedrockRuntimeClient({
    region: credentials.region,
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
    },
  })

  const payload = {
    anthropic_version: 'bedrock-2023-05-31',
    max_tokens: 4096,
    system: skillContent,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  }

  const command = new InvokeModelCommand({
    modelId: DEFAULT_BEDROCK_MODEL,
    body: JSON.stringify(payload),
    contentType: 'application/json',
  })

  const response = await client.send(command)

  // Parse response
  const responseBody = JSON.parse(new TextDecoder().decode(response.body))
  return responseBody.content?.[0]?.text || ''
}

/**
 * Send message via OpenRouter (non-streaming).
 */
async function sendOpenRouterMessage(
  skillContent: string,
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  credentials: { apiKey: string }
): Promise<string> {
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: DEFAULT_OPENROUTER_MODEL,
      stream: false,
      messages: [
        { role: 'system', content: skillContent },
        ...messages,
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${credentials.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://skill-builder.local',
        'X-Title': 'Claude Skill Builder',
      },
    }
  )

  return response.data.choices?.[0]?.message?.content || ''
}
