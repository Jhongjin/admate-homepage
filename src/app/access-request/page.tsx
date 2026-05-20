import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import {
  ArrowLeft,
  CheckCircle2,
  LogIn,
  ShieldCheck,
} from "lucide-react"

import { AccessRequestForm } from "@/components/access-request/AccessRequestForm"
import { BrandMark } from "@/components/home/BrandMark"
import { SiteLinksDropdown } from "@/components/home/SiteLinksDropdown"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { officialLinks } from "@/lib/admate-content"

const accessRequestUrl = new URL("/access-request", officialLinks.home).toString()

export const metadata: Metadata = {
  title: "AdMate 이용 권한 요청",
  description: "AdMate Compass, Sentinel, Lens, Foresight 이용 권한을 공통으로 요청하는 내부 신청 페이지입니다.",
  alternates: {
    canonical: "/access-request",
  },
  openGraph: {
    title: "AdMate 이용 권한 요청",
    description: "AdMate 제품군 이용 권한을 공통으로 요청하는 내부 신청 페이지입니다.",
    url: accessRequestUrl,
    siteName: "AdMate",
    type: "website",
    locale: "ko_KR",
  },
}

const processSteps = [
  {
    label: "01",
    title: "요청 정보 확인",
    description: "회사 이메일, 이름, 부서/팀, 필요한 제품을 기준으로 신청 범위를 확인합니다.",
  },
  {
    label: "02",
    title: "제품별 담당 검토",
    description: "요청 목적과 업무 범위를 보고 각 제품 담당자가 필요한 권한 단위를 검토합니다.",
  },
  {
    label: "03",
    title: "접근 범위 안내",
    description: "승인된 제품과 역할 범위를 안내하고, 이후 제품별 화면에서 사용을 시작합니다.",
  },
]

const guidanceItems = [
  "나스미디어 회사 이메일 기준으로만 요청합니다.",
  "광고주, 캠페인, 계정 식별값 같은 민감 정보는 사유에 쓰지 마세요.",
  "제품별 실제 권한 부여와 이력 관리는 담당 운영 체계에서 처리됩니다.",
]

export default function AccessRequestRoute() {
  return (
    <main className="min-h-screen bg-[#F3F0E8] text-[#101820]">
      <header className="sticky top-0 z-40 border-b border-[#D6CCBC] bg-[#F3F0E8]/[0.94] backdrop-blur-xl">
        <div className="section-shell flex h-14 items-center justify-between gap-3 xl:max-w-[1400px]">
          <Link href="/" className="flex min-w-0 items-center gap-2 text-[#101820]">
            <BrandMark className="h-7 w-7 shrink-0" />
            <span className="truncate text-sm font-semibold">AdMate</span>
          </Link>

          <div className="hidden min-w-0 items-center gap-2 lg:flex">
            <Button asChild variant="outline" size="sm" className="border-[#C9BFAF] bg-white/60 text-[#101820] hover:bg-white">
              <Link href="/">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                홈으로
              </Link>
            </Button>
            <SiteLinksDropdown />
            <Button asChild size="sm" className="bg-[#101820] text-white hover:bg-[#26342E]">
              <Link href={officialLinks.login} target="_blank" rel="noreferrer">
                <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
                로그인
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Button asChild variant="outline" size="sm" className="h-9 border-[#C9BFAF] bg-white/60 px-3 text-[#101820] hover:bg-white">
              <Link href="/">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">홈으로</span>
              </Link>
            </Button>
            <SiteLinksDropdown className="h-9 min-w-0 px-3" />
          </div>
        </div>
      </header>

      <section className="section-shell grid gap-8 pb-16 pt-14 xl:max-w-[1400px] lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.55fr)] lg:items-start lg:pb-24 lg:pt-20">
        <div className="min-w-0">
          <Badge variant="outline" className="border-[#D6CCBC] bg-white/60 px-3 py-1 text-[#60706A]">
            AdMate common access
          </Badge>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-normal text-[#101820] sm:text-5xl lg:text-6xl">
            AdMate 이용 권한을 한 곳에서 요청합니다.
          </h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-[#4F5D57] sm:text-lg">
            Compass, Sentinel, Lens, Foresight를 업무 목적에 맞게 선택하고, 공통 권한 검토에 필요한 기본 정보를 남기는 일반 사용자용 신청 페이지입니다.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {processSteps.map((step) => (
              <Card key={step.label} className="border-[#D6CCBC] bg-white/70 p-5 shadow-none">
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8A765B]">{step.label}</div>
                <h2 className="mt-3 text-lg font-semibold leading-tight text-[#101820]">{step.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#5E5E5E]">{step.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-[10px] border border-[#C9BFAF] bg-[#101820] p-5 text-white sm:p-6">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-white/10 text-[#D8F6EA]">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold">권한 요청 전 확인</h2>
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
    <Card className="border-[#C9BFAF] bg-white p-6 shadow-[0_24px_80px_rgba(16,24,32,0.10)]">
      <div className="h-4 w-28 rounded bg-[#EFE8DC]" />
      <div className="mt-4 h-8 w-56 rounded bg-[#EFE8DC]" />
      <div className="mt-6 grid gap-3">
        <div className="h-11 rounded-[8px] bg-[#F8F6F1]" />
        <div className="h-11 rounded-[8px] bg-[#F8F6F1]" />
        <div className="h-24 rounded-[8px] bg-[#F8F6F1]" />
      </div>
    </Card>
  )
}
