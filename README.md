# AdMate Homepage

AdMate 대표 홈페이지와 임원용 Command Center 대시보드 frontend입니다.

AdMate는 나스미디어 데이터분석팀이 구축하는 AI Agent 기반 광고 운영 자동화 플랫폼입니다. 이 repo의 `/`는 AdMate의 정체성, 제품군, Agent Core, 캠페인 운영 사이클, 기대 효과, AI 운영 체계를 설명하는 브랜드 허브입니다.

`/command-center`는 임원이 AdMate Compass, Sentinel, Lens, Foresight의 주간 진행 현황을 확인하는 read-only 대시보드입니다.

## Routes

- `/` - AdMate Home
- `/command-center` - AdMate Command Center executive dashboard

## Local Development

```bash
npm install
npm run dev
```

## Build / Checks

```bash
npm run build
npm run lint
```

## Reference Docs

- `AGENTS.md`
- `DESIGN.md`
- `.ai/MEMORY.md`
- `.ai/RULES.md`
- `.ai/PLAN.md`
- `docs/strategy/05_AdMate_Product_Map_v1.md`
- `docs/strategy/13_AdMate_Homepage_IA_Brand_Copy_v1.md`
- `docs/strategy/15_AdMate_Command_Center_Executive_Dashboard_PRD_v1.md`
- `docs/design/openclaw-theme-reference.md`

Central source of truth:

```text
D:\Projects\AdMate\admate-docs
```

## Repo-local Skills

Repo-local skills live in `.agents/skills/`.

Primary skill for this repo:

- `admate-homepage-command-center`

Collaboration/reference skills:

- `admate-docs-director`
- `openclaw-agent-core`
- `admate-compass-rag`
- `admate-lens-capture`
- `admate-foresight-planning`

## Ownership Notes

- Existing homepage work is considered complete unless the user explicitly requests homepage changes.
- `/command-center` is display-only in this repo.
- Auth, DB, project owner input, update history, and audit logs belong in `admate-agent-core`.
- `src/lib/command-center-data.ts` is the fallback/mock data source until `admate-agent-core` exposes the read API.

## Security

Never output or commit `.env`, API keys, tokens, service role keys, credentials, or real advertiser/campaign data.
