import { ArrowRight, GitBranch, History, ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { corePillars } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

export function AgentCoreSection() {
  return (
    <section id="agent-core" className="border-b border-border bg-background py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Agent Core"
          title="AdMate Agent Core: 실행하고, 기록하고, 학습하는 중심 엔진"
          description="AdMate Agent Core는 네 개의 플랫폼을 하나의 운영 흐름으로 연결합니다. Openclaw는 스케줄과 조건에 따라 업무를 실행하고, Hermes는 AI와 사용자 이벤트를 학습해 운영 지식과 판단 기준을 축적합니다."
        />

        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="overflow-hidden bg-[#111827] text-white">
            <CardContent className="p-6">
              <Badge variant="outline" className="border-white/20 bg-white/10 text-white">
                Intelligence + Automation
              </Badge>
              <h3 className="mt-6 text-3xl font-semibold leading-tight">
                Openclaw는 움직이는 손과 발,
                <br />
                Hermes는 기억하고 판단하는 두뇌입니다.
              </h3>
              <p className="mt-5 text-sm leading-7 text-white/70">
                두 엔진은 외부 제품처럼 앞에 서기보다 AdMate Agent Core 안에서 캠페인 단위의 실행, 기록, 피드백, 학습을 조용히 연결합니다.
              </p>

              <div className="mt-8 grid gap-3">
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
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {corePillars.map((pillar) => (
              <Card key={pillar.title}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                      <pillar.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground">{pillar.subtitle}</div>
                      <h3 className="mt-1 text-xl font-semibold">{pillar.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{pillar.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <div className="text-sm font-semibold">Agent loop</div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    실행 결과와 운영자 판단은 다음 캠페인의 알림 기준, 정책 판단, 예측 보정의 후보가 됩니다.
                  </p>
                </div>
                <Separator className="hidden h-12 sm:block" orientation="vertical" />
                <div className="flex items-center gap-2 text-sm font-semibold text-[#5E6AD2]">
                  실행 <ArrowRight className="h-4 w-4" /> 기록 <ArrowRight className="h-4 w-4" /> 학습
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
