import { Badge } from "@/components/ui/badge"
import type { CommandCenterStatus } from "@/lib/command-center-data"
import { cn } from "@/lib/utils"

const statusStyles: Record<CommandCenterStatus, string> = {
  normal: "border-[#9FE5C1] bg-[#EFFAF4] text-[#177D4E]",
  "needs-review": "border-[#F5CE8B] bg-[#FFF8EC] text-[#9E5700]",
  delayed: "border-[#FAD3D1] bg-[#FEF2F1] text-[#D93025]",
  done: "border-[#CBD0EF] bg-[#ECEDF9] text-[#5E6AD2]",
}

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: CommandCenterStatus
  label: string
  className?: string
}) {
  return (
    <Badge variant="outline" className={cn("h-6 rounded-md px-2 text-[11px]", statusStyles[status], className)}>
      {label}
    </Badge>
  )
}
