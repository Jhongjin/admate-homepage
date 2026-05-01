import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { lifecycleSteps } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

export function CampaignLifecycleSection() {
  return (
    <section id="lifecycle" className="border-b border-border bg-[#FBFBFB] py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Campaign Lifecycle"
          title="캠페인 운영의 전 과정을 하나의 흐름으로"
          description="AdMate는 캠페인 운영 단계를 따로 떼어놓지 않습니다. 기획 단계의 예측, 집행 전 정책 확인, 시작 전 세팅 검수, 운영 중 이상 감지, 보고용 캡처, 다음 캠페인 학습까지 하나의 캠페인 흐름으로 연결합니다."
        />

        <Card className="overflow-hidden">
          <div className="grid lg:grid-cols-6">
            {lifecycleSteps.map((item, index) => (
              <div
                key={item.step}
                className="relative border-b border-border p-5 lg:border-b-0 lg:border-r last:lg:border-r-0"
              >
                {index < lifecycleSteps.length - 1 ? (
                  <div className="absolute -right-3 top-8 z-10 hidden h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground lg:flex">
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                ) : null}
                <div className="mb-5 flex items-center justify-between">
                  <Badge variant="muted">{item.step}</Badge>
                  <item.icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold">{item.title}</h3>
                <div className="mt-2 text-sm font-semibold text-[#5E6AD2]">{item.product}</div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
