import Link from "next/link"
import { ArrowLeft, CalendarDays, Cpu, Flag, LayoutDashboard, UserRound } from "lucide-react"

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

export function CommandCenterPage({ data = commandCenterData }: { data?: CommandCenterData }) {
  const summary = getCommandCenterSummary(data.projects)
  const sourceLabel = data.source === "live" ? "최신 운영 데이터" : "기본 운영 데이터"
  const hasSmokeMarker = hasCommandCenterSmokeMarker(data)
  const engineProject = data.projects.find((project) => project.id === "agent_core")
  const productProjects = data.projects.filter((project) => project.id !== "agent_core")

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F7F7] text-[#0D0D0D]">
      <header className="sticky top-0 z-40 border-b border-[#E5E5E5] bg-[#F7F7F7]/90 backdrop-blur">
        <div className="mx-auto flex h-12 w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0D0D0D] text-white">
              <LayoutDashboard className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-[13px] font-semibold">AdMate Command Center</div>
              <div className="hidden text-[11px] text-[#9A9A9A] sm:block">Executive Progress Dashboard</div>
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
        <section className="mb-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-md border border-[#E5E5E5] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#5E5E5E]">
                Weekly Executive View · {sourceLabel}
              </div>
              {hasSmokeMarker ? (
                <div className="inline-flex rounded-md border border-[#F5CE8B] bg-[#FFF8EC] px-2.5 py-1 text-[11px] font-semibold text-[#9E5700]">
                  운영 확인용 데이터
                </div>
              ) : null}
            </div>
            <h1 className="max-w-full text-balance break-words text-2xl font-semibold tracking-normal text-[#0D0D0D] sm:text-4xl">
              AdMate Command Center
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5E5E5E]">
              이번 주 AdMate 제품군의 진행률, 상태, 산출물, 막힌 이슈를 한 화면에서 확인합니다.
            </p>
          </div>
          <div className="max-w-full rounded-lg border border-[#E5E5E5] bg-white p-3 text-[12px] leading-5 text-[#5E5E5E]">
            <span className="font-semibold text-[#0D0D0D]">보고 기준</span>
            <span className="mx-2 text-[#D4D4D4]">/</span>
            진행률은 완료 기준에 맞춰 보수적으로 입력하며, 막힌 이슈가 있으면 상태를 별도로 표시합니다.
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

        <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {productProjects.map((project) => (
            <ProjectProgressCard key={project.id} project={project} />
          ))}
        </section>
      </div>
    </main>
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
