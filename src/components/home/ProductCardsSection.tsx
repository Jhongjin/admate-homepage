import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { products } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

const productDeskCopy: Record<
  string,
  {
    desk: string
    signal: string
    evidence: string
    decision: string
    handoff: string
    cadence: string
  }
> = {
  compass: {
    desk: "정책 근거",
    signal: "소재, 업종, 랜딩 조건이 정책 리스크를 만들 때",
    evidence: "매체별 정책 출처와 답변 근거",
    decision: "수정, 보류, 집행 가능 기준 확정",
    handoff: "Sentinel 검수 전 승인 기준으로 전달",
    cadence: "집행 전",
  },
  sentinel: {
    desk: "검수 관제",
    signal: "미디어믹스와 실제 세팅, 예산, KPI가 어긋날 때",
    evidence: "세팅 대조, 알림, 상태 이력",
    decision: "수정 요청, 보류, 재개, 에스컬레이션",
    handoff: "운영 로그와 Command Center 상태로 전달",
    cadence: "검수/집행 중",
  },
  lens: {
    desk: "보고 증빙",
    signal: "광고 게재 화면과 보고 캡처가 필요할 때",
    evidence: "모바일/데스크톱 캡처와 보존 이력",
    decision: "보고 확정, 재촬영, 광고주 공유",
    handoff: "보고 산출물과 증빙 이력으로 전달",
    cadence: "보고 전",
  },
  foresight: {
    desk: "계획 판단",
    signal: "예산 배분과 매체 믹스 선택지가 필요할 때",
    evidence: "과거 성과, 업종 기준, 시나리오",
    decision: "예산안, PoC 범위, 매체 믹스 확정",
    handoff: "Compass와 Sentinel의 선행 조건으로 전달",
    cadence: "기획 단계",
  },
}

const docketItems = [
  {
    label: "오늘 열어볼 신호",
    value: "정책 보류, 세팅 불일치, 보고 증빙 누락, 예산 선택지",
  },
  {
    label: "회의에서 필요한 근거",
    value: "출처, 대조표, 캡처 이력, 성과 기준선",
  },
  {
    label: "남겨야 할 결정",
    value: "집행 가능, 수정 요청, 공유 확정, PoC 착수",
  },
]

const doorwaySteps = [
  "신호 접수",
  "근거 확인",
  "담당 데스크 이동",
  "운영 기억 기록",
]

export function ProductCardsSection() {
  const core = products.find((product) => product.id === "agent-core")
  const productItems = products.filter((product) => product.id !== "agent-core")

  return (
    <section id="products" className="border-b border-[#C9D2CC] bg-[#F7F8F5] py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Operating doorway"
          title="제품 목록이 아니라 오늘의 운영 판단으로 들어갑니다"
          description="AdMate의 각 제품은 별도 기능 카탈로그가 아니라, 운영자가 회의 전에 확인해야 하는 신호와 근거를 맡는 데스크입니다. 이 구간은 어디로 들어가야 할지보다 어떤 결정을 남겨야 하는지를 먼저 보여줍니다."
        />

        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="border border-[#C9D2CC] bg-white">
            <div className="border-b border-[#C9D2CC] bg-[#101820] px-5 py-4 text-white">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B8C7BE]">
                Executive docket
              </div>
              <h3 className="mt-2 text-xl font-semibold leading-tight">
                승인, 수정, 공유, 투자 판단을 같은 장부에 올립니다.
              </h3>
            </div>

            <div className="divide-y divide-[#D5DED8]">
              {docketItems.map((item, index) => (
                <div key={item.label} className="grid grid-cols-[3rem_1fr] gap-3 px-5 py-4">
                  <div className="font-mono text-xs font-semibold text-[#2F5D50]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#101820]">{item.label}</div>
                    <p className="mt-1 text-sm leading-6 text-[#405149]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#C9D2CC] bg-[#F2F5F1] p-4">
              <div className="grid gap-2">
                {doorwaySteps.map((step, index) => (
                  <div key={step} className="flex items-center gap-2 text-xs font-semibold text-[#405149]">
                    <span className="flex h-6 w-6 items-center justify-center border border-[#B8C7BE] bg-white font-mono text-[10px] text-[#2F5D50]">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                    {index < doorwaySteps.length - 1 ? (
                      <span className="h-px flex-1 bg-[#D5DED8]" aria-hidden="true" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="border-y border-[#C9D2CC] bg-white">
            <div className="grid grid-cols-[0.85fr_1.2fr_1fr] border-b border-[#101820] bg-[#101820] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white max-md:hidden">
              <span>Desk</span>
              <span>Evidence lane</span>
              <span>Decision handoff</span>
            </div>

            <div className="divide-y divide-[#D5DED8]">
              {productItems.map((product) => {
                const copy = productDeskCopy[product.id]
                const Icon = product.icon

                return (
                  <article key={product.id} className="grid gap-0 md:grid-cols-[0.85fr_1.2fr_1fr]">
                    <div className="border-[#D5DED8] px-4 py-4 md:border-r">
                      <div className="flex items-start gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center border"
                          style={{
                            backgroundColor: product.softColor,
                            borderColor: product.borderColor,
                            color: product.color,
                          }}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#587067]">
                            {copy.cadence}
                          </div>
                          <h3 className="mt-1 text-lg font-semibold leading-tight text-[#101820]">
                            {product.shortName}
                          </h3>
                          <p className="mt-1 text-xs font-semibold" style={{ color: product.color }}>
                            {copy.desk}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 border-t border-[#D5DED8] px-4 py-4 md:border-r md:border-t-0">
                      <LedgerLine label="신호" value={copy.signal} color={product.color} />
                      <LedgerLine label="근거" value={copy.evidence} color={product.color} />
                    </div>

                    <div className="grid gap-3 border-t border-[#D5DED8] px-4 py-4 md:border-t-0">
                      <LedgerLine label="결정" value={copy.decision} color={product.color} />
                      <div className="rounded-md border border-[#D5DED8] bg-[#F7F8F5] px-3 py-2 text-xs leading-5 text-[#405149]">
                        {copy.handoff}
                      </div>
                      {product.href && !product.linkDisabled ? (
                        <Link
                          href={product.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-fit items-center gap-2 border border-[#C9D2CC] bg-white px-3 py-2 text-xs font-semibold text-[#101820] transition hover:bg-[#EEF3EF]"
                        >
                          {product.linkLabel ?? "제품 열기"}
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      ) : (
                        <span className="inline-flex w-fit items-center border border-[#F5CE8B] bg-[#FFF8EC] px-3 py-2 text-xs font-semibold text-[#9E5700]">
                          {product.linkLabel ?? "연결 예정"}
                        </span>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>

        {core ? (
          <div className="mt-5 grid gap-4 border border-[#B8C7BE] bg-[#EEF3EF] p-5 lg:grid-cols-[0.62fr_1fr] lg:items-center">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#587067]">
                Operating memory
              </div>
              <h3 className="mt-2 text-2xl font-semibold leading-tight text-[#101820]">
                {core.shortName}는 데스크별 결정을 다음 회의의 기준으로 보관합니다.
              </h3>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {core.features.slice(0, 4).map((feature, index) => (
                <div key={feature} className="grid grid-cols-[3rem_1fr] border border-[#D5DED8] bg-white px-3 py-3 text-sm font-medium text-[#101820]">
                  <span className="font-mono text-[10px] font-semibold text-[#587067]">
                    R-{String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-5">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

function LedgerLine({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: string
}) {
  return (
    <div className="grid gap-1 sm:grid-cols-[4.5rem_1fr] sm:items-start">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color }}>
        <span className="h-1.5 w-1.5" style={{ backgroundColor: color }} aria-hidden="true" />
        {label}
      </div>
      <div className="text-sm font-medium leading-6 text-[#101820]">{value}</div>
    </div>
  )
}
