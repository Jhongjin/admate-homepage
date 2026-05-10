# Homepage Command Center Fallback State Contract v1

Date: 2026-05-10

## Status

Docs-only gate for the Homepage Command Center fallback, loading, error, and empty state contract.

## Scope

This gate defines public-facing state boundaries only. It does not require product code changes, live API validation, environment reads, secret handling, UI asset changes, or production data access.

## Contract Boundaries

- Command Center must have a complete fallback-only presentation path for public homepage rendering.
- Public homepage rendering must not depend on a live Command Center service being available.
- Fallback data may describe product-facing operational status, but must not expose provider names, internal system names, read-key names, headers, endpoint names, raw event payloads, or secret-adjacent identifiers.
- Loading, error, and empty states must use neutral public copy and avoid implementation explanations.
- Any future live-backed Command Center behavior remains opt-in for verification and must degrade to the fallback contract without changing the public safety posture.

## Fallback-Only States

Fallback-only behavior is the safe default for public rendering.

- The page can render a complete Command Center section from static or bundled fallback data.
- Fallback copy should read as intentional product content, not as a degraded engineering notice.
- Source labels should stay neutral, for example `기본 운영 데이터` or equivalent approved public wording.
- Fallback status, metrics, project rows, and summaries must use public-safe product language.
- Fallback rendering must not disclose whether a live provider, read key, or internal monitor is configured.

## Loading Copy Boundary

Loading copy may communicate that public status content is being prepared, but must not name backend systems or request details.

Allowed direction:

- `운영 상태를 준비하고 있습니다.`
- `최신 상태를 확인하는 중입니다.`

Disallowed direction:

- live provider names
- endpoint, route, env, header, or read-key names
- queue, job, raw event, or internal monitor details
- claims that imply live data is required before the homepage can render safely

## Error Copy Boundary

Error copy must be calm, recoverable, and public-safe.

Allowed direction:

- `기본 운영 데이터로 표시하고 있습니다.`
- `일부 최신 상태를 불러오지 못해 기본 상태를 표시합니다.`

Disallowed direction:

- exception text
- response status bodies
- stack traces
- raw API payload excerpts
- secret, key, token, header, env, or endpoint names
- internal ownership or incident routing details

## Empty Copy Boundary

Empty copy must explain absence without exposing collection or event internals.

Allowed direction:

- `표시할 운영 항목이 아직 없습니다.`
- `현재 공개할 상태 항목이 없습니다.`

Disallowed direction:

- raw event schema names
- database table, collection, stream, or topic names
- internal audit, learning, automation, or provider implementation labels
- instructions to configure secrets or connect live services

## No Live Dependency

The homepage Command Center contract must remain valid when no live Command Center service is configured.

- Public rendering should not require live API calls.
- Tests and smoke checks should default to fallback-only unless a dedicated live-contract job explicitly opts in.
- Live contract checks, if added later, must not be required for basic homepage verification.
- Live availability must not change whether forbidden implementation wording is allowed in rendered output.

## Exposure Guard

Public rendered output must not expose:

- secrets, read keys, tokens, or secret-like values
- env var names or read-key header names
- raw event payloads
- raw API response bodies
- internal provider, monitor, agent, audit, or engine implementation names unless explicitly approved as public product language
- stack traces or debug metadata

## Verification Plan

Docs-only verification for this gate:

```text
git diff --check -- docs/tasks/2026-05-10_homepage_command_center_1_fallback_state_contract_v1.md
npm run check:command-center-contract
```

Expected result:

- the markdown diff has no whitespace errors
- existing Command Center contract checks pass
- live API validation remains skipped unless explicitly opted in
- no product code, environment, secret, live API, or asset changes are required by this gate

## Next Gate Suggestion

Recommended next gate: fallback-state smoke matrix.

Suggested scope:

- verify fallback rendering with no live Command Center dependency
- assert loading, error, and empty public copy stays inside this contract
- confirm rendered HTML does not expose env names, read-key header names, raw payloads, or internal provider/source labels
- keep live API checks opt-in and separate from public fallback smoke coverage
