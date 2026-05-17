import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  ArrowLeft,
  BookMarked,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Eye,
  Flag,
  Gauge,
  History,
  Landmark,
  LockKeyhole,
  Radar,
  ShieldAlert,
  TimerReset,
  TrendingUp,
} from "lucide-react"

import { ProgressBar } from "@/components/command-center/ProgressBar"
import { StatusBadge } from "@/components/command-center/StatusBadge"
import {
  commandCenterData,
  getCommandCenterSummary,
  hasCommandCenterSmokeMarker,
  type CommandCenterData,
  type CommandCenterProject,
} from "@/lib/command-center-data"
import { cn } from "@/lib/utils"

type ProductCue = {
  label: string
  desk: string
  cue: string
  question: string
  icon: LucideIcon
  accent: string
  rail: string
}

const productCues: Record<string, ProductCue> = {
  compass: {
    label: "Compass",
    desk: "정책 근거",
    cue: "정책 근거",
    question: "답변 기준과 출처가 같은 방향을 보고 있는가",
    icon: BookMarked,
    accent: "text-[#245C73]",
    rail: "bg-[#245C73]",
  },
  sentinel: {
    label: "Sentinel",
    desk: "위험 관문",
    cue: "사전 검수",
    question: "캠페인이 멈추기 전에 운영자가 개입할 수 있는가",
    icon: ShieldAlert,
    accent: "text-[#A05A11]",
    rail: "bg-[#A05A11]",
  },
  lens: {
    label: "Lens",
    desk: "증빙 캡처",
    cue: "증빙 캡처",
    question: "보고에 바로 넣을 수 있는 증거가 남는가",
    icon: Eye,
    accent: "text-[#4E665B]",
    rail: "bg-[#4E665B]",
  },
  foresight: {
    label: "Foresight",
    desk: "예측 기획",
    cue: "예측 기준",
    question: "예산 판단에 쓸 기준이 확정됐는가",
    icon: TrendingUp,
    accent: "text-[#7A6428]",
    rail: "bg-[#7A6428]",
  },
}

export function CommandCenterDesignPreview({
  data = commandCenterData,
}: {
  data?: CommandCenterData
}) {
  const summary = getCommandCenterSummary(data.projects)
  const productProjects = data.projects.filter((project) => project.id !== "agent_core")
  const memoryProject = data.projects.find((project) => project.id === "agent_core")
  const reviewProjects = productProjects.filter(
    (project) => project.status !== "normal" || project.blockedIssue !== "없음",
  )
  const actionProjects = reviewProjects.length > 0 ? reviewProjects : productProjects.slice(0, 2)
  const blockers = productProjects.filter((project) => project.blockedIssue !== "없음")
  const hasSmokeMarker = hasCommandCenterSmokeMarker(data)
  const sourceLabel = data.source === "live" ? "최신 운영 데이터" : "기본 운영 데이터"
  const boardState = summary.needsReviewCount > 0 || summary.delayedCount > 0 ? "결정 필요" : "운영 안정"

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F2F3EF] text-[#101412]">
      <header className="border-b border-[#D8DDD5] bg-[#F8F8F4]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/command-center"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#CCD4CA] bg-white text-[#101412] transition hover:border-[#101412] focus:outline-none focus:ring-2 focus:ring-[#2F7D50]/40"
              aria-label="Back to Command Center"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
            <div className="min-w-0">
              <div className="truncate text-[13px] font-semibold">AdMate Command Center / 시안</div>
              <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium text-[#657066]">
                <span>{data.weekLabel}</span>
                <span>{sourceLabel}</span>
                <span>{data.updatedAt}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
            <span className="rounded-md border border-[#CBD8CF] bg-white px-2.5 py-1 text-[#405047]">{boardState}</span>
            {hasSmokeMarker ? (
              <span className="rounded-md border border-[#F1CC88] bg-[#FFF8EA] px-2.5 py-1 text-[#8D560D]">
                검증 마커
              </span>
            ) : null}
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1440px] gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_400px]">
          <DecisionLane
            actionProjects={actionProjects}
            blockers={blockers}
            updatedAt={data.updatedAt}
            overallProgress={summary.overallProgress}
          />
          {memoryProject ? <OperatingMemory project={memoryProject} /> : null}
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)]">
          <ControlSummary summary={summary} projectCount={productProjects.length} />
          <ProductStream projects={productProjects} />
        </section>
      </div>
    </main>
  )
}

function DecisionLane({
  actionProjects,
  blockers,
  updatedAt,
  overallProgress,
}: {
  actionProjects: CommandCenterProject[]
  blockers: CommandCenterProject[]
  updatedAt: string
  overallProgress: number
}) {
  const leadProject = actionProjects[0]
  const leadCue = leadProject ? productCues[leadProject.id] : undefined

  return (
    <section className="min-w-0 overflow-hidden rounded-lg border border-[#C9D1C8] bg-[#101820] text-white">
      <div className="grid min-w-0 gap-0 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0 p-4 sm:p-6 lg:p-7">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-[11px] font-semibold">
            <span className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-[#DCE4DB]">
              주요 판단 레인
            </span>
            <span className="rounded-md border border-[#9FE5C1]/40 bg-[#9FE5C1]/10 px-2.5 py-1 text-[#BDF0D1]">
              업데이트 {updatedAt}
            </span>
          </div>

          <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_190px] lg:items-end">
            <div className="min-w-0">
              <h1 className="max-w-4xl text-balance break-words text-3xl font-semibold leading-[1.08] tracking-normal sm:text-5xl">
                {leadProject ? leadProject.nextMilestone : "제품별 다음 판단 대기"}
              </h1>
              <p className="mt-4 max-w-2xl break-words text-sm leading-6 text-[#C9D2C9]">
                {leadProject
                  ? `${leadProject.name}의 이번 주 판단을 먼저 올리고, 나머지 제품은 승인 기준과 막힌 이슈만 남깁니다.`
                  : "현재 표시할 판단 항목이 없습니다."}
              </p>
            </div>
            <div className="min-w-0 rounded-md border border-white/12 bg-white/[0.05] p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold text-[#AEB8B0]">전체 프로젝트 진척률</span>
                <Gauge className="h-4 w-4 shrink-0 text-[#9FE5C1]" aria-hidden="true" />
              </div>
              <div className="mt-3 text-4xl font-semibold leading-none tabular-nums">{overallProgress}%</div>
              <ProgressBar value={overallProgress} className="mt-3 bg-white/15" />
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <DecisionTile
              icon={TimerReset}
              label="지금 볼 일"
              value={leadProject ? leadProject.weeklyFocus : "대기 중"}
            />
            <DecisionTile
              icon={Landmark}
              label="다음 판단"
              value={leadCue?.question || leadProject?.nextMilestone || "제품별 판단 대기"}
            />
            <DecisionTile
              icon={LockKeyhole}
              label="승인/차단"
              value={blockers[0]?.blockedIssue || "막힌 이슈 없음"}
            />
          </div>
        </div>

        <div className="border-t border-white/10 bg-white/[0.04] p-4 sm:p-5 lg:border-l lg:border-t-0">
          <div className="text-[11px] font-semibold uppercase text-[#AEB8B0]">액션 대기열</div>
          <div className="mt-4 grid gap-2">
            {actionProjects.map((project) => (
              <ActionQueueRow key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DecisionTile({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="min-w-0 rounded-md border border-white/12 bg-white/[0.045] p-3">
      <div className="flex items-center gap-2 text-[11px] font-semibold text-[#AEB8B0]">
        <Icon className="h-3.5 w-3.5 shrink-0 text-[#9FE5C1]" aria-hidden="true" />
        <span className="truncate">{label}</span>
      </div>
      <div className="mt-2 line-clamp-3 break-words text-[13px] font-medium leading-5 text-white">{value}</div>
    </div>
  )
}

function ActionQueueRow({ project }: { project: CommandCenterProject }) {
  const cue = productCues[project.id]
  const Icon = cue?.icon || Flag

  return (
    <article className="min-w-0 rounded-md border border-white/10 bg-[#F7F8F3] p-3 text-[#101412]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2">
          <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", cue?.accent || "text-[#4E665B]")} aria-hidden="true" />
          <div className="min-w-0">
            <div className="truncate text-[13px] font-semibold">{project.name}</div>
            <div className="mt-1 line-clamp-2 break-words text-[12px] leading-5 text-[#5F695F]">{project.nextMilestone}</div>
          </div>
        </div>
        <StatusBadge status={project.status} label={project.statusLabel} className="shrink-0" />
      </div>
    </article>
  )
}

function OperatingMemory({ project }: { project: CommandCenterProject }) {
  return (
    <aside className="min-w-0 rounded-lg border border-[#C9D1C8] bg-[#FAFAF7] p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase text-[#687267]">Agent Core</div>
          <h2 className="mt-1 break-words text-xl font-semibold leading-tight text-[#101412]">공통 운영 현황</h2>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#101820] text-white">
          <Database className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        <MemoryMetric label="현재 상태" value={project.statusLabel} icon={CheckCircle2} />
        <MemoryMetric label="관리 기준" value={project.deliverable} icon={ClipboardCheck} />
        <MemoryMetric label="다음 개선 항목" value={project.nextMilestone} icon={History} />
      </div>

      <div className="mt-5 border-t border-[#DDE2DA] pt-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase text-[#687267]">Agent Core 진행률</span>
          <span className="text-xl font-semibold leading-none tabular-nums text-[#101412]">{project.progress}%</span>
        </div>
        <ProgressBar value={project.progress} />
        <p className="mt-3 break-words text-[12px] leading-5 text-[#606B61]">{project.weeklyFocus}</p>
      </div>
    </aside>
  )
}

function MemoryMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: LucideIcon
}) {
  return (
    <div className="min-w-0 border-l-2 border-[#2F7D50] pl-3">
      <div className="flex items-center gap-2 text-[11px] font-semibold text-[#687267]">
        <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>{label}</span>
      </div>
      <div className="mt-1 break-words text-[13px] font-semibold leading-5 text-[#101412]">{value}</div>
    </div>
  )
}

function ControlSummary({
  summary,
  projectCount,
}: {
  summary: ReturnType<typeof getCommandCenterSummary>
  projectCount: number
}) {
  const metrics = [
    { label: "제품 라인", value: projectCount, tone: "text-[#101412]" },
    { label: "정상", value: summary.normalCount, tone: "text-[#177D4E]" },
    { label: "검토", value: summary.needsReviewCount, tone: "text-[#9E5700]" },
    { label: "지연", value: summary.delayedCount, tone: "text-[#D93025]" },
  ]

  return (
    <section className="min-w-0 rounded-lg border border-[#D6DDD3] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase text-[#687267]">운영 관제</div>
          <h2 className="mt-1 text-xl font-semibold text-[#101412]">신호 장부</h2>
        </div>
        <Radar className="h-5 w-5 shrink-0 text-[#2F7D50]" aria-hidden="true" />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {metrics.map((metric) => (
          <div key={metric.label} className="min-w-0 rounded-md border border-[#E1E6DE] bg-[#F8F9F5] p-3">
            <div className="text-[11px] font-semibold text-[#687267]">{metric.label}</div>
            <div className={cn("mt-2 text-3xl font-semibold leading-none tabular-nums", metric.tone)}>{metric.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-md border border-[#E1E6DE] bg-[#F8F9F5] p-3">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-[11px] font-semibold text-[#687267]">전체 평균 진행률</span>
          <span className="text-lg font-semibold leading-none tabular-nums">{summary.overallProgress}%</span>
        </div>
        <ProgressBar value={summary.overallProgress} />
      </div>
    </section>
  )
}

function ProductStream({ projects }: { projects: CommandCenterProject[] }) {
  return (
    <section className="min-w-0 rounded-lg border border-[#D6DDD3] bg-[#FAFAF7] p-3 sm:p-4">
      <div className="flex flex-wrap items-end justify-between gap-3 px-1">
        <div>
          <div className="text-[11px] font-semibold uppercase text-[#687267]">제품 신호</div>
          <h2 className="mt-1 text-xl font-semibold text-[#101412]">운영 흐름</h2>
        </div>
        <div className="max-w-md break-words text-[12px] leading-5 text-[#606B61]">
          제품 설명 대신 근거, 위험 관문, 증빙, 예측 기준을 한 줄씩 맞춥니다.
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        {projects.map((project) => (
          <ProductStreamRow key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

function ProductStreamRow({ project }: { project: CommandCenterProject }) {
  const cue = productCues[project.id]
  const Icon = cue?.icon || Flag

  return (
    <article className="grid min-w-0 gap-3 rounded-md border border-[#E1E6DE] bg-white p-3 transition hover:border-[#B8C7BC] md:grid-cols-[160px_minmax(0,1fr)_180px] md:items-center">
      <div className="flex min-w-0 items-start gap-3">
        <span className={cn("mt-1 h-10 w-1 shrink-0 rounded-sm", cue?.rail || "bg-[#4E665B]")} aria-hidden="true" />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Icon className={cn("h-4 w-4 shrink-0", cue?.accent || "text-[#4E665B]")} aria-hidden="true" />
            <span className="truncate text-[13px] font-semibold text-[#101412]">{cue?.label || project.name}</span>
          </div>
          <div className="mt-1 truncate text-[11px] font-semibold text-[#687267]">{cue?.desk || project.role}</div>
        </div>
      </div>

      <div className="min-w-0">
        <div className="break-words text-[13px] font-semibold leading-5 text-[#101412]">{project.weeklyFocus}</div>
        <div className="mt-1 break-words text-[12px] leading-5 text-[#606B61]">
          {cue?.cue || "운영 기준"}: {project.deliverable}
        </div>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} label={project.statusLabel} />
          <span className="text-[12px] font-semibold tabular-nums text-[#101412]">{project.progress}%</span>
        </div>
        <ProgressBar value={project.progress} className="mt-2" />
        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-[#687267]">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{project.updatedAt}</span>
        </div>
      </div>
    </article>
  )
}
