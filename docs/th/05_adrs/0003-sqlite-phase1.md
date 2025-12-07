# ADR-0003: SQLite Phase 1

**วันที่**: 2025-01-15
**สถานะ**: ยอมรับแล้ว

## บริบท

bl1nk Skill Builder เป็น Desktop IDE ที่ต้องการฐานข้อมูลสำหรับจัดเก็บข้อมูล:
- โปรเจกต์ (apps), แชท (chats), ข้อความ (messages)
- Skills, Agents, และ Provider credentials
- ข้อมูลต้องเก็บไว้ใน local machine ของผู้ใช้
- ไม่ต้องการ server แยกในระยะแรก
- ต้องการความเร็วในการ query และ transaction

ข้อจำกัด:
- Electron app ต้องทำงานแบบ standalone
- ผู้ใช้ไม่ควรต้อง setup database server
- ข้อมูลต้องเก็บไว้ใน user data directory
- ต้องรองรับ cross-platform (macOS, Windows, Linux)

ทางเลือกที่พิจารณา:
1. **SQLite** - embedded database, ไม่ต้อง server
2. **PostgreSQL** - ต้อง server แยก, เหมาะกับ Phase 2
3. **IndexedDB** - browser-based, จำกัดความสามารถ
4. **JSON files** - ไม่มี transaction, ช้า

## การตัดสินใจ

เราตัดสินใจใช้ **SQLite กับ Drizzle ORM** สำหรับ Phase 1:

### เหตุผล:
1. **Embedded database** - ไม่ต้อง setup server แยก
2. **Better-sqlite3** - synchronous API เหมาะกับ Electron main process
3. **Drizzle ORM** - type-safe, migration system ดี
4. **Cross-platform** - ทำงานได้ทุก OS
5. **Performance** - เร็วสำหรับ local operations

### Scope:
- ใช้ SQLite สำหรับ client-side storage
- Schema: apps, chats, messages, settings
- Migration ด้วย drizzle-kit
- เก็บไฟล์ database ใน user data directory

### Acceptance Criteria:
- ✅ CRUD operations สำหรับ apps, chats, messages
- ✅ Transaction support
- ✅ Migration system
- ✅ Type-safe queries
- ✅ ทำงานได้ทุก platform

### Migration Path:
- Phase 1: SQLite (local)
- Phase 2: PostgreSQL (server) + REST API
- Export/Import mechanism สำหรับย้ายข้อมูล

## ผลที่ตามมา

### ด้านบวก:
- ✅ **ไม่ต้อง setup** - ผู้ใช้ติดตั้งแล้วใช้ได้เลย
- ✅ **เร็ว** - local database, ไม่มี network latency
- ✅ **Type-safe** - Drizzle ORM ให้ type safety
- ✅ **Offline-first** - ทำงานได้โดยไม่ต้อง internet
- ✅ **Simple deployment** - ไม่ต้องจัดการ database server

### ด้านลบ:
- ⚠️ **Single-user** - ไม่รองรับ multi-user ในระยะแรก
- ⚠️ **No cloud sync** - ข้อมูลอยู่ใน local เท่านั้น
- ⚠️ **Migration complexity** - ต้องย้ายไป PostgreSQL ใน Phase 2
- ⚠️ **Backup manual** - ผู้ใช้ต้อง backup เอง

### Operational Impacts:
- Database file: `~/.bl1nk/local.db`
- Migrations: `apps/client/drizzle/`
- Backup: ผู้ใช้ copy ไฟล์ .db

### Rollout:
1. Implement schema ด้วย Drizzle
2. Create migration files
3. Test บน macOS, Windows, Linux
4. Release v0.1.0

### Rollback:
- ถ้ามีปัญหา: ลบไฟล์ .db และสร้างใหม่
- ข้อมูลจะหายถ้าไม่มี backup

### Follow-up Actions:
- [ ] Phase 2: Migrate to PostgreSQL
- [ ] Implement export/import mechanism
- [ ] Add cloud sync option
- [ ] Automated backup system
