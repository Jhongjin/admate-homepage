# RULES.md

작성일: 2026-05-03
repo: admate-homepage

---

## 1. Work Rules

- 먼저 `AGENTS.md`, `README.md`, `.ai/MEMORY.md`, `.ai/RULES.md`, `.ai/PLAN.md`를 읽는다.
- 아직 파일을 수정하지 않는다.
- 수정 후보 파일, 위험 요소, 작업 계획을 먼저 보고한다.
- 사용자 승인 후 수정한다.
- build/test 결과를 보고한다.
- 변경 파일 목록과 rollback 방법을 보고한다.

---

## 2. Homepage Rules

- 기존 홈페이지 메인 화면은 이미 완료된 화면으로 간주한다.
- 홈페이지 hero, section copy, product card, lifecycle, roadmap은 명시 요청 없이 수정하지 않는다.
- 제품명은 Compass, Sentinel, Lens, Foresight, Agent Core를 사용한다.
- Openclaw/Hermes는 외부 독립 제품이 아니라 Agent Core 내부 엔진으로 설명한다.

---

## 3. Command Center Rules

- `/command-center`는 임원용 read-only dashboard다.
- 담당자 입력/Auth/DB는 `admate-homepage`에 만들지 않는다.
- 운영 데이터 source of truth는 `admate-agent-core`다.
- API가 없으면 fallback/mock config를 유지한다.
- raw JSON/debug는 운영 UI에 노출하지 않는다.

---

## 4. Security Rules

- secret, API key, token, credential 값을 출력하지 않는다.
- `.env`, `.env.local`, `.env.production`을 커밋하지 않는다.
- real advertiser/campaign/sensitive operational data를 넣지 않는다.
- raw campaign-level 데이터를 LLM에 직접 전달하지 않는다.

---

## 5. Git Rules

- main에 직접 push하지 않는다.
- commit/push/PR은 사용자 승인 후 진행한다.
- 사용자 변경사항을 임의로 revert하지 않는다.
