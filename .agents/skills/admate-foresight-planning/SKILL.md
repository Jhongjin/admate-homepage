---
name: admate-foresight-planning
description: Use when working on AdMate Foresight for media planning intelligence, Meta PoC design, benchmark data rules, CPM/CPC/CTR/VTR/CPV prediction, recent-six-month data handling, industry/objective taxonomy, and forecast-vs-actual governance.
---

# AdMate Foresight Planning Skill

Use this skill for `admate-foresight` or Foresight planning documents.

## Product Role

AdMate Foresight predicts and simulates campaign performance for media planning.

Initial PoC:

```text
Meta first
```

Core metrics:

- CPM
- CPC
- CTR
- VTR
- CPV

## Workflow

1. Read product map and data governance docs.
2. Confirm platform, industry, objective, budget, period, country, and creative type assumptions.
3. Prefer benchmark data from the most recent six months.
4. Keep older data as long-term trend reference only.
5. Record benchmark metadata:
   - benchmark period
   - filters
   - currency
   - markup
   - Net/Gross basis
   - correction method
6. Do not send raw campaign-level data to LLMs.
7. Report assumptions, risks, and validation plan before implementation.

## Non-negotiable Rules

- Do not output secrets, API keys, tokens, credentials, or `.env.local`.
- Do not use raw campaign-level data in external LLM prompts.
- Do not hide Net/Gross, markup, currency, or filter assumptions.
- Do not commit/push without user approval.
