import {
  ACCESS_REQUEST_ORGANIZATION_HEADQUARTERS,
  formatAccessRequestOrganizationPath,
  getAccessRequestOrganizationMetadata,
  getAccessRequestPolicyMetadata,
  isAccessRequestOrganizationSelectionValid,
  type AccessRequestOrganizationSelection,
} from "./access-request-organization"

export type AccessRequestPlatform = "compass" | "sentinel" | "lens" | "foresight" | "agent_core" | "command_center"
export type RequestedPermissionLevel = "view" | "operate" | "project_manage"

export type AccessRequestInput = {
  requester_name?: unknown
  requester_email?: unknown
  requester_email_local_part?: unknown
  requester_division?: unknown
  requester_team_name?: unknown
  requester_team?: unknown
  organization_headquarters?: unknown
  organization_department?: unknown
  organization_team?: unknown
  purpose?: unknown
  usage_purposes?: unknown
  requested_platforms?: unknown
  requested_permission_level?: unknown
  requested_hermes_reviewer?: unknown
  request_note?: unknown
  metadata?: unknown
}

export type NormalizedAccessRequestInput = {
  requester_name: string
  requester_email: string
  requester_email_local_part: string
  requester_division: string
  requester_team_name: string
  requester_team: string
  purpose: string
  usage_purposes: string[]
  requested_platforms: AccessRequestPlatform[]
  requested_permission_level: RequestedPermissionLevel
  requested_hermes_reviewer: boolean
  request_note: string
  metadata: Record<string, unknown>
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EMAIL_LOCAL_PART_PATTERN = /^[a-z0-9._%+-]+$/i

export const NASMEDIA_EMAIL_DOMAIN = "nasmedia.co.kr"

export const HOME_ACCESS_REQUEST_PRODUCTS: AccessRequestPlatform[] = ["compass", "sentinel", "lens", "foresight"]

export const ACCESS_REQUEST_PLATFORMS: AccessRequestPlatform[] = [
  "compass",
  "sentinel",
  "lens",
  "foresight",
  "agent_core",
  "command_center",
]

export const REQUESTED_PERMISSION_LEVELS: RequestedPermissionLevel[] = ["view", "operate", "project_manage"]

const LEGACY_ACCESS_REQUEST_DIVISIONS = [
  "광고1실",
  "광고2실",
  "광고3실",
  "광고4실",
  "광고5실",
  "광고6실",
  "광고7실",
  "나스미디어",
] as const

export const ACCESS_REQUEST_DIVISIONS: readonly string[] = [
  ...ACCESS_REQUEST_ORGANIZATION_HEADQUARTERS,
  ...LEGACY_ACCESS_REQUEST_DIVISIONS,
]

export const ACCESS_REQUEST_USAGE_PURPOSES = [
  "정책/가이드 검색",
  "캠페인 사전 검수",
  "실시간 모니터링",
  "캡처/게재 증빙",
  "예측/성과 분석",
  "Command Center 조회",
  "Agent Core / Hermes 검토",
] as const

export const ACCESS_REQUEST_PRODUCT_PRESETS: Record<
  string,
  { requested_platforms: AccessRequestPlatform[]; usage_purposes: string[] }
> = {
  compass: {
    requested_platforms: ["compass"],
    usage_purposes: ["정책/가이드 검색"],
  },
  sentinel: {
    requested_platforms: ["sentinel"],
    usage_purposes: ["캠페인 사전 검수", "실시간 모니터링"],
  },
  lens: {
    requested_platforms: ["lens"],
    usage_purposes: ["캡처/게재 증빙"],
  },
  foresight: {
    requested_platforms: ["foresight"],
    usage_purposes: ["예측/성과 분석"],
  },
}

export function isEmailLocalPart(value: string) {
  return EMAIL_LOCAL_PART_PATTERN.test(value)
}

export function mergeUnique<T>(current: T[], next: T[]) {
  return Array.from(new Set([...current, ...next]))
}

function text(value: unknown, maxLength: number) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, maxLength)
}

function bool(value: unknown) {
  if (typeof value === "boolean") return value
  const normalized = String(value ?? "").trim().toLowerCase()
  return ["true", "1", "yes", "y", "on"].includes(normalized)
}

function stringArray(value: unknown) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean)
  if (typeof value === "string") return value.split(/[,|]/).map((item) => item.trim()).filter(Boolean)
  return []
}

function plainRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {}
  return value as Record<string, unknown>
}

function metadataText(metadata: Record<string, unknown>, key: string, maxLength: number) {
  return text(metadata[key], maxLength)
}

function normalizeEmailLocalPart(value: unknown) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/@.*/, "")
    .slice(0, 80)
}

function normalizeNasmediaEmail(input: AccessRequestInput) {
  const localPartFromDedicatedField = normalizeEmailLocalPart(input.requester_email_local_part)
  const emailText = text(input.requester_email, 160).toLowerCase()
  const emailHasDomain = emailText.includes("@")
  const localPart = localPartFromDedicatedField || normalizeEmailLocalPart(emailText)

  return {
    emailLocalPart: localPart,
    email: localPartFromDedicatedField
      ? `${localPart}@${NASMEDIA_EMAIL_DOMAIN}`
      : emailHasDomain
        ? emailText
        : localPart
          ? `${localPart}@${NASMEDIA_EMAIL_DOMAIN}`
          : emailText,
  }
}

function permissionRoleHint(value: RequestedPermissionLevel) {
  if (value === "project_manage") return "owner_or_project_admin_candidate"
  if (value === "operate") return "editor_candidate"
  return "viewer_candidate"
}

export function normalizeAccessRequestInput(input: AccessRequestInput): NormalizedAccessRequestInput {
  const { emailLocalPart, email } = normalizeNasmediaEmail(input)
  const inputMetadata = plainRecord(input.metadata)
  const divisionText = text(input.requester_division, 80)
  const organizationHeadquartersInput =
    text(input.organization_headquarters, 80) || metadataText(inputMetadata, "organization_headquarters", 80)
  const organizationDepartment = text(input.organization_department, 80) || metadataText(inputMetadata, "organization_department", 80)
  const organizationTeam = text(input.organization_team, 80) || metadataText(inputMetadata, "organization_team", 80)
  const organizationHeadquarters = ACCESS_REQUEST_ORGANIZATION_HEADQUARTERS.includes(organizationHeadquartersInput)
    ? organizationHeadquartersInput
    : ACCESS_REQUEST_ORGANIZATION_HEADQUARTERS.includes(divisionText)
      ? divisionText
      : ""
  const legacyDivision = LEGACY_ACCESS_REQUEST_DIVISIONS.includes(divisionText as (typeof LEGACY_ACCESS_REQUEST_DIVISIONS)[number])
    ? divisionText
    : ""
  const requesterDivision = organizationHeadquarters || legacyDivision
  const organizationSelection: AccessRequestOrganizationSelection = {
    headquarters: organizationHeadquarters,
    department: organizationDepartment,
    team: organizationTeam,
  }
  const organizationSelectionValid = organizationHeadquarters
    ? isAccessRequestOrganizationSelectionValid(organizationSelection)
    : false
  const organizationPathText = organizationHeadquarters ? formatAccessRequestOrganizationPath(organizationSelection) : ""
  const requesterTeamName = text(input.requester_team_name, 80)
  const fallbackTeam = text(input.requester_team, 120)
  const requesterTeam = organizationPathText || (requesterDivision || requesterTeamName
    ? [requesterDivision, requesterTeamName].filter(Boolean).join(" / ")
    : fallbackTeam)
  const usagePurposes = stringArray(input.usage_purposes).filter((item): item is (typeof ACCESS_REQUEST_USAGE_PURPOSES)[number] =>
    ACCESS_REQUEST_USAGE_PURPOSES.includes(item as (typeof ACCESS_REQUEST_USAGE_PURPOSES)[number]),
  )
  const requestedPermissionLevel = String(input.requested_permission_level || "view") as RequestedPermissionLevel
  const normalizedPermissionLevel = REQUESTED_PERMISSION_LEVELS.includes(requestedPermissionLevel)
    ? requestedPermissionLevel
    : "view"
  const organizationTreeMetadata = organizationSelectionValid
    ? getAccessRequestOrganizationMetadata(organizationSelection)
    : {}
  const organizationPolicyMetadata = organizationSelectionValid
    ? getAccessRequestPolicyMetadata(organizationSelection, normalizedPermissionLevel)
    : {}
  const requestedPlatforms = stringArray(input.requested_platforms).filter((item): item is AccessRequestPlatform =>
    ACCESS_REQUEST_PLATFORMS.includes(item as AccessRequestPlatform),
  )
  const purposeText = text(input.purpose, 600)
  const purpose = usagePurposes.length > 0 ? usagePurposes.join(", ") : purposeText
  const hasV2Input = Boolean(
    text(input.requester_email_local_part, 80) ||
      requesterDivision ||
      requesterTeamName ||
      usagePurposes.length > 0 ||
      inputMetadata.form_version === "v2",
  )
  const metadata = {
    ...inputMetadata,
    form_version: hasV2Input ? "v2" : "v1_compat",
    email_local_part: emailLocalPart,
    email_domain: NASMEDIA_EMAIL_DOMAIN,
    division: requesterDivision,
    team: requesterTeamName,
    organization_headquarters: organizationHeadquarters || null,
    organization_department: organizationDepartment || null,
    organization_team: organizationTeam || null,
    organization_path: [organizationHeadquarters, organizationDepartment, organizationTeam].filter(Boolean),
    organization_path_text: organizationPathText || requesterTeam,
    organization_selection_valid: organizationHeadquarters ? organizationSelectionValid : null,
    ...organizationTreeMetadata,
    ...organizationPolicyMetadata,
    usage_purposes: usagePurposes,
    requested_permission_role_hint: permissionRoleHint(normalizedPermissionLevel),
    nasmedia_default_viewer_candidate: requesterDivision === "나스미디어" || requesterDivision === "나스미디어(전사)",
  }

  return {
    requester_name: text(input.requester_name, 80),
    requester_email: email,
    requester_email_local_part: emailLocalPart,
    requester_division: requesterDivision,
    requester_team_name: requesterTeamName,
    requester_team: requesterTeam,
    purpose,
    usage_purposes: Array.from(new Set(usagePurposes)),
    requested_platforms: Array.from(new Set(requestedPlatforms)),
    requested_permission_level: normalizedPermissionLevel,
    requested_hermes_reviewer: bool(input.requested_hermes_reviewer),
    request_note: text(input.request_note, 600),
    metadata,
  }
}

export function validateAccessRequestInput(input: NormalizedAccessRequestInput) {
  const errors: string[] = []

  if (!input.requester_name) errors.push("name is required")
  if (!EMAIL_PATTERN.test(input.requester_email) || !input.requester_email.endsWith(`@${NASMEDIA_EMAIL_DOMAIN}`)) {
    errors.push("valid @nasmedia.co.kr email is required")
  }
  if (!input.requester_email_local_part || !isEmailLocalPart(input.requester_email_local_part)) {
    errors.push("valid email local part is required")
  }
  if (input.metadata.form_version === "v2" && !input.requester_division) errors.push("division is required")
  if (input.metadata.form_version === "v2" && input.metadata.organization_selection_valid === false) {
    errors.push("organization selection is invalid")
  }
  if (!input.requester_team) errors.push("team is required")
  if (input.usage_purposes.length === 0 && (!input.purpose || input.purpose.length < 10)) {
    errors.push("purpose must be selected or be at least 10 characters")
  }
  if (input.requested_platforms.length === 0) errors.push("at least one platform is required")

  return errors
}
