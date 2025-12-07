# Product Overview

## Project Identity

**bl1nk Skill Builder** - An AI-powered desktop IDE specifically designed for creating, managing, and testing AI skills, agents, and MCP (Model Context Protocol) tools. Think "VS Code but for AI development."

## Core Value Proposition

This platform eliminates the complexity of AI development by providing a unified environment where developers can:
- Build and test AI agents without switching between multiple tools
- Manage 501+ pre-built agents across 6 categories
- Create reusable AI skills with standardized templates
- Integrate with 6+ LLM providers (AWS Bedrock, OpenAI, Anthropic, Google, OpenRouter, Azure)
- Develop MCP servers and tools with built-in validation

## Key Features

### 1. **Comprehensive Agent Library**
- 501 pre-configured agents organized into 6 categories:
  - Business (35+ agents): CEO GPT, Marketing experts, Financial advisors
  - Creative (48+ agents): Image prompt architects, Design experts, Content creators
  - Data (50+ agents): Research assistants, Analysts, Data processors
  - Development (150+ agents): Full-stack developers, Language-specific experts, DevOps tools
  - Education (60+ agents): Language tutors, Subject experts, Learning coaches
  - Writing (100+ agents): Translators, Copywriters, Academic editors
  - Other (58+ agents): Specialized consultants and advisors

### 2. **Skill Development System**
- 30+ pre-built skills across 15 categories
- Standardized SKILL.md format for documentation
- Template-based skill creation
- Built-in validation and testing
- Skills include: MCP Builder, File Organizer, Canvas Design, Web Artifacts Builder

### 3. **Multi-Provider AI Integration**
- AWS Bedrock (Claude, Titan models)
- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude 3 family)
- Google (Gemini, PaLM)
- OpenRouter (unified API)
- Azure OpenAI
- Secure credential management with AES-256-GCM encryption

### 4. **Desktop IDE Experience**
- Built on Electron 38.2 for cross-platform support
- Monaco Editor integration for code editing
- Real-time preview and testing
- Project workspace management
- Git integration via isomorphic-git

### 5. **Security & Compliance**
- AES-256-GCM encryption for API credentials
- JWT authentication
- Input validation with Zod schemas
- Rate limiting on sensitive endpoints
- Context isolation in Electron
- Path traversal protection

## Target Users

### Primary Audience
- **AI Developers**: Building custom agents and skills for specific use cases
- **Prompt Engineers**: Creating and testing sophisticated prompts
- **Full-Stack Developers**: Integrating AI capabilities into applications
- **DevOps Engineers**: Automating workflows with AI agents

### Secondary Audience
- **Technical Writers**: Creating AI-powered documentation tools
- **Product Managers**: Prototyping AI features
- **Researchers**: Experimenting with different LLM providers
- **Educators**: Building AI tutoring systems

## Use Cases

### 1. **Agent Development**
```
Create a custom customer support agent that:
- Uses company knowledge base
- Integrates with ticketing system
- Supports multiple languages
- Learns from interactions
```

### 2. **Skill Creation**
```
Build a "Code Review Assistant" skill that:
- Analyzes pull requests
- Suggests improvements
- Checks for security issues
- Generates review comments
```

### 3. **MCP Tool Development**
```
Develop an MCP server that:
- Connects to internal APIs
- Provides context to AI models
- Handles authentication
- Manages rate limits
```

### 4. **Multi-Provider Testing**
```
Compare responses from different LLM providers:
- Same prompt across 6 providers
- Cost analysis per request
- Performance benchmarking
- Quality assessment
```

### 5. **Workflow Automation**
```
Create automated workflows:
- Document generation from templates
- Code scaffolding
- Test case generation
- API documentation
```

## Key Statistics

- **501 Pre-built Agents** across 6 categories
- **30+ Skills** ready to use
- **6 LLM Providers** integrated
- **68 API Endpoints** (designed specification)
- **9 Major Modules** (Project, Skill, Agent, Provider, etc.)
- **80+ E2E Test Specs** for quality assurance

## Technology Highlights

- **Monorepo Architecture**: pnpm workspace with client/server separation
- **Type-Safe**: Full TypeScript with Zod validation
- **Modern Stack**: React 19, Next.js 15, Electron 38.2
- **Database**: SQLite (Phase 1) → PostgreSQL (Phase 2)
- **ORM**: Drizzle ORM for type-safe database access
- **Testing**: Playwright for E2E, Vitest for unit tests

## Competitive Advantages

1. **All-in-One Platform**: No need to switch between multiple tools
2. **Pre-built Library**: 501 agents ready to use or customize
3. **Multi-Provider**: Not locked into a single LLM provider
4. **Security First**: Enterprise-grade credential management
5. **Open Source**: MIT licensed, community-driven
6. **Extensible**: Plugin system for custom integrations
7. **Desktop Native**: No browser limitations, full system access

## Project Status

- **Phase 1**: ✅ Complete (Core functionality, agent library, multi-provider support)
- **Phase 2**: 🔄 Current (REST API, PostgreSQL migration, CI/CD automation)
- **Phase 3**: 📅 Planned (Multi-user auth, advanced organization, observability)
- **Phase 4**: 📅 Future (Cloud sync, marketplace, enterprise features)
