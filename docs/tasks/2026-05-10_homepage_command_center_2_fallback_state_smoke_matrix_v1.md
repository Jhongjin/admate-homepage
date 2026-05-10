# Homepage Command Center Fallback State Smoke Matrix v1

Date: 2026-05-10

## Status

Docs-only gate for the Homepage Command Center fallback-state smoke matrix.

## Scope

This gate converts the fallback-state contract into a smoke coverage matrix. It does not require product code changes, live API calls, environment reads, secret handling, asset changes, or production data access.

## Contract Basis

Source contract: `docs/tasks/2026-05-10_homepage_command_center_1_fallback_state_contract_v1.md`

The smoke matrix must preserve these boundaries:

- public homepage rendering must work without a live Command Center dependency
- fallback, loading, error, and empty states must use neutral public copy
- rendered output must not expose backend, provider, endpoint, read-key, env, payload, or debug details
- live-backed behavior remains opt-in and separate from default public fallback smoke coverage

## Smoke Matrix

| State | Trigger for smoke coverage | Expected public copy direction | Required no-live behavior | Forbidden exposure markers |
| --- | --- | --- | --- | --- |
| Fallback | Live mode is disabled or no live configuration is present. | Show the Command Center as intentional product content. Source labels may use `기본 운영 데이터` or equivalent approved public wording. | Page renders complete summary, workspace status, and project rows from fallback data. No live fetch is required for smoke success. | Provider names, internal system names, env var names, read-key header names, endpoint strings, raw event payloads, stack traces, or exception text. |
| Loading | A future UI path is preparing public status content. | Use calm preparation copy such as `운영 상태를 준비하고 있습니다.` or `최신 상태를 확인하는 중입니다.` | Loading state must not block the existence of a fallback-renderable page shell. Smoke checks should not require a live response to clear loading. | Provider names, route names, request headers, read-key labels, queue/job names, internal monitor labels, or wording that says live data is required for public rendering. |
| Error | A future live-backed request fails or returns unusable data. | Explain that a safe default is shown, for example `기본 운영 데이터로 표시하고 있습니다.` or `일부 최신 상태를 불러오지 못해 기본 상태를 표시합니다.` | Error path degrades to fallback content and remains a successful public render. Smoke checks may assert that implementation error details are absent. | Exception messages, HTTP response bodies, status-body dumps, stack traces, endpoint names, env names, secrets, tokens, read-key headers, raw JSON, incident-routing or ownership details. |
| Empty | A future data source returns no public project/status rows. | Explain absence without implementation details, for example `표시할 운영 항목이 아직 없습니다.` or `현재 공개할 상태 항목이 없습니다.` | Empty state must render public-safe structure without requiring a live dependency or exposing collection internals. If fallback data is available, fallback remains the safer default. | Database, table, collection, stream, topic, event schema, provider, audit, learning, automation, secret, endpoint, or configuration instructions. |

## Expected Public Copy

Approved public-safe wording direction:

- `기본 운영 데이터`
- `최신 운영 데이터`
- `운영 상태를 준비하고 있습니다.`
- `최신 상태를 확인하는 중입니다.`
- `기본 운영 데이터로 표시하고 있습니다.`
- `일부 최신 상태를 불러오지 못해 기본 상태를 표시합니다.`
- `표시할 운영 항목이 아직 없습니다.`
- `현재 공개할 상태 항목이 없습니다.`

Copy should read as product status content, not as an engineering diagnostic. It may describe visible operational status, progress, ownership, milestones, and review state when phrased as public product language.

## Forbidden Exposure Markers

Default fallback smoke coverage should fail if rendered public output exposes any of these categories:

- secret-like values, tokens, keys, or read-key values
- env var names or env-like prefixes such as `COMMAND_CENTER_`, `ADMATE_COMMAND_CENTER_`, `OPENCLAW_`, or `ADMATE_OPENCLAW_`
- read-key header names such as `x-admate-command-center-read-key`
- endpoint, route, service, provider, monitor, agent, audit, queue, job, stream, topic, or database implementation labels
- raw API responses, raw event payloads, raw JSON error bodies, stack traces, or exception messages
- internal product architecture labels already blocked by the wording guard, including `Openclaw`, `Hermes`, `Agent Core`, `Learning Governance`, `operator log`, `audit log`, and `LLM/API`

## No Live Dependency

The smoke matrix is valid only if the default verification path is fallback-first.

- Default smoke checks must not call live Command Center services.
- Default smoke checks must not require endpoint or read-key configuration.
- Default smoke checks must not read or print secrets.
- Remote or live smoke targets must remain explicitly opted in and separate from this public fallback gate.
- Live availability must not loosen public wording or exposure rules.

## Verification Plan

Docs-only verification for this gate:

```text
git diff --check -- docs/tasks/2026-05-10_homepage_command_center_2_fallback_state_smoke_matrix_v1.md
npm run check:command-center-contract
```

Expected result:

- markdown diff has no whitespace errors
- existing Command Center contract checks pass
- live API validation remains skipped by default
- no product code, environment, secret, live API, or asset changes are required

Optional future smoke expansion, only after an implementation gate is approved:

- render fallback state from local bundled data
- simulate loading, error, and empty public states without live network access
- assert approved public copy appears for each state
- assert forbidden exposure markers do not appear in rendered HTML

## Next Gate

Recommended next gate: fallback-state smoke implementation plan.

Suggested scope:

- define how to simulate fallback, loading, error, and empty states locally
- keep default smoke execution offline and fallback-only
- add rendered HTML assertions for approved public copy and forbidden exposure markers
- keep live API smoke checks opt-in and outside the default public fallback matrix
