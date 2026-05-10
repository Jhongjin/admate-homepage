# Homepage Command Center 5 Fallback Smoke Post-Deploy Plan v1

Date: 2026-05-10
Status: planned
Scope: post-deploy verification plan for Command Center fallback-state smoke

## Purpose

The fallback-state smoke harness has been implemented locally. This plan defines
the post-deploy verification boundary without enabling live Command Center API
checks by default.

## Current State

Implemented offline coverage:

- fallback page smoke
- loading state synthetic smoke
- error state synthetic smoke
- empty state synthetic smoke
- forbidden public marker checks
- remote smoke blocked unless explicitly opted in

The smoke harness remains fallback-first and does not require endpoint or
read-key environment values.

## Post-Deploy Goals

Confirm after deployment that:

- the deployed Homepage still renders public Command Center fallback copy safely
- synthetic fallback-state smoke coverage remains represented in the repo
- live Command Center API checks remain opt-in only
- public responses do not expose internal environment names, read-key headers,
  stack traces, secret/token wording, or raw event payloads

## Allowed Checks

Allowed without additional approval:

- verify latest commit is on the target branch
- inspect deployment metadata if available without reading env values
- run local harness commands against local code
- run fallback-only remote smoke if the target URL is explicitly confirmed and
  no read-key/live API variables are used

## Separate Approval Required

Separate approval is required for:

- `COMMAND_CENTER_SMOKE_ALLOW_REMOTE=1`
- live Command Center API smoke
- any read-key or endpoint environment usage
- production event payload inspection
- production authenticated/admin flow
- changing Vercel environment variables
- changing production routing or domains

## Proposed Verification Commands

Local-only verification:

```text
npm run check:command-center-contract
npm run smoke:command-center:states
npm run verify:harness
npm run build
```

Remote fallback-only verification, only if explicitly approved:

```text
COMMAND_CENTER_SMOKE_ALLOW_REMOTE=1 node scripts/smoke-command-center.mjs --url=<confirmed-homepage-url> --state=fallback
```

Do not run remote `--state=all` unless the script behavior is confirmed to avoid
live API or secret-dependent paths.

## Forbidden Output Markers

Fail the post-deploy smoke if public output contains:

- environment variable names
- read-key header names
- implementation-only labels
- stack trace or uncaught error markers
- secret or token wording
- raw event payloads
- internal endpoint details

## Evidence To Record

Record only sanitized evidence:

- deployment target
- branch and commit
- command names
- pass/fail summary
- fallback page status
- forbidden marker scan result
- whether remote smoke was skipped or explicitly approved

Do not record:

- env values
- read keys
- request headers
- raw event payloads
- production logs containing sensitive context

## Stop Conditions

Stop immediately if:

- remote smoke requires a secret/read-key value
- live Command Center API access is needed
- production event payloads need to be inspected
- public output includes a forbidden marker
- the deployment target cannot be confirmed

## Next Gate

Recommended next gate:

`Homepage-Command-Center-6 Fallback Smoke Post-Deploy Result`

That gate should execute only the approved subset of this plan and keep live API
validation separate from fallback-state coverage.
