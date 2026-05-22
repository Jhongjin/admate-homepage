import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MailCheck,
  ShieldCheck,
} from "lucide-react"

import { AccessRequestForm } from "@/components/access-request/AccessRequestForm"
import { BrandMark } from "@/components/home/BrandMark"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { officialLinks } from "@/lib/admate-content"

const accessRequestUrl = new URL("/access-request", officialLinks.home).toString()

export const metadata: Metadata = {
  title: "AdMate 이용 권한 신청",
  description: "필요한 제품을 선택하고 신청 정보를 남겨주세요. 담당자가 확인 후 안내드립니다.",
  alternates: {
    canonical: "/access-request",
  },
  openGraph: {
    title: "AdMate 이용 권한 신청",
    description: "필요한 제품을 선택하고 신청 정보를 남겨주세요. 담당자가 확인 후 안내드립니다.",
    url: accessRequestUrl,
    siteName: "AdMate",
    type: "website",
    locale: "ko_KR",
  },
}

const processSteps = [
  {
    icon: CheckCircle2,
    title: "신청 정보 확인",
    description: "필요한 제품과 신청자 정보를 확인합니다.",
  },
  {
    icon: Clock3,
    title: "담당자 검토",
    description: "업무 목적에 맞는 이용 범위를 살펴봅니다.",
  },
  {
    icon: MailCheck,
    title: "결과 안내",
    description: "확인 후 업무 이메일로 안내드립니다.",
  },
]

const guidanceItems = [
  "업무 이메일 앞부분만 입력해 주세요.",
  "필요한 제품과 이용 범위를 선택해 주세요.",
  "본부, 실, 팀은 현재 소속 기준으로 선택해 주세요.",
]

export default function AccessRequestRoute() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#101820]">
      <header className="sticky top-0 z-40 border-b border-[#DDE2E8] bg-white/90 backdrop-blur-xl">
        <div className="section-shell flex h-14 items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-2 text-[#101820]">
            <BrandMark className="h-7 w-7 shrink-0" />
            <span className="truncate text-sm font-semibold">AdMate</span>
          </Link>

          <Button asChild variant="outline" size="sm" className="border-[#C9D2DC] bg-white text-[#101820] hover:bg-[#F2F5F7]">
            <Link href="/">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              홈으로
            </Link>
          </Button>
        </div>
      </header>

      <section className="section-shell grid gap-8 pb-16 pt-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(420px,0.58fr)] lg:items-start lg:pb-24 lg:pt-16">
        <div className="min-w-0">
          <div className="inline-flex rounded-full border border-[#C9D2DC] bg-white px-3 py-1 text-xs font-semibold text-[#54616D]">
            AdMate 신청
          </div>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.04] tracking-normal text-[#101820] sm:text-5xl lg:text-6xl">
            AdMate 이용 권한 신청
          </h1>
          <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-[#4C5965] sm:text-lg">
            필요한 제품을 선택하고 신청 정보를 남겨주세요. 담당자가 확인 후 안내드립니다.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {processSteps.map((step) => (
              <Card key={step.title} className="border-[#DDE2E8] bg-white p-5 shadow-none">
                <div className="grid h-9 w-9 place-items-center rounded-[8px] bg-[#EDF7F2] text-[#177D4E]">
                  <step.icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-base font-semibold leading-tight text-[#101820]">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#5A6672]">{step.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-[8px] border border-[#C9D2DC] bg-[#101820] p-5 text-white sm:p-6">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-white/10 text-[#BDEBD3]">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold">신청 전 확인</h2>
                <div className="mt-3 grid gap-2">
                  {guidanceItems.map((item) => (
                    <div key={item} className="flex gap-2 text-sm leading-6 text-white/72">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#9FE5C1]" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Suspense fallback={<AccessRequestFormFallback />}>
          <AccessRequestForm />
        </Suspense>
      </section>
    </main>
  )
}

function AccessRequestFormFallback() {
  return (
    <Card className="border-[#DDE2E8] bg-white p-6 shadow-[0_24px_80px_rgba(16,24,32,0.10)]">
      <div className="h-4 w-28 rounded bg-[#E7ECF1]" />
      <div className="mt-4 h-8 w-56 rounded bg-[#E7ECF1]" />
      <div className="mt-6 grid gap-3">
        <div className="h-11 rounded-[8px] bg-[#F7F8FA]" />
        <div className="h-11 rounded-[8px] bg-[#F7F8FA]" />
        <div className="h-24 rounded-[8px] bg-[#F7F8FA]" />
      </div>
    </Card>
  )
}
