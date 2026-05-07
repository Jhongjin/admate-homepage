# MEMORY.md

작성일: 2026-05-03
repo: admate-homepage
AdMate 역할: Homepage / Command Center executive dashboard

---

## 1. Project Identity

이 repo는 AdMate 대표 홈페이지와 임원용 Command Center read-only 대시보드를 담당한다.

```text
/ = AdMate brand homepage
/command-center = executive project progress dashboard
```

기존 홈페이지는 이미 개발 완료된 화면으로 간주한다. 새 작업은 기본적으로 기존 홈페이지 메인 화면을 리디자인하지 않고, Command Center 또는 명시된 범위 안에서만 진행한다.

---

## 2. Source of Truth

먼저 읽을 문서:

```text
AGENTS.md
README.md
DESIGN.md
docs/strategy/05_AdMate_Product_Map_v1.md
docs/strategy/13_AdMate_Homepage_IA_Brand_Copy_v1.md
docs/strategy/15_AdMate_Command_Center_Executive_Dashboard_PRD_v1.md
docs/design/openclaw-theme-reference.md
```

중앙 원본:

```text
D:\Projects\AdMate\admate-docs
```

---

## 3. Current Structure

주요 route:

```text
src/app/page.tsx
src/app/command-center/page.tsx
```

주요 content/config:

```text
src/lib/admate-content.ts
src/lib/command-center-data.ts
```

Command Center components:

```text
src/components/command-center/CommandCenterPage.tsx
src/components/command-center/ProgressBar.tsx
src/components/command-center/ProjectProgressCard.tsx
src/components/command-center/StatusBadge.tsx
src/components/command-center/SummaryCards.tsx
```

---

## 4. Non-negotiable Facts

- 기존 홈페이지 메인 페이지는 임의 수정하지 않는다.
- `/command-center`는 임원용 read-only dashboard다.
- 담당자 입력/Auth/DB ownership은 `admate-agent-core`가 담당한다.
- 이 repo는 admate-agent-core API 데이터를 표시하는 frontend 역할로 유지한다.
- API가 준비되기 전에는 `src/lib/command-center-data.ts` fallback/mock 데이터를 사용한다.
- secret, API key, token, credential 값은 출력하지 않는다.
- `.env.local`은 커밋하지 않는다.
- commit/push/PR은 사용자 승인 후 진행한다.

---

## 5. Build/Test

확인 명령:

```text
npm run build
npm run lint
```

로컬 확인:

```text
npm run dev
http://127.0.0.1:3000/
http://127.0.0.1:3000/command-center
```
