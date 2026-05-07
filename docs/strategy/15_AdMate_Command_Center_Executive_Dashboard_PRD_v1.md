# AdMate Command Center Executive Dashboard PRD v1

작성일: 2026-05-03
문서 상태: 초안 v1
작성 목적: AdMate 각 제품 프로젝트의 주간 진행 현황을 임원에게 한 화면으로 직관적으로 보여주는 Executive Dashboard의 목적, 정보 구조, 입력 기준, UI 방향, 구현 단계, repo 역할 분담을 정의한다.

---

## 1. Executive Summary

AdMate Command Center Executive Dashboard는 AdMate 제품군의 주간 진행 현황을 임원 보고용으로 보여주는 단일 화면 대시보드다.

이 대시보드는 복잡한 프로젝트 관리 도구가 아니라, 임원이 짧은 시간 안에 다음을 바로 이해하도록 만드는 것이 목적이다.

```text
이번 주 각 프로젝트가 무엇을 하고 있는가?
진행률은 몇 %인가?
정상 진행 중인가, 지연 중인가, 검토가 필요한가?
이번 주 산출물과 다음 마일스톤은 무엇인가?
막힌 이슈가 있는가?
```

초기 MVP는 `admate-homepage`에 임원 보고용 시각 화면으로 구현하고, 데이터는 간단한 JSON 또는 설정 파일로 관리한다. 이후 운영 입력, 이력 관리, 권한, audit log가 필요해지면 `admate-agent-core`의 Agent Core 운영 콘솔로 확장한다.

---

## 2. 배경과 필요성

AdMate는 Compass, Sentinel, Lens, Foresight, Agent Core가 동시에 발전하는 생태계다.

현재 필요한 것은 세부 업무 추적용 툴이 아니라, 임원 또는 의사결정권자가 전체 프로젝트 흐름을 빠르게 파악할 수 있는 보고 화면이다.

기존 문서와 슬라이드가 전략과 구조를 설명한다면, Command Center Dashboard는 **현재 진행 상황**을 보여준다.

이 화면은 다음 질문에 답해야 한다.

```text
AdMate 전체가 지금 어디까지 왔는가?
이번 주에는 각 프로젝트가 무엇을 하고 있는가?
어떤 프로젝트가 빠르게 진행 중이고, 어떤 프로젝트가 막혀 있는가?
다음 보고 전까지 무엇이 완료될 예정인가?
```

---

## 3. 제품 정의

### 3.1 제품명

```text
AdMate Command Center
Executive Progress Dashboard
```

화면명 후보:

```text
AdMate Command Center
AdMate Executive Dashboard
AdMate Weekly Progress Dashboard
```

초기 권장 화면명:

```text
AdMate Command Center
```

### 3.2 한 줄 정의

```text
AdMate 각 제품 프로젝트의 이번 주 작업과 진행률을 임원이 한 화면에서 확인하는 주간 진행 현황 대시보드
```

---

## 4. 대상 사용자

| 사용자 | 목적 | 필요한 정보 |
|---|---|---|
| 임원/의사결정권자 | 전체 진행 상황 파악 | 프로젝트별 이번 주 작업, 진행률, 상태, 주요 리스크 |
| 프로젝트 총괄 | 보고 자료 준비 | 전체 평균 진행률, 프로젝트별 막힌 이슈, 다음 마일스톤 |
| 제품 담당자 | 주간 현황 입력 | 이번 주 작업, 진행률, 완료 항목, 이슈, 다음 계획 |
| 개발/문서 Agent | 구현/업데이트 | 데이터 스키마, UI 기준, 입력 템플릿 |

---

## 5. 핵심 원칙

## 5.1 한 화면 우선

임원용 첫 화면에서는 AdMate 제품군의 현재 상태가 한 번에 보여야 한다.

초기 화면에는 반드시 다음 네 프로젝트가 동시에 보여야 한다.

```text
AdMate Compass
AdMate Sentinel
AdMate Lens
AdMate Foresight
```

Agent Core는 초기 화면에서 별도 다섯 번째 카드로 확장할 수 있지만, 사용자가 요청한 기본 그림은 네 개 프로젝트를 한 화면에 보여주는 것이다. 따라서 MVP는 4개 제품 카드 중심으로 구성한다.

## 5.2 수치보다 해석 가능성

진행률 숫자만 보여주면 의미가 약하다. 따라서 `%`와 함께 이번 주 작업 설명, 상태 badge, 다음 마일스톤을 같이 보여준다.

## 5.3 단순 입력

각 프로젝트 작업자는 복잡한 PM 도구를 쓰지 않고, 매주 정해진 템플릿에 최소 정보만 입력한다.

## 5.4 임원 보고 톤

문구는 기술 내부 용어보다 임원이 이해할 수 있는 업무 단위로 작성한다.

예:

```text
나쁨: RAG reranker pipeline refactor
좋음: 정책 답변 정확도 개선 작업
```

## 5.5 과장 금지

진행률과 상태는 실제 완료 기준에 맞춰 보수적으로 입력한다.

---

## 6. MVP 범위

### 6.1 포함

- 4개 프로젝트 카드
- 프로젝트별 주간 작업 내용
- 프로젝트별 진행률 `%`
- 진행률 progress bar
- 상태 badge
- 담당자
- 이번 주 산출물
- 다음 마일스톤
- 막힌 이슈
- 마지막 업데이트일
- 전체 평균 진행률
- 이번 주 주요 리스크 요약

### 6.2 제외

초기 MVP에서는 다음을 제외한다.

- 로그인/권한 관리
- 작업자 직접 입력 폼
- DB 저장
- 주간 이력 비교
- Slack 알림
- audit log
- Hermes 자동 요약
- Jira/Notion/GitHub 자동 연동

이 항목들은 Phase 2 이후 `admate-agent-core`에서 운영형 대시보드로 확장한다.

---

## 7. 화면 구성

## 7.1 상단 요약 영역

상단에는 전체 현황을 보여준다.

표시 항목:

- Dashboard title: `AdMate Command Center`
- 보조 문구: `이번 주 AdMate 제품군 진행 현황`
- 기준 주차: 예: `2026년 5월 1주차`
- 전체 평균 진행률
- 정상 진행 프로젝트 수
- 검토 필요 프로젝트 수
- 지연 프로젝트 수
- 마지막 업데이트일

예시:

```text
AdMate Command Center
2026년 5월 1주차 제품별 진행 현황

전체 평균 진행률 62%
정상 3개 / 검토 필요 1개 / 지연 0개
최종 업데이트 2026-05-03
```

## 7.2 프로젝트 카드 영역

한 화면에 네 개 프로젝트 카드를 배치한다.

Desktop 권장 레이아웃:

```text
[ Compass ] [ Sentinel ]
[ Lens    ] [ Foresight ]
```

Wide desktop에서는 4열 배치도 가능하다.

```text
[ Compass ] [ Sentinel ] [ Lens ] [ Foresight ]
```

Mobile에서는 1열 카드 리스트로 쌓는다.

## 7.3 프로젝트 카드 구성

각 카드에는 다음 정보를 넣는다.

```text
제품명
제품 역할
현재 상태 badge
담당자
이번 주 작업
진행률 숫자
progress bar
이번 주 산출물
막힌 이슈
다음 마일스톤
업데이트일
```

카드 예시:

```text
AdMate Sentinel
캠페인 사전 검수 + 실시간 모니터링

상태: 정상
담당자: 홍길동

이번 주 작업
Slack action 안정화 및 알림 보류/재개 흐름 점검

진행률 75%
[███████████████-----]

이번 주 산출물
알림 버튼 action 기록 개선

막힌 이슈
없음

다음 마일스톤
운영자 action audit log 연결
```

---

## 8. 프로젝트별 기본 정의

## 8.1 AdMate Compass

역할:

```text
광고 정책/가이드 RAG
```

임원용 설명:

```text
광고 정책과 가이드 확인 시간을 줄이고, 근거 기반 답변으로 정책 리스크를 낮추는 프로젝트
```

주간 작업 예시:

- 정책 답변 정확도 개선
- 크롤링 문서 품질 점검
- 검색/근거 제공 UI 정리
- 답변 검증 구조 설계

## 8.2 AdMate Sentinel

역할:

```text
캠페인 사전 검수 + 실시간 모니터링
```

임원용 설명:

```text
캠페인 시작 전 세팅 오류를 막고, 집행 후 예산/성과/상태 이상을 감지하는 프로젝트
```

주간 작업 예시:

- Sentinel Live Monitoring 안정화
- Slack/Email 알림 흐름 점검
- 알림 보류/종료/재개 action 개선
- 사전 검수 구조 설계

## 8.3 AdMate Lens

역할:

```text
광고 캡처/증빙 자동화
```

임원용 설명:

```text
광고 게재 화면과 보고서 증빙 이미지를 자동 생성해 반복 캡처 업무를 줄이는 프로젝트
```

주간 작업 예시:

- 캡처 요청 화면 정리
- 작업 이력 UI 개선
- 보고서용 이미지 생성 품질 점검
- 관리자 화면 AdMate 테마 적용

주의:

```text
캡처 결과물/광고 미리보기 UI는 실제 매체 화면과의 픽셀 매칭이 중요하므로 임의 변경 금지
```

## 8.4 AdMate Foresight

역할:

```text
미디어 플래닝/성과 예측
```

임원용 설명:

```text
과거 광고 데이터를 기반으로 다음 캠페인의 예상 성과와 기획 기준을 제공하는 프로젝트
```

주간 작업 예시:

- Meta PoC 데이터 기준 설계
- 업종/목표 분류 기준 정리
- 최근 6개월 벤치마크 기준 정의
- 예측 지표/화면 IA 설계

---

## 9. 진행률 기준

진행률은 작업자의 감각으로만 입력하지 않고, 다음 기준을 따른다.

| 진행률 | 의미 |
|---:|---|
| 0% | 시작 전 |
| 10% | 요구사항 확인 중 |
| 25% | 구조 분석/작업 계획 완료 |
| 40% | 초기 구현 또는 초안 작성 중 |
| 50% | 핵심 구현/작성 진행 중 |
| 75% | 주요 구현/초안 완료, 검증 중 |
| 90% | 리뷰 반영/마무리 중 |
| 100% | 완료 및 보고 가능 |

운영 원칙:

- `100%`는 실제 보고 가능하거나 배포 가능한 상태일 때만 입력한다.
- 막힌 이슈가 있으면 진행률이 높더라도 상태를 `검토 필요` 또는 `지연`으로 표시할 수 있다.
- 문서 작업과 코드 작업은 같은 `%`를 쓰되, 산출물 기준을 반드시 함께 적는다.

---

## 10. 상태 기준

상태는 네 단계로 관리한다.

| 상태 | 의미 | 색상 방향 |
|---|---|---|
| 정상 | 계획대로 진행 중 | Green |
| 검토 필요 | 의사결정/검토가 필요하지만 아직 지연은 아님 | Amber |
| 지연 | 일정 또는 의존성 문제로 진행이 막힘 | Red |
| 완료 | 이번 주 목표 완료 | Purple 또는 Neutral |

표시 문구는 짧은 한국어로 사용한다.

```text
정상
검토 필요
지연
완료
```

---

## 11. 입력 데이터 모델

초기 MVP는 JSON 또는 TypeScript config 파일 기반으로 관리한다.

권장 필드:

```json
{
  "weekLabel": "2026년 5월 1주차",
  "updatedAt": "2026-05-03",
  "summary": {
    "overallProgress": 62,
    "normalCount": 3,
    "needsReviewCount": 1,
    "delayedCount": 0
  },
  "projects": [
    {
      "id": "compass",
      "name": "AdMate Compass",
      "role": "광고 정책/가이드 RAG",
      "owner": "담당자명",
      "status": "normal",
      "statusLabel": "정상",
      "progress": 60,
      "weeklyFocus": "정책 답변 정확도 개선 및 근거 제공 UI 정리",
      "deliverable": "주요 정책 질문 답변 품질 점검표",
      "blockedIssue": "없음",
      "nextMilestone": "Multi-LLM 검증 구조 설계",
      "updatedAt": "2026-05-03"
    }
  ]
}
```

---

## 12. 작업자 주간 입력 템플릿

각 프로젝트 담당자는 매주 다음 항목만 입력한다.

```text
프로젝트명:
담당자:
이번 주 작업:
진행률:
현재 상태:
이번 주 산출물:
막힌 이슈:
다음 마일스톤:
업데이트일:
```

작성 예시:

```text
프로젝트명: AdMate Lens
담당자: 홍길동
이번 주 작업: 캡처 요청 목록과 작업 이력 화면을 AdMate 테마로 정리
진행률: 45%
현재 상태: 정상
이번 주 산출물: 캡처 요청 목록 UI 초안
막힌 이슈: 없음
다음 마일스톤: 관리자 화면 build/test 확인
업데이트일: 2026-05-03
```

---

## 13. UI/UX 방향

디자인은 `design/openclaw-theme-reference.md`를 따른다.

핵심 톤:

```text
실무형
정돈된
차분한
신뢰감 있는
임원이 빠르게 읽을 수 있는
```

권장 UI 요소:

- 4개 프로젝트 카드
- 상태 badge
- progress bar
- 전체 평균 progress
- 짧은 한글 문장
- border 중심 카드
- 과한 애니메이션 금지
- raw JSON/debug 노출 금지

색상 기준:

- 정상: Green
- 검토 필요: Amber
- 지연: Red
- 완료 또는 정보: Purple/Neutral

---

## 14. 구현 위치와 repo 역할

## 14.1 admate-docs

역할:

```text
PRD, 입력 기준, 작업자 템플릿, Codex 빌드 프롬프트 관리
```

현재 문서가 이 역할을 담당한다.

## 14.2 admate-homepage

역할:

```text
임원용 시각 대시보드 MVP 구현
```

초기 구현 후보:

```text
/command-center
/dashboard
/executive-dashboard
```

권장:

```text
/command-center
```

이유:

- AdMate 전체 생태계를 보여주는 홈페이지 repo와 성격이 맞다.
- 임원 보고용 화면을 빠르게 구현할 수 있다.
- 초기에는 DB 없이 파일 기반 데이터로 충분하다.

## 14.3 admate-agent-core

역할:

```text
운영형 대시보드 확장
```

추후 확장 기능:

- 작업자 직접 입력 폼
- 사용자 권한
- 주간 이력 저장
- audit log
- Slack 주간 업데이트 요청
- Hermes 진행 현황 요약

초기 MVP에서는 구현 대상이 아니다.

---

## 15. 단계별 로드맵

## Phase 1. PRD와 입력 기준 확정

담당 repo:

```text
admate-docs
```

산출물:

- Executive Dashboard PRD
- 작업자 입력 템플릿
- 진행률/상태 기준
- admate-homepage 구현 프롬프트

## Phase 2. 정적 대시보드 MVP

담당 repo:

```text
admate-homepage
```

산출물:

- `/command-center` 화면
- 4개 프로젝트 카드
- progress bar
- 주간 데이터 config
- responsive layout

## Phase 3. 주간 운영 프로세스

담당:

```text
프로젝트 총괄 + 각 프로젝트 작업자
```

산출물:

- 매주 입력 템플릿 갱신
- 주간 보고용 screenshot 또는 URL
- 막힌 이슈 정리

## Phase 4. 운영형 대시보드 확장

담당 repo:

```text
admate-agent-core
```

산출물:

- 작업자 입력 UI
- 주간 이력 DB
- 권한 관리
- audit log
- Slack reminder

---

## 16. Acceptance Criteria

MVP가 완료되었다고 판단하는 기준은 다음과 같다.

```text
1. 한 화면에서 Compass, Sentinel, Lens, Foresight 네 프로젝트가 모두 보인다.
2. 각 프로젝트 카드에 이번 주 작업과 진행률이 표시된다.
3. 진행률은 최대 100% 기준 progress bar 길이로 표현된다.
4. 상태 badge가 정상/검토 필요/지연/완료 중 하나로 표시된다.
5. 임원이 10초 안에 각 프로젝트의 현재 작업과 진행 상태를 이해할 수 있다.
6. 데이터는 코드 수정 없이 별도 config 또는 JSON에서 쉽게 갱신할 수 있다.
7. Openclaw theme 기준의 차분한 운영 콘솔 톤을 따른다.
8. 모바일/데스크톱에서 텍스트가 겹치거나 잘리지 않는다.
```

---

## 17. admate-homepage 구현 프롬프트 초안

아래 프롬프트는 `admate-homepage` 작업 Agent에게 전달할 수 있다.

```text
너는 AdMate 홈페이지 개발 Agent다.

이번 작업 목표는 임원 보고용 AdMate Command Center 대시보드 MVP를 구현하는 것이다.

먼저 다음 문서를 읽어라.

1. AGENTS.md
2. README.md
3. docs/strategy/AdMate_Product_Map_v1.md 또는 중앙 admate-docs의 strategy/05_AdMate_Product_Map_v1.md
4. docs/strategy/AdMate_Homepage_IA_Brand_Copy_v1.md 또는 중앙 admate-docs의 strategy/13_AdMate_Homepage_IA_Brand_Copy_v1.md
5. docs/design/openclaw-theme-reference.md
6. 중앙 admate-docs의 strategy/15_AdMate_Command_Center_Executive_Dashboard_PRD_v1.md

아직 파일을 수정하지 말고 먼저 아래를 보고해라.

1. 현재 홈페이지 구조
2. /command-center 화면을 추가할 후보 파일
3. 데이터 config를 둘 위치
4. UI 컴포넌트 구성안
5. 위험 요소
6. build/test 방법

승인 후 구현해라.

필수 구현:
- /command-center 또는 동등한 라우트
- Compass / Sentinel / Lens / Foresight 네 프로젝트 카드
- 이번 주 작업 내용
- 진행률 숫자
- progress bar
- 상태 badge
- 담당자
- 이번 주 산출물
- 막힌 이슈
- 다음 마일스톤
- 전체 평균 진행률
- 마지막 업데이트일

제약 조건:
- 기능 과장 금지
- secret/API key/token 출력 금지
- 기존 홈페이지 라우팅과 기능을 깨지 말 것
- Openclaw theme reference의 차분한 운영 콘솔 톤을 따를 것
- 모바일/데스크톱에서 텍스트 겹침이 없게 할 것
- build/test 결과를 보고할 것
```

---

## 18. 최종 요약

AdMate Command Center Executive Dashboard의 첫 버전은 복잡한 PM 시스템이 아니다.

핵심은 다음이다.

```text
네 개 프로젝트를 한 화면에 보여준다.
각 프로젝트의 이번 주 작업과 진행률을 progress bar로 보여준다.
임원은 숫자와 짧은 설명만 보고 현재 상황을 바로 이해한다.
작업자는 매주 간단한 템플릿만 갱신한다.
초기 구현은 admate-homepage, 운영형 확장은 admate-agent-core가 담당한다.
```

이 구조가 안정화되면 AdMate는 전략 문서뿐 아니라 실행 현황까지 한 곳에서 관리하는 Command Center를 갖게 된다.
