# Architecture Overview

## System Design
Human-First AI Platform with intelligent orchestration and progressive model escalation.

### Core Architecture Concepts
- **Agent ≠ Tool ≠ Skill ≠ Flow**: Clear separation of concerns for scalability
- **Runtime Orchestrator**: Intelligent decision engine for model/agent/tool/context selection
- **Progressive Escalation**: Start with cost-effective models, escalate only when needed
- **Memory-Driven Context**: Use conversation history and user preferences for better decisions

## Architecture Components

### Client (Electron + Next.js)
- **Framework**: Electron 38 + Next.js 15 + React 19
- **UI**: Monaco Editor, Tailwind CSS
- **State Management**: Jotai atoms
- **IPC**: Electron IPC for client-server communication

### Server (Express + tRPC)
- **Framework**: Express.js + tRPC for type-safe APIs
- **Database**: SQLite + Drizzle ORM
- **Validation**: Zod schemas for runtime validation

### Runtime Orchestrator (Control Plane)
- **Query/Intent Router**: Classifies requests (doc_qa_rag, tool_exec, creative, etc.)
- **Model Router**: Progressive escalation (Haiku → Sonnet → specialized models)
- **Context Manager**: Dynamic chunking based on doc_type and memory
- **Tool/Action Router**: MCP tool selection with reliability scoring
- **Multi-agent Coordinator**: Teams for complex tasks (Router → Retriever → Writer → Verifier)

### Shared Libraries
- **Schemas**: Zod validation schemas shared between client/server
- **Types**: TypeScript types auto-generated from schemas
- **Data Models**: ModelProfile, AgentTemplate, FlowGraph, ToolDescriptor, SkillDescriptor

## Layers
1. **Presentation** (React + Electron)
2. **Application** (tRPC procedures)
3. **Domain** (Business logic)
4. **Infrastructure** (Database, File system, External APIs)

## Communication Flow
```
User Input → React Components → IPC → tRPC Server → Business Logic → Database
                      ↓
                UI Updates ← Response ← Validation ← Data Access
```
