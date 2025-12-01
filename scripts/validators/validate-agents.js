const fs = require('fs');
const path = require('path');

const AGENTS_DIR = path.join(__dirname, '../../agents');
const REQUIRED_FIELDS = ['author', 'identifier', 'meta', 'systemRole'];
const META_FIELDS = ['title', 'description'];

function validateAgent(agentPath) {
  const errors = [];
  const agentName = path.basename(agentPath, '.json');

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

    // Validate systemRole length
    if (data.systemRole && data.systemRole.length < 10) {
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

function main() {
  const agents = fs.readdirSync(AGENTS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => path.join(AGENTS_DIR, f));

  const results = agents.map(validateAgent);
  const failed = results.filter(r => r.errors.length > 0);

  if (failed.length > 0) {
    console.error(`❌ Found ${failed.length} invalid agents:\n`);
    failed.forEach(({ agentName, errors }) => {
      console.error(`  ${agentName}:`);
      errors.forEach(e => console.error(`    - ${e}`));
    });
    process.exit(1);
  }

  console.log(`✅ All ${results.length} agents validated successfully`);
}

main();
