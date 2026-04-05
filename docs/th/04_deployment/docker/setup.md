# Docker Deployment Guide

bl1nk Skill Builder สามารถใช้งาน (deployed) ผ่าน Docker ได้สำหรับสภาพแวดล้อมที่สม่ำเสมอและขั้นตอนการแจกจ่ายที่ง่ายขึ้น

## ข้อกำหนดเบื้องต้น (Prerequisites)

- ติดตั้ง Docker และ Docker Compose แล้ว
- ตัวแปรสภาพแวดล้อม (Environment variables) ที่กำหนดค่าไว้ในไฟล์ `.env`

## Docker Images

Repository นี้ประกอบด้วย `Dockerfile` ใน root directory ซึ่งทำการแพ็กเกจ monorepo ทั้งหมดเข้าด้วยกัน ซึ่งช่วยให้สามารถทำ multi-stage builds และเพิ่มประสิทธิภาพได้

### Build images ในเครื่อง (local)
ในการ build image ด้วยตนเอง:
```bash
docker build -t bl1nk-skill-builder .
```

### รันผ่าน Docker Compose
ไฟล์ `docker-compose.yml` มีอยู่ใน root directory เพื่อการใช้งานที่ง่าย:
```bash
docker-compose up -d
```

## บริการ (Services)

การกำหนดค่า Docker Compose มักจะประกอบด้วย:
- **Server**: backend ของ Express/tRPC
- **Client (ไม่บังคับ)**: frontend ของ Next.js (สามารถให้บริการผ่าน server หรือแยกกันก็ได้)
- **Database (ระยะที่ 2)**: PostgreSQL และ Redis สำหรับการซิงโครไนซ์บนคลาวด์

## การกำหนดค่า (Configuration)

ตัวแปรสภาพแวดล้อมสามารถส่งไปยังคอนเทนเนอร์โดยใช้ไฟล์ `.env` หรือกำหนดใน `docker-compose.yml` โดยตรง ตัวแปรสำคัญ ได้แก่:
- `DATABASE_URL`: Prisma database connection string
- `ENCRYPTION_KEY`: AES-256 key สำหรับการจัดเก็บ credentials
- `PORT`: พอร์ตของเซิร์ฟเวอร์ (เริ่มต้น 3001)

## การรวมเข้ากับ CI/CD (CI/CD Integration)

Images จะถูก build และ push ไปยัง GitHub Container Registry (GHCR) โดยอัตโนมัติ โดยใช้เวิร์กโฟลว์ `docker-build.yml` เมื่อมีการสร้าง tags หรือรันด้วยตนเอง
- **Registry**: `ghcr.io/bl1nk-org/bl1nk-skill-platform`
- **Tags**: `latest`, `<version>`, `<sha>`
