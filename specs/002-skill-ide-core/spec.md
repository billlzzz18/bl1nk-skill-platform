# Feature Specification: bl1nk Skill IDE Core

**Feature Branch**: `002-skill-ide-core`
**Created**: 2025-12-02
**Status**: Draft
**Vision**: An AI Skill IDE - like VS Code/Cursor but for AI development. Works with ANY AI (Claude, GPT, Gemini, local LLMs).

## Product Vision

**bl1nk Skill IDE** is a desktop application that serves as a unified development environment for AI capabilities. Think of it as the "VS Code for AI Development" - a professional tool where developers and AI practitioners can:

- **Create** reusable AI skills, agents, and tools
- **Manage** knowledge bases and persistent memory
- **Test** capabilities against any AI provider
- **Deploy** to production environments

Unlike simple prompt playgrounds, this is a full IDE focused on the craft of AI engineering.

---

## Core Features (Phase 1)

The five pillars of bl1nk Skill IDE:

### 1. **Skills** - Reusable Prompt Templates
Skills are structured prompt definitions that give AI specific capabilities. They can be used standalone or composed into agents.

### 2. **Agents** - Orchestrated AI Workflows
Agents combine multiple skills with execution logic, tool access, and decision-making capabilities.

### 3. **MCP Tools** - Model Context Protocol Integrations
Tools that follow the MCP standard, enabling AI to interact with external systems (file system, databases, APIs, etc.).

### 4. **Knowledgebase** - Curated Information Sources
Collections of documents, code, and data that provide context for AI operations.

### 5. **Memory** - Persistent Context
Systems for retaining information across sessions - conversation history, learned preferences, and accumulated knowledge.

---

## Supported Languages

Focused language support for AI development artifacts:

| Extension | Purpose | Editor Support |
|-----------|---------|----------------|
| `.yaml`, `.yml` | Agent configs, skill definitions | Full syntax + validation |
| `.md` | Documentation, prompts | Full markdown + preview |
| `.json` | MCP tool schemas, configs | Full syntax + JSON schema |
| `.mdc` | Markdown Components (MDC) | Syntax highlighting |
| `.py` | Python tools, scripts | Full Python support |
| `.js`, `.jsx`, `.ts`, `.tsx` | JavaScript/TypeScript tools | Full JS/TS support |
| `.mdx` | Interactive documentation | MDX rendering |

---

## User Scenarios & Testing

### User Story 1 - Create and Test a Skill (Priority: P1)

A developer wants to create a reusable skill that can be loaded into any AI assistant. They need to define the skill's prompt, test it against multiple AI providers, and export it for use in Claude Code, GPT, or local models.

**Acceptance Scenarios**:

1. **Given** the IDE is open, **When** user clicks "New Skill" and fills the template, **Then** a `.md` or `.yaml` skill file is created in the workspace
2. **Given** a skill file is open, **When** user clicks "Test", **Then** a chat panel opens where they can test the skill against their configured AI provider
3. **Given** a skill test is running, **When** AI responds, **Then** the response streams in real-time with proper markdown formatting
4. **Given** a skill test failed, **When** error occurs, **Then** a clear error message shows (rate limit, invalid key, model unavailable)

---

### User Story 2 - Create and Configure an Agent (Priority: P1)

A developer wants to build an AI agent that combines multiple skills and can use tools. The agent needs configuration for its persona, available skills, tool permissions, and execution parameters.

**Acceptance Scenarios**:

1. **Given** a workspace with skills, **When** user creates a new agent, **Then** an agent config file is created with references to available skills
2. **Given** an agent config is open, **When** user selects skills to include, **Then** the agent has access to those skills' capabilities
3. **Given** an agent with tools configured, **When** user tests the agent, **Then** tool invocations are logged and results shown
4. **Given** an agent test is running, **When** agent makes decisions, **Then** the reasoning trace is visible in a debug panel

---

### User Story 3 - Manage MCP Tools (Priority: P2)

A developer wants to create and manage MCP-compatible tools that their agents can use. Tools can be local scripts, API integrations, or system operations.

**Acceptance Scenarios**:

1. **Given** the Tools panel is open, **When** user clicks "New Tool", **Then** a tool definition template is created with MCP schema
2. **Given** a tool definition exists, **When** user configures parameters and permissions, **Then** the tool can be added to agents
3. **Given** a tool is in use, **When** AI invokes it, **Then** the execution is sandboxed and results logged
4. **Given** a tool fails, **When** error occurs, **Then** detailed error information helps debugging

---

### User Story 4 - Build a Knowledgebase (Priority: P2)

A developer wants to create a curated knowledge collection that AI can reference. The knowledgebase can include documentation, code samples, FAQs, and domain-specific information.

**Acceptance Scenarios**:

1. **Given** the IDE is open, **When** user creates a new knowledgebase, **Then** a folder structure is created for organizing content
2. **Given** content is added to knowledgebase, **When** AI is tested, **Then** it can reference relevant information
3. **Given** a large knowledgebase, **When** AI queries it, **Then** semantic search returns relevant chunks
4. **Given** knowledgebase changes, **When** user updates content, **Then** indexes are updated automatically

---

### User Story 5 - Persistent Memory System (Priority: P3)

A developer wants AI to remember context across sessions. Memory can include conversation summaries, user preferences, learned facts, and accumulated expertise.

**Acceptance Scenarios**:

1. **Given** memory is enabled for an agent, **When** conversation ends, **Then** relevant information is extracted and stored
2. **Given** stored memories exist, **When** new conversation starts, **Then** AI has access to relevant past context
3. **Given** many memories accumulated, **When** queried, **Then** semantic search retrieves most relevant memories
4. **Given** a memory is incorrect, **When** user edits/deletes it, **Then** the change is reflected in future AI responses

---

### User Story 6 - Configure AI Providers (Priority: P1)

A developer wants to test skills and agents against different AI providers. The IDE supports multiple providers with easy credential management.

**Acceptance Scenarios**:

1. **Given** Settings is open, **When** user adds AWS Bedrock credentials, **Then** Claude models become available
2. **Given** Settings is open, **When** user adds OpenRouter key, **Then** multiple models become available
3. **Given** Settings is open, **When** user adds OpenAI/Anthropic keys, **Then** respective models become available
4. **Given** multiple providers configured, **When** user tests, **Then** they can choose which provider to use

---

## Requirements

### Functional Requirements

**Workspace & Project Management**
- **FR-001**: System MUST support workspace-based project organization
- **FR-002**: System MUST auto-detect skill, agent, tool, and knowledge files in workspace
- **FR-003**: System MUST provide file tree navigation with icons for different file types
- **FR-004**: System MUST support multi-tab editing like traditional IDEs

**Skill System**
- **FR-010**: System MUST allow creating skills in YAML or Markdown format
- **FR-011**: System MUST validate skill definitions against schema
- **FR-012**: System MUST provide skill templates for common patterns
- **FR-013**: System MUST support skill versioning and history

**Agent System**
- **FR-020**: System MUST allow creating agents with YAML configuration
- **FR-021**: System MUST support agent skill composition (include multiple skills)
- **FR-022**: System MUST support agent tool permissions configuration
- **FR-023**: System MUST provide agent execution tracing and debugging

**MCP Tool System**
- **FR-030**: System MUST support MCP tool definition format
- **FR-031**: System MUST validate tool schemas against MCP specification
- **FR-032**: System MUST sandbox tool execution for security
- **FR-033**: System MUST log all tool invocations with inputs/outputs

**Knowledgebase System**
- **FR-040**: System MUST support importing documents (md, txt, pdf, docx)
- **FR-041**: System MUST chunk and index content for semantic search
- **FR-042**: System MUST provide relevance scoring for retrieved chunks
- **FR-043**: System MUST support manual curation and organization

**Memory System**
- **FR-050**: System MUST extract and store conversation summaries
- **FR-051**: System MUST support memory tagging and categorization
- **FR-052**: System MUST provide semantic memory retrieval
- **FR-053**: System MUST allow manual memory editing/deletion

**AI Provider Integration**
- **FR-060**: System MUST support AWS Bedrock (Claude models)
- **FR-061**: System MUST support OpenRouter (multiple models)
- **FR-062**: System MUST support direct OpenAI API
- **FR-063**: System MUST support direct Anthropic API
- **FR-064**: System MUST support local models (Ollama, LM Studio)
- **FR-065**: System MUST encrypt all API credentials at rest

**Editor & IDE Features**
- **FR-070**: System MUST provide Monaco-based code editor
- **FR-071**: System MUST support syntax highlighting for all supported languages
- **FR-072**: System MUST provide file-type specific validation
- **FR-073**: System MUST support split views and panels
- **FR-074**: System MUST provide integrated terminal (optional)

**Testing & Chat**
- **FR-080**: System MUST provide integrated chat panel for testing
- **FR-081**: System MUST support streaming responses
- **FR-082**: System MUST display tool invocations inline
- **FR-083**: System MUST support conversation export

### Non-Functional Requirements

**Performance**
- **NFR-001**: Editor responsiveness < 100ms for all interactions
- **NFR-002**: AI response streaming starts within 3 seconds
- **NFR-003**: File tree loads within 500ms for workspaces < 1000 files

**Security**
- **NFR-010**: All credentials encrypted with AES-256-GCM
- **NFR-011**: Tool execution sandboxed from system access
- **NFR-012**: No credential logging in any format

**Platform**
- **NFR-020**: MUST run on Windows 10+
- **NFR-021**: MUST run on macOS 11+
- **NFR-022**: MUST run on Ubuntu 20.04+

---

## Key Entities

### Data Model Overview

```
Workspace
├── Skills (*.skill.md, *.skill.yaml)
├── Agents (*.agent.yaml)
├── Tools (*.tool.yaml, *.tool.js, *.tool.py)
├── Knowledge (knowledgebase/)
│   ├── Documents
│   └── Index
└── Memory (memory/)
    ├── Conversations
    └── Facts
```

**Core Entities**:

- **Skill**: Reusable prompt template with metadata (name, description, author, version)
- **Agent**: Configuration combining skills, tools, and execution parameters
- **Tool**: MCP-compatible tool definition with schema, handler, and permissions
- **KnowledgeChunk**: Indexed content segment with embedding and metadata
- **Memory**: Stored fact, preference, or conversation summary with timestamp and relevance

**Settings Entities**:

- **AIProvider**: Configured AI provider with credentials and model preferences
- **Workspace**: Project root path and configuration

---

## Success Criteria

- **SC-001**: User can create a skill and test it within 2 minutes of opening the IDE
- **SC-002**: Agent with 3+ skills can be created and tested within 10 minutes
- **SC-003**: Tool invocations complete within provider's API latency + 500ms overhead
- **SC-004**: Knowledgebase search returns relevant results within 200ms
- **SC-005**: Memory retrieval adds < 500ms to response time
- **SC-006**: All supported file types have proper syntax highlighting
- **SC-007**: IDE feels responsive and professional (subjective but critical)

---

## Architecture Notes

### Technology Stack

**Desktop Framework**: Electron (via Electron Forge + Vite)
**UI Framework**: React 18+ with TypeScript
**State Management**: Zustand (from Dyad)
**Editor**: Monaco Editor
**Database**: SQLite (via Drizzle ORM) for local storage
**Vector Store**: SQLite with vector extension OR simple embedding file store
**Styling**: Tailwind CSS

### From Dyad Foundation

We're building on Dyad's foundation which provides:
- Electron + Vite setup
- React + Zustand state management
- Monaco editor integration
- Chat/conversation UI components
- File management utilities
- IPC communication patterns

Key adaptations needed:
- Replace "app builder" concept with "skill/agent IDE"
- Add skill/agent/tool specific views
- Add knowledgebase management
- Add memory management
- Update branding to bl1nk

---

## Assumptions

- Desktop-first, single-user (no auth initially)
- Local file storage (workspace-based)
- Users provide their own AI provider credentials
- English interface (i18n later)
- Users understand AI/LLM basics

---

## Out of Scope (Phase 1)

- Cloud sync / team collaboration
- User authentication
- Skill marketplace / sharing
- Mobile support
- Real-time collaboration
- Auto-complete / Copilot features

---

## Clarifications

### Session 2025-12-02

- Q: Is this a "Skill Builder" only? → A: No, it's a full **AI Skill IDE** with 5 core features: Skills, Agents, Tools, Knowledgebase, Memory
- Q: Only for Claude? → A: No, works with **any AI** (Claude, GPT, Gemini, local LLMs)
- Q: Web or Desktop? → A: **Desktop-first** (Electron), may add web later
- Q: What languages to support? → A: yaml, md, json, mdc, python, js/jsx/ts/tsx, mdx
