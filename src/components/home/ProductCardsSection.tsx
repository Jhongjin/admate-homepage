import { CheckCircle2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products } from "@/lib/admate-content"

import { SectionHeading } from "./SectionHeading"

export function ProductCardsSection() {
  return (
    <section id="products" className="border-b border-border bg-background py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Products"
          title="Compass, Sentinel, Lens, Foresight, 그리고 Agent Core"
          description="각 제품은 하나의 업무 영역을 깊게 맡고, Agent Core는 결과와 피드백을 연결합니다. 홈페이지에서는 실제 구현 상태를 과장하지 않고 역할과 경계를 명확히 보여줍니다."
        />

        <Tabs defaultValue="all" className="w-full">
          <div className="mb-6 overflow-x-auto pb-1">
            <TabsList className="h-auto min-w-max justify-start">
              <TabsTrigger value="all">전체</TabsTrigger>
              {products.map((product) => (
                <TabsTrigger key={product.id} value={product.id}>
                  {product.shortName}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid gap-4 lg:grid-cols-2">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          {products.map((product) => (
            <TabsContent key={product.id} value={product.id} className="mt-0">
              <div className="max-w-3xl">
                <ProductCard product={product} featured />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

function ProductCard({
  product,
  featured = false,
}: {
  product: (typeof products)[number]
  featured?: boolean
}) {
  const Icon = product.icon

  return (
    <Card className={featured ? "shadow-soft" : ""}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-lg border"
            style={{
              backgroundColor: product.softColor,
              borderColor: product.borderColor,
              color: product.color,
            }}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <Badge
            variant="outline"
            className="max-w-[180px] justify-center bg-card text-center text-[11px] leading-4 text-muted-foreground sm:max-w-none"
          >
            {product.subtitle}
          </Badge>
        </div>
        <CardTitle className="pt-3 text-xl">{product.name}</CardTitle>
        <p className="text-sm font-semibold" style={{ color: product.color }}>
          {product.tagline}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-7 text-muted-foreground">{product.description}</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {product.features.map((feature) => (
            <div key={feature} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: product.color }} aria-hidden="true" />
              <span className="leading-6 text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
