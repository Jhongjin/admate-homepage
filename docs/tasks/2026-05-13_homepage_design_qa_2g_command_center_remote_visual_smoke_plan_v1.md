# Homepage Design QA 2G Command Center Remote Visual Smoke Plan v1

Date: 2026-05-13
Gate: Homepage-Design-QA-2G
Status: planned
Scope: docs-only public/no-auth remote visual smoke readiness plan

## Purpose

Prepare the next safe public browser visual pass for the Homepage Command
Center route after route availability passed and browser automation remained
blocked.

This plan does not execute remote browser automation, production API calls,
deployment operations, credentialed checks, environment reads, DB/Auth work, or
Vercel changes.

Target route for a future human-approved browser pass:

```text
https://home.admate.ai.kr/command-center
```

## Source Boundary

Known prior gate state:

```text
prior gate: Homepage-Design-QA-2E
prior status: public remote route availability passed
route result: 200 with safe fallback/product markers

prior gate: Homepage-Design-QA-2F
prior status: blocked
blocker: browser automation/profile availability
```

2E documented the public no-auth route as available with the safe fallback
marker and product markers present. 2F documented that the visual smoke itself
was not run because a clean browser automation session was unavailable.

## Future Visual Smoke Preconditions

Run the remote browser visual pass only when all of these are true:

- a clean browser automation session is available
- no existing user browser profile or credentialed session is reused
- the route is opened without cookies, auth headers, read keys, or secrets
- screenshots are reviewed before being committed or shared
- no live API contract opt-in is enabled
- no environment variables, deployment settings, headers, cookies, tokens, or
  protected payloads are read back

If any precondition fails, record the blocker and stop.

## Future Visual Smoke Checklist

Use a small public/no-auth browser pass against `/command-center`.

Desktop viewport checks:

- Command Center shell is visible and not clipped
- summary cards render as a coherent row or wrapped layout
- project cards for AdMate Compass, Sentinel, Lens, and Foresight are visible
- progress bars and status badges are aligned with their cards
- fallback-state copy remains product-safe and does not imply live provider
  data
- no obvious overlap, truncation, or horizontal overflow appears

Mobile viewport checks:

- page content fits at narrow mobile width without horizontal scrolling
- header and primary content stack cleanly
- summary cards remain readable at small width
- product cards, progress bars, and status badges do not overlap
- Korean fallback copy remains visible and understandable
- tap targets and card spacing remain usable

Forbidden public markers:

- environment variable names
- read-key or token wording
- stack traces or runtime error overlays
- local TLS, localhost, or internal debug markers
- provider-specific operational claims not backed by public fallback state
- prior closed copy blockers such as raw internal action/provider wording

## Evidence Rules

Allowed evidence for the future pass:

- sanitized pass/fail notes
- viewport sizes used
- high-level marker presence or absence
- reviewed screenshot references only if confirmed secret-free

Do not record:

- raw HTML
- response headers
- cookies
- auth/session state
- request headers
- tokens, read keys, or environment values
- protected API responses
- deployment or Vercel configuration values

## No-Touch Confirmation

This planning gate did not perform:

- remote browser automation
- production API calls
- deployment creation, promotion, rollback, or redeploy
- Vercel project, domain, routing, or environment changes
- environment variable reads or writes
- DB/Auth access, reads, writes, or migrations
- live API validation or production payload inspection
- credential, token, cookie, read-key, or secret usage
- source code, dependency, or product asset changes
- screenshot capture
- commit or push

## Decision

PLANNED.

The next non-human-gated step is complete as a docs-only readiness plan. The
actual remote browser visual smoke remains human-gated until clean browser
automation is available and screenshot handling is approved.

## Verification Plan

Required local checks for this docs-only artifact:

| Check | Expected |
| --- | --- |
| `git diff --check -- docs/tasks/2026-05-13_homepage_design_qa_2g_command_center_remote_visual_smoke_plan_v1.md` | pass |
| `npm run verify:harness` | pass |
| `git diff --cached --name-only` | no staged files |

## Changed File

- `docs/tasks/2026-05-13_homepage_design_qa_2g_command_center_remote_visual_smoke_plan_v1.md`

## Rollback

This is a docs-only QA artifact. Rollback is removing this file.
