#!/usr/bin/env node
/**
 * Rebrand Script - Dyad to bl1nk
 *
 * This script replaces all Dyad branding with bl1nk branding.
 * Run with: node scripts/rebrand.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'apps', 'client', 'src');
const TESTS_DIR = path.join(ROOT_DIR, '__tests__');

// Directories to skip
const SKIP_DIRS = [
  'node_modules',
  '.git',
  'dist',
  '.vite',
  'out',
];

// Files to skip (external dependencies, etc.)
const SKIP_PATTERNS = [
  /@dyad-sh\//, // External npm package - keep as is
];

// Replacement rules (order matters - more specific first)
const REPLACEMENTS = [
  // XML tags - must handle closing tags before opening to avoid partial matches
  // Order: close more specific tags first, then open tags
  { from: /<\/dyad-code-search-result>/g, to: '</bl1nk-code-search-result>' },
  { from: /<dyad-code-search-result/g, to: '<bl1nk-code-search-result' },
  { from: /<\/dyad-web-search-result>/g, to: '</bl1nk-web-search-result>' },
  { from: /<dyad-web-search-result/g, to: '<bl1nk-web-search-result' },
  { from: /<\/dyad-write>/g, to: '</bl1nk-write>' },
  { from: /<dyad-write/g, to: '<bl1nk-write' },
  { from: /<\/dyad-read>/g, to: '</bl1nk-read>' },
  { from: /<dyad-read/g, to: '<bl1nk-read' },
  { from: /<\/dyad-rename>/g, to: '</bl1nk-rename>' },
  { from: /<dyad-rename/g, to: '<bl1nk-rename' },
  { from: /<\/dyad-delete>/g, to: '</bl1nk-delete>' },
  { from: /<dyad-delete/g, to: '<bl1nk-delete' },
  { from: /<\/dyad-file>/g, to: '</bl1nk-file>' },
  { from: /<dyad-file/g, to: '<bl1nk-file' },
  { from: /<\/dyad-add-dependency>/g, to: '</bl1nk-add-dependency>' },
  { from: /<dyad-add-dependency/g, to: '<bl1nk-add-dependency' },
  { from: /<\/dyad-search-replace>/g, to: '</bl1nk-search-replace>' },
  { from: /<dyad-search-replace/g, to: '<bl1nk-search-replace' },
  { from: /<\/dyad-think>/g, to: '</bl1nk-think>' },
  { from: /<dyad-think/g, to: '<bl1nk-think' },
  { from: /<\/dyad-output>/g, to: '</bl1nk-output>' },
  { from: /<dyad-output/g, to: '<bl1nk-output' },
  { from: /<\/dyad-edit>/g, to: '</bl1nk-edit>' },
  { from: /<dyad-edit/g, to: '<bl1nk-edit' },
  { from: /<\/dyad-code-search>/g, to: '</bl1nk-code-search>' },
  { from: /<dyad-code-search/g, to: '<bl1nk-code-search' },
  { from: /<\/dyad-web-search>/g, to: '</bl1nk-web-search>' },
  { from: /<dyad-web-search/g, to: '<bl1nk-web-search' },
  { from: /<\/dyad-web-crawl>/g, to: '</bl1nk-web-crawl>' },
  { from: /<dyad-web-crawl/g, to: '<bl1nk-web-crawl' },
  { from: /<\/dyad-execute-sql>/g, to: '</bl1nk-execute-sql>' },
  { from: /<dyad-execute-sql/g, to: '<bl1nk-execute-sql' },
  { from: /<\/dyad-add-integration>/g, to: '</bl1nk-add-integration>' },
  { from: /<dyad-add-integration/g, to: '<bl1nk-add-integration' },
  { from: /<\/dyad-mcp-tool-call>/g, to: '</bl1nk-mcp-tool-call>' },
  { from: /<dyad-mcp-tool-call/g, to: '<bl1nk-mcp-tool-call' },
  { from: /<\/dyad-mcp-tool-result>/g, to: '</bl1nk-mcp-tool-result>' },
  { from: /<dyad-mcp-tool-result/g, to: '<bl1nk-mcp-tool-result' },
  { from: /<\/dyad-problem-summary>/g, to: '</bl1nk-problem-summary>' },
  { from: /<dyad-problem-summary/g, to: '<bl1nk-problem-summary' },
  { from: /<\/dyad-codebase-context>/g, to: '</bl1nk-codebase-context>' },
  { from: /<dyad-codebase-context/g, to: '<bl1nk-codebase-context' },
  { from: /<\/dyad-token-savings>/g, to: '</bl1nk-token-savings>' },
  { from: /<dyad-token-savings/g, to: '<bl1nk-token-savings' },

  // Test describe block titles and it() descriptions
  { from: /"dyad-read tags"/g, to: '"bl1nk-read tags"' },
  { from: /"dyad-code-search-result tags"/g, to: '"bl1nk-code-search-result tags"' },
  { from: /dyad-read tag/g, to: 'bl1nk-read tag' },
  { from: /dyad-code-search-result/g, to: 'bl1nk-code-search-result' },
  { from: /dyad-add-dependency tag/g, to: 'bl1nk-add-dependency tag' },
  { from: /dyad-add-dependency/g, to: 'bl1nk-add-dependency' },
  { from: /dyad-write tag/g, to: 'bl1nk-write tag' },
  { from: /dyad-rename tag/g, to: 'bl1nk-rename tag' },
  { from: /dyad-delete tag/g, to: 'bl1nk-delete tag' },

  // Object keys in test mocks (dyad-engine)
  { from: /"dyad-engine"/g, to: '"bl1nk-engine"' },

  // Mock function comments and paths
  { from: /getDyadAppPath/g, to: 'getBl1nkAppPath' },
  { from: /dyad-engine not set/g, to: 'bl1nk-engine not set' },

  // More test descriptions
  { from: /dyad-delete paths/g, to: 'bl1nk-delete paths' },
  { from: /dyad tags/g, to: 'bl1nk tags' },
  { from: /dyad-read and/g, to: 'bl1nk-read and' },
  { from: /dyad-write attributes/g, to: 'bl1nk-write attributes' },
  { from: /dyad tag types/g, to: 'bl1nk tag types' },
  { from: /<dyad-custom-action/g, to: '<bl1nk-custom-action' },
  { from: /<\/dyad-custom-action>/g, to: '</bl1nk-custom-action>' },

  // Variable names in settings components
  { from: /isDyad\b/g, to: 'isBl1nk' },
  { from: /handleToggleDyadPro/g, to: 'handleToggleBl1nkPro' },

  // Function/Component names for Pro buttons
  { from: /ManageDyadProButton/g, to: 'ManageBl1nkProButton' },
  { from: /SetupDyadProButton/g, to: 'SetupBl1nkProButton' },
  { from: /DyadProButton/g, to: 'Bl1nkProButton' },

  // Settings properties (update UI code to use new names, backward compat stays in schema)
  { from: /settings\?\.enableDyadPro/g, to: 'settings?.enableBl1nkPro' },
  { from: /settingsUpdate\.enableDyadPro/g, to: 'settingsUpdate.enableBl1nkPro' },
  { from: /enableDyadPro: enabled/g, to: 'enableBl1nkPro: enabled' },
  { from: /enableDyadPro: true/g, to: 'enableBl1nkPro: true' },
  { from: /enableDyadPro: false/g, to: 'enableBl1nkPro: false' },

  // URLs - update documentation and marketing links to bl1nk
  { from: /academy\.dyad\.sh/g, to: 'docs.bl1nk.org' },
  { from: /https:\/\/www\.dyad\.sh\/docs/g, to: 'https://docs.bl1nk.org' },
  { from: /https:\/\/dyad\.sh\/docs/g, to: 'https://docs.bl1nk.org' },
  // Marketing/promo URLs should point to bl1nk
  { from: /https:\/\/www\.dyad\.sh\/pro/g, to: 'https://bl1nk.org/pro' },
  { from: /https:\/\/dyad\.sh\/pro/g, to: 'https://bl1nk.org/pro' },
  { from: /dyad-app&utm_medium=app&utm_campaign=in-app-banner/g, to: 'bl1nk-app&utm_medium=app&utm_campaign=in-app-banner' },
  // Text references to dyad.sh domain in user-facing messages
  { from: /Visit dyad\.sh\/pro/g, to: 'Visit bl1nk.org/pro' },
  { from: /dyad\.sh\/pro/g, to: 'bl1nk.org/pro' },

  // Imports and function calls using old function names from schemas
  { from: /hasDyadProKey/g, to: 'hasBl1nkProKey' },
  { from: /isDyadProEnabled/g, to: 'isBl1nkProEnabled' },

  // Settings property assignments with negation
  { from: /enableDyadPro: !/g, to: 'enableBl1nkPro: !' },

  // Function/variable names with Dyad prefix
  { from: /getDyadWriteTags/g, to: 'getBl1nkWriteTags' },
  { from: /getDyadRenameTags/g, to: 'getBl1nkRenameTags' },
  { from: /getDyadDeleteTags/g, to: 'getBl1nkDeleteTags' },
  { from: /getDyadAddDependencyTags/g, to: 'getBl1nkAddDependencyTags' },
  { from: /getDyadSearchReplaceTags/g, to: 'getBl1nkSearchReplaceTags' },
  { from: /removeDyadTags/g, to: 'removeBl1nkTags' },
  { from: /hasUnclosedDyadWrite/g, to: 'hasUnclosedBl1nkWrite' },
  { from: /dyad_tag_parser/g, to: 'bl1nk_tag_parser' },

  // Component names
  { from: /DyadMarkdownParser/g, to: 'Bl1nkMarkdownParser' },
  { from: /DyadWrite/g, to: 'Bl1nkWrite' },
  { from: /DyadRead/g, to: 'Bl1nkRead' },
  { from: /DyadRename/g, to: 'Bl1nkRename' },
  { from: /DyadDelete/g, to: 'Bl1nkDelete' },
  { from: /DyadEdit/g, to: 'Bl1nkEdit' },
  { from: /DyadOutput/g, to: 'Bl1nkOutput' },
  { from: /DyadThink/g, to: 'Bl1nkThink' },
  { from: /DyadCodeSearch/g, to: 'Bl1nkCodeSearch' },
  { from: /DyadCodeSearchResult/g, to: 'Bl1nkCodeSearchResult' },
  { from: /DyadWebSearch/g, to: 'Bl1nkWebSearch' },
  { from: /DyadWebSearchResult/g, to: 'Bl1nkWebSearchResult' },
  { from: /DyadWebCrawl/g, to: 'Bl1nkWebCrawl' },
  { from: /DyadExecuteSql/g, to: 'Bl1nkExecuteSql' },
  { from: /DyadAddDependency/g, to: 'Bl1nkAddDependency' },
  { from: /DyadAddIntegration/g, to: 'Bl1nkAddIntegration' },
  { from: /DyadSearchReplace/g, to: 'Bl1nkSearchReplace' },
  { from: /DyadMcpToolCall/g, to: 'Bl1nkMcpToolCall' },
  { from: /DyadMcpToolResult/g, to: 'Bl1nkMcpToolResult' },
  { from: /DyadProblemSummary/g, to: 'Bl1nkProblemSummary' },
  { from: /DyadCodebaseContext/g, to: 'Bl1nkCodebaseContext' },
  { from: /DyadTokenSavings/g, to: 'Bl1nkTokenSavings' },

  // URL protocol
  { from: /dyad:\/\//g, to: 'bl1nk://' },

  // Directory/path names
  { from: /dyad-apps/g, to: 'bl1nk-apps' },

  // Deep link hostnames (already done in main.ts but catching others)
  { from: /"dyad-pro-return"/g, to: '"bl1nk-pro-return"' },

  // Source type in atoms
  { from: /"dyad-app"/g, to: '"bl1nk-app"' },

  // General text replacements (be careful with these)
  { from: /Dyad Pro/g, to: 'bl1nk Pro' },
  { from: /Dyad app/g, to: 'bl1nk app' },
  { from: /Dyad AI/g, to: 'bl1nk AI' },
  { from: /Dyad's/g, to: "bl1nk's" },

  // String constants for tag types (in arrays and case statements)
  { from: /"dyad-write"/g, to: '"bl1nk-write"' },
  { from: /"dyad-rename"/g, to: '"bl1nk-rename"' },
  { from: /"dyad-delete"/g, to: '"bl1nk-delete"' },
  { from: /"dyad-edit"/g, to: '"bl1nk-edit"' },
  { from: /"dyad-execute-sql"/g, to: '"bl1nk-execute-sql"' },
  { from: /"dyad-add-integration"/g, to: '"bl1nk-add-integration"' },
  { from: /"dyad-output"/g, to: '"bl1nk-output"' },
  { from: /"dyad-problem-report"/g, to: '"bl1nk-problem-report"' },
  { from: /"dyad-chat-summary"/g, to: '"bl1nk-chat-summary"' },
  { from: /"dyad-codebase-context"/g, to: '"bl1nk-codebase-context"' },
  { from: /"dyad-command"/g, to: '"bl1nk-command"' },
  { from: /"dyad-read"/g, to: '"bl1nk-read"' },
  { from: /"dyad-think"/g, to: '"bl1nk-think"' },
  { from: /"dyad-file"/g, to: '"bl1nk-file"' },
  { from: /"dyad-code-search"/g, to: '"bl1nk-code-search"' },
  { from: /"dyad-web-search"/g, to: '"bl1nk-web-search"' },
  { from: /"dyad-web-crawl"/g, to: '"bl1nk-web-crawl"' },
  { from: /"dyad-add-dependency"/g, to: '"bl1nk-add-dependency"' },
  { from: /"dyad-search-replace"/g, to: '"bl1nk-search-replace"' },
  { from: /"dyad-mcp-tool-call"/g, to: '"bl1nk-mcp-tool-call"' },
  { from: /"dyad-mcp-tool-result"/g, to: '"bl1nk-mcp-tool-result"' },
  { from: /"dyad-problem-summary"/g, to: '"bl1nk-problem-summary"' },
  { from: /"dyad-token-savings"/g, to: '"bl1nk-token-savings"' },

  // Interface and provider names
  { from: /DyadEngineProvider/g, to: 'Bl1nkEngineProvider' },
  { from: /createDyadEngine/g, to: 'createBl1nkEngine' },

  // Object property names (camelCase)
  { from: /dyadOptions/g, to: 'bl1nkOptions' },
  { from: /dyadVersionedFiles/g, to: 'bl1nkVersionedFiles' },
  { from: /dyadFiles/g, to: 'bl1nkFiles' },
  { from: /dyadRequestId/g, to: 'bl1nkRequestId' },
  { from: /dyadAppId/g, to: 'bl1nkAppId' },
  { from: /dyadDisableFiles/g, to: 'bl1nkDisableFiles' },
  { from: /dyadMentionedApps/g, to: 'bl1nkMentionedApps' },
  { from: /dyadAppPath/g, to: 'bl1nkAppPath' },

  // Snake case properties (API payloads)
  { from: /dyad_options/g, to: 'bl1nk_options' },

  // Function name patterns in clipboard/processing hooks
  { from: /convertDyadContentToMarkdown/g, to: 'convertBl1nkContentToMarkdown' },
  { from: /getDyadChatSummaryTag/g, to: 'getBl1nkChatSummaryTag' },
  { from: /getDyadCommandTags/g, to: 'getBl1nkCommandTags' },

  // Variable names for tag collections in response_processor and tag_parser
  { from: /dyadSearchReplaceTags/g, to: 'bl1nkSearchReplaceTags' },
  { from: /dyadWriteTags/g, to: 'bl1nkWriteTags' },
  { from: /dyadRenameTags/g, to: 'bl1nkRenameTags' },
  { from: /dyadDeletePaths/g, to: 'bl1nkDeletePaths' },
  { from: /dyadAddDependencyPackages/g, to: 'bl1nkAddDependencyPackages' },
  { from: /dyadExecuteSqlQueries/g, to: 'bl1nkExecuteSqlQueries' },
  { from: /dyadWriteRegex/g, to: 'bl1nkWriteRegex' },
  { from: /dyadRenameRegex/g, to: 'bl1nkRenameRegex' },
  { from: /dyadDeleteRegex/g, to: 'bl1nkDeleteRegex' },
  { from: /dyadAddDependencyRegex/g, to: 'bl1nkAddDependencyRegex' },
  { from: /dyadChatSummaryRegex/g, to: 'bl1nkChatSummaryRegex' },
  { from: /dyadExecuteSqlRegex/g, to: 'bl1nkExecuteSqlRegex' },
  { from: /dyadCommandRegex/g, to: 'bl1nkCommandRegex' },
  { from: /dyadSearchReplaceRegex/g, to: 'bl1nkSearchReplaceRegex' },

  // Commit message prefix
  { from: /\[dyad\]/g, to: '[bl1nk]' },

  // Regex closing tags that got missed (inside regex patterns)
  { from: /<\\\/dyad-write>/g, to: '</bl1nk-write>' },
  { from: /<\\\/dyad-rename>/g, to: '</bl1nk-rename>' },
  { from: /<\\\/dyad-delete>/g, to: '</bl1nk-delete>' },
  { from: /<\\\/dyad-chat-summary>/g, to: '</bl1nk-chat-summary>' },
  { from: /<\\\/dyad-execute-sql>/g, to: '</bl1nk-execute-sql>' },
  { from: /<\\\/dyad-command>/g, to: '</bl1nk-command>' },
  { from: /<\\\/dyad-search-replace>/g, to: '</bl1nk-search-replace>' },

  // Plain closing tags in regex strings (without escapes)
  { from: /<\/dyad-add-dependency>/g, to: '</bl1nk-add-dependency>' },

  // Dyad in comment/log messages
  { from: /outside of dyad:/g, to: 'outside of bl1nk:' },

  // Temp directory and function names
  { from: /dyad-attachments/g, to: 'bl1nk-attachments' },
  { from: /escapeDyadTags/g, to: 'escapeBl1nkTags' },
  { from: /isDyadProUser/g, to: 'isBl1nkProUser' },
  { from: /dyadVersion/g, to: 'bl1nkVersion' },

  // API gateway header
  { from: /"dyad-gateway"/g, to: '"bl1nk-gateway"' },

  // Text attachment tags
  { from: /<dyad-text-attachment/g, to: '<bl1nk-text-attachment' },
  { from: /<\/dyad-text-attachment>/g, to: '</bl1nk-text-attachment>' },
  { from: /<\\\/dyad-text-attachment>/g, to: '</bl1nk-text-attachment>' },

  // Problem report tags in string templates
  { from: /<dyad-problem-report/g, to: '<bl1nk-problem-report' },
  { from: /<\/dyad-problem-report>/g, to: '</bl1nk-problem-report>' },

  // Backtick-escaped inline references in messages
  { from: /`dyad-search-replace`/g, to: '`bl1nk-search-replace`' },
  { from: /`dyad-read`/g, to: '`bl1nk-read`' },
  { from: /`dyad-write`/g, to: '`bl1nk-write`' },

  // Generic regex patterns for dyad tags (in sanitization code)
  { from: /<dyad-\[\^>\]\*>/g, to: '<bl1nk-[^>]*>' },
  { from: /<\\\/dyad-\[\^>\]\*>/g, to: '</bl1nk-[^>]*>' },

  // Escape function replacements
  { from: /<dyad/g, to: '<bl1nk' },
  { from: /<\\\/dyad/g, to: '</bl1nk' },
  { from: /＜dyad/g, to: '＜bl1nk' },
  { from: /＜\/dyad/g, to: '＜/bl1nk' },

  // GitHub organization and URLs
  { from: /github\.com\/dyad-sh\/dyad/g, to: 'github.com/bl1nk-org/bl1nk' },
  { from: /upload-logs\.dyad\.sh/g, to: 'upload-logs.bl1nk.org' },

  // Setting references that weren't caught
  { from: /settings\.enableDyadPro/g, to: 'settings.enableBl1nkPro' },

  // Text patterns in prompts
  { from: /dyad-write operations/g, to: 'bl1nk-write operations' },
  { from: /<dyad-\*>/g, to: '<bl1nk-*>' },
  { from: /<dyad-command>/g, to: '<bl1nk-command>' },
  { from: /<\/dyad-command>/g, to: '</bl1nk-command>' },
  { from: /<dyad-chat-summary>/g, to: '<bl1nk-chat-summary>' },
  { from: /<\/dyad-chat-summary>/g, to: '</bl1nk-chat-summary>' },

  // "dyad engine" text
  { from: /dyad engine/g, to: 'bl1nk engine' },
  { from: /`dyad-engine`/g, to: '`bl1nk-engine`' },

  // Keep these at the end - most general replacements
  // Only for specific contexts, not URLs
  { from: /\bDyad\b(?!\.sh|\/)/g, to: 'bl1nk' }, // Dyad but not dyad.sh or dyad/
];

// File extensions to process
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.txt'];

let totalFiles = 0;
let modifiedFiles = 0;
let totalReplacements = 0;

function shouldSkipFile(filePath) {
  const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  return SKIP_PATTERNS.some(pattern => pattern.test(content));
}

function shouldSkipDir(dirName) {
  return SKIP_DIRS.includes(dirName);
}

function processFile(filePath) {
  const ext = path.extname(filePath);
  if (!EXTENSIONS.includes(ext)) return;

  totalFiles++;

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let fileReplacements = 0;

  for (const { from, to } of REPLACEMENTS) {
    const matches = content.match(from);
    if (matches) {
      fileReplacements += matches.length;
      content = content.replace(from, to);
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedFiles++;
    totalReplacements += fileReplacements;
    console.log(`✓ ${path.relative(ROOT_DIR, filePath)} (${fileReplacements} replacements)`);
  }
}

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (!shouldSkipDir(entry.name)) {
        processDirectory(fullPath);
      }
    } else if (entry.isFile()) {
      processFile(fullPath);
    }
  }
}

// Rename files with Dyad in the name
function renameFiles(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (!shouldSkipDir(entry.name)) {
        renameFiles(fullPath);
      }
    } else if (entry.isFile()) {
      if (entry.name.includes('Dyad') || entry.name.includes('dyad')) {
        const newName = entry.name
          .replace(/Dyad/g, 'Bl1nk')
          .replace(/dyad/g, 'bl1nk');
        const newPath = path.join(dirPath, newName);

        // Skip if it's the tag parser (special case)
        if (entry.name === 'dyad_tag_parser.ts') {
          const newTagParserPath = path.join(dirPath, 'bl1nk_tag_parser.ts');
          fs.renameSync(fullPath, newTagParserPath);
          console.log(`📁 Renamed: ${entry.name} → ${newName}`);
        } else if (entry.name !== newName) {
          fs.renameSync(fullPath, newPath);
          console.log(`📁 Renamed: ${entry.name} → ${newName}`);
        }
      }
    }
  }
}

console.log('🔄 Starting Dyad → bl1nk rebrand...\n');

// First, process file contents
console.log('📝 Processing file contents...\n');
processDirectory(SRC_DIR);
if (fs.existsSync(TESTS_DIR)) {
  processDirectory(TESTS_DIR);
}

// Then rename files
console.log('\n📁 Renaming files...\n');
renameFiles(SRC_DIR);
if (fs.existsSync(TESTS_DIR)) {
  renameFiles(TESTS_DIR);
}

console.log(`\n✅ Rebrand complete!`);
console.log(`   Files processed: ${totalFiles}`);
console.log(`   Files modified: ${modifiedFiles}`);
console.log(`   Total replacements: ${totalReplacements}`);
