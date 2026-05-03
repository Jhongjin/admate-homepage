import { CalendarDays, Flag, PackageCheck, UserRound } from "lucide-react"

import { Card } from "@/components/ui/card"
import { ProgressBar } from "@/components/command-center/ProgressBar"
import { StatusBadge } from "@/components/command-center/StatusBadge"
import type { CommandCenterProject } from "@/lib/command-center-data"
import { cn } from "@/lib/utils"

const accentStyles: Record<string, string> = {
  compass: "bg-[#ECEDF9] text-[#5E6AD2]",
  sentinel: "bg-[#EFFAF4] text-[#177D4E]",
  lens: "bg-[#F7EEFF] text-[#8A46D6]",
  foresight: "bg-[#FFF8EC] text-[#9E5700]",
  agent_core: "bg-[#ECECEC] text-[#111827]",
}

function CardField({
  label,
  value,
  muted,
}: {
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div className="rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-3">
      <div className="text-[11px] font-semibold text-[#9A9A9A]">{label}</div>
      <div className={cn("mt-1 min-w-0 break-words text-[13px] leading-5 text-[#0D0D0D]", muted && "text-[#5E5E5E]")}>
        {value}
      </div>
    </div>
  )
}

export function ProjectProgressCard({ project }: { project: CommandCenterProject }) {
  return (
    <Card className="flex min-h-[420px] min-w-0 flex-col overflow-hidden p-4 shadow-none">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className={cn(
            "mb-3 flex h-9 w-9 items-center justify-center rounded-lg",
            accentStyles[project.id] || "bg-[#F7F7F7] text-[#5E5E5E]",
          )}>
            <PackageCheck className="h-4 w-4" aria-hidden="true" />
          </div>
          <h2 className="break-words text-lg font-semibold leading-tight text-[#0D0D0D]">{project.name}</h2>
          <p className="mt-1 min-h-10 break-words text-[13px] leading-5 text-[#5E5E5E]">{project.role}</p>
        </div>
        <StatusBadge status={project.status} label={project.statusLabel} />
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#E5E5E5] bg-white px-3 py-2 text-[12px] font-medium text-[#5E5E5E]">
        <UserRound className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="truncate">{project.owner}</span>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-end justify-between gap-3">
          <div className="text-[11px] font-semibold uppercase text-[#9A9A9A]">Progress</div>
          <div className="text-2xl font-semibold leading-none text-[#0D0D0D]">{project.progress}%</div>
        </div>
        <ProgressBar value={project.progress} />
      </div>

      <div className="mt-4 grid flex-1 gap-2">
        <CardField label="이번 주 작업" value={project.weeklyFocus} />
        <CardField label="이번 주 산출물" value={project.deliverable} />
        <CardField label="막힌 이슈" value={project.blockedIssue} muted={project.blockedIssue === "없음"} />
        <CardField label="다음 마일스톤" value={project.nextMilestone} />
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
