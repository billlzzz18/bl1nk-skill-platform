# Contributing to Claude Skill Builder

## Getting Started

### Prerequisites
- Node.js >= 20.0.0
- pnpm (latest version)
- Git

### Initial Setup
```bash
# Clone repository
git clone https://github.com/bl1nk-org/claude-skill-builder.git
cd claude-skill-builder

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start Docker services (optional for Phase 2 features)
docker-compose up -d

# Run database migrations
cd apps/server
pnpm prisma:migrate
cd ../..

# Start development servers
pnpm dev
```

## Project Structure

```
claude-skill-builder/
├── apps/
│   ├── client/          # Electron + Next.js frontend
│   └── server/          # Express + tRPC backend
├── packages/
│   └── shared/          # Shared types and utilities
├── agents/              # 501 agent JSON templates
├── skill/               # 15 skill categories
├── scripts/             # Build and validation scripts
├── __tests__/           # E2E and unit tests
└── specs/               # Feature specifications
```

## Development Workflow

### Running the Application
```bash
# Start all services in development mode
pnpm dev

# Start individual workspaces
cd apps/client && pnpm dev
cd apps/server && pnpm dev
```

### Code Quality
```bash
# Format code
pnpm format

# Lint code
pnpm lint

# Type check
pnpm type-check

# Run all quality checks
pnpm validate
```

### Testing
```bash
# Run E2E tests
pnpm test:e2e

# Run unit tests
pnpm test:unit

# Validate skills and agents
pnpm validate:skills
pnpm validate:agents

# Project health check
node scripts/health-check.js
```

### Database Operations
```bash
# Drizzle (Client)
cd apps/client
pnpm db:generate    # Generate schema
pnpm db:push        # Push to database
pnpm db:studio      # Open Drizzle Studio

# Prisma (Server)
cd apps/server
pnpm prisma:generate  # Generate client
pnpm prisma:migrate   # Run migrations
pnpm prisma:studio    # Open Prisma Studio
```

## Code Standards

### TypeScript
- Strict mode enabled
- Explicit return types on exported functions
- No `any` types (use `unknown` or proper typing)
- Use `import type` for type-only imports

### Naming Conventions
- **Files**: PascalCase for components, camelCase for utilities, kebab-case for configs
- **Variables/Functions**: camelCase
- **Types/Interfaces**: PascalCase
- **Constants**: UPPER_SNAKE_CASE

### Code Formatting
- Prettier configuration enforced
- Semicolons: Always
- Quotes: Single
- Print width: 100 characters
- Tab width: 2 spaces

### React Patterns
- Functional components with function declarations
- Jotai for global state
- TanStack Query for server state
- Radix UI primitives for components
- Tailwind CSS for styling

## Adding New Features

### 1. Create a Skill
```bash
# Copy template
cp -r skill/template-skill skill/my-new-skill

# Edit SKILL.md with documentation
# Add LICENSE.txt

# Validate
node scripts/validators/validate-skills.js
```

### 2. Create an Agent
```json
{
  "author": "Your Name",
  "identifier": "unique-agent-id",
  "meta": {
    "title": "Agent Title",
    "description": "Agent description",
    "tags": ["category", "tags"]
  },
  "systemRole": "Detailed system role instructions..."
}
```

Validate:
```bash
node scripts/validators/validate-agents.js
```

### 3. Add API Endpoints
- Update `specs/main/openapi.yaml` with new endpoints
- Implement in `apps/server/src/routers/rest.router.ts`
- Add tRPC procedures in appropriate router
- Update shared types in `packages/shared/`

### 4. Add Tests
```typescript
// __tests__/e2e/my-feature.spec.ts
import { test, expect } from '@playwright/test';

test('my feature works', async ({ page }) => {
  // Test implementation
});
```

## Pull Request Process

1. **Create a branch**: `git checkout -b feature/my-feature`
2. **Make changes**: Follow code standards
3. **Run validation**: `pnpm validate`
4. **Run tests**: `pnpm test`
5. **Commit**: Use conventional commits
6. **Push**: `git push origin feature/my-feature`
7. **Create PR**: Describe changes and link issues

### Commit Message Format
```
type(scope): subject

body (optional)

footer (optional)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
```
feat(agents): add python development agent
fix(api): correct skill versioning endpoint
docs(readme): update setup instructions
```

## Pre-commit Hooks

Lint-staged automatically runs on commit:
- ESLint with auto-fix
- Prettier formatting
- Prisma schema formatting

## Building & Packaging

```bash
# Build all packages
pnpm build

# Package Electron app (no installer)
cd apps/client
pnpm package

# Create installers
pnpm make

# Publish to GitHub
pnpm publish
```

## Troubleshooting

### Common Issues

**Port already in use**:
```bash
# Kill process on port 3001
npx kill-port 3001
```

**Database issues**:
```bash
# Reset database
rm apps/client/local.db
pnpm --filter bl1nk-skill-ide db:push
```

**Node modules issues**:
```bash
# Clean install
pnpm clean
pnpm install
```

**Docker services not starting**:
```bash
docker-compose down
docker-compose up -d
```

## Documentation

- **Memory Bank**: `.amazonq/rules/memory-bank/`
- **Architecture**: `docs/Architecture.md`
- **Security**: `docs/SECURITY.md`
- **Roadmap**: `docs/roadmap.md`
- **API Spec**: `specs/main/openapi.yaml`

## Getting Help

- Check existing issues on GitHub
- Review documentation in `docs/`
- Ask questions in discussions
- Join community channels

## License

MIT License - see LICENSE file for details
