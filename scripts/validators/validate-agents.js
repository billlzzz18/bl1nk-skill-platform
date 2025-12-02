const fs = require('fs');
const path = require('path');

const AGENTS_DIR = path.join(__dirname, '../../agents');
const REQUIRED_FIELDS = ['author', 'identifier', 'meta', 'systemRole'];
const META_FIELDS = ['title', 'description'];

function validateAgent(agentPath, relativePath) {
  const errors = [];
  const agentName = relativePath || path.basename(agentPath, '.json');

  try {
    const content = fs.readFileSync(agentPath, 'utf-8');
    const data = JSON.parse(content);

    // Check required fields
    REQUIRED_FIELDS.forEach(field => {
      if (!data[field]) errors.push(`Missing field: ${field}`);
    });

    // Check meta fields
    if (data.meta) {
      META_FIELDS.forEach(field => {
        if (!data.meta[field]) errors.push(`Missing meta.${field}`);
      });
    }

    // Validate systemRole length with type check
    if (data.systemRole && typeof data.systemRole === 'string' && data.systemRole.length < 10) {
      errors.push('systemRole must be at least 10 characters');
    }

  } catch (error) {
    if (error instanceof SyntaxError) {
      errors.push('Invalid JSON syntax');
    } else {
      errors.push(error.message);
    }
  }

  return { agentName, errors };
}

function findAgents(dir, basePath = '', visited = new Set()) {
  const agents = [];
  
  try {
    const realPath = fs.realpathSync(dir);
    if (visited.has(realPath)) return agents;
    visited.add(realPath);
    
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      if (item.isSymbolicLink()) continue;
      
      const fullPath = path.join(dir, item.name);
      const relativePath = path.join(basePath, item.name);
      
      if (item.isDirectory()) {
        agents.push(...findAgents(fullPath, relativePath, visited));
      } else if (item.name.endsWith('.json')) {
        agents.push({ path: fullPath, name: relativePath });
      }
    }
  } catch (error) {
    console.error(`⚠️  Error reading directory ${dir}: ${error.message}`);
  }
  
  return agents;
}

function main() {
  const agents = findAgents(AGENTS_DIR);
  
  if (agents.length === 0) {
    console.error('❌ No agents found in agents directory');
    process.exit(1);
  }
  
  let processed = 0;
  const results = agents.map(a => {
    processed++;
    if (processed % 100 === 0) {
      console.log(`🔍 Validated ${processed}/${agents.length} agents...`);
    }
    return validateAgent(a.path, a.name);
  });
  
  const failed = results.filter(r => r.errors.length > 0);

  if (failed.length > 0) {
    console.error(`\n❌ Found ${failed.length} invalid agents:\n`);
    failed.forEach(({ agentName, errors }) => {
      console.error(`  ${agentName}:`);
      errors.forEach(e => console.error(`    - ${e}`));
    });
    process.exit(1);
  }

  console.log(`\n✅ All ${results.length} agents validated successfully`);
}

main();
