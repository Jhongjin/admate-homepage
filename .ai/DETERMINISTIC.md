# DETERMINISTIC.md

작성일: 2026-05-03
repo: admate-homepage

---

## 1. Principle

Use scripts/tests for deterministic checks. Use skills and Agent judgment for ambiguous design, risk analysis, and implementation planning.

---

## 2. Deterministic Checks

Command Center checks that should be scripted:

```text
project id coverage
status enum
progress range 0~100
required display fields
Agent Core live payload contract
static fallback contract
/command-center route status smoke
```

Scripts:

```text
npm run check:command-center-contract
npm run smoke:command-center
npm run verify:harness
```

---

## 3. Non-deterministic Judgment

Agent judgment is still needed for:

```text
executive readability
empty state wording
fallback wording
responsive visual polish
risk interpretation
```

---

## 4. Ownership Boundary

Deterministic data ownership rules:

```text
admate-agent-core = Auth/DB/API/source of truth
admate-homepage = read-only display and contract validation
```
