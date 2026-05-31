import type { Metadata } from "next"
import { permanentRedirect } from "next/navigation"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AdMate Command Center",
  description: "AdMate 제품군의 주간 진행 현황을 확인하는 임원용 대시보드입니다.",
  alternates: {
    canonical: "/command-center",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RetiredCommandCenterRoute() {
  permanentRedirect("/command-center")
}
