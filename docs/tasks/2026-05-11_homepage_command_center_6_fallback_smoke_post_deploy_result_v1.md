# Homepage Command Center 6 Fallback Smoke Post-Deploy Result v1

Date: 2026-05-11
Status: pass with noted local Node TLS limitation
Scope: approved remote fallback-only smoke for deployed Homepage Command Center

## Approval

The operator approved:

```text
Homepage remote post-deploy smoke: 배포 URL/원격 smoke 승인 한다
```

This approval was limited to the remote fallback-only smoke described in
`docs/tasks/2026-05-10_homepage_command_center_5_fallback_smoke_post_deploy_plan_v1.md`.

## Target

Target:

```text
https://home.admate.ai.kr/command-center
```

Source of target:

- `src/lib/admate-content.ts`
- `officialLinks.commandCenter`

Repository state:

```text
branch: main
HEAD: db628d8
```

## Remote Fallback Smoke Result

Remote fallback smoke was executed without read-key values, endpoint values,
live API opt-in, authentication, production payload inspection, or environment
variable readback.

PowerShell HTTPS request result:

```text
status: 200
fallback copy: found
forbidden marker scan: none
```

The public response contained the approved fallback copy marker:

```text
기본 운영 데이터
```

The sanitized marker scan did not find:

- Command Center environment variable names
- read-key header names
- Openclaw environment markers
- token or secret wording
- stack trace markers
- unhandled error markers
- fetch failure markers

No raw HTML payload, request headers, cookies, tokens, read keys, endpoint env
values, or production event payloads were recorded.

## Script Behavior Note

The repo smoke script command was attempted with the approved remote target:

```text
COMMAND_CENTER_SMOKE_ALLOW_REMOTE=1
COMMAND_CENTER_SMOKE_URL=https://home.admate.ai.kr/command-center
node scripts/smoke-command-center.mjs --state=fallback
```

The script did not complete because local Node/undici HTTPS validation reported:

```text
SELF_SIGNED_CERT_IN_CHAIN
```

This was treated as a local TLS trust-chain limitation in the Node runtime, not
as a public page failure, because the same target returned `200` through the
OS-backed PowerShell request.

TLS verification was not disabled. The smoke did not use
`NODE_TLS_REJECT_UNAUTHORIZED=0` or any equivalent bypass.

## Local Synthetic State Checks

The synthetic non-network state checks still pass:

```text
node scripts/smoke-command-center.mjs --state=loading
node scripts/smoke-command-center.mjs --state=error
node scripts/smoke-command-center.mjs --state=empty
```

Result:

```text
loading: pass
error: pass
empty: pass
```

## Local Contract And Build Checks

Checks run:

```text
npm run check:command-center-contract
npm run verify:harness
npm run build
```

Results:

```text
check:command-center-contract: pass
verify:harness: pass
build: pass
```

The contract check kept live Command Center API validation skipped, as intended.

## No-Touch Confirmation

This gate did not perform:

- live Command Center API smoke
- read-key usage
- endpoint environment usage
- production event payload inspection
- authentication
- admin flow
- environment variable changes
- Vercel routing or domain changes
- code changes
- dependency changes
- DB or API mutations
- commit before this result document

## Final Verdict

Decision: PASS

The deployed public Command Center route renders the fallback page safely at the
approved production target. Live API validation remains a separate opt-in gate.
