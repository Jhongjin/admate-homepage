import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { problemCards } from "@/lib/admate-content"
import { cn } from "@/lib/utils"

import { SectionHeading } from "./SectionHeading"

const problemStages = [
  {
    group: "정책",
    action: "찾고 해석",
    risk: "기준 확인 지연",
  },
  {
    group: "세팅",
    action: "값 비교",
    risk: "오류 발견 지연",
  },
  {
    group: "운영",
    action: "상태 감시",
    risk: "이상 대응 지연",
  },
  {
    group: "캡처",
    action: "증빙 생성",
    risk: "보고 리소스 소모",
  },
  {
    group: "플래닝",
    action: "근거 정리",
    risk: "제안 기준 분산",
  },
  {
    group: "지식",
    action: "기억/학습",
    risk: "판단 기준 손실",
  },
]

const bottlenecks = ["확인 지연", "수작업 반복", "판단 기준 손실"]

export function ProblemSection() {
  return (
    <section id="problem" className="border-b border-border bg-background py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Problem"
          title="광고 운영은 점점 복잡해지고 있습니다"
          description="매체는 늘어나고 정책은 자주 바뀝니다. 캠페인 세팅, 운영 확인, 캡처와 보고 업무는 여전히 수작업에 많이 의존하며 작은 오류가 캠페인 사고로 이어질 수 있습니다."
        />

        <div className="mb-5 flex flex-col gap-3 border-y border-border py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8EA2FF]">
              Fragmented operating chain
            </div>
            <p className="mt-2 text-sm font-medium text-foreground">
              문제는 개별 업무가 아니라, 서로 끊어진 확인과 판단이 캠페인 운영 사이클 안에서 반복되는 구조입니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground">
            {bottlenecks.map((item) => (
              <span key={item} className="rounded-md border border-border bg-card px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute left-8 right-8 top-[46px] hidden h-px bg-gradient-to-r from-transparent via-[#8EA2FF]/45 to-transparent lg:block"
            aria-hidden="true"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {problemCards.map((card, index) => (
              <Card
                key={card.title}
                className="group relative overflow-visible bg-card transition duration-300 hover:-translate-y-0.5 hover:border-[#8EA2FF]/60 hover:shadow-soft"
              >
                <CardContent className="flex min-h-[220px] flex-col p-4">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-foreground transition group-hover:border-[#8EA2FF]/60 group-hover:bg-[#EEF1FF]">
                        <card.icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold text-muted-foreground">
                          {String(index + 1).padStart(2, "0")} · {problemStages[index].group}
                        </div>
                        <div className="mt-0.5 truncate text-[11px] font-medium text-[#6676D9]">
                          {problemStages[index].action}
                        </div>
                      </div>
                    </div>
                    {index < problemCards.length - 1 ? (
                      <ArrowRight
                        className={cn(
                          "absolute -right-2.5 top-8 z-20 hidden h-5 w-5 rounded-full border border-border bg-background p-1 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-[#6676D9] lg:block"
                        )}
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                  <h3 className="text-[15px] font-semibold leading-6">{card.title}</h3>
                  <p className="mt-3 text-[13px] leading-6 text-muted-foreground">{card.description}</p>
                  <div className="mt-auto border-t border-border pt-3 text-[11px] font-semibold text-muted-foreground">
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#8EA2FF]" aria-hidden="true" />
                    {problemStages[index].risk}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-lg border border-[#1E293B] bg-[#111827] p-5 text-white shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
              Operational bottleneck
            </div>
            <p className="mt-3 text-sm font-medium leading-7 text-white/82">
              흩어진 운영 업무는 확인 지연, 반복 수작업, 판단 기준 손실로 이어집니다.
              AdMate는 이 흐름을 하나의 캠페인 운영 사이클로 묶습니다.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              What AdMate connects
            </div>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-foreground sm:grid-cols-3 lg:grid-cols-1">
              {["정책 근거", "운영 이력", "학습 피드백"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
