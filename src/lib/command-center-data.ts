export type CommandCenterStatus = "normal" | "needs-review" | "delayed" | "done"

export type CommandCenterProject = {
  id: "compass" | "sentinel" | "lens" | "foresight"
  name: string
  role: string
  owner: string
  status: CommandCenterStatus
  statusLabel: string
  progress: number
  weeklyFocus: string
  deliverable: string
  blockedIssue: string
  nextMilestone: string
  updatedAt: string
}

export const commandCenterData = {
  weekLabel: "2026년 5월 1주차",
  updatedAt: "2026-05-03",
  projects: [
    {
      id: "compass",
      name: "AdMate Compass",
      role: "광고 정책/가이드 RAG",
      owner: "Compass 담당",
      status: "normal",
      statusLabel: "정상",
      progress: 60,
      weeklyFocus: "정책 답변 정확도 개선과 근거 제공 UI 정리",
      deliverable: "주요 정책 질문 답변 품질 점검표",
      blockedIssue: "없음",
      nextMilestone: "Multi-LLM 검증 구조 설계",
      updatedAt: "2026-05-03",
    },
    {
      id: "sentinel",
      name: "AdMate Sentinel",
      role: "캠페인 사전 검수 + 실시간 모니터링",
      owner: "Sentinel 담당",
      status: "normal",
      statusLabel: "정상",
      progress: 75,
      weeklyFocus: "Live Monitoring 안정화와 Slack action 흐름 점검",
      deliverable: "알림 보류/재개 action 기록 개선안",
      blockedIssue: "없음",
      nextMilestone: "운영자 action audit log 연결",
      updatedAt: "2026-05-03",
    },
    {
      id: "lens",
      name: "AdMate Lens",
      role: "광고 캡처/증빙 자동화",
      owner: "Lens 담당",
      status: "normal",
      statusLabel: "정상",
      progress: 45,
      weeklyFocus: "캡처 요청 목록과 작업 이력 화면 정리",
      deliverable: "캡처 운영 화면 IA 초안",
      blockedIssue: "없음",
      nextMilestone: "보고서용 이미지 생성 품질 점검",
      updatedAt: "2026-05-03",
    },
    {
      id: "foresight",
      name: "AdMate Foresight",
      role: "미디어 플래닝/성과 예측",
      owner: "Foresight 담당",
      status: "needs-review",
      statusLabel: "검토 필요",
      progress: 25,
      weeklyFocus: "Meta PoC 데이터 기준과 예측 지표 범위 정의",
      deliverable: "업종/목표 분류 기준 초안",
      blockedIssue: "최근 6개월 벤치마크 기준 확정 필요",
      nextMilestone: "예측 화면 IA와 입력 데이터 기준 정리",
      updatedAt: "2026-05-03",
    },
  ] satisfies CommandCenterProject[],
}

export function getCommandCenterSummary(projects: CommandCenterProject[]) {
  const totalProgress = projects.reduce((sum, project) => sum + project.progress, 0)
  const countByStatus = projects.reduce(
    (counts, project) => {
      counts[project.status] += 1
      return counts
    },
    {
      normal: 0,
      "needs-review": 0,
      delayed: 0,
      done: 0,
    } satisfies Record<CommandCenterStatus, number>,
  )

  return {
    overallProgress: Math.round(totalProgress / projects.length),
    normalCount: countByStatus.normal,
    needsReviewCount: countByStatus["needs-review"],
    delayedCount: countByStatus.delayed,
    doneCount: countByStatus.done,
  }
}
