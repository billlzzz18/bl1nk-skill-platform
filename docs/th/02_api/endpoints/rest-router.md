# REST API v1 Reference

REST API มีเอนด์พอยต์ HTTP มาตรฐานสำหรับการจัดการ skill และการซิงโครไนซ์บนคลาวด์ โดยปกติจะอยู่ที่ `/api/v1` (หรือตามที่กำหนดในเซิร์ฟเวอร์)

## การยืนยันตัวตน (Authentication)

เอนด์พอยต์บางตัวต้องการ Bearer token ใน `Authorization` header เมื่อเปิดใช้งาน `USE_BL1NK_CLOUD`

```http
Authorization: Bearer <your_token>
```

---

## Skills Endpoints

### `GET /skills`
แสดงรายการ skills พร้อมรองรับการค้นหา การแบ่งหน้า และการเรียงลำดับ

**พารามิเตอร์ Query:**
- `search` (string): ค้นหาในชื่อหรือคำอธิบาย
- `limit` (number, default 50): จำนวนรายการต่อหน้า
- `offset` (number, default 0): จำนวนรายการที่ต้องการข้าม
- `sortBy` (string, default 'createdAt'): ฟิลด์ที่ใช้เรียงลำดับ
- `sortOrder` ('asc' | 'desc', default 'desc'): ทิศทางการเรียงลำดับ
- `workspaceId` (string): Cloud workspace ID (ไม่บังคับ)

**Response:**
```json
{
  "items": [],
  "total": 0,
  "limit": 50,
  "offset": 0,
  "hasMore": false
}
```

---

### `GET /skills/:id`
ดึงข้อมูล skill รายการเดียวตาม ID

**Response:** วัตถุ `Skill`

---

### `POST /skills`
สร้าง skill ใหม่

**Body:**
```json
{
  "name": "ชื่อ Skill",
  "description": "คำอธิบาย (ถ้ามี)",
  "content": "เนื้อหา/คำแนะนำของ Skill"
}
```

**Response:** วัตถุ `Skill` (Status 201)

---

### `PUT /skills/:id`
อัปเดต skill ที่มีอยู่

**Body:**
```json
{
  "name": "ชื่อที่อัปเดต",
  "description": "คำอธิบายที่อัปเดต",
  "content": "เนื้อหาที่อัปเดต",
  "isPublic": false
}
```

**Response:** วัตถุ `Skill`

---

### `DELETE /skills/:id`
ลบ skill

**Response:** `{ "success": true }`

---

### `GET /skills/:id/versions`
ดึงประวัติเวอร์ชันสำหรับ skill

**พารามิเตอร์ Query:**
- `limit` (number, default 10): จำนวนเวอร์ชันที่ต้องการดึงข้อมูล

**Response:** `SkillVersion[]`

---

### `POST /skills/:id/restore`
คืนค่า skill เป็นเวอร์ชันก่อนหน้า (โหมด local เท่านั้น)

**Body:**
```json
{
  "version": 2
}
```

**Response:** วัตถุ `Skill` (เวอร์ชันใหม่ที่ถูกสร้างขึ้น)

---

## Cloud Auth Endpoints

### `POST /auth/register`
ลงทะเบียนผู้ใช้ใหม่บน bl1nk cloud

### `POST /auth/login`
เข้าสู่ระบบ bl1nk cloud และรับ token

### `GET /auth/me`
ดึงข้อมูลเกี่ยวกับผู้ใช้ปัจจุบันที่ได้รับการยืนยันตัวตนแล้ว
