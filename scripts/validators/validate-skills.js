const fs = require('fs');
const path = require('path');

const SKILL_DIR = path.join(__dirname, '../../skill');
const REQUIRED_FILES = ['SKILL.md', 'LICENSE.txt'];

function validateSkill(skillPath) {
  const errors = [];
  const skillName = path.basename(skillPath);

  // Check required files
  REQUIRED_FILES.forEach(file => {
    if (!fs.existsSync(path.join(skillPath, file))) {
      errors.push(`Missing ${file}`);
    }
  });

  // Validate SKILL.md structure
  const skillMd = path.join(skillPath, 'SKILL.md');
  if (fs.existsSync(skillMd)) {
    const content = fs.readFileSync(skillMd, 'utf-8');
    if (!content.includes('# ')) errors.push('Missing title in SKILL.md');
    if (!content.includes('## Description')) errors.push('Missing Description section');
  }

  return { skillName, errors };
}

function main() {
  const skills = fs.readdirSync(SKILL_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.'))
    .map(d => path.join(SKILL_DIR, d.name));

  const results = skills.map(validateSkill);
  const failed = results.filter(r => r.errors.length > 0);

  if (failed.length > 0) {
    console.error(`❌ Found ${failed.length} invalid skills:\n`);
    failed.forEach(({ skillName, errors }) => {
      console.error(`  ${skillName}:`);
      errors.forEach(e => console.error(`    - ${e}`));
    });
    process.exit(1);
  }

  console.log(`✅ All ${results.length} skills validated successfully`);
}

main();
