import { ArrowRight, GitBranch, History, ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { corePillars } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

const loopSteps = ["실행", "기록", "학습", "다음 판단"]

const engineCopy: Record<string, string> = {
  Openclaw: "정해진 스케줄과 조건에 따라 업무를 실행하고, 필요한 외부 시스템을 연결합니다.",
  Hermes: "AI 응답과 사용자 피드백을 학습해 운영 지식과 판단 기준을 축적합니다.",
}

const corePrinciples = [
  {
    label: "Audit-ready",
    description: "모든 실행은 추적 가능한 이력으로 남깁니다.",
  },
  {
    label: "Human-approved",
    description: "비용·위험이 큰 작업은 운영자 기준으로 제어합니다.",
  },
  {
    label: "Knowledge-backed",
    description: "반복 판단은 운영 지식으로 축적됩니다.",
  },
]

export function AgentCoreSection() {
  return (
    <section id="agent-core" className="border-b border-border bg-background py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Agent Core"
          title={
            <>
              <span className="block">AdMate Agent Core:</span>
              <span className="block">실행하고, 기록하고, 학습하는 중심 엔진</span>
            </>
          }
          description={
            <>
              <span className="block">
                AdMate Agent Core는 네 개의 제품을 하나의 운영 흐름으로 연결합니다.
              </span>
              <span className="block">
                자동화 실행과 지능/메모리 엔진을 기반으로 캠페인 단위의 실행, 기록, 피드백, 학습을 이어줍니다.
              </span>
            </>
          }
        />

        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="overflow-hidden bg-[#111827] text-white">
            <CardContent className="p-6">
              <Badge variant="outline" className="border-white/20 bg-white/10 text-white">
                Intelligence + Automation
              </Badge>
              <h3 className="mt-6 text-3xl font-semibold leading-tight">
                <span className="block">자동화는 업무를 실행하고,</span>
                <span className="block">지능은 기억하고 판단합니다.</span>
              </h3>
              <p className="mt-5 text-sm leading-7 text-white/70">
                AdMate Agent Core 안에서 자동화 실행 엔진(Openclaw)은 움직이는 손과 발처럼 업무를 실행하고,
                지능/메모리 엔진(Hermes)은 두뇌처럼 운영 지식과 판단 기준을 축적합니다.
              </p>

              <div className="mt-8 grid gap-2">
                {[
                  { label: "모든 Agent action은 감사 가능한 이력으로 기록", icon: History },
                  { label: "위험하거나 비용이 큰 작업은 운영자 승인 기준으로 제어", icon: ShieldCheck },
                  { label: "각 제품은 사람용 UI와 Agent용 Tool로 함께 확장", icon: GitBranch },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-sm">
                    <item.icon className="h-4 w-4 text-white/70" aria-hidden="true" />
                    {item.label}
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-2 border-t border-white/10 pt-5 sm:grid-cols-3">
                {corePrinciples.map((principle) => (
                  <div key={principle.label} className="rounded-lg border border-white/10 bg-white/[0.06] p-3">
                    <div className="text-xs font-semibold text-white">{principle.label}</div>
                    <p className="mt-2 text-[11px] leading-5 text-white/58">{principle.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid h-full gap-4 lg:grid-rows-[auto_auto_1fr]">
            {corePillars.map((pillar) => (
              <Card key={pillar.title}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                      <pillar.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground">{pillar.subtitle}</div>
                      <h3 className="mt-1 text-xl font-semibold">
                        {pillar.subtitle === "Automation Execution" ? "자동화 실행 엔진" : "지능/메모리 엔진"}
                        <span className="ml-2 text-sm font-medium text-muted-foreground">({pillar.title})</span>
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {engineCopy[pillar.title] ?? pillar.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="flex flex-col p-5">
              <div>
                <div className="text-sm font-semibold">Agent operating loop</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  실행된 작업은 이력으로 남고, 운영자 판단은 학습되어 다음 캠페인의 기준 후보가 됩니다.
                </p>
              </div>
              <Separator className="my-5" />
              <div className="grid gap-2 sm:grid-cols-4">
                {loopSteps.map((step, index) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className="flex min-h-10 flex-1 items-center justify-center rounded-md border border-border bg-muted px-3 text-sm font-semibold text-foreground">
                      {step}
                    </div>
                    {index < loopSteps.length - 1 ? (
                      <ArrowRight className="hidden h-4 w-4 shrink-0 text-[#5E6AD2] sm:block" aria-hidden="true" />
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg border border-border bg-muted/50 p-3 text-xs leading-6 text-muted-foreground">
                Agent Core는 모든 실행을 자동으로 대체하기보다, 감사 가능한 기록과 운영자 피드백을 남겨
                다음 판단을 더 정확하게 만드는 기반입니다.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
