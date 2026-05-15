"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Pause, Play, type LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { lifecycleSteps } from "@/lib/admate-content"
import { cn } from "@/lib/utils"

import { SectionHeading } from "./SectionHeading"

const CYCLE_INTERVAL = 2800

const lifecycleRoles = ["예측", "정책", "검수", "모니터링", "캡처", "학습"]

const lifecycleSignals = [
  "성과 기준 확인",
  "정책 근거 연결",
  "세팅 오류 검수",
  "운영 이상 감지",
  "보고 증빙 생성",
  "피드백 학습",
]

const lifecycleTones: Record<
  string,
  {
    color: string
    softColor: string
    borderColor: string
  }
> = {
  Foresight: {
    color: "#B45309",
    softColor: "#FFF8EC",
    borderColor: "#F5CE8B",
  },
  Compass: {
    color: "#2F6F73",
    softColor: "#EAF4F3",
    borderColor: "#D3E8E5",
  },
  Sentinel: {
    color: "#177D4E",
    softColor: "#EFFAF4",
    borderColor: "#9FE5C1",
  },
  Lens: {
    color: "#8A5A2B",
    softColor: "#F7F0E8",
    borderColor: "#E8D2B8",
  },
  "Agent Core": {
    color: "#2F5D50",
    softColor: "#F6F8F7",
    borderColor: "#B8C7BE",
  },
}

export function CampaignLifecycleSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [interactionPaused, setInteractionPaused] = useState(false)
  const [manualPaused, setManualPaused] = useState(false)
  const [allowsMotion, setAllowsMotion] = useState(true)

  const activeStep = lifecycleSteps[activeIndex]
  const nextStep = lifecycleSteps[(activeIndex + 1) % lifecycleSteps.length]
  const activeTone = lifecycleTones[activeStep.product] ?? lifecycleTones["Agent Core"]
  const ActiveIcon = activeStep.icon
  const isPaused = manualPaused || interactionPaused || !allowsMotion

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncMotionPreference = () => setAllowsMotion(!media.matches)

    syncMotionPreference()
    media.addEventListener("change", syncMotionPreference)

    return () => media.removeEventListener("change", syncMotionPreference)
  }, [])

  useEffect(() => {
    if (isPaused || !allowsMotion) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % lifecycleSteps.length)
    }, CYCLE_INTERVAL)

    return () => window.clearInterval(timer)
  }, [allowsMotion, isPaused])

  return (
    <section id="lifecycle" className="border-b border-border bg-[#FBFBFB] py-20">
      <div className="section-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Operating relay"
            title="근거가 다음 승인으로 넘어가는 운영 흐름"
            description={
              <>
                <span className="block">
                  AdMate는 캠페인 운영 단계를 기능 목록으로 나열하지 않습니다.
                </span>
                <span className="block">
                  예측, 정책 확인, 세팅 검수, 이상 감지, 보고용 캡처, 다음 학습을 승인 가능한 판단 이력으로 넘깁니다.
                </span>
              </>
            }
            className="mb-0"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-fit"
            disabled={!allowsMotion}
            onClick={() => setManualPaused((current) => !current)}
          >
            {manualPaused || !allowsMotion ? (
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {!allowsMotion ? "모션 최소화" : manualPaused ? "순환 재개" : "순환 일시정지"}
          </Button>
        </div>

        <div className="mt-8 overflow-x-auto pb-1">
          <div className="flex min-w-max items-center rounded-lg border border-border bg-card p-2 shadow-sm">
            {lifecycleSteps.map((step, index) => {
              const isActive = index === activeIndex
              const tone = lifecycleTones[step.product] ?? lifecycleTones["Agent Core"]

              return (
                <div key={step.step} className="flex items-center">
                  <button
                    type="button"
                    className={cn(
                      "rounded-md px-3 py-2 text-left text-xs font-semibold transition",
                      isActive ? "bg-[#101820] text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    onClick={() => setActiveIndex(index)}
                    style={isActive ? { boxShadow: `0 0 0 1px ${tone.borderColor}` } : undefined}
                  >
                    <span className={cn("mr-2", isActive ? "text-white/50" : "text-muted-foreground")}>{step.step}</span>
                    <span>{lifecycleRoles[index]}</span>
                  </button>
                  {index < lifecycleSteps.length - 1 ? (
                    <ArrowRight className="mx-1 h-3.5 w-3.5 text-muted-foreground/45" aria-hidden="true" />
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="relative overflow-hidden border-[#B8C7BE] bg-[#F6F8F7] p-5 text-[#101820] shadow-sm sm:p-6">
            <div className="hero-panel-grid absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="w-fit border-[#B8C7BE] bg-white text-[#2F5D50]">
                    Decision relay
                  </Badge>
                  <span className="rounded-md border border-[#D5DED8] bg-white px-2.5 py-1 text-xs font-semibold text-[#587067]">
                    선택 단계 · {activeStep.step}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#587067]">
                  <span className={cn("h-1.5 w-1.5 rounded-full", isPaused ? "bg-[#B8C7BE]" : "bg-[#177D4E]")} />
                  {isPaused ? "순환 정지" : "판단 흐름 표시"}
                </div>
              </div>

              <div className="mt-8 flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border"
                  style={{
                    borderColor: activeTone.borderColor,
                    backgroundColor: "#FFFFFF",
                    color: activeTone.color,
                  }}
                >
                  <ActiveIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-sm font-semibold text-[#587067]">{activeStep.product}</div>
                    <span
                      className="rounded-md border px-2 py-0.5 text-[11px] font-semibold"
                      style={{
                        borderColor: `${activeTone.color}55`,
                        backgroundColor: `${activeTone.color}18`,
                        color: activeTone.color,
                      }}
                    >
                      {lifecycleRoles[activeIndex]}
                    </span>
                  </div>
                  <h3 className="mt-2 text-3xl font-semibold leading-tight">{activeStep.title}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-[#405149]">
                    {activeStep.description}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-2 flex items-center justify-between text-xs font-semibold text-[#587067]">
                  <span>Relay progress</span>
                  <span>{activeIndex + 1} of {lifecycleSteps.length}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#D5DED8]">
                  <div
                    key={activeStep.step}
                    className="lifecycle-progress-fill h-full rounded-full"
                    style={{
                      backgroundColor: activeTone.color,
                    }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-6 gap-1.5 text-[11px] text-[#587067]">
                  {lifecycleSteps.map((step, index) => {
                    const isActive = index === activeIndex
                    const isComplete = index < activeIndex

                    return (
                      <button
                        key={step.step}
                        type="button"
                        className={cn(
                          "min-h-[46px] rounded-md border px-2 py-2 text-left font-semibold transition",
                          isActive
                            ? "border-[#101820] bg-white text-[#101820]"
                            : isComplete
                              ? "border-[#B8C7BE] bg-white text-[#2F5D50] hover:bg-[#F6F8F7]"
                              : "border-[#D5DED8] bg-white/70 hover:bg-white"
                        )}
                        onClick={() => setActiveIndex(index)}
                        onFocus={() => {
                          setActiveIndex(index)
                          setInteractionPaused(true)
                        }}
                        onBlur={() => setInteractionPaused(false)}
                      >
                        <span className="block text-[10px] opacity-55">{step.step}</span>
                        <span className="mt-0.5 block leading-4">{lifecycleRoles[index]}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "현재 신호", value: lifecycleSignals[activeIndex] },
                  { label: "다음 연결", value: `${nextStep.step} · ${nextStep.product}` },
                  { label: "운영 방식", value: "Human-in-the-loop" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-[#D5DED8] bg-white p-3">
                    <div className="text-xs font-medium text-[#587067]">{item.label}</div>
                    <div className="mt-2 text-sm font-semibold text-[#101820]">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div
            className="grid gap-3 md:grid-cols-2"
            onMouseEnter={() => setInteractionPaused(true)}
            onMouseLeave={() => setInteractionPaused(false)}
            onFocus={() => setInteractionPaused(true)}
            onBlur={() => setInteractionPaused(false)}
          >
            {lifecycleSteps.map((item, index) => {
              const isActive = index === activeIndex
              const tone = lifecycleTones[item.product] ?? lifecycleTones["Agent Core"]

              return (
                <LifecycleStepButton
                  key={item.step}
                  icon={item.icon}
                  isActive={isActive}
                  item={item}
                  tone={tone}
                  onActivate={() => setActiveIndex(index)}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function LifecycleStepButton({
  icon: Icon,
  isActive,
  item,
  onActivate,
  tone,
}: {
  icon: LucideIcon
  isActive: boolean
  item: (typeof lifecycleSteps)[number]
  onActivate: () => void
  tone: {
    color: string
    softColor: string
    borderColor: string
  }
}) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      className={cn(
        "group relative min-h-[164px] overflow-hidden rounded-lg border bg-white p-5 text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActive && "shadow-soft"
      )}
      style={{
        borderColor: isActive ? tone.borderColor : undefined,
        backgroundColor: isActive ? tone.softColor : undefined,
      }}
      onClick={onActivate}
      onFocus={onActivate}
    >
      {isActive ? (
        <span
          className="lifecycle-signal-pulse absolute inset-x-4 top-0 h-px"
          style={{ backgroundColor: tone.color, color: tone.color }}
        />
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge variant={isActive ? "default" : "muted"}>{item.step}</Badge>
          <span
            className="rounded-md border px-2 py-0.5 text-[11px] font-semibold"
            style={{
              borderColor: isActive ? tone.borderColor : "#E5E7EB",
              color: tone.color,
              backgroundColor: isActive ? "#FFFFFF" : tone.softColor,
            }}
          >
            {lifecycleRoles[Number(item.step) - 1]}
          </span>
        </div>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg border"
          style={{
            borderColor: isActive ? tone.borderColor : "#E5E7EB",
            color: tone.color,
            backgroundColor: isActive ? "#FFFFFF" : tone.softColor,
          }}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>

      <h3 className="mt-5 text-base font-semibold">{item.title}</h3>
      <div className="mt-2 flex items-center gap-2 text-sm font-semibold" style={{ color: tone.color }}>
        {item.product}
        <ArrowRight className={cn("h-3.5 w-3.5 transition", isActive ? "translate-x-0.5" : "opacity-40")} aria-hidden="true" />
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.description}</p>
    </button>
  )
}
