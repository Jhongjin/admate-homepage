import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: ReactNode
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Badge variant="outline" className="mb-4 bg-card text-muted-foreground">
        {eyebrow}
      </Badge>
      <h2 className="text-balance text-2xl font-semibold tracking-normal text-foreground sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}
