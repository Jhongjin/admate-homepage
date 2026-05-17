# Homepage Command Center Content Design Refinement Plan v1

Date: 2026-05-18
Repo: admate-homepage
Status: design planning record

## Design Basis

Applied skill basis for the next visual pass:

- `redesign-existing-projects`
- `high-end-visual-design`

The homepage should continue to move away from a card-style product manual.
It should read as the front door to AdMate's AI advertising operations system:
digital, operational, precise, and visually complete.

## Current Design State

Completed and shipped direction:

- The first viewport now leads with an AI operating-system hero, not a product
  catalog.
- Hero motion uses the selected no-dotted horizontal-line variant.
- The Agent Core visual is aligned with the moving wave/orbit center.
- Left-side hero text stays clear of the strongest motion traffic.
- The campaign sequence block was loosened from the earlier dense card layout.
- Product list rows gained stronger hover/background behavior and improved
  action readability.
- The trust layer moved toward a vertical operating-boundary map instead of a
  repeated horizontal feature block.
- The final CTA has a lighter command-board treatment.
- Footer now includes kt nasmedia identity, Data Analytics Team, company,
  address, contact, representative, business number, and copyright.

## Current Risk

The homepage is much closer to the desired product world, but two areas still
need careful design judgment:

- Several lower homepage sections still share a similar "operating card"
  language, so repeated dark panels can make the page feel heavier than the
  hero.
- Command Center content is useful, but it still behaves partly like a status
  report. The next pass should make it feel more like an executive operating
  cockpit without adding fake data or marketing filler.

## Do Not Change Without Review

Do not make another broad homepage visual rewrite without a new preview cycle.

Any large change to the following should be reported as a new visual proposal
before applying to the main route:

- hero composition
- hero motion direction
- platform quartet positioning
- footer company identity
- primary homepage section order
- Command Center information hierarchy

## Next Homepage Design Queue

### 1. Command Center Content Hierarchy

Goal:

Make `/command-center` read less like a weekly project dashboard and more like
an executive operating board.

Candidate refinements:

- Replace some static project-card density with a clearer decision queue.
- Separate "what changed" from "what needs approval".
- Give each product one operational question and one proof point.
- Keep progress numbers secondary to blockers, approval gates, and next
  decisions.
- Avoid adding extra explanatory copy.

Validation:

```text
npm run check:command-center-contract
npm run check:command-center-responsive
npm run check:command-center-static
npm run check:command-center-fixture
```

### 2. Homepage Mid-Page Rhythm

Goal:

Reduce the repeated boxed-section feeling below the hero.

Candidate refinements:

- Use alternating spatial rhythms instead of repeating similar panels.
- Let one section breathe with more negative space.
- Keep the product-specific cues: Compass evidence, Sentinel risk control,
  Lens visual proof, Foresight planning signal.
- Avoid generic AI-purple/dark gradients.
- Avoid card-inside-card layouts.

Validation:

```text
npm run lint
npm run build
```

### 3. Product-Specific Design Cues

Goal:

Keep the product family coherent while making each platform feel distinct.

Direction:

- Compass: document/search confidence, source evidence, policy depth.
- Sentinel: monitoring, authority, risk gates, guarded operational state.
- Lens: media workspace, capture proof, image review, visual QA.
- Foresight: forecasting, budget confidence, data-poor states that still look
  professional.

Do not force all products into identical cards.

### 4. Motion Governance

Goal:

Keep hero motion premium but controlled.

Rules:

- Motion must support the Agent Core visual center.
- Left-side copy should remain calm and readable.
- Animate with transform and opacity only where possible.
- Prefer one or two memorable motion systems over many moving details.
- Maintain `prefers-reduced-motion` behavior.

## Reporting Rule

Report only when the large visual shape changes.

Small copy, spacing, and contract fixes can be committed after local validation.
Hero, section architecture, or Command Center layout changes should be shown as
a candidate direction before replacing the main route.

## Safe Next Action

The next implementation should start with `/command-center` hierarchy and
homepage mid-page rhythm, not another hero rebuild. The hero is now good enough
to preserve unless a new selected reference direction is provided.

## No-Touch Confirmation

This planning record does not edit runtime UI, deployment config, env files,
secrets, Vercel settings, live data integrations, or public route behavior.
