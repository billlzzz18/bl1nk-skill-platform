# เทคโนโลยีที่ใช้ (Tech Stack)

## 📚 ภาพรวม

Claude Skill Builder ใช้เทคโนโลยีสมัยใหม่เพื่อสร้าง desktop application ที่มีประสิทธิภาพและปลอดภัย

## 🎨 Frontend Stack

### Core Framework
- **Next.js 15** - React framework พร้อม App Router
- **React 19** - UI library พร้อม features ล่าสุด
- **Electron 38.2.2** - Desktop application framework
- **TypeScript 5.8.3** - Type-safe development

### State Management
- **Jotai 2.12.2** - Atomic state management
- **Zustand 5.0.0** - Additional state management
- **TanStack Query 5.75.5** - Server state และ caching

### UI Components
- **Radix UI** - Accessible component primitives
  - Accordion, Dialog, Dropdown, Select, Tabs, Tooltip, etc.
- **Lucide React 0.487.0** - Icon library
- **Framer Motion 12.6.3** - Animation library
- **cmdk 1.1.1** - Command palette

### Styling
- **Tailwind CSS 4.1.3** - Utility-first CSS framework
- **class-variance-authority 0.7.1** - Component variants
- **tailwind-merge 3.1.0** - Class merging utility

### Code Editor
- **Monaco Editor 0.52.2** - VS Code editor core
- **@monaco-editor/react 4.7.0** - React wrapper

### Markdown & Syntax
- **react-markdown 10.1.0** - Markdown rendering
- **remark-gfm 4.0.1** - GitHub Flavored Markdown
- **shiki 3.2.1** - Syntax highlighter

## 🔧 Backend Stack

### API Layer
- **tRPC 11.0.0** - Type-safe API framework
- **Express 4.21.0** - HTTP server
- **Zod 3.25.76** - Schema validation

### Database
- **SQLite** - Primary database (Phase 1)
- **Drizzle ORM 0.41.0** - Type-safe ORM สำหรับ client
- **Prisma 5.22.0** - ORM สำหรับ server
- **better-sqlite3 12.4.1** - SQLite driver

## 🤖 AI & LLM Integration

### AI SDK
- **ai 5.0.15** - Vercel AI SDK core
- **@ai-sdk/provider-utils 3.0.3** - Provider utilities

### LLM Providers
- **@ai-sdk/amazon-bedrock 3.0.15** - AWS Bedrock (Claude, Titan)
- **@ai-sdk/anthropic 2.0.4** - Anthropic Claude API
- **@ai-sdk/google 2.0.6** - Google Gemini
- **@ai-sdk/openai 2.0.15** - OpenAI GPT models
- **@openrouter/ai-sdk-provider 1.1.2** - OpenRouter integration

### Model Context Protocol
- **@modelcontextprotocol/sdk 1.17.5** - MCP SDK สำหรับ tool integration

## 🛠️ Build Tools

### Package Manager
- **pnpm** - Fast, disk-efficient package manager
- **Workspace** - Monorepo พร้อม 3 workspaces

### Build System
- **Vite 5.4.17** - Fast build tool
- **Electron Forge 7.8.0** - Electron packaging
  - Makers: Squirrel (Win), ZIP (Mac), DEB/RPM (Linux)
  - Publisher: GitHub releases

### Code Quality
- **oxlint 1.8.0** - Fast linter
- **prettier 3.5.3** - Code formatter
- **eslint 9.0.0** - Linting

## 🧪 Testing

### E2E Testing
- **Playwright** - Browser automation (74+ test specs)

### Unit Testing
- **Vitest 3.1.1** - Fast unit test framework
- **@vitest/ui 3.1.1** - Test UI

## 🔐 Security

### Encryption
- **AES-256-GCM** - Credential encryption
- **@aws-crypto/util 5.2.0** - Cryptography utilities

### Electron Security
- Context isolation enabled
- Node integration disabled
- Security fuses enabled
- Code signing support

## 📦 Development Tools

### Database Tools
- **drizzle-kit 0.30.6** - Database migrations และ studio
- **prisma** - Schema management และ migrations

### Utilities
- **dotenv 16.4.7** - Environment variables
- **cross-env 7.0.3** - Cross-platform env vars
- **rimraf 6.0.1** - Cross-platform rm -rf

### Electron Utilities
- **electron-log 5.3.3** - Logging
- **update-electron-app 3.1.1** - Auto-updates

## 🌐 Platform Support

### Desktop Platforms
- **Windows**: x64, arm64 (.exe, .msi)
- **macOS**: x64, arm64 (.dmg, .zip)
- **Linux**: x64 (.deb, .rpm, AppImage)

### Node.js Requirements
- **Minimum**: 20.0.0
- **Recommended**: Latest LTS

## 📊 Performance

### Build Optimizations
- Vite สำหรับ fast HMR
- Code splitting ใน Next.js
- Tree shaking
- Minification ใน production

### Runtime Optimizations
- React 19 concurrent features
- Jotai atomic updates
- TanStack Query caching
- SQLite สำหรับ fast local storage
- Web workers สำหรับ heavy computations

## 🔄 Version Control

### Git Workflow
- **Pre-commit Hooks** - lint-staged
- **Auto-fix** - ESLint และ Prettier
- **Prisma Format** - Format schema files

## 📈 Monitoring & Logging

### Logging
- **electron-log** - Structured logging
- **Log Levels**: info, warn, error
- **Log Location**: `logs/` directory

### Error Tracking
- Electron crash reporting
- Console error capture
- IPC error handling

## 🚀 CI/CD

### GitHub Actions
- Main CI pipeline
- Build verification
- Database checks
- Security scanning
- Multi-platform releases

## 📦 Dependencies Summary

### Total Dependencies
- **Client**: 80+ dependencies
- **Server**: 15+ dependencies
- **Shared**: 30+ dependencies

### Key Categories
1. **UI/UX**: React, Radix UI, Tailwind, Monaco
2. **State**: Jotai, Zustand, TanStack Query
3. **AI**: Multiple provider SDKs, MCP
4. **Database**: Drizzle, Prisma, SQLite
5. **Build**: Vite, Electron Forge, TypeScript
6. **Testing**: Playwright, Vitest

## 🔗 External Services

### Cloud Platforms
- **AWS Bedrock** - Claude, Titan models
- **OpenRouter** - Multi-provider LLM access
- **Anthropic** - Direct Claude API
- **OpenAI** - GPT models
- **Google AI** - Gemini models

### Local Services
- **LM Studio** - Local LLM server
- **Ollama** - Local model management

## 📚 เอกสารเพิ่มเติม

- [Architecture Overview](../01_architecture/architecture-overview.md)
- [Development Setup](../06_guides/development-setup.md)
- [API Documentation](../02_api/trpc-overview.md)

---

**อัพเดทล่าสุด**: 2025-01-XX  
**เวอร์ชัน**: 0.1.0
