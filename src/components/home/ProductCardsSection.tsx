import { CheckCircle2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

const productRoleTags: Record<string, string[]> = {
  compass: ["Policy", "Guide"],
  sentinel: ["Validate", "Monitor"],
  lens: ["Capture", "Evidence"],
  foresight: ["Plan", "Forecast"],
}

const coreEngines = [
  {
    title: "자동화 실행 엔진",
    description: "스케줄과 조건에 따라 업무를 실행하고 외부 시스템을 연결합니다.",
  },
  {
    title: "지능/메모리 엔진",
    description: "AI와 사용자 이벤트를 학습해 운영 지식과 판단 기준을 축적합니다.",
  },
]

export function ProductCardsSection() {
  const core = products.find((product) => product.id === "agent-core")
  const productItems = products.filter((product) => product.id !== "agent-core")

  return (
    <section id="products" className="border-b border-border bg-background py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Products"
          title="Compass, Sentinel, Lens, Foresight, 그리고 Agent Core"
          description="각 제품은 하나의 업무 영역을 깊게 맡고, Agent Core는 결과와 피드백을 연결합니다. 홈페이지에서는 실제 구현 상태를 과장하지 않고 역할과 경계를 명확히 보여줍니다."
        />

        <Tabs defaultValue="all" className="w-full">
          <div className="mb-6 overflow-x-auto pb-1">
            <TabsList className="h-auto min-w-max justify-start">
              <TabsTrigger value="all">전체</TabsTrigger>
              {products.map((product) => (
                <TabsTrigger key={product.id} value={product.id}>
                  {product.shortName}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid gap-4 lg:grid-cols-2">
              {productItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {core ? <AgentCoreFoundation product={core} /> : null}
            </div>
          </TabsContent>

          {products.map((product) => (
            <TabsContent key={product.id} value={product.id} className="mt-0">
              <div className={product.id === "agent-core" ? "max-w-5xl" : "max-w-3xl"}>
                {product.id === "agent-core" ? (
                  <AgentCoreFoundation product={product} featured />
                ) : (
                  <ProductCard product={product} featured />
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

function ProductCard({
  product,
  featured = false,
}: {
  product: (typeof products)[number]
  featured?: boolean
}) {
  const Icon = product.icon
  const roles = productRoleTags[product.id] ?? [product.shortName]

  return (
    <Card className={featured ? "shadow-soft" : "transition duration-300 hover:-translate-y-0.5 hover:shadow-soft"}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-lg border"
            style={{
              backgroundColor: product.softColor,
              borderColor: product.borderColor,
              color: product.color,
            }}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex flex-wrap justify-end gap-1.5">
            {roles.map((role) => (
              <span
                key={role}
                className="rounded-md border border-border bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
        <CardTitle className="pt-3 text-xl">{product.name}</CardTitle>
        <p className="text-sm font-semibold" style={{ color: product.color }}>
          {product.tagline}
        </p>
        <p className="text-xs font-medium text-muted-foreground">{product.subtitle}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-7 text-muted-foreground">{product.description}</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {product.features.map((feature) => (
            <div key={feature} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: product.color }} aria-hidden="true" />
              <span className="leading-6 text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function AgentCoreFoundation({
  product,
  featured = false,
}: {
  product: (typeof products)[number]
  featured?: boolean
}) {
  const Icon = product.icon

  return (
    <Card
      className={`overflow-hidden border-[#1E293B] bg-[#111827] text-white ${
        featured ? "shadow-soft" : "lg:col-span-2"
      }`}
    >
      <CardContent className="grid gap-6 p-6 lg:grid-cols-[0.95fr_1.35fr] lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/10">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                Foundation layer
              </div>
              <h3 className="mt-1 text-xl font-semibold">{product.name}</h3>
            </div>
          </div>
          <p className="mt-4 text-sm font-semibold text-white/92">{product.tagline}</p>
          <p className="mt-3 text-sm leading-7 text-white/68">
            Agent Core는 네 제품의 실행 결과와 사용자 피드백을 하나의 운영 지식으로 연결하는
            공통 엔진입니다.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {coreEngines.map((engine) => (
            <div key={engine.title} className="rounded-lg border border-white/10 bg-white/[0.08] p-4">
              <div className="text-sm font-semibold text-white">{engine.title}</div>
              <p className="mt-2 text-xs leading-6 text-white/62">{engine.description}</p>
            </div>
          ))}
          <div className="rounded-lg border border-white/10 bg-white/[0.08] p-4 sm:col-span-2">
            <div className="grid gap-2 sm:grid-cols-2">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  <span className="leading-6 text-white/78">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
