const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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
  const skillsCount = fs.readdirSync('skill', { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.')).length;
  checks.push({ name: `Skills (${skillsCount})`, status: '✅' });

  // Check agents count
  const agentsCount = fs.readdirSync('agents')
    .filter(f => f.endsWith('.json')).length;
  checks.push({ name: `Agents (${agentsCount})`, status: '✅' });

  console.log('\n🏥 Claude Skill Builder Health Check\n');
  checks.forEach(({ name, status }) => console.log(`${status} ${name}`));
  console.log('');
}

checkHealth();
