# bl1nk Skill Builder

## Overview

**bl1nk Skill Builder** is an Electron desktop IDE for AI development with 501 pre-built agent templates and comprehensive skill management capabilities. This is primarily a desktop application built with Electron, React, and Vite, but the backend API server can run in Replit for testing and development purposes.

## Project Type

**⚠️ Important**: This is an **Electron desktop application**, not a web application. In Replit, only the backend API server component can run. The full desktop application with GUI requires local installation.

## Architecture

This is a monorepo using pnpm workspaces with the following structure:

### Core Components

- **`apps/client/`**: Electron desktop app (Vite + React + Electron Forge)
  - Cannot run in Replit (requires desktop environment)
  - Must be run locally for GUI access
  
- **`apps/server/`**: Express backend with tRPC API
  - **Currently running in Replit on port 3001**
  - Provides REST and tRPC endpoints
  - Uses SQLite database with Prisma ORM
  
- **`packages/shared/`**: Shared TypeScript types and utilities

- **`agents/`**: 501 pre-built agent templates

- **`skill/`**: 15 skill categories

## Current Status in Replit

✅ **Backend server is running on port 3001**

The server provides:
- tRPC endpoint: `http://localhost:3001/trpc`
- REST API v1: `http://localhost:3001/v1`
- Health check: `http://localhost:3001/health`
- API docs redirect: `http://localhost:3001/docs`

### What Works in Replit
- ✅ Backend API server
- ✅ SQLite database with Prisma
- ✅ tRPC and REST endpoints
- ✅ Health monitoring

### What Doesn't Work in Replit
- ❌ Electron desktop GUI (requires local environment)
- ❌ Client application (browser-based alternative not available)
- ❌ Redis-based rate limiting (disabled for Replit)

## Environment Configuration

### Environment Variables (Set in Replit)

```bash
NODE_ENV=development
API_PORT=3001
ALLOWED_ORIGINS=http://localhost:3000
ENCRYPTION_KEY=<generated-32-byte-hex-key>
API_RATE_LIMIT_WINDOW_MS=60000
API_RATE_LIMIT_MAX=60
API_RATE_LIMIT_ENABLED=false  # Disabled in Replit (no Redis)
```

### Database Configuration

The SQLite database is stored at: `apps/server/prisma/skill-builder.db`

Database URL is configured in `apps/server/.env`:
```
DATABASE_URL="file:./prisma/skill-builder.db"
```

## Development

### Running Locally (Full Desktop App)

To run the complete application with GUI locally:

```bash
# Install dependencies
pnpm install

# Run the Electron app
cd apps/client
pnpm dev
```

### Running Backend Only (Replit)

The backend server is configured as a workflow in Replit:

**Workflow**: Backend Server
- **Command**: `cd apps/server && pnpm dev`
- **Port**: 3001
- **Type**: Console output

### Testing the API

```bash
# Health check
curl http://localhost:3001/health

# tRPC endpoint (requires proper tRPC client setup)
curl http://localhost:3001/trpc

# REST API v1
curl http://localhost:3001/v1
```

## Technical Details

### Backend Stack
- **Framework**: Express.js
- **API**: tRPC + REST endpoints
- **Database**: SQLite with Prisma ORM
- **Security**: Helmet, CORS, rate limiting (when Redis available)
- **Encryption**: AES-256 for API credential storage

### Database Schema
- **Skill**: AI skill templates and prompts
- **SkillVersion**: Version history for skills
- **ApiCredential**: Encrypted storage for API keys (AWS Bedrock, OpenRouter)
- **TestMessage**: Chat session storage
- **AppSettings**: Application configuration

### Modifications for Replit

1. **Rate Limiting**: Disabled via `API_RATE_LIMIT_ENABLED=false` because Redis is not available in Replit environment
2. **Database**: Uses local SQLite file (not Replit's managed PostgreSQL)
3. **Environment Variables**: Configured in Replit's secrets/env system

## API Endpoints

### Health Check
```
GET /health
Response: { "status": "ok", "timestamp": "<ISO-8601>" }
```

### tRPC
```
POST /trpc/<procedure>
```

### REST API v1
```
/v1/* (various endpoints)
```

### API Documentation
```
GET /docs
Redirects to: https://api.bl1nk.site/docs
```

## Dependencies

### Key Backend Dependencies
- `@trpc/server` - Type-safe API framework
- `@prisma/client` - Database ORM
- `express` - Web server framework
- `helmet` - Security headers
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management
- `zod` - Schema validation
- `ioredis` - Redis client (not used in Replit)

## Security Considerations

### In Replit Environment
- ⚠️ Rate limiting is **disabled** (no Redis available)
- ✅ CORS protection enabled
- ✅ Helmet security headers enabled
- ✅ Request body size limited (1mb)
- ✅ API credentials encrypted with AES-256

### For Production Deployment
- Enable rate limiting with Redis
- Update `ALLOWED_ORIGINS` to production domains
- Set `NODE_ENV=production`
- Enable all Helmet security features
- Use proper SSL/TLS certificates

## Recent Changes

### December 6, 2025
- Imported project from GitHub into Replit
- Installed pnpm dependencies (1522 packages)
- Set up environment variables for backend
- Generated encryption key for API credential storage
- Initialized SQLite database and ran migrations
- Configured backend server workflow on port 3001
- Modified rate limiter to be optional (disabled in Replit)
- Successfully started backend API server

## Known Limitations in Replit

1. **No Electron GUI**: The desktop application cannot run in Replit's browser-based environment
2. **No Redis**: Rate limiting is disabled; requests are not throttled
3. **Local Database Only**: Using SQLite file storage (not Replit's managed database)
4. **Development Mode**: Running in development mode with relaxed security policies

## Future Enhancements

To make this project more Replit-friendly, consider:
- Adding a web-based alternative to the Electron GUI
- Implementing in-memory rate limiting fallback
- Migrating to PostgreSQL for better cloud compatibility
- Creating separate deployment configuration for Replit vs. local environments

## Support

For full functionality, please run this application locally as an Electron desktop app. The Replit environment is suitable only for:
- Backend API testing
- Database development and migrations
- API endpoint validation
- Development and debugging of server-side logic
