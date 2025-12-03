#!/usr/bin/env node

/**
 * Documentation Validation Script
 * 
 * Validates bilingual documentation structure and parity
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs');
const CONFIG_FILE = path.join(DOCS_DIR, 'i18n-config.json');

function loadConfig() {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    return config;
  } catch (error) {
    console.error('❌ Failed to load i18n-config.json:', error.message);
    process.exit(1);
  }
}

function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

function validateBilingualParity(config) {
  console.log('\n📋 Checking bilingual parity...\n');
  
  let errors = 0;
  const languages = config.languages.map(l => l.code);
  
  for (const section of config.structure) {
    console.log(`  Checking ${section.id}...`);
    
    // Check files
    if (section.files) {
      for (const file of section.files) {
        const paths = languages.map(lang => 
          path.join(DOCS_DIR, lang, section.id, file)
        );
        
        const exists = paths.map(p => checkFileExists(p));
        
        if (!exists.every(e => e)) {
          console.error(`    ❌ Missing: ${file}`);
          exists.forEach((e, i) => {
            if (!e) console.error(`       - ${languages[i]}: ${paths[i]}`);
          });
          errors++;
        }
      }
    }
    
    // Check subdirectories
    if (section.subdirs) {
      for (const subdir of section.subdirs) {
        const paths = languages.map(lang =>
          path.join(DOCS_DIR, lang, section.id, subdir)
        );
        
        const exists = paths.map(p => checkFileExists(p));
        
        if (!exists.every(e => e)) {
          console.error(`    ❌ Missing directory: ${subdir}`);
          exists.forEach((e, i) => {
            if (!e) console.error(`       - ${languages[i]}: ${paths[i]}`);
          });
          errors++;
        }
      }
    }
  }
  
  return errors;
}

function validateStructure(config) {
  console.log('\n📁 Checking directory structure...\n');
  
  let errors = 0;
  
  for (const lang of config.languages) {
    const langDir = path.join(DOCS_DIR, lang.path);
    
    if (!checkFileExists(langDir)) {
      console.error(`  ❌ Missing language directory: ${lang.name} (${langDir})`);
      errors++;
      continue;
    }
    
    console.log(`  ✅ ${lang.name} directory exists`);
    
    // Check README
    const readme = path.join(langDir, 'README.md');
    if (!checkFileExists(readme)) {
      console.error(`    ❌ Missing README.md`);
      errors++;
    }
  }
  
  return errors;
}

function validateLinks(config) {
  console.log('\n🔗 Checking internal links...\n');
  
  let errors = 0;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  
  for (const lang of config.languages) {
    for (const section of config.structure) {
      if (!section.files) continue;
      
      for (const file of section.files) {
        const filePath = path.join(DOCS_DIR, lang.path, section.id, file);
        if (!checkFileExists(filePath)) continue;
        
        const content = fs.readFileSync(filePath, 'utf-8');
        let match;
        
        while ((match = linkRegex.exec(content)) !== null) {
          const link = match[2];
          
          // Skip external links
          if (link.startsWith('http://') || link.startsWith('https://')) continue;
          if (link.startsWith('#')) continue; // Skip anchors
          
          // Check relative links
          const linkPath = path.resolve(path.dirname(filePath), link);
          if (!checkFileExists(linkPath)) {
            console.error(`    ❌ Broken link in ${lang.code}/${section.id}/${file}: ${link}`);
            errors++;
          }
        }
      }
    }
  }
  
  return errors;
}

function validateDiagrams(config) {
  console.log('\n📊 Checking Mermaid diagrams...\n');
  
  let errors = 0;
  const mermaidRegex = /```mermaid([\s\S]*?)```/g;
  
  for (const lang of config.languages) {
    for (const section of config.structure) {
      if (!section.files) continue;
      
      for (const file of section.files) {
        const filePath = path.join(DOCS_DIR, lang.path, section.id, file);
        if (!checkFileExists(filePath)) continue;
        
        const content = fs.readFileSync(filePath, 'utf-8');
        let match;
        
        while ((match = mermaidRegex.exec(content)) !== null) {
          const diagram = match[1].trim();
          
          // Basic validation
          if (diagram.length === 0) {
            console.error(`    ❌ Empty Mermaid diagram in ${lang.code}/${section.id}/${file}`);
            errors++;
          }
          
          // Check for common diagram types
          const validTypes = ['graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'erDiagram', 'gantt', 'pie'];
          const hasValidType = validTypes.some(type => diagram.startsWith(type));
          
          if (!hasValidType) {
            console.error(`    ⚠️  Unknown diagram type in ${lang.code}/${section.id}/${file}`);
          }
        }
      }
    }
  }
  
  return errors;
}

function main() {
  console.log('🔍 Documentation Validation\n');
  console.log('=' .repeat(50));
  
  const config = loadConfig();
  
  let totalErrors = 0;
  
  // Validate structure
  totalErrors += validateStructure(config);
  
  // Validate bilingual parity
  if (config.validation.checkBilingualParity) {
    totalErrors += validateBilingualParity(config);
  }
  
  // Validate links
  if (config.validation.checkLinks) {
    totalErrors += validateLinks(config);
  }
  
  // Validate diagrams
  if (config.validation.checkDiagrams) {
    totalErrors += validateDiagrams(config);
  }
  
  console.log('\n' + '='.repeat(50));
  
  if (totalErrors === 0) {
    console.log('\n✅ All documentation validation checks passed!\n');
    process.exit(0);
  } else {
    console.log(`\n❌ Found ${totalErrors} validation error(s)\n`);
    process.exit(1);
  }
}

main();
