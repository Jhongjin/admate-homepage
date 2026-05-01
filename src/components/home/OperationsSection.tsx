import { ArrowRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { operations } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

const operationMeta = [
  {
    step: "01",
    label: "Control Cost",
    role: "비용 통제",
    horizon: "Now",
  },
  {
    step: "02",
    label: "Learn Weekly",
    role: "기술 흡수",
    horizon: "Weekly",
  },
  {
    step: "03",
    label: "Discover Opportunity",
    role: "기회 탐색",
    horizon: "Long-term",
  },
]

const operationLoop = ["사용량 추적", "개선 후보 선별", "PoC 기회 탐색"]

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
              className="transition duration-300 hover:-translate-y-0.5 hover:shadow-soft"
            >
              <CardContent className="p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card">
                    <operation.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="rounded-md border border-border bg-muted px-2 py-1 text-[11px] font-semibold text-muted-foreground">
                      {operationMeta[index].step} · {operationMeta[index].label}
                    </span>
                    <span className="rounded-md border border-border bg-card px-2 py-1 text-[11px] font-semibold text-foreground">
                      {operationMeta[index].horizon}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold">{operation.title}</h3>
                <div className="mt-2 text-sm font-semibold text-[#5E6AD2]">
                  {operationMeta[index].role}
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{operation.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Operating loop
              </div>
              <p className="mt-2 text-sm font-medium text-foreground">
                AI 운영은 도입 후에도 비용, 기술 변화, 신규 기회를 계속 점검해야 합니다.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#5E6AD2]">
              {operationLoop.map((item, index) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="rounded-md border border-border bg-muted px-3 py-2 text-foreground">
                    {item}
                  </span>
                  {index < operationLoop.length - 1 ? (
                    <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
