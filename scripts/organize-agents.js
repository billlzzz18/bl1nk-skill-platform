const fs = require('fs');
const path = require('path');

const AGENTS_DIR = path.join(__dirname, '../agents');
const CATEGORIES = {
  development: ['coding', 'programming', 'development', 'developer', 'engineer', 'code', 'software', 'web', 'frontend', 'backend', 'fullstack', 'devops', 'database', 'api', 'git', 'docker', 'kubernetes', 'testing', 'debug'],
  writing: ['writing', 'writer', 'content', 'copywriting', 'copywriter', 'translation', 'translator', 'editor', 'proofreading', 'grammar', 'essay', 'article', 'blog'],
  business: ['business', 'marketing', 'sales', 'entrepreneur', 'consultant', 'strategy', 'finance', 'accounting', 'management', 'product', 'startup', 'branding', 'seo', 'advertising'],
  education: ['education', 'teaching', 'tutor', 'learning', 'language', 'english', 'chinese', 'japanese', 'spanish', 'french', 'german', 'conversation', 'vocabulary', 'grammar'],
  creative: ['creative', 'art', 'design', 'music', 'poetry', 'lyrics', 'drawing', 'illustration', 'photography', 'video', 'animation', 'game'],
  data: ['data', 'analysis', 'analyst', 'research', 'scientist', 'machine-learning', 'ai', 'statistics', 'visualization'],
  other: []
};

function categorizeAgent(agent, filename) {
  const searchText = `${filename} ${agent.meta?.title ?? ''} ${agent.meta?.description ?? ''} ${agent.meta?.category ?? ''} ${(agent.meta?.tags || []).join(' ')}`.toLowerCase();
  
  for (const [category, keywords] of Object.entries(CATEGORIES)) {
    if (category === 'other') continue;
    if (keywords.some(keyword => searchText.includes(keyword))) {
      return category;
    }
  }
  return 'other';
}

function readAndCategorizeAgents() {
  const categorized = {};
  
  try {
    const files = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.json'));
    
    files.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(AGENTS_DIR, file), 'utf-8');
        const agent = JSON.parse(content);
        const category = categorizeAgent(agent, file);
        
        if (!categorized[category]) categorized[category] = [];
        categorized[category].push({ file, agent });
      } catch (error) {
        console.error(`⚠️  Error processing ${file}: ${error.message}`);
      }
    });
  } catch (error) {
    console.error(`❌ Error reading agents directory: ${error.message}`);
    process.exit(1);
  }
  
  return categorized;
}

function main() {
  console.log('🔍 Analyzing 501 agents...\n');
  
  const categorized = readAndCategorizeAgents();
  const summary = Object.entries(categorized).map(([cat, items]) => ({ cat, count: items.length }));
  
  console.log('📊 Categorization Results:\n');
  summary.sort((a, b) => b.count - a.count).forEach(({ cat, count }) => {
    console.log(`  ${cat.padEnd(15)} ${count.toString().padStart(3)} agents`);
  });
  
  console.log('\n❓ Create category directories? (y/n)');
  console.log('   This will organize agents into subdirectories.');
  console.log('   Run: node scripts/organize-agents.js --execute');
}

if (process.argv.includes('--execute')) {
  console.log('📁 Creating category directories...\n');
  
  const categorized = readAndCategorizeAgents();
  let moved = 0;
  let failed = 0;
  
  Object.entries(categorized).forEach(([category, items]) => {
    try {
      const categoryDir = path.join(AGENTS_DIR, category);
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }
      
      items.forEach(({ file, agent }) => {
        try {
          const oldPath = path.join(AGENTS_DIR, file);
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
      
      const readme = `# ${category.charAt(0).toUpperCase() + category.slice(1)} Agents\n\n${items.length} agents in this category.\n\n## Agents\n${items.map(({ file, agent }) => `- **${agent.meta?.title || file}** - ${agent.meta?.description || 'No description'}`).join('\n')}`;
      fs.writeFileSync(path.join(categoryDir, 'README.md'), readme);
    } catch (error) {
      console.error(`❌ Error creating category ${category}: ${error.message}`);
    }
  });
  
  console.log(`\n✅ Organized ${moved} agents into categories!`);
  if (failed > 0) console.log(`⚠️  ${failed} agents failed to move`);
  console.log('\n⚠️  Update validation script to check subdirectories.');
} else {
  main();
}
