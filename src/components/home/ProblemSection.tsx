import { Card, CardContent } from "@/components/ui/card"
import { problemCards } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

export function ProblemSection() {
  return (
    <section id="problem" className="border-b border-border bg-background py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Problem"
          title="광고 운영은 점점 복잡해지고 있습니다"
          description="매체는 늘어나고, 정책은 자주 바뀌며, 캠페인 세팅과 운영 확인 업무는 여전히 수작업에 많이 의존합니다. 작은 세팅 오류는 캠페인 사고로 이어질 수 있고, 반복적인 캡처와 보고 업무는 미디어플래너의 시간을 계속 소모합니다."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {problemCards.map((card) => (
            <Card key={card.title} className="bg-card">
              <CardContent className="p-5">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted text-foreground">
                  <card.icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card p-5 text-sm font-medium leading-7 text-foreground">
          AdMate는 이 반복 업무들을 개별 기능으로 흩어놓지 않고, 하나의 캠페인 운영 흐름으로 연결합니다.
        </div>
      </div>
    </section>
  )
}
