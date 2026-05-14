import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"

import { SectionHeading } from "./SectionHeading"

const roadmapStages = [
  {
    title: "운영판 기준 확정",
    subtitle: "제품 구조와 Agent Core 상태 기준을 경영 운영판의 공통 언어로 맞춥니다.",
    phase: "Phase 1-2",
    signal: "데스크 역할과 모니터링 기준",
    decision: "홈페이지와 Command Center가 같은 제품 상태를 말하는가",
    items: [
      "Compass / Sentinel / Lens / Foresight 데스크 책임 정리",
      "Agent Core 기반 상태 기록 안정화",
    ],
  },
  {
    title: "운영 데스크 제품화",
    subtitle: "정책, 검수, 증빙, 예산 판단을 실제 업무 안에서 반복 가능한 리듬으로 연결합니다.",
    phase: "Phase 3-5",
    signal: "운영자가 매주 확인하는 승인/수정/공유 안건",
    decision: "각 데스크가 다음 회의에 올릴 근거를 남기는가",
    items: [
      "UI/UX 정렬과 데스크별 Tool API 전환",
      "Foresight PoC와 예산 판단 데이터 기준 정리",
      "비용/기술 인텔리전스 운영 체계 구축",
    ],
  },
  {
    title: "포트폴리오 투자 판단",
    subtitle: "운영 데이터에서 반복 문제와 신규 솔루션 기회를 찾아 PoC 투자 안건으로 올립니다.",
    phase: "Phase 6",
    signal: "반복 리스크, 비용 흐름, 시장 요구",
    decision: "어떤 PoC를 제품화 검토로 넘길 것인가",
    items: [
      "신규 솔루션 기회 탐색 루프 확장",
      "PoC 후보를 제품화 검토로 연결",
    ],
  },
]

const roadmapFlow = ["기준 확정", "상태 기록", "데스크 제품화", "운영 리듬", "투자 안건"]

export function RoadmapSection() {
  return (
    <section id="roadmap" className="border-b border-border bg-[#FBFBFB] py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Decision Roadmap"
          title="로드맵은 기능 출시표가 아니라 운영 회의의 안건 흐름입니다"
          description="AdMate의 다음 단계는 무엇을 더 만들지보다 어떤 신호를 기준으로 승인, 수정, 투자 판단을 내릴지 정리하는 일입니다."
        />

        <div className="overflow-hidden border-y border-[#C9D2CC] bg-white">
          {roadmapStages.map((stage, index) => (
            <div
              key={stage.title}
              className="grid gap-0 border-b border-[#D5DDD8] last:border-b-0 lg:grid-cols-[180px_minmax(0,0.8fr)_minmax(0,1.2fr)]"
            >
              <div className="border-b border-[#D5DDD8] bg-[#F6F8F5] p-4 lg:border-b-0 lg:border-r">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#587067]">
                  Gate 0{index + 1}
                </div>
                <Badge variant="outline" className="mt-3 border-[#B8C7BE] bg-white text-[#2F5D50]">
                  {stage.phase}
                </Badge>
              </div>
              <div className="border-b border-[#D5DDD8] p-4 lg:border-b-0 lg:border-r">
                <h3 className="text-lg font-semibold text-[#101820]">{stage.title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-[#405149]">{stage.subtitle}</p>
              </div>
              <div className="grid gap-0 p-4 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
                <div className="border-b border-[#E1E7E3] pb-3 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#587067]">
                    Operating signal
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#101820]">{stage.signal}</p>
                  <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#587067]">
                    Decision
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#405149]">{stage.decision}</p>
                </div>
                <div className="pt-3 sm:pl-4 sm:pt-0">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#587067]">
                    Proof ledger
                  </div>
                  <div className="mt-3 grid gap-2">
                    {stage.items.map((item, itemIndex) => (
                      <div key={item} className="grid grid-cols-[3.25rem_1fr] rounded-md border border-[#D5DDD8] bg-[#F8FAF7] px-2.5 py-2 text-sm">
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#587067]">
                          P-{String(itemIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="leading-6 text-[#405149]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-y border-[#C9D2CC] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Progress path
              </div>
              <p className="mt-2 text-sm font-medium text-foreground">
                앞 섹션의 제품·운영 체계가 어떤 순서로 현실화되는지 요약합니다.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
              {roadmapFlow.map((item, index) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="rounded-md border border-border bg-muted px-3 py-2 text-foreground">
                    {item}
                  </span>
                  {index < roadmapFlow.length - 1 ? (
                    <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
