# Rule Systems Documentation

This project uses multiple AI assistant rule systems to provide context and guidance. Each system serves a specific purpose and IDE integration.

## Overview

```
.
├── .amazonq/          # Amazon Q Developer rules
├── .cursor/           # Cursor IDE rules
├── .claude/           # Claude Code commands
└── .specify/          # Specification templates
```

## 1. Amazon Q Rules (`.amazonq/`)

**Purpose**: Amazon Q Developer IDE integration with memory bank and automation rules.

**Location**: `.amazonq/rules/`

**Contents**:
- `memory-bank/` - Project documentation
  - `product.md` - Product overview and features
  - `structure.md` - Project structure and organization
  - `tech.md` - Technology stack and dependencies
  - `guidelines.md` - Development guidelines and patterns
- `autotasks.md` - Automation scripts and validation
- `docgen.md` - Documentation generation rules
- `file-organize.md` - File organization patterns

**Usage**: Automatically loaded by Amazon Q Developer in VS Code/JetBrains IDEs.

**When to Update**:
- Major architectural changes
- New technology additions
- Updated development patterns
- New automation scripts

## 2. Cursor Rules (`.cursor/`)

**Purpose**: Cursor IDE AI assistant context and code review guidelines.

**Location**: `.cursor/rules/`

**Contents**:
- `memory-bank/` - Project context (mirrors Amazon Q structure)
- `automated-code-review.md` - Automated review guidelines
- `code-review-guidelines.mdc` - Manual review checklist
- `react-nextjs-standards.mdc` - React/Next.js patterns
- `typescript-standards.mdc` - TypeScript conventions
- `README.md` - Cursor-specific documentation

**Usage**: Loaded by Cursor IDE for AI-assisted development.

**When to Update**:
- Code review process changes
- New React/TypeScript patterns
- Updated best practices

## 3. Claude Commands (`.claude/`)

**Purpose**: Custom Claude Code commands for specification-driven development.

**Location**: `.claude/commands/`

**Contents**:
- `speckit.analyze.md` - Analyze specifications
- `speckit.checklist.md` - Generate checklists
- `speckit.clarify.md` - Clarify requirements
- `speckit.constitution.md` - Project constitution
- `speckit.implement.md` - Implementation guidance
- `speckit.plan.md` - Planning workflows
- `speckit.specify.md` - Create specifications
- `speckit.tasks.md` - Task management
- `speckit.taskstoissues.md` - Convert tasks to issues
- `settings.local.json` - Local Claude settings

**Usage**: Invoked via Claude Code command palette with `/speckit` prefix.

**When to Update**:
- New specification workflows
- Updated planning processes
- Custom command additions

## 4. Specification Templates (`.specify/`)

**Purpose**: Templates for creating specifications, plans, and checklists.

**Location**: `.specify/`

**Contents**:
- `memory/constitution.md` - Project constitution
- `scripts/powershell/` - PowerShell automation scripts
- `templates/` - Document templates
  - `agent-file-template.md` - Agent specification template
  - `checklist-template.md` - Checklist template
  - `plan-template.md` - Planning template
  - `spec-template.md` - Specification template
  - `tasks-template.md` - Task breakdown template

**Usage**: Copy templates when creating new specifications or plans.

**When to Update**:
- New document types needed
- Template improvements
- Process refinements

## Synchronization Strategy

### Memory Bank Consistency
The memory bank documentation should be consistent across systems:

**Primary Source**: `.amazonq/rules/memory-bank/`
- `product.md`
- `structure.md`
- `tech.md`
- `guidelines.md`

**Sync To**: `.cursor/rules/memory-bank/`

**Update Process**:
1. Make changes in `.amazonq/rules/memory-bank/`
2. Copy to `.cursor/rules/memory-bank/`
3. Commit both changes together

### Rule-Specific Content
Each system has unique content that should NOT be synchronized:
- Amazon Q: `autotasks.md`, `docgen.md`, `file-organize.md`
- Cursor: Code review guidelines, standards documents
- Claude: SpecKit commands
- Specify: Templates

## Maintenance Guidelines

### When to Update Rules

**Immediate Updates Required**:
- Major architectural changes
- New technology stack additions
- Breaking changes in patterns
- Security policy updates

**Regular Updates (Monthly)**:
- Development pattern refinements
- New best practices
- Automation improvements
- Template enhancements

**As-Needed Updates**:
- New commands or workflows
- Team process changes
- Tool integrations

### Update Checklist

When updating rules:
- [ ] Update primary source (Amazon Q memory bank)
- [ ] Sync to Cursor if memory bank changed
- [ ] Update relevant system-specific rules
- [ ] Test with respective IDE/tool
- [ ] Document changes in commit message
- [ ] Update this RULE_SYSTEMS.md if structure changed

## Best Practices

### 1. Keep Rules Focused
- Each rule file should have a single, clear purpose
- Avoid duplication across systems
- Reference other files instead of copying content

### 2. Use Markdown Consistently
- Clear headings and structure
- Code examples with syntax highlighting
- Links to related documentation

### 3. Version Control
- Commit rule changes with descriptive messages
- Tag major rule updates
- Keep rules in sync with codebase

### 4. Documentation
- Explain WHY rules exist, not just WHAT they are
- Provide examples and use cases
- Link to external resources when helpful

## IDE Integration

### Amazon Q Developer
- Automatically loads `.amazonq/rules/` on IDE startup
- Access via Q chat panel
- Context-aware suggestions based on memory bank

### Cursor IDE
- Loads `.cursor/rules/` for AI context
- Use `@rules` to reference specific rules
- Integrates with code review workflows

### Claude Code
- Access commands via command palette
- Type `/speckit` to see available commands
- Uses `.claude/commands/` for custom workflows

## Troubleshooting

### Rules Not Loading
1. Check file paths match expected structure
2. Verify markdown syntax is valid
3. Restart IDE to reload rules
4. Check IDE settings for rule directories

### Conflicting Rules
1. Identify which system is active
2. Check for duplicate or contradictory guidance
3. Update primary source (Amazon Q)
4. Sync to other systems

### Outdated Rules
1. Run `node scripts/health-check.js`
2. Review recent architectural changes
3. Update memory bank documentation
4. Sync across systems

## Contributing

When contributing rule updates:
1. Follow the synchronization strategy
2. Test rules with respective IDE
3. Update this documentation if structure changes
4. Include examples in rule files
5. Document rationale for changes

## Related Documentation

- [Architecture](./Architecture.md) - System architecture
- [Security](./SECURITY.md) - Security guidelines and best practices
- [CONTRIBUTING](../CONTRIBUTING.md) - Contribution guidelines
- [Roadmap](./roadmap.md) - Project roadmap
- [Memory Bank](../.amazonq/rules/memory-bank/) - Project context
