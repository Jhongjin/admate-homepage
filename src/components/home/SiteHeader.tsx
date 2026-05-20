"use client"

import Link from "next/link"
import { ArrowUpRight, LogIn } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { BrandMark } from "@/components/home/BrandMark"
import { SheetlessMobileNav } from "@/components/home/SheetlessMobileNav"
import { SiteLinksDropdown } from "@/components/home/SiteLinksDropdown"
import { navLinks, officialLinks } from "@/lib/admate-content"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#D6CCBC] bg-[#F3F0E8]/[0.94] backdrop-blur-xl">
      <div className="section-shell flex h-14 items-center justify-between gap-4 xl:max-w-[1400px]">
        <Link href="#top" className="flex items-center gap-2 text-[#101820]">
          <BrandMark className="h-7 w-7" />
          <span className="text-sm font-semibold">AdMate</span>
        </Link>

        <NavigationMenu className="hidden xl:flex">
          <NavigationMenuList>
            {navLinks.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle())}>
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href={officialLinks.commandCenter}
            className="inline-flex h-9 w-[112px] items-center justify-center gap-2 rounded-[8px] border border-[#C9BFAF] bg-white/45 px-3 text-[13px] font-semibold text-[#101820] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#101820]/25 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101820]/35 focus-visible:ring-offset-2"
          >
            대시보드
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <SiteLinksDropdown />
          <Link
            href={officialLinks.login}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 min-w-[96px] items-center justify-center gap-2 rounded-[8px] bg-[#101820] px-4 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(16,24,32,0.12)] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#26342E] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101820]/35 focus-visible:ring-offset-2"
          >
            <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
            로그인
          </Link>
        </div>

        <div className="lg:hidden">
          <SheetlessMobileNav />
        </div>
      </div>
    </header>
  )
}
