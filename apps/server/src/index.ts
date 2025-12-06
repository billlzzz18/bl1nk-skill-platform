import express from 'express'
import cors, { type CorsOptions } from 'cors'
import helmet from 'helmet'
import crypto from 'crypto'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter } from './routers/_app.js'
import { createContext } from './context.js'
import { logger } from './utils/logger.js'
import { validateEncryptionConfig } from './services/encryption.service.js'
import restRouter from './routers/rest.router.js'
import { rateLimitMiddleware } from './utils/rateLimiter.js'
import dotenv from 'dotenv'

declare global {
  namespace Express {
    interface Response {
      locals: {
        cspNonce?: string
      }
    }
  }
}

// Load environment variables
dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'

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

// CSP nonce middleware for inline assets
app.use((req, res, next) => {
  (res as any).locals.cspNonce = crypto.randomBytes(16).toString('base64')
  next()
})

// Security headers middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          ...(isProduction ? [] : ["'unsafe-inline'"]), // Allow inline scripts in non-production for convenience
          (req, res) => `'nonce-${(res as any).locals.cspNonce}'`,
        ],
        styleSrc: [
          "'self'",
          ...(isProduction ? [] : ["'unsafe-inline'"]), // Allow inline styles in non-production for convenience
          (req, res) => `'nonce-${(res as any).locals.cspNonce}'`,
        ],
        imgSrc: ["'self'", 'data:', 'https:'], // Allow images from HTTPS sources
        connectSrc: ["'self'"], // Allow API calls to same origin
        fontSrc: ["'self'", 'data:'], // Allow fonts
        objectSrc: ["'none'"], // Disallow plugins
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"], // Disallow framing
      },
    },
    crossOriginEmbedderPolicy: isProduction ? undefined : false, // Disable for development; enable in production
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
  })
)

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
