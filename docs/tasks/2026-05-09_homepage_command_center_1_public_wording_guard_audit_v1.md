# Homepage-CommandCenter-1 Public Wording/Guard Audit

Date: 2026-05-09
Scope: Read-only audit for Homepage-CommandCenter-1 public wording and guard posture.

## Forbidden Boundaries

- No `.env` reads.
- No live Command Center or API calls.
- No production calls.
- No secrets.
- No product data mutation.

## Files Inspected

- `src/components/command-center/CommandCenterPage.tsx`
- `src/lib/command-center-data.ts`
- `scripts/check-command-center-contract.mjs`
- `scripts/smoke-command-center.mjs`
- `.ai/TASKS.md`

## Findings

### Public Wording Risks

- `CommandCenterPage.tsx` exposes internal platform names directly in public UI:
  - `Openclaw live` source label.
  - Engine badges: `Openclaw`, `Hermes`, `Audit`, `Automation`, `Learning Governance`.
  - `Agent Core Foundation` section label.
- `command-center-data.ts` uses public-facing fallback copy that describes internal implementation:
  - `AdMate Engine`
  - `Agent Core 실행/학습/자동화 엔진`
  - `Agent Core 운영 이벤트와 학습 권한 흐름 정리`
  - `audit/operator log와 Command Center 연결 기준`
  - `LLM/API 비용 및 운영 이벤트 추적 고도화`
- `.ai/TASKS.md` names `admate-agent-core` and calls out future auth, DB, API, and fallback strategy. This is fine for an internal task ledger, but it reinforces that public copy should avoid leaking the same system names.

### Openclaw/Hermes/Agent Core Overexposure

- Risk level: high for public wording.
- `Openclaw`, `Hermes`, and `Agent Core` read as internal system or architecture names, not customer-safe product language.
- Recommendation: replace with public-safe labels such as `운영 데이터`, `자동화 기반`, `운영 엔진`, or `AdMate 운영 기반` depending on final product voice.

### `AdMate Engine` Naming Drift

- Risk level: medium.
- `AdMate Engine` appears as a user-visible project name while the component separately labels the same area as `Agent Core Foundation`.
- This creates drift between product-facing naming and internal architecture naming.
- Recommendation: pick one public name for this block. Safer default: keep `AdMate Engine` if it is approved product language, but remove `Agent Core` from visible labels and project role/detail copy.

### Live/Fallback API Behavior

- Risk level: medium.
- `getCommandCenterData()` falls back to static data when endpoint or read key is missing, and also after fetch failure.
- If both env values are configured, the app performs a live `fetch()` with `cache: "no-store"` and marks `source: "openclaw"`.
- The public UI currently reveals whether the page is backed by `Openclaw live` or `백업 스냅샷`.
- Recommendation: do not expose live provider/source names in UI. Use neutral labels such as `업데이트됨` or `백업 데이터` only if the fallback state must be visible to operators.

### Env/Header/Read-Key Exposure Risk

- Risk level: medium.
- `command-center-data.ts` reads `COMMAND_CENTER_API_URL`, `OPENCLAW_MONITOR_URL`, `ADMATE_OPENCLAW_MONITOR_URL`, `COMMAND_CENTER_READ_KEY`, and `ADMATE_COMMAND_CENTER_READ_KEY`.
- Live fetch sends `x-admate-command-center-read-key`.
- `smoke-command-center.mjs` checks rendered HTML for read key env names and the read-key header name, which is a useful guard.
- `check-command-center-contract.mjs` can call a live API if env is configured. It also reads read-key env values directly.
- Recommendation: ensure public smoke and CI defaults are fallback-only unless a dedicated live-contract job is intentionally configured. Keep read key names, header names, and endpoint names out of rendered UI and public docs.

## Recommended Next Gate

Recommended next queue item: public wording/guard patch.

Reason: the current highest-confidence public risk is visible wording exposure, not smoke reliability. A fallback-only smoke hardening pass is valuable, but safer after public UI labels stop exposing `Openclaw`, `Hermes`, `Agent Core`, live source names, and implementation details.

Suggested patch scope:

- Replace visible internal labels in `CommandCenterPage.tsx` with public-safe language.
- Rewrite the `agent_core` fallback copy in `command-center-data.ts` to use approved `AdMate Engine` wording only, or another single approved public name.
- Keep live/fallback status neutral in rendered UI.
- Keep script behavior unchanged unless adding a no-live default smoke guard is explicitly queued.

## Validation Plan

- `git diff --check -- docs/tasks/2026-05-09_homepage_command_center_1_public_wording_guard_audit_v1.md`
- `npm run lint`
- `npm run build`
- `npm run check:secrets`
- Confirm staged files: none.
