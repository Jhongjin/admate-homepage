import { Card, CardContent } from "@/components/ui/card"
import { impactCards } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

const impactAxes = [
  {
    title: "운영 효율",
    description: "반복 확인과 수작업을 줄이고, 운영자가 바로 판단해야 할 신호를 앞에 둡니다.",
    accent: "#2F5D50",
    tint: "#EFF6F2",
    border: "#B8C7BE",
  },
  {
    title: "리스크 예방",
    description: "세팅 오류와 운영 중 이상 신호를 캠페인 사고가 되기 전에 회의판에 올립니다.",
    accent: "#1F6F8B",
    tint: "#EAF4F7",
    border: "#B9D8E2",
  },
  {
    title: "지식 자산화",
    description: "운영자 판단, 예외 기준, 피드백을 다음 캠페인의 기준으로 남깁니다.",
    accent: "#7A5A12",
    tint: "#FFF8EC",
    border: "#F5CE8B",
  },
]

const impactTags = ["시간 회수", "사고 방지", "응답 품질", "판단 기억", "비용 통제", "기술 반영"]

export function ImpactSection() {
  return (
    <section id="impact" className="border-b border-border bg-[#FBFBFB] py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Operating Outcomes"
          title="운영판에 남는 결과가 다음 캠페인의 기준이 됩니다"
          description={
            <>
              <span className="block">
                AdMate의 효과는 기능 도입 수가 아니라 운영 품질, 리스크 대응, 판단 기억으로 드러납니다.
              </span>
              <span className="block">
                의사결정권자는 포트폴리오 상태를 보고, 미디어팀은 반복 확인보다 다음 조치에 집중합니다.
              </span>
            </>
          }
        />

        <div className="mb-6 grid gap-3 lg:grid-cols-3">
          {impactAxes.map((axis, index) => (
            <div
              key={axis.title}
              className="rounded-lg border bg-card p-5 shadow-sm"
              style={{ borderColor: axis.border }}
            >
              <div
                className="inline-flex rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ backgroundColor: axis.tint, borderColor: axis.border, color: axis.accent }}
              >
                Outcome 0{index + 1}
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
                  <span className="rounded-md border border-border bg-muted px-2 py-1 text-[11px] font-semibold text-foreground">
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
