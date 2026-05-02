import type { Metadata } from "next"

import { CommandCenterPage } from "@/components/command-center/CommandCenterPage"

export const metadata: Metadata = {
  title: "AdMate Command Center",
  description: "AdMate 제품군의 주간 진행 현황을 확인하는 임원용 대시보드입니다.",
}

export default function CommandCenterRoute() {
  return <CommandCenterPage />
}
