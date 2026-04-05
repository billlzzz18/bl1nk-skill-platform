# Skill Router API

`skill` router จัดการการดำเนินการ CRUD ทั้งหมดและการจัดการเวอร์ชันสำหรับ AI skills

## Endpoints

### `list`
แสดงรายการ skills ทั้งหมด พร้อมตัวเลือกการค้นหา การเรียงลำดับ และการแบ่งหน้า (pagination)

**Input:**
```typescript
{
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'name' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}
```

**Output:**
```typescript
{
  items: Skill[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}
```

---

### `getById`
ดึงข้อมูล skill รายการเดียวตาม ID ที่ระบุ

**Input:**
```typescript
{ id: string } // รูปแบบ CUID
```

**Output:** วัตถุ `Skill`

---

### `create`
สร้าง skill ใหม่พร้อมบันทึกเวอร์ชันเริ่มต้น

**Input:**
```typescript
{
  name: string;
  description?: string;
  content: string;
}
```

**Output:** วัตถุ `Skill`

---

### `update`
อัปเดต skill ที่มีอยู่ หากมีการเปลี่ยนแปลง `content` ระบบจะสร้างบันทึกเวอร์ชันใหม่โดยอัตโนมัติและเพิ่มหมายเลขเวอร์ชันของ skill

**Input:**
```typescript
{
  id: string;
  name?: string;
  description?: string;
  content?: string;
}
```

**Output:** วัตถุ `Skill`

---

### `delete`
ลบ skill และประวัติเวอร์ชันที่เกี่ยวข้องทั้งหมด

**Input:**
```typescript
{ id: string }
```

**Output:** `{ success: true }`

---

### `getVersions`
ดึงข้อมูลประวัติเวอร์ชันสำหรับ skill ที่ระบุ

**Input:**
```typescript
{
  skillId: string;
  limit?: number;
}
```

**Output:** `SkillVersion[]`

---

### `restoreVersion`
คืนค่า skill เป็นเวอร์ชันก่อนหน้า การดำเนินการนี้จะสร้างเวอร์ชัน *ใหม่* ที่มีเนื้อหาของเวอร์ชันที่ถูกคืนค่า

**Input:**
```typescript
{
  skillId: string;
  version: number;
}
```

**Output:** วัตถุ `Skill` (skill ที่อัปเดตด้วยหมายเลขเวอร์ชันใหม่)
