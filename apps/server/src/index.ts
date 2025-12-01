import express from 'express'
import cors from 'cors'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter } from './routers/_app'
import { createContext } from './context'
import { logger } from './utils/logger'
import { validateEncryptionConfig } from './services/encryption.service'
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

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}))
app.use(express.json())

// tRPC endpoint
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`)
  logger.info(`tRPC endpoint: http://localhost:${PORT}/trpc`)
})
