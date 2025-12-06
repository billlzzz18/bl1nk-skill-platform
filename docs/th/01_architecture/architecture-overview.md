# ภาพรวมสถาปัตยกรรม

## การออกแบบระบบ

Human-First AI Platform พร้อมการ orchestration ที่ฉลาดและการยกระดับโมเดลแบบค่อยเป็นค่อยไป

### แนวคิดสถาปัตยกรรมหลัก

- **Agent ≠ Tool ≠ Skill ≠ Flow**: การแยกความรับผิดชอบที่ชัดเจนเพื่อความสามารถในการขยาย
- **Runtime Orchestrator**: เครื่องมือตัดสินใจที่ฉลาดสำหรับการเลือกโมเดล/เอเจนต์/เครื่องมือ/บริบท
- **การยกระดับแบบค่อยเป็นค่อยไป**: เริ่มด้วยโมเดลที่มีต้นทุนต่ำ ยกระดับเฉพาะเมื่อจำเป็น
- **Memory-Driven Context**: ใช้ประวัติการสนทนาและการตั้งค่าของผู้ใช้เพื่อการตัดสินใจที่ดีขึ้น

## ส่วนประกอบสถาปัตยกรรม

### Client (Electron + Next.js)

- **Framework**: Electron 38 + Next.js 15 + React 19
- **UI**: Monaco Editor, Tailwind CSS
- **State Management**: Jotai atoms
- **IPC**: Electron IPC สำหรับการสื่อสารระหว่าง client และ server

### Server (Express + tRPC)

- **Framework**: Express.js + tRPC สำหรับ type-safe APIs
- **Database**: SQLite + Drizzle ORM
- **Validation**: Zod schemas สำหรับ runtime validation

### Runtime Orchestrator (Control Plane)

- **Query/Intent Router**: จัดประเภทคำขอ (doc_qa_rag, tool_exec, creative, etc.)
- **Model Router**: การยกระดับแบบค่อยเป็นค่อยไป (Haiku → Sonnet → โมเดลเฉพาะทาง)
- **Context Manager**: การจัดการ chunk แบบไดนามิกตาม doc_type และ memory
- **Tool/Action Router**: การเลือก MCP tool พร้อมคะแนนความน่าเชื่อถือ
- **Multi-agent Coordinator**: ทีมสำหรับงานที่ซับซ้อน (Router → Retriever → Writer → Verifier)

### Shared Libraries

- **Schemas**: Zod validation schemas ที่ใช้ร่วมกันระหว่าง client/server
- **Types**: TypeScript types ที่สร้างอัตโนมัติจาก schemas
- **Data Models**: ModelProfile, AgentTemplate, FlowGraph, ToolDescriptor, SkillDescriptor

## ชั้นต่างๆ

1. **Presentation** (React + Electron)
2. **Application** (tRPC procedures)
3. **Domain** (Business logic)
4. **Infrastructure** (Database, File system, External APIs)

## การไหลของข้อมูล

```
User Input → React Components → IPC → tRPC Server → Business Logic → Database
                      ↓
                UI Updates ← Response ← Validation ← Data Access
```
