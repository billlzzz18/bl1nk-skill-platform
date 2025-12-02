const fs = require('fs');
const path = require('path');

const TESTS_DIR = path.join(__dirname, '../__tests__/e2e');
// Priority order: more specific categories first
const CATEGORIES = [
  { name: 'providers', keywords: ['azure_', 'ollama', 'lm_studio', '_provider'] },
  { name: 'integrations', keywords: ['github', 'supabase', 'mcp', 'import'] },
  { name: 'templates', keywords: ['template-', 'astro', 'capacitor', 'nextjs'] },
  { name: 'editing', keywords: ['edit_', 'undo', 'reject', 'approve', 'turbo_edits', 'fix_error', 'rebuild'] },
  { name: 'context', keywords: ['context_', 'mention_', 'attach_', 'smart_context'] },
  { name: 'chat', keywords: ['chat_', 'message', 'concurrent_chat'] },
  { name: 'apps', keywords: ['_app', 'switch_apps', 'favorite_app'] },
  { name: 'setup', keywords: ['setup', 'main', 'engine', 'release_channel', 'telemetry', 'version_integrity'] },
  { name: 'ui', keywords: ['preview', 'toggle_screen', 'select_component', 'problems'] },
];

function categorizeTest(filename) {
  const name = filename.toLowerCase();
  
  // Use priority-based matching (first match wins)
  for (const { name: category, keywords } of CATEGORIES) {
    if (keywords.some(keyword => name.includes(keyword))) {
      return category;
    }
  }
  return 'other';
}

function getCategorizedTests() {
  const categorized = {};
  
  try {
    const files = fs.readdirSync(TESTS_DIR).filter(f => f.endsWith('.spec.ts'));
    
    files.forEach(file => {
      const category = categorizeTest(file);
      if (!categorized[category]) categorized[category] = [];
      categorized[category].push(file);
    });
  } catch (error) {
    console.error(`❌ Error reading tests directory: ${error.message}`);
    process.exit(1);
  }
  
  return categorized;
}

function main() {
  console.log('🔍 Analyzing E2E tests...\n');
  
  const categorized = getCategorizedTests();
  
  console.log('📊 Categorization Results:\n');
  const sorted = Object.entries(categorized).sort((a, b) => b[1].length - a[1].length);
  sorted.forEach(([cat, files]) => {
    console.log(`  ${cat.padEnd(15)} ${files.length.toString().padStart(2)} tests`);
  });
  
  const total = sorted.reduce((sum, [, files]) => sum + files.length, 0);
  console.log(`\n  Total: ${total} tests`);
  
  console.log('\n📁 To organize tests into subdirectories, run:');
  console.log('   node scripts/organize-tests.js --execute');
}

if (process.argv.includes('--execute')) {
  console.log('📁 Creating test category directories...\n');
  
  const categorized = getCategorizedTests();
  let moved = 0;
  let failed = 0;
  
  Object.entries(categorized).forEach(([category, testFiles]) => {
    try {
      const categoryDir = path.join(TESTS_DIR, category);
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }
      
      testFiles.forEach(file => {
        try {
          const oldPath = path.join(TESTS_DIR, file);
          const newPath = path.join(categoryDir, file);
          
          if (fs.existsSync(newPath)) {
            console.warn(`⚠️  Skipping ${file}: already exists in ${category}/`);
            return;
          }
          
          fs.renameSync(oldPath, newPath);
          moved++;
        } catch (error) {
          console.error(`❌ Failed to move ${file}: ${error.message}`);
          failed++;
        }
      });
      
      const title = category.charAt(0).toUpperCase() + category.slice(1);
      const readme = `# ${title} Tests\n\n${testFiles.length} E2E tests in this category.\n\n## Tests\n${testFiles.map(f => `- ${f}`).join('\n')}`;
      fs.writeFileSync(path.join(categoryDir, 'README.md'), readme);
    } catch (error) {
      console.error(`❌ Error creating category ${category}: ${error.message}`);
    }
  });
  
  console.log(`\n✅ Organized ${moved} tests into categories!`);
  if (failed > 0) console.log(`⚠️  ${failed} tests failed to move`);
  console.log('\n⚠️  Update Playwright config if needed.');
} else {
  main();
}
