import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.relative(root, file)
const source = (...parts) => path.join(root, ...parts)

const manifestPath = source('src', 'lib', 'command-center-readiness-manifest.ts')
const fixturePath = source('scripts', 'fixtures', 'command-center-readiness-manifest.json')
const packagePath = source('package.json')

const fixedContractVersion = 'cc-readiness-manifest-v1'
const allowedTopLevelKeys = ['contractVersion', 'scope', 'status', 'products', 'counts', 'safetyFlags']
const requiredProductIds = ['sentinel', 'compass', 'lens', 'foresight', 'creative_studio']
const allowedStatuses = new Set(['ready', 'watch', 'blocked'])
const allowedReadiness = new Set(['static_ready', 'static_watch', 'static_blocked'])
const allowedReasonCodes = new Set([
  'local_contract',
  'static_fixture',
  'public_copy',
  'sanitized_summary',
  'review_queue',
  'readiness_pending',
])
const requiredSafetyFlags = [
  'localOnly',
  'staticOnly',
  'publicSafe',
  'sanitizedOnly',
  'noLiveData',
  'noAuth',
  'noEnvRead',
  'noProductionApi',
  'noDbRead',
  'noDbWrite',
  'noProviderCall',
  'noWorkflowExecution',
  'noPersistence',
  'noPublish',
  'noApplyOrPromote',
  'noMediaAssetRead',
]
const allowedUnsafeSafetyKeys = new Set(requiredSafetyFlags)
const unsafeKeyPatterns = [
  /(?:url|uri|path|host|domain|bucket|storage|signed)/i,
  /(?:account|campaign|provider).*id|id.*(?:account|campaign|provider)/i,
  /(?:raw|payload|dump|hash|token|secret|session|cookie|credential|password|auth)/i,
  /(?:n8n|workflow|execution)/i,
  /(?:env|readkey|read_key|apiurl|api_url)/i,
]
const unsafeStringPatterns = [
  /https?:\/\//i,
  /\b[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:\/|\b)/i,
  /[a-z]:\\/i,
  /(?:^|[\\/])(?:Users|Projects|workspace|repo|repos|node_modules|\.git)(?:[\\/]|$)/i,
  /\b\d{9,}\b/,
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  /\b[0-9a-f]{7,40}\b/i,
  /\b(?:account|campaign|provider)[-_ ]?[a-z0-9]*\d{4,}\b/i,
  /\b(?:raw|payload|dump|hash|token|secret|session|cookie|credential|password)\b/i,
  /\b(?:n8n|workflow|execution)\b/i,
  /\b(?:COMMAND_CENTER_|ADMATE_|READ_KEY|API_URL|OPENCLAW|process\.env)\b/i,
]

let failed = false

function fail(message) {
  console.error(`[check-command-center-readiness-manifest] ${message}`)
  failed = true
}

function read(file) {
  if (!fs.existsSync(file)) {
    fail(`missing ${rel(file)}`)
    return ''
  }

  return fs.readFileSync(file, 'utf8')
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]))
  }

  return value
}

function assertExactKeys(object, expectedKeys, label) {
  const keys = Object.keys(object || {})
  const extra = keys.filter((key) => !expectedKeys.includes(key))
  const missing = expectedKeys.filter((key) => !keys.includes(key))

  for (const key of extra) fail(`${label}: unexpected key ${key}`)
  for (const key of missing) fail(`${label}: missing key ${key}`)
}

function extractJsonObjectLiteral(text) {
  const marker = 'export const commandCenterReadinessManifest ='
  const markerIndex = text.indexOf(marker)
  if (markerIndex === -1) {
    fail(`${rel(manifestPath)}: missing commandCenterReadinessManifest export`)
    return null
  }

  const start = text.indexOf('{', markerIndex)
  if (start === -1) {
    fail(`${rel(manifestPath)}: manifest object not found`)
    return null
  }

  let depth = 0
  let inString = false
  let escaped = false
  for (let index = start; index < text.length; index += 1) {
    const char = text[index]

    if (inString) {
      if (escaped) {
        escaped = false
      } else if (char === '\\') {
        escaped = true
      } else if (char === '"') {
        inString = false
      }
      continue
    }

    if (char === '"') {
      inString = true
    } else if (char === '{') {
      depth += 1
    } else if (char === '}') {
      depth -= 1
      if (depth === 0) return text.slice(start, index + 1)
    }
  }

  fail(`${rel(manifestPath)}: manifest object did not close`)
  return null
}

function parseJson(text, label) {
  try {
    return JSON.parse(text)
  } catch (error) {
    fail(`${label}: invalid JSON (${error.message})`)
    return null
  }
}

function assertSafeKey(key, label) {
  if (allowedUnsafeSafetyKeys.has(key)) return

  for (const pattern of unsafeKeyPatterns) {
    if (pattern.test(key)) fail(`${label}: unsafe key ${key}`)
  }
}

function assertSafeString(value, label) {
  for (const pattern of unsafeStringPatterns) {
    if (pattern.test(value)) fail(`${label}: unsafe string ${value}`)
  }
}

function assertPublicSafe(value, label = 'manifest') {
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertPublicSafe(item, `${label}[${index}]`))
    return
  }

  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      assertSafeKey(key, label)
      assertPublicSafe(child, `${label}.${key}`)
    }
    return
  }

  if (typeof value === 'string') assertSafeString(value, label)
}

function assertCount(value, label, max = 100) {
  if (!Number.isInteger(value) || value < 0 || value > max) {
    fail(`${label}: count must be an integer from 0 to ${max}`)
  }
}

function validateCounts(counts, label, max = 100) {
  assertExactKeys(counts, ['total', 'ready', 'watch', 'blocked'], label)
  for (const key of ['total', 'ready', 'watch', 'blocked']) assertCount(counts?.[key], `${label}.${key}`, max)

  if (
    Number.isInteger(counts?.total) &&
    Number.isInteger(counts?.ready) &&
    Number.isInteger(counts?.watch) &&
    Number.isInteger(counts?.blocked) &&
    counts.ready + counts.watch + counts.blocked !== counts.total
  ) {
    fail(`${label}: ready/watch/blocked counts must add up to total`)
  }
}

function validateProduct(product, expectedId) {
  const label = `products.${expectedId}`
  assertExactKeys(product, ['id', 'label', 'status', 'readiness', 'counts', 'reasonCodes'], label)

  if (product.id !== expectedId) fail(`${label}: id must be ${expectedId}`)
  if (typeof product.label !== 'string' || !/^AdMate [A-Za-z ]+$/.test(product.label)) {
    fail(`${label}: label must be public-safe AdMate text`)
  }
  if (!allowedStatuses.has(product.status)) fail(`${label}: invalid status ${product.status}`)
  if (!allowedReadiness.has(product.readiness)) fail(`${label}: invalid readiness ${product.readiness}`)

  validateCounts(product.counts, `${label}.counts`, 20)

  if (!Array.isArray(product.reasonCodes) || product.reasonCodes.length === 0 || product.reasonCodes.length > 6) {
    fail(`${label}: reasonCodes must contain 1 to 6 entries`)
  } else {
    for (const code of product.reasonCodes) {
      if (!allowedReasonCodes.has(code)) fail(`${label}: invalid reason code ${code}`)
    }
  }
}

function validateManifest(manifest, label) {
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    fail(`${label}: manifest must be an object`)
    return
  }

  assertExactKeys(manifest, allowedTopLevelKeys, label)
  assertPublicSafe(manifest, label)

  if (manifest.contractVersion !== fixedContractVersion) fail(`${label}: contractVersion must be ${fixedContractVersion}`)
  if (manifest.scope !== 'public_static_command_center_readiness') {
    fail(`${label}: scope must be public_static_command_center_readiness`)
  }
  if (!allowedStatuses.has(manifest.status)) fail(`${label}: invalid status ${manifest.status}`)

  assertExactKeys(manifest.products, requiredProductIds, `${label}.products`)
  for (const id of requiredProductIds) validateProduct(manifest.products?.[id], id)

  assertExactKeys(manifest.counts, ['productLanes', 'total', 'ready', 'watch', 'blocked'], `${label}.counts`)
  assertCount(manifest.counts?.productLanes, `${label}.counts.productLanes`, requiredProductIds.length)
  if (manifest.counts?.productLanes !== requiredProductIds.length) {
    fail(`${label}.counts.productLanes: expected ${requiredProductIds.length}`)
  }
  validateCounts(
    {
      total: manifest.counts?.total,
      ready: manifest.counts?.ready,
      watch: manifest.counts?.watch,
      blocked: manifest.counts?.blocked,
    },
    `${label}.counts`,
    100,
  )

  const summed = requiredProductIds.reduce(
    (counts, id) => {
      const productCounts = manifest.products?.[id]?.counts || {}
      counts.total += Number(productCounts.total || 0)
      counts.ready += Number(productCounts.ready || 0)
      counts.watch += Number(productCounts.watch || 0)
      counts.blocked += Number(productCounts.blocked || 0)
      return counts
    },
    { total: 0, ready: 0, watch: 0, blocked: 0 },
  )

  for (const key of ['total', 'ready', 'watch', 'blocked']) {
    if (manifest.counts?.[key] !== summed[key]) {
      fail(`${label}.counts.${key}: expected summed product count ${summed[key]}`)
    }
  }

  assertExactKeys(manifest.safetyFlags, requiredSafetyFlags, `${label}.safetyFlags`)
  for (const flag of requiredSafetyFlags) {
    if (manifest.safetyFlags?.[flag] !== true) fail(`${label}.safetyFlags.${flag}: must be true`)
  }
}

function validatePackageScript() {
  const packageText = read(packagePath)
  const pkg = parseJson(packageText, rel(packagePath))
  if (!pkg) return

  const script = pkg.scripts?.['check:command-center-readiness-manifest']
  if (script !== 'node scripts/check-command-center-readiness-manifest.mjs') {
    fail('package.json: check:command-center-readiness-manifest script is missing or changed')
  }

  const harness = String(pkg.scripts?.['verify:harness'] || '')
  if (!harness.includes('npm run check:command-center-readiness-manifest')) {
    fail('package.json: verify:harness must include check:command-center-readiness-manifest')
  }
}

const manifestText = read(manifestPath)
const fixtureText = read(fixturePath)
const manifestJsonText = extractJsonObjectLiteral(manifestText)
const manifest = manifestJsonText ? parseJson(manifestJsonText, rel(manifestPath)) : null
const fixture = parseJson(fixtureText, rel(fixturePath))

if (manifest) validateManifest(manifest, rel(manifestPath))
if (fixture) validateManifest(fixture, rel(fixturePath))
if (manifest && fixture && JSON.stringify(stable(manifest)) !== JSON.stringify(stable(fixture))) {
  fail('manifest source and fixture must match exactly')
}

if (!manifestText.includes('COMMAND_CENTER_READINESS_MANIFEST_VERSION')) {
  fail(`${rel(manifestPath)}: missing fixed version export`)
}

validatePackageScript()

if (failed) {
  process.exitCode = 1
} else {
  console.log('[check-command-center-readiness-manifest] ok')
}
