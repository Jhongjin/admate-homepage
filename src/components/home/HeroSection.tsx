import Link from "next/link"
import {
  ArrowDownRight,
  ArrowRight,
  BrainCircuit,
  Camera,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Network,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  Waypoints,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const heroFlow: Array<{ label: string; product: string; icon: LucideIcon }> = [
  { label: "Plan", product: "Foresight", icon: Route },
  { label: "Policy", product: "Compass", icon: FileCheck2 },
  { label: "Validate", product: "Sentinel", icon: ShieldCheck },
  { label: "Monitor", product: "Sentinel", icon: Radar },
  { label: "Capture", product: "Lens", icon: Camera },
  { label: "Learn", product: "Agent Core", icon: BrainCircuit },
]

const heroEvents: Array<{ title: string; value: string; icon: LucideIcon }> = [
  { title: "정책 근거 연결", value: "Compass", icon: FileCheck2 },
  { title: "실시간 이상 감지", value: "Sentinel", icon: ShieldCheck },
  { title: "보고 증빙 준비", value: "Lens", icon: CheckCircle2 },
]

export function HeroSection() {
  return (
    <section id="top" className="relative isolate overflow-hidden border-b border-[#1E293B] bg-[#07101D] text-white">
      <div className="absolute inset-0 hero-grid-dark" aria-hidden="true" />
      <div className="hero-scanline absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="section-shell relative grid min-h-[calc(100svh-56px)] items-center gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div className="max-w-3xl">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#A9B7FF]">
            Nasmedia Data Analytics Team
          </div>
          <h1 className="text-balance text-6xl font-semibold tracking-normal text-white sm:text-7xl lg:text-8xl">
            Ad<span className="text-[#A9B7FF]">Mate</span>
          </h1>
          <p className="mt-4 text-balance text-2xl font-semibold leading-tight text-white sm:text-3xl">
            AI Agent 기반 광고
            <br />
            <span className="inline-block whitespace-nowrap">운영 자동화 플랫폼</span>
          </p>
          <p className="mt-7 text-balance text-xl font-medium leading-snug text-white/90 sm:text-2xl">
            기획부터 운영, 검수, 캡처, 학습까지
            <br />
            광고 운영의 전 과정을 AI Agent가 연결합니다.
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            AdMate는 광고 캠페인의 정책 확인, 세팅 검수, 실시간 모니터링,
            캡처 자동화, 성과 예측을 하나의 Agent 운영 흐름으로 연결해
            반복 업무를 줄이고 캠페인 판단을 더 정확하게 만듭니다.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-[#07101D] hover:bg-white/90">
              <Link href="#platform">
                AdMate 생태계 보기
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white">
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
                className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white/90"
              >
                <item.icon className="h-4 w-4 text-white/60" aria-hidden="true" />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <AgentCommandBanner />
      </div>
    </section>
  )
}

function AgentCommandBanner() {
  return (
    <div className="relative">
      <div className="absolute inset-x-6 -bottom-6 h-10 border-x border-b border-white/10" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-lg border border-white/20 bg-[#0A1220] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.38)] sm:p-4">
        <div className="hero-panel-grid absolute inset-0" aria-hidden="true" />
        <div className="relative">
          <div className="mb-4 flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase text-white/50">
                Agent Control Room
              </div>
              <div className="mt-1 text-xl font-semibold text-white">
                Campaign flow is connected.
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-semibold text-emerald-100">
              <span className="hero-status-dot h-2 w-2 rounded-full bg-emerald-300" aria-hidden="true" />
              Agent Core Online
            </div>
          </div>

          <div className="grid gap-3 xl:grid-cols-[0.85fr_1.15fr]">
            <div className="grid gap-3">
              <div className="rounded-lg border border-white/10 bg-white/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-white/50">Active campaign loop</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Plan → Learn</p>
                  </div>
                  <Network className="h-8 w-8 text-white/50" aria-hidden="true" />
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    { label: "정책 확인", width: "82%" },
                    { label: "세팅 검수", width: "71%" },
                    { label: "모니터링", width: "64%" },
                    { label: "캡처 생성", width: "53%" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                        <div className="hero-metric-bar h-full rounded-full bg-[#8EA2FF]" style={{ width: item.width }} />
                      </div>
                      <span className="w-16 text-xs font-medium text-white/70">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {heroEvents.map((event) => (
                  <div key={event.title} className="min-h-[112px] rounded-lg border border-white/10 bg-white/10 p-3">
                    <event.icon className="h-4 w-4 text-white/60" aria-hidden="true" />
                    <p className="mt-4 text-xs font-medium text-white/60">{event.title}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{event.value}</p>
                  </div>
                ))}
                <div className="min-h-[112px] rounded-lg border border-white/10 bg-white p-3 text-[#07101D]">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  <p className="mt-4 text-xs font-medium text-[#5B6475]">학습 피드백</p>
                  <p className="mt-1 text-sm font-semibold">Weekly Loop</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#070D18] p-4">
              <div className="absolute inset-x-6 top-[48%] h-px bg-white/10" aria-hidden="true">
                <span className="hero-flow-pulse" />
              </div>
              <div className="absolute inset-y-8 left-1/2 w-px bg-white/10" aria-hidden="true" />

              <div className="relative grid gap-3 sm:grid-cols-3">
                {heroFlow.slice(0, 3).map((item, index) => (
                  <HeroFlowTile key={item.label} index={index} item={item} />
                ))}
              </div>

              <div className="hero-core-card relative z-10 mx-auto my-4 max-w-[280px] overflow-hidden rounded-lg border border-white/20 bg-white p-4 text-center text-[#07101D] shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#111827] text-white">
                  <BrainCircuit className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="text-sm font-semibold">AdMate Agent Core</div>
                <p className="mt-1 text-xs leading-5 text-[#5B6475]">
                  실행, 판단, 기억, 비용 추적을 하나의 운영 흐름으로 연결
                </p>
              </div>

              <div className="relative grid gap-3 sm:grid-cols-3">
                {heroFlow.slice(3).map((item, index) => (
                  <HeroFlowTile key={item.label} index={index + 3} item={item} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 grid gap-2 text-xs text-white/60 sm:grid-cols-3">
            {["Human-in-the-loop", "Cost-aware AI", "Evidence-ready reporting"].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2">
                <Waypoints className="h-3.5 w-3.5 text-white/50" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroFlowTile({
  index,
  item,
}: {
  index: number
  item: {
    label: string
    product: string
    icon: LucideIcon
  }
}) {
  return (
    <div
      className="hero-flow-tile min-h-[106px] rounded-lg border border-white/20 bg-white/10 p-3"
      style={{ animationDelay: `${index * 0.55}s` }}
    >
      <item.icon className="h-4 w-4 text-[#A9B7FF]" aria-hidden="true" />
      <div className="mt-5 text-sm font-semibold text-white">{item.label}</div>
      <div className="mt-1 text-xs leading-4 text-white/50">{item.product}</div>
    </div>
  )
}
