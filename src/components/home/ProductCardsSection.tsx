import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

const productRoleTags: Record<string, string[]> = {
  compass: ["정책 게이트", "근거 검증"],
  sentinel: ["관제 루프", "이상 감시"],
  lens: ["증빙 데스크", "캡처 이력"],
  foresight: ["계획판", "예산 판단"],
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
    desk: "근거 데스크",
    cadence: "집행 전 판단",
    surface: [
      { label: "질문", value: "정책 가능 여부" },
      { label: "출처", value: "매체별 근거" },
      { label: "승인문", value: "승인 기준 확정" },
    ],
  },
  sentinel: {
    desk: "관제 루프",
    cadence: "검수와 실시간 감시",
    surface: [
      { label: "대조", value: "미디어믹스 대 세팅" },
      { label: "감시", value: "예산/KPI 이상" },
      { label: "대응", value: "수정과 알림" },
    ],
  },
  lens: {
    desk: "증빙 데스크",
    cadence: "보고 증빙 준비",
    surface: [
      { label: "렌더", value: "게재 화면" },
      { label: "캡처", value: "모바일/데스크톱" },
      { label: "보존", value: "보고 이력" },
    ],
  },
  foresight: {
    desk: "계획 데스크",
    cadence: "기획 단계 판단",
    surface: [
      { label: "기준선", value: "업종/목표 기준" },
      { label: "시나리오", value: "예산 대비 성과" },
      { label: "배분", value: "매체 믹스" },
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
  { label: "Signal desks", value: "정책 근거 · 세팅 리스크 · 증빙 이력 · 예산 판단" },
  { label: "Routing memory", value: "각 데스크의 근거와 피드백을 Agent Core로 전달" },
  { label: "Executive scan", value: "제품 소개보다 오늘의 승인/수정/공유 판단을 먼저 확인" },
]

const ledgerLabels = ["신호", "근거", "결정"]

const customSurfaceProductIds = new Set(["compass", "sentinel", "lens", "foresight"])

const productTabRoles: Record<string, string> = {
  compass: "근거",
  sentinel: "관제",
  lens: "증빙",
  foresight: "계획",
  "agent-core": "기억",
}

export function ProductCardsSection() {
  const core = products.find((product) => product.id === "agent-core")
  const productItems = products.filter((product) => product.id !== "agent-core")

  return (
    <section id="products" className="border-b border-border bg-background py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Portfolio Board"
          title="각 제품은 하나의 운영 데스크로 일합니다"
          description="Compass, Sentinel, Lens, Foresight는 기능 묶음이 아니라 정책 근거, 세팅 리스크, 보고 증빙, 예산 판단을 맡는 데스크입니다. Agent Core는 데스크별 판단과 피드백을 운영 기억으로 연결합니다."
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

        <div className="mb-6 flex flex-wrap items-center gap-2 border-y border-[#D2DBD5] bg-[#F6F8F7] px-3 py-3 text-xs font-semibold text-[#405149]">
          <span className="text-[10px] uppercase tracking-[0.14em] text-[#587067]">Decision ledger</span>
          {ledgerLabels.map((label, index) => (
            <div key={label} className="flex items-center gap-2">
              <span className="rounded-md border border-[#D5DED8] bg-white px-2.5 py-1 text-foreground">
                {label}
              </span>
              {index < ledgerLabels.length - 1 ? (
                <ArrowRight className="h-3.5 w-3.5 text-[#7B8780]" aria-hidden="true" />
              ) : null}
            </div>
          ))}
          <span className="text-muted-foreground">각 데스크가 같은 형식으로 운영 판단을 남깁니다.</span>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="mb-6 overflow-x-auto pb-1">
            <TabsList className="h-auto min-w-max justify-start">
              <TabsTrigger value="all">전체</TabsTrigger>
              {products.map((product) => (
                <ProductTabTrigger key={product.id} product={product} />
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
  const hasCustomSurface = customSurfaceProductIds.has(product.id)
  const inputLabel = product.id === "compass" ? "근거 자료" : product.id === "foresight" ? "계획 입력" : "원천 입력"
  const featuredArtifacts = getDecisionArtifacts(product)

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
        {desk && !hasCustomSurface ? (
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
        {hasCustomSurface ? <ProductOperationalSurface product={product} /> : null}
        {signals ? (
          <ProductSignalLedger product={product} signals={signals} />
        ) : null}
        {featured ? (
          <div className="mt-5 border-t border-border pt-4">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {featuredArtifacts.label ?? inputLabel}
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {featuredArtifacts.items.map((item, index) => (
                <div
                  key={item.value}
                  className="grid grid-cols-[3.25rem_1fr] items-start gap-2 rounded-md border px-2.5 py-2 text-xs font-medium text-foreground"
                  style={{ borderColor: product.borderColor, backgroundColor: product.softColor }}
                >
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {"code" in item ? item.code : `I-${String(index + 1).padStart(2, "0")}`}
                  </span>
                  <span className="leading-5">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : signals ? (
          <div className="mt-5 border-t border-border pt-4">
            <div className="grid gap-0 overflow-hidden rounded-lg border border-border bg-[#FBFCFA] sm:grid-cols-3">
              {[
                { label: "신호", value: signals.signal },
                { label: "근거", value: signals.proof },
                { label: "결정", value: signals.nextDecision },
              ].map((item) => (
                <div key={item.label} className="border-b border-border px-3 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: product.color }}>
                    {item.label}
                  </div>
                  <div className="mt-1 text-xs font-semibold leading-5 text-foreground">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
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

function getDecisionArtifacts(product: (typeof products)[number]) {
  if (product.id === "sentinel") {
    return {
      label: "판정 산출물",
      items: [
        { code: "S-01", value: "세팅값과 미디어믹스 대조표" },
        { code: "S-02", value: "예산/KPI 이상 상태와 보류 기준" },
        { code: "S-03", value: "알림, 수정, 재개 판단 이력" },
        { code: "S-04", value: "운영자 확인과 에스컬레이션 큐" },
      ],
    }
  }

  if (product.id === "lens") {
    return {
      label: "증빙 산출물",
      items: [
        { code: "L-01", value: "모바일/데스크톱 캡처 비교본" },
        { code: "L-02", value: "소재, 랜딩, 게재 화면 확인표" },
        { code: "L-03", value: "보고서 첨부용 캡처 묶음" },
        { code: "L-04", value: "누락/재촬영/보존 상태 이력" },
      ],
    }
  }

  return {
    label: null,
    items: product.features.map((feature) => ({ value: feature })),
  }
}

function ProductTabTrigger({ product }: { product: (typeof products)[number] }) {
  return (
    <TabsTrigger value={product.id} className="gap-2">
      <span
        className="h-2 w-2 rounded-sm border"
        style={{
          backgroundColor: product.softColor,
          borderColor: product.borderColor,
        }}
        aria-hidden="true"
      />
      <span>{product.shortName}</span>
      <span className="hidden text-[10px] font-semibold text-muted-foreground sm:inline">
        {productTabRoles[product.id] ?? "운영"}
      </span>
    </TabsTrigger>
  )
}

function ProductOperationalSurface({ product }: { product: (typeof products)[number] }) {
  if (product.id === "compass") {
    return (
      <div className="mt-5 grid gap-3 border-y border-[#D4E3E9] bg-[#F7FBFC] p-3 sm:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-2">
          {[
            { label: "정책 질문", value: "업종, 소재, 랜딩 조건" },
            { label: "근거 문서", value: "매체별 조항과 출처" },
            { label: "승인 기준", value: "수정/집행/보류 판단" },
          ].map((item, index) => (
            <div key={item.label} className="grid grid-cols-[3rem_1fr] items-center gap-3 border border-[#D4E3E9] bg-white px-3 py-2">
              <span className="font-mono text-[10px] font-semibold text-[#1F6F8B]">
                E-{String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="text-[11px] font-semibold text-[#66756D]">{item.label}</div>
                <div className="mt-0.5 text-xs font-semibold text-[#101820]">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid content-between border border-[#1F6F8B] bg-white p-3">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1F6F8B]">검증 게이트</div>
            <div className="mt-2 text-sm font-semibold leading-6 text-[#101820]">출처가 붙은 답변만 집행 판단으로 넘깁니다.</div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {["질문", "근거", "승인"].map((label) => (
              <div key={label} className="border border-[#B9D8E2] bg-[#EAF4F7] px-2 py-2 text-center text-[11px] font-semibold text-[#1F6F8B]">
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (product.id === "sentinel") {
    return (
      <div className="mt-5 border-y border-[#9FE5C1] bg-[#F5FBF7] p-3">
        <div className="grid gap-3 sm:grid-cols-[0.82fr_1.18fr]">
          <div className="grid content-between gap-3 border border-[#9FE5C1] bg-white p-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#177D4E]">관제 상태</div>
              <div className="mt-2 text-sm font-semibold leading-6 text-[#101820]">
                설정값이 기준선에서 벗어나면 보류, 알림, 재개 판단으로 넘깁니다.
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: "정상", tone: "#177D4E", fill: "#EFFAF4" },
                { label: "주의", tone: "#9E5700", fill: "#FFF8EC" },
                { label: "보류", tone: "#D93025", fill: "#FEF2F1" },
              ].map((state) => (
                <div
                  key={state.label}
                  className="border px-2 py-2 text-center text-[11px] font-semibold"
                  style={{ borderColor: state.tone, backgroundColor: state.fill, color: state.tone }}
                >
                  {state.label}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            {[
              { step: "01", label: "대조", value: "미디어믹스 기준과 실제 세팅값 비교" },
              { step: "02", label: "감시", value: "예산 소진, KPI, 상태 변동을 관제 큐로 분리" },
              { step: "03", label: "조치", value: "수정 요청, 알림 발송, 재개 판단을 이력화" },
            ].map((item, index) => (
              <div key={item.step} className="grid grid-cols-[2.75rem_1fr] gap-3 border border-[#CDEAD8] bg-white px-3 py-2">
                <div className="flex h-8 w-8 items-center justify-center border border-[#9FE5C1] bg-[#EFFAF4] font-mono text-[10px] font-semibold text-[#177D4E]">
                  {item.step}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#587067]">
                    <span className="h-px w-5 bg-[#9FE5C1]" aria-hidden="true" />
                    {item.label}
                  </div>
                  <div className="mt-1 text-xs font-semibold leading-5 text-[#101820]">{item.value}</div>
                </div>
                {index < 2 ? <span className="hidden" aria-hidden="true" /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (product.id === "lens") {
    return (
      <div className="mt-5 border-y border-[#E8D2B8] bg-[#F7F0E8] p-3">
        <div className="grid gap-3 sm:grid-cols-[1fr_0.92fr]">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr]">
            <LensFrame label="Mobile" value="세로 화면" mark="M" fill="#FFFDF8" />
            <div className="flex min-h-8 items-center justify-center border-y border-[#E8D2B8] bg-[#FFFDF8] text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8A5A2B] sm:border-x sm:border-y-0 sm:bg-transparent">
              비교
            </div>
            <LensFrame label="Desktop" value="가로 화면" mark="D" fill="#F3E6D7" />
          </div>
          <div className="grid content-between border border-[#8A5A2B] bg-white p-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A5A2B]">증빙 판정</div>
              <div className="mt-2 text-sm font-semibold leading-6 text-[#101820]">
                캡처본을 비교해 보고서에 넣을 증빙, 재촬영, 보존 상태를 나눕니다.
              </div>
            </div>
            <div className="mt-4 grid gap-1.5">
              {[
                { label: "확정", value: "광고주 공유" },
                { label: "재촬영", value: "누락 보정" },
                { label: "보존", value: "보고 이력" },
              ].map((item) => (
                <div key={item.label} className="grid grid-cols-[4rem_1fr] border border-[#E8D2B8] bg-[#F7F0E8] px-2 py-2">
                  <span className="text-[10px] font-semibold text-[#8A5A2B]">{item.label}</span>
                  <span className="text-xs font-semibold text-[#101820]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (product.id === "foresight") {
    return (
      <div className="mt-5 grid gap-3 border-y border-[#F5CE8B] bg-[#FFF8EC] p-3 sm:grid-cols-[0.9fr_1.1fr]">
        <div className="border border-[#F5CE8B] bg-white p-3">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9E5700]">계획 기준판</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              { label: "예산", value: "배분안" },
              { label: "목표", value: "도달/KPI" },
              { label: "업종", value: "기준선" },
              { label: "매체", value: "믹스" },
            ].map((item) => (
              <div key={item.label} className="border border-[#F5CE8B] bg-[#FFF8EC] px-2 py-2">
                <div className="text-[10px] font-semibold text-[#9E5700]">{item.label}</div>
                <div className="mt-1 text-xs font-semibold text-[#101820]">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-[#B45309] bg-white p-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9E5700]">성과 곡선</div>
              <div className="mt-2 text-sm font-semibold text-[#101820]">회의 전에 예산 선택지를 비교합니다.</div>
            </div>
            <div className="font-mono text-xl font-semibold text-[#B45309]">3안</div>
          </div>
          <svg viewBox="0 0 240 72" className="mt-3 h-20 w-full" aria-hidden="true">
            <path d="M8 58 H232" stroke="#E8D5B5" strokeWidth="2" />
            <path d="M8 52 C48 46 63 26 104 32 C143 38 152 18 188 20 C211 21 221 15 232 10" fill="none" stroke="#B45309" strokeWidth="5" strokeLinecap="round" />
            <path d="M8 58 L8 38 M104 58 L104 32 M188 58 L188 20 M232 58 L232 10" stroke="#F5CE8B" strokeWidth="2" />
          </svg>
        </div>
      </div>
    )
  }

  return null
}

function LensFrame({
  label,
  value,
  mark,
  fill,
}: {
  label: string
  value: string
  mark: string
  fill: string
}) {
  return (
    <div className="border border-[#E8D2B8] bg-white p-2">
      <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8A5A2B]">
        <span>{label}</span>
        <span>{mark}</span>
      </div>
      <div className="h-24 border border-dashed border-[#D9B993] p-1">
        <div className="h-full" style={{ backgroundColor: fill }} />
      </div>
      <div className="mt-2 text-xs font-semibold text-[#101820]">{value}</div>
    </div>
  )
}

function ProductSignalLedger({
  product,
  signals,
}: {
  product: (typeof products)[number]
  signals: {
    signal: string
    proof: string
    nextDecision: string
  }
}) {
  if (product.id === "sentinel") {
    return (
      <div className="mt-5 border-y border-[#CDEAD8] bg-[#F7FBF8]">
        <div className="grid gap-0 sm:grid-cols-[0.72fr_1fr_1fr]">
          {[
            { label: "관제 트리거", value: signals.signal, code: "WATCH" },
            { label: "대조 근거", value: signals.proof, code: "CHECK" },
            { label: "조치 판단", value: signals.nextDecision, code: "ACT" },
          ].map((item) => (
            <div key={item.code} className="border-b border-[#CDEAD8] px-3 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#177D4E]">{item.code}</div>
                <span className="h-2 w-2 rounded-full bg-[#177D4E]" aria-hidden="true" />
              </div>
              <div className="mt-2 text-[11px] font-semibold text-[#587067]">{item.label}</div>
              <div className="mt-1 text-xs font-semibold leading-5 text-[#101820]">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (product.id === "lens") {
    return (
      <div className="mt-5 border-y border-[#E8D2B8] bg-[#FBF7F1]">
        <div className="grid gap-0 sm:grid-cols-[1fr_1fr_0.82fr]">
          {[
            { label: "비교 대상", value: signals.signal, code: "FRAME" },
            { label: "증빙 근거", value: signals.proof, code: "PROOF" },
            { label: "제출 판단", value: signals.nextDecision, code: "SHIP" },
          ].map((item) => (
            <div key={item.code} className="border-b border-[#E8D2B8] px-3 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8A5A2B]">{item.code}</div>
                <span className="h-2 w-3 border border-[#8A5A2B] bg-white" aria-hidden="true" />
              </div>
              <div className="mt-2 text-[11px] font-semibold text-[#6F6256]">{item.label}</div>
              <div className="mt-1 text-xs font-semibold leading-5 text-[#101820]">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-5 grid gap-3">
      <SignalRow label="운영 신호" value={signals.signal} color={product.color} />
      <SignalRow label="판단 근거" value={signals.proof} color={product.color} />
      <SignalRow label="다음 결정" value={signals.nextDecision} color={product.color} />
    </div>
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
              {featured ? "기억 입력 항목" : "운영 기억 경로"}
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {(featured ? product.features : ["신호 접수와 제품 데스크 상태", "승인/수정/공유 판단 이력"]).map((feature, index) => (
                <div
                  key={feature}
                  className="grid grid-cols-[3.25rem_1fr] rounded-md border border-[#D5DED8] bg-[#F6F8F7] px-2.5 py-2 text-xs font-medium text-foreground"
                >
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#587067]">
                    R-{String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-5">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
