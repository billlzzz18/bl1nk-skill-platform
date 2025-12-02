const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function countFiles(dir, extension, visited = new Set()) {
  let count = 0;
  
  try {
    const realPath = fs.realpathSync(dir);
    if (visited.has(realPath)) return 0;
    visited.add(realPath);
    
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.isSymbolicLink()) continue;
      
      const itemPath = path.normalize(path.join(dir, item.name));
      if (!itemPath.startsWith(path.normalize(dir))) continue;
      
      if (item.isDirectory()) {
        count += countFiles(itemPath, extension, visited);
      } else if (item.name.endsWith(extension)) {
        count++;
      }
    }
  } catch (error) {
    // Directory doesn't exist or no permission
  }
  
  return count;
}

function checkHealth() {
  const checks = [];

  // Check Docker services
  try {
    execSync('docker-compose ps', { stdio: 'pipe' });
    checks.push({ name: 'Docker Services', status: '✅' });
  } catch {
    checks.push({ name: 'Docker Services', status: '❌' });
  }

  // Check node_modules
  const hasNodeModules = fs.existsSync('node_modules');
  checks.push({ name: 'Dependencies Installed', status: hasNodeModules ? '✅' : '❌' });

  // Check builds
  const clientBuilt = fs.existsSync('apps/client/.next');
  const serverBuilt = fs.existsSync('apps/server/dist');
  checks.push({ name: 'Client Built', status: clientBuilt ? '✅' : '⚠️' });
  checks.push({ name: 'Server Built', status: serverBuilt ? '✅' : '⚠️' });

  // Check skills count
  try {
    const skillsCount = fs.readdirSync('skill', { withFileTypes: true })
      .filter(d => d.isDirectory() && !d.name.startsWith('.')).length;
    checks.push({ name: `Skills (${skillsCount})`, status: '✅' });
  } catch {
    checks.push({ name: 'Skills (0)', status: '❌' });
  }

  // Check agents count (recursive with symlink protection)
  const agentsCount = countFiles('agents', '.json');
  checks.push({ name: `Agents (${agentsCount})`, status: agentsCount > 0 ? '✅' : '❌' });

  // Check tests count (recursive with symlink protection)
  const testsCount = countFiles('__tests__/e2e', '.spec.ts');
  checks.push({ name: `E2E Tests (${testsCount})`, status: testsCount > 0 ? '✅' : '❌' });

  console.log('\n🏥 Claude Skill Builder Health Check\n');
  checks.forEach(({ name, status }) => console.log(`${status} ${name}`));
  console.log('');
}

checkHealth();
