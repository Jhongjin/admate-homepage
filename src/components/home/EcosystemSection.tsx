import { ArrowRight, BrainCircuit } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { products } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

export function EcosystemSection() {
  const core = products.find((product) => product.id === "agent-core")
  const productItems = products.filter((product) => product.id !== "agent-core")

  return (
    <section id="ecosystem" className="border-b border-border bg-[#FBFBFB] py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Ecosystem"
          title="하나의 Agent Core, 네 개의 광고 운영 플랫폼"
          description="AdMate는 정책, 검수, 캡처, 예측을 담당하는 네 개의 전문 플랫폼과 이를 연결하는 Agent Core로 구성됩니다. 각 플랫폼은 독립적으로 업무를 줄이고, Agent Core를 통해 캠페인 단위의 실행·기록·학습 흐름으로 연결됩니다."
          align="center"
        />

        <div className="grid gap-4 lg:grid-cols-[1fr_0.68fr_1fr] lg:items-stretch">
          <div className="grid gap-4">
            {productItems.slice(0, 2).map((product) => (
              <EcosystemProduct key={product.id} product={product} />
            ))}
          </div>

          <Card className="relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden bg-[#111827] p-6 text-center text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,106,210,0.28),transparent_56%)]" aria-hidden="true" />
            <div className="relative z-10">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                <BrainCircuit className="h-6 w-6" aria-hidden="true" />
              </div>
              <Badge className="border-white/15 bg-white/10 text-white" variant="outline">
                {core?.subtitle}
              </Badge>
              <h3 className="mt-4 text-2xl font-semibold">{core?.name}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                지능, 자동화, 기억, 실행, 학습, 감사 로그를 담당하는 공통 Agent 운영 레이어입니다.
              </p>
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

function EcosystemProduct({ product }: { product: (typeof products)[number] }) {
  const Icon = product.icon

  return (
    <Card className="flex min-h-[160px] flex-col justify-between p-5">
      <div>
        <div className="flex items-center justify-between gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-md"
            style={{ backgroundColor: product.softColor, color: product.color }}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 text-sm font-medium" style={{ color: product.color }}>
          {product.subtitle}
        </p>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{product.tagline}</p>
    </Card>
  )
}
