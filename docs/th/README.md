# 📚 เอกสาร Claude Skill Builder (ภาษาไทย)

> IDE สำหรับสร้าง จัดการ และทดสอบ Claude AI skills, agents และ MCP tools

## 🗂️ โครงสร้างเอกสาร

### [00. ภาพรวม](./00_overview/)
- [README](./00_overview/README.md) - แนะนำโปรเจกต์
- [เป้าหมายโปรเจกต์](./00_overview/project-goals.md) - วัตถุประสงค์และเป้าหมาย
- [เทคโนโลยี](./00_overview/tech-stack.md) - Stack เทคโนโลยีที่ใช้
- [ภาพรวมระบบ](./00_overview/system-overview.md) - สถาปัตยกรรมระดับสูง

### [01. สถาปัตยกรรม](./01_architecture/)
- [ภาพรวมสถาปัตยกรรม](./01_architecture/architecture-overview.md)
- [C4 Models](./01_architecture/c4-models/) - แผนภาพ Context, Container, Component
- [Data Flow](./01_architecture/data-flow/) - การไหลของข้อมูล
- [Sequence Diagrams](./01_architecture/sequence-diagrams/) - ลำดับการทำงาน

### [02. API](./02_api/)
- [tRPC Overview](./02_api/trpc-overview.md) - ภาพรวม tRPC API
- [Endpoints](./02_api/endpoints/) - รายละเอียด API endpoints
- [Schemas](./02_api/schemas.md) - โครงสร้างข้อมูล
- [Error Handling](./02_api/error-handling.md) - การจัดการ errors

### [03. ฐานข้อมูล](./03_database/)
- [ภาพรวม Schema](./03_database/schema-overview.md)
- [ERD](./03_database/erd.md) - Entity Relationship Diagram
- [Models](./03_database/models/) - รายละเอียด data models
- [Migrations](./03_database/migrations.md) - การจัดการ migrations

### [04. การ Deploy](./04_deployment/)
- [Electron](./04_deployment/electron/) - Desktop app packaging
- [Docker](./04_deployment/docker/) - Container deployment
- [AWS](./04_deployment/aws/) - Cloud infrastructure

### [05. ADRs](./05_adrs/)
- [ADR-0001: Electron + Next.js](./05_adrs/0001-electron-nextjs-choice.md)
- [ADR-0002: tRPC over REST](./05_adrs/0002-trpc-over-rest.md)
- [ADR-0003: SQLite Phase 1](./05_adrs/0003-sqlite-phase1.md)
- [ADR-0004: Monorepo Structure](./05_adrs/0004-monorepo-structure.md)
- [ADR-0005: Encryption Strategy](./05_adrs/0005-encryption-strategy.md)

### [06. คู่มือ](./06_guides/)
- [Development Setup](./06_guides/development-setup.md) - ติดตั้งสภาพแวดล้อม dev
- [Contributing](./06_guides/contributing.md) - แนวทางการมีส่วนร่วม
- [Testing](./06_guides/testing.md) - การเขียนและรัน tests
- [Troubleshooting](./06_guides/troubleshooting.md) - แก้ไขปัญหา

### [07. อ้างอิง](./07_references/)
- [Glossary](./07_references/glossary.md) - คำศัพท์
- [Resources](./07_references/resources.md) - แหล่งข้อมูลเพิ่มเติม

## 🚀 เริ่มต้นอย่างรวดเร็ว

```bash
# Clone repository
git clone https://github.com/bl1nk-org/claude-skill-builder.git
cd claude-skill-builder

# ติดตั้ง dependencies
pnpm install

# เริ่ม development
pnpm dev
```

## 📖 เอกสารภาษาอังกฤษ

สำหรับเอกสารภาษาอังกฤษ ดูที่ [../en/](../en/)

## 🤝 การมีส่วนร่วม

ดูคู่มือ [Contributing Guide](./06_guides/contributing.md) สำหรับรายละเอียด

## 📄 License

MIT License - ดูไฟล์ [LICENSE](../../LICENSE)

---

**อัพเดทล่าสุด**: 2025-01-XX  
**เวอร์ชัน**: 0.1.0
