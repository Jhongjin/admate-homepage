import Link from "next/link"
import { BrainCircuit } from "lucide-react"

import { Card } from "@/components/ui/card"
import { products } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

const productRoles: Record<string, string[]> = {
  compass: ["Evidence desk", "Policy gate"],
  sentinel: ["Control loop", "Risk watch"],
  lens: ["Proof desk", "Report trail"],
  foresight: ["Forecast desk", "Budget call"],
}

const productConnections: Record<string, string> = {
  compass: "정책 근거와 승인 기준을 다음 검수 판단으로 전달",
  sentinel: "세팅 검수와 이상 신호를 수정/알림 이력으로 전달",
  lens: "캡처 증빙과 보고 산출물을 캠페인 기록으로 전달",
  foresight: "성과 기대치와 예산 기준을 다음 기획 안건으로 전달",
}

const coreCapabilities = [
  { label: "Route", value: "데스크 신호 배치" },
  { label: "Record", value: "판단 근거 보존" },
  { label: "Recall", value: "예외 기준 재사용" },
  { label: "Refine", value: "피드백 반영" },
]

const routingLedger = [
  { label: "Desk signal", value: "근거 · 리스크 · 증빙 · 예산" },
  { label: "Core memory", value: "판단 근거와 예외 기준" },
  { label: "Board action", value: "승인 · 수정 · 공유 · 투자" },
]

export function EcosystemSection() {
  const core = products.find((product) => product.id === "agent-core")
  const productItems = products.filter((product) => product.id !== "agent-core")

  return (
    <section id="ecosystem" className="border-b border-border bg-[#FBFBFB] py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Operating Memory"
          title="제품 데스크의 판단이 포트폴리오 기억으로 남습니다"
          description={
            <>
              <span className="block">
                AdMate는 정책, 검수, 캡처, 예측 화면을 나열하지 않고 캠페인 판단이 흐르는 경로로 묶습니다.
              </span>
              <span className="block">
                각 데스크에서 나온 근거, 리스크, 증빙, 예산 판단은 Agent Core를 통해 다음 운영 회의의 기억이 됩니다.
              </span>
            </>
          }
        />

        <div className="mb-6 grid border-y border-[#D2DBD5] bg-white sm:grid-cols-3">
          {routingLedger.map((item) => (
            <div key={item.label} className="border-b border-[#D2DBD5] px-4 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#587067]">
                {item.label}
              </div>
              <div className="mt-1 text-sm font-semibold leading-6 text-[#101820]">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="relative grid gap-4 lg:grid-cols-[1fr_0.68fr_1fr] lg:items-stretch">
          <div className="grid gap-4">
            {productItems.slice(0, 2).map((product) => (
              <EcosystemProduct key={product.id} product={product} />
            ))}
          </div>

          <Card className="relative flex min-h-[280px] flex-col justify-center overflow-visible border-[#B8C7BE] bg-[#F6F8F7] p-6 text-[#101820] shadow-soft">
            <CoreConnector className="-left-4 top-[29%]" />
            <CoreConnector className="-left-4 top-[71%]" />
            <CoreConnector className="-right-4 top-[29%]" reverse />
            <CoreConnector className="-right-4 top-[71%]" reverse />
            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-[#B8C7BE] bg-white text-[#2F5D50]">
                <BrainCircuit className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#587067]">
                Portfolio router
              </div>
              <h3 className="mt-2 text-2xl font-semibold">{core?.name}</h3>
              <p className="mt-3 text-sm leading-6 text-[#405149]">
                제품별 데스크에서 나온 신호를 회의 안건, 기록, 다음 판단으로 배치하는 운영 기억 계층입니다.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {coreCapabilities.map((capability) => (
                  <div
                    key={capability.label}
                    className="rounded-md border border-[#D5DED8] bg-white px-3 py-2"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#587067]">
                      {capability.label}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-[#101820]">{capability.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-1.5 rounded-md border border-[#D5DED8] bg-white px-2 py-2 text-[11px] font-semibold text-[#405149]">
                <span className="whitespace-nowrap">데스크 신호</span>
                <span className="text-[#2F5D50]" aria-hidden="true">→</span>
                <span className="whitespace-nowrap">Agent Core</span>
                <span className="text-[#2F5D50]" aria-hidden="true">→</span>
                <span className="whitespace-nowrap">다음 회의 안건</span>
              </div>
            </div>
          </Card>

          <div className="grid gap-4">
            {productItems.slice(2, 4).map((product) => (
              <EcosystemProduct key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CoreConnector({ className, reverse = false }: { className: string; reverse?: boolean }) {
  return (
    <span
      className={`absolute hidden h-px w-4 bg-[#2F5D50]/45 lg:block ${className}`}
      aria-hidden="true"
    >
      <span
        className={`absolute -top-1 h-2 w-2 animate-pulse rounded-full bg-[#2F5D50] shadow-[0_0_14px_rgba(47,93,80,0.45)] ${
          reverse ? "right-0" : "left-0"
        }`}
      />
    </span>
  )
}

function EcosystemProduct({ product }: { product: (typeof products)[number] }) {
  const Icon = product.icon
  const roles = productRoles[product.id] ?? [product.shortName]
  const connection = productConnections[product.id] ?? product.tagline

  return (
    <Card
      className="group flex min-h-[186px] flex-col justify-between overflow-hidden p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-soft"
      style={{ borderColor: product.borderColor }}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-md"
            style={{ backgroundColor: product.softColor, color: product.color }}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex flex-wrap justify-end gap-1.5">
            {roles.map((role) => (
              <span
                key={role}
                className="rounded-md border border-border bg-muted px-2 py-1 text-[11px] font-semibold text-muted-foreground"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
        <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 text-sm font-medium text-muted-foreground">
          {connection}
        </p>
      </div>
      <div className="mt-4 border-t border-border pt-4">
        <p className="text-sm font-semibold leading-6" style={{ color: product.color }}>
          {product.shortName} routing
        </p>
        <p className="mt-2 text-xs font-medium leading-5 text-muted-foreground">{product.tagline}</p>
        {product.href && !product.linkDisabled ? (
          <Link
            href={product.href}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex text-xs font-semibold text-foreground underline-offset-4 hover:underline"
          >
            데스크 열기
          </Link>
        ) : product.linkDisabled ? (
          <span className="mt-3 inline-flex rounded-md border border-[#F5CE8B] bg-[#FFF8EC] px-2 py-1 text-[11px] font-semibold text-[#9E5700]">
            연결 예정
          </span>
        ) : null}
      </div>
    </Card>
  )
}
