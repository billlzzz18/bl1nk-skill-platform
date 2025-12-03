#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs');
const CONFIG = require(path.join(DOCS_DIR, 'i18n-config.json'));

const templates = {
  'project-goals.md': {
    en: `# Project Goals\n\n## Vision\nCreate the best AI development IDE for Claude skills and agents.\n\n## Objectives\n- Simplify AI skill development\n- Provide 500+ ready-to-use agents\n- Support multiple LLM providers\n- Ensure security and privacy\n`,
    th: `# เป้าหมายโปรเจกต์\n\n## วิสัยทัศน์\nสร้าง IDE ที่ดีที่สุดสำหรับพัฒนา Claude skills และ agents\n\n## วัตถุประสงค์\n- ทำให้การพัฒนา AI skill ง่ายขึ้น\n- มี agents พร้อมใช้ 500+ ตัว\n- รองรับหลาย LLM providers\n- รับประกันความปลอดภัยและความเป็นส่วนตัว\n`
  },
  'system-overview.md': {
    en: `# System Overview\n\n## Architecture\nMonorepo with client (Electron+Next.js) and server (tRPC+Express).\n\n## Components\n- Frontend: React 19, Monaco Editor\n- Backend: tRPC, Prisma, SQLite\n- AI: Multi-provider integration\n`,
    th: `# ภาพรวมระบบ\n\n## สถาปัตยกรรม\nMonorepo ประกอบด้วย client (Electron+Next.js) และ server (tRPC+Express)\n\n## ส่วนประกอบ\n- Frontend: React 19, Monaco Editor\n- Backend: tRPC, Prisma, SQLite\n- AI: รองรับหลาย providers\n`
  },
  'architecture-overview.md': {
    en: `# Architecture Overview\n\n## System Design\nEvent-driven architecture with type-safe APIs.\n\n## Layers\n1. Presentation (React)\n2. API (tRPC)\n3. Business Logic\n4. Data (Prisma)\n`,
    th: `# ภาพรวมสถาปัตยกรรม\n\n## การออกแบบระบบ\nสถาปัตยกรรมแบบ event-driven พร้อม type-safe APIs\n\n## ชั้นต่างๆ\n1. Presentation (React)\n2. API (tRPC)\n3. Business Logic\n4. Data (Prisma)\n`
  },
  'trpc-overview.md': {
    en: `# tRPC API Overview\n\n## Endpoints\n- skill.* - Skill CRUD\n- chat.* - Chat operations\n- credential.* - Credential management\n\n## Type Safety\nEnd-to-end type safety with Zod validation.\n`,
    th: `# ภาพรวม tRPC API\n\n## Endpoints\n- skill.* - จัดการ Skill\n- chat.* - การสนทนา\n- credential.* - จัดการ Credentials\n\n## Type Safety\nType safety แบบ end-to-end พร้อม Zod validation\n`
  },
  'schemas.md': {
    en: `# API Schemas\n\n## Skill Schema\n\`\`\`typescript\ninterface Skill {\n  id: string\n  name: string\n  content: string\n  version: number\n}\n\`\`\`\n`,
    th: `# API Schemas\n\n## Skill Schema\n\`\`\`typescript\ninterface Skill {\n  id: string\n  name: string\n  content: string\n  version: number\n}\n\`\`\`\n`
  },
  'error-handling.md': {
    en: `# Error Handling\n\n## Error Types\n- ValidationError\n- NotFoundError\n- UnauthorizedError\n\n## Response Format\n\`\`\`json\n{\n  "error": {\n    "code": "NOT_FOUND",\n    "message": "Resource not found"\n  }\n}\n\`\`\`\n`,
    th: `# การจัดการ Errors\n\n## ประเภท Errors\n- ValidationError\n- NotFoundError\n- UnauthorizedError\n\n## รูปแบบ Response\n\`\`\`json\n{\n  "error": {\n    "code": "NOT_FOUND",\n    "message": "ไม่พบข้อมูล"\n  }\n}\n\`\`\`\n`
  },
  'schema-overview.md': {
    en: `# Database Schema\n\n## Tables\n- Skill\n- SkillVersion\n- ApiCredential\n- TestMessage\n- AppSettings\n`,
    th: `# Database Schema\n\n## ตาราง\n- Skill\n- SkillVersion\n- ApiCredential\n- TestMessage\n- AppSettings\n`
  },
  'erd.md': {
    en: `# Entity Relationship Diagram\n\n\`\`\`mermaid\nerDiagram\n    Skill ||--o{ SkillVersion : has\n    Skill {\n        string id\n        string name\n        int version\n    }\n\`\`\`\n`,
    th: `# Entity Relationship Diagram\n\n\`\`\`mermaid\nerDiagram\n    Skill ||--o{ SkillVersion : has\n    Skill {\n        string id\n        string name\n        int version\n    }\n\`\`\`\n`
  },
  'migrations.md': {
    en: `# Database Migrations\n\n## Commands\n\`\`\`bash\npnpm prisma migrate dev\npnpm prisma migrate deploy\n\`\`\`\n`,
    th: `# Database Migrations\n\n## คำสั่ง\n\`\`\`bash\npnpm prisma migrate dev\npnpm prisma migrate deploy\n\`\`\`\n`
  },
  'contributing.md': {
    en: `# Contributing Guide\n\n## Getting Started\n1. Fork the repository\n2. Create a feature branch\n3. Make your changes\n4. Submit a pull request\n`,
    th: `# คู่มือการมีส่วนร่วม\n\n## เริ่มต้น\n1. Fork repository\n2. สร้าง feature branch\n3. ทำการแก้ไข\n4. ส่ง pull request\n`
  },
  'testing.md': {
    en: `# Testing Guide\n\n## E2E Tests\n\`\`\`bash\npnpm test:e2e\n\`\`\`\n\n## Unit Tests\n\`\`\`bash\npnpm test:unit\n\`\`\`\n`,
    th: `# คู่มือการทดสอบ\n\n## E2E Tests\n\`\`\`bash\npnpm test:e2e\n\`\`\`\n\n## Unit Tests\n\`\`\`bash\npnpm test:unit\n\`\`\`\n`
  },
  'troubleshooting.md': {
    en: `# Troubleshooting\n\n## Common Issues\n\n### Build Fails\n\`\`\`bash\npnpm clean\npnpm install\npnpm build\n\`\`\`\n`,
    th: `# แก้ไขปัญหา\n\n## ปัญหาที่พบบ่อย\n\n### Build ล้มเหลว\n\`\`\`bash\npnpm clean\npnpm install\npnpm build\n\`\`\`\n`
  },
  'glossary.md': {
    en: `# Glossary\n\n- **Skill**: AI instruction set\n- **Agent**: Pre-configured AI assistant\n- **MCP**: Model Context Protocol\n`,
    th: `# คำศัพท์\n\n- **Skill**: ชุดคำสั่ง AI\n- **Agent**: AI assistant ที่ตั้งค่าไว้แล้ว\n- **MCP**: Model Context Protocol\n`
  },
  'resources.md': {
    en: `# Resources\n\n## Links\n- [GitHub](https://github.com/bl1nk-org/claude-skill-builder)\n- [Documentation](../)\n`,
    th: `# แหล่งข้อมูล\n\n## ลิงก์\n- [GitHub](https://github.com/bl1nk-org/claude-skill-builder)\n- [เอกสาร](../)\n`
  }
};

const adrTemplate = (num, title) => ({
  en: `# ADR-${num}: ${title}\n\n**Date**: 2025-01-XX\n**Status**: Accepted\n\n## Context\nDecision context here.\n\n## Decision\nWe decided to...\n\n## Consequences\n- Positive: ...\n- Negative: ...\n`,
  th: `# ADR-${num}: ${title}\n\n**วันที่**: 2025-01-XX\n**สถานะ**: ยอมรับแล้ว\n\n## บริบท\nบริบทการตัดสินใจ\n\n## การตัดสินใจ\nเราตัดสินใจที่จะ...\n\n## ผลที่ตามมา\n- ด้านบวก: ...\n- ด้านลบ: ...\n`
});

function generateFile(lang, section, filename, content) {
  const filePath = path.join(DOCS_DIR, lang, section, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✅ Created: ${lang}/${section}/${filename}`);
  }
}

function main() {
  console.log('📝 Generating documentation files...\n');

  // Generate from templates
  for (const [filename, content] of Object.entries(templates)) {
    for (const section of CONFIG.structure) {
      if (section.files && section.files.includes(filename)) {
        generateFile('en', section.id, filename, content.en);
        generateFile('th', section.id, filename, content.th);
      }
    }
  }

  // Generate ADRs
  const adrs = [
    ['0001', 'Electron + Next.js Choice'],
    ['0002', 'tRPC over REST'],
    ['0003', 'SQLite Phase 1'],
    ['0004', 'Monorepo Structure'],
    ['0005', 'Encryption Strategy']
  ];

  for (const [num, title] of adrs) {
    const adr = adrTemplate(num, title);
    generateFile('en', '05_adrs', `${num}-${title.toLowerCase().replace(/\s+/g, '-')}.md`, adr.en);
    generateFile('th', '05_adrs', `${num}-${title.toLowerCase().replace(/\s+/g, '-')}.md`, adr.th);
  }

  // Generate README files
  const readmeEN = `# Claude Skill Builder Documentation\n\nComprehensive documentation for the Claude Skill Builder IDE.\n\n## Sections\n${CONFIG.structure.map(s => `- [${s.name.en}](./${s.id}/)`).join('\n')}\n`;
  const readmeTH = `# เอกสาร Claude Skill Builder\n\nเอกสารครบถ้วนสำหรับ Claude Skill Builder IDE\n\n## หมวดหมู่\n${CONFIG.structure.map(s => `- [${s.name.th}](./${s.id}/)`).join('\n')}\n`;

  if (!fs.existsSync(path.join(DOCS_DIR, 'en', 'README.md'))) {
    fs.writeFileSync(path.join(DOCS_DIR, 'en', 'README.md'), readmeEN);
    console.log('  ✅ Created: en/README.md');
  }

  console.log('\n✅ Documentation generation complete!');
}

main();
