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
        <Card className="border-[#B8C7BE] bg-[#F6F8F7] p-8 text-[#101820] sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="max-w-[680px]">
              <div className="text-sm font-semibold text-[#587067]">Executive operating room</div>
              <h2 className="mt-4 max-w-[640px] text-3xl font-semibold leading-tight sm:text-4xl">
                <span className="block">AdMate는 광고 운영의 근거와 위험을</span>
                <span className="block">다음 의사결정으로 넘기는 운영판입니다.</span>
              </h2>
              <p className="mt-5 max-w-[640px] text-sm leading-7 text-[#405149] sm:text-base">
                <span className="block">
                  정책 근거, 세팅 리스크, 증빙 이력, 예산 판단을 제품 데스크별로 모으고
                </span>
                <span className="block">
                  Agent Core의 운영 기억으로 다음 승인, 수정, 공유, 투자 안건을 정리합니다.
                </span>
                <span className="block">
                  필요한 데스크 권한을 신청하고 운영판에서 포트폴리오 상태를 확인할 수 있습니다.
                </span>
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:w-[210px] lg:grid-cols-1">
              <Button asChild size="lg" className="w-full justify-center bg-[#101820] text-white hover:bg-[#25322B]">
                <Link href={officialLinks.commandCenter}>
                  <MonitorCog className="h-4 w-4" aria-hidden="true" />
                  운영판 열기
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full justify-center border-[#AEBAB2] bg-white text-[#101820] hover:bg-[#F7F8F6]">
                <Link href={officialLinks.accessRequest} target="_blank" rel="noreferrer">
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                  데스크 권한 요청
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <SiteLinksDropdown size="lg" className="w-full" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
