# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Claude Skill Builder is a web application for creating, managing, and testing Claude AI skills. It's a full-stack application built with Next.js frontend and Node.js backend using tRPC for type-safe API communication.

## Common Development Commands

### Initial Setup
```bash
# Copy environment variables
copy .env.example .env

# Install dependencies
pnpm install

# Start Docker services (PostgreSQL + Redis)
docker-compose up -d

# Run database migrations
cd apps/server
pnpm prisma migrate dev
```

### Development
```bash
# Start all development servers (client + server)
pnpm dev

# Start individual apps
cd apps/client && pnpm dev    # Frontend only (localhost:3000)
cd apps/server && pnpm dev    # Backend only (localhost:3001)
```

### Building and Testing
```bash
# Build all packages
pnpm build

# Run all tests
pnpm test

# Type checking
pnpm run type-check

# Lint all packages
pnpm lint

# Clean all build artifacts and node_modules
pnpm clean
```

### Database Operations
```bash
cd apps/server

# Generate Prisma client after schema changes
pnpm prisma:generate

# Create and apply migrations
pnpm prisma:migrate

# Open Prisma Studio (database GUI)
pnpm prisma:studio
```

### Scripts (Agent/Skill Management)
```bash
# Build agent files and schemas
pnpm run build

# Format agent files with AI translation
pnpm run format

# Validate agent configurations
pnpm run test
pnpm run test:locale

# Validate translation accuracy
pnpm run validate:lang
pnpm run validate:lang --delete  # Delete invalid translations
pnpm run clean:lang              # Clean failed translations
```

## Architecture

### Monorepo Structure
This is a pnpm workspace with:
- **apps/client**: Next.js 15 + React 19 frontend
- **apps/server**: Node.js backend with tRPC and Express
- **packages/shared**: Shared types, utilities, and business logic
- **scripts/**: Agent/skill build and i18n tooling

### Backend Architecture (apps/server)

**Stack**: Express + tRPC + Prisma + PostgreSQL + Redis

**Key Files**:
- `src/index.ts` - Express server initialization, mounts tRPC at `/trpc`
- `src/context.ts` - tRPC context (includes Prisma and Redis clients)
- `src/routers/_app.ts` - Root tRPC router
- `src/routers/skill.router.ts` - Skill CRUD operations
- `src/services/claude-service.ts` - AWS Bedrock & OpenRouter integration
- `prisma/schema.prisma` - Database schema (Skill and ApiKey models)

**Database Models**:
- `Skill`: Stores skill definitions (name, description, content, version, isPublic)
- `ApiKey`: Stores encrypted API keys for Bedrock/OpenRouter

### Frontend Architecture (apps/client)

**Stack**: Next.js 15 App Router + React 19 + tRPC + Zustand + Tailwind

**Key Patterns**:
- tRPC client configured to connect to backend at `/trpc`
- State management using Zustand (see `src/store/`)
- Monaco Editor for code editing
- Extensive UI component library in `src/components/ui/` (shadcn-style)
- Chat/conversation components in `src/components/chat/`

### Scripts System (scripts/)

Modular build system for managing AI agent/skill definitions with i18n support.

**Core Modules**:
- `core/`: Constants and AI model configuration
- `builders/`: Build agent files and generate indexes
- `parsers/`: Extract and parse agent configurations
- `processors/`: Category assignment (AI-powered) and i18n translation
- `validators/`: Validate agent configs and translation accuracy
- `formatters/`: Format and generate multi-language versions
- `utils/`: File operations, logging, common utilities

**Key Features**:
- **Incremental Translation**: Only translates new/modified content using AI
- **Language Validation**: Uses `@yutengjing/eld` to verify translation accuracy
- **Structured Logging**: Color-coded, progress-tracked logging system

## API Integration

The application supports two Claude API providers:

1. **AWS Bedrock** (primary)
   - Uses `@aws-sdk/client-bedrock-runtime`
   - Requires AWS credentials and region
   - Default model: `anthropic.claude-3-5-sonnet-20241022-v2:0`

2. **OpenRouter** (alternative)
   - Uses axios HTTP client
   - Requires OpenRouter API key
   - Default model: `anthropic/claude-3.5-sonnet`

See `apps/server/src/services/claude-service.ts` for implementation.

## Type Safety

- Full TypeScript across all packages
- tRPC ensures end-to-end type safety between client and server
- Zod schemas for runtime validation
- Prisma generates types from database schema

## Environment Variables

Required in `.env` (see `.env.example`):
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`: AWS Bedrock credentials
- `OPENROUTER_API_KEY`: OpenRouter API key (if using)
- `PORT`: Frontend port (default: 3000)
- `API_PORT`: Backend port (default: 3001)

## Development Workflow

1. Make schema changes in `apps/server/prisma/schema.prisma`
2. Run `pnpm prisma:generate` to update Prisma client
3. Run `pnpm prisma:migrate` to apply migrations
4. Update tRPC routers in `apps/server/src/routers/`
5. Frontend automatically gets updated types via tRPC
6. Use `pnpm dev` at root to run both client and server

## Testing

- Unit tests for shared utilities in `packages/shared/__tests__/`
- E2E test fixtures in `tests/e2e/fixtures/`
- Run `pnpm test` from root or individual package directories
