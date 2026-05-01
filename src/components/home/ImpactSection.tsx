import { Card, CardContent } from "@/components/ui/card"
import { impactCards } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

export function ImpactSection() {
  return (
    <section id="impact" className="border-b border-border bg-[#FBFBFB] py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Impact"
          title="반복 업무는 줄이고, 광고 운영 지식은 축적합니다"
          description="AdMate의 기대 효과는 단순한 자동화가 아니라 운영 품질과 조직 지식의 축적입니다. 임원에게는 회사 경쟁력, 미디어플래너에게는 실무 부담 감소가 한 화면에서 이해되어야 합니다."
          align="center"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {impactCards.map((impact) => (
            <Card key={impact.title}>
              <CardContent className="p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted">
                  <impact.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold">{impact.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{impact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
