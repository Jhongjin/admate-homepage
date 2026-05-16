import Link from "next/link"
import {
  ArrowDownRight,
  ArrowRight,
  Camera,
  FileCheck2,
  Gauge,
  LineChart,
  Radar,
  Waypoints,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const platformNodes: Array<{
  name: string
  role: string
  verb: string
  signal: string
  proof: string
  accent: string
  icon: LucideIcon
}> = [
  {
    name: "Compass",
    role: "Policy Intelligence",
    verb: "정책을 찾다",
    signal: "RAG 근거와 집행 가능성",
    proof: "Policy",
    accent: "#7DD3FC",
    icon: FileCheck2,
  },
  {
    name: "Sentinel",
    role: "Validation & Monitoring",
    verb: "운영을 지키다",
    signal: "검수 보류, 이상 감지, 권한 제어",
    proof: "Risk",
    accent: "#34D399",
    icon: Radar,
  },
  {
    name: "Lens",
    role: "Capture & Proof",
    verb: "증빙을 만들다",
    signal: "게재 화면, 캡처, 보고 증빙",
    proof: "Proof",
    accent: "#A7F3D0",
    icon: Camera,
  },
  {
    name: "Foresight",
    role: "Planning Intelligence",
    verb: "다음을 예측하다",
    signal: "성과 예측과 예산 판단",
    proof: "Forecast",
    accent: "#FBBF24",
    icon: LineChart,
  },
]

const signalStream = [
  "Policy evidence",
  "Launch gate",
  "Proof capture",
  "Forecast curve",
  "Agent memory",
]

const coreSignals = [
  { label: "AI Core", value: "4 platforms" },
  { label: "Decision layer", value: "policy / risk / proof / forecast" },
  { label: "Operating memory", value: "auditable context" },
]

const heroMetrics = [
  { label: "Compass", value: "근거", accent: "#7DD3FC" },
  { label: "Sentinel", value: "검수", accent: "#34D399" },
  { label: "Lens", value: "증빙", accent: "#A7F3D0" },
  { label: "Foresight", value: "예측", accent: "#FBBF24" },
]

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#04070D] text-white"
    >
      <div className="absolute inset-0 admate-ai-field" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/60 to-transparent" aria-hidden="true" />

      <div className="section-shell relative z-10 grid min-h-[calc(92dvh-56px)] gap-8 py-7 sm:py-9 lg:grid-cols-[minmax(0,0.92fr)_minmax(580px,1.08fr)] lg:items-center lg:gap-10 xl:max-w-[1360px]">
        <HeroCopy />
        <AgentConstellation />
      </div>

      <div className="section-shell relative z-10 -mt-2 pb-6 xl:max-w-[1360px]">
        <SignalStrip />
      </div>
    </section>
  )
}

function HeroCopy() {
  return (
    <div className="relative min-w-0 lg:pr-4">
      <div className="inline-flex max-w-full items-center gap-2 border border-cyan-200/20 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-cyan-100 shadow-[0_0_40px_rgba(56,189,248,0.12)] backdrop-blur-xl">
        <Gauge className="h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />
        <span className="min-w-0 break-words">Agent Core online · Compass · Sentinel · Lens · Foresight</span>
      </div>

      <h1 className="mt-6 max-w-[760px] text-balance text-[48px] font-semibold leading-[0.94] tracking-normal text-white sm:text-[76px] lg:text-[82px] xl:text-[96px]">
        AdMate
        <span className="mt-3 block bg-gradient-to-r from-cyan-100 via-white to-emerald-100 bg-clip-text text-[0.54em] leading-[1.04] text-transparent sm:text-[0.62em]">
          <span className="block">AI가 연결하는</span>
          <span className="block">광고 운영의 네 가지 감각</span>
        </span>
      </h1>

      <p className="mt-6 max-w-[660px] text-balance text-lg font-medium leading-8 text-slate-200 sm:text-xl">
        정책을 찾는 Compass, 운영을 지키는 Sentinel, 증빙을 만드는 Lens, 다음을 예측하는 Foresight.
        AdMate는 네 플랫폼을 Agent Core로 연결해 광고 운영을 하나의 판단 흐름으로 정렬합니다.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button
          asChild
          size="lg"
          className="min-w-0 whitespace-normal border border-cyan-200/30 bg-cyan-200 text-[#061018] shadow-[0_18px_50px_rgba(34,211,238,0.22)] hover:bg-white"
        >
          <Link href="/command-center">
            Command Center 보기
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="min-w-0 whitespace-normal border-white/[0.18] bg-white/[0.04] text-white hover:border-white/30 hover:bg-white/[0.08]"
        >
          <Link href="#platform">
            Platform Quartet
            <ArrowDownRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>
        </Button>
      </div>

      <div className="mt-8 hidden min-w-0 gap-2 sm:grid sm:grid-cols-2">
        {coreSignals.map((item) => (
          <div key={item.label} className="border border-white/10 bg-white/[0.045] px-4 py-3 backdrop-blur-xl">
            <div className="text-xs font-semibold text-slate-400">{item.label}</div>
            <div className="mt-1 break-words text-sm font-semibold text-slate-100">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AgentConstellation() {
  return (
    <div className="relative min-w-0 overflow-hidden border border-white/[0.12] bg-[#07101A]/[0.88] shadow-[0_34px_90px_rgba(0,0,0,0.48)] backdrop-blur-2xl">
      <div className="absolute inset-0 admate-ai-matrix opacity-70" aria-hidden="true" />
      <div className="absolute inset-0 admate-ai-scan" aria-hidden="true" />
      <svg className="absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 640 560" aria-hidden="true">
        <path className="admate-ai-connection" d="M154 132 C248 150 274 198 320 278" />
        <path className="admate-ai-connection delay-1" d="M486 132 C392 150 366 198 320 278" />
        <path className="admate-ai-connection delay-2" d="M154 428 C246 404 280 352 320 278" />
        <path className="admate-ai-connection delay-3" d="M486 428 C394 404 360 352 320 278" />
      </svg>

      <div className="relative z-10 p-4 sm:p-5 lg:min-h-[560px]">
        <div className="relative z-20 mx-auto mb-4 w-full max-w-[330px] lg:absolute lg:left-1/2 lg:top-1/2 lg:mb-0 lg:w-[250px] lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2 2xl:w-[330px]">
          <AgentCore />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:h-[520px] lg:grid-cols-[minmax(0,1fr)_minmax(190px,0.68fr)_minmax(0,1fr)] lg:grid-rows-2 lg:gap-4">
          {platformNodes.map((node, index) => (
            <PlatformNode
              key={node.name}
              node={node}
              index={index}
              className={[
                index === 0 ? "lg:col-start-1 lg:row-start-1 lg:self-start" : "",
                index === 1 ? "lg:col-start-3 lg:row-start-1 lg:self-start" : "",
                index === 2 ? "lg:col-start-1 lg:row-start-2 lg:self-end" : "",
                index === 3 ? "lg:col-start-3 lg:row-start-2 lg:self-end" : "",
              ].join(" ")}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 grid border-t border-white/10 bg-black/[0.24] sm:grid-cols-5">
        {signalStream.map((signal, index) => (
          <div key={signal} className="border-b border-white/10 px-3 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <div className="flex items-center justify-between gap-3">
              <span className="truncate text-xs font-semibold text-slate-300">{signal}</span>
              <span className="font-mono text-[10px] text-cyan-200/70">0{index + 1}</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden bg-white/10">
              <span
                className="admate-ai-stream block h-full"
                style={{
                  animationDelay: `${index * -0.5}s`,
                  backgroundColor: index === 4 ? "#FBBF24" : "#67E8F9",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AgentCore() {
  return (
    <div className="admate-ai-core relative overflow-hidden border border-cyan-200/[0.24] bg-[#07131F]/[0.92] p-5 text-center shadow-[0_0_70px_rgba(34,211,238,0.20)]">
      <div className="absolute inset-4 border border-white/10" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center border border-cyan-200/[0.35] bg-cyan-200/10 text-cyan-100 shadow-[0_0_36px_rgba(125,211,252,0.22)]">
        <Waypoints className="h-8 w-8" aria-hidden="true" />
      </div>
      <div className="relative z-10 mt-4 text-xs font-semibold text-cyan-100">AdMate Agent Core</div>
      <div className="relative z-10 mt-2 text-xl font-semibold leading-none text-white xl:text-2xl">AI Platform Quartet</div>
      <div className="relative z-10 mt-3 text-sm font-medium leading-6 text-slate-300">
        <span className="sm:hidden">네 플랫폼의 판단을 하나로 연결</span>
        <span className="hidden sm:inline">정책, 검수, 증빙, 예측을 하나의 운영 기억으로 연결</span>
      </div>
    </div>
  )
}

function PlatformNode({
  node,
  index,
  className,
}: {
  node: (typeof platformNodes)[number]
  index: number
  className: string
}) {
  const Icon = node.icon

  return (
    <article
      className={`admate-ai-node min-w-0 border border-white/[0.12] bg-white/[0.055] p-4 backdrop-blur-xl ${className}`}
      style={{ animationDelay: `${index * 0.45}s` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-slate-400">{node.role}</div>
          <h2 className="mt-1 whitespace-nowrap text-xl font-semibold leading-none text-white xl:text-2xl">{node.name}</h2>
        </div>
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center border bg-black/30"
          style={{ borderColor: `${node.accent}66`, color: node.accent }}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="h-2 w-2 shrink-0 rounded-full shadow-[0_0_18px_currentColor]" style={{ backgroundColor: node.accent, color: node.accent }} aria-hidden="true" />
        <span className="text-sm font-semibold text-slate-100">{node.verb}</span>
      </div>
      <p className="mt-3 text-sm font-medium leading-6 text-slate-300">{node.signal}</p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
        <span className="text-xs font-semibold text-slate-400">Signal</span>
        <span className="rounded-full border px-2.5 py-1 text-xs font-semibold" style={{ borderColor: `${node.accent}55`, color: node.accent }}>
          {node.proof}
        </span>
      </div>
    </article>
  )
}

function SignalStrip() {
  return (
    <div className="grid overflow-hidden border border-white/10 bg-white/[0.045] backdrop-blur-xl sm:grid-cols-4">
      {heroMetrics.map((metric) => (
        <div key={metric.label} className="border-b border-white/10 px-4 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
          <div className="flex items-center justify-between gap-3">
            <span className="truncate text-sm font-semibold text-slate-200">{metric.label}</span>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: metric.accent }} aria-hidden="true" />
          </div>
          <div className="mt-2 text-xl font-semibold text-white">{metric.value}</div>
        </div>
      ))}
    </div>
  )
}
