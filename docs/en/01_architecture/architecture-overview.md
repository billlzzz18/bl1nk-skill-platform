# Architecture Overview

## System Design
The bl1nk Skill Builder is designed as a desktop-first IDE using a monorepo structure. It leverages Electron to provide a native experience with a Next.js frontend and a Node.js backend.

## Architecture Layers
1.  **Presentation Layer (Next.js + React 19)**: Responsible for the UI/UX, including the skill editor (Monaco), chat interface, and settings.
2.  **API Layer (tRPC + REST)**: Provides type-safe communication between the frontend and backend.
3.  **Business Logic Layer**: Handles skill management, versioning, and multi-provider AI integration.
4.  **Data Layer (Prisma/Drizzle + SQLite)**: Manages persistence for skills, versions, and credentials.

## System Diagram
```mermaid
graph TD
    A[Electron App] --> B[Next.js Frontend]
    B -- tRPC/IPC --> C[Express Backend]
    C --> D[SQLite Database]
    C --> E[AI Providers]
    E --> E1[AWS Bedrock]
    E --> E2[Anthropic]
    E --> E3[OpenRouter]
    E --> E4[Local Models]
```

## System Context
The bl1nk Skill Builder interacts with various AI providers to facilitate the creation and testing of AI skills.

```mermaid
C4Context
    title System Context diagram for bl1nk Skill Builder

    Person(developer, "AI Developer", "Creates and manages AI skills.")
    System(ide, "bl1nk Skill Builder", "Desktop IDE for AI development.")

    System_Ext(bedrock, "AWS Bedrock", "Cloud LLM Provider")
    System_Ext(anthropic, "Anthropic", "Cloud LLM Provider")
    System_Ext(openrouter, "OpenRouter", "Unified LLM API")
    System_Ext(local, "Local Models", "Ollama/LM Studio")

    Rel(developer, ide, "Uses", "Desktop App")
    Rel(ide, bedrock, "Integrates with", "HTTPS/SDK")
    Rel(ide, anthropic, "Integrates with", "HTTPS/SDK")
    Rel(ide, openrouter, "Integrates with", "HTTPS/REST")
    Rel(ide, local, "Integrates with", "Localhost/REST")
```

## Containers
The system is divided into two primary containers: the Client (UI & Electron) and the Server (Business Logic & Persistence).

```mermaid
C4Container
    title Container diagram for bl1nk Skill Builder

    Person(developer, "AI Developer", "Creates and manages AI skills.")

    System_Boundary(ide_boundary, "bl1nk Skill Builder") {
        Container(client, "Desktop Client", "Electron, Next.js, React", "Provides the IDE interface.")
        Container(server, "Backend Server", "Node.js, Express, tRPC", "Handles logic and persistence.")
        ContainerDb(db, "Local Storage", "SQLite, Prisma/Drizzle", "Stores skills, settings, and credentials.")
    }

    Rel(developer, client, "Uses", "GUI")
    Rel(client, server, "Communicates with", "tRPC/IPC")
    Rel(server, db, "Reads from/Writes to", "SQL")
```
