const target = process.env.COMMAND_CENTER_SMOKE_URL || 'http://127.0.0.1:3000/command-center'
const allowRemoteSmoke = process.env.COMMAND_CENTER_SMOKE_ALLOW_REMOTE === '1'

function isLocalTarget(value) {
  try {
    const url = new URL(value)
    return ['127.0.0.1', 'localhost', '::1', '[::1]'].includes(url.hostname)
  } catch {
    return false
  }
}

function fail(message) {
  console.error(`[smoke-command-center] ${message}`)
  process.exitCode = 1
}

try {
  if (!allowRemoteSmoke && !isLocalTarget(target)) {
    fail('remote smoke target blocked by default (set COMMAND_CENTER_SMOKE_ALLOW_REMOTE=1 to opt in)')
    process.exit(1)
  }

  const response = await fetch(target, { cache: 'no-store' })
  const text = await response.text()

  if (response.status !== 200) fail(`expected status 200, got ${response.status}`)
  if (!/AdMate Command Center|Command Center|AdMate/.test(text)) {
    fail('response does not look like Command Center HTML')
  }
  if (/COMMAND_CENTER_(?:API_URL|READ_KEY|LIVE_DATA|CONTRACT_LIVE|SMOKE_URL|SMOKE_ALLOW_REMOTE)|ADMATE_COMMAND_CENTER_READ_KEY|OPENCLAW_MONITOR_URL|ADMATE_OPENCLAW_MONITOR_URL|x-admate-command-center-read-key/i.test(text)) {
    fail('response appears to expose command center env or read key names')
  }

  if (!process.exitCode) console.log(`[smoke-command-center] ok ${target}`)
} catch (error) {
  fail(`request failed: ${error.message}`)
}
