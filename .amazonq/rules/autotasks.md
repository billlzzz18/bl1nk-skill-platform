# 🤖 Claude Skill Builder - Automation & Validation

## 📦 Project-Specific Setup

### 1. **Root Package.json Scripts**
```json
{
  "scripts": {
    "dev": "pnpm --parallel -r dev",
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "test:e2e": "playwright test",
    "test:unit": "pnpm -r test:unit",
    "lint": "pnpm -r lint",
    "lint:fix": "pnpm -r lint:fix",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "type-check": "pnpm -r type-check",
    "validate": "pnpm run format:check && pnpm run lint && pnpm run type-check",
    "validate:skills": "node scripts/validators/validate-skills.js",
    "validate:agents": "node scripts/validators/validate-agents.js",
    "clean": "pnpm -r clean && rm -rf node_modules",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down",
    "db:migrate": "cd apps/server && pnpm prisma:migrate",
    "db:studio": "cd apps/server && pnpm prisma:studio",
    "precommit": "lint-staged",
    "prepush": "pnpm run validate && pnpm run test:unit"
  }
}
```

### 2. **ESLint Configuration (.eslintrc.json)**
```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "project": ["./tsconfig.json", "./apps/*/tsconfig.json", "./packages/*/tsconfig.json"]
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/prefer-const": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/await-thenable": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "error",
    "no-var": "error"
  },
  "ignorePatterns": ["dist", ".next", "node_modules", "drizzle"]
}
```

### 3. **Prettier Configuration (.prettierrc)**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### 4. **Lint-Staged Configuration (.lintstagedrc.json)**
```json
{
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{js,jsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md,yml,yaml}": [
    "prettier --write"
  ],
  "apps/server/prisma/schema.prisma": [
    "prisma format"
  ]
}
```

## 📊 Project Validation Scripts

### 1. **Skill Validator (scripts/validators/validate-skills.js)**
```javascript
const fs = require('fs');
const path = require('path');

const SKILL_DIR = path.join(__dirname, '../../skill');
const REQUIRED_FILES = ['SKILL.md', 'LICENSE.txt'];

function validateSkill(skillPath) {
  const errors = [];
  const skillName = path.basename(skillPath);

  // Check required files
  REQUIRED_FILES.forEach(file => {
    if (!fs.existsSync(path.join(skillPath, file))) {
      errors.push(`Missing ${file}`);
    }
  });

  // Validate SKILL.md structure
  const skillMd = path.join(skillPath, 'SKILL.md');
  if (fs.existsSync(skillMd)) {
    const content = fs.readFileSync(skillMd, 'utf-8');
    if (!content.includes('# ')) errors.push('Missing title in SKILL.md');
    if (!content.includes('## Description')) errors.push('Missing Description section');
  }

  return { skillName, errors };
}

function main() {
  const skills = fs.readdirSync(SKILL_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.'))
    .map(d => path.join(SKILL_DIR, d.name));

  const results = skills.map(validateSkill);
  const failed = results.filter(r => r.errors.length > 0);

  if (failed.length > 0) {
    console.error(`❌ Found ${failed.length} invalid skills:\n`);
    failed.forEach(({ skillName, errors }) => {
      console.error(`  ${skillName}:`);
      errors.forEach(e => console.error(`    - ${e}`));
    });
    process.exit(1);
  }

  console.log(`✅ All ${results.length} skills validated successfully`);
}

main();
```

### 2. **Agent Validator (scripts/validators/validate-agents.js)**
```javascript
const fs = require('fs');
const path = require('path');

const AGENTS_DIR = path.join(__dirname, '../../agents');

const REQUIRED_FIELDS = ['author', 'identifier', 'meta', 'systemRole'];
const META_FIELDS = ['title', 'description'];

function validateAgent(agentPath) {
  const errors = [];
  const agentName = path.basename(agentPath, '.json');

  try {
    const content = fs.readFileSync(agentPath, 'utf-8');
    const data = JSON.parse(content);

    // Check required fields
    REQUIRED_FIELDS.forEach(field => {
      if (!data[field]) errors.push(`Missing field: ${field}`);
    });

    // Check meta fields
    if (data.meta) {
      META_FIELDS.forEach(field => {
        if (!data.meta[field]) errors.push(`Missing meta.${field}`);
      });
    }

    // Validate systemRole length
    if (data.systemRole && data.systemRole.length < 10) {
      errors.push('systemRole must be at least 10 characters');
    }

  } catch (error) {
    if (error instanceof SyntaxError) {
      errors.push('Invalid JSON syntax');
    } else {
      errors.push(error.message);
    }
  }

  return { agentName, errors };
}

function main() {
  const agents = fs.readdirSync(AGENTS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => path.join(AGENTS_DIR, f));

  const results = agents.map(validateAgent);
  const failed = results.filter(r => r.errors.length > 0);

  if (failed.length > 0) {
    console.error(`❌ Found ${failed.length} invalid agents:\n`);
    failed.forEach(({ agentName, errors }) => {
      console.error(`  ${agentName}:`);
      errors.forEach(e => console.error(`    - ${e}`));
    });
    process.exit(1);
  }

  console.log(`✅ All ${results.length} agents validated successfully`);
}

main();
```

### 3. **TypeScript Type Check (All Workspaces)**
```bash
# Client
cd apps/client && npx tsc --noEmit

# Server
cd apps/server && npx tsc --noEmit

# Shared
cd packages/shared && npx tsc --noEmit
```

## 🚨 Automated Quality Checks

### 1. **Security & Dependencies**
```bash
# Check for vulnerabilities
pnpm audit

# Fix auto-fixable vulnerabilities
pnpm audit --fix

# Check for outdated packages
pnpm outdated -r

# Update dependencies
pnpm update -r --latest
```

### 2. **Database Validation**
```bash
# Validate Prisma schema
cd apps/server && pnpm prisma validate

# Check migration status
cd apps/server && pnpm prisma migrate status

# Generate Prisma client
cd apps/server && pnpm prisma generate
```

### 3. **Docker Services Health Check**
```bash
# Check running containers
docker-compose ps

# Check PostgreSQL
docker-compose exec postgres pg_isready

# Check Redis
docker-compose exec redis redis-cli ping
```

### 4. **Build Validation**
```bash
# Build all packages
pnpm build

# Check build outputs
test -d apps/client/.next && echo "✅ Client built" || echo "❌ Client build failed"
test -d apps/server/dist && echo "✅ Server built" || echo "❌ Server build failed"
```

## 📋 Validation Checklists

### Pre-commit Checks (Automated via lint-staged)
- [ ] ESLint passes without errors
- [ ] Prettier formatting applied
- [ ] TypeScript compilation successful
- [ ] No console.log statements (warnings allowed)
- [ ] Prisma schema formatted

### Pre-push Checks (Run manually: `pnpm prepush`)
- [ ] All workspace type checks pass
- [ ] Linting passes across all packages
- [ ] Unit tests pass
- [ ] Skills validation passes
- [ ] Agents validation passes (400+ agents)
- [ ] No security vulnerabilities

### Pre-deployment Checks
- [ ] Docker services running (PostgreSQL, Redis)
- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] Client builds successfully
- [ ] Server builds successfully
- [ ] E2E tests pass (80+ specs)
- [ ] tRPC routes validated

### Skill Development Checks
- [ ] SKILL.md exists with proper structure
- [ ] LICENSE.txt present
- [ ] No broken markdown links
- [ ] YAML/JSON syntax valid
- [ ] Examples provided

### Agent Development Checks
- [ ] Valid JSON structure
- [ ] Required fields: author, identifier, meta, systemRole
- [ ] systemRole minimum 10 characters
- [ ] Tags array properly formatted
- [ ] No duplicate identifiers

## 🔍 Manual Code Review Checklist

### Architecture & Design
- [ ] Follows monorepo workspace structure
- [ ] No circular dependencies between packages
- [ ] Proper separation: client/server/shared
- [ ] tRPC routers properly organized
- [ ] Prisma models follow naming conventions

### TypeScript Quality
- [ ] Explicit return types on functions
- [ ] No `any` types (use `unknown` if needed)
- [ ] Zod schemas for validation
- [ ] Type imports used correctly
- [ ] Shared types in packages/shared

### React/Next.js Patterns
- [ ] Functional components with proper typing
- [ ] Jotai atoms for global state
- [ ] React Query for server state
- [ ] useMemo for expensive computations
- [ ] No unnecessary re-renders
- [ ] Proper error boundaries

### IPC & Streaming
- [ ] Abort controllers for cancellation
- [ ] Proper error handling in handlers
- [ ] Stream cleanup on unmount
- [ ] Safe send to prevent crashes

### Database & API
- [ ] Prisma queries optimized
- [ ] Relations properly loaded
- [ ] Input validation with Zod
- [ ] Error responses standardized
- [ ] SQL injection prevention

### Testing
- [ ] E2E tests for critical flows
- [ ] PageObject pattern used
- [ ] Snapshot tests for UI
- [ ] Mock external services (AWS Bedrock)
- [ ] Test fixtures organized

### Skills & Agents
- [ ] SKILL.md follows template
- [ ] Agent JSON schema valid
- [ ] No duplicate identifiers
- [ ] Proper licensing information
- [ ] Examples provided

## 📈 Monitoring & Metrics

### 1. **Project Health Script (scripts/health-check.js)**
```javascript
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function checkHealth() {
  const checks = [];

  // Check Docker services
  try {
    execSync('docker-compose ps', { stdio: 'pipe' });
    checks.push({ name: 'Docker Services', status: '✅' });
  } catch {
    checks.push({ name: 'Docker Services', status: '❌' });
  }

  // Check node_modules
  const hasNodeModules = fs.existsSync('node_modules');
  checks.push({ name: 'Dependencies Installed', status: hasNodeModules ? '✅' : '❌' });

  // Check builds
  const clientBuilt = fs.existsSync('apps/client/.next');
  const serverBuilt = fs.existsSync('apps/server/dist');
  checks.push({ name: 'Client Built', status: clientBuilt ? '✅' : '⚠️' });
  checks.push({ name: 'Server Built', status: serverBuilt ? '✅' : '⚠️' });

  // Check skills count
  const skillsCount = fs.readdirSync('skill', { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.')).length;
  checks.push({ name: `Skills (${skillsCount})`, status: '✅' });

  // Check agents count
  const agentsCount = fs.readdirSync('agents')
    .filter(f => f.endsWith('.json')).length;
  checks.push({ name: `Agents (${agentsCount})`, status: '✅' });

  console.log('\n🏥 Claude Skill Builder Health Check\n');
  checks.forEach(({ name, status }) => console.log(`${status} ${name}`));
  console.log('');
}

checkHealth();
```

### 2. **Bundle Size Monitor (apps/client/next.config.js)**
```javascript
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
          },
        },
      };
    }
    return config;
  },
};
```

## 🛠️ Development Environment Setup

### 1. **VS Code Extensions (.vscode/extensions.json)**
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-playwright.playwright",
    "yoavbls.pretty-ts-errors",
    "usernamehw.errorlens"
  ]
}
```

### 2. **VS Code Settings (.vscode/settings.json)**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.tsdk": "node_modules/typescript/lib",
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
  },
  "files.associations": {
    "*.md": "markdown"
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true,
    "**/drizzle": true
  }
}
```

### 3. **GitHub Actions Workflow (.github/workflows/ci.yml)**
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm run format:check
      - run: pnpm run lint
      - run: pnpm run type-check
      - run: pnpm run validate:skills
      - run: pnpm run validate:agents
      - run: pnpm run build
```

## 📚 Quick Reference Commands

### Daily Development
```bash
pnpm dev                    # Start all services
pnpm docker:up              # Start PostgreSQL & Redis
pnpm db:studio              # Open Prisma Studio
pnpm validate               # Run all checks
```

### Before Commit
```bash
pnpm format                 # Format all files
pnpm lint:fix               # Fix linting issues
pnpm type-check             # Check TypeScript
```

### Testing
```bash
pnpm test:e2e               # Run Playwright tests
pnpm test:unit              # Run unit tests
```

### Validation
```bash
pnpm validate:skills        # Validate skill definitions
pnpm validate:agents        # Validate 400+ agent JSONs
node scripts/health-check.js # Project health status
```
