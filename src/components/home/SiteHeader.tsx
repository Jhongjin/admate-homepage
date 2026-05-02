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
import { navLinks } from "@/lib/admate-content"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="section-shell flex h-14 items-center justify-between gap-4">
        <Link href="#top" className="flex items-center gap-2">
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
          <Button asChild variant="outline" size="sm" className="w-[96px] text-[13px]">
            <Link href="https://github.com/Jhongjin/admate-homepage/tree/main/docs/strategy" target="_blank" rel="noreferrer">
              전략 문서
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="sm" className="w-[118px] text-[13px]">
            <Link href="#operations">
              운영 콘솔
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
