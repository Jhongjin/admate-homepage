# PLAN.md

작성일: 2026-05-03
repo: admate-homepage

---

## 1. Current Goal

```text
admate-homepage를 Codex/Agent가 안정적으로 작업할 수 있도록 repo-local harness와 skills를 정리한다.
```

---

## 2. Current Dashboard Goal

```text
/command-center는 임원이 AdMate Compass, Sentinel, Lens, Foresight의 주간 진행 현황을 한 화면에서 보는 read-only dashboard다.
```

향후 운영 데이터 source of truth:

```text
admate-agent-core
```

---

## 3. Candidate Files for Future Command Center API Integration

```text
src/lib/command-center-data.ts
src/app/command-center/page.tsx
src/components/command-center/CommandCenterPage.tsx
src/components/command-center/ProjectProgressCard.tsx
src/components/command-center/SummaryCards.tsx
```

---

## 4. Risks

```text
기존 홈페이지 메인 화면을 불필요하게 건드리는 것
Command Center에 입력/Auth/DB 기능을 넣어 ownership을 흐리는 것
admate-agent-core API 계약 없이 frontend에서 임의 schema를 확정하는 것
임원용 화면에 raw JSON/debug 또는 내부 secret을 노출하는 것
```

---

## 5. Execution Plan

1. 문서와 route 구조를 확인한다.
2. `/command-center` 변경 여부를 명확히 분리한다.
3. 데이터 contract는 admate-agent-core 설계와 맞춘다.
4. API 준비 전에는 fallback data를 유지한다.
5. 변경 후 build/lint와 responsive 확인 포인트를 보고한다.

---

## 6. Open Questions

- admate-agent-core의 Command Center read API endpoint는 무엇으로 확정할 것인가?
- 프로젝트 owner 권한과 viewer 권한은 어떤 user table을 기준으로 연결할 것인가?
- `/command-center`를 공개 URL로 둘지 내부 접근 제한을 둘지 결정이 필요한가?
