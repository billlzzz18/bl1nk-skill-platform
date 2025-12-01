# Technology Stack

## Programming Languages

### TypeScript 5.6.0
Primary language for all application code
- Strict type checking enabled
- Modern ES2022+ features
- Path aliases for clean imports
- Shared type definitions across packages

### JavaScript
- Worker scripts and utilities
- Build automation scripts
- Legacy component support

### Python
- Document skill validation scripts
- OOXML processing utilities
- Located in `skill/document-skills/docx/ooxml/scripts/`

## Frontend Stack

### Core Framework
- **Next.js 15.0.3** - React framework with App Router
- **React 19.0.0** - UI library with latest features
- **React DOM 19.0.0** - DOM rendering

### State Management
- **Zustand 5.0.0** - Lightweight state management
- **Jotai 2.10.0** - Atomic state management
- **@tanstack/react-query 5.59.0** - Server state management

### API Communication
- **tRPC 11.0.0** - Type-safe API layer
  - `@trpc/client` - Client-side utilities
  - `@trpc/server` - Server-side router
  - `@trpc/react-query` - React Query integration

### UI Components & Styling
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **PostCSS 8.4.0** - CSS processing
- **Autoprefixer 10.4.0** - CSS vendor prefixing
- **Lucide React 0.451.0** - Icon library

### Code Editor
- **@monaco-editor/react 4.6.0** - Monaco editor integration
- Syntax highlighting for multiple languages
- IntelliSense and autocomplete support

### Content Processing
- **React Markdown 9.0.0** - Markdown rendering
- **YAML 2.5.0** - YAML parsing and serialization
- **Zod 3.23.0** - Schema validation

## Backend Stack

### Runtime & Framework
- **Node.js** - JavaScript runtime
- **Express 4.21.0** - Web server framework
- **CORS 2.8.5** - Cross-origin resource sharing
- **tsx 4.19.0** - TypeScript execution for development

### Database & ORM
- **PostgreSQL** - Primary database (via Docker)
- **Prisma 5.22.0** - Database ORM and migrations
- **@prisma/client 5.22.0** - Type-safe database client
- **Drizzle ORM** - Alternative ORM for migrations

### Caching & Sessions
- **Redis** - In-memory data store (via Docker)

### External Services
- **AWS SDK 3.679.0** - AWS Bedrock Runtime client
- **Axios 1.7.0** - HTTP client for external APIs

### Environment Management
- **dotenv 16.4.0** - Environment variable loading

## Development Tools

### Package Management
- **PNPM** - Fast, disk space efficient package manager
- Workspace support for monorepo
- Parallel script execution

### Build Tools
- **TypeScript Compiler (tsc)** - Type checking and compilation
- **Next.js Build System** - Optimized production builds
- **ESLint 9.0.0** - Code linting
- **Prettier 3.3.0** - Code formatting

### Testing Framework
- **Playwright** - End-to-end testing
- Test fixtures and helpers in `__tests__/e2e/`
- Snapshot testing support
- 80+ test specifications

### Development Environment
- **Docker & Docker Compose** - Containerized services
- **VS Code Dev Containers** - Consistent development environment
- **Hot Module Replacement** - Fast development iteration

## Development Commands

### Root Level Commands
```bash
pnpm dev              # Start all services in parallel
pnpm build            # Build all packages
pnpm test             # Run all tests
pnpm lint             # Lint all packages
pnpm clean            # Clean all build artifacts
```

### Client Commands (apps/client)
```bash
pnpm dev              # Start Next.js dev server
pnpm build            # Build production bundle
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm clean            # Remove .next and node_modules
```

### Server Commands (apps/server)
```bash
pnpm dev              # Start server with tsx watch
pnpm build            # Compile TypeScript
pnpm start            # Run compiled server
pnpm prisma:generate  # Generate Prisma client
pnpm prisma:migrate   # Run database migrations
pnpm prisma:studio    # Open Prisma Studio GUI
pnpm clean            # Remove dist and node_modules
```

### Docker Commands
```bash
docker-compose up -d  # Start PostgreSQL and Redis
docker-compose down   # Stop all services
docker-compose logs   # View service logs
```

### Setup Workflow
```bash
# 1. Copy environment variables
copy .env.example .env

# 2. Install dependencies
pnpm install

# 3. Start Docker services
docker-compose up -d

# 4. Run database migrations
cd apps/server
pnpm prisma migrate dev

# 5. Start development servers
cd ../..
pnpm dev
```

## Configuration Files

### TypeScript Configuration
- Root `tsconfig.json` - Base configuration
- `apps/client/tsconfig.json` - Next.js specific settings
- `apps/server/tsconfig.json` - Node.js specific settings
- `packages/shared/tsconfig.json` - Shared library settings

### Next.js Configuration
- `next.config.js` - Next.js framework settings
- `postcss.config.js` - PostCSS plugins
- `tailwind.config.js` - Tailwind CSS customization

### Workspace Configuration
- `pnpm-workspace.yaml` - PNPM workspace definition
- `package.json` - Root package scripts and dependencies

### Environment Variables
- `.env.example` - Template for environment configuration
- `.env` - Local environment variables (gitignored)
- Required variables: Database URL, Redis URL, AWS credentials

## Version Requirements
- Node.js: 18.x or higher recommended
- PNPM: Latest version
- Docker: For PostgreSQL and Redis services
- TypeScript: 5.6.0
- Next.js: 15.0.3
- React: 19.0.0
