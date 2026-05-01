import Link from "next/link"
import {
  ArrowDownRight,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Network,
  ShieldCheck,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { products, systemSignals } from "@/lib/admate-content"

export function HeroSection() {
  const satelliteProducts = products.filter((product) => product.id !== "agent-core")

  return (
    <section id="top" className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 soft-grid opacity-60" aria-hidden="true" />
      <div className="section-shell relative grid min-h-[calc(100vh-56px)] items-center gap-10 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:py-20">
        <div className="max-w-3xl">
          <Badge variant="outline" className="mb-5 bg-card text-muted-foreground">
            나스미디어 데이터분석팀 · AI Agent Platform
          </Badge>
          <h1 className="text-balance text-5xl font-semibold tracking-normal text-foreground sm:text-6xl lg:text-7xl">
            AdMate
          </h1>
          <p className="mt-4 text-balance text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
            AI Agent 기반 광고 운영 자동화 플랫폼
          </p>
          <p className="mt-7 text-balance text-xl font-medium leading-snug text-foreground sm:text-2xl">
            기획부터 운영, 검수, 캡처, 학습까지
            <br />
            광고 운영의 전 과정을 AI Agent가 연결합니다.
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            AdMate는 광고 캠페인의 정책 확인, 세팅 검수, 실시간 모니터링,
            캡처 자동화, 성과 예측을 하나의 Agent 운영 흐름으로 연결해
            반복 업무를 줄이고 캠페인 판단을 더 정확하게 만듭니다.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#platform">
                AdMate 생태계 보기
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#products">
                제품 구성 살펴보기
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="mt-9 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: "반복 업무 절감", icon: Clock3 },
              { label: "캠페인 사고 예방", icon: ShieldCheck },
              { label: "운영 지식 축적", icon: BrainCircuit },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold"
              >
                <item.icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <Card className="relative overflow-hidden p-4 shadow-soft sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                Agent Operating Flow
              </div>
              <div className="mt-1 text-lg font-semibold">Plan. Validate. Monitor. Capture. Learn.</div>
            </div>
            <Badge variant="outline" className="bg-muted">
              Live System Map
            </Badge>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
            <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-border bg-[#FAFAFA] p-4">
              <div className="absolute inset-x-4 top-1/2 h-px bg-border" aria-hidden="true" />
              <div className="absolute inset-y-4 left-1/2 w-px bg-border" aria-hidden="true" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,106,210,0.10),transparent_42%)]" aria-hidden="true" />

              <div className="absolute left-1/2 top-1/2 z-10 w-[178px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#CFCFE8] bg-white p-4 text-center shadow-soft">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#111827] text-white">
                  <Network className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="text-sm font-semibold">AdMate Agent Core</div>
                <div className="mt-1 text-xs leading-5 text-muted-foreground">
                  Intelligence & Automation Engine
                </div>
              </div>

              {satelliteProducts.map((product, index) => {
                const positions = [
                  "left-1/2 top-5 -translate-x-1/2",
                  "right-5 top-1/2 -translate-y-1/2",
                  "left-1/2 bottom-5 -translate-x-1/2",
                  "left-5 top-1/2 -translate-y-1/2",
                ]
                const Icon = product.icon

                return (
                  <Tooltip key={product.id}>
                    <TooltipTrigger asChild>
                      <div
                        className={`absolute z-20 w-[156px] rounded-lg border bg-white p-3 shadow-sm ${positions[index]}`}
                        style={{ borderColor: product.borderColor }}
                      >
                        <div
                          className="mb-2 flex h-8 w-8 items-center justify-center rounded-md"
                          style={{ backgroundColor: product.softColor, color: product.color }}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <div className="text-sm font-semibold">{product.shortName}</div>
                        <div className="mt-1 text-[11px] leading-4 text-muted-foreground">
                          {product.subtitle}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{product.tagline}</TooltipContent>
                  </Tooltip>
                )
              })}
            </div>

            <div className="grid gap-3">
              <div className="rounded-lg border border-border bg-[#111827] p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/60">Current loop</span>
                  <CircleDollarSign className="h-4 w-4 text-white/60" aria-hidden="true" />
                </div>
                <div className="mt-4 text-2xl font-semibold">Cost-aware AI</div>
                <p className="mt-2 text-xs leading-5 text-white/70">
                  플랫폼별 LLM 사용량과 자동화 실행을 추적하는 운영 구조를 전제로 설계합니다.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {systemSignals.slice(0, 8).map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-border bg-card p-3 text-xs font-semibold text-muted-foreground"
                  >
                    <item.icon className="mb-2 h-4 w-4 text-foreground" aria-hidden="true" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-4" />
          <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
            {["정책 근거", "운영 이력", "학습 피드백"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#177D4E]" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
