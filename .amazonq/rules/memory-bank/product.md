# Product Overview

## Project Purpose
Claude Skill Builder is a comprehensive web application designed for creating, managing, and deploying Claude AI skills. It provides a complete development environment for building custom AI agent capabilities with structured skill definitions, testing frameworks, and deployment workflows.

## Value Proposition
- **Centralized Skill Management**: Single platform for organizing and versioning hundreds of Claude AI agent skills across multiple domains
- **Developer-Friendly Tooling**: Integrated Monaco editor, real-time testing, and validation for rapid skill development
- **Enterprise-Ready Architecture**: Full-stack TypeScript solution with type-safe APIs, database persistence, and scalable infrastructure
- **Extensible Framework**: Support for multiple skill types including document processing, MCP servers, web artifacts, and custom integrations

## Key Features

### Skill Development
- Visual skill editor with Monaco-based code editing
- YAML/JSON skill definition support with schema validation
- Template library with 20+ pre-built skill categories
- Real-time syntax checking and error highlighting
- Version control and skill history tracking

### Skill Categories
- **Document Skills**: DOCX, PDF, PPTX, XLSX processing with OOXML validation
- **Design Skills**: Canvas design, frontend design, algorithmic art, theme factory
- **Development Skills**: MCP builder, web artifacts builder, webapp testing
- **Communication Skills**: Internal comms, Slack GIF creator, Notion knowledge capture
- **Agent Skills**: 400+ pre-configured agent templates for various domains

### Testing & Validation
- End-to-end testing suite with Playwright
- Unit testing framework for skill components
- Automated validation scripts for skill definitions
- Chat stream testing with real-time feedback
- Snapshot testing for UI components

### Management Features
- Skill library browser with search and filtering
- Category-based organization system
- Import/export functionality for skill sharing
- Metadata management (author, version, tags, licensing)
- Skill marketplace integration support

## Target Users

### Primary Users
- **AI Engineers**: Building custom Claude skills for specific use cases
- **Product Teams**: Creating domain-specific AI agents for business workflows
- **Developer Teams**: Integrating Claude capabilities into existing applications
- **Content Creators**: Designing conversational AI experiences and templates

### Use Cases
- Rapid prototyping of AI agent behaviors
- Building specialized document processing workflows
- Creating custom MCP (Model Context Protocol) servers
- Developing branded AI assistants with specific knowledge domains
- Testing and validating AI skill performance before deployment
- Managing enterprise-wide AI skill libraries
- Sharing and distributing community-created skills

## Technical Capabilities
- Full-stack monorepo architecture with workspace management
- Type-safe client-server communication via tRPC
- Real-time chat streaming with IPC handlers
- Database-backed skill persistence with Prisma ORM
- Docker-based development environment
- AWS Bedrock integration for Claude API access
- Markdown parsing with custom Dyad syntax support
