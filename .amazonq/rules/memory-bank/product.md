# Product Overview

## Project Identity
**Name:** bl1nk Skill IDE (Claude Skill Builder)  
**Version:** 0.1.0  
**Type:** Electron Desktop Application  
**License:** MIT

## Purpose
An AI-powered IDE specifically designed for creating, managing, and testing Claude AI skills, agents, and MCP (Model Context Protocol) tools. Think "VS Code but for AI development" - a comprehensive development environment for building AI capabilities.

## Value Proposition
- **Unified Development Environment**: Single platform for creating agents, skills, MCP tools, knowledgebases, and memory systems
- **Visual Skill Management**: Intuitive interface for managing 500+ pre-built agent templates across diverse domains
- **AI Integration**: Direct integration with AWS Bedrock, OpenRouter, and multiple LLM providers
- **Version Control**: Built-in skill versioning system with restore capabilities
- **Secure Credential Management**: Encrypted storage for API credentials with provider-specific configurations

## Key Features

### 1. Skill Development & Management
- Create and edit Claude AI skills with Monaco Editor integration
- Manage 500+ pre-built agent templates (coding, writing, translation, business, etc.)
- Skill versioning with full history and restore functionality
- Template-based skill creation with standardized SKILL.md format
- Skill validation and testing capabilities

### 2. Agent System
- 500+ categorized agent templates covering:
  - Software Development (Python, TypeScript, React, Rust, etc.)
  - Language & Translation (40+ languages)
  - Business & Marketing
  - Education & Tutoring
  - Creative Writing & Content
  - Data Analysis & Research
  - Security & DevOps
- JSON-based agent configuration with metadata
- Custom agent creation and modification

### 3. MCP Tool Builder
- Create Model Context Protocol servers
- Reference documentation and scripts included
- Integration with Claude's tool-use capabilities

### 4. Multi-Provider AI Integration
- **AWS Bedrock**: Claude, Titan models
- **OpenRouter**: Access to multiple LLM providers
- **Anthropic**: Direct Claude API integration
- **Google**: Gemini models
- **OpenAI**: GPT models
- **Local Models**: LM Studio, Ollama support

### 5. Credential Management
- Encrypted API credential storage
- Provider-specific configuration (AWS regions, model selection)
- Active credential switching
- Credential testing and validation
- Secure decryption for runtime use

### 6. Database & Persistence
- SQLite database with Drizzle ORM
- Prisma ORM for server-side operations
- Schema versioning and migrations
- Ephemeral test message storage
- Key-value app settings storage

### 7. Development Tools
- Monaco Editor with syntax highlighting
- Real-time skill preview
- Chat interface for testing skills
- Context management for conversations
- File attachment support

## Target Users

### Primary Users
1. **AI Developers**: Building custom Claude skills and agents
2. **Prompt Engineers**: Creating and refining AI prompts and behaviors
3. **Integration Developers**: Building MCP tools and AI integrations
4. **Content Creators**: Using pre-built agents for writing, translation, and creative work

### Secondary Users
1. **Educators**: Teaching AI development and prompt engineering
2. **Researchers**: Experimenting with AI capabilities and behaviors
3. **Business Users**: Leveraging pre-built agents for productivity

## Use Cases

### Development Use Cases
- **Custom Skill Creation**: Build domain-specific AI skills with custom instructions
- **Agent Customization**: Modify existing agent templates for specific needs
- **MCP Server Development**: Create tools that extend Claude's capabilities
- **Multi-Model Testing**: Test skills across different LLM providers
- **Version Management**: Track skill evolution and rollback changes

### Production Use Cases
- **Workflow Automation**: Deploy skills for automated content generation
- **Multi-Language Support**: Use translation agents for international content
- **Code Generation**: Leverage coding agents for development tasks
- **Content Creation**: Use writing agents for blogs, marketing, documentation
- **Data Analysis**: Apply specialized agents for research and analysis

### Learning Use Cases
- **Prompt Engineering**: Learn effective prompt patterns from 500+ examples
- **AI Behavior Design**: Understand how to shape AI responses
- **Tool Integration**: Learn MCP protocol and tool-use patterns
- **Best Practices**: Study well-structured agent configurations

## Technical Capabilities

### Architecture
- **Frontend**: Next.js 15 + React 19 + Electron
- **Backend**: Node.js + tRPC + Express
- **Database**: SQLite (Phase 1), PostgreSQL + Redis (planned)
- **Build System**: pnpm workspace monorepo
- **Testing**: Playwright E2E (80+ tests), Vitest unit tests

### Platform Support
- Windows (x64, arm64)
- macOS (x64, arm64)
- Linux (deb, rpm, AppImage)

### Integration Points
- AWS Bedrock API
- OpenRouter API
- Anthropic API
- OpenAI API
- Google AI API
- Local LLM servers (LM Studio, Ollama)
- GitHub (import/export)
- File system (skill templates, attachments)

## Project Scope

### Current Phase (Phase 1)
- ✅ Core skill management
- ✅ Agent template library (500+)
- ✅ Multi-provider AI integration
- ✅ Credential management
- ✅ SQLite database
- ✅ Electron desktop app
- ✅ Monaco editor integration
- ✅ E2E testing framework

### Planned Features
- PostgreSQL + Redis backend
- Cloud synchronization
- Collaborative skill editing
- Marketplace for skills/agents
- Advanced analytics
- CI/CD automation
- Docker deployment
- AWS infrastructure

## Success Metrics
- Number of custom skills created
- Agent template usage statistics
- Multi-provider adoption rates
- User retention and engagement
- Skill version iterations
- Community contributions
- Platform stability (crash rates, performance)
