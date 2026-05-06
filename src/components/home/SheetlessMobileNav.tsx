"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { navLinks, officialLinks } from "@/lib/admate-content"

export function SheetlessMobileNav({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <span onClick={() => setOpen((value) => !value)}>{trigger}</span>
      {open ? (
        <div className="absolute right-0 top-11 w-64 rounded-lg border border-border bg-card p-2 shadow-soft">
          <nav className="grid gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-2 grid gap-2 border-t border-border pt-2">
            <Button asChild size="sm" variant="outline">
              <Link href={officialLinks.accessRequest} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                AdMate 시작하기
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href={officialLinks.commandCenter} onClick={() => setOpen(false)}>
                임원 대시보드
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
