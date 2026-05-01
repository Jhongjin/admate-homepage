import type { Metadata } from "next"

import { TooltipProvider } from "@/components/ui/tooltip"

import "./globals.css"

export const metadata: Metadata = {
  title: "AdMate - AI Agent 기반 광고 운영 자동화 플랫폼",
  description:
    "AdMate는 광고 캠페인의 정책 확인, 세팅 검수, 실시간 모니터링, 캡처 자동화, 성과 예측을 하나의 AI Agent 운영 흐름으로 연결하는 광고 운영 자동화 플랫폼입니다.",
  keywords: [
    "AdMate",
    "광고 운영 자동화",
    "AI Agent",
    "미디어플래닝",
    "캠페인 모니터링",
    "광고 정책 RAG",
    "광고 캡처 자동화",
    "성과 예측",
    "나스미디어",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <TooltipProvider delayDuration={120}>{children}</TooltipProvider>
      </body>
    </html>
  )
}
