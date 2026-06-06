import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const packagePath = path.join(root, 'package.json')
const rel = (file) => path.relative(root, file).replaceAll(path.sep, '/')

const includedScripts = [
  'check:homepage-public-copy',
  'check:command-center-contract',
  'check:command-center-readiness-manifest',
  'check:command-center-static',
  'check:command-center-fixture',
  'check:command-center-responsive',
  'check:access-request-policy',
]

const excludedScripts = [
  'smoke:command-center',
  'smoke:command-center:states',
  'dev',
  'start',
  'build',
]

const excludedCapabilities = [
  'live Command Center data',
  'remote smoke',
  'env/read-key use',
  'production API/readback',
  'authenticated UI smoke',
  'publish',
  'persist',
  'promote',
  'apply',
]

const expectedScripts = {
  'check:homepage-public-copy': 'node scripts/check-homepage-public-copy.mjs',
  'check:command-center-contract': 'node scripts/check-command-center-contract.mjs',
  'check:command-center-readiness-manifest': 'node scripts/check-command-center-readiness-manifest.mjs',
  'check:command-center-static': 'node scripts/check-command-center-static.mjs',
  'check:command-center-fixture': 'node scripts/check-command-center-fixture.mjs',
  'check:command-center-responsive': 'node scripts/check-command-center-responsive.mjs',
  'check:access-request-policy': 'node scripts/check-access-request-policy.mjs',
  'check:homepage-prelaunch-static-contracts': 'node scripts/check-homepage-prelaunch-static-contracts.mjs',
  'verify:prelaunch-local': 'node scripts/check-homepage-prelaunch-static-contracts.mjs',
}

const forbiddenCommandPatterns = [
  /\bnpm\s+run\s+(?:smoke:command-center(?::states)?|dev|start|build)\b/,
  /\b(?:next\s+(?:dev|start|build)|vercel|curl|wget)\b/,
  /\b(?:publish|persist|promote|apply)\b/i,
  /\b(?:COMMAND_CENTER_|ADMATE_COMMAND_CENTER_|READ_KEY|API_URL|process\.env)\b/,
  /https?:\/\//i,
]

let failed = false

function fail(message) {
  console.error(`[check-homepage-prelaunch-static-contracts] ${message}`)
  failed = true
}

function readJson(file) {
  if (!fs.existsSync(file)) {
    fail(`missing ${rel(file)}`)
    return null
  }

  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (error) {
    fail(`${rel(file)}: invalid JSON (${error.message})`)
    return null
  }
}

function assertUnique(values, label) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index)
  if (duplicates.length > 0) fail(`${label}: duplicate entries ${[...new Set(duplicates)].join(', ')}`)
}

function assertPackageWiring(pkg) {
  const scripts = pkg?.scripts || {}

  assertUnique(includedScripts, 'includedScripts')
  assertUnique(excludedScripts, 'excludedScripts')
  assertUnique(excludedCapabilities, 'excludedCapabilities')

  for (const script of includedScripts) {
    if (excludedScripts.includes(script)) fail(`script cannot be both included and excluded: ${script}`)
  }

  for (const [script, expected] of Object.entries(expectedScripts)) {
    if (scripts[script] !== expected) {
      fail(`package.json: ${script} must be "${expected}"`)
    }
  }

  for (const script of includedScripts) {
    const command = String(scripts[script] || '')
    for (const pattern of forbiddenCommandPatterns) {
      if (pattern.test(command)) fail(`package.json: ${script} command crosses static boundary: ${pattern}`)
    }
  }

  const aggregateCommand = String(scripts['check:homepage-prelaunch-static-contracts'] || '')
  const verifyCommand = String(scripts['verify:prelaunch-local'] || '')
  if (forbiddenCommandPatterns.some((pattern) => pattern.test(aggregateCommand) || pattern.test(verifyCommand))) {
    fail('package.json: aggregate aliases must stay local/static only')
  }
}

function commandToScriptFile(script, command) {
  const match = command.match(/^node\s+(scripts\/[a-z0-9-]+\.mjs)$/i)
  if (!match) {
    fail(`package.json: ${script} must be a direct node script command`)
    return null
  }

  const file = path.join(root, ...match[1].split('/'))
  if (!fs.existsSync(file)) fail(`missing ${rel(file)}`)
  return file
}

function runIncludedScript(script, command) {
  const file = commandToScriptFile(script, command)
  if (!file) return 1

  console.log(`[check-homepage-prelaunch-static-contracts] running ${script}`)
  const result = spawnSync(process.execPath, [file], {
    cwd: root,
    env: { NODE_ENV: 'test' },
    stdio: 'inherit',
  })

  if (result.error) {
    console.error(`[check-homepage-prelaunch-static-contracts] ${script} failed to start: ${result.error.message}`)
    return 1
  }

  return result.status ?? 1
}

const pkg = readJson(packagePath)
if (pkg) assertPackageWiring(pkg)

if (!failed && pkg) {
  console.log(`[check-homepage-prelaunch-static-contracts] included: ${includedScripts.join(', ')}`)
  console.log(`[check-homepage-prelaunch-static-contracts] excluded scripts: ${excludedScripts.join(', ')}`)
  console.log(`[check-homepage-prelaunch-static-contracts] excluded capabilities: ${excludedCapabilities.join(', ')}`)

  for (const script of includedScripts) {
    const status = runIncludedScript(script, pkg.scripts[script])
    if (status !== 0) {
      fail(`${script} failed with exit code ${status}`)
      break
    }
  }
}

if (failed) {
  process.exitCode = 1
} else {
  console.log('[check-homepage-prelaunch-static-contracts] ok')
}
