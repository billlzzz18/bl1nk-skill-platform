# Electron Packaging & Distribution

bl1nk Skill Builder ถูกแพ็กเกจด้วย **Electron Forge** และใช้ **Vite** เป็นตัว bundler ซึ่งรองรับแพลตฟอร์มที่หลากหลาย ได้แก่ Windows, macOS และ Linux

## ข้อกำหนดเบื้องต้น (Prerequisites)

- Node.js >= 20.0.0
- pnpm (เวอร์ชันล่าสุด)
- เครื่องมือ build เฉพาะแพลตฟอร์ม (เช่น Xcode สำหรับ macOS, Visual Studio Build Tools สำหรับ Windows)

## การกำหนดค่า (Configuration)

ไฟล์การกำหนดค่าหลักสำหรับ Electron Forge อยู่ที่ `apps/client/forge.config.ts` โดยไฟล์นี้จะกำหนดวิธีการทำ bundle ของแอปพลิเคชัน, makers ที่ใช้สำหรับแต่ละแพลตฟอร์ม และตำแหน่งที่เก็บไฟล์ build (artifacts)

## คำสั่งสำหรับ Build

จากรากของ repository (root directory) คุณสามารถใช้คำสั่งต่อไปนี้เพื่อทำการแพ็กเกจแอปพลิเคชัน:

### Build ทุกแพ็กเกจ
ขั้นแรก ตรวจสอบให้แน่ใจว่าได้ build แพ็กเกจที่ใช้ร่วมกันและแอปทั้งสองแล้ว:
```bash
pnpm build
```

### แพ็กเกจ Electron app
คำสั่งนี้จะทำ bundle แอปพลิเคชันลงในโฟลเดอร์โดยไม่ต้องสร้างไฟล์ติดตั้ง (installer):
```bash
pnpm --filter bl1nk-skill-ide package
```

### สร้างไฟล์ติดตั้ง (Make installers)
คำสั่งนี้จะสร้างไฟล์ติดตั้งเฉพาะแพลตฟอร์ม (เช่น .dmg, .exe, .deb):
```bash
pnpm --filter bl1nk-skill-ide make
```

ไฟล์ผลลัพธ์จะอยู่ที่ `apps/client/out/`

## การแจกจ่าย (Distribution)

แอปพลิเคชันสามารถแจกจ่ายได้ในรูปแบบ:
- **Windows**: .exe (Squirrel.Windows)
- **macOS**: .dmg, .zip (พร้อมการทำ Apple notarization หากมีการกำหนดค่า)
- **Linux**: .deb, .rpm, .AppImage

## การลงลายมือชื่อรหัส (Code Signing)

การลงลายมือชื่อรหัส (Code Signing) เป็นสิ่งจำเป็นสำหรับการแจกจ่ายในเวอร์ชัน production เพื่อหลีกเลี่ยงการแจ้งเตือนด้านความปลอดภัย
- **macOS**: ต้องการ Apple Developer ID และการทำ notarization
- **Windows**: ต้องการใบรับรองจาก DigiCert หรือเทียบเท่า

สำหรับรายละเอียดเพิ่มเติมเกี่ยวกับการกำหนดค่า Code Signing โปรดอ้างอิงจาก `.github/workflows/electron-release.yml`
