export type CommandCenterStatus = "normal" | "needs_review" | "delayed" | "completed"

export type CommandCenterProject = {
  id: "compass" | "sentinel" | "lens" | "foresight" | "agent_core" | string
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

export type CommandCenterData = {
  weekLabel: string
  updatedAt: string
  projects: CommandCenterProject[]
  source?: "live" | "static"
  generatedAt?: string | null
}

export const commandCenterData: CommandCenterData = {
  weekLabel: "2026년 5월 1주차",
  updatedAt: "2026-05-03",
  source: "static",
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
      weeklyFocus: "실시간 모니터링 안정화와 운영 알림 흐름 점검",
      deliverable: "알림 보류/재개 처리 기록 개선안",
      blockedIssue: "없음",
      nextMilestone: "운영자 확인 이력 연결",
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
      status: "needs_review",
      statusLabel: "검토 필요",
      progress: 25,
      weeklyFocus: "Meta PoC 데이터 기준과 예측 지표 범위 정의",
      deliverable: "업종/목표 분류 기준 초안",
      blockedIssue: "최근 6개월 벤치마크 기준 확정 필요",
      nextMilestone: "예측 화면 IA와 입력 데이터 기준 정리",
      updatedAt: "2026-05-03",
    },
    {
      id: "agent_core",
      name: "AdMate Workspace Status",
      role: "제품군 운영 상태와 연결 신호 관리",
      owner: "운영 담당",
      status: "normal",
      statusLabel: "정상",
      progress: 70,
      weeklyFocus: "운영 상태 기준과 권한 확인 흐름 정리",
      deliverable: "운영 기록과 Command Center 표시 기준",
      blockedIssue: "없음",
      nextMilestone: "비용 및 운영 신호 추적 고도화",
      updatedAt: "2026-05-03",
    },
  ],
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
      needs_review: 0,
      delayed: 0,
      completed: 0,
    } satisfies Record<CommandCenterStatus, number>,
  )

  return {
    overallProgress: projects.length === 0 ? 0 : Math.round(totalProgress / projects.length),
    normalCount: countByStatus.normal,
    needsReviewCount: countByStatus.needs_review,
    delayedCount: countByStatus.delayed,
    doneCount: countByStatus.completed,
  }
}

export function hasCommandCenterSmokeMarker(data: CommandCenterData) {
  const markerPattern = /CC-SMOKE-\d{8}/
  const values = [
    data.weekLabel,
    data.updatedAt,
    data.generatedAt || "",
    ...data.projects.flatMap((project) => [
      project.id,
      project.name,
      project.role,
      project.owner,
      project.statusLabel,
      project.weeklyFocus,
      project.deliverable,
      project.blockedIssue,
      project.nextMilestone,
      project.updatedAt,
    ]),
  ]

  return values.some((value) => markerPattern.test(String(value)))
}

function commandCenterEndpoint() {
  const explicit = String(process.env.COMMAND_CENTER_API_URL || "").trim()
  if (explicit) return explicit

  const baseUrl = String(
    process.env.OPENCLAW_MONITOR_URL ||
    process.env.ADMATE_OPENCLAW_MONITOR_URL ||
    "",
  ).trim()

  if (!baseUrl) return ""

  return `${baseUrl.replace(/\/+$/, "")}/api/public/command-center`
}

function commandCenterReadKey() {
  return String(
    process.env.COMMAND_CENTER_READ_KEY ||
    process.env.ADMATE_COMMAND_CENTER_READ_KEY ||
    "",
  ).trim()
}

function commandCenterLiveModeEnabled() {
  return process.env.COMMAND_CENTER_LIVE_DATA === "1"
}

function normalizeStatus(value: unknown): CommandCenterStatus {
  if (value === "normal" || value === "delayed") return value
  if (value === "needs_review" || value === "needs-review") return "needs_review"
  if (value === "completed" || value === "done") return "completed"
  return "needs_review"
}

function normalizeProject(raw: Record<string, unknown>): CommandCenterProject {
  return {
    id: String(raw.id || ""),
    name: String(raw.name || "AdMate Project"),
    role: String(raw.role || ""),
    owner: String(raw.owner || "담당자 미지정"),
    status: normalizeStatus(raw.status),
    statusLabel: String(raw.statusLabel || "검토 필요"),
    progress: Number.isFinite(Number(raw.progress)) ? Number(raw.progress) : 0,
    weeklyFocus: String(raw.weeklyFocus || ""),
    deliverable: String(raw.deliverable || ""),
    blockedIssue: String(raw.blockedIssue || ""),
    nextMilestone: String(raw.nextMilestone || ""),
    updatedAt: String(raw.updatedAt || ""),
  }
}

export async function getCommandCenterData(): Promise<CommandCenterData> {
  if (!commandCenterLiveModeEnabled()) {
    return commandCenterData
  }

  const endpoint = commandCenterEndpoint()
  const readKey = commandCenterReadKey()

  if (!endpoint || !readKey) {
    return commandCenterData
  }

  try {
    const response = await fetch(endpoint, {
      headers: {
        "x-admate-command-center-read-key": readKey,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Command Center API returned ${response.status}`)
    }

    const json = await response.json()
    const projects = Array.isArray(json.projects)
      ? json.projects.map((project: Record<string, unknown>) => normalizeProject(project))
      : commandCenterData.projects

    return {
      weekLabel: String(json.weekLabel || commandCenterData.weekLabel),
      updatedAt: String(json.updatedAt || json.generatedAt || commandCenterData.updatedAt),
      generatedAt: String(json.generatedAt || ""),
      source: "live",
      projects,
    }
  } catch (error) {
    console.error("[command-center][getCommandCenterData]", error)
    return commandCenterData
  }
}
