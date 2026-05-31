import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const source = (...parts) => path.join(root, ...parts)
const rel = (file) => path.relative(root, file)

const homeComponentsDir = source('src', 'components', 'home')
const publicHomeComponentFiles = fs
  .readdirSync(homeComponentsDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.(?:ts|tsx)$/.test(entry.name))
  .map((entry) => path.join(homeComponentsDir, entry.name))

const publicHomepageFiles = [
  source('src', 'app', 'page.tsx'),
  source('src', 'app', 'hero-motion', 'no-dotted', 'page.tsx'),
  source('src', 'app', 'hero-motion', 'no-solid', 'page.tsx'),
  source('src', 'lib', 'admate-content.ts'),
  ...publicHomeComponentFiles,
]

const forbiddenPublicCopyPatterns = [
  { label: 'Agent Core', pattern: /Agent Core/i },
  { label: 'Hermes', pattern: /\bHermes\b/i },
  { label: 'Multi-LLM', pattern: /Multi-LLM/i },
  { label: 'LLM/API', pattern: /LLM\/API/i },
  { label: 'raw LLM', pattern: /\bLLM\b/i },
  { label: 'raw PoC', pattern: /\bPoC\b/i },
  { label: 'raw IA', pattern: /\bIA\b/i },
  { label: 'Tool API', pattern: /Tool API/i },
  { label: 'Live Monitoring', pattern: /Live Monitoring/i },
]

let failed = false

function fail(message) {
  console.error(`[check-homepage-public-copy] ${message}`)
  failed = true
}

for (const file of publicHomepageFiles) {
  if (!fs.existsSync(file)) {
    fail(`missing ${rel(file)}`)
    continue
  }

  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)
  for (const [lineIndex, line] of lines.entries()) {
    for (const { label, pattern } of forbiddenPublicCopyPatterns) {
      if (pattern.test(line)) {
        fail(`${rel(file)}:${lineIndex + 1}: contains forbidden public copy marker ${label}`)
      }
    }
  }
}

if (failed) {
  process.exitCode = 1
} else {
  console.log('[check-homepage-public-copy] ok')
}
