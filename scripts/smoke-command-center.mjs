const target = process.env.COMMAND_CENTER_SMOKE_URL || 'http://127.0.0.1:3000/command-center'

function fail(message) {
  console.error(`[smoke-command-center] ${message}`)
  process.exitCode = 1
}

try {
  const response = await fetch(target, { cache: 'no-store' })
  const text = await response.text()

  if (response.status !== 200) fail(`expected status 200, got ${response.status}`)
  if (!/AdMate Command Center|Command Center|AdMate/.test(text)) {
    fail('response does not look like Command Center HTML')
  }
  if (/COMMAND_CENTER_READ_KEY|ADMATE_COMMAND_CENTER_READ_KEY|x-admate-command-center-read-key/i.test(text)) {
    fail('response appears to expose command center read key names')
  }

  if (!process.exitCode) console.log(`[smoke-command-center] ok ${target}`)
} catch (error) {
  fail(`request failed: ${error.message}`)
}
