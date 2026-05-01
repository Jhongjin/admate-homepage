import { BrainCircuit } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { products } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

const productRoles: Record<string, string[]> = {
  compass: ["Policy", "Guide"],
  sentinel: ["Validate", "Monitor"],
  lens: ["Capture", "Report"],
  foresight: ["Plan", "Forecast"],
}

const productConnections: Record<string, string> = {
  compass: "정책 근거와 가이드 판단을 운영 흐름에 연결",
  sentinel: "검수 결과와 실시간 이상 신호를 운영 이력으로 연결",
  lens: "캡처 증빙과 보고 산출물을 캠페인 기록으로 연결",
  foresight: "성과 예측과 제안 기준을 다음 기획으로 연결",
}

const coreCapabilities = ["실행", "판단", "기록", "학습"]

export function EcosystemSection() {
  const core = products.find((product) => product.id === "agent-core")
  const productItems = products.filter((product) => product.id !== "agent-core")

  return (
    <section id="ecosystem" className="border-b border-border bg-[#FBFBFB] py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Ecosystem"
          title="Agent Core가 광고 운영 제품군을 하나로 연결합니다"
          description={
            <>
              <span className="block">
                AdMate는 정책, 검수, 캡처, 예측을 담당하는 네 개의 전문 플랫폼과 이를 연결하는 Agent Core로 구성됩니다.
              </span>
              <span className="block">
                각 제품은 독립적으로 업무를 줄이고, Core를 통해 캠페인 단위의 실행·기록·학습 흐름으로 이어집니다.
              </span>
            </>
          }
          align="center"
        />

        <div className="relative grid gap-4 lg:grid-cols-[1fr_0.68fr_1fr] lg:items-stretch">
          <div className="grid gap-4">
            {productItems.slice(0, 2).map((product) => (
              <EcosystemProduct key={product.id} product={product} />
            ))}
          </div>

          <Card className="relative flex min-h-[280px] flex-col items-center justify-center overflow-visible bg-[#111827] p-6 text-center text-white">
            <div className="absolute inset-0 overflow-hidden rounded-lg" aria-hidden="true">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,106,210,0.28),transparent_56%)]" />
            </div>
            <CoreConnector className="-left-4 top-[29%]" />
            <CoreConnector className="-left-4 top-[71%]" />
            <CoreConnector className="-right-4 top-[29%]" reverse />
            <CoreConnector className="-right-4 top-[71%]" reverse />
            <div className="relative z-10">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                <BrainCircuit className="h-6 w-6" aria-hidden="true" />
              </div>
              <Badge className="border-white/15 bg-white/10 text-white" variant="outline">
                {core?.subtitle}
              </Badge>
              <h3 className="mt-4 text-2xl font-semibold">{core?.name}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                제품별 신호를 하나의 운영 흐름으로 모아 실행, 판단, 기록, 학습을 담당하는 공통 레이어입니다.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {coreCapabilities.map((capability) => (
                  <div
                    key={capability}
                    className="rounded-md border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white/82"
                  >
                    {capability}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-2 text-[11px] font-semibold text-white/70">
                <span className="whitespace-nowrap">제품 신호</span>
                <span className="text-emerald-300" aria-hidden="true">→</span>
                <span className="whitespace-nowrap">Agent Core</span>
                <span className="text-emerald-300" aria-hidden="true">→</span>
                <span className="whitespace-nowrap">운영 지식</span>
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
      className={`absolute hidden h-px w-4 bg-[#8EA2FF]/55 lg:block ${className}`}
      aria-hidden="true"
    >
      <span
        className={`absolute -top-1 h-2 w-2 animate-pulse rounded-full bg-[#8EA2FF] shadow-[0_0_14px_rgba(142,162,255,0.8)] ${
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
    <Card className="group flex min-h-[186px] flex-col justify-between overflow-hidden p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-soft">
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
        <p className="mt-2 text-sm font-medium" style={{ color: product.color }}>
          {product.subtitle}
        </p>
      </div>
      <div className="mt-4 border-t border-border pt-4">
        <p className="text-sm leading-6 text-muted-foreground">{product.tagline}</p>
        <p className="mt-2 text-xs font-medium leading-5" style={{ color: product.color }}>
          {connection}
        </p>
      </div>
    </Card>
  )
}
