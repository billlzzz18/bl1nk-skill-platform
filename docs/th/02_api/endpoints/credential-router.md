# Credential Router API

`credential` router จัดการข้อมูลรับรอง API (credentials) สำหรับผู้ให้บริการ LLM ต่างๆ (AWS Bedrock, OpenRouter, Anthropic เป็นต้น) ข้อมูลที่ละเอียดอ่อนจะถูกเข้ารหัสก่อนจัดเก็บในฐานข้อมูล

## Endpoints

### `list`
แสดงรายการข้อมูลรับรองที่กำหนดค่าไว้ทั้งหมด ข้อมูลที่ละเอียดอ่อนจะถูกตัดออกจากรายการผลลัพธ์

**Input:** ไม่มี

**Output:**
```typescript
{
  id: string;
  provider: ProviderType;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}[]
```

---

### `getByProvider`
ดึงรายละเอียดข้อมูลรับรองสำหรับผู้ให้บริการที่ระบุ โดยข้อมูลที่ละเอียดอ่อนจะถูกปิดบัง (masked) เพื่อแสดงผลบนหน้าจอ

**Input:**
```typescript
{ provider: ProviderType }
```

**Output:**
```typescript
{
  id: string;
  provider: ProviderType;
  name: string;
  isActive: boolean;
  maskedData: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
} | null
```

---

### `save`
บันทึกหรืออัปเดตข้อมูลรับรองสำหรับผู้ให้บริการ ข้อมูลอินพุตจะถูกเข้ารหัสโดยใช้ AES-256-GCM ก่อนจัดเก็บ

**Input:** `SaveCredentialInput` (ฟิลด์เฉพาะตาม provider + `name`)

**Output:**
```typescript
{
  id: string;
  provider: ProviderType;
  name: string;
  isActive: boolean;
}
```

---

### `delete`
ลบข้อมูลรับรองสำหรับผู้ให้บริการที่ระบุ

**Input:**
```typescript
{ provider: ProviderType }
```

**Output:** `{ success: true }`

---

### `setActive`
เปิดหรือปิดใช้งานข้อมูลรับรองสำหรับผู้ให้บริการ

**Input:**
```typescript
{
  provider: ProviderType;
  isActive: boolean;
}
```

**Output:**
```typescript
{
  id: string;
  provider: ProviderType;
  isActive: boolean;
}
```

---

### `test`
ตรวจสอบความถูกต้องของข้อมูลรับรองที่กำหนดค่าไว้ โดยพยายามตรวจสอบผ่าน API เบื้องต้น หรือตรวจสอบฟิลด์ที่จำเป็น

**Input:**
```typescript
{ provider: ProviderType }
```

**Output:**
```typescript
{
  success: true;
  provider: ProviderType;
  message: string;
}
```

---

### `getDecrypted`
ดึงข้อมูลรับรองที่ถอดรหัสแล้วสำหรับผู้ให้บริการ **มีไว้สำหรับการใช้งานภายในฝั่งเซิร์ฟเวอร์เท่านั้น**

**Input:**
```typescript
{ provider: ProviderType }
```

**Output:**
```typescript
{
  provider: ProviderType;
  credentials: BedrockCredentials | OpenRouterCredentials | ...;
}
```
