# Claude Skill Builder - Overview

## 🎯 What is it?

Claude Skill Builder is a **Desktop IDE** specifically designed for AI development. It helps you create, manage, and test Claude AI skills, agents, and MCP tools all in one place.

**Think "VS Code but for AI development"**

## 🎯 Core Principles

### Human-First AI Governance
- **Human-First**: All rights belong to users - AI cannot act autonomously
- **AI-Mediated**: LLM interprets/summarizes, not executes automatically
- **Tool-Bound**: Clear separation between Agent, Tool, and Skill
- **Permission Delegation**: Every action requires user confirmation

## ✨ Key Features

### 🤖 Agent System (501 Templates)
- **138 Development agents** - Python, TypeScript, React, Rust, etc.
- **115 Writing agents** - Content writing, translation, copywriting
- **62 Education agents** - Tutoring, language learning
- **51 Data agents** - Data analysis, research, ML/AI
- **48 Creative agents** - Art, design, music
- **36 Business agents** - Marketing, sales, consulting

### 🛠️ Skill Development
- Monaco Editor with syntax highlighting
- 15+ skill categories with templates
- Version control with history and restore
- Real-time skill testing
- Template-based creation with SKILL.md format

### 🔌 Multi-Provider AI Support
- **OpenAI** - GPT models
- **Anthropic** - Claude models (Direct API + AWS Bedrock)
- **Google** - Gemini models + Vertex AI
- **AWS Bedrock** - Claude, Titan, Nova, Mistral, Meta models
- **Azure OpenAI** - Azure-hosted OpenAI models
- **OpenRouter** - Multiple LLM providers
- **xAI** - xAI models
- **Local Models** - LM Studio, Ollama

**Model Selection Strategy:**
- Use Haiku/Titan/Nova for prep, retrieval, and lightweight tasks
- Use Sonnet/AI21 for complex generation, coding, and high-stakes reasoning
- Progressive escalation based on confidence scores and task complexity

### 🔐 Security
- AES-256-GCM credential encryption
- Path traversal protection
- Symlink loop detection
- Context isolation enabled
- Security fuses for production builds

### 🧪 Testing & Validation
- 74+ E2E tests organized by feature
- Automated skill and agent validation
- Health check monitoring
- Progress feedback for long operations

## 🏗️ Architecture

\`\`\`
claude-skill-builder/
├── apps/
│   ├── client/          # Electron + Next.js frontend
│   └── server/          # Express + tRPC backend
├── packages/
│   └── shared/          # Shared types and utilities
├── agents/              # 501 agent templates
├── skill/               # 15 skill categories
└── __tests__/           # 74+ E2E tests
\`\`\`

## 📊 Project Stats

- **Agents**: 501 ready-to-use templates
- **Skills**: 15 categories with documentation
- **Tests**: 74+ E2E specifications
- **API Endpoints**: 20+ REST endpoints
- **Security Issues Fixed**: 16 (all resolved)
- **Tech Stack**: TypeScript 5.8, Next.js 15, React 19, Electron 38

## 🎯 Target Users

### Primary Users
1. **AI Developers** - Build custom Claude skills and agents
2. **Prompt Engineers** - Create and refine AI prompts
3. **Integration Developers** - Build MCP tools and AI integrations
4. **Content Creators** - Use pre-built agents for writing, translation, and creative work

### Secondary Users
1. **Educators** - Teach AI development and prompt engineering
2. **Researchers** - Experiment with AI capabilities
3. **Business Users** - Leverage pre-built agents for productivity

## 🚀 Getting Started

### Requirements
- Node.js >= 20.0.0
- pnpm (latest version)
- Git

### Installation

\`\`\`bash
# Clone repository
git clone https://github.com/bl1nk-org/claude-skill-builder.git
cd claude-skill-builder

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development
pnpm dev
\`\`\`

### First Run

1. Configure API credentials in Settings
2. Browse 501 pre-built agents
3. Create or import a skill
4. Test with integrated chat interface

## 📈 Roadmap

### ✅ Phase 0-1: Core Features (Complete)
- Skill management + versioning
- 501 agent templates
- Multi-provider AI (11 providers)
- Credential management (encrypted)
- SQLite + Drizzle ORM
- Electron packaging
- Monaco editor
- 74 E2E tests
- Security hardening

### 🚀 Phase 2: API & Infrastructure (In Progress)
- REST API v1 + OpenAPI spec
- Automation scripts
- Security documentation
- PostgreSQL + Redis migration
- CI/CD automation
- Cloud synchronization

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

## 🤝 Contributing

We welcome contributions! See [Contributing Guide](../06_guides/contributing.md) for:
- Development setup
- Code standards
- Testing guidelines
- Pull request process
- Security considerations

## 📄 License

MIT License - see [LICENSE](../../../LICENSE) file

## 📞 Support

- 📖 [Documentation](../)
- 🐛 [Issue Tracker](https://github.com/bl1nk-org/claude-skill-builder/issues)
- 💬 [Discussions](https://github.com/bl1nk-org/claude-skill-builder/discussions)
- 🔒 [Security Policy](../../../.github/SECURITY.md)

---

**Made with ❤️ by the bl1nk team**
