import { AlertTriangle, CalendarDays, CheckCircle2, Clock3, Gauge, RefreshCcw } from "lucide-react"

import { Card } from "@/components/ui/card"
import { ProgressBar } from "@/components/command-center/ProgressBar"

export function SummaryCards({
  weekLabel,
  updatedAt,
  overallProgress,
  normalCount,
  needsReviewCount,
  delayedCount,
}: {
  weekLabel: string
  updatedAt: string
  overallProgress: number
  normalCount: number
  needsReviewCount: number
  delayedCount: number
}) {
  const items = [
    {
      label: "기준 주차",
      value: weekLabel,
      icon: CalendarDays,
      tone: "text-[#27566B]",
    },
    {
      label: "마지막 업데이트",
      value: updatedAt,
      icon: RefreshCcw,
      tone: "text-[#5E5E5E]",
    },
    {
      label: "정상",
      value: `${normalCount}개`,
      icon: CheckCircle2,
      tone: "text-[#177D4E]",
    },
    {
      label: "검토 필요",
      value: `${needsReviewCount}개`,
      icon: AlertTriangle,
      tone: "text-[#9E5700]",
    },
    {
      label: "지연",
      value: `${delayedCount}개`,
      icon: Clock3,
      tone: "text-[#D93025]",
    },
  ]

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(260px,1.25fr)_repeat(5,minmax(130px,1fr))]">
      <Card className="min-w-0 overflow-hidden border-[#CCD4C8] bg-[#FBFCFA] p-4 shadow-none">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase text-[#6E7769]">전체 평균 진행률</div>
            <div className="mt-2 text-3xl font-semibold leading-none text-[#0D0D0D]">{overallProgress}%</div>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#EAF2ED] text-[#2F7D50]">
            <Gauge className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
        <ProgressBar value={overallProgress} className="mt-4" />
      </Card>

      {items.map((item) => (
        <Card key={item.label} className="min-w-0 overflow-hidden border-[#E1E5DC] bg-white p-4 shadow-none">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-[#6E7769]">{item.label}</div>
              <div className="mt-2 truncate text-lg font-semibold text-[#0D0D0D]">{item.value}</div>
            </div>
            <item.icon className={`h-4 w-4 shrink-0 ${item.tone}`} aria-hidden="true" />
          </div>
        </Card>
      ))}
    </div>
  )
}
