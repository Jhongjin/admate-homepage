import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const source = (...parts) => path.join(root, ...parts)
const rel = (file) => path.relative(root, file).replaceAll(path.sep, '/')

const files = {
  page: source('src', 'components', 'command-center', 'CommandCenterPage.tsx'),
  projectCard: source('src', 'components', 'command-center', 'ProjectProgressCard.tsx'),
  summaryCards: source('src', 'components', 'command-center', 'SummaryCards.tsx'),
  progressBar: source('src', 'components', 'command-center', 'ProgressBar.tsx'),
}

let failed = false

function fail(message) {
  console.error(`[check-command-center-responsive] ${message}`)
  failed = true
}

function read(file) {
  if (!fs.existsSync(file)) {
    fail(`missing ${rel(file)}`)
    return ''
  }

  return fs.readFileSync(file, 'utf8')
}

function assertIncludes(text, marker, label) {
  if (!text.includes(marker)) fail(`${label}: missing ${marker}`)
}

function assertMatches(text, pattern, label, reason) {
  if (!pattern.test(text)) fail(`${label}: ${reason}`)
}

function assertNoMatches(text, pattern, label, reason) {
  if (pattern.test(text)) fail(`${label}: ${reason}`)
}

function assertMinWidthUtilitiesAreResponsive(text, label) {
  const riskyBaseMinWidth = /(?<![a-z-])min-w-\[(?:3[3-9]\d|[4-9]\d{2,}|\d{4,})px\]/g
  const matches = text.match(riskyBaseMinWidth) || []
  if (matches.length > 0) {
    fail(`${label}: risky fixed base min-width utilities found: ${matches.join(', ')}`)
  }
}

const pageText = read(files.page)
const projectCardText = read(files.projectCard)
const summaryText = read(files.summaryCards)
const progressText = read(files.progressBar)

assertIncludes(pageText, 'overflow-x-hidden', rel(files.page))
assertIncludes(pageText, 'max-w-[1440px]', rel(files.page))
assertIncludes(pageText, 'px-4 sm:px-6 lg:px-8', rel(files.page))
assertIncludes(pageText, 'flex min-w-0 items-center', rel(files.page))
assertIncludes(pageText, 'truncate text-[13px]', rel(files.page))
assertIncludes(pageText, 'shrink-0 bg-white', rel(files.page))
assertIncludes(pageText, 'lg:grid-cols-[minmax(0,1fr)_360px]', rel(files.page))
assertIncludes(pageText, 'xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)]', rel(files.page))
assertIncludes(pageText, 'flex flex-wrap', rel(files.page))
assertIncludes(pageText, 'break-words', rel(files.page))
assertMatches(
  pageText,
  /<section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">/,
  rel(files.page),
  'product grid should start as one column and expand at md/xl breakpoints',
)
assertNoMatches(pageText, /\bfixed\b/, rel(files.page), 'Command Center shell should not use fixed positioning')

assertIncludes(summaryText, 'grid gap-3 lg:grid-cols-[minmax(260px,1.25fr)_repeat(5,minmax(130px,1fr))]', rel(files.summaryCards))
assertIncludes(summaryText, 'min-w-0 overflow-hidden', rel(files.summaryCards))
assertIncludes(summaryText, 'truncate text-lg', rel(files.summaryCards))
assertIncludes(summaryText, 'shrink-0', rel(files.summaryCards))

assertIncludes(projectCardText, 'min-w-0 flex-col overflow-hidden', rel(files.projectCard))
assertIncludes(projectCardText, 'break-words', rel(files.projectCard))
assertIncludes(projectCardText, 'truncate', rel(files.projectCard))
assertIncludes(projectCardText, 'sm:grid-cols-2', rel(files.projectCard))
assertIncludes(projectCardText, 'shrink-0', rel(files.projectCard))
assertNoMatches(projectCardText, /\bfixed\b/, rel(files.projectCard), 'project cards should not use fixed positioning')

assertIncludes(progressText, 'Math.max(0, Math.min(100, value))', rel(files.progressBar))
assertIncludes(progressText, 'overflow-hidden', rel(files.progressBar))

for (const [label, text] of [
  [rel(files.page), pageText],
  [rel(files.projectCard), projectCardText],
  [rel(files.summaryCards), summaryText],
]) {
  assertMinWidthUtilitiesAreResponsive(text, label)
}

if (failed) {
  process.exitCode = 1
} else {
  console.log('[check-command-center-responsive] ok')
}
