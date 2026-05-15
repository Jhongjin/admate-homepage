import Link from "next/link"
import {
  ArrowDownRight,
  ArrowRight,
  Camera,
  Clock3,
  FileCheck2,
  Gauge,
  LineChart,
  Radar,
  Waypoints,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const commandModes = ["Plan", "Policy", "Validate", "Monitor", "Capture", "Learn"]

const missionBrief = [
  { label: "Compass", lane: "Policy", value: "정책 근거", action: "집행 가능성 확인", tone: "#1F6F8B" },
  { label: "Sentinel", lane: "Gate", value: "검수 보류", action: "위험 신호 분리", tone: "#177D4E" },
  { label: "Lens", lane: "Proof", value: "증빙 잠금", action: "보고 캡처 확정", tone: "#2B6D67" },
  { label: "Foresight", lane: "Forecast", value: "예산 기준", action: "투자 판단 정렬", tone: "#B45309" },
]

const heroVitals = [
  { label: "Policy clearance", value: "근거 확인", detail: "Compass" },
  { label: "Control gate", value: "검수 대기", detail: "Sentinel" },
  { label: "Board decision", value: "판단 필요", detail: "Foresight" },
]

const operatingRoomMarks = [
  { label: "Policy", product: "Compass" },
  { label: "Gate", product: "Sentinel" },
  { label: "Proof", product: "Lens" },
  { label: "Forecast", product: "Foresight" },
]

const portfolioRows: Array<{
  product: string
  role: string
  status: string
  signal: string
  pattern: "evidence" | "loop" | "proof" | "forecast"
  icon: LucideIcon
  color: string
  softColor: string
  borderColor: string
  activeModes: number[]
}> = [
  {
    product: "AdMate Compass",
    role: "Evidence desk",
    status: "집행 가능성",
    signal: "정책 근거",
    pattern: "evidence",
    icon: FileCheck2,
    color: "#1F6F8B",
    softColor: "#EAF4F7",
    borderColor: "#B9D8E2",
    activeModes: [1],
  },
  {
    product: "AdMate Sentinel",
    role: "Control loop",
    status: "검수/감시",
    signal: "세팅 리스크",
    pattern: "loop",
    icon: Radar,
    color: "#177D4E",
    softColor: "#EFFAF4",
    borderColor: "#9FE5C1",
    activeModes: [2, 3],
  },
  {
    product: "AdMate Lens",
    role: "Proof desk",
    status: "증빙 확정",
    signal: "캡처 이력",
    pattern: "proof",
    icon: Camera,
    color: "#2B6D67",
    softColor: "#E8F4F1",
    borderColor: "#B9D8D3",
    activeModes: [4],
  },
  {
    product: "AdMate Foresight",
    role: "Forecast desk",
    status: "기획 기준",
    signal: "예산 판단",
    pattern: "forecast",
    icon: LineChart,
    color: "#B45309",
    softColor: "#FFF8EC",
    borderColor: "#F5CE8B",
    activeModes: [0],
  },
]

const executiveLedger = [
  { label: "운영 초점", value: "검수 승인, 예산 이상, 증빙 확정" },
  { label: "열린 판단", value: "집행 가능 여부와 다음 수정 우선순위" },
  { label: "Agent Core 기록", value: "정책 근거, 운영 이력, 학습 피드백" },
]

const operatingReadouts = [
  { label: "Suite posture", value: "4개 제품 신호를 하나의 운영 순서로 정렬" },
  { label: "Decision frame", value: "승인 · 수정 · 공유 · 투자 판단" },
  { label: "Memory ledger", value: "근거, 비용, 피드백을 Agent Core로 기록" },
]

const boardSignals = [
  { label: "Gate", value: "집행 전 검수" },
  { label: "Watch", value: "예산/KPI 이상" },
  { label: "Proof", value: "보고 증빙" },
]

export function HeroSection() {
  return (
    <section id="top" className="relative isolate overflow-hidden border-b border-[#BAC5BE] bg-[#ECEFEA]">
      <div className="absolute inset-0 command-grid opacity-75" aria-hidden="true" />
      <div className="section-shell relative grid min-h-[calc(100dvh-56px)] gap-8 py-8 lg:grid-cols-[136px_minmax(0,1fr)] lg:py-10">
        <CommandRail />

        <div className="grid min-w-0 gap-5">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.76fr)_minmax(430px,1fr)] lg:items-stretch">
            <HeroEditorial />
            <OperationsWall />
          </div>

          <div className="grid border-y border-[#BAC5BE] bg-[#F7F8F6]/82 sm:grid-cols-3">
            {operatingReadouts.map((item) => (
              <div key={item.label} className="border-b border-[#D3DDD7] px-3 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#66756D]">
                  {item.label}
                </div>
                <div className="mt-1 text-xs font-semibold leading-5 text-[#405149]">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CommandRail() {
  return (
    <aside className="hidden border-x border-[#BAC5BE] bg-[#F7F8F6]/72 lg:flex lg:flex-col">
      <div className="border-b border-[#BAC5BE] px-4 py-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#66756D]">AdMate</div>
        <div className="mt-1 text-sm font-semibold leading-tight text-[#101820]">Operating Room</div>
      </div>
      <div className="grid flex-1 content-stretch divide-y divide-[#D5DDD8]">
        {commandModes.map((mode, index) => (
          <div key={mode} className="flex min-h-[58px] items-center justify-between gap-2 px-4">
            <span className="text-xs font-semibold text-[#101820]">{mode}</span>
            <span className="font-mono text-[10px] text-[#7B8780]">{String(index + 1).padStart(2, "0")}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-[#BAC5BE] px-4 py-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-[#177D4E]">
          <span className="h-2 w-2 rounded-full bg-[#177D4E]" aria-hidden="true" />
          Board online
        </div>
      </div>
    </aside>
  )
}

function HeroEditorial() {
  return (
    <div className="relative flex min-w-0 flex-col justify-between border-y border-[#BAC5BE] py-6 lg:border-y-0 lg:py-0 lg:pr-3">
      <div className="absolute bottom-0 right-0 top-0 hidden w-px bg-[#BAC5BE] lg:block" aria-hidden="true" />
      <div>
        <div className="mb-5 grid w-full max-w-[520px] grid-cols-[auto_1fr] border border-[#BAC5BE] bg-white">
          <div className="flex items-center gap-2 border-r border-[#D3DDD7] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#405149]">
            <Gauge className="h-3.5 w-3.5 text-[#177D4E]" aria-hidden="true" />
            Room active
          </div>
          <div className="flex min-w-0 items-center justify-between gap-3 px-3 py-2">
            <span className="truncate text-[11px] font-semibold text-[#66756D]">Agent Core briefing surface</span>
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#177D4E]" aria-hidden="true" />
          </div>
        </div>

        <h1 className="max-w-[760px] text-balance text-5xl font-semibold leading-[0.9] tracking-normal text-[#101820] sm:text-7xl lg:text-[92px]">
          AdMate
          <span className="mt-2 block text-[#2F3C35]">operating room</span>
        </h1>
        <p className="mt-5 max-w-[640px] text-balance text-2xl font-semibold leading-tight text-[#27362F] sm:text-3xl">
          광고 운영을 기능 목록이 아니라 판단 대기열로 보여줍니다.
        </p>

        <div className="mt-6 grid border border-[#BAC5BE] bg-[#F7F8F6] sm:grid-cols-[1fr_auto]">
          <div className="grid sm:grid-cols-3">
            {heroVitals.map((item) => (
              <div key={item.label} className="border-b border-[#D3DDD7] px-4 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#66756D]">
                  {item.label}
                </div>
                <div className="mt-2 text-lg font-semibold leading-none text-[#101820]">
                  {item.value}
                </div>
                <div className="mt-2 text-[11px] font-semibold text-[#66756D]">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
          <div className="hidden min-w-[92px] border-l border-[#D3DDD7] bg-white px-3 py-4 text-right sm:block">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#66756D]">Ops</div>
            <div className="mt-2 text-2xl font-semibold leading-none text-[#101820]">04</div>
            <div className="mt-1 text-[11px] font-semibold text-[#66756D]">lanes</div>
          </div>
        </div>

        <div className="mt-5 grid border border-[#101820] bg-[#101820] text-white sm:grid-cols-[150px_minmax(0,1fr)]">
          <div className="border-b border-white/15 px-4 py-4 sm:border-b-0 sm:border-r">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
              Mission board
            </div>
            <div className="mt-2 text-sm font-semibold leading-5 text-white">
              제품 소개가 아니라 판단 대기열.
            </div>
          </div>
          <div className="grid sm:grid-cols-2">
            {missionBrief.map((item) => (
              <div key={item.label} className="border-b border-white/15 px-4 py-3 last:border-b-0 sm:border-r sm:border-white/15 sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
                <div className="flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">
                  <span>{item.lane}</span>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.tone }} aria-hidden="true" />
                </div>
                <div className="mt-2 text-sm font-semibold text-white">
                  {item.value}
                </div>
                <div className="mt-1 text-xs font-medium text-white/62">
                  {item.label} · {item.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-3 border-t border-[#BAC5BE] pt-5">
        <div className="grid grid-cols-2 border border-[#BAC5BE] bg-[#F7F8F6] sm:grid-cols-4">
          {operatingRoomMarks.map((item) => (
            <div key={item.product} className="border-b border-[#D3DDD7] px-3 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#66756D]">{item.label}</div>
              <div className="mt-1 text-xs font-semibold text-[#101820]">{item.product}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-[#101820] text-white hover:bg-[#25322B]">
            <Link href="#platform">
              운영 보드 보기
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-[#AEBAB2] bg-white text-[#101820] hover:bg-[#F7F8F6]">
            <Link href="#products">
              판단 흐름 보기
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function OperationsWall() {
  return (
    <div className="min-w-0 border border-[#101820] bg-[#F8FAF7] shadow-[0_22px_64px_rgba(16,24,32,0.16)]">
      <div className="grid border-b border-[#101820] bg-[#101820] text-white sm:grid-cols-[1fr_auto]">
        <div className="px-4 py-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
            AdMate signal board
          </div>
          <div className="mt-1 text-lg font-semibold">제품별 신호와 승인 순서</div>
        </div>
        <div className="flex items-center border-t border-white/10 px-4 py-3 sm:border-l sm:border-t-0">
          <div className="inline-flex items-center gap-2 border border-[#9FE5C1]/35 bg-[#177D4E]/22 px-3 py-2 text-xs font-semibold text-[#DDF7E9]">
            <span className="h-2 w-2 rounded-full bg-[#63D793]" aria-hidden="true" />
            상황판 정렬
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px]">
        <div className="min-w-0">
          <div className="grid grid-cols-6 border-b border-[#D3DDD7] bg-[#FFFDF8]">
            {commandModes.map((mode) => (
              <div key={mode} className="border-r border-[#E1E7E3] px-2 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-[#66756D] last:border-r-0">
                {mode}
              </div>
            ))}
          </div>

          <div className="divide-y divide-[#D3DDD7]">
            {portfolioRows.map((row) => (
              <PortfolioRow key={row.product} row={row} />
            ))}
          </div>

          <div className="grid border-t border-[#D3DDD7] bg-[#F1F4F0] sm:grid-cols-3">
            {boardSignals.map((item) => (
              <div key={item.label} className="border-b border-[#D3DDD7] px-4 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#66756D]">
                  {item.label}
                </div>
                <div className="mt-1 text-xs font-semibold text-[#405149]">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="border-t border-[#D3DDD7] bg-white lg:border-l lg:border-t-0">
          <div className="border-b border-[#D3DDD7] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#66756D]">
                  Agent Core
                </div>
                <div className="mt-2 text-2xl font-semibold text-[#101820]">운영 기억 정렬</div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center bg-[#101820] text-white">
                <Waypoints className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
            <p className="mt-3 text-xs font-medium leading-5 text-[#5B6B62]">
              Openclaw 실행과 Hermes 학습을 공통 운영 계층으로 묶어 판단 근거와 피드백을 보존합니다.
            </p>
          </div>

          <div className="divide-y divide-[#D3DDD7]">
            {executiveLedger.map((item) => (
              <div key={item.label} className="p-4">
                <div className="text-[11px] font-semibold text-[#66756D]">{item.label}</div>
                <div className="mt-2 text-sm font-semibold leading-6 text-[#101820]">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="m-4 border border-[#101820] bg-[#101820] p-4 text-white">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
              <Waypoints className="h-4 w-4" aria-hidden="true" />
              Operating principle
            </div>
            <p className="mt-3 text-sm font-medium leading-6 text-white/75">
              정책 근거는 문서 스택으로 남기고, 감시는 상태 루프에서 막힘을 띄우며, 캡처 증빙과
              예산 곡선은 다음 회의의 승인 순서를 정합니다.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function PortfolioRow({
  row,
}: {
  row: (typeof portfolioRows)[number]
}) {
  return (
    <div className="grid gap-0 bg-[#FBFCFA] transition-colors hover:bg-[#FFFDF8] sm:grid-cols-[180px_minmax(0,1fr)_140px]">
      <div className="flex items-center gap-3 border-b border-[#E1E7E3] px-4 py-4 sm:border-b-0 sm:border-r">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center border"
          style={{ backgroundColor: row.softColor, borderColor: row.borderColor, color: row.color }}
        >
          <row.icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[#101820]">{row.product}</div>
          <div className="mt-1 truncate text-[11px] font-medium text-[#66756D]">{row.role}</div>
        </div>
      </div>

      <div className="min-h-[72px] border-b border-[#E1E7E3] px-4 py-3 sm:border-b-0">
        <ProductSignalPattern row={row} />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#E1E7E3] px-4 py-3 sm:border-l sm:border-t-0">
        <div>
          <div className="text-[11px] font-semibold text-[#66756D]">{row.signal}</div>
          <div className="mt-1 text-xs font-semibold" style={{ color: row.color }}>
            {row.status}
          </div>
        </div>
        <Clock3 className="h-4 w-4 text-[#7B8780]" aria-hidden="true" />
      </div>
    </div>
  )
}

function ProductSignalPattern({
  row,
}: {
  row: (typeof portfolioRows)[number]
}) {
  if (row.pattern === "evidence") {
    return (
      <div className="grid h-full grid-cols-[1.2fr_0.8fr] gap-3">
        <div className="grid gap-1.5">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="flex items-center gap-2 border bg-white px-2 py-1"
              style={{ borderColor: index === 0 ? row.borderColor : "#E1E7E3" }}
            >
              <span
                className="flex h-5 w-5 items-center justify-center text-[10px] font-semibold"
                style={{ backgroundColor: index === 0 ? row.softColor : "#F1F4F0", color: row.color }}
              >
                {index + 1}
              </span>
              <span className="h-1.5 flex-1 bg-[#D6DED9]" />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center border bg-[#F7F8F6]" style={{ borderColor: row.borderColor }}>
          <FileCheck2 className="h-6 w-6" style={{ color: row.color }} aria-hidden="true" />
        </div>
      </div>
    )
  }

  if (row.pattern === "loop") {
    return (
      <div className="relative flex h-full items-center justify-between">
        <span className="absolute left-6 right-6 top-1/2 h-px bg-[#BFD2C8]" aria-hidden="true" />
        {["scan", "hold", "route", "send"].map((label, index) => (
          <div
            key={label}
            className="relative z-10 flex h-10 w-10 items-center justify-center border bg-white text-[9px] font-semibold uppercase"
            style={{
              borderColor: row.activeModes.includes(index + 1) ? row.color : "#D3DDD7",
              color: row.activeModes.includes(index + 1) ? row.color : "#7B8780",
            }}
          >
            {index === 1 ? <span className="h-3 w-3 rounded-full" style={{ backgroundColor: row.color }} /> : label.slice(0, 2)}
          </div>
        ))}
      </div>
    )
  }

  if (row.pattern === "proof") {
    return (
      <div className="grid h-full grid-cols-[1fr_1fr_1.2fr] gap-2">
        {[0, 1].map((index) => (
          <div key={index} className="border bg-white p-1" style={{ borderColor: row.borderColor }}>
            <div className="h-full" style={{ backgroundColor: index === 0 ? row.softColor : "#F1F4F0" }} />
          </div>
        ))}
        <div className="relative border bg-white p-2" style={{ borderColor: row.color }}>
          <span className="absolute -left-1 top-2 h-4 w-2 border-y border-l" style={{ borderColor: row.color }} aria-hidden="true" />
          <span className="absolute -right-1 bottom-2 h-4 w-2 border-y border-r" style={{ borderColor: row.color }} aria-hidden="true" />
          <div className="h-full border border-dashed border-[#BFD2C8]" />
        </div>
      </div>
    )
  }

  return (
    <div className="grid h-full grid-cols-[1fr_1.4fr] gap-3">
      <div className="flex items-end gap-1.5">
        {[34, 54, 42, 68].map((height, index) => (
          <span
            key={height}
            className="w-full border"
            style={{
              height: `${height}%`,
              backgroundColor: index === 3 ? row.color : row.softColor,
              borderColor: index === 3 ? row.color : row.borderColor,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
      <svg viewBox="0 0 120 48" className="h-full w-full" aria-hidden="true">
        <path d="M4 36 C26 34 31 18 50 22 C70 26 72 10 92 12 C106 13 111 18 116 10" fill="none" stroke={row.color} strokeWidth="4" strokeLinecap="round" />
        <path d="M4 42 H116" stroke="#D6DED9" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}
