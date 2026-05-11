# Homepage Design QA 2A Command Center Local Browser Viewport Result v1

Date: 2026-05-12
Gate: Homepage-Design-QA-2A
Status: local visual QA executed; design approval blocked by public wording
Scope: local-only `/command-center` visual QA using loopback server evidence

## Safety Boundary

This pass used only local loopback URLs:

```text
http://127.0.0.1:3000/command-center
```

No production URL, preview URL, live API opt-in, provider API, DB, auth,
deployment, remote smoke, credential, cookie, signed URL, read-key, or
environment mutation was used.

## Commands Run

```text
npm run verify:harness
npm run lint
npm run build
npm run start -- -H 127.0.0.1 -p 3000
npm run smoke:command-center:states
```

Results:

```text
verify:harness: pass
lint: pass
build: pass
smoke:command-center:states: pass against http://127.0.0.1:3000/command-center
```

The first state smoke attempt was run before a local server was available and
failed with `fetch failed`; it was rerun after the loopback server started and
passed.

## Evidence

Sanitized production-mode evidence was captured under:

```text
docs/tasks/evidence/homepage_design_qa_2a_command_center_prod_layout_probe.json
docs/tasks/evidence/homepage_design_qa_2a_command_center_prod_320x900.png
docs/tasks/evidence/homepage_design_qa_2a_command_center_prod_375x900.png
docs/tasks/evidence/homepage_design_qa_2a_command_center_prod_390x900.png
docs/tasks/evidence/homepage_design_qa_2a_command_center_prod_768x1000.png
docs/tasks/evidence/homepage_design_qa_2a_command_center_prod_1024x1100.png
docs/tasks/evidence/homepage_design_qa_2a_command_center_prod_1280x1100.png
docs/tasks/evidence/homepage_design_qa_2a_command_center_prod_1440x1100.png
docs/tasks/evidence/homepage_design_qa_2a_command_center_prod_full_320x900.png
docs/tasks/evidence/homepage_design_qa_2a_command_center_prod_full_375x900.png
docs/tasks/evidence/homepage_design_qa_2a_command_center_prod_full_390x900.png
docs/tasks/evidence/homepage_design_qa_2a_command_center_prod_full_768x1000.png
docs/tasks/evidence/homepage_design_qa_2a_command_center_prod_full_1024x1100.png
docs/tasks/evidence/homepage_design_qa_2a_command_center_prod_full_1280x1100.png
docs/tasks/evidence/homepage_design_qa_2a_command_center_prod_full_1440x1100.png
```

The JSON evidence intentionally stores counts and viewport metrics only, not
raw console frames or stack traces.

## Viewport Matrix

| Viewport | Horizontal overflow | Required product names | Fallback label | Visible provider detail | Result |
| ---: | --- | --- | --- | --- | --- |
| 320x900 | none | present | present | `Slack` | blocked |
| 375x900 | none | present | present | `Slack` | blocked |
| 390x900 | none | present | present | `Slack` | blocked |
| 768x1000 | none | present | present | `Slack` | blocked |
| 1024x1100 | none | present | present | `Slack` | blocked |
| 1280x1100 | none | present | present | `Slack` | blocked |
| 1440x1100 | none | present | present | `Slack` | blocked |

Automated probe summary:

- `scrollWidth <= clientWidth` at every viewport.
- No measured element extended outside the viewport.
- Compass, Sentinel, Lens, Foresight, and `기본 운영 데이터` were present.
- Production probe recorded zero severe console events.
- Full-page screenshots showed clean stacking on mobile and a coherent four-card
  desktop layout.

## Blocking Finding

Design approval is blocked by public-facing provider wording in the Sentinel
card:

```text
Live Monitoring 안정화와 Slack action 흐름 점검
```

Source location:

```text
src/lib/command-center-data.ts:53
```

This violates the prior gate checklist item requiring no visible provider
implementation detail. The issue appears in all full-page viewport captures.

## Decision

Decision: NOT READY FOR FINAL DESIGN APPROVAL

The layout, responsiveness, card stacking, and local fallback contract are ready
based on local-only evidence. Public wording needs one follow-up cleanup before
this gate can be closed as visually approved.

## Cleanup

The local dev server and local production server started for this pass were
stopped after evidence capture. Temporary Chrome profiles were removed.

## Rollback

This is a docs/evidence-only QA result. Rollback is removing this file and the
associated `homepage_design_qa_2a_*` evidence files under:

```text
docs/tasks/evidence/
```
