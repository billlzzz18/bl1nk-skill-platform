# Project Structure

## Directory Organization

### Root Level
```
claude-skill-builder/
├── apps/              # Application packages
├── packages/          # Shared libraries
├── skill/             # Skill definitions and templates
├── scripts/           # Build and automation scripts
├── __tests__/         # Test suites
├── specs/             # Project specifications
├── workers/           # Background workers
├── agents/            # Pre-built agent configurations
├── drizzle/           # Database migrations
└── docs/              # Documentation
```

### Core Applications (`apps/`)

#### Client Application (`apps/client/`)
Next.js 15 frontend with React 19
- `src/components/` - React components including chat UI, markdown parser
- `src/ipc/` - Inter-process communication handlers for chat streaming
- `public/` - Static assets
- Configuration: `next.config.js`, `tailwind.config.js`, `tsconfig.json`

#### Server Application (`apps/server/`)
Node.js backend with tRPC API layer
- `src/` - Server logic, tRPC routers, business logic
- `prisma/` - Database schema and migrations
- `.env` - Environment configuration
- Configuration: `tsconfig.json`, `package.json`

### Shared Packages (`packages/`)

#### Shared Library (`packages/shared/`)
Common types, utilities, and business logic
- `src/` - Shared TypeScript modules
- `bl1nk/` - Custom bl1nk framework integration
- `utils/` - Utility functions
- `__tests__/` - Unit tests for shared code
- Key modules:
  - `api.ts` - API client utilities
  - `ExtensionMessage.ts` - Message type definitions
  - `tools.ts` - Tool integrations
  - `mcp.ts` - Model Context Protocol support
  - `context-mentions.ts` - Context handling
  - `VirtualFilesystem.ts` - Virtual file system abstraction

#### Benchmark Package (`packages/benchmark/`)
Performance testing and metrics collection

### Skill System (`skill/`)

Organized by skill category with standardized structure:
- `SKILL.md` - Skill definition and documentation
- `LICENSE.txt` - Licensing information
- Category-specific resources (templates, scripts, examples)

#### Skill Categories
- **document-skills/** - DOCX, PDF, PPTX, XLSX processing
  - `docx/ooxml/` - Office Open XML validation scripts
- **design-skills/** - Canvas, frontend, algorithmic art, theme factory
- **development-skills/** - MCP builder, web artifacts, webapp testing
- **communication-skills/** - Internal comms, Slack, Notion integration
- **template-skill/** - Base template for new skills

### Agent Library (`agents/`)
400+ pre-configured agent JSON definitions covering:
- Academic writing and research
- Software development (multiple languages/frameworks)
- Translation and language learning
- Business and marketing
- Creative writing and design
- Technical consulting
- Domain-specific expertise

### Testing Infrastructure (`__tests__/`)

#### E2E Tests (`__tests__/e2e/`)
Comprehensive end-to-end testing with Playwright
- `fixtures/` - Test data and fixtures
- `helpers/` - Test helper utilities including `test_helper.ts`
- `snapshots/` - Visual regression snapshots
- 80+ test specifications covering:
  - Chat functionality and streaming
  - Provider management (Azure, Ollama, LM Studio)
  - Context management and mentions
  - File operations and imports
  - UI interactions and workflows

#### Unit Tests (`__tests__/unit/`)
Component and function-level testing

### Build System (`scripts/`)

Organized automation and build tooling:
- `builders/` - Agent builder utilities
- `commands/` - CLI commands (build, test, format, validate)
- `core/` - Core constants and models
- `formatters/` - Code and content formatters
- `parsers/` - Agent definition parsers
- `processors/` - Category and i18n processors
- `schema/` - Validation schemas (agentMeta, LLM)
- `utils/` - Common utilities (file, logger, token)
- `validators/` - Agent and language validators

### Specifications (`specs/`)
Project planning and technical specifications
- `001-skill-builder-core/` - Core feature specifications
  - `spec.md`, `plan.md`, `tasks.md` - Planning documents
  - `checklists/`, `contracts/` - Implementation tracking
  - `data-model.md` - Database schema design

### Workers (`workers/`)
Background processing and utilities
- `tsc/` - TypeScript compilation worker
- `proxy_server.js` - Development proxy
- `component-selector-client.js` - Component selection utilities

### Database (`drizzle/`)
Database migration history with Drizzle ORM
- 17 migration files tracking schema evolution
- `meta/` - Migration metadata and journal

### Configuration Files
- `.devcontainer/` - VS Code dev container configuration
- `.github/` - GitHub workflows and instructions
- `.claude/` - Claude-specific commands and settings
- `.cursor/` - Cursor IDE rules and standards
- `.specify/` - Specification templates and memory
- `.amazonq/` - Amazon Q rules and memory bank

## Architectural Patterns

### Monorepo Structure
- PNPM workspace with shared dependencies
- Independent versioning per package
- Parallel development and testing workflows

### Client-Server Architecture
- Next.js frontend with React Server Components
- tRPC for type-safe API communication
- Prisma ORM for database abstraction
- Redis for caching and session management

### Skill System Architecture
- Markdown-based skill definitions
- JSON metadata for agent configurations
- Modular skill components with inheritance
- Plugin-style extensibility

### Testing Strategy
- E2E tests for user workflows
- Unit tests for business logic
- Integration tests for API endpoints
- Snapshot tests for UI consistency

### Development Workflow
- Docker Compose for local services (PostgreSQL, Redis)
- Hot reload for both client and server
- Automated migrations with Prisma
- Parallel script execution with PNPM
