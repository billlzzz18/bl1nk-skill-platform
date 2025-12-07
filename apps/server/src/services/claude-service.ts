import {
  BedrockRuntimeClient,
  InvokeModelWithResponseStreamCommand,
} from '@aws-sdk/client-bedrock-runtime'
import axios from 'axios'
import { logger } from '../utils/logger.js'
import type { BedrockCredentials, OpenRouterCredentials } from '@claude-builder/shared'

/**
 * Claude Service
 *
 * Provides methods to interact with Claude API through:
 * - AWS Bedrock (primary)
 * - OpenRouter (alternative)
 *
 * Supports both streaming and non-streaming responses.
 */

// Default models
const DEFAULT_BEDROCK_MODEL = 'anthropic.claude-3-5-sonnet-20241022-v2:0'
const DEFAULT_OPENROUTER_MODEL = 'anthropic/claude-3.5-sonnet'

/**
 * Creates a Bedrock client with the provided credentials.
 */
function createBedrockClient(credentials: BedrockCredentials): BedrockRuntimeClient {
  return new BedrockRuntimeClient({
    region: credentials.region,
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
    },
  })
}

/**
 * Tests a skill with AWS Bedrock.
 */
export async function testSkillWithBedrock(
  skillContent: string,
  testMessage: string,
  credentials: BedrockCredentials,
  modelId?: string
) {
  const client = createBedrockClient(credentials)

  const payload = {
    anthropic_version: 'bedrock-2023-05-31',
    max_tokens: 4096,
    system: skillContent,
    messages: [
      {
        role: 'user',
        content: testMessage,
      },
    ],
  }

  const command = new InvokeModelWithResponseStreamCommand({
    modelId: modelId || DEFAULT_BEDROCK_MODEL,
    body: JSON.stringify(payload),
    contentType: 'application/json',
  })

  logger.debug('Invoking Bedrock model', {
    model: modelId || DEFAULT_BEDROCK_MODEL,
    messageLength: testMessage.length,
  })

  const response = await client.send(command)
  return response
}

/**
 * Tests a skill with OpenRouter.
 */
export async function testSkillWithOpenRouter(
  skillContent: string,
  testMessage: string,
  credentials: OpenRouterCredentials,
  model?: string
) {
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: model || DEFAULT_OPENROUTER_MODEL,
      stream: true,
      messages: [
        {
          role: 'system',
          content: skillContent,
        },
        {
          role: 'user',
          content: testMessage,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${credentials.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://skill-builder.local',
        'X-Title': 'Claude Skill Builder',
      },
      responseType: 'stream',
    }
  )

  logger.debug('Invoking OpenRouter model', {
    model: model || DEFAULT_OPENROUTER_MODEL,
    messageLength: testMessage.length,
  })

  return response.data
}

/**
 * Validates Bedrock credentials by making a simple API call.
 */
export async function validateBedrockCredentials(
  credentials: BedrockCredentials
): Promise<boolean> {
  try {
    const client = createBedrockClient(credentials)

    // Use a minimal request to validate credentials
    const payload = {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1,
      messages: [{ role: 'user', content: 'Hi' }],
    }

    const command = new InvokeModelWithResponseStreamCommand({
      modelId: DEFAULT_BEDROCK_MODEL,
      body: JSON.stringify(payload),
      contentType: 'application/json',
    })

    await client.send(command)
    return true
  } catch (error) {
    logger.warn('Bedrock credential validation failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    return false
  }
}

/**
 * Validates OpenRouter credentials by making a simple API call.
 */
export async function validateOpenRouterCredentials(
  credentials: OpenRouterCredentials
): Promise<boolean> {
  try {
    // OpenRouter has a models endpoint that can be used to validate credentials
    const response = await axios.get('https://openrouter.ai/api/v1/models', {
      headers: {
        Authorization: `Bearer ${credentials.apiKey}`,
      },
    })

    return response.status === 200
  } catch (error) {
    logger.warn('OpenRouter credential validation failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    return false
  }
}
