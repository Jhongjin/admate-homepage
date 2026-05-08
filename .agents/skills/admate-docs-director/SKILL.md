---
name: admate-docs-director
description: Use when working on the central AdMate docs repository, including strategy docs, PRDs, handoff documents, prompts, repo guides, harness docs, skill catalog updates, document cleanup, and source-of-truth management.
---

# AdMate Docs Director Skill

Use this skill for `admate-docs`, the central source of truth for AdMate.

## Workflow

1. Read `AGENTS.md`, `README.md`, and `INDEX.md`.
2. Identify which strategy, design, prompt, handoff, harness, or skill document is relevant.
3. Before edits, report the target files, risks, and intended structure.
4. Preserve AdMate's existing product language:
   - Compass = policy/guide RAG
   - Sentinel = pre-launch validation + live monitoring
   - Lens = capture/evidence automation
   - Foresight = planning/performance prediction
   - Agent Core = Openclaw + Hermes execution/learning layer
5. Do not invent new product direction before aligning with existing docs.
6. Update `INDEX.md` when adding important documents.
7. Prefer archive over hard deletion for duplicate or obsolete docs.
8. Report rollback steps.

## Non-negotiable Rules

- Do not output secrets, API keys, tokens, credentials, or `.env.local` contents.
- Do not commit, push, or create PRs without user approval.
- Keep `admate-docs` as the source of truth for cross-repo strategy.
- When cleaning documents, preserve one canonical source and move duplicates to `archive/duplicates`.

## Common Outputs

- PRD documents
- repo handoff documents
- Codex prompts
- harness operating documents
- skill catalog drafts
- weekly doc-gardening reports
