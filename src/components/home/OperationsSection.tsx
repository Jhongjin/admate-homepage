import { ArrowRight } from "lucide-react"

import { operations } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

const operationMeta = [
  {
    step: "01",
    docket: "Cost posture",
    meeting: "비용 집행 회의",
    cadence: "상시",
    signal: "LLM과 AI API 사용량이 제품·업무흐름별로 쌓입니다.",
    evidence: "플랫폼, 모델, 기능 단위 사용량과 비용 흐름",
    decision: "확대, 제한, 대체 모델 선택",
    owner: "운영/재무",
    accent: "#2F5D50",
    tint: "#EFF6F2",
    border: "#B8C7BE",
  },
  {
    step: "02",
    docket: "Change intake",
    meeting: "변화 반영 회의",
    cadence: "매주",
    signal: "AI, MarTech, 매체 업데이트가 새 운영 후보로 들어옵니다.",
    evidence: "업데이트 브리프와 제품 적용 가능성",
    decision: "개선 후보, 실험 순서, 보류 항목",
    owner: "제품/기술",
    accent: "#7A5A12",
    tint: "#FFF8EC",
    border: "#F5CE8B",
  },
  {
    step: "03",
    docket: "Opportunity queue",
    meeting: "PoC 투자 회의",
    cadence: "장기",
    signal: "반복 업무 문제와 시장 요구가 신규 솔루션 후보로 모입니다.",
    evidence: "내부 업무 데이터와 시장 문제 패턴",
    decision: "PoC 착수, 대기, 폐기",
    owner: "사업/전략",
    accent: "#1F6F8B",
    tint: "#EAF4F7",
    border: "#B9D8E2",
  },
]

const meetingSequence = ["비용 확인", "변화 반영", "PoC 판단", "Command Center 기록"]

export function OperationsSection() {
  return (
    <section id="operations" className="border-b border-[#C9D2CC] bg-[#F1F4F0] py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Executive rhythm"
          title="운영 신호는 회의 안건으로 정리되고, 다음 투자 판단으로 넘어갑니다"
          description="이 구간은 기능 설명이 아니라 경영진이 반복적으로 보는 운영 리듬입니다. 비용, 변화, 기회를 같은 형식으로 접수해 확대할 것과 멈출 것을 빠르게 나눕니다."
        />

        <div className="border-y border-[#101820] bg-white">
          <div className="grid grid-cols-[0.64fr_1.1fr_1fr_0.72fr] bg-[#101820] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white max-lg:hidden">
            <span>Docket</span>
            <span>Signal and evidence</span>
            <span>Decision</span>
            <span>Owner</span>
          </div>

          <div className="divide-y divide-[#D5DED8]">
            {operations.map((operation, index) => {
              const meta = operationMeta[index]
              const Icon = operation.icon

              return (
                <article key={operation.title} className="grid gap-0 lg:grid-cols-[0.64fr_1.1fr_1fr_0.72fr]">
                  <div className="border-[#D5DED8] px-4 py-5 lg:border-r">
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center border"
                        style={{
                          backgroundColor: meta.tint,
                          borderColor: meta.border,
                          color: meta.accent,
                        }}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="font-mono text-xs font-semibold" style={{ color: meta.accent }}>
                          {meta.step}
                        </div>
                        <h3 className="mt-1 text-lg font-semibold leading-tight text-[#101820]">{meta.meeting}</h3>
                        <div className="mt-2 text-xs font-semibold text-[#587067]">{meta.docket}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 border-t border-[#D5DED8] px-4 py-5 lg:border-r lg:border-t-0">
                    <DocketCell label="신호" value={meta.signal} color={meta.accent} />
                    <DocketCell label="근거" value={meta.evidence} color={meta.accent} />
                  </div>

                  <div className="grid content-start gap-3 border-t border-[#D5DED8] px-4 py-5 lg:border-r lg:border-t-0">
                    <DocketCell label="다음 조치" value={meta.decision} color={meta.accent} />
                    <p className="text-xs leading-5 text-[#5B6B62]">{operation.description}</p>
                  </div>

                  <div className="grid content-start gap-2 border-t border-[#D5DED8] px-4 py-5 lg:border-t-0">
                    <span className="w-fit border px-2.5 py-1 text-xs font-semibold" style={{
                      backgroundColor: meta.tint,
                      borderColor: meta.border,
                      color: meta.accent,
                    }}>
                      {meta.cadence}
                    </span>
                    <div className="text-sm font-semibold text-[#101820]">{meta.owner}</div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div className="mt-5 border border-[#C9D2CC] bg-white p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#587067]">
                Operating sequence
              </div>
              <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#405149]">
                안건은 제품별 작업으로 흩어지지 않고, Command Center에 남길 운영 판단으로 모입니다.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#101820]">
              {meetingSequence.map((item, index) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="border border-[#D5DED8] bg-[#F7F8F5] px-3 py-2">{item}</span>
                  {index < meetingSequence.length - 1 ? (
                    <ArrowRight className="h-4 w-4 text-[#587067]" aria-hidden="true" />
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

function DocketCell({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: string
}) {
  return (
    <div className="grid gap-1 sm:grid-cols-[4.75rem_1fr] sm:items-start">
      <div className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color }}>
        {label}
      </div>
      <div className="text-sm font-medium leading-6 text-[#101820]">{value}</div>
    </div>
  )
}
