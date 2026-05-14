import { ArrowRight, GitBranch, History, ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { corePillars } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

const loopSteps = ["데스크 신호", "판단 기록", "기준 회수", "다음 안건"]

const engineCopy: Record<string, string> = {
  Openclaw: "정해진 조건이 충족되면 검수, 알림, 기록 흐름을 운영자가 추적할 수 있는 실행 이력으로 남깁니다.",
  Hermes: "정책 근거, 예외 판단, 운영자 피드백을 모아 다음 캠페인에서 다시 꺼낼 수 있는 기준으로 정리합니다.",
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
          eyebrow="Decision Memory"
          title={
            <>
              <span className="block">Agent Core는 제품 데스크의 판단을</span>
              <span className="block">다음 운영 회의의 기억으로 바꿉니다</span>
            </>
          }
          description={
            <>
              <span className="block">
                Compass, Sentinel, Lens, Foresight에서 나온 신호는 여기서 실행 이력과 판단 근거로 정리됩니다.
              </span>
              <span className="block">
                Core는 기능을 과시하는 엔진이 아니라 승인, 수정, 공유, 투자 판단을 다시 꺼내는 운영 장부입니다.
              </span>
            </>
          }
        />

        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="overflow-hidden border-[#B8C7BE] bg-[#F6F8F7] text-[#101820]">
            <CardContent className="p-6">
              <Badge variant="outline" className="border-[#B8C7BE] bg-white text-[#2F5D50]">
                Portfolio decision ledger
              </Badge>
              <h3 className="mt-6 text-3xl font-semibold leading-tight">
                <span className="block">각 데스크의 신호를 모아</span>
                <span className="block">감사 가능한 판단 기록으로 남깁니다.</span>
              </h3>
              <p className="mt-5 text-sm leading-7 text-[#405149]">
                Agent Core는 정책 근거, 세팅 리스크, 증빙 이력, 예산 판단을 같은 장부 형식으로 받아
                다음 운영 회의에서 바로 확인할 수 있게 정리합니다.
              </p>

              <div className="mt-8 grid gap-2">
                {[
                  { label: "데스크별 실행은 감사 가능한 이력으로 기록", icon: History },
                  { label: "위험하거나 비용이 큰 판단은 운영자 승인 기준으로 제어", icon: ShieldCheck },
                  { label: "근거, 예외, 피드백은 다음 캠페인의 기준 후보로 연결", icon: GitBranch },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-lg border border-[#D5DED8] bg-white p-3 text-sm font-medium text-[#101820]">
                    <item.icon className="h-4 w-4 text-[#2F5D50]" aria-hidden="true" />
                    {item.label}
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-2 border-t border-[#D5DED8] pt-5 sm:grid-cols-3">
                {corePrinciples.map((principle) => (
                  <div key={principle.label} className="rounded-lg border border-[#D5DED8] bg-white p-3">
                    <div className="text-xs font-semibold text-[#101820]">{principle.label}</div>
                    <p className="mt-2 text-[11px] leading-5 text-[#5B6B62]">{principle.description}</p>
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
                <div className="text-sm font-semibold">Decision-room loop</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  각 데스크에서 들어온 신호는 판단 기록으로 남고, 운영자 피드백은 다음 회의의 기준 후보가 됩니다.
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
                      <ArrowRight className="hidden h-4 w-4 shrink-0 text-[#2F5D50] sm:block" aria-hidden="true" />
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
