"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import { ChevronDown, ExternalLink, KeyRound, UserCircle } from "lucide-react"

import { officialLinks } from "@/lib/admate-content"
import { cn } from "@/lib/utils"

type SiteLink = {
  label: string
  description: string
  href: string
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
    description: "성과 예측",
    href: officialLinks.foresight,
  },
]

const accountLinks: SiteLink[] = [
  {
    label: "내 정보",
    description: "AdMate 계정 정보 확인",
    href: officialLinks.account,
  },
  {
    label: "권한 신청",
    description: "제품 접근 권한 요청",
    href: officialLinks.accessRequest,
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
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border font-semibold transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          size === "lg" ? "h-11 min-w-[176px] px-5 text-sm" : "h-9 min-w-[116px] px-3 text-[13px]",
          dark
            ? "border-white/20 bg-transparent text-white hover:bg-white/10"
            : "border-[#C9BFAF] bg-white/35 text-[#101820] hover:border-[#101820]/25 hover:bg-white",
          className
        )}
      >
        사이트 이동
        <ChevronDown className={cn("h-3.5 w-3.5 transition", open ? "rotate-180" : null)} aria-hidden="true" />
      </button>
      {open ? (
        <DropdownPanel links={siteLinks} dark={dark} onNavigate={() => setOpen(false)} ariaLabel="AdMate 사이트 이동" />
      ) : null}
    </div>
  )
}

type AccountDropdownProps = {
  className?: string
}

export function AdMateAccountDropdown({ className }: AccountDropdownProps) {
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
          "inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#C9BFAF] bg-white/35 px-3 text-[13px] font-semibold text-[#101820] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#101820]/25 hover:bg-white",
          className
        )}
      >
        <UserCircle className="h-4 w-4" aria-hidden="true" />
        AdMate 계정
        <ChevronDown className={cn("h-3.5 w-3.5 transition", open ? "rotate-180" : null)} aria-hidden="true" />
      </button>
      {open ? (
        <DropdownPanel
          links={accountLinks}
          onNavigate={() => setOpen(false)}
          ariaLabel="AdMate 계정 메뉴"
          leadingIcon={<KeyRound className="h-4 w-4 text-[#6F6251]" aria-hidden="true" />}
        />
      ) : null}
    </div>
  )
}

type DropdownPanelProps = {
  links: SiteLink[]
  ariaLabel: string
  dark?: boolean
  leadingIcon?: ReactNode
  onNavigate: () => void
}

function DropdownPanel({ links, ariaLabel, dark = false, leadingIcon, onNavigate }: DropdownPanelProps) {
  return (
    <div
      role="menu"
      aria-label={ariaLabel}
      className={cn(
        "absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-[10px] border p-1.5 shadow-[0_24px_70px_rgba(16,24,32,0.18)]",
        dark ? "border-white/10 bg-[#111827] text-white" : "border-[#C9BFAF] bg-[#F8F5EE] text-[#101820]"
      )}
    >
      {links.map((site) => {
        const isExternal = site.href.startsWith("http")

        return (
          <Link
            key={site.href}
            href={site.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            role="menuitem"
            onClick={onNavigate}
            className={cn(
              "flex items-start justify-between gap-3 rounded-[7px] px-3 py-2.5 text-left transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
              dark ? "hover:bg-white/10" : "hover:bg-white"
            )}
          >
            <span className="flex min-w-0 gap-2">
              {leadingIcon ? <span className="mt-0.5 shrink-0">{leadingIcon}</span> : null}
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{site.label}</span>
                <span className={cn("mt-0.5 block text-xs", dark ? "text-white/55" : "text-[#6F6251]")}>
                  {site.description}
                </span>
              </span>
            </span>
            {isExternal ? (
              <ExternalLink className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", dark ? "text-white/45" : "text-[#8A7D6C]")} aria-hidden="true" />
            ) : null}
          </Link>
        )
      })}
    </div>
  )
}
