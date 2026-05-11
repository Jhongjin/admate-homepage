# Homepage Command Center Fallback Smoke Contract Recap v1

Date: 2026-05-11
Status: docs-only recap
Scope: Command Center fallback/live API boundary and smoke handoff

## Purpose

Summarize the safe operating boundary for Homepage Command Center fallback
rendering, local smoke coverage, and remote post-deploy smoke lessons.

This document is a queue-safe recap only. It does not require production calls,
live API access, credentials, provider access, screenshots, assets, code edits,
environment edits, or deployment changes.

## Boundary Summary

The public Command Center must remain renderable from fallback data without a
live Command Center API.

The safe default is:

- render the public dashboard from bundled fallback data
- use neutral public copy for loading, error, empty, and fallback states
- keep live Command Center validation skipped unless a separate gate explicitly
  opts in
- avoid exposing env names, read-key names, headers, endpoint names, raw
  payloads, stack traces, provider internals, or secret-adjacent identifiers
- treat `admate-agent-core` as the future source of truth for Auth, DB, API,
  and live Command Center ownership

The public fallback marker used by prior smoke checks is:

```text
기본 운영 데이터
```

That marker is acceptable as public product-facing wording. It must not be
expanded into implementation details about why fallback data is being used.

## Live API Boundary

Live Command Center API validation is not part of the default homepage safety
contract.

Allowed by default:

- local fallback contract checks
- local synthetic state smoke for loading, error, and empty states
- static inspection for forbidden public markers
- public route availability checks only when separately approved

Not allowed by default:

- read-key usage
- endpoint environment usage or readback
- live API opt-in
- authenticated or admin flows
- production payload inspection
- provider, Slack, n8n, DB, or external system calls
- TLS bypasses or credential workarounds

If live API verification is needed later, it should be a separate human-approved
gate with explicit scope, target, credential handling rules, and sanitized
reporting.

## Remote Post-Deploy Smoke Lessons

The earlier approved remote fallback smoke established a useful pattern:

- verify only the public fallback behavior
- record sanitized status, fallback-marker presence, and forbidden-marker
  absence
- avoid storing raw HTML, headers, cookies, tokens, read keys, endpoint env
  values, or production event payloads
- keep live API validation skipped unless explicitly enabled
- treat local Node TLS trust-chain failures separately from public route
  availability when an OS-backed request succeeds
- do not disable TLS validation to force a script pass

The important lesson is that remote smoke can confirm public fallback safety, but
it cannot prove live API correctness without credentials and explicit opt-in.

## Checks Available Without Credentials

These checks are safe without credentials when run locally:

- `git diff --check -- docs/tasks/<doc-name>.md`
- `npm run check:command-center-contract`
- `npm run verify:harness`
- `node scripts/smoke-command-center.mjs --state=loading`
- `node scripts/smoke-command-center.mjs --state=error`
- `node scripts/smoke-command-center.mjs --state=empty`
- focused scan of the changed doc for secret-like strings when no
  `check:secrets` script exists

These checks should not require production API calls, screenshots, live provider
calls, Slack/n8n calls, or environment mutation.

## Human-Gated Items

The following remain human-gated:

- production or remote route smoke
- live Command Center API validation
- any use of read keys, tokens, cookies, sessions, signed URLs, or credentials
- environment variable readback or updates
- provider, Slack, n8n, DB, API, or admin-system calls
- deployment, routing, Vercel project, or domain changes
- screenshots, visual captures, or asset updates
- Auth/DB/API contract changes owned outside the homepage fallback layer

## Recap Verdict

The Homepage Command Center contract is safe when fallback rendering is treated
as the default public path and live API validation remains a separate opt-in
gate.

This recap performed no production calls and changed no code, API, environment,
asset, provider, or deployment surface.
