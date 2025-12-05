# Stage 1: Builder
FROM node:20-alpine AS builder

# ติดตั้ง pnpm
RUN npm install -g pnpm

# Dockerfile (Stage 1: Builder)

# ... (บรรทัดก่อนหน้า)
WORKDIR /app

# 1. คัดลอกไฟล์ dependencies และไฟล์/โฟลเดอร์ที่จำเป็นต่อการติดตั้ง
COPY package.json pnpm-lock.yaml ./
COPY apps/server/package.json apps/server/
COPY packages/shared/package.json packages/shared/

# 🚨 เพิ่มบรรทัดนี้: COPY โฟลเดอร์ SDK ที่ขาดหายไป
COPY specs/main/generated/sdk specs/main/generated/sdk/ 

# 2. ติดตั้ง Dependencies ครั้งแรก (จาก lockfile)
RUN pnpm install --frozen-lockfile

# ... (บรรทัดต่อไป)
# 2. ติดตั้ง Dependencies ครั้งแรก (จาก lockfile)
RUN pnpm install --frozen-lockfile

# 3. คัดลอกไฟล์ที่จำเป็นทั้งหมด
COPY . .

# 🚨 เพิ่มบรรทัดนี้: บังคับ pnpm install/link อีกครั้ง (สำคัญมากสำหรับ Monorepo/pnpm ใน Docker)
RUN pnpm install --frozen-lockfile 

# 4. Generate Prisma Client
RUN pnpm --filter apps/server prisma generate

# 5. Build โค้ด
RUN pnpm run build

# Stage 2: Runtime Environment
FROM node:20-alpine

# ติดตั้ง pnpm อีกครั้งใน Runtime (หากต้องการใช้ pnpm ในการรัน)
# ถ้าไม่ต้องการใช้ pnpm เพื่อรัน (แค่ node) ก็ลบบรรทัดนี้ได้ แต่ต้องมั่นใจว่าทุกอย่างถูก build เป็น dist/
RUN npm install -g pnpm

WORKDIR /app

# 1. คัดลอกเฉพาะไฟล์ที่จำเป็นในการรัน
# คัดลอกไฟล์ package.json เพื่อให้ pnpm สามารถจัดการ dependencies ได้
COPY package.json ./ 
# คัดลอก node_modules (ซึ่งรวม dependencies ทั้งหมด)
COPY --from=builder /app/node_modules ./node_modules
# คัดลอกโค้ดที่ถูก Build แล้ว (dist)
COPY --from=builder /app/dist ./dist

# 2. ตั้งค่า Environment Variables ที่จำเป็น (ถ้ามี)

# 3. คำสั่งสำหรับรันแอปพลิเคชัน
# เราจะใช้ pnpm run start หากมี script 'start' ใน root package.json
CMD ["pnpm", "start"] 

# ถ้าใช้ node ตรงๆ ให้เปลี่ยนเป็น:
# CMD ["node", "dist/apps/server/index.js"]