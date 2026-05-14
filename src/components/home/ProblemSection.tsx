import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { problemCards } from "@/lib/admate-content"
import { cn } from "@/lib/utils"

import { SectionHeading } from "./SectionHeading"

const problemStages = [
  {
    group: "정책",
    action: "정책 검토",
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
          eyebrow="운영 리스크"
          title="의사결정이 늦어지는 지점이 캠페인 리스크가 됩니다"
          description="매체 정책, 세팅값, 예산 신호, 증빙 상태가 따로 움직이면 운영자는 문제를 늦게 봅니다. AdMate는 이 지점들을 하나의 리스크 체인으로 올려 의사결정 순서를 정리합니다."
        />

        <div className="mb-5 flex flex-col gap-3 border-y border-border py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2F7D50]">
              운영 리스크 흐름
            </div>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-foreground">
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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {problemCards.map((card, index) => (
              <Card
                key={card.title}
                className="group relative overflow-visible bg-card transition duration-300 hover:-translate-y-0.5 hover:border-[#2F7D50]/60 hover:shadow-soft"
              >
                <CardContent className="flex min-h-[190px] flex-col p-5">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-foreground transition group-hover:border-[#2F7D50]/60 group-hover:bg-[#EAF4F0]">
                        <card.icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold text-muted-foreground">
                          {String(index + 1).padStart(2, "0")} · {problemStages[index].group}
                        </div>
                        <div className="mt-0.5 truncate text-[11px] font-medium text-[#1F6F8B]">
                          {problemStages[index].action}
                        </div>
                      </div>
                    </div>
                    {index < problemCards.length - 1 ? (
                      <ArrowRight
                        className={cn(
                          "absolute -right-2.5 top-8 z-20 hidden h-5 w-5 rounded-full border border-border bg-background p-1 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-[#1F6F8B] lg:block",
                          index === 2 && "lg:hidden"
                        )}
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                  <h3 className="text-base font-semibold leading-6">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.description}</p>
                  <div className="mt-auto border-t border-border pt-3 text-[11px] font-semibold text-muted-foreground">
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#2F7D50]" aria-hidden="true" />
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
              경영진 관점
            </div>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-white/80">
              <span className="block">
                흩어진 운영 업무는 확인 지연, 반복 수작업, 판단 기준 손실로 이어집니다.
              </span>
              <span className="block">
                AdMate는 이 흐름을 하나의 캠페인 운영 사이클로 묶습니다.
              </span>
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              AdMate가 연결하는 기준
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
