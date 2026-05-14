import { CalendarDays, CircleDot, Flag, PackageCheck, Route, UserRound } from "lucide-react"

import { Card } from "@/components/ui/card"
import { ProgressBar } from "@/components/command-center/ProgressBar"
import { StatusBadge } from "@/components/command-center/StatusBadge"
import type { CommandCenterProject } from "@/lib/command-center-data"
import { cn } from "@/lib/utils"

const accentStyles: Record<string, string> = {
  compass: "bg-[#EEF4F6] text-[#27566B]",
  sentinel: "bg-[#EFFAF4] text-[#177D4E]",
  lens: "bg-[#F0F6F3] text-[#47645C]",
  foresight: "bg-[#FFF8EC] text-[#9E5700]",
  agent_core: "bg-[#ECECEC] text-[#111827]",
}

const commandLabels: Record<string, string> = {
  compass: "정책 근거",
  sentinel: "검수/감시",
  lens: "증빙 자동화",
  foresight: "예측 판단",
  agent_core: "운영 기준",
}

function productSignal(project: CommandCenterProject) {
  if (project.status === "delayed") return "Hold"
  if (project.status === "needs_review" || project.blockedIssue !== "없음") return "Review"
  if (project.progress >= 70) return "Ready"
  return "Build"
}

function FieldRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="grid gap-1 border-t border-[#E4E8E1] py-2.5 first:border-t-0 first:pt-0">
      <div className="text-[11px] font-semibold text-[#6E7769]">{label}</div>
      <div className={cn("min-w-0 break-words text-[13px] leading-5 text-[#0D0D0D]", muted && "text-[#667065]")}>
        {value}
      </div>
    </div>
  )
}

export function ProjectProgressCard({ project }: { project: CommandCenterProject }) {
  const signal = productSignal(project)

  return (
    <Card className="flex min-h-[420px] min-w-0 flex-col overflow-hidden border-[#D7DDD2] bg-white p-4 shadow-none">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className={cn(
            "mb-3 flex h-9 w-9 items-center justify-center rounded-md",
            accentStyles[project.id] || "bg-[#F7F7F7] text-[#5E5E5E]",
          )}>
            <PackageCheck className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="mb-1 flex min-w-0 flex-wrap items-center gap-2">
            <span className="rounded-sm border border-[#DDE3D7] bg-[#F8FAF6] px-2 py-0.5 text-[11px] font-semibold text-[#4F594A]">
              {commandLabels[project.id] || "제품 운영"}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#6E7769]">
              <CircleDot className="h-3 w-3 shrink-0" aria-hidden="true" />
              {signal}
            </span>
          </div>
          <h2 className="break-words text-lg font-semibold leading-tight text-[#0D0D0D]">{project.name}</h2>
          <p className="mt-1 min-h-10 break-words text-[13px] leading-5 text-[#5E5E5E]">{project.role}</p>
        </div>
        <StatusBadge status={project.status} label={project.statusLabel} />
      </div>

      <div className="mt-4 grid gap-3 rounded-md border border-[#E1E5DC] bg-[#FBFCFA] p-3 sm:grid-cols-2">
        <div className="flex min-w-0 items-center gap-2 text-[12px] font-medium text-[#5E5E5E]">
          <UserRound className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{project.owner}</span>
        </div>
        <div className="min-w-0">
          <div className="mb-2 flex items-end justify-between gap-3">
            <div className="text-[11px] font-semibold uppercase text-[#6E7769]">Progress</div>
            <div className="text-2xl font-semibold leading-none text-[#0D0D0D]">{project.progress}%</div>
          </div>
          <ProgressBar value={project.progress} />
        </div>
      </div>

      <div className="mt-4 border-y border-[#E4E8E1] py-3">
        <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase text-[#6E7769]">
          <Route className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Decision Path
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 shrink-0 rounded-full bg-[#2F7D50]" />
          <div className="h-px min-w-0 flex-1 bg-[#D7DDD2]" />
          <div className={cn("h-2 w-2 shrink-0 rounded-full", project.status === "needs_review" ? "bg-[#C27A19]" : "bg-[#2F7D50]")} />
          <div className="h-px min-w-0 flex-1 bg-[#D7DDD2]" />
          <div className={cn("h-2 w-2 shrink-0 rounded-full", project.status === "delayed" ? "bg-[#D93025]" : "bg-[#2F7D50]")} />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] font-semibold text-[#667065]">
          <span>준비</span>
          <span className="text-center">판단</span>
          <span className="text-right">전환</span>
        </div>
      </div>

      <div className="mt-3 grid flex-1 gap-0">
        <FieldRow label="이번 주 작업" value={project.weeklyFocus} />
        <FieldRow label="이번 주 산출물" value={project.deliverable} />
        <FieldRow label="막힌 이슈" value={project.blockedIssue} muted={project.blockedIssue === "없음"} />
        <FieldRow label="다음 마일스톤" value={project.nextMilestone} />
      </div>

      <div className="mt-3 grid gap-2 border-t border-[#E5E5E5] pt-3 text-[12px] text-[#5E5E5E] sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <Flag className="h-3.5 w-3.5 shrink-0 text-[#9A9A9A]" aria-hidden="true" />
          <span className="truncate">{project.statusLabel}</span>
        </div>
        <div className="flex items-center gap-2 sm:justify-end">
          <CalendarDays className="h-3.5 w-3.5 shrink-0 text-[#9A9A9A]" aria-hidden="true" />
          <span className="break-words">{project.updatedAt}</span>
        </div>
      </div>
    </Card>
  )
}
