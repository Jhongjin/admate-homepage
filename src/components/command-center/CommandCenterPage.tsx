import Link from "next/link"
import {
  Activity,
  ArrowLeft,
  CalendarDays,
  CircleDot,
  ClipboardCheck,
  Cpu,
  Flag,
  Gauge,
  LayoutDashboard,
  ListChecks,
  ShieldCheck,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ProgressBar } from "@/components/command-center/ProgressBar"
import { ProjectProgressCard } from "@/components/command-center/ProjectProgressCard"
import { StatusBadge } from "@/components/command-center/StatusBadge"
import { SummaryCards } from "@/components/command-center/SummaryCards"
import {
  commandCenterData,
  getCommandCenterSummary,
  hasCommandCenterSmokeMarker,
  type CommandCenterData,
  type CommandCenterProject,
} from "@/lib/command-center-data"
import { cn } from "@/lib/utils"

const productOperatingNotes: Record<
  string,
  {
    lane: string
    decision: string
    proof: string
    operatingQuestion: string
  }
> = {
  compass: {
    lane: "Policy desk",
    decision: "근거 품질을 배포 기준으로 유지할 수 있는가",
    proof: "정책 답변 정확도와 출처 노출",
    operatingQuestion: "심사 리스크를 줄이는 답변인가",
  },
  sentinel: {
    lane: "Review watch",
    decision: "운영자가 즉시 개입할 신호가 충분한가",
    proof: "검수 알림과 보류/재개 흐름",
    operatingQuestion: "캠페인 중단 전에 잡히는가",
  },
  lens: {
    lane: "Evidence desk",
    decision: "증빙 산출물을 보고 체계에 바로 넣을 수 있는가",
    proof: "캡처 요청, 이력, 이미지 품질",
    operatingQuestion: "운영 비용을 줄이는 증빙인가",
  },
  foresight: {
    lane: "Planning room",
    decision: "예측 기준을 이번 주 안에 확정할 수 있는가",
    proof: "벤치마크 데이터와 입력 지표",
    operatingQuestion: "예산 판단에 쓸 수 있는가",
  },
  agent_core: {
    lane: "Operating room",
    decision: "제품군 공통 기준이 흔들리지 않는가",
    proof: "권한, 상태 기준, 운영 기록",
    operatingQuestion: "임원 보고 기준이 일관적인가",
  },
}

const commandStrips = [
  { label: "정책 리스크", product: "Compass", metric: "근거 확인", tone: "steel" },
  { label: "캠페인 감시", product: "Sentinel", metric: "운영 개입", tone: "green" },
  { label: "증빙 생산", product: "Lens", metric: "보고 연결", tone: "slate" },
  { label: "예산 판단", product: "Foresight", metric: "기준 확정", tone: "amber" },
]

const engineBadges = ["운영 기준", "권한 확인", "상태 기록", "제품 신호", "보고판 연결"]

export function CommandCenterPage({ data = commandCenterData }: { data?: CommandCenterData }) {
  const summary = getCommandCenterSummary(data.projects)
  const sourceLabel = data.source === "live" ? "최신 운영 데이터" : "기본 운영 데이터"
  const hasSmokeMarker = hasCommandCenterSmokeMarker(data)
  const engineProject = data.projects.find((project) => project.id === "agent_core")
  const productProjects = data.projects.filter((project) => project.id !== "agent_core")
  const reviewProjects = productProjects.filter((project) => project.status !== "normal" || project.blockedIssue !== "없음")
  const decisionProjects = reviewProjects.length > 0 ? reviewProjects : productProjects.slice(0, 2)
  const leadReviewProject = decisionProjects[0] || productProjects[0]
  const nextDecision = leadReviewProject
    ? `${leadReviewProject.name}: ${leadReviewProject.nextMilestone}`
    : "제품별 다음 판단 대기"
  const readinessLabel = summary.needsReviewCount > 0 ? "결정 필요" : "운영 안정"

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4F5F2] text-[#0D0D0D]">
      <header className="sticky top-0 z-40 border-b border-[#D9DDD4] bg-[#F4F5F2]/90 backdrop-blur">
        <div className="mx-auto flex h-12 w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0D0D0D] text-white">
              <LayoutDashboard className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-[13px] font-semibold">AdMate Command Center</div>
              <div className="hidden text-[11px] text-[#6D7468] sm:block">Executive Operating Cockpit</div>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="shrink-0 bg-white">
            <Link href="/">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">홈으로</span>
            </Link>
          </Button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_420px] xl:items-stretch">
          <div className="overflow-hidden rounded-lg border border-[#D7DDD2] bg-[#FAFAF8]">
            <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_220px]">
              <div className="p-4 sm:p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <div className="inline-flex rounded-md border border-[#D9DDD4] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#4F594A]">
                    Weekly Decision Board · {sourceLabel}
                  </div>
                  {hasSmokeMarker ? (
                    <div className="inline-flex rounded-md border border-[#F5CE8B] bg-[#FFF8EC] px-2.5 py-1 text-[11px] font-semibold text-[#9E5700]">
                      운영 확인용 데이터
                    </div>
                  ) : null}
                  <div className="inline-flex rounded-md border border-[#C6D4CA] bg-[#EEF7F1] px-2.5 py-1 text-[11px] font-semibold text-[#177D4E]">
                    {readinessLabel}
                  </div>
                </div>
                <h1 className="max-w-full text-balance break-words text-2xl font-semibold tracking-normal text-[#0D0D0D] sm:text-4xl">
                  이번 주 AdMate 경영 운영판
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5E5E5E]">
                  제품 설명을 넘겨 읽는 화면이 아니라, 어떤 제품을 밀고 어떤 기준을 확정할지 바로 판단하는 cockpit입니다.
                </p>
                <div className="mt-5 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
                  {commandStrips.map((strip) => (
                    <CommandStrip key={strip.label} {...strip} />
                  ))}
                </div>
              </div>

              <div className="border-t border-[#E1E4DD] bg-white p-4 xl:border-l xl:border-t-0 sm:p-5">
                <div className="text-[11px] font-semibold uppercase text-[#6E7769]">Readiness</div>
                <div className="mt-2 text-5xl font-semibold leading-none tracking-normal text-[#0D0D0D]">
                  {summary.overallProgress}%
                </div>
                <ProgressBar value={summary.overallProgress} className="mt-3" />
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <SignalCount label="정상" value={summary.normalCount} tone="green" />
                  <SignalCount label="검토" value={summary.needsReviewCount} tone="amber" />
                  <SignalCount label="지연" value={summary.delayedCount} tone="red" />
                </div>
              </div>
            </div>
          </div>

          <DecisionQueue projects={decisionProjects} nextDecision={nextDecision} />
        </section>

        <SummaryCards
          weekLabel={data.weekLabel}
          updatedAt={data.updatedAt}
          overallProgress={summary.overallProgress}
          normalCount={summary.normalCount}
          needsReviewCount={summary.needsReviewCount}
          delayedCount={summary.delayedCount}
        />

        <section className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <ReadinessLedger projects={productProjects} />
          <OperatingSignals projects={productProjects} />
        </section>

        {engineProject ? <EngineProgressCard project={engineProject} /> : null}

        <section className="mt-5">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-[11px] font-semibold uppercase text-[#6E7769]">Execution Detail</div>
              <h2 className="mt-1 text-lg font-semibold text-[#0D0D0D]">제품별 실행 카드</h2>
            </div>
            <div className="max-w-xl break-words text-[12px] leading-5 text-[#5E5E5E]">
              운영판에서 결정한 내용을 제품 담당 실행 단위로 내려봅니다.
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {productProjects.map((project) => (
            <ProjectProgressCard key={project.id} project={project} />
          ))}
        </section>
      </div>
    </main>
  )
}

function CommandStrip({
  label,
  product,
  metric,
  tone,
}: {
  label: string
  product: string
  metric: string
  tone: string
}) {
  const toneClass =
    tone === "green"
      ? "border-[#BDE8CD] bg-[#F0FBF5] text-[#177D4E]"
      : tone === "amber"
        ? "border-[#F5CE8B] bg-[#FFF8EC] text-[#9E5700]"
        : tone === "steel"
          ? "border-[#B8CAD6] bg-[#EEF4F6] text-[#27566B]"
          : "border-[#D7DDD2] bg-[#F8FAF6] text-[#47645C]"

  return (
    <div className={cn("min-w-0 rounded-md border p-3", toneClass)}>
      <div className="text-[11px] font-semibold">{label}</div>
      <div className="mt-1 break-words text-[13px] font-semibold leading-5">{product}</div>
      <div className="mt-2 border-t border-current/20 pt-2 text-[11px] font-semibold">{metric}</div>
    </div>
  )
}

function DecisionQueue({ projects, nextDecision }: { projects: CommandCenterProject[]; nextDecision: string }) {
  return (
    <div className="grid gap-4 rounded-lg border border-[#172033] bg-[#101820] p-4 text-white sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase text-[#B9C2B7]">Decision Queue</div>
          <div className="mt-2 break-words text-xl font-semibold leading-tight">{nextDecision}</div>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/10">
          <Activity className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>

      <div className="grid gap-2">
        {projects.map((project) => (
          <div key={project.id} className="rounded-md border border-white/10 bg-white/[0.04] p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-[13px] font-semibold">{project.name}</div>
                <div className="mt-1 line-clamp-2 break-words text-[12px] leading-5 text-[#D8DED4]">
                  {productOperatingNotes[project.id]?.decision || project.nextMilestone}
                </div>
              </div>
              <StatusBadge status={project.status} label={project.statusLabel} className="bg-white/10" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-2 border-t border-white/10 pt-3 text-[12px] leading-5 text-[#D8DED4]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#9FE5C1]" aria-hidden="true" />
          <span>보고 기준: 진행률보다 막힌 판단을 먼저 올립니다.</span>
        </div>
        <div className="flex items-center gap-2">
          <CircleDot className="h-3.5 w-3.5 shrink-0 text-[#F5CE8B]" aria-hidden="true" />
          <span>이번 주 회의 안건은 검토/보류 신호 중심으로 정렬합니다.</span>
        </div>
      </div>
    </div>
  )
}

function ReadinessLedger({ projects }: { projects: CommandCenterProject[] }) {
  return (
    <section className="rounded-lg border border-[#D7DDD2] bg-[#FAFAF8] p-3 sm:p-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase text-[#6E7769]">Readiness Ledger</div>
          <h2 className="mt-1 text-lg font-semibold text-[#0D0D0D]">주간 제품 판단 장부</h2>
        </div>
        <div className="break-words text-[12px] text-[#5E5E5E]">
          제품별 다음 회의에서 결정할 항목만 남깁니다.
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        {projects.map((project) => {
          const notes = productOperatingNotes[project.id]

          return (
            <div key={project.id} className="grid gap-3 rounded-md border border-[#E1E5DC] bg-white p-3 lg:grid-cols-[160px_minmax(0,1fr)_110px] lg:items-center">
              <div className="min-w-0">
                <div className="truncate text-[13px] font-semibold text-[#0D0D0D]">{project.name}</div>
                <div className="mt-1 truncate text-[11px] font-semibold text-[#6E7769]">{notes?.lane || "Product lane"}</div>
              </div>
              <div className="min-w-0">
                <div className="break-words text-[13px] font-semibold leading-5 text-[#0D0D0D]">
                  {notes?.decision || project.nextMilestone}
                </div>
                <div className="mt-1 break-words text-[12px] leading-5 text-[#667065]">
                  증거: {notes?.proof || project.deliverable}
                </div>
              </div>
              <div className="min-w-0">
                <StatusBadge status={project.status} label={project.statusLabel} />
                <div className="mt-2 flex items-center gap-2">
                  <span className="shrink-0 text-[12px] font-semibold text-[#0D0D0D]">{project.progress}%</span>
                  <ProgressBar value={project.progress} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function OperatingSignals({ projects }: { projects: CommandCenterProject[] }) {
  return (
    <section className="rounded-lg border border-[#D7DDD2] bg-white p-3 sm:p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase text-[#6E7769]">Operating Signals</div>
          <h2 className="mt-1 text-lg font-semibold text-[#0D0D0D]">운영 신호판</h2>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#EAF2ED] text-[#2F7D50]">
          <ListChecks className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {projects.map((project) => {
          const notes = productOperatingNotes[project.id]
          const needsDecision = project.status !== "normal" || project.blockedIssue !== "없음"

          return (
            <div key={project.id} className="border-t border-[#E4E8E1] pt-3 first:border-t-0 first:pt-0">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 truncate text-[13px] font-semibold text-[#0D0D0D]">{notes?.lane || project.name}</div>
                <div className={cn(
                  "shrink-0 rounded-sm px-2 py-0.5 text-[11px] font-semibold",
                  needsDecision ? "bg-[#FFF8EC] text-[#9E5700]" : "bg-[#EFFAF4] text-[#177D4E]",
                )}>
                  {needsDecision ? "판단 대기" : "유지"}
                </div>
              </div>
              <div className="mt-1 break-words text-[12px] leading-5 text-[#5E5E5E]">
                {notes?.operatingQuestion || project.nextMilestone}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function SignalCount({ label, value, tone }: { label: string; value: number; tone: "green" | "amber" | "red" }) {
  const toneClass =
    tone === "green"
      ? "border-[#BDE8CD] bg-[#F0FBF5] text-[#177D4E]"
      : tone === "amber"
        ? "border-[#F5CE8B] bg-[#FFF8EC] text-[#9E5700]"
        : "border-[#FFB8B8] bg-[#FFF5F5] text-[#D92D20]"

  return (
    <div className={`rounded-md border px-2 py-2 ${toneClass}`}>
      <div className="text-[11px] font-semibold">{label}</div>
      <div className="mt-1 text-lg font-semibold leading-none">{value}</div>
    </div>
  )
}

function EngineProgressCard({ project }: { project: CommandCenterProject }) {
  return (
    <Card className="mt-5 overflow-hidden border-[#D7DDD2] bg-white p-4 shadow-none sm:p-5">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] xl:items-stretch">
        <div className="flex min-w-0 flex-col justify-between gap-5">
          <div>
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#101820] text-white">
                  <Cpu className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase text-[#6E7769]">Workspace Status</div>
                  <h2 className="mt-1 break-words text-2xl font-semibold leading-tight text-[#0D0D0D]">
                    {project.name}
                  </h2>
                  <p className="mt-1 break-words text-sm leading-6 text-[#5E5E5E]">{project.role}</p>
                </div>
              </div>
              <StatusBadge status={project.status} label={project.statusLabel} />
            </div>

            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_160px] sm:items-end">
              <div className="flex min-w-0 items-center gap-2 rounded-md border border-[#E1E5DC] bg-[#FBFCFA] px-3 py-2 text-[12px] font-medium text-[#5E5E5E]">
                <UserRound className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{project.owner}</span>
              </div>
              <div>
                <div className="mb-2 flex items-end justify-between gap-3">
                  <div className="text-[11px] font-semibold uppercase text-[#6E7769]">Progress</div>
                  <div className="text-2xl font-semibold leading-none text-[#0D0D0D]">{project.progress}%</div>
                </div>
                <ProgressBar value={project.progress} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-[#E4E8E1] pt-4">
            {engineBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-md border border-[#D7DDD2] bg-[#F8FAF6] px-2.5 py-1 text-[11px] font-semibold text-[#4F594A]"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="grid min-w-0 gap-3 md:grid-cols-2">
          <EngineField label="이번 주 작업" value={project.weeklyFocus} icon={ClipboardCheck} />
          <EngineField label="이번 주 산출물" value={project.deliverable} icon={Gauge} />
          <EngineField label="막힌 이슈" value={project.blockedIssue} muted={project.blockedIssue === "없음"} icon={Flag} />
          <EngineField label="다음 마일스톤" value={project.nextMilestone} icon={CalendarDays} />
          <div className="grid gap-2 border-t border-[#E5E5E5] pt-3 text-[12px] text-[#5E5E5E] md:col-span-2 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Flag className="h-3.5 w-3.5 shrink-0 text-[#6E7769]" aria-hidden="true" />
              <span className="truncate">{project.statusLabel}</span>
            </div>
            <div className="flex items-center gap-2 sm:justify-end">
              <CalendarDays className="h-3.5 w-3.5 shrink-0 text-[#6E7769]" aria-hidden="true" />
              <span className="break-words">{project.updatedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function EngineField({
  label,
  value,
  muted,
  icon: Icon,
}: {
  label: string
  value: string
  muted?: boolean
  icon: typeof ClipboardCheck
}) {
  return (
    <div className="min-w-0 rounded-md border border-[#E1E5DC] bg-[#FBFCFA] p-3">
      <div className="flex items-center gap-2 text-[11px] font-semibold text-[#6E7769]">
        <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {label}
      </div>
      <div className={`mt-1 min-w-0 break-words text-[13px] leading-5 ${muted ? "text-[#667065]" : "text-[#0D0D0D]"}`}>
        {value}
      </div>
    </div>
  )
}
