import Link from "next/link"
import { ArrowRight, BookOpenText, MonitorCog } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function FinalCTASection() {
  return (
    <section className="bg-background py-20">
      <div className="section-shell">
        <Card className="overflow-hidden bg-[#111827] p-8 text-white sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm font-semibold text-white/60">AdMate Platform</div>
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight sm:text-4xl">
                AdMate는 광고 운영 전 과정을 연결하는 AI Agent 플랫폼입니다.
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
                정책 확인, 세팅 검수, 실시간 모니터링, 캡처 자동화, 성과 예측,
                운영자 피드백 학습을 하나의 캠페인 운영 사이클로 연결합니다.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild variant="secondary" size="lg">
                <Link href="#operations">
                  <MonitorCog className="h-4 w-4" aria-hidden="true" />
                  운영 콘솔 보기
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link href="https://github.com/Jhongjin/admate-homepage/tree/main/docs/strategy" target="_blank" rel="noreferrer">
                  <BookOpenText className="h-4 w-4" aria-hidden="true" />
                  전략 문서 보기
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
