# bl1nk Skill Builder - AI Skill Development IDE

> AI-powered IDE for creating, managing, and testing bl1nk AI skills, agents, and MCP tools. This repository contains the complete platform code and design specification.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![Electron](https://img.shields.io/badge/Electron-38.2-47848F)](https://www.electronjs.org/)
[![Security](https://img.shields.io/badge/Security-Hardened-green)](./docs/SECURITY.md)

## 🎯 Overview

bl1nk Skill Builder is a comprehensive desktop IDE specifically designed for AI development. It is built as a **Monorepo** using **pnpm** and consists of a **Desktop Client (`apps/client`)** and a **Backend Server (`apps/server`)**.

**Think "VS Code but for AI development"**

### Key Statistics (Design Specification)

- ✅ **68 Total Endpoints** (Designed API)
- ✅ **9 Major Modules** (Project, Skill, Agent, Provider, etc.)
- ✅ **6 Agent Categories** (501 pre-built agents)
- ✅ **15 Skill Categories**
- ✅ **6 LLM Providers** integrated

---

## 📚 Design Documentation & Specification

This project is fully documented with detailed design specifications.

| Document | Description | Target Audience |
| :--- | :--- | :--- |
| **SKILL.md** | Platform overview, core modules, skill workflows, and use cases. | Designers, Product Managers |
| **API_SPECIFICATION.yaml** | Complete REST API specification in OpenAPI 3.1 format (68 endpoints). | API Developers |
| **ENDPOINTS_SUMMARY.md** | Quick lookup table for all 68 endpoints, organized by module. | API Developers |
| **MODULES_ARCHITECTURE.md** | Complete architecture for all 9 modules, including database schema and data flow. | Backend Engineers |
| **IMPLEMENTATION_GUIDE.md** | Developer guide, quick start, API development workflow, and testing strategy. | Backend Engineers |

---

## 🛠️ Technology Stack

| Component | Technology | Details |
| :--- | :--- | :--- |
| **Monorepo** | pnpm | Efficient dependency management |
| **Frontend (IDE)** | Electron 38.2, Next.js 15, React 19 | Desktop application framework and UI |
| **Backend (API)** | Express.js / Hono, Node.js 20+ | High-performance API server |
| **Database** | SQLite (Phase 1), PostgreSQL (Phase 2) | Persistence layer |
| **ORM** | Drizzle ORM | Type-safe database access |
| **Testing** | Jest, Playwright, SuperTest | Unit, E2E, and API testing |
| **AI Integration** | AWS Bedrock, OpenAI, Anthropic, Google, OpenRouter | Multi-provider LLM support |

---

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js >= 20.0.0
- pnpm (latest version)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/bl1nk-org/bl1nk-skill-platform.git
cd bl1nk-skill-platform

# Install dependencies (Monorepo)
pnpm install

# Copy environment variables
cp .env.example .env

# Start development (Client and Server)
pnpm dev
```

### Available Commands

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Start all services (Client IDE and Server API) |
| `pnpm build` | Build all packages |
| `pnpm test:e2e` | Run End-to-End tests (Playwright) |
| `pnpm test:unit` | Run unit tests |
| `pnpm validate` | Run all checks (format, lint, type-check) |
| `pnpm validate:agents` | Validate 501 agent configurations |
| `pnpm health` | Project health check |

---

## 🔒 Security Features

The platform is designed with security in mind, especially for credential management:

- ✅ **AES-256-GCM** encryption for API credentials
- ✅ **JWT** authentication for API access
- ✅ **Input validation** with Zod schemas
- ✅ **Rate limiting** on sensitive endpoints
- ✅ **Context isolation** in the Electron client
- ✅ **Path traversal** and **Symlink loop** protection

See [SECURITY.md](./docs/SECURITY.md) for detailed guidelines.

---

## 🗺️ Implementation Roadmap

| Phase | Status | Key Milestones |
| :--- | :--- | :--- |
| **Phase 1** | ✅ Complete | Core skill management, 501 agent library, Multi-provider AI, SQLite + Drizzle, Electron packaging. |
| **Phase 2** | 🔄 Current | REST API v1 with OpenAPI spec, Comprehensive design documentation, **PostgreSQL + Redis migration**, **CI/CD automation**, Cloud synchronization. |
| **Phase 3** | 📅 Planned | Multi-user authentication, Advanced skill organization, Observability dashboard, Automated backups. |
| **Phase 4** | 📅 Future | Cloud sync for skills, Skill marketplace, Advanced access controls, Enterprise features. |

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup, code standards, and the pull request process.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

**Made with ❤️ by the bl1nk team**
