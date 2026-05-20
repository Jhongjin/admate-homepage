"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, LogIn, Menu, X } from "lucide-react"

import { navLinks, officialLinks } from "@/lib/admate-content"

const mobileSiteLinks = [
  { label: "AdMate Home", href: officialLinks.home },
  { label: "이용 권한 요청", href: officialLinks.accessRequest },
  { label: "Compass", href: officialLinks.compass },
  { label: "Sentinel", href: officialLinks.sentinel },
  { label: "Lens", href: officialLinks.lens },
  { label: "Foresight", href: officialLinks.foresight },
]

export function SheetlessMobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#C9BFAF] bg-[#F3F0E8] text-[#101820] transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#101820]/30 hover:bg-[#E9E2D4] active:scale-[0.96]"
      >
        {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
      </button>
      {open ? (
        <div className="absolute right-0 top-12 w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-[10px] border border-[#C9BFAF] bg-[#F3F0E8] p-1.5 text-[#101820] shadow-[0_26px_70px_rgba(16,24,32,0.18)]">
          <nav className="grid gap-1" aria-label="모바일 섹션 이동">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-[7px] px-3 py-2 text-sm font-semibold text-[#2E3832] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#E9E2D4] hover:text-[#101820]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-1.5 grid gap-1.5 border-t border-[#D8CFBE] pt-1.5">
            <Link
              href={officialLinks.commandCenter}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between rounded-[7px] bg-[#101820] px-3 py-2 text-sm font-semibold text-white transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#26342E]"
            >
              대시보드
              <ArrowUpRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-1.5 grid gap-1 border-t border-[#D8CFBE] pt-1.5">
            <p className="px-3 pt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#756B5D]">
              사이트 이동
            </p>
            {mobileSiteLinks.map((item) => {
              const isExternal = item.href.startsWith("http")

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="rounded-[7px] px-3 py-2 text-sm font-semibold text-[#2E3832] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white hover:text-[#101820]"
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href={officialLinks.login}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-[7px] border border-[#C9BFAF] px-3 py-2 text-sm font-semibold text-[#101820] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white"
            >
              로그인
              <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  )
}
