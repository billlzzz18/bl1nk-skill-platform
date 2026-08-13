# ภาพรวมสถาปัตยกรรม

## การออกแบบระบบ
bl1nk Skill Builder ได้รับการออกแบบให้เป็น IDE แบบ desktop-first โดยใช้โครงสร้างแบบ monorepo ซึ่งใช้ประโยชน์จาก Electron เพื่อมอบประสบการณ์แบบ native พร้อมด้วย Next.js สำหรับ frontend และ Node.js สำหรับ backend

## ชั้นของสถาปัตยกรรม (Architecture Layers)
1.  **Presentation Layer (Next.js + React 19)**: รับผิดชอบส่วนติดต่อผู้ใช้ (UI/UX) รวมถึงตัวแก้ไข skill (Monaco), อินเทอร์เฟซการแชท และการตั้งค่า
2.  **API Layer (tRPC + REST)**: ให้บริการการสื่อสารแบบ type-safe ระหว่าง frontend และ backend
3.  **Business Logic Layer**: จัดการการจัดการ skill, การกำหนดเวอร์ชัน และการรวม AI เข้ากับหลาย provider
4.  **Data Layer (Prisma/Drizzle + SQLite)**: จัดการความคงอยู่ของข้อมูล (persistence) สำหรับ skill, เวอร์ชัน และข้อมูลรับรอง (credentials)

## แผนภาพระบบ (System Diagram)
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
bl1nk Skill Builder ทำงานร่วมกับผู้ให้บริการ AI ต่างๆ เพื่ออำนวยความสะดวกในการสร้างและทดสอบ AI skills

```mermaid
C4Context
    title System Context diagram for bl1nk Skill Builder

    Person(developer, "AI Developer", "ผู้สร้างและจัดการ AI skills")
    System(ide, "bl1nk Skill Builder", "Desktop IDE สำหรับการพัฒนา AI")

    System_Ext(bedrock, "AWS Bedrock", "Cloud LLM Provider")
    System_Ext(anthropic, "Anthropic", "Cloud LLM Provider")
    System_Ext(openrouter, "OpenRouter", "Unified LLM API")
    System_Ext(local, "Local Models", "Ollama/LM Studio")

    Rel(developer, ide, "ใช้", "Desktop App")
    Rel(ide, bedrock, "เชื่อมต่อกับ", "HTTPS/SDK")
    Rel(ide, anthropic, "เชื่อมต่อกับ", "HTTPS/SDK")
    Rel(ide, openrouter, "เชื่อมต่อกับ", "HTTPS/REST")
    Rel(ide, local, "เชื่อมต่อกับ", "Localhost/REST")
```

## Containers
ระบบถูกแบ่งออกเป็นสองคอนเทนเนอร์หลัก: Client (UI & Electron) และ Server (Business Logic & Persistence)

```mermaid
C4Container
    title Container diagram for bl1nk Skill Builder

    Person(developer, "AI Developer", "ผู้สร้างและจัดการ AI skills")

    System_Boundary(ide_boundary, "bl1nk Skill Builder") {
        Container(client, "Desktop Client", "Electron, Next.js, React", "อินเทอร์เฟซของ IDE")
        Container(server, "Backend Server", "Node.js, Express, tRPC", "จัดการตรรกะและการจัดเก็บข้อมูล")
        ContainerDb(db, "Local Storage", "SQLite, Prisma/Drizzle", "จัดเก็บ skills, การตั้งค่า และ credentials")
    }

    Rel(developer, client, "ใช้", "GUI")
    Rel(client, server, "สื่อสารกับ", "tRPC/IPC")
    Rel(server, db, "อ่านจาก/เขียนไปยัง", "SQL")
```
