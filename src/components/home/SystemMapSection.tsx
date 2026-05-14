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
    <section id="platform" className="relative overflow-hidden border-b border-[#C9D2CC] bg-[#F6F8F5] py-14 sm:py-16">
      <div className="absolute inset-0 soft-grid opacity-60" aria-hidden="true" />
      <div className="section-shell relative">
        <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,520px)_minmax(0,440px)] lg:items-end lg:justify-between lg:gap-12">
          <div>
            <Badge variant="outline" className="mb-3 border-[#B9C5BE] bg-white text-[#405149]">
              운영 시스템 보드
            </Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-normal sm:text-4xl">
              <span className="block">캠페인 운영 흐름을</span>
              <span className="block sm:whitespace-nowrap">의사결정 단위로 연결합니다.</span>
            </h2>
          </div>
          <p className="max-w-[440px] text-sm leading-7 text-[#405149] lg:justify-self-end">
            <span className="block">각 제품은 기능 소개 카드가 아니라 운영실의 계기판입니다.</span>
            <span className="block">기획, 정책, 검수, 모니터링, 캡처, 학습이 같은 판단 보드에 올라옵니다.</span>
          </p>
        </div>

        <Card className="relative overflow-hidden border-[#101820] bg-white p-4 shadow-soft sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5B6B62]">
                운영 지휘 흐름
              </div>
              <div className="mt-1 text-lg font-semibold text-[#101820]">기획 · 정책 · 검수 · 감시 · 증빙 · 학습</div>
            </div>
            <Badge variant="outline" className="border-[#C9D2CC] bg-[#F6F8F5] text-[#405149]">
              보드 보기
            </Badge>
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_260px]">
            <div className="relative overflow-hidden rounded-lg border border-[#C9D2CC] bg-[#F8FAF7] p-3 sm:p-4">
              <div className="absolute inset-x-8 top-1/2 h-px bg-[#B9C5BE]" aria-hidden="true" />
              <div className="absolute inset-y-8 left-1/2 w-px bg-[#B9C5BE]" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 z-0 hidden sm:block" aria-hidden="true">
                <span className="system-link-segment system-link-segment-tl" />
                <span className="system-link-segment system-link-segment-tr" />
                <span className="system-link-segment system-link-segment-bl" />
                <span className="system-link-segment system-link-segment-br" />
                <span className="system-core-pulse" />
              </div>

              <div className="relative z-10 grid min-h-[430px] grid-cols-2 grid-rows-[1fr_auto_1fr] gap-3">
                {satelliteProducts.slice(0, 2).map((product, index) => (
                  <SystemMapProductNode key={product.id} product={product} signalIndex={index} />
                ))}

                <div className="system-core-node relative col-span-2 mx-auto w-full max-w-[260px] overflow-hidden rounded-lg border border-[#101820] bg-white p-4 text-center shadow-soft">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#101820] text-white">
                    <Network className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="text-sm font-semibold">AdMate Agent Core</div>
                  <div className="mt-1 text-xs leading-5 text-[#5B6B62]">
                    판단, 실행, 기록, 비용 통제의 공통 운영 계층
                  </div>
                </div>

                {satelliteProducts.slice(2, 4).map((product, index) => (
                  <SystemMapProductNode key={product.id} product={product} signalIndex={index + 2} />
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-lg border border-[#101820] bg-[#101820] p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/60">현재 운영 루프</span>
                  <CircleDollarSign className="h-4 w-4 text-white/60" aria-hidden="true" />
                </div>
                <div className="mt-4 text-2xl font-semibold">비용을 함께 보는 운영</div>
                <p className="mt-2 text-xs leading-5 text-white/70">
                  LLM 사용량, 자동화 실행, 운영 판단을 비용과 품질 기준 안에서 함께 추적합니다.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {systemSignals.slice(0, 8).map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-[#C9D2CC] bg-white p-3 text-xs font-semibold text-[#405149]"
                  >
                    <item.icon className="mb-2 h-4 w-4 text-[#101820]" aria-hidden="true" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-4" />
          <div className="grid gap-2 text-xs text-[#405149] sm:grid-cols-3">
            {["정책 근거", "운영 이력", "증빙/학습 피드백"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#2F7D50]" aria-hidden="true" />
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
            <div className="mt-1 text-[11px] leading-4 text-[#5B6B62]">
              {product.subtitle}
            </div>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>{product.tagline}</TooltipContent>
    </Tooltip>
  )
}
