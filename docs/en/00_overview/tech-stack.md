# Technology Stack

## 📚 Overview

Claude Skill Builder uses modern technologies to create a performant and secure desktop application.

## 🎨 Frontend Stack

### Core Framework
- **Next.js 15** - React framework with App Router
- **React 19** - UI library with latest features
- **Electron 38.2.2** - Desktop application framework
- **TypeScript 5.8.3** - Type-safe development

### State Management
- **Jotai 2.12.2** - Atomic state management
- **Zustand 5.0.0** - Additional state management
- **TanStack Query 5.75.5** - Server state and caching

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React 0.487.0** - Icon library
- **Framer Motion 12.6.3** - Animation library

### Styling
- **Tailwind CSS 4.1.3** - Utility-first CSS framework
- **class-variance-authority 0.7.1** - Component variants

### Code Editor
- **Monaco Editor 0.52.2** - VS Code editor core

## 🔧 Backend Stack

### API Layer
- **tRPC 11.0.0** - Type-safe API framework
- **Express 4.21.0** - HTTP server
- **Zod 3.25.76** - Schema validation

### Database
- **SQLite** - Primary database (Phase 1)
- **Drizzle ORM 0.41.0** - Type-safe ORM for client
- **Prisma 5.22.0** - ORM for server

## 🤖 AI & LLM Integration

### AI SDK
- **ai 5.0.15** - Vercel AI SDK core

### LLM Providers
- **@ai-sdk/amazon-bedrock 3.0.15** - AWS Bedrock
- **@ai-sdk/anthropic 2.0.4** - Anthropic Claude
- **@ai-sdk/google 2.0.6** - Google Gemini
- **@ai-sdk/openai 2.0.15** - OpenAI GPT

### Model Context Protocol
- **@modelcontextprotocol/sdk 1.17.5** - MCP SDK

## 🛠️ Build Tools

### Package Manager
- **pnpm** - Fast, disk-efficient package manager

### Build System
- **Vite 5.4.17** - Fast build tool
- **Electron Forge 7.8.0** - Electron packaging

### Code Quality
- **oxlint 1.8.0** - Fast linter
- **prettier 3.5.3** - Code formatter

## 🧪 Testing

- **Playwright** - E2E testing (74+ specs)
- **Vitest 3.1.1** - Unit testing

## 🔐 Security

- **AES-256-GCM** - Credential encryption
- Context isolation enabled
- Security fuses enabled

## 🌐 Platform Support

### Desktop Platforms
- **Windows**: x64, arm64
- **macOS**: x64, arm64
- **Linux**: x64

### Node.js Requirements
- **Minimum**: 20.0.0
- **Recommended**: Latest LTS

## 📚 Learn More

- [Architecture Overview](../01_architecture/architecture-overview.md)
- [Development Setup](../06_guides/development-setup.md)
- [API Documentation](../02_api/trpc-overview.md)

---

**Last Updated**: 2025-01-XX  
**Version**: 0.1.0
