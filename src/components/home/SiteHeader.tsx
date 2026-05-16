"use client"

import Link from "next/link"
import { ArrowUpRight, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
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

        <NavigationMenu className="hidden lg:flex">
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

        <div className="hidden items-center gap-2 sm:flex">
          <Button asChild variant="outline" size="sm" className="w-[124px] rounded-full border-[#C9BFAF] bg-transparent text-[13px]">
            <Link href={officialLinks.accessRequest} target="_blank" rel="noreferrer">
              AdMate 시작하기
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="sm" className="w-[118px] rounded-full bg-[#101820] text-[13px] text-white hover:bg-[#26342E]">
            <Link href={officialLinks.commandCenter}>
              대시보드
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Button>
          <SiteLinksDropdown className="w-[110px]" />
        </div>

        <div className="sm:hidden">
          <SheetlessMobileNav
            trigger={
              <Button size="icon" variant="outline" aria-label="메뉴 열기">
                <Menu className="h-4 w-4" aria-hidden="true" />
              </Button>
            }
          />
        </div>
      </div>
    </header>
  )
}
