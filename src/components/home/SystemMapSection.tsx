import {
  CheckCircle2,
  CircleDollarSign,
  Network,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { products, systemSignals } from "@/lib/admate-content"

export function SystemMapSection() {
  const satelliteProducts = products.filter((product) => product.id !== "agent-core")

  return (
    <section id="platform" className="relative overflow-hidden border-b border-border bg-[#F7F7F7] py-14 sm:py-16">
      <div className="absolute inset-0 soft-grid opacity-60" aria-hidden="true" />
      <div className="section-shell relative">
        <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,520px)_minmax(0,440px)] lg:items-end lg:justify-between lg:gap-12">
          <div>
            <Badge variant="outline" className="mb-3 bg-card text-muted-foreground">
              Live System Map
            </Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-normal sm:text-4xl">
              <span className="block">AdMate 생태계가</span>
              <span className="block sm:whitespace-nowrap">한 화면에서 연결됩니다.</span>
            </h2>
          </div>
          <p className="max-w-[440px] text-sm leading-7 text-muted-foreground lg:justify-self-end">
            <span className="block">기획, 정책 확인, 검수, 모니터링, 캡처, 학습은</span>
            <span className="block">분리된 도구가 아니라 하나의 Agent 운영 흐름으로 이어집니다.</span>
          </p>
        </div>

        <Card className="relative overflow-hidden p-4 shadow-soft sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                Agent Operating Flow
              </div>
              <div className="mt-1 text-lg font-semibold">Plan. Validate. Monitor. Capture. Learn.</div>
            </div>
            <Badge variant="outline" className="bg-muted">
              Platform View
            </Badge>
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_260px]">
            <div className="relative overflow-hidden rounded-lg border border-border bg-[#FAFAFA] p-3 sm:p-4">
              <div className="absolute inset-x-8 top-1/2 h-px bg-border" aria-hidden="true" />
              <div className="absolute inset-y-8 left-1/2 w-px bg-border" aria-hidden="true" />
              <svg
                className="pointer-events-none absolute inset-5 z-0 text-[#8EA2FF]"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path className="system-signal-line system-signal-line-1" d="M37 40 L47 48" />
                <path className="system-signal-line system-signal-line-2" d="M63 40 L53 48" />
                <path className="system-signal-line system-signal-line-3" d="M37 60 L47 52" />
                <path className="system-signal-line system-signal-line-4" d="M63 60 L53 52" />
                <circle className="system-signal-core-ring" cx="50" cy="50" r="5" />
              </svg>

              <div className="relative z-10 grid min-h-[430px] grid-cols-2 grid-rows-[1fr_auto_1fr] gap-3">
                {satelliteProducts.slice(0, 2).map((product, index) => (
                  <SystemMapProductNode key={product.id} product={product} signalIndex={index} />
                ))}

                <div className="system-core-node relative col-span-2 mx-auto w-full max-w-[260px] overflow-hidden rounded-lg border border-[#CFCFE8] bg-white p-4 text-center shadow-soft">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#111827] text-white">
                    <Network className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="text-sm font-semibold">AdMate Agent Core</div>
                  <div className="mt-1 text-xs leading-5 text-muted-foreground">
                    Intelligence & Automation Engine
                  </div>
                </div>

                {satelliteProducts.slice(2, 4).map((product, index) => (
                  <SystemMapProductNode key={product.id} product={product} signalIndex={index + 2} />
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-lg border border-border bg-[#111827] p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/60">Current loop</span>
                  <CircleDollarSign className="h-4 w-4 text-white/60" aria-hidden="true" />
                </div>
                <div className="mt-4 text-2xl font-semibold">Cost-aware AI</div>
                <p className="mt-2 text-xs leading-5 text-white/70">
                  플랫폼별 LLM 사용량과 자동화 실행을 추적하는 운영 구조를 전제로 설계합니다.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {systemSignals.slice(0, 8).map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-border bg-card p-3 text-xs font-semibold text-muted-foreground"
                  >
                    <item.icon className="mb-2 h-4 w-4 text-foreground" aria-hidden="true" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-4" />
          <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
            {["정책 근거", "운영 이력", "학습 피드백"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#177D4E]" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

function SystemMapProductNode({
  product,
  signalIndex,
}: {
  product: (typeof products)[number]
  signalIndex: number
}) {
  const Icon = product.icon

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="system-map-node flex min-h-[124px] flex-col justify-between rounded-lg border bg-white p-3 shadow-sm"
          style={{
            animationDelay: `${signalIndex * 0.65}s`,
            borderColor: product.borderColor,
          }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md"
            style={{ backgroundColor: product.softColor, color: product.color }}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <div className="text-sm font-semibold">{product.shortName}</div>
            <div className="mt-1 text-[11px] leading-4 text-muted-foreground">
              {product.subtitle}
            </div>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>{product.tagline}</TooltipContent>
    </Tooltip>
  )
}
