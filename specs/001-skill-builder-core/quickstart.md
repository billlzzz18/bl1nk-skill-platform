# Quickstart Guide: Skill Builder Core

**Feature**: 001-skill-builder-core
**Date**: 2025-12-01

## Prerequisites

- Node.js 20+ installed
- pnpm 8+ installed
- AWS account with Bedrock access OR OpenRouter account

## Quick Setup (5 minutes)

### 1. Clone and Install

```bash
# Navigate to project
cd claude-skill-builder

# Install dependencies
pnpm install
```

### 2. Initialize Database

```bash
# Navigate to server app
cd apps/server

# Generate Prisma client (uses SQLite)
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev --name init
```

### 3. Configure Environment

```bash
# Copy example env file
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Database (SQLite - auto-created)
DATABASE_URL="file:./skill-builder.db"

# Server ports
PORT=3000
API_PORT=3001

# Optional: Pre-configure API keys (or configure via UI)
# AWS_REGION=us-east-1
# AWS_ACCESS_KEY_ID=your-key
# AWS_SECRET_ACCESS_KEY=your-secret
# OPENROUTER_API_KEY=your-key
```

### 4. Start Development Servers

```bash
# From project root
pnpm dev
```

This starts:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## First Skill in 2 Minutes

### Step 1: Configure API Credentials

1. Open http://localhost:3000
2. Go to **Settings** (gear icon)
3. Select your API provider:
   - **AWS Bedrock**: Enter Access Key, Secret Key, and Region
   - **OpenRouter**: Enter API Key
4. Click **Save & Validate**

### Step 2: Create Your First Skill

1. Click **New Skill** on the dashboard
2. Fill in the form:
   - **Name**: "Code Reviewer"
   - **Description**: "Reviews code and suggests improvements"
   - **Content** (prompt template):

```markdown
You are an expert code reviewer. When given code, you will:

1. Identify potential bugs or issues
2. Suggest improvements for readability
3. Point out any security concerns
4. Recommend best practices

Be constructive and explain your reasoning.
```

3. Click **Save**

### Step 3: Test Your Skill

1. Click **Test** on your skill card (or from editor)
2. In the chat interface, send a test message:

```
Review this function:

function add(a, b) {
  return a + b
}
```

3. Watch the streaming response from Claude!

## Common Tasks

### Edit a Skill

1. Click on a skill in the dashboard
2. Modify name, description, or content
3. Click **Save** (creates a new version)

### View Version History

1. Open a skill in the editor
2. Click **History** tab
3. View previous versions
4. Click **Restore** to revert to a previous version

### Switch API Provider

1. Go to **Settings**
2. Toggle between AWS Bedrock and OpenRouter
3. Credentials are saved separately for each

### Clear Test Conversation

In the test chat interface, click **Clear** to start fresh.

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + S` | Save skill |
| `Ctrl/Cmd + Enter` | Send test message |
| `Ctrl/Cmd + N` | New skill |
| `Escape` | Close modal/dialog |

## Troubleshooting

### "No API credentials configured"

1. Go to Settings
2. Add credentials for at least one provider
3. Click **Validate** to verify

### "Invalid credentials" error

- **Bedrock**: Verify IAM permissions include `bedrock:InvokeModel`
- **OpenRouter**: Check API key is active at openrouter.ai/keys

### Slow streaming responses

- Check your internet connection
- Try switching to OpenRouter (often faster for smaller prompts)
- Reduce prompt size if testing with long conversations

### Database errors

```bash
# Reset database (WARNING: deletes all data)
cd apps/server
rm skill-builder.db
pnpm prisma migrate dev --name init
```

## Next Steps

- [ ] Create more skills for different use cases
- [ ] Experiment with different prompt styles
- [ ] Test skills with various input types
- [ ] Export skills for use in Claude Code (Phase 2)

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│              Desktop Application            │
├─────────────────────────────────────────────┤
│  Frontend (Next.js)    │    Backend (tRPC)  │
│  - Skill Editor        │    - skill.router  │
│  - Chat Interface      │    - credential.router │
│  - Settings Page       │    - chat.router   │
│                        │    - SQLite DB     │
└─────────────────────────────────────────────┘
              │                    │
              └────────┬───────────┘
                       │
    ┌──────────────────┴──────────────────┐
    │         External APIs               │
    ├─────────────────┬───────────────────┤
    │   AWS Bedrock   │    OpenRouter     │
    │   (Claude API)  │    (Claude API)   │
    └─────────────────┴───────────────────┘
```

---

*For detailed implementation, see [plan.md](./plan.md) and [data-model.md](./data-model.md)*
