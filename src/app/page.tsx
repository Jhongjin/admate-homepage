import { AgentCoreSection } from "@/components/home/AgentCoreSection"
import { CampaignLifecycleSection } from "@/components/home/CampaignLifecycleSection"
import { EcosystemSection } from "@/components/home/EcosystemSection"
import { FinalCTASection } from "@/components/home/FinalCTASection"
import { HeroSection } from "@/components/home/HeroSection"
import { ImpactSection } from "@/components/home/ImpactSection"
import { OperationsSection } from "@/components/home/OperationsSection"
import { ProblemSection } from "@/components/home/ProblemSection"
import { ProductCardsSection } from "@/components/home/ProductCardsSection"
import { RoadmapSection } from "@/components/home/RoadmapSection"
import { SiteHeader } from "@/components/home/SiteHeader"
import { SystemMapSection } from "@/components/home/SystemMapSection"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <SystemMapSection />
        <ProblemSection />
        <EcosystemSection />
        <ProductCardsSection />
        <CampaignLifecycleSection />
        <AgentCoreSection />
        <ImpactSection />
        <OperationsSection />
        <RoadmapSection />
        <FinalCTASection />
      </main>
    </>
  )
}
