import Link from "next/link"
import { ArrowRight, MonitorCog, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SiteLinksDropdown } from "@/components/home/SiteLinksDropdown"
import { officialLinks } from "@/lib/admate-content"

export function FinalCTASection() {
  return (
    <section className="bg-background py-20">
      <div className="section-shell">
        <Card className="bg-[#111827] p-8 text-white sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="max-w-[680px]">
              <div className="text-sm font-semibold text-white/60">AdMate Platform</div>
              <h2 className="mt-4 max-w-[640px] text-3xl font-semibold leading-tight sm:text-4xl">
                <span className="block">AdMate는 광고 운영 전 과정을</span>
                <span className="block">연결하는 AI Agent 플랫폼입니다.</span>
              </h2>
              <p className="mt-5 max-w-[640px] text-sm leading-7 text-white/70 sm:text-base">
                <span className="block">
                  정책 확인, 세팅 검수, 실시간 모니터링, 캡처 자동화, 성과 예측을
                </span>
                <span className="block">
                  운영자 피드백 학습과 함께 하나의 캠페인 운영 사이클로 연결합니다.
                </span>
                <span className="block">
                  필요한 AdMate 제품 권한을 신청하고 승인 후 이용할 수 있습니다.
                </span>
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:w-[210px] lg:grid-cols-1">
              <Button asChild variant="secondary" size="lg" className="w-full justify-center">
                <Link href={officialLinks.commandCenter}>
                  <MonitorCog className="h-4 w-4" aria-hidden="true" />
                  임원 대시보드
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full justify-center border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link href={officialLinks.accessRequest} target="_blank" rel="noreferrer">
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                  AdMate 시작하기
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <SiteLinksDropdown dark size="lg" className="w-full" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
