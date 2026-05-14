import Link from "next/link"
import {
  ArrowDownRight,
  ArrowRight,
  BrainCircuit,
  Camera,
  CheckCircle2,
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

const portfolioRows: Array<{
  product: string
  role: string
  status: string
  signal: string
  icon: LucideIcon
  color: string
  softColor: string
  borderColor: string
  activeModes: number[]
}> = [
  {
    product: "Compass",
    role: "Policy intelligence",
    status: "근거 확인",
    signal: "정책 판단",
    icon: FileCheck2,
    color: "#1F6F8B",
    softColor: "#EAF4F7",
    borderColor: "#B9D8E2",
    activeModes: [1],
  },
  {
    product: "Sentinel",
    role: "Validation and monitoring",
    status: "신호 감시",
    signal: "리스크 보호",
    icon: Radar,
    color: "#177D4E",
    softColor: "#EFFAF4",
    borderColor: "#9FE5C1",
    activeModes: [2, 3],
  },
  {
    product: "Lens",
    role: "Capture evidence",
    status: "증빙 대기",
    signal: "보고 준비",
    icon: Camera,
    color: "#2B6D67",
    softColor: "#E8F4F1",
    borderColor: "#B9D8D3",
    activeModes: [4],
  },
  {
    product: "Foresight",
    role: "Planning forecast",
    status: "기준 정리",
    signal: "다음 기획",
    icon: LineChart,
    color: "#B45309",
    softColor: "#FFF8EC",
    borderColor: "#F5CE8B",
    activeModes: [0],
  },
]

const executiveLedger = [
  { label: "이번 운영 초점", value: "검수, 모니터링, 증빙 흐름 정렬" },
  { label: "열린 판단", value: "세팅 검수 승인, 예산 이상 확인" },
  { label: "기록 기준", value: "정책 근거, 운영 이력, 학습 피드백" },
]

const operatingNotes = [
  "캠페인 운영 판단 순서로 읽히는 포트폴리오 입구",
  "Compass, Sentinel, Lens, Foresight가 각자의 신호와 책임을 유지",
  "Agent Core가 실행, 기록, 비용, 학습 기준을 하나의 운영 기억으로 연결",
]

export function HeroSection() {
  return (
    <section id="top" className="relative isolate overflow-hidden border-b border-[#BAC5BE] bg-[#ECEFEA]">
      <div className="absolute inset-0 command-grid opacity-75" aria-hidden="true" />
      <div className="section-shell relative grid min-h-[calc(100svh-56px)] gap-8 py-8 lg:grid-cols-[148px_minmax(0,1fr)] lg:py-10">
        <CommandRail />

        <div className="grid min-w-0 gap-5">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(420px,1fr)] lg:items-stretch">
            <HeroEditorial />
            <OperationsWall />
          </div>

          <div className="grid gap-3 border-y border-[#BAC5BE] bg-[#F7F8F6]/82 px-3 py-3 sm:grid-cols-3">
            {operatingNotes.map((note) => (
              <div key={note} className="flex items-start gap-2 text-xs font-semibold leading-5 text-[#405149]">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#177D4E]" aria-hidden="true" />
                <span>{note}</span>
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
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#66756D]">
          Command
        </div>
        <div className="mt-1 text-sm font-semibold text-[#101820]">Center</div>
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
    <div className="flex min-w-0 flex-col justify-between border-y border-[#BAC5BE] py-6 lg:border-y-0 lg:py-0">
      <div>
        <div className="mb-5 inline-flex items-center gap-2 border border-[#BAC5BE] bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#405149]">
          <Gauge className="h-3.5 w-3.5" aria-hidden="true" />
          Nasmedia Advertising Operations
        </div>

        <h1 className="max-w-[760px] text-balance text-6xl font-semibold leading-[0.95] tracking-normal text-[#101820] sm:text-7xl lg:text-[96px]">
          AdMate
        </h1>
        <p className="mt-5 max-w-[700px] text-balance text-2xl font-semibold leading-tight text-[#27362F] sm:text-3xl">
          광고 운영의 진행 상황, 위험, 증빙, 다음 판단을 한 화면에 올리는 Command Center.
        </p>
        <p className="mt-5 max-w-[660px] text-base font-medium leading-8 text-[#405149]">
          기획부터 운영, 검수, 캡처, 학습까지 흩어진 업무를 임원이 바로 읽을 수 있는 운영 보드와
          제품 포트폴리오로 정리합니다.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="bg-[#101820] text-white hover:bg-[#25322B]">
          <Link href="#platform">
            운영 보드 보기
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-[#AEBAB2] bg-white text-[#101820] hover:bg-[#F7F8F6]">
          <Link href="#products">
            제품군 구조 확인
            <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
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
            Executive operating board
          </div>
          <div className="mt-1 text-lg font-semibold">제품군 진행과 운영 판단</div>
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
          <div className="grid grid-cols-6 border-b border-[#D3DDD7] bg-white">
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
            {["정책 근거", "운영 이력", "학습 피드백"].map((item) => (
              <div key={item} className="border-b border-[#D3DDD7] px-4 py-3 text-xs font-semibold text-[#405149] last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                {item}
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
                <BrainCircuit className="h-5 w-5" aria-hidden="true" />
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
            <p className="mt-3 text-sm font-medium leading-6 text-white/78">
              각 제품은 같은 모양의 카드가 아니라 다른 판단 신호입니다. AdMate는 신호를 모아
              다음 액션의 우선순위를 보여줍니다.
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
    <div className="grid gap-0 bg-[#FBFCFA] sm:grid-cols-[150px_minmax(0,1fr)_140px]">
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

      <div className="grid min-h-[72px] grid-cols-6">
        {commandModes.map((mode, modeIndex) => {
          const active = row.activeModes.includes(modeIndex)
          return (
            <div key={`${row.product}-${mode}`} className="relative border-r border-[#E1E7E3] last:border-r-0">
              {active ? (
                <span
                  className="absolute inset-x-2 top-1/2 h-2 -translate-y-1/2"
                  style={{ backgroundColor: row.color }}
                  aria-hidden="true"
                />
              ) : (
                <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C8D1CB]" aria-hidden="true" />
              )}
            </div>
          )
        })}
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
