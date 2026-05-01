import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { problemCards } from "@/lib/admate-content"
import { cn } from "@/lib/utils"

import { SectionHeading } from "./SectionHeading"

const problemGroups = ["정책", "세팅", "운영", "캡처", "플래닝", "지식"]

export function ProblemSection() {
  return (
    <section id="problem" className="border-b border-border bg-background py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Problem"
          title="광고 운영은 점점 복잡해지고 있습니다"
          description="매체는 늘어나고 정책은 자주 바뀝니다. 캠페인 세팅, 운영 확인, 캡처와 보고 업무는 여전히 수작업에 많이 의존하며 작은 오류가 캠페인 사고로 이어질 수 있습니다."
        />

        <div className="relative">
          <div className="absolute left-5 right-5 top-[46px] hidden h-px bg-border lg:block" aria-hidden="true" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {problemCards.map((card, index) => (
              <Card
                key={card.title}
                className="group relative overflow-hidden bg-card transition duration-300 hover:-translate-y-0.5 hover:shadow-soft"
              >
                <CardContent className="p-5">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted text-foreground">
                        <card.icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="text-xs font-semibold text-muted-foreground">
                        {String(index + 1).padStart(2, "0")} · {problemGroups[index]}
                      </div>
                    </div>
                    {index < problemCards.length - 1 ? (
                      <ArrowRight
                        className={cn(
                          "hidden h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 lg:block",
                          index === 2 && "lg:hidden"
                        )}
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                  <h3 className="text-base font-semibold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.description}</p>
                  <div className="mt-5 h-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-[#8EA2FF] transition-all duration-300 group-hover:w-full"
                      style={{ width: `${42 + index * 8}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-[#1E293B] bg-[#111827] p-5 text-white shadow-soft">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase text-white/45">Operational bottleneck</div>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-7 text-white/78">
                흩어진 운영 업무는 확인 지연, 반복 수작업, 판단 기준 손실로 이어집니다.
                AdMate는 이 흐름을 하나의 캠페인 운영 사이클로 묶습니다.
              </p>
            </div>
            <div className="grid gap-2 text-xs font-semibold text-white/70 sm:grid-cols-3 lg:min-w-[360px]">
              {["확인 지연", "수작업 반복", "지식 손실"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
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
