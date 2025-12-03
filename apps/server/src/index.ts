import express, { type Request, type Response, type NextFunction } from 'express'
import cors, { type CorsOptions } from 'cors'
import helmet from 'helmet'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter } from './routers/_app'
import { createContext } from './context'
import { logger } from './utils/logger'
import { validateEncryptionConfig } from './services/encryption.service'
import restRouter from './routers/rest.router'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Validate encryption config at startup
try {
  validateEncryptionConfig()
  logger.info('Encryption configuration validated')
} catch (error) {
  logger.error('Encryption configuration invalid', {
    error: error instanceof Error ? error.message : 'Unknown error',
  })
  process.exit(1)
}

const app = express()
const PORT = process.env.API_PORT || 3001

// Configure allowed origins for CORS
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

if (!process.env.ALLOWED_ORIGINS) {
  logger.warn('ALLOWED_ORIGINS not set; defaulting to http://localhost:3000')
}

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin) {
      // Allow non-browser clients (e.g., curl, server-to-server)
      return callback(null, true)
    }

    const isAllowed = allowedOrigins.some((allowedOrigin) => {
      if (allowedOrigin === '*') {
        return true
      }

      try {
        const normalizedAllowed = new URL(allowedOrigin).origin
        const normalizedOrigin = new URL(origin).origin
        return normalizedOrigin === normalizedAllowed
      } catch {
        return origin === allowedOrigin
      }
    })

    if (isAllowed) {
      return callback(null, true)
    }

    logger.warn('Blocked CORS request', { origin })
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  optionsSuccessStatus: 200,
}

// Simple in-memory rate limiter (per IP)
const RATE_LIMIT_WINDOW_MS =
  Number(process.env.API_RATE_LIMIT_WINDOW_MS) || 60_000
const RATE_LIMIT_MAX = Number(process.env.API_RATE_LIMIT_MAX) || 60
type RateLimitEntry = { count: number; resetTime: number }
const requestCounts = new Map<string, RateLimitEntry>()

const setRateLimitHeaders = (
  res: Response,
  count: number,
  resetTime: number
) => {
  res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX)
  res.setHeader('X-RateLimit-Remaining', Math.max(RATE_LIMIT_MAX - count, 0))
  res.setHeader('X-RateLimit-Reset', Math.ceil(resetTime / 1000))
}

const rateLimitMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.ip || req.socket.remoteAddress || 'unknown'
  const now = Date.now()
  const existing = requestCounts.get(key)

  if (!existing || now > existing.resetTime) {
    const resetTime = now + RATE_LIMIT_WINDOW_MS
    requestCounts.set(key, { count: 1, resetTime })
    setRateLimitHeaders(res, 1, resetTime)
    return next()
  }

  if (existing.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((existing.resetTime - now) / 1000)
    res.setHeader('Retry-After', retryAfter)
    setRateLimitHeaders(res, existing.count, existing.resetTime)
    return res.status(429).json({
      message: 'Too many requests. Please slow down.',
    })
  }

  existing.count += 1
  requestCounts.set(key, existing)
  setRateLimitHeaders(res, existing.count, existing.resetTime)
  return next()
}

// Security headers middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],  // Allow inline scripts for development
      styleSrc: ["'self'", "'unsafe-inline'"],   // Allow inline styles
      imgSrc: ["'self'", 'data:', 'https:'],     // Allow images from HTTPS sources
      connectSrc: ["'self'"],                     // Allow API calls to same origin
      fontSrc: ["'self'", 'data:'],              // Allow fonts
      objectSrc: ["'none'"],                      // Disallow plugins
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],                       // Disallow framing
    },
  },
  crossOriginEmbedderPolicy: false, // Disable for development; enable in production
  hsts: {
    maxAge: 31536000,                // 1 year
    includeSubDomains: true,
    preload: true,
  },
}))

// Middleware
app.use(cors(corsOptions))
app.use(rateLimitMiddleware)
app.use(express.json({ limit: '1mb' })) // Limit request body size to prevent DoS

// tRPC endpoint
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)

// REST API v1 endpoints
app.use('/v1', restRouter)

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API documentation redirect
app.get('/docs', (req, res) => {
  res.redirect('https://api.bl1nk.site/docs')
})

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`)
  logger.info(`tRPC endpoint: http://localhost:${PORT}/trpc`)
})
