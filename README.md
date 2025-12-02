# Claude Skill Builder

> AI-powered IDE for creating, managing, and testing Claude AI skills, agents, and MCP tools

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![Electron](https://img.shields.io/badge/Electron-38.2-47848F)](https://www.electronjs.org/)
[![Security](https://img.shields.io/badge/Security-Hardened-green)](./docs/SECURITY.md)

## 🎯 Overview

Claude Skill Builder is a comprehensive desktop IDE specifically designed for AI development. Build custom Claude skills, manage 500+ pre-built agent templates, and integrate with multiple LLM providers—all in one unified environment.

**Think "VS Code but for AI development"**

## ✨ Key Features

### 🤖 Agent System
- **501 Pre-built Agents** organized by category:
  - 138 Development agents (Python, TypeScript, React, Rust, etc.)
  - 115 Writing agents (content, translation, copywriting)
  - 62 Education agents (tutoring, language learning)
  - 51 Data agents (analysis, research, ML/AI)
  - 48 Creative agents (art, design, music)
  - 36 Business agents (marketing, sales, consulting)
- JSON-based configuration with metadata
- Custom agent creation and modification

### 🛠️ Skill Development
- Monaco Editor integration with syntax highlighting
- 15+ skill categories with templates
- Version control with full history and restore
- Real-time skill preview and testing
- Template-based creation with SKILL.md format

### 🔌 Multi-Provider AI Integration
- **AWS Bedrock**: Claude, Titan models
- **OpenRouter**: Multiple LLM providers
- **Anthropic**: Direct Claude API
- **Google**: Gemini models
- **OpenAI**: GPT models
- **Local**: LM Studio, Ollama support

### 🔐 Security Features
- AES-256-GCM encrypted credential storage
- Path traversal protection
- Symlink loop detection
- Context isolation enabled
- Security fuses for production builds
- Comprehensive security documentation

### 🧪 Testing & Validation
- 74+ E2E tests organized by feature
- Automated skill and agent validation
- Health check monitoring
- Progress feedback for long operations

### 🗄️ Database & Persistence
- SQLite + Drizzle ORM (Phase 1)
- PostgreSQL + Redis (planned Phase 2)
- Schema versioning and migrations
- Encrypted credential storage

## 🚀 Quick Start

### Prerequisites
- Node.js >= 20.0.0
- pnpm (latest version)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/bl1nk-org/claude-skill-builder.git
cd claude-skill-builder

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development
pnpm dev
```

### First Run

1. Configure API credentials in Settings
2. Browse 501 pre-built agents
3. Create or import a skill
4. Test with the integrated chat interface

## 📚 Documentation

- [Architecture](./docs/Architecture.md) - System design and tech stack
- [Security](./docs/SECURITY.md) - Security guidelines and best practices
- [Contributing](./CONTRIBUTING.md) - Development guidelines
- [Roadmap](./docs/roadmap.md) - Project roadmap and phases
- [Rule Systems](./docs/RULE_SYSTEMS.md) - AI assistant rules documentation

## 🏗️ Project Structure

```
claude-skill-builder/
├── apps/
│   ├── client/          # Electron + Next.js frontend
│   └── server/          # Express + tRPC backend
├── packages/
│   └── shared/          # Shared types and utilities
├── agents/              # 501 agent templates (organized by category)
│   ├── development/     # 138 agents
│   ├── writing/         # 115 agents
│   ├── education/       # 62 agents
│   ├── data/            # 51 agents
│   ├── creative/        # 48 agents
│   └── business/        # 36 agents
├── skill/               # 15 skill categories
├── __tests__/           # 74+ E2E tests (organized by feature)
└── scripts/             # Build and validation scripts
```

## 🛠️ Development

### Available Commands

```bash
# Development
pnpm dev                    # Start all services
pnpm build                  # Build all packages
pnpm test:e2e              # Run E2E tests
pnpm test:unit             # Run unit tests

# Code Quality
pnpm lint                   # Lint all packages
pnpm format                 # Format code
pnpm type-check            # TypeScript check
pnpm validate              # Run all checks

# Validation
pnpm validate:skills       # Validate 15 skills
pnpm validate:agents       # Validate 501 agents
pnpm health                # Project health check

# Database
cd apps/client && pnpm db:studio    # Drizzle Studio
cd apps/server && pnpm prisma:studio # Prisma Studio

# Packaging
cd apps/client
pnpm package               # Package app
pnpm make                  # Create installers
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# E2E tests (74+ specs)
pnpm test:e2e

# Unit tests
pnpm test:unit

# Validate project
pnpm validate:skills       # ✅ 15 skills
pnpm validate:agents       # ✅ 501 agents
pnpm health                # ✅ 7/7 systems
```

## 📦 Building & Packaging

```bash
# Build for production
pnpm build

# Package Electron app
cd apps/client
pnpm package

# Create installers
pnpm make

# Supported platforms
# - Windows: x64, arm64 (.exe via Squirrel)
# - macOS: x64, arm64 (.dmg, .zip with code signing)
# - Linux: x64 (.deb, .rpm, AppImage)
```

## 🔒 Security

This project follows security best practices for Electron desktop applications:

- ✅ Context isolation enabled
- ✅ Node integration disabled
- ✅ Security fuses enabled
- ✅ AES-256-GCM credential encryption
- ✅ Path traversal protection
- ✅ Symlink loop detection
- ✅ Comprehensive security documentation

See [SECURITY.md](./docs/SECURITY.md) for detailed guidelines.

To report security vulnerabilities, see [.github/SECURITY.md](./.github/SECURITY.md).

## 🗺️ Roadmap

### ✅ Phase 0-1: Core Features (Complete)
- Core skill management with versioning
- 501 agent template library
- Multi-provider AI integration (7 providers)
- Encrypted credential management
- SQLite + Drizzle ORM
- Electron desktop packaging
- Monaco editor integration
- 74+ E2E tests
- Security hardening

### 🚀 Phase 2: API & Infrastructure (Current)
- ✅ REST API v1 with OpenAPI spec
- ✅ Automation and validation scripts
- ✅ Security documentation
- ⏳ PostgreSQL + Redis migration
- ⏳ CI/CD automation
- ⏳ Cloud synchronization

### 📅 Phase 3: UX & Security Polish
- Multi-user authentication
- Advanced skill organization
- Observability dashboard
- Automated backups

### 📅 Phase 4: Collaboration & Distribution
- Cloud sync for skills
- Skill marketplace
- Team collaboration
- Public gallery

See [roadmap.md](./docs/roadmap.md) for detailed timeline.

## 📊 Project Stats

- **Agents**: 501 pre-configured templates
- **Skills**: 15 categories with documentation
- **Tests**: 74+ E2E specifications
- **API Endpoints**: 20+ REST endpoints
- **Security Issues Fixed**: 16 (all critical resolved)
- **Documentation**: 10+ KB security guides
- **Tech Stack**: TypeScript 5.8, Next.js 15, React 19, Electron 38

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- Development setup
- Code standards
- Testing guidelines
- Pull request process
- Security considerations

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- Powered by [Next.js](https://nextjs.org/) and [React](https://react.dev/)
- AI integration via [Vercel AI SDK](https://sdk.vercel.ai/)
- Code editing with [Monaco Editor](https://microsoft.github.io/monaco-editor/)

## 📞 Support

- 📖 [Documentation](./docs/)
- 🐛 [Issue Tracker](https://github.com/bl1nk-org/claude-skill-builder/issues)
- 💬 [Discussions](https://github.com/bl1nk-org/claude-skill-builder/discussions)
- 🔒 [Security Policy](./.github/SECURITY.md)

---

**Made with ❤️ by the bl1nk team**
