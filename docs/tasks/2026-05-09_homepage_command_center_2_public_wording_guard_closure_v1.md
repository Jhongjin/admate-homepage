# Homepage Command Center Public Wording Guard Closure v1

Date: 2026-05-09

## Status

Homepage Command Center public wording guard work is closed for the current scope.

## Completed Work

The previous read-only audit identified public copy that exposed implementation names such as `Openclaw`, `Hermes`, `Agent Core`, `Learning Governance`, `audit log`, and `LLM/API`.

The follow-up implementation removed those public-facing terms from the Command Center UI and fallback data, then added deterministic regression coverage through `scripts/check-command-center-contract.mjs`.

## Current Guard

`npm run check:command-center-contract` now verifies:

- required Command Center product IDs are present in fallback data
- required status values remain represented
- fallback project data does not contain forbidden implementation wording
- public Command Center component files do not contain forbidden implementation wording
- Command Center page metadata does not contain forbidden implementation wording
- live API contract validation remains opt-in only through `COMMAND_CENTER_CONTRACT_LIVE=1`

The checker intentionally does not scan all implementation source for env/header token names. The separate smoke script is responsible for rendered HTML exposure of read-key or env marker names.

## Public Copy State

Current public-safe copy uses neutral wording:

- `최신 운영 데이터`
- `기본 운영 데이터`
- `Workspace Status`
- `AdMate Workspace Status`
- `운영자 확인 이력 연결`

The fallback data no longer exposes the previously flagged `audit log` wording.

## Boundaries Preserved

This work did not:

- call live Command Center APIs
- mutate production data
- read or output secrets/env values
- change product repo dependencies
- add media assets
- change Vercel settings

## Verification

Verified commands:

```text
npm run check:command-center-contract
npm run lint
npm run build
npm run verify:harness
git diff --check -- scripts/check-command-center-contract.mjs src/lib/command-center-data.ts
```

Expected result:

- all commands pass
- live API validation remains skipped by default
- no rendered public copy uses the forbidden internal implementation terms

## Follow-Up

Future live Command Center work should keep these guard boundaries:

- do not expose provider/source system names as public UI labels
- do not expose read-key env names or headers in HTML
- keep live contract checks opt-in
- treat API-backed Command Center data as public copy and run the same wording guard before release
