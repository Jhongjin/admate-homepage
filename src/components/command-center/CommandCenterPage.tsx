import Link from "next/link"
import {
  Activity,
  ArrowLeft,
  CalendarDays,
  CircleDot,
  Cpu,
  Flag,
  LayoutDashboard,
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

const engineBadges = ["워크스페이스 상태", "제품 신호", "운영 기준", "자동화", "거버넌스"]

const operatingLanes = [
  {
    label: "오늘 볼 것",
    value: "검토 필요 제품과 다음 의사결정",
  },
  {
    label: "안정 신호",
    value: "인증, 운영 상태, QA 기준 유지",
  },
  {
    label: "다음 전환",
    value: "제품별 cockpit 구현 순차 적용",
  },
]

export function CommandCenterPage({ data = commandCenterData }: { data?: CommandCenterData }) {
  const summary = getCommandCenterSummary(data.projects)
  const sourceLabel = data.source === "live" ? "최신 운영 데이터" : "기본 운영 데이터"
  const hasSmokeMarker = hasCommandCenterSmokeMarker(data)
  const engineProject = data.projects.find((project) => project.id === "agent_core")
  const productProjects = data.projects.filter((project) => project.id !== "agent_core")
  const reviewProjects = productProjects.filter((project) => project.status !== "normal")
  const leadReviewProject = reviewProjects[0] || productProjects.find((project) => project.progress < 50) || productProjects[0]
  const nextDecision = leadReviewProject
    ? `${leadReviewProject.name}: ${leadReviewProject.nextMilestone}`
    : "제품별 다음 판단 대기"
  const readinessLabel = summary.needsReviewCount > 0 ? "의사결정 대기 있음" : "안정 운용"

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
          <div className="overflow-hidden rounded-lg border border-[#D9DDD4] bg-[#FAFAF8]">
            <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_220px]">
              <div className="p-4 sm:p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <div className="inline-flex rounded-md border border-[#D9DDD4] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#4F594A]">
                    Weekly Operating View · {sourceLabel}
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
                  이번 주 AdMate 운영판
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5E5E5E]">
                  제품군이 어디까지 안정화됐고, 어떤 판단을 먼저 내려야 하는지 한 화면에서 확인합니다.
                </p>
                <div className="mt-5 grid gap-2 sm:grid-cols-3">
                  {operatingLanes.map((lane) => (
                    <div key={lane.label} className="rounded-lg border border-[#E1E4DD] bg-white px-3 py-2">
                      <div className="text-[11px] font-semibold text-[#7A8174]">{lane.label}</div>
                      <div className="mt-1 min-h-10 break-words text-[13px] font-semibold leading-5 text-[#111827]">
                        {lane.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#E1E4DD] bg-white p-4 xl:border-l xl:border-t-0 sm:p-5">
                <div className="text-[11px] font-semibold uppercase text-[#7A8174]">Operating Readiness</div>
                <div className="mt-2 text-5xl font-semibold leading-none tracking-normal text-[#0D0D0D]">
                  {summary.overallProgress}%
                </div>
                <ProgressBar value={summary.overallProgress} />
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <SignalCount label="정상" value={summary.normalCount} tone="green" />
                  <SignalCount label="검토" value={summary.needsReviewCount} tone="amber" />
                  <SignalCount label="지연" value={summary.delayedCount} tone="red" />
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 rounded-lg border border-[#D9DDD4] bg-[#111827] p-4 text-white sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase text-[#AEB7AA]">Decision Queue</div>
                <div className="mt-2 break-words text-xl font-semibold leading-tight">{nextDecision}</div>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <Activity className="h-4 w-4" aria-hidden="true" />
              </div>
            </div>
            <div className="grid gap-2 text-[12px] leading-5 text-[#D8DED4]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#9FE5C1]" aria-hidden="true" />
                <span>보고 기준: 운영 신호는 보수적 기준으로 표시</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleDot className="h-3.5 w-3.5 shrink-0 text-[#F5CE8B]" aria-hidden="true" />
                <span>막힌 이슈가 있으면 진행률보다 먼저 판단</span>
              </div>
            </div>
            <div className="border-t border-white/10 pt-3">
              <div className="text-[11px] font-semibold uppercase text-[#AEB7AA]">Next Operating Move</div>
              <div className="mt-1 break-words text-[13px] leading-5 text-white/90">
                제품별 cockpit 전환은 안정 신호가 확인된 화면부터 순차 적용합니다.
              </div>
            </div>
          </div>
        </section>

        <SummaryCards
          weekLabel={data.weekLabel}
          updatedAt={data.updatedAt}
          overallProgress={summary.overallProgress}
          normalCount={summary.normalCount}
          needsReviewCount={summary.needsReviewCount}
          delayedCount={summary.delayedCount}
        />

        {engineProject ? <EngineProgressCard project={engineProject} /> : null}

        <ProductSignalRail projects={productProjects} />

        <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {productProjects.map((project) => (
            <ProjectProgressCard key={project.id} project={project} />
          ))}
        </section>
      </div>
    </main>
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
    <div className={`rounded-lg border px-2 py-2 ${toneClass}`}>
      <div className="text-[11px] font-semibold">{label}</div>
      <div className="mt-1 text-lg font-semibold leading-none">{value}</div>
    </div>
  )
}

function ProductSignalRail({ projects }: { projects: CommandCenterProject[] }) {
  return (
    <section className="mt-5 rounded-lg border border-[#D9DDD4] bg-[#FAFAF8] p-3 sm:p-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase text-[#7A8174]">Product Signal Map</div>
          <h2 className="mt-1 text-lg font-semibold text-[#0D0D0D]">제품별 진행 신호</h2>
        </div>
        <div className="break-words text-[12px] text-[#5E5E5E]">
          진행률은 완료 기준에 맞춰 보수적으로 표시합니다.
        </div>
      </div>
      <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
        {projects.map((project) => (
          <div key={project.id} className="rounded-lg border border-[#E1E4DD] bg-white p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-[13px] font-semibold text-[#0D0D0D]">{project.name}</div>
                <div className="mt-1 line-clamp-2 break-words text-[12px] leading-5 text-[#5E5E5E]">
                  {project.nextMilestone}
                </div>
              </div>
              <StatusBadge status={project.status} label={project.statusLabel} />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="shrink-0 text-xl font-semibold leading-none text-[#0D0D0D]">{project.progress}%</div>
              <ProgressBar value={project.progress} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function EngineProgressCard({ project }: { project: CommandCenterProject }) {
  return (
    <Card className="mt-5 overflow-hidden border-[#CBD0EF] bg-white p-4 shadow-none sm:p-5">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] xl:items-stretch">
        <div className="flex min-w-0 flex-col justify-between gap-5">
          <div>
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#111827] text-white">
                  <Cpu className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase text-[#9A9A9A]">Workspace Status</div>
                  <h2 className="mt-1 break-words text-2xl font-semibold leading-tight text-[#0D0D0D]">
                    {project.name}
                  </h2>
                  <p className="mt-1 break-words text-sm leading-6 text-[#5E5E5E]">{project.role}</p>
                </div>
              </div>
              <StatusBadge status={project.status} label={project.statusLabel} />
            </div>

            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_160px] sm:items-end">
              <div className="flex min-w-0 items-center gap-2 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] px-3 py-2 text-[12px] font-medium text-[#5E5E5E]">
                <UserRound className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{project.owner}</span>
              </div>
              <div>
                <div className="mb-2 flex items-end justify-between gap-3">
                  <div className="text-[11px] font-semibold uppercase text-[#9A9A9A]">Progress</div>
                  <div className="text-2xl font-semibold leading-none text-[#0D0D0D]">{project.progress}%</div>
                </div>
                <ProgressBar value={project.progress} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-[#E5E5E5] pt-4">
            {engineBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-md border border-[#CBD0EF] bg-[#ECEDF9] px-2.5 py-1 text-[11px] font-semibold text-[#5E6AD2]"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="grid min-w-0 gap-3 md:grid-cols-2">
          <EngineField label="이번 주 작업" value={project.weeklyFocus} />
          <EngineField label="이번 주 산출물" value={project.deliverable} />
          <EngineField label="막힌 이슈" value={project.blockedIssue} muted={project.blockedIssue === "없음"} />
          <EngineField label="다음 마일스톤" value={project.nextMilestone} />
          <div className="grid gap-2 border-t border-[#E5E5E5] pt-3 text-[12px] text-[#5E5E5E] md:col-span-2 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Flag className="h-3.5 w-3.5 shrink-0 text-[#9A9A9A]" aria-hidden="true" />
              <span className="truncate">{project.statusLabel}</span>
            </div>
            <div className="flex items-center gap-2 sm:justify-end">
              <CalendarDays className="h-3.5 w-3.5 shrink-0 text-[#9A9A9A]" aria-hidden="true" />
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
}: {
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div className="min-w-0 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-3">
      <div className="text-[11px] font-semibold text-[#9A9A9A]">{label}</div>
      <div className={`mt-1 min-w-0 break-words text-[13px] leading-5 ${muted ? "text-[#5E5E5E]" : "text-[#0D0D0D]"}`}>
        {value}
      </div>
    </div>
  )
}
