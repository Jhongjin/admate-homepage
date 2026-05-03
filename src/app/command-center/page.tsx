import type { Metadata } from "next"

import { CommandCenterPage } from "@/components/command-center/CommandCenterPage"
import { getCommandCenterData } from "@/lib/command-center-data"
import { officialLinks } from "@/lib/admate-content"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "AdMate Command Center",
  description: "AdMate 제품군의 주간 진행 현황을 확인하는 임원용 대시보드입니다.",
  alternates: {
    canonical: "/command-center",
  },
  openGraph: {
    title: "AdMate Command Center",
    description: "AdMate 제품군의 주간 진행 현황을 확인하는 임원용 대시보드입니다.",
    url: officialLinks.commandCenter,
    siteName: "AdMate",
    type: "website",
    locale: "ko_KR",
  },
}

export default async function CommandCenterRoute() {
  const data = await getCommandCenterData()

  return <CommandCenterPage data={data} />
}
