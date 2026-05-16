import type { Metadata } from "next"

import { HomeRebuildExperience } from "@/components/home/HomeRebuildExperience"
import { SiteHeader } from "@/components/home/SiteHeader"

export const metadata: Metadata = {
  title: "AdMate Hero Motion Test - No Solid Lines",
}

export default function NoSolidHeroMotionPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeRebuildExperience heroMotionLineMode="no-solid" />
      </main>
    </>
  )
}
