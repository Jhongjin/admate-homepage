import Link from "next/link"
import {
  ArrowRight,
  ExternalLink,
  FileCheck2,
  LineChart,
  MonitorCog,
  Radar,
  ScanLine,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { officialLinks } from "@/lib/admate-content"

const platformChapters = [
  {
    name: "Compass",
    role: "Policy intelligence",
    verb: "Find the rule",
    korean: "정책 근거와 집행 가능성을 먼저 확인합니다.",
    signal: "RAG evidence",
    accent: "#7DD3FC",
    href: officialLinks.compass,
    icon: FileCheck2,
  },
  {
    name: "Sentinel",
    role: "Validation & monitoring",
    verb: "Guard the launch",
    korean: "세팅 오류, 예산 이상, 운영 리스크를 관제합니다.",
    signal: "Risk gate",
    accent: "#34D399",
    href: officialLinks.sentinel,
    icon: Radar,
  },
  {
    name: "Lens",
    role: "Capture & proof",
    verb: "Prove the delivery",
    korean: "게재 화면과 보고 증빙을 자동으로 남깁니다.",
    signal: "Proof capture",
    accent: "#99F6E4",
    href: officialLinks.lens,
    icon: ScanLine,
  },
  {
    name: "Foresight",
    role: "Planning intelligence",
    verb: "Predict the next move",
    korean: "성과 기준선과 예산 판단을 기획 단계에 올립니다.",
    signal: "Forecast",
    accent: "#F6C35B",
    href: "",
    icon: LineChart,
  },
]

const operatingSequence = [
  { code: "01", title: "Brief", detail: "목표, 예산, 매체 조건이 들어옵니다." },
  { code: "02", title: "Policy", detail: "Compass가 정책과 출처를 붙입니다." },
  { code: "03", title: "Gate", detail: "Sentinel이 집행 전 위험을 멈춥니다." },
  { code: "04", title: "Proof", detail: "Lens가 보고 가능한 증빙을 만듭니다." },
  { code: "05", title: "Forecast", detail: "Foresight가 다음 예산 판단을 남깁니다." },
]

const trustSignals = [
  "출처 기반 정책 답변",
  "운영 로그와 승인 이력",
  "권한별 접근 경계",
  "민감 정보 보호 설계",
  "제품별 감사 가능성",
]

export function HomeRebuildExperience() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#F3F0E8] text-[#101820]">
      <HeroWorld />
      <SuiteManifest />
      <OperatingFilm />
      <TrustLayer />
      <HomeFinalCta />
    </div>
  )
}

function HeroWorld() {
  return (
    <section id="top" className="relative isolate min-h-[100dvh] overflow-hidden bg-[#041019] text-white">
      <div className="absolute inset-0 homepage-world-field" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-[#D8F6EA]/50 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-48 bg-gradient-to-b from-transparent via-[#071018]/50 to-[#F3F0E8]" aria-hidden="true" />

      <div className="section-shell relative z-10 grid min-h-[100dvh] content-center gap-8 pb-20 pt-24 lg:grid-cols-[minmax(420px,0.72fr)_minmax(620px,1fr)] lg:items-center lg:gap-4 lg:pt-28 xl:max-w-[1440px]">
        <div className="relative z-20 max-w-[720px]">
          <div className="inline-grid grid-cols-[auto_1fr_auto] items-center gap-3 border border-[#D8F6EA]/18 bg-[#06131D]/72 px-3 py-2 text-xs font-semibold text-[#DDEBE6] shadow-[0_0_36px_rgba(125,211,252,0.08)] backdrop-blur-md">
            <span className="homepage-live-dot h-2 w-2 bg-[#9FE7C8]" aria-hidden="true" />
            <span>AdMate spatial operating terminal</span>
            <span className="font-mono text-[10px] text-white/42">CORE:SYNC</span>
          </div>

          <h1 className="mt-8 text-balance text-[50px] font-semibold leading-[0.92] tracking-normal sm:text-[76px] lg:text-[92px]">
            네 플랫폼이
            <span className="block text-[#BFEBDD]">하나의 신호장 안에서</span>
            작동합니다.
          </h1>

          <p className="mt-7 max-w-[620px] text-lg font-medium leading-8 text-white/72 sm:text-xl">
            Compass, Sentinel, Lens, Foresight가 Agent Core와 계속 신호를 주고받으며
            정책 확인, 위험 제어, 증빙, 예측을 하나의 AI 운영 공간으로 묶습니다.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group h-12 rounded-full bg-[#D8F6EA] px-5 font-semibold text-[#061018] shadow-none transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white active:scale-[0.98]"
            >
              <Link href={officialLinks.commandCenter}>
                운영판 보기
                <span className="ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#061018] text-white transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/[0.18] bg-white/[0.04] px-5 font-semibold text-white transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <Link href="#suite">네 플랫폼 보기</Link>
            </Button>
          </div>
        </div>

        <HeroSignalScene />
      </div>
    </section>
  )
}

function HeroSignalScene() {
  return (
    <div className="homepage-signal-scene relative min-h-[590px] min-w-0 overflow-visible lg:min-h-[650px]" aria-hidden="true">
      <div className="absolute inset-0 homepage-scene-grid" />
      <div className="absolute inset-0 homepage-scene-horizon" />

      <svg
        className="homepage-signal-svg absolute inset-0 h-full w-full"
        viewBox="0 0 1000 720"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path className="homepage-orbit-line" d="M180 360c0-148 142-268 318-268s318 120 318 268-142 268-318 268-318-120-318-268Z" />
        <path className="homepage-orbit-line homepage-orbit-line-alt" d="M276 124c120 58 322 118 430 246 78 92 84 178 44 244" />
        <path className="homepage-laser-path" d="M178 156 C310 170 382 274 500 360" />
        <path className="homepage-laser-path delay-1" d="M808 190 C684 192 610 292 500 360" />
        <path className="homepage-laser-path delay-2" d="M180 568 C320 526 394 438 500 360" />
        <path className="homepage-laser-path delay-3" d="M816 548 C696 526 612 434 500 360" />
        <path className="homepage-laser-path homepage-laser-return" d="M500 360 C454 226 424 166 178 156" />
        <path className="homepage-laser-path homepage-laser-return delay-2" d="M500 360 C554 490 642 536 816 548" />
      </svg>

      <div className="homepage-data-packet packet-1" />
      <div className="homepage-data-packet packet-2" />
      <div className="homepage-data-packet packet-3" />
      <div className="homepage-data-packet packet-4" />

      <div className="homepage-agent-core absolute left-1/2 top-[88px] z-30 w-[190px] -translate-x-1/2 translate-y-0 border border-[#D8F6EA]/22 bg-[#06131D]/86 p-4 text-center shadow-[0_0_120px_rgba(125,211,252,0.18)] backdrop-blur-xl sm:w-[218px] sm:p-5 lg:top-1/2 lg:-translate-y-1/2">
        <div className="homepage-core-ring" />
        <div className="font-mono text-[10px] font-semibold uppercase text-[#9FE7C8]">Agent Core</div>
        <div className="mt-2 text-lg font-semibold leading-tight sm:text-xl">shared operating memory</div>
        <div className="mx-auto mt-4 grid h-12 w-24 grid-cols-6 items-end gap-1" aria-hidden="true">
          {[18, 34, 25, 46, 30, 40].map((height) => (
            <span key={height} className="homepage-core-bar block bg-[#D8F6EA]/70" style={{ height }} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-1 font-mono text-[9px] text-white/42">
          <span>POLICY</span>
          <span>RISK</span>
          <span>PROOF</span>
        </div>
      </div>

      <div className="absolute inset-0 z-20 hidden lg:block">
        {platformChapters.map((platform, index) => (
          <HeroSceneNode key={platform.name} platform={platform} index={index} />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-4 z-20 grid grid-cols-2 gap-3 px-0 sm:px-8 lg:hidden">
        {platformChapters.map((platform, index) => (
          <HeroSceneNode key={platform.name} platform={platform} index={index} compact />
        ))}
      </div>
    </div>
  )
}

function HeroSceneNode({
  platform,
  index,
  compact = false,
}: {
  platform: (typeof platformChapters)[number]
  index: number
  compact?: boolean
}) {
  const Icon = platform.icon
  const positions = [
    "left-[0%] top-[8%]",
    "right-[0%] top-[16%]",
    "left-[2%] bottom-[11%]",
    "right-[1%] bottom-[7%]",
  ]

  return (
    <div
      className={`homepage-spatial-node border border-white/[0.12] bg-[#071823]/72 p-3 backdrop-blur-md sm:p-4 ${
        compact ? "relative min-h-[118px]" : `absolute w-[248px] ${positions[index]}`
      }`}
      style={{ animationDelay: `${index * 0.45}s` }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase text-white/40">{platform.role}</div>
          <div className="mt-1 text-xl font-semibold leading-none sm:text-2xl">{platform.name}</div>
        </div>
        <Icon className="h-5 w-5" style={{ color: platform.accent }} aria-hidden="true" />
      </div>
      <div className="mt-5">
        <div className="font-mono text-[11px] font-semibold uppercase" style={{ color: platform.accent }}>
          {platform.signal}
        </div>
        <div className="mt-2 h-px overflow-hidden bg-white/10">
          <span className="homepage-signal-runner block h-px w-full" style={{ backgroundColor: platform.accent }} />
        </div>
        <div className="mt-3 grid grid-cols-5 gap-1" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((tick) => (
            <span key={tick} className="h-1 bg-white/10" style={{ backgroundColor: tick === index ? platform.accent : undefined }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SuiteManifest() {
  return (
    <section id="suite" className="relative bg-[#F3F0E8] py-24 sm:py-32">
      <div className="section-shell xl:max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#60706A]">Platform suite</div>
            <h2 className="mt-5 max-w-[620px] text-balance text-4xl font-semibold leading-[1.02] sm:text-6xl">
              네 개의 제품이 한 팀처럼 판단합니다.
            </h2>
          </div>
          <p className="max-w-[620px] text-lg font-medium leading-8 text-[#465650] lg:justify-self-end">
            AdMate는 기능 목록보다 운영 감각을 먼저 보여줍니다. 네 플랫폼은 서로 다른 제품이지만,
            캠페인을 판단하고 지키고 증명하고 예측하는 하나의 흐름으로 작동합니다.
          </p>
        </div>

        <div className="mt-16 grid gap-0 border-y border-[#C9BFAF]">
          {platformChapters.map((platform, index) => {
            const Icon = platform.icon
            const disabled = !platform.href

            return (
              <article
                key={platform.name}
                className="group grid gap-6 border-b border-[#C9BFAF] py-8 last:border-b-0 md:grid-cols-[80px_minmax(190px,0.5fr)_minmax(0,1fr)_auto] md:items-center"
              >
                <div className="font-mono text-sm text-[#7B7063]">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <div className="text-sm font-semibold text-[#60706A]">{platform.role}</div>
                  <h3 className="mt-1 text-4xl font-semibold leading-none sm:text-5xl">{platform.name}</h3>
                </div>
                <div className="max-w-[560px]">
                  <div className="flex items-center gap-3 text-sm font-semibold" style={{ color: platform.accent }}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {platform.verb}
                  </div>
                  <p className="mt-2 text-base font-medium leading-7 text-[#465650]">{platform.korean}</p>
                </div>
                {disabled ? (
                  <span className="w-fit border border-[#D6C59B] px-4 py-2 text-sm font-semibold text-[#9A6A0A]">
                    준비중
                  </span>
                ) : (
                  <Link
                    href={platform.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-[#BDB2A2] px-4 py-2 text-sm font-semibold text-[#101820] transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#101820] hover:bg-[#101820] hover:text-white"
                  >
                    열기
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function OperatingFilm() {
  return (
    <section id="flow" className="relative overflow-hidden bg-[#E8E3D7] py-24 sm:py-32">
      <div className="absolute inset-0 homepage-paper-grid opacity-70" aria-hidden="true" />
      <div className="section-shell relative xl:max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(520px,1fr)] lg:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B6258]">Operating sequence</div>
            <h2 className="mt-5 max-w-[620px] text-balance text-4xl font-semibold leading-[1.02] sm:text-6xl">
              제안서에서 보고서까지, 같은 화면 언어로 이어집니다.
            </h2>
            <p className="mt-6 max-w-[560px] text-lg font-medium leading-8 text-[#4E4A43]">
              하나의 캠페인은 목표와 예산에서 시작해 정책, 검수, 증빙, 예측 신호를 차례로 통과합니다.
              AdMate는 이 신호들을 같은 운영 기억 안에 남겨 다음 의사결정으로 넘깁니다.
            </p>
          </div>

          <div className="relative min-h-[560px] overflow-hidden border border-[#AFA493] bg-[#101820] p-5 text-white">
            <div className="absolute inset-0 homepage-scene-grid opacity-40" aria-hidden="true" />
            <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-[#D8F6EA]/40 to-transparent" aria-hidden="true" />
            <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/[0.12] pb-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9DB0A8]">Campaign signal film</div>
                <div className="mt-2 text-2xl font-semibold">one campaign, five operating signals</div>
              </div>
              <div className="hidden h-12 w-28 grid-cols-6 items-end gap-1 sm:grid" aria-hidden="true">
                {[22, 36, 28, 46, 32, 52].map((height) => (
                  <span key={height} className="block bg-[#D8F6EA]/65" style={{ height }} />
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-10 grid gap-3 md:grid-cols-5">
              {operatingSequence.map((step, index) => (
                <div key={step.code} className="min-h-[300px] border border-white/[0.12] bg-white/[0.045] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-white/46">{step.code}</span>
                    <span className="h-1.5 w-10 bg-[#D8F6EA]/60" style={{ opacity: 0.36 + index * 0.1 }} aria-hidden="true" />
                  </div>
                  <div className="mt-24">
                    <h3 className="text-3xl font-semibold leading-none">{step.title}</h3>
                    <p className="mt-4 text-sm font-medium leading-6 text-white/68">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-5 grid grid-cols-3 gap-2 border border-white/[0.12] bg-white/[0.045] p-2">
              {["Memory", "Audit", "Cost"].map((item) => (
                <div key={item} className="px-3 py-4 text-center">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/48">{item}</div>
                  <div className="mt-2 h-1 bg-[#D8F6EA]/62" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustLayer() {
  return (
    <section id="trust" className="bg-[#101820] py-24 text-white sm:py-32">
      <div className="section-shell xl:max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.84fr)_minmax(420px,0.7fr)] lg:items-start">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#93A59E]">Trust layer</div>
            <h2 className="mt-5 max-w-[760px] text-balance text-4xl font-semibold leading-[1.02] sm:text-6xl">
              AI가 멋있어 보이는 것보다 중요한 것은, 운영자가 믿고 넘길 수 있는 경계입니다.
            </h2>
          </div>
          <div className="border-y border-white/[0.14]">
            {trustSignals.map((signal, index) => (
              <div key={signal} className="grid grid-cols-[56px_1fr] border-b border-white/[0.14] py-5 last:border-b-0">
                <span className="font-mono text-xs text-white/42">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-lg font-semibold text-[#E6F0EC]">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HomeFinalCta() {
  return (
    <section id="access" className="relative overflow-hidden bg-[#F3F0E8] py-24 sm:py-32">
      <div className="section-shell xl:max-w-[1400px]">
        <div className="grid gap-10 border-y border-[#BDB2A2] py-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#60706A]">Start from the operating board</div>
            <h2 className="mt-5 max-w-[780px] text-balance text-4xl font-semibold leading-[1.02] sm:text-6xl">
              회의가 길어지기 전에, 오늘의 운영판을 먼저 여세요.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild size="lg" className="h-12 rounded-full bg-[#101820] px-5 font-semibold text-white hover:bg-[#26342E]">
              <Link href={officialLinks.commandCenter}>
                <MonitorCog className="h-4 w-4" aria-hidden="true" />
                운영판 보기
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full border-[#BDB2A2] bg-transparent px-5 font-semibold text-[#101820] hover:bg-[#E8E3D7]">
              <Link href={officialLinks.accessRequest} target="_blank" rel="noreferrer">
                권한 요청
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
