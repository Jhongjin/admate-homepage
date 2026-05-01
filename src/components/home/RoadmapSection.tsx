import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import { SectionHeading } from "./SectionHeading"

const roadmapStages = [
  {
    title: "Foundation",
    subtitle: "브랜드와 제품 구조를 명확히 합니다.",
    phase: "Phase 1-2",
    items: [
      "Compass / Sentinel / Lens / Foresight 역할 정리",
      "Agent Core 기반 모니터링 안정화",
    ],
  },
  {
    title: "Productization",
    subtitle: "제품 경험과 운영 루프를 실제 업무로 연결합니다.",
    phase: "Phase 3-5",
    items: [
      "UI/UX 정렬과 Tool API 전환",
      "Foresight PoC와 데이터 기준 정리",
      "비용/기술 인텔리전스 운영 체계 구축",
    ],
  },
  {
    title: "Expansion",
    subtitle: "운영 데이터에서 다음 솔루션 기회를 탐색합니다.",
    phase: "Phase 6",
    items: [
      "신규 솔루션 기회 탐색 루프 확장",
      "PoC 후보를 제품화 검토로 연결",
    ],
  },
]

const roadmapFlow = ["구조 정리", "Core 안정화", "API/PoC", "운영 루프", "기회 탐색"]

export function RoadmapSection() {
  return (
    <section id="roadmap" className="border-b border-border bg-[#FBFBFB] py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Roadmap"
          title="AdMate는 기반 정리에서 확장 루프까지 단계적으로 고도화됩니다"
          description="로드맵은 개별 기능 목록이 아니라, 브랜드/제품 구조 정리에서 Agent Core 안정화, 제품화, 운영 루프, 신규 기회 탐색으로 이어지는 고도화 경로입니다."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {roadmapStages.map((stage, index) => (
            <Card key={stage.title} className="transition duration-300 hover:-translate-y-0.5 hover:shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8EA2FF]">
                      Stage 0{index + 1}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold">{stage.title}</h3>
                  </div>
                  <Badge variant="outline" className="bg-card">
                    {stage.phase}
                  </Badge>
                </div>
                <p className="mt-4 text-sm font-medium leading-6 text-foreground">{stage.subtitle}</p>
                <div className="mt-5 grid gap-2">
                  {stage.items.map((item) => (
                    <div key={item} className="rounded-lg border border-border bg-muted/60 px-3 py-2 text-sm leading-6 text-muted-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Progress path
              </div>
              <p className="mt-2 text-sm font-medium text-foreground">
                앞 섹션의 제품·운영 체계가 어떤 순서로 현실화되는지 요약합니다.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
              {roadmapFlow.map((item, index) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="rounded-md border border-border bg-muted px-3 py-2 text-foreground">
                    {item}
                  </span>
                  {index < roadmapFlow.length - 1 ? (
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
