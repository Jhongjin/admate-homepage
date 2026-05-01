import { Card, CardContent } from "@/components/ui/card"
import { operations } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

export function OperationsSection() {
  return (
    <section id="operations" className="border-b border-border bg-background py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Operations"
          title="AI를 도입하는 것에서 끝나지 않는 운영 체계"
          description="AdMate는 AI 기능을 만드는 데서 멈추지 않습니다. 비용을 추적하고, 최신 기술 변화를 매주 흡수하며, 장기적으로 새로운 솔루션 기회를 탐색할 수 있는 운영 루프를 함께 설계합니다."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {operations.map((operation, index) => (
            <Card
              key={operation.title}
              className={index === 0 ? "border-[#F5CE8B] bg-[#FFFDF8]" : ""}
            >
              <CardContent className="p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card">
                  <operation.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold">{operation.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{operation.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
