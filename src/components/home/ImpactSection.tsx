import { Card, CardContent } from "@/components/ui/card"
import { impactCards } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

const impactAxes = [
  {
    title: "운영 효율",
    description: "반복 확인과 수작업을 줄여 플래너가 판단에 더 집중하게 합니다.",
  },
  {
    title: "리스크 예방",
    description: "세팅 오류와 운영 중 이상 신호를 더 빠르게 발견합니다.",
  },
  {
    title: "지식 자산화",
    description: "운영자 판단과 예외 기준을 회사의 재사용 가능한 지식으로 남깁니다.",
  },
]

const impactTags = ["Efficiency", "Risk", "Service", "Knowledge", "Cost", "Evolution"]

export function ImpactSection() {
  return (
    <section id="impact" className="border-b border-border bg-[#FBFBFB] py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Impact"
          title="반복 업무는 줄이고, 광고 운영 지식은 축적합니다"
          description={
            <>
              <span className="block">
                AdMate의 기대 효과는 단순 자동화가 아니라 운영 품질과 조직 지식의 축적입니다.
              </span>
              <span className="block">
                의사결정권자에게는 경쟁력, 미디어팀에게는 실무 부담 감소로 이어집니다.
              </span>
            </>
          }
          align="center"
        />

        <div className="mb-6 grid gap-3 lg:grid-cols-3">
          {impactAxes.map((axis, index) => (
            <div key={axis.title} className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8EA2FF]">
                Impact axis 0{index + 1}
              </div>
              <h3 className="mt-3 text-lg font-semibold">{axis.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{axis.description}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {impactCards.map((impact, index) => (
            <Card key={impact.title} className="transition duration-300 hover:-translate-y-0.5 hover:shadow-soft">
              <CardContent className="p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted">
                    <impact.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="rounded-md border border-border bg-muted px-2 py-1 text-[11px] font-semibold text-muted-foreground">
                    {impactTags[index]}
                  </span>
                </div>
                <h3 className="text-base font-semibold">{impact.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{impact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              For executives
            </div>
            <p className="mt-3 text-sm font-medium leading-6 text-foreground">
              캠페인 사고 예방, AI 비용 통제, 회사 고유 운영 지식 축적을 통해 조직 경쟁력을 높입니다.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              For media teams
            </div>
            <p className="mt-3 text-sm font-medium leading-6 text-foreground">
              정책 확인, 세팅 검수, 모니터링, 캡처 부담을 줄이고 판단 근거를 남깁니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
