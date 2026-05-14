import { ArrowRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { operations } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

const operationMeta = [
  {
    step: "01",
    label: "비용 신호",
    boardTitle: "비용 집행 회의",
    role: "비용 구조",
    horizon: "상시",
    workflow: "LLM과 AI API 사용량을 운영 단위로 모아 비용 흐름을 확인하고, 확장 가능한 업무 흐름과 조정이 필요한 흐름을 구분합니다.",
    proof: "플랫폼·모델·업무흐름별 사용량",
    decision: "확대, 제한, 대체 모델 선택",
    accent: "#2F5D50",
    tint: "#EFF6F2",
    border: "#B8C7BE",
  },
  {
    step: "02",
    label: "변화 신호",
    boardTitle: "변화 반영 회의",
    role: "기술 변화",
    horizon: "매주",
    workflow: "매주 들어오는 AI·MarTech·매체 변화를 운영 후보로 정리하고, 제품에 반영할 항목과 보류할 항목을 나눕니다.",
    proof: "AI·MarTech·매체 업데이트 브리프",
    decision: "제품 개선 후보와 실험 우선순위",
    accent: "#7A5A12",
    tint: "#FFF8EC",
    border: "#F5CE8B",
  },
  {
    step: "03",
    label: "기회 신호",
    boardTitle: "PoC 투자 회의",
    role: "사업 기회",
    horizon: "장기",
    workflow: "반복되는 내부 업무 문제와 시장 요구를 묶어 신규 솔루션 후보를 만들고, PoC로 검증할 범위를 좁힙니다.",
    proof: "내부 업무 데이터와 시장 문제 패턴",
    decision: "신규 솔루션 PoC 착수 여부",
    accent: "#1F6F8B",
    tint: "#EAF4F7",
    border: "#B9D8E2",
  },
]

const operationLoop = ["비용 근거 확인", "변화 브리프 반영", "PoC 판단"]

export function OperationsSection() {
  return (
    <section id="operations" className="border-b border-[#C9D2CC] bg-[#F6F8F5] py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Executive Rhythm"
          title="운영 신호가 다음 투자 회의의 안건이 됩니다"
          description="AdMate는 도구 목록보다 운영 판단에 필요한 신호를 먼저 봅니다. 비용 구조, 기술 변화, 시장 기회를 같은 리듬으로 검토해 다음 투자와 PoC 결정을 빠르게 좁힙니다."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {operations.map((operation, index) => (
            <Card
              key={operation.title}
              className="h-full border-[#D2DBD5] bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-soft"
            >
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-lg border"
                    style={{
                      backgroundColor: operationMeta[index].tint,
                      borderColor: operationMeta[index].border,
                      color: operationMeta[index].accent,
                    }}
                  >
                    <operation.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span
                      className="rounded-md border px-2 py-1 text-[11px] font-semibold"
                      style={{
                        backgroundColor: operationMeta[index].tint,
                        borderColor: operationMeta[index].border,
                        color: operationMeta[index].accent,
                      }}
                    >
                      {operationMeta[index].step} · {operationMeta[index].label}
                    </span>
                    <span className="rounded-md border border-border bg-card px-2 py-1 text-[11px] font-semibold text-foreground">
                      {operationMeta[index].horizon}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold">{operationMeta[index].boardTitle}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-sm font-semibold" style={{ color: operationMeta[index].accent }}>
                    {operationMeta[index].role}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {operation.title}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{operationMeta[index].workflow}</p>
                <div className="mt-auto grid gap-3 rounded-lg border border-border bg-muted/25 p-3">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      판단 근거
                    </div>
                    <p className="mt-1 text-sm font-medium leading-6 text-foreground">
                      {operationMeta[index].proof}
                    </p>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      다음 조치
                    </div>
                    <p className="mt-1 text-sm font-medium leading-6 text-foreground">
                      {operationMeta[index].decision}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 border-y border-[#C9D2CC] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                운영 리듬
              </div>
              <p className="mt-2 text-sm font-medium text-foreground">
                운영 신호가 누적되면 비용 통제, 제품 개선, 신규 PoC 판단이 같은 회의체에서 이어집니다.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#2F5D50]">
              {operationLoop.map((item, index) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="rounded-md border border-border bg-muted px-3 py-2 text-foreground">
                    {item}
                  </span>
                  {index < operationLoop.length - 1 ? (
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
