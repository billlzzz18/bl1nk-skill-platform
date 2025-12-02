# Technology Stack

## Programming Languages

### TypeScript 5.8.3
- **Primary Language**: All application code
- **Configuration**: Strict mode enabled
- **Target**: ES2022
- **Module System**: ESNext with Node resolution

### JavaScript
- **Usage**: Build scripts, validators, health checks
- **Node Version**: >= 20.0.0

## Frontend Stack

### Core Framework
- **Next.js 15**: React framework with App Router
- **React 19**: UI library with latest features
- **Electron 38.2.2**: Desktop application framework

### State Management
- **Jotai 2.12.2**: Atomic state management
- **Zustand 5.0.0**: Additional state management
- **TanStack Query 5.75.5**: Server state and caching

### UI Components
- **Radix UI**: Accessible component primitives
  - Accordion, Alert Dialog, Checkbox, Dialog
  - Dropdown Menu, Label, Popover, Scroll Area
  - Select, Separator, Slot, Switch, Tabs
  - Toggle, Toggle Group, Tooltip
- **Lucide React 0.487.0**: Icon library
- **Framer Motion 12.6.3**: Animation library
- **cmdk 1.1.1**: Command palette

### Styling
- **Tailwind CSS 4.1.3**: Utility-first CSS framework
- **@tailwindcss/typography 0.5.16**: Typography plugin
- **@tailwindcss/vite 4.1.3**: Vite integration
- **class-variance-authority 0.7.1**: Component variants
- **tailwind-merge 3.1.0**: Class merging utility
- **clsx 2.1.1**: Conditional classes

### Code Editor
- **Monaco Editor 0.52.2**: VS Code editor core
- **@monaco-editor/react 4.7.0-rc.0**: React wrapper

### Markdown & Syntax Highlighting
- **react-markdown 10.1.0**: Markdown rendering
- **remark-gfm 4.0.1**: GitHub Flavored Markdown
- **shiki 3.2.1**: Syntax highlighter
- **react-shiki 0.5.2**: React integration

### Routing
- **TanStack Router 1.114.34**: Type-safe routing

## Backend Stack

### API Layer
- **tRPC 11.0.0**: Type-safe API framework
- **Express 4.21.0**: HTTP server
- **cors 2.8.5**: CORS middleware

### Database
- **SQLite**: Primary database (Phase 1)
- **Drizzle ORM 0.41.0**: Type-safe ORM for client
- **Prisma 5.22.0**: ORM for server
- **better-sqlite3 12.4.1**: SQLite driver

### Validation
- **Zod 3.25.76**: Schema validation

## AI & LLM Integration

### AI SDK
- **ai 5.0.15**: Vercel AI SDK core
- **@ai-sdk/provider-utils 3.0.3**: Provider utilities

### LLM Providers
- **@ai-sdk/amazon-bedrock 3.0.15**: AWS Bedrock (Claude, Titan)
- **@ai-sdk/anthropic 2.0.4**: Anthropic Claude API
- **@ai-sdk/google 2.0.6**: Google Gemini
- **@ai-sdk/openai 2.0.15**: OpenAI GPT models
- **@ai-sdk/openai-compatible 1.0.8**: Compatible providers
- **@openrouter/ai-sdk-provider 1.1.2**: OpenRouter integration

### Model Context Protocol
- **@modelcontextprotocol/sdk 1.17.5**: MCP SDK for tool integration

## Build Tools

### Package Manager
- **pnpm**: Fast, disk-efficient package manager
- **Workspace**: Monorepo with 3 workspaces

### Build System
- **Vite 5.4.17**: Fast build tool
- **@vitejs/plugin-react 4.3.4**: React plugin
- **Electron Forge 7.8.0**: Electron packaging
  - @electron-forge/cli
  - @electron-forge/plugin-vite
  - @electron-forge/plugin-auto-unpack-natives
  - @electron-forge/plugin-fuses
  - @electron-forge/maker-squirrel (Windows)
  - @electron-forge/maker-zip (macOS)
  - @electron-forge/maker-deb (Linux)
  - @electron-forge/maker-rpm (Linux)
  - @electron-forge/publisher-github

### TypeScript
- **typescript 5.8.3**: Type checker and compiler
- **tsx 4.19.0**: TypeScript execution

### Code Quality
- **oxlint 1.8.0**: Fast linter
- **prettier 3.5.3**: Code formatter
- **eslint 9.0.0**: Linting (root level)

## Testing

### E2E Testing
- **Playwright**: Browser automation (80+ test specs)
- **Test Coverage**: 
  - Skill management
  - Agent configuration
  - Provider integration
  - Context management
  - UI interactions

### Unit Testing
- **Vitest 3.1.1**: Fast unit test framework
- **@vitest/ui 3.1.1**: Test UI

## Development Tools

### Database Tools
- **drizzle-kit 0.30.6**: Database migrations and studio
- **prisma**: Schema management and migrations

### Utilities
- **dotenv 16.4.7**: Environment variables
- **cross-env 7.0.3**: Cross-platform env vars
- **rimraf 6.0.1**: Cross-platform rm -rf
- **fix-path 5.0.0**: PATH fixing for Electron

### Electron Utilities
- **electron-log 5.3.3**: Logging
- **electron-squirrel-startup 1.0.1**: Squirrel startup
- **update-electron-app 3.1.1**: Auto-updates
- **@electron/fuses 1.8.0**: Security fuses

### File Operations
- **glob 11.0.2**: File pattern matching
- **isomorphic-git 1.30.1**: Git operations
- **yaml 2.5.0**: YAML parsing

### Process Management
- **kill-port 2.0.1**: Kill processes on ports
- **tree-kill 1.2.2**: Kill process trees

### UI Utilities
- **react-resizable-panels 2.1.7**: Resizable layouts
- **sonner 2.0.3**: Toast notifications
- **date-fns 4.1.0**: Date utilities
- **uuid 11.1.0**: UUID generation

### Fonts
- **geist 1.3.1**: Geist font family

## AWS Integration

### AWS SDK
- **@aws-sdk/client-bedrock-runtime 3.679.0**: Bedrock API
- **@aws-crypto/util 5.2.0**: Cryptography utilities

## External APIs

### Cloud Platforms
- **@vercel/sdk 1.17.7**: Vercel API
- **@neondatabase/api-client 2.3.0**: Neon database API
- **axios 1.7.0**: HTTP client

## Development Commands

### Root Level (Monorepo)
```bash
# Development
pnpm dev                    # Start all workspaces in parallel
pnpm build                  # Build all workspaces
pnpm test                   # Run tests in all workspaces
pnpm lint                   # Lint all workspaces
pnpm clean                  # Clean all workspaces

# Docker
docker-compose up -d        # Start PostgreSQL & Redis (planned)
docker-compose down         # Stop services
```

### Client (apps/client)
```bash
# Development
pnpm dev                    # Start Electron app
pnpm start                  # Alternative start command

# Building
pnpm package                # Package app (no installer)
pnpm make                   # Create installers
pnpm publish                # Publish to GitHub

# Database
pnpm db:generate            # Generate Drizzle schema
pnpm db:push                # Push schema to database
pnpm db:studio              # Open Drizzle Studio

# Code Quality
pnpm ts                     # TypeScript type check
pnpm lint                   # Run oxlint
pnpm prettier               # Format code

# Testing
pnpm test                   # Run unit tests
pnpm test:watch             # Watch mode

# Cleanup
pnpm clean                  # Remove build artifacts
```

### Server (apps/server)
```bash
# Development
pnpm dev                    # Start with hot reload (tsx watch)
pnpm build                  # Compile TypeScript
pnpm start                  # Run compiled code

# Database (Prisma)
pnpm prisma:generate        # Generate Prisma client
pnpm prisma:migrate         # Run migrations
pnpm prisma:studio          # Open Prisma Studio

# Cleanup
pnpm clean                  # Remove dist and node_modules
```

### Validation Scripts
```bash
# Skill & Agent Validation
node scripts/validators/validate-skills.js    # Validate skill structure
node scripts/validators/validate-agents.js    # Validate 500+ agents

# Health Check
node scripts/health-check.js                  # Project health status
```

## Environment Variables

### Client (.env)
```bash
# Database
DATABASE_URL=file:./local.db

# AI Providers
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
OPENROUTER_API_KEY=

# Application
NODE_ENV=development
LOG_LEVEL=info
```

### Server (.env)
```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/db

# API
PORT=3001
CORS_ORIGIN=http://localhost:3000

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

## Build Configurations

### TypeScript Configurations
- `tsconfig.json` - Root configuration
- `apps/client/tsconfig.json` - Client config
- `apps/client/tsconfig.app.json` - App-specific
- `apps/client/tsconfig.node.json` - Node-specific
- `apps/server/tsconfig.json` - Server config
- `packages/shared/tsconfig.json` - Shared config

### Vite Configurations
- `vite.main.config.mts` - Electron main process
- `vite.preload.config.mts` - Electron preload
- `vite.renderer.config.mts` - Electron renderer
- `vite.worker.config.mts` - Web workers

### Electron Forge
- `forge.config.ts` - Packaging and publishing configuration
- Makers: Squirrel (Win), ZIP (Mac), DEB/RPM (Linux)
- Publisher: GitHub releases

## Platform Support

### Desktop Platforms
- **Windows**: x64, arm64 (.exe, .msi via Squirrel)
- **macOS**: x64, arm64 (.dmg, .zip with code signing)
- **Linux**: x64 (.deb, .rpm, AppImage)

### Node.js Requirements
- **Minimum Version**: 20.0.0
- **Recommended**: Latest LTS

## Performance Optimizations

### Build Optimizations
- Vite for fast HMR
- Code splitting in Next.js
- Tree shaking
- Minification in production

### Runtime Optimizations
- React 19 concurrent features
- Jotai atomic updates
- TanStack Query caching
- SQLite for fast local storage
- Web workers for heavy computations

## Security Features

### Credential Security
- Encrypted storage for API keys
- Secure IPC communication
- Electron security best practices
- Fuses for additional security

### Code Signing
- macOS: Apple Developer ID + notarization
- Windows: DigiCert certificate (planned)

## Monitoring & Logging

### Logging
- **electron-log**: Structured logging
- **Log Levels**: info, warn, error
- **Log Location**: `logs/` directory

### Error Tracking
- Electron crash reporting
- Console error capture
- IPC error handling

## Dependencies Summary

### Total Dependencies
- **Client**: 80+ dependencies
- **Server**: 15+ dependencies
- **Shared**: 30+ dependencies

### Key Dependency Categories
1. **UI/UX**: React, Radix UI, Tailwind, Monaco
2. **State**: Jotai, Zustand, TanStack Query
3. **AI**: Multiple provider SDKs, MCP
4. **Database**: Drizzle, Prisma, SQLite
5. **Build**: Vite, Electron Forge, TypeScript
6. **Testing**: Playwright, Vitest
7. **Utilities**: Date-fns, UUID, YAML, Glob
