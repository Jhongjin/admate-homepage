import type { Metadata } from "next"
import { Geist, Noto_Sans_KR } from "next/font/google"

import { TooltipProvider } from "@/components/ui/tooltip"
import { officialLinks } from "@/lib/admate-content"

import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-noto-sans-kr",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(officialLinks.home),
  title: "AdMate - 광고 운영을 위한 AI Operating System",
  description:
    "AdMate는 광고 캠페인의 정책 확인, 위험 감지, 화면 기록, 성과 예측을 운영 지능으로 맞춰 오늘 필요한 판단을 돕는 AI Operating System입니다.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AdMate - 광고 운영을 위한 AI Operating System",
    description:
      "AdMate는 광고 캠페인의 정책 확인, 위험 감지, 화면 기록, 성과 예측을 운영 지능으로 맞춰 오늘 필요한 판단을 돕는 AI Operating System입니다.",
    url: officialLinks.home,
    siteName: "AdMate",
    type: "website",
    locale: "ko_KR",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/brand/admate-mark.svg",
  },
  keywords: [
    "AdMate",
    "AI Operating System",
    "광고 운영 지능",
    "캠페인 운영",
    "캠페인 모니터링",
    "광고 정책 검색",
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
    <html lang="ko" className={`${geist.variable} ${notoSansKr.variable}`}>
      <body>
        <TooltipProvider delayDuration={120}>{children}</TooltipProvider>
      </body>
    </html>
  )
}
