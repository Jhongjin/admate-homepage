# AGENTS.md

## 1. Project Identity

This repo is the AdMate representative homepage and executive Command Center frontend.

AdMate is an AI Agent-based advertising operations automation platform built by the Nasmedia Data Analytics Team. The homepage explains the AdMate ecosystem, product family, Agent Core, campaign lifecycle, operational impact, and AI operations model.

Primary routes:

- `/` - AdMate Home. The homepage is considered completed unless the user explicitly asks for homepage changes.
- `/command-center` - Executive read-only project progress dashboard.

## 2. Required Reading

Before making code or design changes, read:

1. `README.md`
2. `DESIGN.md`
3. `.ai/MEMORY.md`
4. `.ai/RULES.md`
5. `.ai/PLAN.md`
6. `docs/strategy/05_AdMate_Product_Map_v1.md`
7. `docs/strategy/13_AdMate_Homepage_IA_Brand_Copy_v1.md`
8. `docs/strategy/15_AdMate_Command_Center_Executive_Dashboard_PRD_v1.md`
9. `docs/design/openclaw-theme-reference.md`

Central source of truth:

```text
D:\Projects\AdMate\admate-docs
```

## 3. Repo-local Skills

Available repo-local skills live under `.agents/skills/`.

Use the relevant skill when the task matches its scope:

- `admate-homepage-command-center` - `/command-center` executive dashboard work
- `admate-docs-director` - central docs/PRD/handoff alignment
- `openclaw-agent-core` - admate-agent-core Auth/DB/API/audit collaboration
- `admate-compass-rag` - Compass/RAG collaboration context
- `admate-lens-capture` - Lens/capture collaboration context
- `admate-foresight-planning` - Foresight/planning collaboration context

For this repo, the primary implementation skill is usually `admate-homepage-command-center`.

## 4. Product Naming Rules

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

## 5. Openclaw / Hermes Messaging

Openclaw and Hermes are internal engines within AdMate Agent Core. Do not present them as large external standalone products.

Preferred wording:

- Openclaw is an automation execution engine that runs work according to schedules and conditions and connects external systems.
- Hermes is an intelligence and memory engine that learns from AI and user events to accumulate operational knowledge and judgment criteria.

Simple metaphor:

- Openclaw is the hands and feet.
- Hermes is the brain that remembers and judges.

## 6. Homepage Rules

The existing homepage is already built. Do not revise the main homepage route unless the user explicitly asks.

The main page contract remains:

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

## 7. Command Center Rules

`/command-center` is an executive read-only dashboard.

- Do not add project owner input forms here.
- Do not add Auth/DB ownership here.
- Treat `admate-agent-core` as the future source of truth for Command Center Auth/DB/API.
- Use `src/lib/command-center-data.ts` as fallback/mock data until the API contract is ready.
- Keep Command Center UI concise, status-based, and executive-readable.

## 8. Design Rules

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
- Fake ROI or unverified metrics
- Real advertiser or campaign data
- Raw JSON/debug output in production UI

## 9. Technical Stack

This is a Next.js App Router project with TypeScript, Tailwind CSS, shadcn-style local components, and Lucide React icons.

Expected commands:

```bash
npm install
npm run dev
npm run build
npm run lint
```

If package managers are unavailable, report that clearly and still run available static checks such as:

```bash
git diff --check
```

## 10. Non-Negotiable Rules

- Do not output `.env`, API keys, tokens, credentials, or secret values.
- Do not add real advertiser, campaign, or sensitive operational data.
- Do not change API or DB schema unless the user explicitly asks.
- Do not commit or push without explicit user approval.
- Do not remove strategy/design docs without archiving or explicit approval.
- Do not rewrite the brand message away from the approved homepage IA.
- Do not modify user changes you did not make unless the user asks.

## 11. Work Report Format

After changes, report:

1. Changed files
2. Routes or sections affected
3. Copy and naming compliance
4. Design compliance
5. Build/test result
6. Remaining risks
7. Rollback method
8. Recommended commit message
9. Browser verification points
