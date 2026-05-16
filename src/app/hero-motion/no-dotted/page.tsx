import type { Metadata } from "next"

import { HomeRebuildExperience } from "@/components/home/HomeRebuildExperience"
import { SiteHeader } from "@/components/home/SiteHeader"

export const metadata: Metadata = {
  title: "AdMate Hero Motion Test - No Dotted Lines",
}

export default function NoDottedHeroMotionPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeRebuildExperience heroMotionLineMode="no-dotted" />
      </main>
    </>
  )
}
