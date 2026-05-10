# Homepage Command Center Fallback Smoke Implementation Plan v1

Date: 2026-05-10

## Status

Docs-only gate for the Homepage Command Center fallback-state smoke implementation plan.

## Scope

This gate defines the next implementation plan only. It does not change product code, call live APIs, read or add environment variables, handle secrets, or add assets.

## Contract Basis

Source contract:

- `docs/tasks/2026-05-10_homepage_command_center_1_fallback_state_contract_v1.md`
- `docs/tasks/2026-05-10_homepage_command_center_2_fallback_state_smoke_matrix_v1.md`

The implementation must preserve these boundaries:

- default smoke coverage is offline, local, and fallback-first
- public homepage rendering must not require a live Command Center service
- fallback, loading, error, and empty states use neutral approved public copy
- rendered HTML/text must not expose env names, read-key header names, endpoint strings, raw payloads, stack traces, provider names, or internal implementation labels
- live API or remote smoke behavior remains explicit opt-in and outside the default fallback smoke path

## Test Candidate Files

Candidate implementation files for the next code gate:

- `scripts/smoke-command-center.mjs`
- `scripts/check-command-center-contract.mjs`
- `src/lib/command-center-data.ts`
- `src/components/command-center/CommandCenterPage.tsx`
- `src/components/command-center/SummaryCards.tsx`
- `src/components/command-center/ProjectProgressCard.tsx`
- `src/components/command-center/StatusBadge.tsx`
- `src/app/command-center/page.tsx`

Preferred first target: extend `scripts/smoke-command-center.mjs` because it already validates rendered HTML and blocks remote smoke targets by default. Component and data files should only change if the smoke harness needs explicit local state injection points that do not exist yet.

## Local State Simulation Plan

The smoke implementation should simulate states locally without live network access.

| State | Local simulation approach | Expected render behavior |
| --- | --- | --- |
| Fallback | Start the local app without live mode enabled and request `/command-center`, or render the page/component with bundled `commandCenterData`. | Full Command Center section renders from fallback data with `기본 운영 데이터` or approved equivalent public wording. |
| Loading | Use a local-only test fixture or component prop to render the future loading copy without waiting on network. If no loading path exists yet, add the smallest isolated render hook in the next implementation gate. | Page shell remains public-safe and includes `운영 상태를 준비하고 있습니다.` or `최신 상태를 확인하는 중입니다.` |
| Error | Use a local fixture that represents a failed live-backed read while forcing fallback data as the visible result. Do not trigger a real failed request. | Render succeeds and includes `기본 운영 데이터로 표시하고 있습니다.` or `일부 최신 상태를 불러오지 못해 기본 상태를 표시합니다.` without exception details. |
| Empty | Render with a local data fixture whose public rows are empty, or a component prop that exercises the empty branch. | Public-safe empty structure renders with `표시할 운영 항목이 아직 없습니다.` or `현재 공개할 상태 항목이 없습니다.` |

Simulation should be deterministic. It should not depend on clock time, remote availability, configured endpoints, read keys, or production data.

## Offline Default

Default smoke execution must stay no-live:

- keep `COMMAND_CENTER_SMOKE_ALLOW_REMOTE=1` as the only remote smoke opt-in
- do not require `COMMAND_CENTER_API_URL`, `COMMAND_CENTER_READ_KEY`, `ADMATE_COMMAND_CENTER_READ_KEY`, `OPENCLAW_MONITOR_URL`, or `ADMATE_OPENCLAW_MONITOR_URL`
- do not set `COMMAND_CENTER_LIVE_DATA=1` in default smoke instructions
- do not print env values or secret-like configuration in success or failure output
- treat live contract checks as separate from fallback-state smoke coverage

If a future smoke command needs a state selector, prefer local-only names such as `--state=fallback`, `--state=loading`, `--state=error`, and `--state=empty`. The selector should choose fixtures, not live service behavior.

## HTML and Text Assertions

Default smoke should assert both required approved copy and forbidden markers against rendered HTML/text.

Required approved copy candidates:

- fallback: `기본 운영 데이터`
- loading: `운영 상태를 준비하고 있습니다.` or `최신 상태를 확인하는 중입니다.`
- error: `기본 운영 데이터로 표시하고 있습니다.` or `일부 최신 상태를 불러오지 못해 기본 상태를 표시합니다.`
- empty: `표시할 운영 항목이 아직 없습니다.` or `현재 공개할 상태 항목이 없습니다.`

The fallback smoke should also keep the current broad page identity assertion for `AdMate Command Center` or equivalent page identity text.

Forbidden marker assertions should fail rendered HTML/text if any of these appear:

- env-like prefixes: `COMMAND_CENTER_`, `ADMATE_COMMAND_CENTER_`, `OPENCLAW_`, `ADMATE_OPENCLAW_`
- read-key header names: `x-admate-command-center-read-key`
- internal implementation labels: `Openclaw`, `Hermes`, `Agent Core`, `Learning Governance`, `operator log`, `audit log`, `LLM/API`
- raw implementation/error markers: `stack trace`, `Error:`, `SyntaxError`, `TypeError`, `Unhandled`, `fetch failed`, raw JSON error bodies, endpoint URLs, route names, provider names, queue/job/stream/topic/database labels, tokens, keys, or secret-like values

Assertions should run on the final rendered output, not only on source files. Source-level contract checks remain useful but are not a substitute for rendered HTML coverage.

## Implementation Sequence for Next Code Gate

1. Add a local state fixture path to the smoke harness, starting in `scripts/smoke-command-center.mjs`.
2. Preserve the existing local-target guard for URL-based smoke checks.
3. Add helper assertions for approved copy and forbidden markers.
4. Exercise fallback first against `/command-center` with no live env required.
5. Add loading, error, and empty fixture checks only through local state simulation.
6. Keep live or remote checks opt-in and separate from the default command.
7. Run the contract checker and smoke command after implementation.

## Verification Plan

Docs-only verification for this gate:

```text
git diff --check -- docs/tasks/2026-05-10_homepage_command_center_3_fallback_smoke_implementation_plan_v1.md
npm run check:command-center-contract
```

Expected result:

- markdown diff has no whitespace errors
- existing Command Center contract checks pass
- live API validation remains skipped by default
- no product code, environment, secret, live API, or asset changes are required

## Next Gate

Recommended next gate: fallback-state smoke implementation.

Suggested scope:

- update `scripts/smoke-command-center.mjs` to support local fallback/loading/error/empty checks
- add rendered HTML/text assertions for approved public copy
- add rendered HTML/text assertions for forbidden exposure markers
- preserve offline/no-live default behavior
- keep live API and remote smoke coverage opt-in only
