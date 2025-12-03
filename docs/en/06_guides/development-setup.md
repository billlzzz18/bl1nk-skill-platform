# Development Setup Guide

## 📋 Requirements

### Required Software
- **Node.js** >= 20.0.0 (Latest LTS recommended)
- **pnpm** >= 9.0.0
- **Git** >= 2.40.0
- **VS Code** (recommended) or other editor

### Supported Operating Systems
- Windows 10/11 (x64, arm64)
- macOS 12+ (Intel, Apple Silicon)
- Linux (Ubuntu 20.04+, Debian, Fedora)

## 🚀 Quick Setup

### 1. Clone Repository

\`\`\`bash
git clone https://github.com/bl1nk-org/claude-skill-builder.git
cd claude-skill-builder
\`\`\`

### 2. Install Dependencies

\`\`\`bash
# Install pnpm (if not installed)
npm install -g pnpm

# Install all dependencies
pnpm install
\`\`\`

### 3. Setup Environment Variables

\`\`\`bash
# Copy example file
cp .env.example .env

# Edit .env file as needed
\`\`\`

### 4. Setup Database

\`\`\`bash
# Generate Prisma Client
cd apps/server
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev
\`\`\`

### 5. Start Development Server

\`\`\`bash
# Return to root directory
cd ../..

# Start all services
pnpm dev
\`\`\`

App will open at:
- **Client**: http://localhost:3000
- **Server**: http://localhost:3001

## 🔧 Detailed Configuration

### Environment Variables

#### Client (.env)
\`\`\`bash
# Database
DATABASE_URL=file:./local.db

# AI Providers
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key_here
AWS_SECRET_ACCESS_KEY=your_secret_here
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
OPENROUTER_API_KEY=your_key_here

# Application
NODE_ENV=development
LOG_LEVEL=info
\`\`\`

## 📦 Common Commands

### Development
\`\`\`bash
pnpm dev                    # Start all services
pnpm build                  # Build all packages
pnpm clean                  # Remove build artifacts
\`\`\`

### Testing
\`\`\`bash
pnpm test                   # Run all tests
pnpm test:e2e              # Run E2E tests
pnpm test:unit             # Run unit tests
\`\`\`

### Code Quality
\`\`\`bash
pnpm lint                   # Lint all packages
pnpm lint:fix              # Fix linting issues
pnpm format                # Format code
pnpm type-check            # TypeScript check
\`\`\`

### Validation
\`\`\`bash
pnpm validate:skills       # Validate 15 skills
pnpm validate:agents       # Validate 501 agents
pnpm validate:docs         # Validate documentation
pnpm health                # Project health check
\`\`\`

## 🐛 Troubleshooting

### 1. pnpm install fails

\`\`\`bash
# Remove node_modules and lock file
rm -rf node_modules pnpm-lock.yaml

# Reinstall
pnpm install
\`\`\`

### 2. Prisma Client not found

\`\`\`bash
cd apps/server
pnpm prisma generate
\`\`\`

### 3. Port already in use

\`\`\`bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
\`\`\`

## 🔍 Verify Installation

Run health check:

\`\`\`bash
pnpm health
\`\`\`

Expected output:
\`\`\`
✅ Docker Services
✅ Dependencies Installed
✅ Client Built
✅ Server Built
✅ Skills (15)
✅ Agents (501)
✅ E2E Tests (74)
\`\`\`

## 📚 Next Steps

1. Read [Architecture Overview](../01_architecture/architecture-overview.md)
2. See [API Documentation](../02_api/trpc-overview.md)
3. Learn [Testing Guide](./testing.md)
4. Read [Contributing Guide](./contributing.md)

## 🆘 Need Help?

- 📖 [Troubleshooting Guide](./troubleshooting.md)
- 🐛 [Report Issues](https://github.com/bl1nk-org/claude-skill-builder/issues)
- 💬 [Discussions](https://github.com/bl1nk-org/claude-skill-builder/discussions)

---

**Last Updated**: 2025-01-XX
