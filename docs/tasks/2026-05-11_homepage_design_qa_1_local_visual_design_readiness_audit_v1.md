# Homepage Design QA 1 Local Visual Design Readiness Audit v1

Date: 2026-05-11
Gate: Homepage-Design-QA-1
Status: conditional pass for source/docs readiness
Scope: docs-only local visual/design audit for `/` and `/command-center`

## Purpose

Gate current homepage and Command Center design readiness from source and
repo-local docs only.

This audit does not certify final pixel readiness. It records whether the
current source appears ready for the next visual QA pass and identifies the
mobile, state, and fallback risks that must be checked with local browser
evidence before any public design sign-off.

## Review Boundary

Reviewed:

- `README.md`
- `AGENTS.md`
- `DESIGN.md`
- `.ai/MEMORY.md`
- `.ai/RULES.md`
- `.ai/PLAN.md`
- `docs/design/openclaw-theme-reference.md`
- `docs/strategy/05_AdMate_Product_Map_v1.md`
- `docs/strategy/13_AdMate_Homepage_IA_Brand_Copy_v1.md`
- `docs/strategy/15_AdMate_Command_Center_Executive_Dashboard_PRD_v1.md`
- `src/app/page.tsx`
- `src/app/command-center/page.tsx`
- `src/components/home/*`
- `src/components/command-center/*`
- `src/lib/admate-content.ts`
- `src/lib/command-center-data.ts`
- `scripts/check-command-center-contract.mjs`
- `scripts/smoke-command-center.mjs`

Not performed:

- remote smoke
- live Command Center API smoke
- Vercel, domain, deployment, provider, or routing checks
- environment variable readback or mutation
- secret, token, read-key, cookie, session, credential, or signed URL access
- screenshot capture or browser-based viewport inspection
- production payload inspection
- code, config, asset, or dependency changes

## Readiness Summary

Decision: CONDITIONAL PASS

The homepage and Command Center are source-ready for the next local browser
design gate. The implementation follows the approved AdMate/Openclaw direction:
calm operational surfaces, white cards, thin borders, compact Korean business
copy, Lucide icons, restrained product accents, and public-safe Command Center
fallback wording.

The main blocker for full design readiness is evidence, not an obvious source
defect. This gate reviewed source/docs only, so final visual approval still
needs browser screenshots across mobile and desktop widths.

## Homepage Surface

Source posture:

- `/` composes the expected homepage chapters: header, hero, system map,
  problem, ecosystem, product cards, lifecycle, Agent Core, impact, operations,
  roadmap, and final CTA.
- Product copy is centralized in `src/lib/admate-content.ts`.
- Public product names use AdMate Compass, AdMate Sentinel, AdMate Lens,
  AdMate Foresight, and AdMate Agent Core.
- Product cards and lifecycle sections avoid final public use of legacy names
  such as Guide, Capture Pro, Planner, or Sentinel beta.
- The page uses the approved operational palette, including `#F7F7F7`,
  `#FFFFFF`, `#E5E5E5`, `#111827`, `#5E6AD2`, green, violet, and amber
  accents.

Design readiness:

- Hero is brand-forward and immediately identifies AdMate as the platform.
- System map and lifecycle sections provide the strongest visual explanation
  of the Agent platform story.
- Product cards preserve role boundaries and avoid inflated ROI claims.
- Header and mobile navigation are scoped and readable from source.
- Reduced-motion support exists for major homepage animations in global CSS.

## Homepage Mobile And Responsive Risks

Risk level: medium until browser screenshots are captured.

Items to verify next:

- Hero uses large type and a `whitespace-nowrap` subtitle fragment. It should be
  checked at 320px, 375px, and 390px widths for horizontal overflow.
- Hero visual panel contains nested grids, fixed-height tiles, and animated
  flow lines. It should be checked for crowding on narrow mobile and short
  mobile landscape viewports.
- System map uses a two-column/two-row node diagram with a central Agent Core
  card and hidden link effects below `sm`. It should be checked at mobile width
  for node legibility and vertical rhythm.
- Product tabs intentionally allow horizontal scrolling. Confirm the tab list
  remains discoverable and that selected tab content never causes page-level
  horizontal scroll.
- Lifecycle has two horizontal controls: the top step rail and the six-step
  progress grid. Confirm the rail scrolls cleanly and the six-step mini grid
  does not compress labels into unreadable text on mobile.
- CTA buttons and dropdown menu should be checked for at least practical
  40px touch targets and no off-screen menu clipping.
- The homepage uses several animated overlays. Confirm reduced-motion mode
  disables movement and that animations do not obscure text.

Current source mitigations:

- Page and diagram sections frequently use `overflow-hidden`, `overflow-x-auto`,
  `min-w-0`, `break-words`, `text-balance`, and breakpoint-based grids.
- Main content width is constrained with `section-shell`.
- Mobile header switches to a compact sheetless dropdown.
- The lifecycle pause control and reduced-motion handling are present.

## Command Center Surface

Source posture:

- `/command-center` is a read-only executive dashboard.
- It renders `CommandCenterPage` from `getCommandCenterData`.
- Static fallback data remains the default unless live mode is explicitly
  enabled.
- `src/lib/command-center-data.ts` includes the required Compass, Sentinel,
  Lens, and Foresight project cards, plus an Agent Core/workspace status card.
- Summary cards, progress bars, status badges, owners, weekly focus,
  deliverables, blocked issues, next milestones, and update dates are present.
- Status styling maps normal, needs review, delayed, and completed to approved
  operational colors.

Design readiness:

- Layout matches the PRD direction: executive summary first, then a workspace
  status card, then product progress cards.
- The dashboard uses compact operational typography, light gray background,
  white cards, thin borders, badges, icons, and progress bars.
- Cards include `min-w-0`, `break-words`, `truncate`, and responsive grids,
  which lowers obvious overflow risk.
- Public source labels are neutral: `최신 운영 데이터` and `기본 운영 데이터`.

## Command Center Fallback UI

Fallback decision: ready for local visual gate, not final live/API gate.

Observed fallback behavior from source:

- Default path returns bundled `commandCenterData`.
- Live fetch is skipped unless `COMMAND_CENTER_LIVE_DATA` is set to `1`.
- If live mode is enabled but endpoint/read key is absent, the dashboard returns
  fallback data.
- If live fetch fails, the dashboard logs server-side and returns fallback data.
- The UI marks fallback as `기본 운영 데이터`, which is public-safe and avoids
  exposing implementation detail.
- Smoke marker handling displays `운영 확인용 데이터` only when a synthetic
  `CC-SMOKE-YYYYMMDD` marker is present.

Fallback UI risks to verify next:

- There is no dedicated rendered loading component in the source path reviewed
  here; loading state coverage is represented by synthetic smoke text.
- There is no dedicated rendered empty component in `CommandCenterPage`; empty
  state coverage is represented by synthetic smoke text.
- Error state intentionally resolves to fallback data instead of a public error
  screen. Browser QA should confirm this remains visually calm and does not
  expose stack traces, env names, endpoint names, read-key names, headers, or raw
  payloads.
- The PRD asks executives to understand status in about 10 seconds. A timed
  local browser pass should confirm the summary and four product cards remain
  visible enough on laptop and desktop viewports.

## Empty Error Loading States

Current coverage from repo-local scripts:

- `scripts/smoke-command-center.mjs --state=loading` checks approved public
  loading copy through local synthetic text.
- `scripts/smoke-command-center.mjs --state=error` checks approved public
  fallback/error copy through local synthetic text.
- `scripts/smoke-command-center.mjs --state=empty` checks approved public empty
  copy through local synthetic text.
- `scripts/smoke-command-center.mjs` blocks remote targets by default unless a
  separate opt-in is set.
- `scripts/check-command-center-contract.mjs` skips live API validation unless a
  separate live opt-in is set.

Readiness interpretation:

- The state wording contract is ready.
- The actual rendered React state components are not yet independently proven by
  this docs-only audit.
- Next design QA should either capture real rendered loading/error/empty states
  or explicitly record that those states remain contract-only until a rendered
  state harness exists.

## Public Copy And Safety

Pass from source/docs review:

- Homepage copy stays within approved product positioning.
- No source-reviewed public UI copy exposes secrets, tokens, read keys, raw
  provider payloads, stack traces, or implementation-only environment names.
- Command Center public copy avoids Openclaw/Hermes/Agent Core implementation
  depth in the executive dashboard surface, except where homepage strategy
  explicitly explains Agent Core as part of the product story.
- The design system forbids fake ROI and real advertiser/campaign data; source
  copy reviewed here follows that boundary.

## Next Design Gates

1. `Homepage-Design-QA-2 Local Browser Viewport Pass`
   - Run local dev only.
   - Capture `/` and `/command-center` at 320, 375, 390, 768, 1024, 1280, and
     1440 widths.
   - Record horizontal overflow, clipped text, overlapping controls, and
     unreadable cards.

2. `Homepage-Design-QA-3 Command Center State Render Pass`
   - Prove real rendered loading, error, empty, fallback, and smoke-marker
     states, or document why a source-only contract is still the accepted state
     boundary.
   - Keep live API and remote smoke disabled unless separately approved.

3. `Homepage-Design-QA-4 Accessibility And Motion Pass`
   - Keyboard through header, mobile menu, tabs, lifecycle controls, and Command
     Center cards.
   - Verify focus states, reduced-motion behavior, touch target sizing, and
     screen-reader-safe icon usage.

4. `Homepage-Design-QA-5 Public Copy Freeze`
   - Re-scan for legacy product names, implementation-only terms, fake ROI
     metrics, internal env/key/header names, stack traces, and raw debug text.

5. `Homepage-Design-QA-6 Human-Gated Remote Smoke`
   - Only if explicitly approved.
   - Public route smoke only, sanitized reporting only, no credential-backed
     live API checks.

## Gate Verdict

Homepage-Design-QA-1 passes as a local source/docs readiness audit.

The current surfaces are ready to enter local browser visual QA. Final visual
approval remains blocked on viewport screenshots and rendered state evidence.

No remote, live API, Vercel, environment, secret, deployment, provider, DB,
auth, admin, or production data checks were performed by this gate.
