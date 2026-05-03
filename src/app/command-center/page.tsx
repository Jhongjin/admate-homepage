import type { Metadata } from "next"

import { CommandCenterPage } from "@/components/command-center/CommandCenterPage"
import { getCommandCenterData } from "@/lib/command-center-data"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "AdMate Command Center",
  description: "AdMate 제품군의 주간 진행 현황을 확인하는 임원용 대시보드입니다.",
}

export default async function CommandCenterRoute() {
  const data = await getCommandCenterData()

  return <CommandCenterPage data={data} />
}
