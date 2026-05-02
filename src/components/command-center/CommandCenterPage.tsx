import Link from "next/link"
import { ArrowLeft, LayoutDashboard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectProgressCard } from "@/components/command-center/ProjectProgressCard"
import { SummaryCards } from "@/components/command-center/SummaryCards"
import { commandCenterData, getCommandCenterSummary } from "@/lib/command-center-data"

export function CommandCenterPage() {
  const summary = getCommandCenterSummary(commandCenterData.projects)

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
            <div className="mb-2 inline-flex rounded-md border border-[#E5E5E5] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#5E5E5E]">
              Weekly Executive View
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
          weekLabel={commandCenterData.weekLabel}
          updatedAt={commandCenterData.updatedAt}
          overallProgress={summary.overallProgress}
          normalCount={summary.normalCount}
          needsReviewCount={summary.needsReviewCount}
          delayedCount={summary.delayedCount}
        />

        <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {commandCenterData.projects.map((project) => (
            <ProjectProgressCard key={project.id} project={project} />
          ))}
        </section>
      </div>
    </main>
  )
}
