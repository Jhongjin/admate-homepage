import { ArrowRight, GitBranch, History, ShieldCheck } from "lucide-react"

import { corePillars } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

const ledgerFlow = [
  {
    code: "01",
    label: "Desk signal",
    value: "Compass, Sentinel, Lens, Foresight에서 운영 신호가 들어옵니다.",
  },
  {
    code: "02",
    label: "Decision record",
    value: "승인, 수정, 공유, 투자 판단을 감사 가능한 기록으로 남깁니다.",
  },
  {
    code: "03",
    label: "Memory return",
    value: "운영자 피드백과 예외 기준을 다음 캠페인의 기준 후보로 돌려보냅니다.",
  },
]

const engineCopy: Record<string, { role: string; record: string; boundary: string }> = {
  Openclaw: {
    role: "실행과 외부 시스템 연결",
    record: "검수, 알림, Slack action, workflow 실행 이력을 남깁니다.",
    boundary: "실행은 조건과 승인 기준 안에서만 움직입니다.",
  },
  Hermes: {
    role: "판단 기준과 기억",
    record: "정책 근거, 예외 판단, 운영자 피드백을 지식 후보로 정리합니다.",
    boundary: "반복 판단은 검토와 승인 이후에만 기준으로 올라갑니다.",
  },
}

const controlRows = [
  {
    label: "Audit-ready",
    value: "누가, 언제, 어떤 근거로 판단했는지 남깁니다.",
    icon: History,
  },
  {
    label: "Human-approved",
    value: "비용·위험이 큰 작업은 운영자 승인 기준을 먼저 통과합니다.",
    icon: ShieldCheck,
  },
  {
    label: "Knowledge-backed",
    value: "예외와 피드백은 다음 운영 기준 후보로 연결됩니다.",
    icon: GitBranch,
  },
]

export function AgentCoreSection() {
  return (
    <section id="agent-core" className="border-b border-[#C9D2CC] bg-[#F7F8F5] py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Decision memory"
          title={
            <>
              <span className="block">Agent Core는 제품 데스크의 판단을</span>
              <span className="block">다음 운영 회의의 기억으로 바꿉니다</span>
            </>
          }
          description={
            <>
              <span className="block">
                Core는 기능을 과시하는 엔진이 아니라, 승인과 수정과 공유 판단을 다시 꺼내는 운영 장부입니다.
              </span>
              <span className="block">
                자동화는 실행을 돕고, 기억은 다음 판단을 더 짧고 정확하게 만듭니다.
              </span>
            </>
          }
        />

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border border-[#101820] bg-[#101820] text-white">
            <div className="border-b border-white/15 px-5 py-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B8C7BE]">
                Core ledger
              </div>
              <h3 className="mt-3 text-3xl font-semibold leading-tight">
                운영 판단을 흘려보내지 않고, 다시 꺼낼 수 있는 기준으로 묶습니다.
              </h3>
              <p className="mt-5 text-sm leading-7 text-[#C9D2CC]">
                정책 근거, 세팅 리스크, 증빙 이력, 예산 판단은 같은 장부 형식으로 남아 Command Center와
                후속 제품 판단의 입력이 됩니다.
              </p>
            </div>

            <div className="divide-y divide-white/15">
              {ledgerFlow.map((item) => (
                <div key={item.code} className="grid grid-cols-[3.5rem_1fr] gap-3 px-5 py-4">
                  <div className="font-mono text-xs font-semibold text-[#8FD5B0]">{item.code}</div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#B8C7BE]">
                      {item.label}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              {corePillars.map((pillar) => {
                const Icon = pillar.icon
                const copy = engineCopy[pillar.title]

                return (
                  <article key={pillar.title} className="border border-[#C9D2CC] bg-white">
                    <div className="border-b border-[#D5DED8] px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center border border-[#B8C7BE] bg-[#EEF3EF] text-[#2F5D50]">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#587067]">
                            {pillar.subtitle}
                          </div>
                          <h3 className="mt-1 text-lg font-semibold text-[#101820]">{pillar.title}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-3 px-5 py-4">
                      <CoreRow label="역할" value={copy.role} />
                      <CoreRow label="기록" value={copy.record} />
                      <CoreRow label="경계" value={copy.boundary} />
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="border border-[#C9D2CC] bg-white">
              <div className="grid gap-0 lg:grid-cols-3">
                {controlRows.map((row, index) => {
                  const Icon = row.icon

                  return (
                    <div key={row.label} className="border-b border-[#D5DED8] p-4 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
                      <div className="flex items-center justify-between gap-3">
                        <Icon className="h-4 w-4 text-[#2F5D50]" aria-hidden="true" />
                        <span className="font-mono text-[10px] font-semibold text-[#587067]">
                          C-{String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="mt-3 text-sm font-semibold text-[#101820]">{row.label}</div>
                      <p className="mt-2 text-xs leading-5 text-[#5B6B62]">{row.value}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="border border-[#C9D2CC] bg-[#EEF3EF] p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#587067]">
                    Operating loop
                  </div>
                  <p className="mt-2 text-sm font-medium leading-6 text-[#405149]">
                    데스크 신호는 기록으로 남고, 기록은 다음 안건과 기준 후보로 돌아갑니다.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#101820]">
                  {["신호", "기록", "기준", "안건"].map((item, index) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="border border-[#D5DED8] bg-white px-3 py-2">{item}</span>
                      {index < 3 ? <ArrowRight className="h-4 w-4 text-[#587067]" aria-hidden="true" /> : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CoreRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[3.5rem_1fr]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#587067]">
        {label}
      </div>
      <div className="text-sm font-medium leading-6 text-[#101820]">{value}</div>
    </div>
  )
}
