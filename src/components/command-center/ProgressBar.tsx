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
    <div className={cn("h-2 overflow-hidden rounded-sm bg-[#E4E8E1]", className)} aria-hidden="true">
      <div
        className="h-full rounded-sm bg-[#2F7D50]"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  )
}
