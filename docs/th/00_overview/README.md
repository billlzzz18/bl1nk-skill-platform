# Claude Skill Builder - ภาพรวม

## 🎯 คืออะไร?

Claude Skill Builder เป็น **Desktop IDE** ที่ออกแบบมาเฉพาะสำหรับการพัฒนา AI โดยเฉพาะ ช่วยให้คุณสร้าง จัดการ และทดสอบ Claude AI skills, agents และ MCP tools ได้ในที่เดียว

**คิดง่ายๆ ว่า "VS Code แต่สำหรับการพัฒนา AI"**

## 🎯 หลักการหลัก

### Human-First AI Governance

- **Human-First**: สิทธิ์ทุกอย่างอยู่ที่ผู้ใช้ - AI ไม่มีสิทธิ์ทำงานเองโดยพลการ
- **AI-Mediated**: LLM ตีความ/สรุป ไม่ใช่ดำเนินการอัตโนมัติ
- **Tool-Bound**: แยก Agent, Tool, Skill ออกจากกันชัดเจน
- **Permission Delegation**: ทุก action ต้องถามยืนยันจากผู้ใช้ก่อนเสมอ

## ✨ คุณสมบัติหลัก

### 🤖 ระบบ Agent (501 Templates)

- **138 Development agents** - Python, TypeScript, React, Rust, etc.
- **115 Writing agents** - เขียนเนื้อหา, แปลภาษา, copywriting
- **62 Education agents** - สอนพิเศษ, เรียนภาษา
- **51 Data agents** - วิเคราะห์ข้อมูล, วิจัย, ML/AI
- **48 Creative agents** - ศิลปะ, ดีไซน์, ดนตรี
- **36 Business agents** - การตลาด, ขาย, ที่ปรึกษา

### 🛠️ การพัฒนา Skill

- Monaco Editor พร้อม syntax highlighting
- 15+ หมวดหมู่ skill พร้อม templates
- Version control พร้อมประวัติและการคืนค่า
- ทดสอบ skill แบบ real-time
- สร้างจาก template ด้วยรูปแบบ SKILL.md

### 🔌 รองรับหลาย AI Provider

- **OpenAI** - GPT models
- **Anthropic** - Claude models (Direct API + AWS Bedrock)
- **Google** - Gemini models + Vertex AI
- **AWS Bedrock** - Claude, Titan, Nova, Mistral, Meta models
- **Azure OpenAI** - Azure-hosted OpenAI models
- **OpenRouter** - หลาย LLM providers
- **xAI** - xAI models
- **Local Models** - LM Studio, Ollama

**กลยุทธ์การเลือกโมเดล:**

- ใช้ Haiku/Titan/Nova สำหรับเตรียมข้อมูล, การค้นหา, และงานเบา
- ใช้ Sonnet/AI21 สำหรับการสร้างที่ซับซ้อน, การเขียนโค้ด, และการตัดสินใจที่มีความเสี่ยงสูง
- การยกระดับแบบค่อยเป็นค่อยไปตามคะแนนความมั่นใจและความซับซ้อนของงาน

### 🔐 ความปลอดภัย

- เข้ารหัส credentials ด้วย AES-256-GCM
- ป้องกัน path traversal
- ตรวจจับ symlink loops
- Context isolation enabled
- Security fuses สำหรับ production builds

### 🧪 Testing & Validation

- 74+ E2E tests แบ่งตาม feature
- ตรวจสอบ skill และ agent อัตโนมัติ
- Health check monitoring
- Progress feedback สำหรับ operations ที่ใช้เวลานาน

## 🏗️ สถาปัตยกรรม

```
claude-skill-builder/
├── apps/
│   ├── client/          # Electron + Next.js frontend
│   └── server/          # Express + tRPC backend
├── packages/
│   └── shared/          # Shared types และ utilities
├── agents/              # 501 agent templates
├── skill/               # 15 skill categories
└── __tests__/           # 74+ E2E tests
```

## 📊 สถิติโปรเจกต์

- **Agents**: 501 templates พร้อมใช้
- **Skills**: 15 หมวดหมู่พร้อมเอกสาร
- **Tests**: 74+ E2E specifications
- **API Endpoints**: 20+ REST endpoints
- **Security Issues Fixed**: 16 (แก้ไขทั้งหมดแล้ว)
- **Tech Stack**: TypeScript 5.8, Next.js 15, React 19, Electron 38

## 🎯 กลุ่มเป้าหมาย

### ผู้ใช้หลัก

1. **AI Developers** - สร้าง custom Claude skills และ agents
2. **Prompt Engineers** - สร้างและปรับแต่ง AI prompts
3. **Integration Developers** - สร้าง MCP tools และ AI integrations
4. **Content Creators** - ใช้ pre-built agents สำหรับเขียน แปล และสร้างสรรค์

### ผู้ใช้รอง

1. **Educators** - สอนการพัฒนา AI และ prompt engineering
2. **Researchers** - ทดลองความสามารถของ AI
3. **Business Users** - ใช้ pre-built agents เพื่อเพิ่มประสิทธิภาพ

## 🚀 เริ่มต้นใช้งาน

### ความต้องการระบบ

- Node.js >= 20.0.0
- pnpm (เวอร์ชันล่าสุด)
- Git

### ติดตั้ง

```bash
# Clone repository
git clone https://github.com/bl1nk-org/bl1nk-skill-builder.git
cd bl1nk-skill-builder

# ติดตั้ง dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# เริ่ม development
pnpm dev
```

### การใช้งานครั้งแรก

1. ตั้งค่า API credentials ใน Settings
2. เลือกดู 501 pre-built agents
3. สร้างหรือ import skill
4. ทดสอบด้วย integrated chat interface

## 📈 Roadmap

### ✅ Phase 0-1: Core Features (เสร็จสมบูรณ์)

- Skill management + versioning
- 501 agent templates
- Multi-provider AI (11 providers)
- Credential management (encrypted)
- SQLite + Drizzle ORM
- Electron packaging
- Monaco editor
- 74 E2E tests
- Security hardening

### 🚀 Phase 2: API & Infrastructure (กำลังดำเนินการ)

- REST API v1 + OpenAPI spec
- Automation scripts
- Security documentation
- PostgreSQL + Redis migration
- CI/CD automation
- Cloud synchronization

### 📅 Phase 3: UX & Security Polish

- Multi-user authentication
- Advanced skill organization
- Observability dashboard
- Automated backups

### 📅 Phase 4: Collaboration & Distribution

- Cloud sync สำหรับ skills
- Skill marketplace
- Team collaboration
- Public gallery

## 🤝 การมีส่วนร่วม

เรายินดีรับการมีส่วนร่วม! ดู [Contributing Guide](../06_guides/contributing.md) สำหรับ:

- Development setup
- Code standards
- Testing guidelines
- Pull request process
- Security considerations

## 📄 License

MIT License - ดูไฟล์ [LICENSE](../../../LICENSE)

## 📞 ติดต่อและสนับสนุน

- 📖 [เอกสาร](../)
- 🐛 [Issue Tracker](https://github.com/bl1nk-org/claude-skill-builder/issues)
- 💬 [Discussions](https://github.com/bl1nk-org/claude-skill-builder/discussions)
- 🔒 [Security Policy](../../SECURITY.md)

---

**สร้างด้วย ❤️ โดยทีม bl1nk**
