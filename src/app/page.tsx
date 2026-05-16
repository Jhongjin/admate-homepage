import { HomeRebuildExperience } from "@/components/home/HomeRebuildExperience"
import { SiteHeader } from "@/components/home/SiteHeader"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeRebuildExperience heroMotionLineMode="no-dotted" />
      </main>
    </>
  )
}
