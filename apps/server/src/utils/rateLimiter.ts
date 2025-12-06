import type { Request, Response, NextFunction } from 'express'
import { getRedisClient } from './redisClient.js'
import { logger } from './logger.js'

const RATE_LIMIT_WINDOW_MS =
  Number(process.env.API_RATE_LIMIT_WINDOW_MS) || 60_000
const RATE_LIMIT_MAX = Number(process.env.API_RATE_LIMIT_MAX) || 60
const RATE_LIMIT_PREFIX = process.env.API_RATE_LIMIT_PREFIX || 'api_rate_limit'

const setRateLimitHeaders = (
  res: Response,
  count: number,
  resetTime: number
) => {
  res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX)
  res.setHeader('X-RateLimit-Remaining', Math.max(RATE_LIMIT_MAX - count, 0))
  res.setHeader('X-RateLimit-Reset', Math.ceil(resetTime / 1000))
}

const getKey = (ip: string): string => `${RATE_LIMIT_PREFIX}:${ip}`

const nowMs = () => Date.now()

const addRequestAndTrim = async (
  redisKey: string,
  timestamp: number
): Promise<{
  count: number
  resetTime: number
}> => {
  const client = getRedisClient()
  const windowStart = timestamp - RATE_LIMIT_WINDOW_MS

  const results = await client
    .multi()
    .zremrangebyscore(redisKey, 0, windowStart)
    .zadd(redisKey, timestamp, `${timestamp}-${Math.random()}`)
    .pexpire(redisKey, RATE_LIMIT_WINDOW_MS)
    .zcard(redisKey)
    .zrange(redisKey, 0, 0, 'WITHSCORES')
    .exec()

  if (!results) {
    throw new Error('Failed to execute Redis transaction for rate limiting')
  }

  const countResult = results[3][1]
  const oldestEntryWithScore = results[4][1] as Array<string | number>

  const count = typeof countResult === 'number' ? countResult : Number(countResult)

  const oldestScore = oldestEntryWithScore?.[1]
  const resetTime =
    typeof oldestScore === 'number'
      ? oldestScore + RATE_LIMIT_WINDOW_MS
      : timestamp + RATE_LIMIT_WINDOW_MS

  return { count, resetTime }
}

export const rateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const key = getKey(req.ip || req.socket.remoteAddress || 'unknown')
  const timestamp = nowMs()

  try {
    const { count, resetTime } = await addRequestAndTrim(key, timestamp)

    if (count > RATE_LIMIT_MAX) {
      const retryAfter = Math.ceil((resetTime - timestamp) / 1000)
      res.setHeader('Retry-After', retryAfter)
      setRateLimitHeaders(res, count, resetTime)
      res.status(429).json({
        message: 'Too many requests. Please slow down.',
      })
      return
    }

    setRateLimitHeaders(res, count, resetTime)
    next()
  } catch (error) {
    logger.error('Rate limiter error', {
      error: error instanceof Error ? error.message : 'Unknown error',
    })

    res.setHeader('Retry-After', 1)
    res.status(503).json({
      message: 'Rate limit service unavailable. Please try again shortly.',
    })
  }
}
