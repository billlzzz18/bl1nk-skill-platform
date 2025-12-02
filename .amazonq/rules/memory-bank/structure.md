# Project Structure

## Repository Organization

### Monorepo Architecture
This is a **pnpm workspace monorepo** with three main workspaces:
- `apps/client` - Electron + Next.js frontend
- `apps/server` - Node.js + tRPC backend
- `packages/shared` - Shared types and utilities

## Directory Structure

```
claude-skill-builder/
├── apps/
│   ├── client/              # Electron + Next.js frontend application
│   │   ├── src/             # Source code
│   │   │   ├── components/  # React components
│   │   │   ├── ipc/         # IPC handlers and utilities
│   │   │   ├── routes/      # Next.js routes
│   │   │   └── stores/      # Jotai state management
│   │   ├── assets/          # Static assets
│   │   ├── drizzle/         # Database migrations
│   │   ├── public/          # Public static files
│   │   ├── workers/         # Web workers
│   │   └── forge.config.ts  # Electron Forge configuration
│   │
│   └── server/              # Backend API server
│       ├── src/             # Server source code
│       │   ├── routers/     # tRPC routers
│       │   └── index.ts     # Server entry point
│       └── prisma/          # Prisma schema and migrations
│
├── packages/
│   ├── shared/              # Shared code between client/server
│   │   ├── src/             # Shared utilities
│   │   ├── api.ts           # API types
│   │   ├── tools.ts         # Tool definitions
│   │   └── ExtensionMessage.ts  # Message types
│   │
│   └── benchmark/           # Performance benchmarking
│
├── skill/                   # Skill templates and definitions
│   ├── algorithmic-art/     # Algorithmic art generation skill
│   ├── brand-guidelines/    # Brand guideline creation
│   ├── canvas-design/       # Canvas design skill
│   ├── document-skills/     # Document processing (PDF, DOCX, XLSX, PPTX)
│   ├── frontend-design/     # Frontend design skill
│   ├── internal-comms/      # Internal communications
│   ├── mcp-builder/         # MCP server builder skill
│   ├── notion-knowledge-capture/  # Notion integration
│   ├── skill-creator/       # Meta-skill for creating skills
│   ├── slack-gif-creator/   # Slack GIF generation
│   ├── template-skill/      # Template for new skills
│   ├── theme-factory/       # Theme generation
│   ├── webapp-testing/      # Web app testing skill
│   └── web-artifacts-builder/  # Web artifact generation
│
├── agents/                  # 500+ agent JSON configurations
│   ├── [agent-name].json    # Individual agent definitions
│   └── ...                  # (500+ files)
│
├── scripts/                 # Build and utility scripts
│   ├── builders/            # Agent builder scripts
│   ├── commands/            # CLI commands
│   ├── validators/          # Validation scripts
│   │   ├── validate-skills.js
│   │   └── validate-agents.js
│   └── health-check.js      # Project health monitoring
│
├── specs/                   # Specifications and contracts
│   ├── 001-skill-builder-core/  # Core feature spec
│   ├── 002-skill-ide-core/      # IDE feature spec
│   └── main/
│       ├── openapi.yaml     # OpenAPI contract
│       └── generated/       # Generated code from specs
│
├── __tests__/               # Test suites
│   ├── e2e/                 # Playwright E2E tests (80+ specs)
│   │   ├── fixtures/        # Test fixtures
│   │   ├── helpers/         # Test helpers
│   │   └── *.spec.ts        # Test specifications
│   └── unit/                # Unit tests
│
├── docs/                    # Documentation
│   ├── Architecture.md      # Architecture documentation
│   ├── roadmap.md           # Project roadmap
│   └── TERMS_OF_SERVICE.md  # Legal documents
│
├── .amazonq/                # Amazon Q AI rules
│   └── rules/
│       ├── memory-bank/     # Memory bank documentation
│       ├── autotasks.md     # Automation rules
│       ├── docgen.md        # Documentation generation
│       └── file-organize.md # File organization rules
│
├── .claude/                 # Claude AI configuration
│   ├── commands/            # Custom Claude commands
│   └── settings.local.json  # Local settings
│
├── .cursor/                 # Cursor IDE configuration
│   └── rules/               # Cursor-specific rules
│
├── .github/                 # GitHub configuration
│   ├── workflows/           # CI/CD workflows (planned)
│   └── instructions/        # GitHub-specific instructions
│
├── .specify/                # Specification templates
│   ├── memory/              # Memory templates
│   ├── scripts/             # Specification scripts
│   └── templates/           # Document templates
│
├── workers/                 # Worker scripts
│   ├── tsc/                 # TypeScript compiler worker
│   ├── proxy_server.js      # Proxy server
│   └── component-selector-client.js
│
└── logs/                    # Application logs
    └── openai/              # OpenAI API logs
```

## Core Components

### 1. Client Application (apps/client)

#### Source Structure
```
src/
├── components/              # React UI components
│   ├── ui/                  # Reusable UI components (Radix UI)
│   ├── skill/               # Skill-specific components
│   ├── agent/               # Agent management components
│   └── editor/              # Monaco editor components
│
├── ipc/                     # Inter-Process Communication
│   ├── handlers/            # IPC message handlers
│   └── utils/               # IPC utilities
│       ├── lm_studio_utils.ts
│       └── replacePromptReference.ts
│
├── routes/                  # Next.js routing
│   ├── root.tsx             # Root layout
│   └── [feature]/           # Feature-specific routes
│
├── stores/                  # State management (Jotai)
│   ├── skillStore.ts        # Skill state
│   ├── agentStore.ts        # Agent state
│   └── credentialStore.ts   # Credential state
│
└── lib/                     # Utility libraries
    ├── db.ts                # Database client
    ├── ai.ts                # AI provider integrations
    └── utils.ts             # General utilities
```

#### Key Technologies
- **Electron**: Desktop application framework
- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **Jotai**: Atomic state management
- **TanStack Query**: Server state management
- **Drizzle ORM**: Database operations
- **Monaco Editor**: Code editor
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Styling

### 2. Server Application (apps/server)

#### Structure
```
src/
├── routers/                 # tRPC routers
│   ├── skill.ts             # Skill CRUD operations
│   ├── credential.ts        # Credential management
│   └── index.ts             # Router aggregation
│
├── services/                # Business logic
│   ├── skillService.ts      # Skill operations
│   └── credentialService.ts # Credential operations
│
└── index.ts                 # Server entry point
```

#### Key Technologies
- **tRPC**: Type-safe API layer
- **Prisma**: Database ORM
- **Express**: HTTP server
- **Zod**: Schema validation
- **AWS SDK**: Bedrock integration

### 3. Shared Package (packages/shared)

#### Purpose
Shared types, utilities, and constants used by both client and server.

#### Key Files
- `api.ts` - API type definitions
- `tools.ts` - Tool definitions for MCP
- `ExtensionMessage.ts` - IPC message types
- `context-mentions.ts` - Context handling
- `language.ts` - Internationalization
- `mcp.ts` - Model Context Protocol utilities

## Data Architecture

### Database Schema (SQLite + Drizzle)

#### Core Tables
1. **Skill**
   - id, name, description, content, metadata
   - Created/updated timestamps
   - User associations

2. **SkillVersion**
   - id, skillId, version, content, metadata
   - Snapshot of skill at specific point in time
   - Restore capability

3. **ApiCredential**
   - id, provider, credentials (encrypted), config
   - Active status, created/updated timestamps
   - Provider-specific settings

4. **TestMessage**
   - id, conversationId, role, content, timestamp
   - Ephemeral chat history for testing

5. **AppSettings**
   - key, value pairs
   - Application configuration storage

### Relationships
```
Skill (1) ──→ (N) SkillVersion
User (1) ──→ (N) Skill
User (1) ──→ (N) ApiCredential
```

## Skill System Architecture

### Skill Definition Format
Each skill is a directory containing:
- `SKILL.md` - Skill documentation and instructions
- `LICENSE.txt` - License information
- Additional resources (templates, scripts, examples)

### Agent Configuration Format
JSON files with structure:
```json
{
  "author": "string",
  "identifier": "string",
  "meta": {
    "title": "string",
    "description": "string",
    "tags": ["array"]
  },
  "systemRole": "string"
}
```

## Build & Deployment Architecture

### Build System
- **pnpm workspaces**: Monorepo management
- **Electron Forge**: Desktop app packaging
- **Vite**: Fast build tool
- **TypeScript**: Type safety across all packages

### Build Outputs
- `apps/client/.vite/` - Electron build artifacts
- `apps/client/.next/` - Next.js build
- `apps/server/dist/` - Compiled server code
- `out/` - Packaged Electron applications

### Deployment Targets
1. **Desktop**: Windows, macOS, Linux installers
2. **Docker**: Containerized deployment (planned)
3. **AWS**: Cloud infrastructure (planned)

## Testing Architecture

### E2E Tests (Playwright)
80+ test specifications covering:
- Skill creation and management
- Agent configuration
- Provider integration
- Context management
- File operations
- UI interactions

### Test Organization
```
__tests__/e2e/
├── fixtures/                # Test data and fixtures
├── helpers/                 # Test utilities
├── snapshots/               # Visual regression snapshots
└── *.spec.ts                # Test specifications
```

## Configuration Files

### Root Level
- `package.json` - Workspace configuration
- `pnpm-workspace.yaml` - Workspace definitions
- `docker-compose.yml` - Docker services
- `.env` - Environment variables
- `.prettierrc` - Code formatting
- `.lintstagedrc.json` - Pre-commit hooks

### Client Level
- `forge.config.ts` - Electron Forge configuration
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `drizzle.config.ts` - Database configuration
- `vite.*.config.mts` - Vite configurations (main, renderer, preload, worker)

### Server Level
- `prisma/schema.prisma` - Database schema
- `tsconfig.json` - TypeScript configuration

## Architectural Patterns

### Frontend Patterns
- **Component Composition**: Radix UI primitives + custom components
- **Atomic State**: Jotai atoms for granular state management
- **Server State**: TanStack Query for API data
- **IPC Communication**: Electron IPC for main/renderer communication

### Backend Patterns
- **tRPC Procedures**: Type-safe API endpoints
- **Service Layer**: Business logic separation
- **Repository Pattern**: Database access abstraction
- **Validation Layer**: Zod schemas for input validation

### Data Flow
```
UI Component → Jotai Atom → tRPC Client → tRPC Router → Service → Database
                                                      ↓
                                                  External API
```

## Integration Points

### External Services
- AWS Bedrock (Claude, Titan models)
- OpenRouter (Multi-provider LLM access)
- Anthropic API (Direct Claude access)
- OpenAI API (GPT models)
- Google AI (Gemini models)

### Local Services
- LM Studio (Local LLM server)
- Ollama (Local model management)
- PostgreSQL (Planned)
- Redis (Planned)

### File System
- Skill templates (read/write)
- Agent configurations (read/write)
- User data (SQLite database)
- Logs and cache
