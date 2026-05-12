import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (...parts) => path.join(...parts)
const source = (...parts) => path.join(root, ...parts)

const files = {
  route: source('src', 'app', 'command-center', 'page.tsx'),
  page: source('src', 'components', 'command-center', 'CommandCenterPage.tsx'),
  projectCard: source('src', 'components', 'command-center', 'ProjectProgressCard.tsx'),
  summaryCards: source('src', 'components', 'command-center', 'SummaryCards.tsx'),
  statusBadge: source('src', 'components', 'command-center', 'StatusBadge.tsx'),
  data: source('src', 'lib', 'command-center-data.ts'),
  smoke: source('scripts', 'smoke-command-center.mjs'),
}

const requiredProjectNames = ['AdMate Compass', 'AdMate Sentinel', 'AdMate Lens', 'AdMate Foresight']
const requiredPageCopy = ['AdMate Command Center', '기본 운영 데이터', '보고 기준']
const requiredProjectCardCopy = ['이번 주 작업', '이번 주 산출물', '막힌 이슈', '다음 마일스톤']
const requiredSummaryCopy = ['전체 평균 진행률', '기준 주차', '마지막 업데이트', '정상', '검토 필요', '지연']
const requiredStateCopy = [
  '운영 상태를 준비하고 있습니다.',
  '기본 운영 데이터로 표시하고 있습니다.',
  '표시할 운영 항목이 아직 없습니다.',
]

const forbiddenPublicPatterns = [
  /Openclaw/i,
  /Hermes/i,
  /Agent Core/i,
  /Learning Governance/i,
  /operator log/i,
  /audit log/i,
  /LLM\/API/i,
  /Live Monitoring/i,
  /x-admate-command-center-read-key/i,
  /COMMAND_CENTER_(?:API_URL|READ_KEY|LIVE_DATA|CONTRACT_LIVE)/,
  /ADMATE_COMMAND_CENTER_READ_KEY/,
  /\btoken\b/i,
  /\bsecret\b/i,
]

let failed = false

function fail(message) {
  console.error(`[check-command-center-static] ${message}`)
  failed = true
}

function read(file) {
  if (!fs.existsSync(file)) {
    fail(`missing ${path.relative(root, file)}`)
    return ''
  }

  return fs.readFileSync(file, 'utf8')
}

function assertIncludes(text, markers, label) {
  for (const marker of markers) {
    if (!text.includes(marker)) fail(`${label}: missing ${marker}`)
  }
}

function assertNoForbidden(text, label) {
  for (const pattern of forbiddenPublicPatterns) {
    if (pattern.test(text)) fail(`${label}: contains forbidden public marker ${pattern}`)
  }
}

function extractFallbackDataBlock(text) {
  const startMarker = 'export const commandCenterData'
  const endMarker = 'export function getCommandCenterSummary'
  const start = text.indexOf(startMarker)
  const end = text.indexOf(endMarker)

  if (start === -1 || end === -1 || end <= start) {
    fail('src/lib/command-center-data.ts: fallback data block boundary not found')
    return text
  }

  return text.slice(start, end)
}

const routeText = read(files.route)
const pageText = read(files.page)
const projectCardText = read(files.projectCard)
const summaryText = read(files.summaryCards)
const statusText = read(files.statusBadge)
const dataText = read(files.data)
const smokeText = read(files.smoke)
const fallbackDataText = extractFallbackDataBlock(dataText)

assertIncludes(pageText, requiredPageCopy, rel('src', 'components', 'command-center', 'CommandCenterPage.tsx'))
assertIncludes(projectCardText, requiredProjectCardCopy, rel('src', 'components', 'command-center', 'ProjectProgressCard.tsx'))
assertIncludes(summaryText, requiredSummaryCopy, rel('src', 'components', 'command-center', 'SummaryCards.tsx'))
assertIncludes(fallbackDataText, requiredProjectNames, rel('src', 'lib', 'command-center-data.ts:fallback'))
assertIncludes(smokeText, requiredStateCopy, rel('scripts', 'smoke-command-center.mjs'))

assertNoForbidden(routeText, rel('src', 'app', 'command-center', 'page.tsx'))
assertNoForbidden(pageText, rel('src', 'components', 'command-center', 'CommandCenterPage.tsx'))
assertNoForbidden(projectCardText, rel('src', 'components', 'command-center', 'ProjectProgressCard.tsx'))
assertNoForbidden(summaryText, rel('src', 'components', 'command-center', 'SummaryCards.tsx'))
assertNoForbidden(statusText, rel('src', 'components', 'command-center', 'StatusBadge.tsx'))
assertNoForbidden(fallbackDataText, rel('src', 'lib', 'command-center-data.ts:fallback'))

if (!pageText.includes('overflow-x-hidden')) {
  fail('CommandCenterPage.tsx: missing page-level horizontal overflow guard')
}

if (!projectCardText.includes('min-w-0') || !summaryText.includes('min-w-0')) {
  fail('Command Center cards: missing min-width guard for narrow layouts')
}

if (!smokeText.includes('COMMAND_CENTER_SMOKE_ALLOW_REMOTE') || !smokeText.includes('remote smoke target blocked by default')) {
  fail('smoke-command-center.mjs: missing remote smoke opt-in guard')
}

if (failed) {
  process.exitCode = 1
} else {
  console.log('[check-command-center-static] ok')
}
