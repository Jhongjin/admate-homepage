import Link from "next/link"
import { ChevronDown, ExternalLink } from "lucide-react"

import { officialLinks } from "@/lib/admate-content"
import { cn } from "@/lib/utils"

type SiteLink = {
  label: string
  description: string
  href: string
  disabled?: boolean
}

const siteLinks: SiteLink[] = [
  {
    label: "AdMate Home",
    description: "브랜드 메인 페이지",
    href: officialLinks.home,
  },
  {
    label: "Command Center",
    description: "임원 대시보드",
    href: officialLinks.commandCenter,
  },
  {
    label: "AdMate 이용 신청",
    description: "필요한 제품 권한 신청",
    href: officialLinks.accessRequest,
  },
  {
    label: "AdMate Compass",
    description: "정책/가이드 확인",
    href: officialLinks.compass,
  },
  {
    label: "AdMate Sentinel",
    description: "운영 콘솔",
    href: officialLinks.sentinel,
  },
  {
    label: "AdMate Lens",
    description: "캡처 자동화",
    href: officialLinks.lens,
  },
  {
    label: "AdMate Foresight",
    description: "성과 예측 / 준비중",
    href: officialLinks.foresight,
    disabled: true,
  },
]

type SiteLinksDropdownProps = {
  dark?: boolean
  size?: "sm" | "lg"
  className?: string
}

export function SiteLinksDropdown({ className, dark = false, size = "sm" }: SiteLinksDropdownProps) {
  return (
    <details className="group relative">
      <summary
        className={cn(
          "inline-flex cursor-pointer list-none items-center justify-center gap-2 whitespace-nowrap rounded-md border font-semibold transition [&::-webkit-details-marker]:hidden",
          size === "lg" ? "h-11 min-w-[176px] px-5 text-sm" : "h-8 min-w-[104px] px-3 text-[13px]",
          dark
            ? "border-white/20 bg-transparent text-white hover:bg-white/10"
            : "border-border bg-background text-foreground hover:bg-muted",
          className
        )}
      >
        사이트 이동
        <ChevronDown className="h-3.5 w-3.5 transition group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div
        className={cn(
          "absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-lg border p-1 shadow-soft",
          dark ? "border-white/10 bg-[#111827] text-white" : "border-border bg-card text-foreground"
        )}
      >
        {siteLinks.map((site) => {
          const isExternal = site.href.startsWith("http")

          return site.disabled ? (
            <div
              key={site.label}
              aria-disabled="true"
              className={cn(
                "flex cursor-not-allowed items-start justify-between gap-3 rounded-md px-3 py-2.5 text-left opacity-50",
                dark ? "text-white" : "text-foreground"
              )}
            >
              <span>
                <span className="block text-sm font-semibold">{site.label}</span>
                <span className={cn("mt-0.5 block text-xs", dark ? "text-white/55" : "text-muted-foreground")}>
                  {site.description}
                </span>
              </span>
              <span className={cn("rounded-md border px-2 py-0.5 text-[11px] font-semibold", dark ? "border-white/15 text-white/60" : "border-border text-muted-foreground")}>
                준비중
              </span>
            </div>
          ) : (
            <Link
              key={site.href}
              href={site.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className={cn(
                "flex items-start justify-between gap-3 rounded-md px-3 py-2.5 text-left transition",
                dark ? "hover:bg-white/10" : "hover:bg-muted"
              )}
            >
              <span>
                <span className="block text-sm font-semibold">{site.label}</span>
                <span className={cn("mt-0.5 block text-xs", dark ? "text-white/55" : "text-muted-foreground")}>
                  {site.description}
                </span>
              </span>
              {isExternal ? (
                <ExternalLink className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", dark ? "text-white/45" : "text-muted-foreground")} aria-hidden="true" />
              ) : null}
            </Link>
          )
        })}
      </div>
    </details>
  )
}
