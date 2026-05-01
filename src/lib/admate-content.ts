import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  Camera,
  CheckCircle2,
  CircleDollarSign,
  Compass,
  DatabaseZap,
  Eye,
  FileCheck2,
  Flag,
  Gauge,
  GitBranch,
  Layers3,
  Lightbulb,
  LineChart,
  Megaphone,
  Network,
  Radar,
  RefreshCw,
  Repeat2,
  Route,
  ShieldAlert,
  Sparkles,
  Waypoints,
  type LucideIcon,
} from "lucide-react"

export type Product = {
  id: string
  name: string
  shortName: string
  subtitle: string
  tagline: string
  description: string
  features: string[]
  color: string
  softColor: string
  borderColor: string
  icon: LucideIcon
}

export const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Products", href: "#products" },
  { label: "Lifecycle", href: "#lifecycle" },
  { label: "Agent Core", href: "#agent-core" },
  { label: "Impact", href: "#impact" },
  { label: "Roadmap", href: "#roadmap" },
]

export const products: Product[] = [
  {
    id: "compass",
    name: "AdMate Compass",
    shortName: "Compass",
    subtitle: "Policy Intelligence Agent",
    tagline: "정책과 가이드의 방향을 잡다",
    description:
      "Meta, Google, Naver, Kakao, X의 광고 정책과 가이드를 기반으로 캠페인 집행 전 필요한 정책 판단을 빠르게 지원합니다.",
    features: ["매체별 정책/가이드 검색", "RAG 기반 질의응답", "정책 근거 제공", "향후 Multi-LLM 검증"],
    color: "#4F63D8",
    softColor: "#ECEDF9",
    borderColor: "#CBD0EF",
    icon: Compass,
  },
  {
    id: "sentinel",
    name: "AdMate Sentinel",
    shortName: "Sentinel",
    subtitle: "Campaign Validation & Live Monitoring",
    tagline: "캠페인 사고를 사전에 막고 실시간으로 감지하다",
    description:
      "캠페인 시작 전에는 미디어믹스와 실제 매체 세팅값을 비교하고, 집행 후에는 예산·성과·상태 이상을 실시간으로 감지합니다.",
    features: ["사전 세팅 검수", "예산/기간/타겟/URL 오류 탐지", "실시간 KPI 이상 감지", "Slack/Email 알림"],
    color: "#177D4E",
    softColor: "#EFFAF4",
    borderColor: "#9FE5C1",
    icon: Radar,
  },
  {
    id: "lens",
    name: "AdMate Lens",
    shortName: "Lens",
    subtitle: "Creative & Placement Capture Automation",
    tagline: "광고 게재 화면과 증빙을 자동으로 만들다",
    description:
      "광고 게재 화면과 지면 노출 이미지를 자동 생성해 캡처·증빙·보고 업무에 투입되는 반복 리소스를 줄입니다.",
    features: ["광고 게재 화면 캡처", "모바일/데스크톱 광고 UI 렌더링", "보고서용 증빙 이미지 생성", "캡처 이력 관리"],
    color: "#7C3AED",
    softColor: "#F3E8FF",
    borderColor: "#DDD6FE",
    icon: Camera,
  },
  {
    id: "foresight",
    name: "AdMate Foresight",
    shortName: "Foresight",
    subtitle: "Media Planning Intelligence",
    tagline: "다음 캠페인의 성과를 미리 예측하다",
    description:
      "과거 캠페인 데이터와 시장 트렌드를 기반으로 캠페인 기획 단계에서 예상 성과와 전략 방향을 제안합니다.",
    features: ["예상 CPM/CPC/CTR/VTR 제공", "업종/목표별 벤치마크", "예산 대비 성과 시뮬레이션", "Meta PoC 후 타 매체 확장"],
    color: "#B45309",
    softColor: "#FFF8EC",
    borderColor: "#F5CE8B",
    icon: LineChart,
  },
  {
    id: "agent-core",
    name: "AdMate Agent Core",
    shortName: "Agent Core",
    subtitle: "Intelligence & Automation Engine",
    tagline: "지능과 자동화를 연결하다",
    description:
      "Openclaw의 실행 자동화와 Hermes의 학습/기억 구조를 기반으로 AdMate 플랫폼 전반의 업무 흐름을 연결하고 고도화합니다.",
    features: ["workflow 실행", "Slack action 처리", "운영자 피드백 학습", "감사 로그 기록", "LLM 비용/사용량 추적"],
    color: "#111827",
    softColor: "#F4F4F4",
    borderColor: "#D4D4D4",
    icon: BrainCircuit,
  },
]

export const problemCards = [
  {
    title: "분산된 정책 확인",
    description: "Meta, Google, Naver, Kakao, X 정책을 각각 찾아야 합니다.",
    icon: FileCheck2,
  },
  {
    title: "수작업 세팅 검수",
    description: "미디어믹스와 실제 매체 세팅값을 사람이 직접 비교합니다.",
    icon: CheckCircle2,
  },
  {
    title: "운영 중 이상 감지 지연",
    description: "예산 소진, KPI 변화, 캠페인 상태를 계속 확인해야 합니다.",
    icon: ShieldAlert,
  },
  {
    title: "반복 캡처 업무",
    description: "광고 게재 화면과 보고서 증빙 이미지를 매번 수작업으로 준비합니다.",
    icon: Camera,
  },
  {
    title: "제안 기준 분산",
    description: "과거 성과와 업종별 기준이 체계적으로 연결되지 않습니다.",
    icon: BarChart3,
  },
  {
    title: "운영 지식 손실",
    description: "플래너의 판단이 개인 경험으로만 남고 회사 지식으로 축적되지 않습니다.",
    icon: DatabaseZap,
  },
]

export const lifecycleSteps = [
  {
    step: "01",
    title: "기획",
    product: "Foresight",
    description: "예상 성과와 전략 방향 확인",
    icon: Flag,
  },
  {
    step: "02",
    title: "정책 확인",
    product: "Compass",
    description: "매체 정책과 가이드 확인",
    icon: Compass,
  },
  {
    step: "03",
    title: "세팅 검수",
    product: "Sentinel",
    description: "미디어믹스와 실제 세팅값 비교",
    icon: FileCheck2,
  },
  {
    step: "04",
    title: "집행 후 모니터링",
    product: "Sentinel",
    description: "예산/KPI/상태 이상 감지",
    icon: Radar,
  },
  {
    step: "05",
    title: "캡처/보고",
    product: "Lens",
    description: "광고 게재 화면과 증빙 이미지 생성",
    icon: Eye,
  },
  {
    step: "06",
    title: "학습/고도화",
    product: "Agent Core",
    description: "운영자 피드백을 운영 지식으로 축적",
    icon: BrainCircuit,
  },
]

export const impactCards = [
  {
    title: "업무 효율 향상",
    description: "정책 확인, 세팅 검수, 캡처, 운영 확인 시간을 줄입니다.",
    icon: Gauge,
  },
  {
    title: "캠페인 사고 예방",
    description: "시작 전 세팅 오류와 집행 후 이상 신호를 빠르게 감지합니다.",
    icon: ShieldAlert,
  },
  {
    title: "광고주 서비스 품질 향상",
    description: "더 빠르고 근거 있는 대응과 보고가 가능해집니다.",
    icon: Megaphone,
  },
  {
    title: "회사 고유 지식 자산화",
    description: "운영자 판단과 예외 기준이 Hermes에 축적됩니다.",
    icon: DatabaseZap,
  },
  {
    title: "AI 비용 통제",
    description: "LLM Cost Center로 플랫폼별/모델별 비용을 관리합니다.",
    icon: CircleDollarSign,
  },
  {
    title: "지속적 기술 고도화",
    description: "Weekly Intelligence Loop로 최신 기술을 반영합니다.",
    icon: RefreshCw,
  },
]

export const operations = [
  {
    title: "LLM Cost Center",
    description:
      "유료 LLM과 AI API 사용량을 플랫폼별, 모델별, 기능별로 추적합니다. AI 활용을 확대하면서도 비용 구조와 ROI를 관리할 수 있습니다.",
    icon: CircleDollarSign,
  },
  {
    title: "Weekly Intelligence Loop",
    description:
      "매주 최신 AI·MarTech·광고 플랫폼 변화를 조사하고, 적용 가능한 개선 후보를 선별해 플랫폼을 지속적으로 고도화합니다.",
    icon: Sparkles,
  },
  {
    title: "Business Opportunity Discovery Loop",
    description:
      "장기적으로 내부 업무 데이터와 시장 정보를 기반으로 신규 솔루션 기회를 탐색하고 PoC 개발로 연결할 수 있습니다.",
    icon: Lightbulb,
  },
]

export const roadmap = [
  { phase: "Phase 1", goal: "Compass / Sentinel / Lens / Foresight 브랜드와 제품 구조 정리" },
  { phase: "Phase 2", goal: "Agent Core 기반 Sentinel Live Monitoring 안정화" },
  { phase: "Phase 3", goal: "Lens와 Compass UI/UX 정렬 및 Tool API화" },
  { phase: "Phase 4", goal: "Foresight Meta PoC 설계 및 데이터 기준 정리" },
  { phase: "Phase 5", goal: "LLM Cost Center와 Weekly Intelligence Loop 구축" },
  { phase: "Phase 6", goal: "Business Opportunity Discovery Loop 장기 확장" },
]

export const corePillars = [
  {
    title: "Openclaw",
    subtitle: "Automation Execution",
    description:
      "스케줄과 조건에 따라 업무를 실행하고 외부 시스템을 연결하는 자동화 실행 엔진입니다.",
    icon: Bot,
  },
  {
    title: "Hermes",
    subtitle: "Intelligence / Memory",
    description:
      "AI와 사용자 이벤트를 학습해 운영 지식과 판단 기준을 축적하는 지능/메모리 엔진입니다.",
    icon: BrainCircuit,
  },
]

export const systemSignals = [
  { label: "Plan", icon: Route },
  { label: "Validate", icon: FileCheck2 },
  { label: "Monitor", icon: Activity },
  { label: "Capture", icon: Camera },
  { label: "Learn", icon: Repeat2 },
  { label: "Connect", icon: Waypoints },
  { label: "Orchestrate", icon: GitBranch },
  { label: "Network", icon: Network },
  { label: "Next", icon: ArrowRight },
]
