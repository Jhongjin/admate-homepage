"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ChevronDown,
  Compass,
  Home,
  LineChart,
  Radar,
  ScanLine,
  Sparkles,
  UserPlus,
  type LucideIcon,
} from "lucide-react"

import { officialLinks } from "@/lib/admate-content"
import { cn } from "@/lib/utils"

type SiteLink = {
  label: string
  description: string
  href: string
  icon: LucideIcon
  active?: boolean
}

const siteLinks: SiteLink[] = [
  {
    label: "AdMate Home",
    description: "제품군 안내와 공지",
    href: officialLinks.home,
    icon: Home,
    active: true,
  },
  {
    label: "이용 권한 요청",
    description: "필요한 제품 권한 신청",
    href: officialLinks.accessRequest,
    icon: UserPlus,
  },
  {
    label: "Compass",
    description: "광고 정책 근거 확인",
    href: officialLinks.compass,
    icon: Compass,
  },
  {
    label: "Sentinel",
    description: "실시간 관제와 사전 검수",
    href: officialLinks.sentinel,
    icon: Radar,
  },
  {
    label: "Lens",
    description: "캡처 검수와 작업 기록",
    href: officialLinks.lens,
    icon: ScanLine,
  },
  {
    label: "Foresight",
    description: "성과 예측과 기준선 관리",
    href: officialLinks.foresight,
    icon: LineChart,
  },
]

type SiteLinksDropdownProps = {
  dark?: boolean
  size?: "sm" | "lg"
  className?: string
}

export function SiteLinksDropdown({ className, dark = false, size = "sm" }: SiteLinksDropdownProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const closeOnPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("pointerdown", closeOnPointerDown)
    document.addEventListener("keydown", closeOnEscape)

    return () => {
      document.removeEventListener("pointerdown", closeOnPointerDown)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [open])

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] border font-semibold transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          size === "lg" ? "h-11 min-w-[176px] px-5 text-sm" : "h-9 min-w-[116px] px-3 text-[13px]",
          dark
            ? "border-white/20 bg-transparent text-white hover:bg-white/10"
            : "border-[#C9BFAF] bg-white/45 text-[#101820] hover:border-[#101820]/25 hover:bg-white",
          className
        )}
      >
        <Sparkles className={cn("h-3.5 w-3.5", dark ? "text-white/70" : "text-[#A67B2D]")} aria-hidden="true" />
        사이트 이동
        <ChevronDown className={cn("h-3.5 w-3.5 transition", open ? "rotate-180" : null)} aria-hidden="true" />
      </button>
      {open ? (
        <DropdownPanel links={siteLinks} dark={dark} onNavigate={() => setOpen(false)} ariaLabel="AdMate 사이트 이동" />
      ) : null}
    </div>
  )
}

type DropdownPanelProps = {
  links: SiteLink[]
  ariaLabel: string
  dark?: boolean
  onNavigate: () => void
}

function DropdownPanel({ links, ariaLabel, dark = false, onNavigate }: DropdownPanelProps) {
  return (
    <div
      role="menu"
      aria-label={ariaLabel}
      className={cn(
        "absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-[8px] border p-2 shadow-[0_24px_70px_rgba(16,24,32,0.18)]",
        dark ? "border-white/10 bg-[#111827] text-white" : "border-[#D7DCE3] bg-white text-[#101820]"
      )}
    >
      <p className={cn("px-3 py-2 text-xs font-bold uppercase tracking-[0.14em]", dark ? "text-white/55" : "text-[#68707C]")}>
        AdMate Suite
      </p>
      <div className={cn("my-1 h-px", dark ? "bg-white/10" : "bg-[#E3E6EA]")} />
      {links.map((site) => {
        const isExternal = site.href.startsWith("http")
        const Icon = site.icon

        return (
          <Link
            key={site.href}
            href={site.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            role="menuitem"
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-[7px] px-3 py-2.5 text-left transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
              dark ? "hover:bg-white/10" : "hover:bg-[#F4F7FB]"
            )}
          >
            <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-[8px] border", dark ? "border-white/10 bg-white/5" : "border-[#D7DCE3] bg-[#F8F6F1]")}>
              <Icon className={cn("h-4 w-4", dark ? "text-white/70" : "text-[#2764D9]")} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 text-sm font-bold">
                {site.label}
                {site.active ? (
                  <span className="rounded-[6px] bg-[#FFF3D8] px-1.5 py-0.5 text-[10px] font-bold text-[#7A5518]">
                    현재
                  </span>
                ) : null}
              </span>
              <span className={cn("mt-0.5 block truncate text-xs", dark ? "text-white/55" : "text-[#68707C]")}>
                {site.description}
              </span>
            </span>
          </Link>
        )
      })}
    </div>
  )
}
