import fs from 'node:fs'
import path from 'node:path'

const allowedStatuses = new Set(['normal', 'needs_review', 'delayed', 'completed'])
const requiredProjectIds = ['compass', 'sentinel', 'lens', 'foresight']
const sourcePath = path.join(process.cwd(), 'src', 'lib', 'command-center-data.ts')
const publicCopyFiles = [
  path.join(process.cwd(), 'src', 'app', 'command-center', 'page.tsx'),
  path.join(process.cwd(), 'src', 'components', 'command-center', 'CommandCenterPage.tsx'),
  path.join(process.cwd(), 'src', 'components', 'command-center', 'ProjectProgressCard.tsx'),
  path.join(process.cwd(), 'src', 'components', 'command-center', 'SummaryCards.tsx'),
  path.join(process.cwd(), 'src', 'components', 'command-center', 'StatusBadge.tsx'),
]
const forbiddenPublicCopyPatterns = [
  /Openclaw/i,
  /Hermes/i,
  /Agent Core/i,
  /Learning Governance/i,
  /operator log/i,
  /audit log/i,
  /LLM\/API/i,
]

function fail(message) {
  console.error(`[check-command-center-contract] ${message}`)
  process.exitCode = 1
}

function validatePayload(payload, label) {
  if (!payload || typeof payload !== 'object') {
    fail(`${label}: payload is not an object`)
    return
  }

  if (!Array.isArray(payload.projects)) {
    fail(`${label}: projects must be an array`)
    return
  }

  const ids = new Set(payload.projects.map(project => String(project.id || '')))
  for (const id of requiredProjectIds) {
    if (!ids.has(id)) fail(`${label}: missing required project id ${id}`)
  }

  for (const project of payload.projects) {
    const prefix = `${label}:${project.id || 'unknown'}`
    for (const field of ['id', 'name', 'role', 'owner', 'status', 'statusLabel', 'weeklyFocus', 'deliverable', 'blockedIssue', 'nextMilestone']) {
      if (typeof project[field] !== 'string') fail(`${prefix}: ${field} must be a string`)
    }
    if (!allowedStatuses.has(project.status)) fail(`${prefix}: invalid status ${project.status}`)
    if (!Number.isFinite(project.progress) || project.progress < 0 || project.progress > 100) {
      fail(`${prefix}: progress must be a number between 0 and 100`)
    }
    if (project.updatedAt !== null && typeof project.updatedAt !== 'string') {
      fail(`${prefix}: updatedAt must be string or null`)
    }
  }
}

function validateFallbackSource() {
  if (!fs.existsSync(sourcePath)) {
    fail(`missing ${path.relative(process.cwd(), sourcePath)}`)
    return
  }

  const text = fs.readFileSync(sourcePath, 'utf8')
  for (const id of requiredProjectIds) {
    if (!text.includes(`id: "${id}"`) && !text.includes(`id: '${id}'`)) {
      fail(`fallback source missing project id ${id}`)
    }
  }
  for (const status of allowedStatuses) {
    if (!text.includes(`"${status}"`) && !text.includes(`'${status}'`)) {
      fail(`fallback source missing status reference ${status}`)
    }
  }

  const fallbackBlock = extractFallbackDataBlock(text)
  validatePublicCopyText(fallbackBlock, 'src/lib/command-center-data.ts:fallback')
}

function extractFallbackDataBlock(text) {
  const startMarker = 'export const commandCenterData'
  const endMarker = 'export function getCommandCenterSummary'
  const start = text.indexOf(startMarker)
  const end = text.indexOf(endMarker)

  if (start === -1 || end === -1 || end <= start) {
    fail('fallback source missing commandCenterData block boundary')
    return text
  }

  return text.slice(start, end)
}

function validatePublicCopyText(text, label) {
  for (const pattern of forbiddenPublicCopyPatterns) {
    if (pattern.test(text)) {
      fail(`${label}: public copy contains forbidden implementation wording ${pattern}`)
    }
  }
}

function validatePublicCopyFiles() {
  for (const file of publicCopyFiles) {
    if (!fs.existsSync(file)) {
      fail(`missing ${path.relative(process.cwd(), file)}`)
      continue
    }

    validatePublicCopyText(fs.readFileSync(file, 'utf8'), path.relative(process.cwd(), file))
  }
}

async function validateLiveContractIfConfigured() {
  if (process.env.COMMAND_CENTER_CONTRACT_LIVE !== '1') {
    console.log('[check-command-center-contract] live API skipped (set COMMAND_CENTER_CONTRACT_LIVE=1 to opt in)')
    return
  }

  const endpoint = (process.env.COMMAND_CENTER_API_URL || '').trim()
  const readKey = (process.env.COMMAND_CENTER_READ_KEY || process.env.ADMATE_COMMAND_CENTER_READ_KEY || '').trim()

  if (!endpoint || !readKey) {
    fail('live API opt-in requires endpoint and read key env')
    return
  }

  const response = await fetch(endpoint, {
    headers: { 'x-admate-command-center-read-key': readKey },
  })

  if (!response.ok) {
    fail(`live API returned ${response.status}`)
    return
  }

  const payload = await response.json()
  validatePayload(payload, 'live')
}

validateFallbackSource()
validatePublicCopyFiles()
await validateLiveContractIfConfigured()

if (!process.exitCode) {
  console.log('[check-command-center-contract] ok')
}
