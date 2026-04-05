# คู่มือการทดสอบ

bl1nk Skill Builder ใช้กลยุทธ์การทดสอบที่ครอบคลุม รวมถึงการทดสอบระดับ unit, integration และ end-to-end (E2E)

## 🧪 กลยุทธ์การทดสอบ (Testing Strategy)

### 1. Unit Tests (Vitest)
Unit tests มุ่งเน้นไปที่การทดสอบฟังก์ชัน, คอมโพเนนต์ และบริการแต่ละรายการแยกกัน
- **ตำแหน่ง**: `apps/server/src/**/__tests__/*.test.ts`, `apps/client/src/**/__tests__/*.test.tsx`
- **คำสั่ง**:
  ```bash
  pnpm test:unit           # รัน unit tests ทั้งหมด
  pnpm test:unit:watch     # รัน unit tests ใน watch mode
  ```

### 2. Integration Tests
Integration tests ตรวจสอบว่าโมดูลต่างๆ ของระบบทำงานร่วมกันได้ตามที่คาดไว้ โดยเฉพาะ tRPC API และการโต้ตอบกับฐานข้อมูล

### 3. End-to-End Tests (Playwright)
E2E tests จำลองการโต้ตอบของผู้ใช้จริงๆ ในแอปพลิเคชัน Electron
- **ตำแหน่ง**: `__tests__/e2e/`
- **คำสั่ง**:
  ```bash
  pnpm test:e2e           # รัน E2E tests ทั้งหมด
  pnpm test:e2e:ui        # รัน E2E tests ด้วย UI mode
  pnpm test:e2e:debug     # รัน E2E tests ใน debug mode
  ```
- **โครงสร้าง**: การทดสอบถูกจัดกลุ่มตามฟีเจอร์ (เช่น `chat`, `providers`, `core`)

## 🛠️ เครื่องมือช่วยในการทดสอบ (Test Utilities)

### Playwright Helpers
การดำเนินการทั่วไปในการทดสอบถูกรวบรวมไว้ใน `__tests__/e2e/helpers/test_helper.ts` เพื่อให้การเขียนและการบำรุงรักษาการทดสอบง่ายขึ้น

### Mocking
เราใช้ Vitest mocks สำหรับ API ของผู้ให้บริการ AI ภายนอก และการเรียกใช้ Electron IPC ในระดับระบบ เพื่อให้การทดสอบมีความน่าเชื่อถือและรวดเร็ว

## ✅ การเขียนการทดสอบใหม่

1.  **Unit Tests**: ใช้บล็อก `describe` และ `it`/`test` ของ Vitest
2.  **E2E Tests**: ปฏิบัติตามรูปแบบ PageObject เพื่อการทดสอบที่บำรุงรักษาง่าย
3.  **Assertions**: ใช้ `expect` สำหรับการตรวจสอบผลลัพธ์ทั้งหมด

## 📊 การตรวจสอบคุณภาพ

ก่อนส่ง Pull Request โปรดตรวจสอบให้แน่ใจว่าการทดสอบทั้งหมดผ่าน:
```bash
pnpm validate    # รัน lint, type-check และ tests
```

### การตรวจสอบสุขภาพ (Health Check)
รันสคริปต์ตรวจสอบสุขภาพของโปรเจกต์เพื่อตรวจสอบสถานะโดยรวม:
```bash
pnpm health
```

สคริปต์นี้จะตรวจสอบ:
- ติดตั้ง dependencies แล้ว
- Client และ Server สามารถ build ได้สำเร็จ
- มี core skills ทั้ง 15 รายการและถูกต้อง
- มี agent templates ทั้ง 501 รายการและถูกต้อง
- E2E tests ทั้ง 74+ รายการผ่านการทดสอบ
