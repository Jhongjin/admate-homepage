# AGENTS.md

## 1. Project Identity

This repo is the AdMate representative homepage.

AdMate is an AI Agent-based advertising operations automation platform built by the Nasmedia Data Analytics Team. The homepage is a brand hub that explains the AdMate ecosystem, product family, Agent Core, campaign lifecycle, operational impact, and AI operations model.

Primary route:

- `/` - AdMate Home

## 2. Required Reading

Before making code or design changes, read:

1. `DESIGN.md`
2. `README.md`
3. `docs/strategy/admate_homepage_ia_brand_copy_v_1.md`
4. `docs/strategy/AdMate_Unified_Agent_Architecture_v1_1.md`
5. `docs/strategy/admate_product_map_v_1.md`
6. `docs/design/openclaw-theme-reference.md`

If available in future work, also read:

- `docs/strategy/AdMate_Agent_Core_Operating_Model_v1.md`
- `docs/design/designed.md`
- `docs/design/switch.md`

## 3. Product Naming Rules

Use these names exactly:

- AdMate Compass
- AdMate Sentinel
- AdMate Lens
- AdMate Foresight
- AdMate Agent Core

Do not use these as final public product names:

- AdMate Guide
- Capture Pro
- Planner
- Sentinel beta

## 4. Openclaw / Hermes Messaging

Openclaw and Hermes are internal engines within AdMate Agent Core. Do not present them as large external standalone products.

Preferred wording:

- Openclaw is an automation execution engine that runs work according to schedules and conditions and connects external systems.
- Hermes is an intelligence and memory engine that learns from AI and user events to accumulate operational knowledge and judgment criteria.

Simple metaphor:

- Openclaw is the hands and feet.
- Hermes is the brain that remembers and judges.

## 5. Design Rules

Follow `DESIGN.md` and `docs/design/openclaw-theme-reference.md`.

The target visual direction is:

```text
Openclaw operational reliability
+ brand landing page clarity
+ AI Agent platform future-readiness
```

Use:

- Light operational background `#F7F7F7`
- White cards
- Thin borders
- Compact Korean product copy
- Lucide icons
- shadcn-style primitives
- Restrained product color accents

Avoid:

- Excessive gradients
- Decorative orbs or blobs
- Overly animated startup landing page patterns
- Pure internal admin-console layout
- Fake ROI or unverified metrics
- Real advertiser or campaign data

## 6. Technical Stack

This homepage is structured as a Next.js App Router project with TypeScript, Tailwind CSS, shadcn-style local components, and Lucide React icons.

Expected commands:

```bash
npm install
npm run dev
npm run build
```

If package managers are unavailable in the local environment, report that clearly and still run available static checks such as:

```bash
git diff --check
```

## 7. Non-Negotiable Rules

- Do not output `.env`, API keys, tokens, credentials, or secret values.
- Do not add real advertiser, campaign, or sensitive operational data.
- Do not change API or DB schema unless the user explicitly asks.
- Do not commit or push without explicit user approval.
- Do not remove strategy/design docs.
- Do not rewrite the brand message away from the approved homepage IA.

## 8. Homepage Section Contract

The main page should include:

1. Hero
2. Problem
3. Ecosystem
4. Product Cards
5. Campaign Lifecycle
6. Agent Core
7. Impact
8. Operations
9. Roadmap
10. Final CTA

Product data should stay centralized in `src/lib/admate-content.ts`.

## 9. Work Report Format

After changes, report:

1. Changed files
2. Sections affected
3. Copy and naming compliance
4. Design compliance
5. Build/test result
6. Remaining risks
7. Recommended commit message
8. Browser verification points
