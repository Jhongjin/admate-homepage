---
name: admate-compass-rag
description: Use when working on AdMate Compass / admate-compass for advertising policy RAG, crawlers, document parsing, hybrid search, answer grounding, citation/source display, Multi-LLM validation, and RAG UI improvements.
---

# AdMate Compass RAG Skill

Use this skill for `admate-compass`.

## Product Role

AdMate Compass is the policy and guide intelligence product.

It answers questions based on official advertising platform policies and guides.

Platforms:

- Meta
- Google
- Naver
- Kakao
- X

## Workflow

1. Read `AGENTS.md`, `README.md`, relevant strategy docs, and design docs.
2. Identify whether the task affects crawler, parser, embedding, vector storage, retrieval, reranking, prompt, answer UI, or build config.
3. Before edits, report candidate files, risk to RAG quality, and test plan.
4. Preserve answer grounding and source visibility.
5. Keep policy answer language clear and evidence-based.
6. Run build/test and any available RAG smoke checks.

## Non-negotiable Rules

- Do not output secrets, API keys, tokens, credentials, or `.env.local`.
- Do not change embedding dimensions, vector schema, or storage logic without reporting impact first.
- Do not degrade source/citation display.
- Do not invent policy claims without retrieved evidence.
- Do not commit/push without user approval.

## Good Output Criteria

- Faster policy lookup
- Better grounded answers
- Clear source references
- Lower hallucination risk
- Stable build/runtime behavior
