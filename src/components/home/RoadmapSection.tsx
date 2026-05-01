import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { roadmap } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

export function RoadmapSection() {
  return (
    <section id="roadmap" className="border-b border-border bg-[#FBFBFB] py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Roadmap"
          title="AdMate Roadmap"
          description="초기에는 브랜드와 제품 구조를 명확히 하고, 이후 Agent Core 안정화, Tool API 전환, Foresight PoC, 비용 관리와 주간 기술 인텔리전스 루프로 확장합니다."
        />

        <Card className="overflow-hidden">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="w-[140px]">단계</TableHead>
                <TableHead>목표</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roadmap.map((item) => (
                <TableRow key={item.phase}>
                  <TableCell>
                    <Badge variant="outline" className="bg-card">
                      {item.phase}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium leading-6">{item.goal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </section>
  )
}
