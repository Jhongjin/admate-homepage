const target = process.env.COMMAND_CENTER_SMOKE_URL || 'http://127.0.0.1:3000/command-center'
const allowRemoteSmoke = process.env.COMMAND_CENTER_SMOKE_ALLOW_REMOTE === '1'
const stateArg = process.argv.find((arg) => arg.startsWith('--state='))
const requestedState = stateArg ? stateArg.split('=')[1] : 'fallback'
const allowedStates = new Set(['fallback', 'loading', 'error', 'empty', 'all'])

const approvedCopy = {
  fallback: [/기본 운영 데이터/],
  loading: [/운영 상태를 준비하고 있습니다\.|최신 상태를 확인하는 중입니다\./],
  error: [/기본 운영 데이터로 표시하고 있습니다\.|일부 최신 상태를 불러오지 못해 기본 상태를 표시합니다\./],
  empty: [/표시할 운영 항목이 아직 없습니다\.|현재 공개할 상태 항목이 없습니다\./],
}

const localStateText = {
  loading: '<main><h1>AdMate Command Center</h1><p>운영 상태를 준비하고 있습니다.</p></main>',
  error: '<main><h1>AdMate Command Center</h1><p>기본 운영 데이터로 표시하고 있습니다.</p></main>',
  empty: '<main><h1>AdMate Command Center</h1><p>표시할 운영 항목이 아직 없습니다.</p></main>',
}

const forbiddenRenderedPatterns = [
  /COMMAND_CENTER_/i,
  /ADMATE_COMMAND_CENTER_/i,
  /OPENCLAW_/i,
  /ADMATE_OPENCLAW_/i,
  /x-admate-command-center-read-key/i,
  /Openclaw/i,
  /Hermes/i,
  /Agent Core/i,
  /Learning Governance/i,
  /operator log/i,
  /audit log/i,
  /LLM\/API/i,
  /stack trace/i,
  /SyntaxError/i,
  /TypeError/i,
  /Unhandled/i,
  /fetch failed/i,
  /token/i,
  /secret/i,
]

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

function assertLooksLikeCommandCenter(text, label) {
  if (!/AdMate Command Center|Command Center|AdMate/.test(text)) {
    fail(`${label}: response does not look like Command Center HTML`)
  }
}

function assertApprovedCopy(text, state) {
  const patterns = approvedCopy[state] || []
  if (patterns.length > 0 && !patterns.some((pattern) => pattern.test(text))) {
    fail(`${state}: approved public copy not found`)
  }
}

function assertNoForbiddenMarkers(text, label) {
  for (const pattern of forbiddenRenderedPatterns) {
    if (pattern.test(text)) {
      fail(`${label}: rendered output contains forbidden marker ${pattern}`)
    }
  }
}

async function checkFallback() {
  if (!allowRemoteSmoke && !isLocalTarget(target)) {
    fail('remote smoke target blocked by default (set COMMAND_CENTER_SMOKE_ALLOW_REMOTE=1 to opt in)')
    return
  }

  const response = await fetch(target, { cache: 'no-store' })
  const text = await response.text()

  if (response.status !== 200) fail(`fallback: expected status 200, got ${response.status}`)
  assertLooksLikeCommandCenter(text, 'fallback')
  assertApprovedCopy(text, 'fallback')
  assertNoForbiddenMarkers(text, 'fallback')
}

function checkLocalState(state) {
  const text = localStateText[state]
  if (!text) {
    fail(`unsupported local state ${state}`)
    return
  }

  assertLooksLikeCommandCenter(text, state)
  assertApprovedCopy(text, state)
  assertNoForbiddenMarkers(text, state)
}

try {
  if (!allowedStates.has(requestedState)) {
    fail(`unsupported state ${requestedState}`)
    process.exit(1)
  }

  if (requestedState === 'all') {
    await checkFallback()
    for (const state of ['loading', 'error', 'empty']) checkLocalState(state)
  } else if (requestedState === 'fallback') {
    await checkFallback()
  } else {
    checkLocalState(requestedState)
  }

  if (!process.exitCode) console.log(`[smoke-command-center] ok state=${requestedState} target=${target}`)
} catch (error) {
  fail(`request failed: ${error.message}`)
}
