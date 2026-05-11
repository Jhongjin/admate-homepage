# Homepage Design QA 2 Command Center Local Visual Execution Plan Result v1

Date: 2026-05-12
Gate: Homepage-Design-QA-2
Status: preflight pass; local browser visual evidence pending
Scope: safe local-only visual/design QA plan for `/command-center`

## Purpose

Create the next safe execution plan for Command Center local visual/design QA
and record the credential-free harness result available before browser capture.

This artifact does not certify final pixel readiness. It defines the local
visual QA route, confirms the existing synthetic harness is still safe, and
keeps remote, live API, deployment, provider, DB, auth, and environment work out
of scope.

## Safety Boundary

Allowed in this gate:

- local source/docs review
- local Command Center fallback contract verification
- local synthetic state smoke for `loading`, `error`, and `empty`
- future local browser review against `http://127.0.0.1:<local-port>/command-center`
- sanitized notes about viewport behavior, copy safety, and layout risks

Not allowed in this gate:

- deployment, preview promotion, or public route mutation
- remote smoke or production URL fetches
- live Command Center API validation
- `COMMAND_CENTER_CONTRACT_LIVE=1`
- `COMMAND_CENTER_SMOKE_ALLOW_REMOTE=1`
- secret, token, cookie, session, credential, signed URL, read-key, or provider
  access
- environment variable readback or mutation
- DB, Auth, Slack, n8n, Vercel, provider, or admin-system calls
- raw HTML, headers, payloads, stack traces, or implementation-only identifiers
  in the QA report

## Preflight Validation Result

Commands run:

```text
npm run verify:harness
node scripts/smoke-command-center.mjs --state=loading
node scripts/smoke-command-center.mjs --state=error
node scripts/smoke-command-center.mjs --state=empty
```

Results:

```text
verify:harness: pass
loading state smoke: pass
error state smoke: pass
empty state smoke: pass
```

Contract checker note:

```text
[check-command-center-contract] live API skipped (set COMMAND_CENTER_CONTRACT_LIVE=1 to opt in)
[check-command-center-contract] ok
```

Synthetic state smoke notes:

```text
[smoke-command-center] ok state=loading target=http://127.0.0.1:3000/command-center
[smoke-command-center] ok state=error target=http://127.0.0.1:3000/command-center
[smoke-command-center] ok state=empty target=http://127.0.0.1:3000/command-center
```

Interpretation:

- The local fallback contract remains healthy.
- Live API validation remains skipped by default.
- Loading, error, and empty copy checks remain synthetic contract checks, not
  rendered React state proof.
- No local browser screenshot or visual capture was performed in this preflight.

## Local Browser Execution Plan

When a human-approved local visual run is next executed, use only a local dev
server and inspect `/command-center`.

Suggested local setup:

```text
npm run dev -- -H 127.0.0.1
```

If port `3000` is already occupied, use the next local-only port and record the
actual URL. Do not use remote URLs, preview URLs, live API opt-ins, or
credential-backed requests.

Viewport matrix:

| Width | Purpose |
| ---: | --- |
| 320px | narrow mobile overflow and Korean copy wrapping |
| 375px | common mobile layout and header action fit |
| 390px | larger mobile card rhythm |
| 768px | tablet grid transition |
| 1024px | laptop executive read speed |
| 1280px | desktop card density |
| 1440px | wide desktop four-card scan |

Screens to inspect:

- `/command-center` default static fallback data
- sticky header and home link
- hero/title/reporting basis area
- summary cards
- workspace status card
- Compass, Sentinel, Lens, and Foresight progress cards

Do not attempt live API, remote smoke, authenticated states, admin states, or DB
mutation as part of this visual pass.

## Design QA Checklist

Layout:

- no page-level horizontal scroll at each viewport
- no clipped Korean text in headings, badges, owner labels, progress values, or
  milestone fields
- no overlapping cards, sticky header, icons, or controls
- summary cards and product cards remain scan-friendly for executive review
- four product cards are visible as a coherent set on desktop and stack cleanly
  on mobile

Command Center contract:

- Compass, Sentinel, Lens, and Foresight are present
- status badges use the approved normal, needs review, delayed, and completed
  categories
- progress bars visually match each progress percentage
- fallback label remains public-safe as `기본 운영 데이터`
- no raw JSON, stack trace, env name, read-key name, endpoint name, header name,
  token, secret, or provider implementation detail is visible

Design system:

- background remains operational gray `#F7F7F7`
- cards remain white with thin borders
- typography stays compact and readable
- product accents remain restrained
- no decorative blobs, excessive gradients, fake ROI numbers, or real
  advertiser/campaign data appear

Accessibility and interaction:

- home link is reachable and visually stable
- icon-only or compact controls keep accessible labels or adjacent text
- focus states are visible enough for keyboard review
- touch targets are practical on mobile
- reduced-motion mode should not obscure or destabilize content

## Current Result

Decision: READY FOR LOCAL BROWSER VISUAL EXECUTION

The credential-free preflight passed, so the next safe action is a local-only
browser viewport pass for `/command-center`.

Final design readiness remains blocked on actual local browser evidence. This
document records no screenshot findings and should not be used as a final visual
approval.

## Remaining Risks

- Browser-level overflow and clipping are still unproven at 320px, 375px,
  390px, 768px, 1024px, 1280px, and 1440px.
- Synthetic loading/error/empty smoke confirms approved public wording only; it
  does not prove rendered React state components.
- Fallback fetch smoke was not run because this preflight did not start or
  depend on a local dev server.
- Live API behavior, remote availability, Auth, DB, provider, and production
  payload correctness remain outside this gate.

## Next Gate

Recommended next artifact:

```text
Homepage-Design-QA-2A Command Center Local Browser Viewport Result
```

Expected evidence:

- local URL and port used
- viewport matrix result
- pass/fail notes for overflow, clipping, overlap, and public-safe wording
- sanitized screenshot references if screenshots are captured locally
- explicit confirmation that live API, remote smoke, env mutation, deployment,
  and provider access remained disabled

## Rollback

This is a docs-only QA artifact. Rollback is removing this file:

```text
docs/tasks/2026-05-12_homepage_design_qa_2_command_center_local_visual_execution_plan_result_v1.md
```
