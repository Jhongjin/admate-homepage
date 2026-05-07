---
name: admate-homepage-command-center
description: Use when working in admate-homepage on the AdMate Command Center executive dashboard route, read-only progress cards, API data contract, fallback mock data, responsive UI, and Openclaw-themed dashboard polish. Do not use for redesigning the completed homepage.
---

# AdMate Homepage Command Center Skill

Use this skill for `admate-homepage` when the task concerns `/command-center`.

## Required Reading

1. `AGENTS.md`
2. `README.md`
3. `docs/strategy/05_AdMate_Product_Map_v1.md`
4. `docs/strategy/13_AdMate_Homepage_IA_Brand_Copy_v1.md`
5. `docs/strategy/15_AdMate_Command_Center_Executive_Dashboard_PRD_v1.md`
6. `docs/design/openclaw-theme-reference.md`

## Scope

This skill is for the executive dashboard only.

Allowed:

- `/command-center` route
- read-only dashboard UI
- four project cards
- progress bars
- status badges
- API data contract for `admate-agent-core`
- fallback mock/config data
- responsive layout fixes for this route

Not allowed unless explicitly requested:

- redesigning the existing homepage
- changing homepage hero/sections/copy
- adding Auth or DB ownership to `admate-homepage`
- building project owner input forms here

## Workflow

1. Inspect current `/command-center` implementation.
2. Identify data source: config, JSON, API, or fallback.
3. Report candidate files, risks, and test plan before edits.
4. Keep `admate-homepage` as read-only display for executives.
5. Treat `admate-agent-core` as the future source of truth for Auth/DB/API.
6. Preserve existing homepage routes and behavior.
7. Run build/test and verify desktop/mobile layout.

## Non-negotiable Rules

- Do not output secrets, API keys, tokens, credentials, or `.env.local`.
- Do not break the completed homepage.
- Do not commit/push without user approval.
- Do not show raw JSON/debug in the production UI.
