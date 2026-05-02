import { cn } from "@/lib/utils"

export function ProgressBar({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const safeValue = Math.max(0, Math.min(100, value))

  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-[#ECECEC]", className)} aria-hidden="true">
      <div
        className="h-full rounded-full bg-[#5E6AD2]"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  )
}
