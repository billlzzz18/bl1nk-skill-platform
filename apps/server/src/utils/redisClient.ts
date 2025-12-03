import Redis from 'ioredis'
import { logger } from './logger'

let redisClient: Redis | null = null

export const getRedisClient = (): Redis => {
  if (redisClient) {
    return redisClient
  }

  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

  redisClient = new Redis(redisUrl, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: true,
  })

  redisClient
    .on('error', (error) => {
      logger.error('Redis connection error', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    })
    .on('connect', () => {
      logger.info('Connected to Redis for rate limiting')
    })
    .on('close', () => {
      logger.warn('Redis connection closed')
    })

  redisClient.connect().catch((error) => {
    logger.error('Failed to establish Redis connection', {
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  })

  return redisClient
}
