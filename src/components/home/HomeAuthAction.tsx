"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { LogIn, LogOut, UserRound } from "lucide-react"

import { officialLinks } from "@/lib/admate-content"

type AuthStatus = {
  authenticated: boolean
  user: {
    email: string
  } | null
  profile: {
    name?: string | null
  } | null
}

type HomeAuthActionProps = {
  mobile?: boolean
  onNavigate?: () => void
}

const AUTH_STATUS_URL = "https://sentinel.admate.ai.kr/api/auth/me"
const LOGOUT_URL = `${officialLinks.logout}?next=${encodeURIComponent(officialLinks.home)}`

function displayName(status: AuthStatus | null) {
  const name = status?.profile?.name?.trim()
  if (name) return name

  const email = status?.user?.email?.trim()
  return email ? email.split("@")[0] : "내 계정"
}

export function HomeAuthAction({ mobile = false, onNavigate }: HomeAuthActionProps) {
  const [status, setStatus] = useState<AuthStatus | null>(null)
  const [checking, setChecking] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let mounted = true
    const controller = new AbortController()

    fetch(AUTH_STATUS_URL, {
      cache: "no-store",
      credentials: "include",
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((json: AuthStatus | null) => {
        if (!mounted) return
        setStatus(json?.authenticated ? json : null)
      })
      .catch(() => {
        if (mounted) setStatus(null)
      })
      .finally(() => {
        if (mounted) setChecking(false)
      })

    return () => {
      mounted = false
      controller.abort()
    }
  }, [])

  const name = useMemo(() => displayName(status), [status])

  if (!status) {
    const label = checking ? "계정 확인" : "로그인"

    return (
      <Link
        href={officialLinks.login}
        target="_blank"
        rel="noreferrer"
        onClick={onNavigate}
        className={mobile
          ? "flex items-center justify-between rounded-[7px] border border-[#C9BFAF] px-3 py-2 text-sm font-semibold text-[#101820] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white"
          : "inline-flex h-10 min-w-[96px] items-center justify-center gap-2 rounded-[8px] bg-[#101820] px-4 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(16,24,32,0.12)] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#26342E] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101820]/35 focus-visible:ring-offset-2"}
      >
        {label}
        <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    )
  }

  if (mobile) {
    return (
      <div className="grid gap-1 rounded-[8px] border border-[#C9BFAF] bg-white/45 p-1.5">
        <div className="px-3 py-2">
          <p className="text-sm font-semibold text-[#101820]">{name}</p>
          <p className="mt-0.5 text-[11px] font-medium text-[#756B5D]">{status.user?.email}</p>
        </div>
        <Link
          href={officialLinks.account}
          target="_blank"
          rel="noreferrer"
          onClick={onNavigate}
          className="rounded-[7px] px-3 py-2 text-sm font-semibold text-[#2E3832] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white hover:text-[#101820]"
        >
          내 계정
        </Link>
        <Link
          href={LOGOUT_URL}
          onClick={onNavigate}
          className="rounded-[7px] px-3 py-2 text-sm font-semibold text-[#2E3832] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white hover:text-[#101820]"
        >
          로그아웃
        </Link>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 min-w-[96px] items-center justify-center gap-2 rounded-[8px] border border-[#C9BFAF] bg-white/55 px-4 text-[13px] font-semibold text-[#101820] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#177D4E]/35 hover:bg-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#177D4E]/30 focus-visible:ring-offset-2"
      >
        <UserRound className="h-3.5 w-3.5 text-[#177D4E]" aria-hidden="true" />
        {name}
      </button>
      {open ? (
        <div className="absolute right-0 top-12 z-50 w-[236px] overflow-hidden rounded-[10px] border border-[#C9BFAF] bg-[#FDFBF6] p-1.5 text-[#101820] shadow-[0_26px_70px_rgba(16,24,32,0.18)]">
          <div className="px-3 py-2">
            <p className="text-sm font-semibold">{name}</p>
            <p className="mt-0.5 truncate text-[11px] font-medium text-[#756B5D]">{status.user?.email}</p>
          </div>
          <div className="my-1 h-px bg-[#D8CFBE]" />
          <Link
            href={officialLinks.account}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-[7px] px-3 py-2 text-sm font-semibold text-[#2E3832] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white hover:text-[#101820]"
          >
            <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
            내 계정
          </Link>
          <Link
            href={LOGOUT_URL}
            className="flex items-center gap-2 rounded-[7px] px-3 py-2 text-sm font-semibold text-[#2E3832] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white hover:text-[#101820]"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            로그아웃
          </Link>
        </div>
      ) : null}
    </div>
  )
}
