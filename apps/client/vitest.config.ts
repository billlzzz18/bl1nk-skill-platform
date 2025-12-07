/// <reference types="vitest" />
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  // 1. Alias: ต้องมีเพื่อแก้ Error: Cannot find package '@/...'
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // 2. Test Environment: การตั้งค่าพื้นฐานให้ Vitest ทำงานได้
  test: {
    globals: true,
    // ใช้ 'node' เพราะ Error มาจากโค้ดที่แชร์กัน/Main process
    environment: 'node', 
  },

  // 3. Rollup Options: ถ้าคุณต้องการใช้ better-sqlite3 ใน test ด้วย
  build: {
    rollupOptions: {
      // ป้องกันการรวม better-sqlite3 เข้าไปใน bundle
      external: ["better-sqlite3"], 
    },
  },
});