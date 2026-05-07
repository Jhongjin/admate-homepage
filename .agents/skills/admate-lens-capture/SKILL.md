---
name: admate-lens-capture
description: Use when working on AdMate Lens / admate-lens for ad capture automation, evidence image generation, capture request management, job history, admin UI polish, and Openclaw theme application. Do not use to redesign pixel-matched ad preview/capture output surfaces.
---

# AdMate Lens Capture Skill

Use this skill for `admate-lens`.

## Product Role

AdMate Lens generates advertising capture and evidence images.

## Allowed Areas

- admin screen
- input forms
- capture request list
- job history
- settings
- result management UI
- operational dashboard polish

## Forbidden or High-risk Areas

Do not modify these without explicit approval and visual verification:

- capture output UI
- ad preview UI
- platform-matched ad surfaces
- YouTube/GDN/mobile native preview components
- pixel-matched assets

## Workflow

1. Read `AGENTS.md`, `README.md`, product strategy docs, and design reference.
2. Identify whether the task touches operator UI or capture output.
3. Report candidate files, risk areas, and visual verification plan before edits.
4. Apply AdMate/Openclaw theme only to operator/admin surfaces.
5. Preserve existing rendering behavior and output formats.
6. Run build/test and verify key capture flows where possible.

## Non-negotiable Rules

- Do not output secrets, API keys, tokens, credentials, or `.env.local`.
- Do not alter pixel-matched capture results unless explicitly requested.
- Do not remove existing form fields or rendering options.
- Do not commit/push without user approval.
