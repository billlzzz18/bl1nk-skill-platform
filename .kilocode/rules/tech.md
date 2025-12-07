# Technology Stack

## Programming Languages

### TypeScript 5.8+
- **Primary Language**: All application code
- **Strict Mode**: Enabled for type safety
- **Target**: ES2022
- **Module System**: ESM (ES Modules)
- **Configuration**: Multiple tsconfig.json files per workspace

### JavaScript (Node.js 20+)
- **Build Scripts**: Validation, health checks, documentation generation
- **Legacy Support**: Some scripts in CommonJS format

## Frontend Stack

### Core Framework
- **Electron 38.2.2**: Desktop application framework
  - Main process: Node.js environment
  - Renderer process: Chromium-based browser
  - Preload scripts: Secure IPC bridge
  - Context isolation enabled
  - Node integration disabled in renderer

- **React 19.0.0**: UI library
  - Functional components with hooks
  - Concurrent features enabled
  - Strict mode in development

- **Next.js 15**: React framework (for renderer process)
  - App Router architecture
  - Server components where applicable
  - Static optimization

### UI Components & Styling
- **Radix UI**: Headless component primitives
  - Accordion, Dialog, Dropdown, Select, Tabs, Tooltip, etc.
  - Accessibility built-in (ARIA compliant)
  
- **Tailwind CSS 4.1.17**: Utility-first CSS
  - PostCSS integration
  - Custom design tokens
  - JIT (Just-In-Time) compilation

- **class-variance-authority**: Component variant management
- **tailwind-merge**: Intelligent class merging
- **clsx**: Conditional class names
- **Lucide React**: Icon library (487+ icons)
- **Framer Motion 12.6**: Animation library

### Code Editor
- **Monaco Editor 0.52.2**: VS Code's editor
  - Full TypeScript/JavaScript support
  - Syntax highlighting
  - IntelliSense
  - Multi-cursor editing
  - @monaco-editor/react wrapper

### State Management
- **Jotai 2.12**: Atomic state management
  - Bottom-up approach
  - Minimal boilerplate
  - TypeScript-first

- **Zustand 5.0**: State machines
  - Simple API
  - No providers needed
  - Middleware support

- **TanStack Query 5.75**: Server state management
  - Caching and synchronization
  - Automatic refetching
  - Optimistic updates

### Routing
- **TanStack Router 1.114**: Type-safe routing
  - File-based routing
  - Route loaders
  - Search params validation

## Backend Stack

### Server Framework
- **Express.js 4.21**: HTTP server
  - Middleware architecture
  - RESTful API design
  
- **tRPC 11.0**: Type-safe API layer
  - End-to-end type safety
  - No code generation
  - React Query integration

### Database & ORM

#### Phase 1 (Current - Client)
- **SQLite**: Embedded database
  - **better-sqlite3 12.4.1**: Synchronous SQLite3 bindings
  - Local data storage
  - No server required

- **Drizzle ORM 0.41.0**: TypeScript ORM
  - Type-safe queries
  - Schema migrations
  - drizzle-kit for migrations

#### Phase 2 (Planned - Server)
- **PostgreSQL**: Production database
  - @neondatabase/serverless for Neon integration
  - Managed hosting options

- **Prisma 5.22**: ORM for PostgreSQL
  - Schema-first approach
  - Migration system
  - Prisma Studio for GUI

### Caching & Sessions
- **Redis**: In-memory data store (Phase 2)
  - ioredis client
  - Session management
  - Rate limiting

## AI & LLM Integration

### AI SDK
- **Vercel AI SDK 5.0.15**: Unified AI interface
  - Streaming support
  - Provider abstraction
  - React hooks

### LLM Providers
1. **AWS Bedrock** (@ai-sdk/amazon-bedrock 3.0.15)
   - Claude models (Anthropic)
   - Titan models (Amazon)
   - Region-specific endpoints

2. **Anthropic** (@ai-sdk/anthropic 2.0.4)
   - Claude 3 family
   - Direct API access

3. **OpenAI** (@ai-sdk/openai 2.0.15)
   - GPT-4, GPT-3.5
   - Function calling
   - Vision models

4. **Google** (@ai-sdk/google 2.0.6)
   - Gemini models
   - PaLM 2
   - @ai-sdk/google-vertex for Vertex AI

5. **OpenRouter** (@openrouter/ai-sdk-provider 1.1.2)
   - Unified access to multiple models
   - Cost optimization

6. **Azure OpenAI** (@ai-sdk/azure 1.0.0)
   - Enterprise deployment
   - Private endpoints

7. **xAI** (@ai-sdk/xai 2.0.39)
   - Grok models

### MCP (Model Context Protocol)
- **@modelcontextprotocol/sdk 1.17.5**: MCP implementation
  - Server creation
  - Tool definitions
  - Context management

## Build Tools

### Package Manager
- **pnpm 8+**: Fast, disk-efficient package manager
  - Workspace support
  - Strict dependency resolution
  - Content-addressable storage

### Bundlers & Compilers
- **Vite 5.4.17**: Build tool and dev server
  - Fast HMR (Hot Module Replacement)
  - ESM-first
  - Plugin ecosystem
  - Multiple configs: main, renderer, preload, worker

- **esbuild 0.25+**: JavaScript bundler
  - Extremely fast compilation
  - Used by Vite internally

- **tsx 4.19**: TypeScript execution
  - Direct TS execution
  - Watch mode for development

### Electron Tooling
- **Electron Forge 7.8**: Build and package
  - @electron-forge/plugin-vite
  - @electron-forge/plugin-fuses
  - Platform-specific makers (ZIP, Squirrel, DEB, RPM)
  - @electron-forge/publisher-github for releases

## Testing

### Unit Testing
- **Vitest 3.1.1**: Unit test framework
  - Vite-native testing
  - Jest-compatible API
  - Fast execution
  - @vitest/ui for test UI
  - jsdom 23.0 for DOM testing

### E2E Testing
- **Playwright 1.40**: Browser automation
  - Cross-browser testing
  - Auto-waiting
  - Screenshots and videos
  - Parallel execution

### API Testing
- **SuperTest 6.3.4**: HTTP assertion library
  - Express integration
  - Fluent API

### Test Utilities
- **@jest/globals 29.7**: Jest globals for compatibility

## Code Quality

### Linting
- **ESLint 9.0**: JavaScript/TypeScript linter
  - @typescript-eslint/parser
  - @typescript-eslint/eslint-plugin
  - Custom rules for project

- **oxlint 1.8**: Fast Rust-based linter
  - Used in client package
  - Faster than ESLint

### Formatting
- **Prettier 3.5.3**: Code formatter
  - Consistent style
  - Auto-formatting on save
  - Integration with ESLint

### Type Checking
- **TypeScript Compiler**: Static type checking
  - `tsc --noEmit` for validation
  - Separate configs per workspace

## Validation & Schemas

### Runtime Validation
- **Zod 3.25.76**: TypeScript-first schema validation
  - Runtime type checking
  - Schema inference
  - Error messages
  - Used throughout for API validation

- **Valibot 1.2+**: Alternative validation library
  - Smaller bundle size
  - Modular design

## Utilities

### File System
- **fs-extra 11.0**: Enhanced file system operations
- **glob 11.0**: File pattern matching
- **rimraf 6.0**: Cross-platform rm -rf

### Git Integration
- **isomorphic-git 1.30**: Pure JavaScript Git
  - No native dependencies
  - Works in Electron renderer

### Process Management
- **tree-kill 1.2**: Kill process trees
- **kill-port 2.0**: Kill processes by port
- **fix-path 5.0**: Fix PATH in Electron

### Date & Time
- **date-fns 4.1**: Modern date utility library
  - Modular functions
  - Immutable
  - TypeScript support

### Logging
- **electron-log 5.3**: Logging for Electron
  - File and console output
  - Log levels
  - Rotation

### Analytics
- **posthog-js 1.200**: Product analytics
  - Event tracking
  - Feature flags
  - Session recording

### Markdown
- **react-markdown 10.1**: Markdown renderer
- **remark-gfm 4.0**: GitHub Flavored Markdown
- **react-shiki 0.5**: Syntax highlighting
- **shiki 3.2**: Code highlighter

### Other Utilities
- **uuid 11.1**: UUID generation
- **yaml 2.5**: YAML parser
- **dotenv 16.4**: Environment variables
- **axios 1.7**: HTTP client
- **cmdk 1.1**: Command palette
- **sonner 2.0**: Toast notifications

## Security

### Encryption
- **@aws-crypto/util 5.2**: AWS encryption utilities
- **AES-256-GCM**: Credential encryption algorithm

### HTTP Security
- **helmet 7.1**: Security headers
- **cors 2.8**: CORS middleware
- **express-rate-limit 8.2**: Rate limiting

## Development Commands

### Root Level (Monorepo)
```bash
# Development
pnpm dev                    # Start all services in parallel
pnpm build                  # Build all packages
pnpm clean                  # Clean all build artifacts

# Quality Checks
pnpm lint                   # Lint all packages
pnpm lint:fix              # Fix linting issues
pnpm format                # Format all files
pnpm format:check          # Check formatting
pnpm type-check            # TypeScript validation
pnpm validate              # Run all checks

# Testing
pnpm test                  # Run all tests
pnpm test:unit             # Unit tests only
pnpm test:e2e              # E2E tests only

# Validation
pnpm validate:skills       # Validate skill definitions
pnpm validate:agents       # Validate 501 agents
pnpm validate:docs         # Validate documentation
pnpm health                # Project health check

# Documentation
pnpm generate:docs         # Generate documentation

# Docker
pnpm docker:up             # Start PostgreSQL & Redis
pnpm docker:down           # Stop services
```

### Client (`apps/client`)
```bash
# Development
pnpm dev                   # Start Electron in dev mode
pnpm start                 # Alias for dev

# Building
pnpm build                 # Build for production
pnpm package               # Package Electron app
pnpm make                  # Create installers
pnpm publish               # Publish to GitHub

# Database
pnpm db:generate           # Generate Drizzle migrations
pnpm db:push               # Push schema to database
pnpm db:studio             # Open Drizzle Studio

# Quality
pnpm ts                    # TypeScript check
pnpm lint                  # Run oxlint
pnpm prettier              # Format code

# Testing
pnpm test                  # Run Vitest tests
pnpm test:watch            # Watch mode

# Cleanup
pnpm clean                 # Remove build artifacts
```

### Server (`apps/server`)
```bash
# Development
pnpm dev                   # Start with tsx watch

# Building
pnpm build                 # Compile TypeScript
pnpm start                 # Run compiled code

# Database (Prisma)
pnpm prisma:generate       # Generate Prisma client
pnpm prisma:migrate        # Run migrations
pnpm prisma:studio         # Open Prisma Studio

# Cleanup
pnpm clean                 # Remove dist and node_modules
```

## Environment Variables

### Client (`.env`)
```bash
# Database
DATABASE_URL=file:./local.db

# AI Providers
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
OPENAI_API_KEY=<key>
ANTHROPIC_API_KEY=<key>
GOOGLE_API_KEY=<key>
OPENROUTER_API_KEY=<key>

# Analytics
POSTHOG_KEY=<key>
POSTHOG_HOST=https://app.posthog.com

# Feature Flags
ENABLE_TELEMETRY=false
```

### Server (`.env`)
```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/db

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=<secret>
JWT_EXPIRY=7d

# Encryption
ENCRYPTION_KEY=<32-byte-key>

# Rate Limiting
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100
```

## Version Requirements

- **Node.js**: >= 20.0.0
- **pnpm**: >= 8.0.0
- **TypeScript**: >= 5.6.0
- **Electron**: 38.2.2 (specific version)
- **React**: 19.0.0
- **PostgreSQL**: >= 14 (Phase 2)
- **Redis**: >= 6 (Phase 2)

## Platform Support

### Desktop App (Electron)
- **macOS**: 10.15+ (Catalina and later)
- **Windows**: 10/11 (64-bit)
- **Linux**: Ubuntu 20.04+, Debian 10+, Fedora 32+

### Development
- **macOS**: Primary development platform
- **Windows**: Full support with WSL2 recommended
- **Linux**: Full support

## CI/CD

### GitHub Actions Workflows
- **ci.yml**: Continuous integration
  - Lint, format, type-check
  - Unit and E2E tests
  - Build verification

- **build-verification.yml**: Build checks
- **database-check.yml**: Database migration validation
- **docker-build.yml**: Docker image building
- **electron-release.yml**: Desktop app releases
- **eslint.yml**: Linting checks
- **security-scan.yml**: Security vulnerability scanning

## Performance Optimizations

- **Code Splitting**: Vite automatic chunking
- **Tree Shaking**: Dead code elimination
- **Lazy Loading**: Dynamic imports for routes
- **Memoization**: React.memo, useMemo, useCallback
- **Virtual Scrolling**: For large lists
- **Worker Threads**: Background processing
- **SQLite WAL Mode**: Better concurrency
- **Query Optimization**: Indexed database queries
