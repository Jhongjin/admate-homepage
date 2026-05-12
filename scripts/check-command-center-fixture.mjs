import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dataPath = path.join(root, 'src', 'lib', 'command-center-data.ts')
const requiredIds = ['compass', 'sentinel', 'lens', 'foresight', 'agent_core']
const requiredStringFields = [
  'id',
  'name',
  'role',
  'owner',
  'status',
  'statusLabel',
  'weeklyFocus',
  'deliverable',
  'blockedIssue',
  'nextMilestone',
  'updatedAt',
]
const allowedStatuses = new Set(['normal', 'needs_review', 'delayed', 'completed'])
const expectedSummary = {
  overallProgress: 55,
  normalCount: 4,
  needsReviewCount: 1,
  delayedCount: 0,
  doneCount: 0,
}

let failed = false

function fail(message) {
  console.error(`[check-command-center-fixture] ${message}`)
  failed = true
}

function extractBlock(text, startMarker, endMarker, label) {
  const start = text.indexOf(startMarker)
  const end = text.indexOf(endMarker)

  if (start === -1 || end === -1 || end <= start) {
    fail(`${label}: block boundary not found`)
    return ''
  }

  return text.slice(start, end)
}

function extractProjectsArray(text) {
  const marker = 'projects: ['
  const start = text.indexOf(marker)
  if (start === -1) {
    fail('commandCenterData: projects array not found')
    return ''
  }

  let depth = 0
  let opened = false
  for (let index = start + marker.length - 1; index < text.length; index += 1) {
    const char = text[index]
    if (char === '[') {
      depth += 1
      opened = true
    } else if (char === ']') {
      depth -= 1
      if (opened && depth === 0) return text.slice(start + marker.length, index)
    }
  }

  fail('commandCenterData: projects array did not close')
  return ''
}

function splitObjectLiterals(text) {
  const objects = []
  let depth = 0
  let start = -1
  let inString = false
  let quote = ''
  let escaped = false

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]

    if (inString) {
      if (escaped) {
        escaped = false
      } else if (char === '\\') {
        escaped = true
      } else if (char === quote) {
        inString = false
      }
      continue
    }

    if (char === '"' || char === "'") {
      inString = true
      quote = char
      continue
    }

    if (char === '{') {
      if (depth === 0) start = index
      depth += 1
    } else if (char === '}') {
      depth -= 1
      if (depth === 0 && start !== -1) {
        objects.push(text.slice(start, index + 1))
        start = -1
      }
    }
  }

  return objects
}

function stringValue(objectText, field) {
  const match = objectText.match(new RegExp(`${field}:\\s*["']([^"']*)["']`))
  return match ? match[1] : null
}

function numberValue(objectText, field) {
  const match = objectText.match(new RegExp(`${field}:\\s*(-?\\d+(?:\\.\\d+)?)`))
  return match ? Number(match[1]) : Number.NaN
}

function validateProject(objectText, index) {
  const label = `project[${index}]`
  const project = {}

  for (const field of requiredStringFields) {
    const value = stringValue(objectText, field)
    if (!value) fail(`${label}: ${field} must be a non-empty string`)
    project[field] = value || ''
  }

  const progress = numberValue(objectText, 'progress')
  if (!Number.isFinite(progress) || progress < 0 || progress > 100) {
    fail(`${label}: progress must be a number between 0 and 100`)
  }

  if (!allowedStatuses.has(project.status)) {
    fail(`${label}: invalid status ${project.status}`)
  }

  if (!project.name.startsWith('AdMate ')) {
    fail(`${label}: name should use AdMate product naming`)
  }

  return { ...project, progress }
}

function validateSummary(projects) {
  const total = projects.reduce((sum, project) => sum + project.progress, 0)
  const summary = {
    overallProgress: projects.length === 0 ? 0 : Math.round(total / projects.length),
    normalCount: projects.filter((project) => project.status === 'normal').length,
    needsReviewCount: projects.filter((project) => project.status === 'needs_review').length,
    delayedCount: projects.filter((project) => project.status === 'delayed').length,
    doneCount: projects.filter((project) => project.status === 'completed').length,
  }

  for (const [key, expected] of Object.entries(expectedSummary)) {
    if (summary[key] !== expected) {
      fail(`summary: ${key} expected ${expected}, got ${summary[key]}`)
    }
  }
}

if (!fs.existsSync(dataPath)) {
  fail(`missing ${path.relative(root, dataPath)}`)
} else {
  const text = fs.readFileSync(dataPath, 'utf8')
  const fixtureBlock = extractBlock(text, 'export const commandCenterData', 'export function getCommandCenterSummary', 'commandCenterData')
  const projectsText = extractProjectsArray(fixtureBlock)
  const projectObjects = splitObjectLiterals(projectsText)
  const projects = projectObjects.map(validateProject)
  const ids = projects.map((project) => project.id)

  if (!fixtureBlock.includes('source: "static"')) {
    fail('commandCenterData: source must remain static')
  }

  if (/CC-SMOKE-\d{8}/.test(fixtureBlock)) {
    fail('commandCenterData: fallback fixture must not contain smoke markers')
  }

  if (projects.length !== requiredIds.length) {
    fail(`commandCenterData: expected ${requiredIds.length} projects, got ${projects.length}`)
  }

  for (const id of requiredIds) {
    if (!ids.includes(id)) fail(`commandCenterData: missing project id ${id}`)
  }

  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index)
  if (duplicateIds.length > 0) {
    fail(`commandCenterData: duplicate project ids ${[...new Set(duplicateIds)].join(', ')}`)
  }

  validateSummary(projects)
}

if (failed) {
  process.exitCode = 1
} else {
  console.log('[check-command-center-fixture] ok')
}
