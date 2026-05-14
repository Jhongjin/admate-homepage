import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

const productRoleTags: Record<string, string[]> = {
  compass: ["Policy", "Evidence"],
  sentinel: ["Validation", "Live risk"],
  lens: ["Proof", "Capture"],
  foresight: ["Forecast", "Decision"],
}

const productSignals: Record<
  string,
  {
    signal: string
    proof: string
    nextDecision: string
  }
> = {
  compass: {
    signal: "정책 리스크와 집행 가능 여부",
    proof: "매체별 출처와 정책 근거를 함께 제시",
    nextDecision: "캠페인 조건 조정 또는 승인 기준 확정",
  },
  sentinel: {
    signal: "세팅값, 예산, KPI 이상 신호",
    proof: "미디어믹스 대비 실제 세팅과 실시간 상태 비교",
    nextDecision: "집행 전 수정, 알림, 에스컬레이션",
  },
  lens: {
    signal: "게재 화면과 보고 증빙 누락 여부",
    proof: "모바일/데스크톱 화면 캡처와 이력 관리",
    nextDecision: "보고 산출물 확정 및 광고주 공유",
  },
  foresight: {
    signal: "예산 대비 성과 기대치와 벤치마크",
    proof: "과거 성과와 업종/목표 기준 시뮬레이션",
    nextDecision: "예산 배분, 매체 믹스, PoC 범위 결정",
  },
}

const productDesks: Record<
  string,
  {
    desk: string
    cadence: string
    surface: Array<{
      label: string
      value: string
    }>
  }
> = {
  compass: {
    desk: "Evidence desk",
    cadence: "집행 전 판단",
    surface: [
      { label: "Question", value: "정책 가능 여부" },
      { label: "Source", value: "매체별 근거" },
      { label: "Gate", value: "승인 기준 확정" },
    ],
  },
  sentinel: {
    desk: "Control loop",
    cadence: "검수와 실시간 감시",
    surface: [
      { label: "Compare", value: "미디어믹스 대 세팅" },
      { label: "Watch", value: "예산/KPI 이상" },
      { label: "Escalate", value: "수정과 알림" },
    ],
  },
  lens: {
    desk: "Proof desk",
    cadence: "보고 증빙 준비",
    surface: [
      { label: "Render", value: "게재 화면" },
      { label: "Capture", value: "모바일/데스크톱" },
      { label: "Archive", value: "보고 이력" },
    ],
  },
  foresight: {
    desk: "Forecast desk",
    cadence: "기획 단계 판단",
    surface: [
      { label: "Benchmark", value: "업종/목표 기준" },
      { label: "Simulate", value: "예산 대비 성과" },
      { label: "Allocate", value: "매체 믹스" },
    ],
  },
}

const coreEngines = [
  {
    title: "업무 근거",
    description: "조건, 실행 결과, 알림 이력을 남겨 다음 운영 판단의 근거로 연결합니다.",
  },
  {
    title: "판단 기억",
    description: "사용자 피드백과 예외 기준을 축적해 반복 판단을 조직 지식으로 만듭니다.",
  },
]

const portfolioSignals = [
  { label: "Gate signals", value: "정책 · 검수 · 감시 · 증빙" },
  { label: "Decision record", value: "근거와 피드백을 Agent Core로 연결" },
  { label: "Executive view", value: "제품명이 아니라 운영 판단 순서로 탐색" },
]

export function ProductCardsSection() {
  const core = products.find((product) => product.id === "agent-core")
  const productItems = products.filter((product) => product.id !== "agent-core")

  return (
    <section id="products" className="border-b border-border bg-background py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Portfolio Board"
          title="AdMate 제품군을 운영 신호로 읽는 보드"
          description="Compass, Sentinel, Lens, Foresight는 캠페인 운영에서 확인해야 할 신호와 남겨야 할 근거를 나눠 맡습니다. Agent Core는 결과와 피드백을 연결해 포트폴리오 전체의 운영 기억을 만듭니다."
        />

        <div className="mb-6 grid border-y border-border bg-card sm:grid-cols-3">
          {portfolioSignals.map((item) => (
            <div key={item.label} className="border-b border-border px-4 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {item.label}
              </div>
              <div className="mt-1 text-sm font-semibold leading-6 text-foreground">{item.value}</div>
            </div>
          ))}
        </div>

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
  const signals = productSignals[product.id]
  const desk = productDesks[product.id]

  return (
    <Card
      className={`overflow-hidden ${
        featured ? "shadow-soft" : "transition duration-300 hover:-translate-y-0.5 hover:shadow-soft"
      }`}
      style={{ borderColor: desk ? product.borderColor : undefined }}
    >
      {desk ? <div className="h-1.5" style={{ backgroundColor: product.color }} aria-hidden="true" /> : null}
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border"
              style={{
                backgroundColor: product.softColor,
                borderColor: product.borderColor,
                color: product.color,
              }}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-xl">{product.name}</CardTitle>
              {desk ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span
                    className="rounded-md border px-2.5 py-1 text-[11px] font-semibold"
                    style={{
                      backgroundColor: product.softColor,
                      borderColor: product.borderColor,
                      color: product.color,
                    }}
                  >
                    {desk.desk}
                  </span>
                  <span className="rounded-md border border-border bg-muted px-2.5 py-1 text-[11px] font-semibold text-foreground">
                    {desk.cadence}
                  </span>
                </div>
              ) : null}
            </div>
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
        <p className="text-sm font-semibold" style={{ color: product.color }}>
          {product.tagline}
        </p>
        <p className="text-xs font-medium text-muted-foreground">{product.subtitle}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-7 text-muted-foreground">{product.description}</p>
        {desk ? (
          <div className="mt-5 grid border-y border-border bg-muted/20 sm:grid-cols-3">
            {desk.surface.map((item) => (
              <div key={item.label} className="border-b border-border px-3 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: product.color }}>
                  {item.label}
                </div>
                <div className="mt-1 text-xs font-semibold leading-5 text-foreground">{item.value}</div>
              </div>
            ))}
          </div>
        ) : null}
        {signals ? (
          <div className="mt-5 grid gap-3">
            <SignalRow label="운영 신호" value={signals.signal} color={product.color} />
            <SignalRow label="판단 근거" value={signals.proof} color={product.color} />
            <SignalRow label="다음 결정" value={signals.nextDecision} color={product.color} />
          </div>
        ) : null}
        <div className="mt-5 border-t border-border pt-4">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            운영 단서
          </div>
          <div className="flex flex-wrap gap-2">
            {product.features.map((feature) => (
              <span
                key={feature}
                className="rounded-md border px-2.5 py-1.5 text-xs font-medium text-foreground"
                style={{ borderColor: product.borderColor, backgroundColor: product.softColor }}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
        {product.href || product.linkDisabled ? (
          <div className="mt-5 border-t border-border pt-4">
            {product.href && !product.linkDisabled ? (
              <Link
                href={product.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-muted"
              >
                {product.linkLabel ?? "제품 열기"}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            ) : product.linkDisabled ? (
              <span className="inline-flex items-center rounded-md border border-[#F5CE8B] bg-[#FFF8EC] px-3 py-2 text-xs font-semibold text-[#9E5700]">
                {product.linkLabel ?? "연결 예정"}
              </span>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

function SignalRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="grid gap-2 rounded-lg border border-border bg-muted/30 p-3 sm:grid-cols-[8.5rem_1fr] sm:items-center">
      <div className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color }}>
        {label}
      </div>
      <div className="flex items-start gap-2 text-sm font-medium text-foreground">
        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} aria-hidden="true" />
        <span className="leading-6">{value}</span>
      </div>
    </div>
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
      className={`overflow-hidden border-[#B8C7BE] bg-[#F6F8F7] text-foreground ${
        featured ? "shadow-soft" : "lg:col-span-2"
      }`}
    >
      <CardContent className="grid gap-6 p-6 lg:grid-cols-[0.95fr_1.35fr] lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#B8C7BE] bg-white text-[#2F5D50]">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#587067]">
                Operating spine
              </div>
              <h3 className="mt-1 text-xl font-semibold">{product.name}</h3>
            </div>
          </div>
          <p className="mt-4 text-sm font-semibold text-[#2F5D50]">{product.tagline}</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Agent Core는 네 제품의 실행 결과, 판단 근거, 사용자 피드백을 하나의 운영 기록으로 연결하는
            공통 기반입니다.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {coreEngines.map((engine) => (
            <div key={engine.title} className="rounded-lg border border-[#D5DED8] bg-white p-4">
              <div className="text-sm font-semibold text-foreground">{engine.title}</div>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{engine.description}</p>
            </div>
          ))}
          <div className="rounded-lg border border-[#D5DED8] bg-white p-4 sm:col-span-2">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#587067]">
              포트폴리오 기록
            </div>
            <div className="flex flex-wrap gap-2">
              {product.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-md border border-[#D5DED8] bg-[#F6F8F7] px-2.5 py-1.5 text-xs font-medium text-foreground"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
