import type { Metadata } from "next"

import { CommandCenterDesignPreview } from "@/components/command-center/CommandCenterDesignPreview"
import { commandCenterData } from "@/lib/command-center-data"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AdMate Command Center Design Preview",
  description: "AdMate Command Center의 디자인 후보 화면입니다.",
  alternates: {
    canonical: "/command-center/design-preview",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function CommandCenterDesignPreviewRoute() {
  return <CommandCenterDesignPreview data={commandCenterData} />
}
