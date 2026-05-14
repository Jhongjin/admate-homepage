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
  Waypoints,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const commandLanes: Array<{
  label: string
  product: string
  status: string
  icon: LucideIcon
}> = [
  { label: "예측", product: "Foresight", status: "입력 기준 정리", icon: Route },
  { label: "정책", product: "Compass", status: "근거 확인", icon: FileCheck2 },
  { label: "검수", product: "Sentinel", status: "세팅 보호", icon: ShieldCheck },
  { label: "감시", product: "Sentinel", status: "신호 추적", icon: Radar },
  { label: "증빙", product: "Lens", status: "캡처 준비", icon: Camera },
  { label: "학습", product: "Agent Core", status: "운영 기억 반영", icon: BrainCircuit },
]

const executiveSignals: Array<{ label: string; value: string; tone: "ok" | "watch" | "hold" }> = [
  { label: "캠페인 리스크", value: "보호 중", tone: "ok" },
  { label: "증빙 흐름", value: "준비됨", tone: "ok" },
  { label: "AI 비용 상태", value: "추적 중", tone: "watch" },
  { label: "열린 판단", value: "정리 중", tone: "hold" },
]

const operatingNotes = [
  "정책 근거와 매체 세팅을 한 흐름에서 확인",
  "운영 중 이상 신호를 의사결정 항목으로 승격",
  "캡처 증빙과 운영 피드백을 다음 캠페인 지식으로 보존",
]

export function HeroSection() {
  return (
    <section id="top" className="relative isolate overflow-hidden border-b border-[#C9D2CC] bg-[#EEF1EE]">
      <div className="absolute inset-0 command-grid" aria-hidden="true" />
      <div className="section-shell relative grid min-h-[calc(100svh-56px)] items-center gap-8 py-10 lg:grid-cols-[0.82fr_1.18fr] lg:py-12">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-[#18241E]/15 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#405149] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#2F7D50]" aria-hidden="true" />
            Nasmedia Advertising Operations
          </div>

          <h1 className="text-balance text-5xl font-semibold tracking-normal text-[#101820] sm:text-6xl lg:text-7xl">
            AdMate
            <span className="mt-3 block text-2xl font-semibold leading-tight text-[#405149] sm:text-3xl lg:text-4xl">
              캠페인 운영을 보는 의사결정 보드
            </span>
          </h1>

          <p className="mt-6 max-w-[680px] text-balance text-lg font-medium leading-8 text-[#27362F] sm:text-xl">
            정책 확인, 세팅 검수, 라이브 모니터링, 증빙 캡처, 운영 학습을
            설명서가 아니라 같은 상황판 위의 판단 항목으로 정리합니다.
          </p>

          <div className="mt-7 grid gap-2 text-sm font-medium text-[#405149]">
            {operatingNotes.map((note) => (
              <div key={note} className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#2F7D50]" aria-hidden="true" />
                <span>{note}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-[#101820] text-white hover:bg-[#25322B]">
              <Link href="#platform">
                운영 상황판 보기
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-[#B9C5BE] bg-white text-[#101820] hover:bg-[#F7F8F6]">
              <Link href="#products">
                제품 역할 확인
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: "리스크 우선순위", icon: ShieldCheck },
              { label: "증빙 준비 상태", icon: Camera },
              { label: "운영 지식 보존", icon: BrainCircuit },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-md border border-[#C9D2CC] bg-white px-3 py-2 text-sm font-semibold text-[#27362F] shadow-sm"
              >
                <item.icon className="h-4 w-4 text-[#5B6B62]" aria-hidden="true" />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <ExecutiveCommandBoard />
      </div>
    </section>
  )
}

function ExecutiveCommandBoard() {
  return (
    <div className="relative min-w-0">
      <div className="absolute inset-x-8 -bottom-4 h-8 border-x border-b border-[#101820]/10" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-lg border border-[#101820] bg-[#F8FAF7] shadow-[0_24px_70px_rgba(16,24,32,0.18)]">
        <div className="border-b border-[#D3DDD7] bg-[#101820] px-4 py-3 text-white">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                AdMate 운영 상황판
              </div>
              <div className="mt-1 text-lg font-semibold">캠페인 운영 판단 상태</div>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-md border border-[#9FE5C1]/30 bg-[#2F7D50]/20 px-3 py-2 text-xs font-semibold text-[#DDF7E9]">
              <span className="h-2 w-2 rounded-full bg-[#63D793]" aria-hidden="true" />
              판단 흐름 정렬
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="min-w-0 border-b border-[#D3DDD7] p-4 lg:border-b-0 lg:border-r">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5B6B62]">
                  운영 판단 흐름
                </div>
                <div className="mt-1 text-sm font-semibold text-[#101820]">
                  예측에서 학습까지 이어지는 캠페인 운영 루프
                </div>
              </div>
              <Network className="h-5 w-5 text-[#5B6B62]" aria-hidden="true" />
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {commandLanes.map((lane, index) => (
                <CommandLane key={lane.label} index={index} lane={lane} />
              ))}
            </div>
          </div>

          <div className="min-w-0 bg-white p-4">
            <div className="grid gap-3">
              <div className="rounded-md border border-[#C9D2CC] bg-[#F6F8F5] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5B6B62]">
                      오늘 확인할 판단
                    </div>
                    <div className="mt-3 text-2xl font-semibold text-[#101820]">검토 대기</div>
                  </div>
                  <Clock3 className="h-5 w-5 text-[#9E5700]" aria-hidden="true" />
                </div>
                <div className="mt-3 grid gap-2">
                  {["세팅 검수 승인", "예산 이상 확인", "보고 증빙 확정"].map((item) => (
                    <div key={item} className="flex items-center justify-between gap-3 border-t border-[#DDE4E0] pt-2 text-xs font-semibold">
                      <span className="text-[#405149]">{item}</span>
                      <span className="text-[#101820]">담당 확인</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {executiveSignals.map((signal) => (
                  <div key={signal.label} className="rounded-md border border-[#C9D2CC] bg-[#FBFCFA] p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-[#5B6B62]">{signal.label}</span>
                      <span className={`command-signal-dot ${signal.tone}`} aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-sm font-semibold text-[#101820]">{signal.value}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-md border border-[#101820] bg-[#101820] p-4 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                  <Waypoints className="h-4 w-4" aria-hidden="true" />
                  운영 원칙
                </div>
                <p className="mt-3 text-sm font-medium leading-6 text-white/80">
                  각 제품은 기능 묶음이 아니라 의사결정 단계입니다. AdMate는 캠페인 운영자가
                  지금 봐야 할 위험, 근거, 증빙, 다음 액션을 한 화면에 올립니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CommandLane({
  index,
  lane,
}: {
  index: number
  lane: {
    label: string
    product: string
    status: string
    icon: LucideIcon
  }
}) {
  return (
    <div className="command-lane relative min-h-[112px] rounded-md border border-[#C9D2CC] bg-white p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#C9D2CC] bg-[#EEF1EE] text-[#101820]">
          <lane.icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <span className="text-[11px] font-semibold text-[#7B8780]">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="mt-4 text-sm font-semibold text-[#101820]">{lane.label}</div>
      <div className="mt-1 text-xs font-medium text-[#5B6B62]">{lane.product}</div>
      <div className="mt-3 border-t border-[#E1E7E3] pt-2 text-[11px] font-semibold text-[#2F7D50]">
        {lane.status}
      </div>
    </div>
  )
}
