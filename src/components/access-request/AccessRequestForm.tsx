"use client"

import { FormEvent, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  AtSign,
  CheckCircle2,
  CircleAlert,
  ClipboardList,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { products } from "@/lib/admate-content"
import {
  ACCESS_REQUEST_PRODUCT_PRESETS,
  HOME_ACCESS_REQUEST_PRODUCTS,
  NASMEDIA_EMAIL_DOMAIN,
  isEmailLocalPart,
  mergeUnique,
  type AccessRequestPlatform,
  type RequestedPermissionLevel,
} from "@/lib/access-request-contract"
import {
  formatAccessRequestOrganizationPath,
  getAccessRequestOrganizationMetadata,
  getAccessRequestOrganizationPath,
  getAccessRequestPolicyMetadata,
  isAccessRequestOrganizationSelectionComplete,
  type AccessRequestOrganizationSelection,
} from "@/lib/access-request-organization"
import { OrganizationPicker } from "./OrganizationPicker"

type AccessRequestFormState = {
  requester_name: string
  email_local_part: string
  organization: AccessRequestOrganizationSelection
  requested_platforms: AccessRequestPlatform[]
  requested_permission_level: RequestedPermissionLevel
}

type SubmitState =
  | { type: "idle" }
  | { type: "success"; message: string; requestId?: string }
  | { type: "error"; message: string; details?: string[] }

const initialForm: AccessRequestFormState = {
  requester_name: "",
  email_local_part: "",
  organization: {
    headquarters: "",
    department: "",
    team: "",
  },
  requested_platforms: [],
  requested_permission_level: "view",
}

const requestProducts = products.filter((product) =>
  HOME_ACCESS_REQUEST_PRODUCTS.includes(product.id as AccessRequestPlatform),
)

const permissionLevels: Array<{
  key: RequestedPermissionLevel
  label: string
  description: string
}> = [
  {
    key: "view",
    label: "확인만 필요",
    description: "기능과 결과를 조회합니다.",
  },
  {
    key: "operate",
    label: "업무에 직접 사용",
    description: "본인 업무와 참여 캠페인에 사용합니다.",
  },
  {
    key: "project_manage",
    label: "팀 운영에 필요",
    description: "팀원 작업 현황 확인이 필요합니다.",
  },
]

function normalizeProductParam(value: string | null) {
  const product = String(value || "").trim().toLowerCase()
  return HOME_ACCESS_REQUEST_PRODUCTS.includes(product as AccessRequestPlatform) ? product : ""
}

function formWithPreset(product: string) {
  const preset = ACCESS_REQUEST_PRODUCT_PRESETS[product]

  if (!preset) return initialForm

  return {
    ...initialForm,
    requested_platforms: mergeUnique(initialForm.requested_platforms, preset.requested_platforms),
  }
}

function getUsagePurposesFromPlatforms(platforms: AccessRequestPlatform[]) {
  return platforms.reduce<string[]>((purposes, platform) => {
    const preset = ACCESS_REQUEST_PRODUCT_PRESETS[platform]
    return preset ? mergeUnique(purposes, preset.usage_purposes) : purposes
  }, [])
}

function getErrorDetails(value: unknown) {
  if (!Array.isArray(value)) return undefined
  const copyByError: Record<string, string> = {
    "name is required": "이름을 입력해 주세요.",
    "valid @nasmedia.co.kr email is required": "업무 이메일을 확인해 주세요.",
    "valid email local part is required": "이메일 앞부분을 확인해 주세요.",
    "division is required": "본부를 선택해 주세요.",
    "organization selection is invalid": "소속 선택을 다시 확인해 주세요.",
    "team is required": "소속을 선택해 주세요.",
    "purpose must be selected or be at least 10 characters": "필요한 제품을 선택해 주세요.",
    "at least one platform is required": "필요한 제품을 하나 이상 선택해 주세요.",
  }

  return value
    .map((item) => copyByError[String(item)] || String(item))
    .filter(Boolean)
    .slice(0, 5)
}

export function AccessRequestForm() {
  const searchParams = useSearchParams()
  const requestedProduct = normalizeProductParam(searchParams.get("product") || searchParams.get("platform"))
  const [form, setForm] = useState<AccessRequestFormState>(() => formWithPreset(requestedProduct))
  const [loading, setLoading] = useState(false)
  const [submitState, setSubmitState] = useState<SubmitState>({ type: "idle" })

  const emailLocalPart = form.email_local_part.trim().toLowerCase().replace(/@.*/, "")
  const requesterEmail = emailLocalPart ? `${emailLocalPart}@${NASMEDIA_EMAIL_DOMAIN}` : ""
  const organizationPath = getAccessRequestOrganizationPath(form.organization)
  const organizationPathText = formatAccessRequestOrganizationPath(form.organization)
  const organizationLeafName = organizationPath[organizationPath.length - 1] || ""
  const organizationMetadata = getAccessRequestOrganizationMetadata(form.organization)
  const organizationPolicyMetadata = getAccessRequestPolicyMetadata(form.organization, form.requested_permission_level)
  const organizationComplete = isAccessRequestOrganizationSelectionComplete(form.organization)
  const canSubmit = useMemo(
    () =>
      Boolean(
        form.requester_name.trim() &&
          emailLocalPart &&
          isEmailLocalPart(emailLocalPart) &&
          organizationComplete &&
          form.requested_platforms.length > 0,
      ),
    [emailLocalPart, form, organizationComplete],
  )

  const setField = <K extends keyof AccessRequestFormState>(key: K, value: AccessRequestFormState[K]) => {
    setSubmitState({ type: "idle" })
    setForm((current) => ({ ...current, [key]: value }))
  }

  const togglePlatform = (value: AccessRequestPlatform) => {
    setSubmitState({ type: "idle" })
    setForm((current) => ({
      ...current,
      requested_platforms: current.requested_platforms.includes(value)
        ? current.requested_platforms.filter((item) => item !== value)
        : [...current.requested_platforms, value],
    }))
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canSubmit || loading) return

    setLoading(true)
    setSubmitState({ type: "idle" })

    try {
      const usagePurposes = getUsagePurposesFromPlatforms(form.requested_platforms)
      const teamOperationsRequested = form.requested_permission_level === "project_manage"
      const payload = {
        requester_name: form.requester_name,
        requester_email_local_part: emailLocalPart,
        requester_email: requesterEmail,
        requester_division: form.organization.headquarters,
        requester_team_name: organizationLeafName,
        requester_team: organizationPathText,
        purpose: usagePurposes.join(", "),
        usage_purposes: usagePurposes,
        requested_platforms: form.requested_platforms,
        requested_permission_level: form.requested_permission_level,
        requested_hermes_reviewer: false,
        request_note: "",
        metadata: {
          form_version: "v2",
          email_domain: NASMEDIA_EMAIL_DOMAIN,
          division: form.organization.headquarters,
          team: organizationLeafName,
          organization_headquarters: form.organization.headquarters,
          organization_department: form.organization.department || null,
          organization_team: form.organization.team || null,
          organization_path: organizationPath,
          organization_path_text: organizationPathText,
          organization_selection_valid: true,
          ...organizationMetadata,
          ...organizationPolicyMetadata,
          usage_purposes: usagePurposes,
          team_operations_requested: teamOperationsRequested,
          requested_from: "admate-homepage",
          requested_product_query: requestedProduct || null,
        },
      }

      const response = await fetch("/api/access-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      const result = (await response.json()) as {
        ok?: boolean
        error?: string
        message?: string
        request_id?: string
        validation_errors?: unknown
      }

      if (!response.ok || result.ok === false) {
        setSubmitState({
          type: "error",
          message: result.message || result.error || "이용 권한 신청을 접수하지 못했습니다.",
          details: getErrorDetails(result.validation_errors),
        })
        return
      }

      setSubmitState({
        type: "success",
        message: "이용 권한 신청이 접수되었습니다. 담당자가 확인한 뒤 안내드립니다.",
        requestId: result.request_id,
      })
      setForm(formWithPreset(requestedProduct))
    } catch {
      setSubmitState({
        type: "error",
        message: "네트워크 상태를 확인한 뒤 다시 시도해 주세요.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-[#DDE2E8] bg-white p-5 shadow-[0_24px_80px_rgba(16,24,32,0.10)] sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-[#E5EAF0] pb-5">
        <div className="min-w-0">
          <div className="text-[12px] font-bold text-[#60706A]">신청서</div>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#101820]">신청 정보를 입력해 주세요</h2>
          <p className="mt-2 text-sm leading-6 text-[#5A6672]">
            입력한 내용은 담당자 확인에만 사용됩니다.
          </p>
        </div>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[8px] border border-[#DDE2E8] bg-[#F7F8FA] text-[#60706A]">
          <ClipboardList className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      <form className="mt-5 grid gap-5" onSubmit={submit}>
        <div className="grid gap-4">
          <FieldInput
            id="requester-name"
            label="이름"
            value={form.requester_name}
            placeholder="홍길동"
            icon={UserRound}
            onChange={(value) => setField("requester_name", value)}
          />

          <div className="grid gap-2">
            <label htmlFor="email-local-part" className="flex items-center gap-2 text-sm font-semibold text-[#25314A]">
              <Mail className="h-4 w-4 text-[#60706A]" aria-hidden="true" />
              업무 이메일
            </label>
            <div className="grid overflow-hidden rounded-[8px] border border-[#D7DCE3] bg-white focus-within:border-[#177D4E] focus-within:ring-2 focus-within:ring-[#E5F5ED] sm:grid-cols-[minmax(0,1fr)_auto]">
              <input
                id="email-local-part"
                name="emailLocalPart"
                type="text"
                inputMode="email"
                autoComplete="username"
                value={form.email_local_part}
                onChange={(event) => setField("email_local_part", event.target.value.replace(/@.*/, "").trim())}
                placeholder="이메일 앞부분"
                pattern="[a-zA-Z0-9._%+-]+"
                className="min-h-11 min-w-0 border-0 bg-transparent px-3 text-sm font-medium text-[#101820] outline-none placeholder:text-[#9A9A9A]"
                aria-describedby="email-help"
              />
              <div className="flex min-h-11 items-center gap-2 border-t border-[#E5E5E5] bg-[#F7F8FA] px-3 text-sm font-semibold text-[#60706A] sm:border-l sm:border-t-0">
                <AtSign className="h-4 w-4" aria-hidden="true" />
                {NASMEDIA_EMAIL_DOMAIN}
              </div>
            </div>
            <p id="email-help" className="text-xs leading-5 text-[#68707C]">
              이메일 앞부분만 입력하면 됩니다.
            </p>
          </div>
        </div>

        <OrganizationPicker value={form.organization} onChange={(value) => setField("organization", value)} />

        <fieldset className="grid gap-3">
          <legend className="flex items-center gap-2 text-sm font-semibold text-[#25314A]">
            <ShieldCheck className="h-4 w-4 text-[#60706A]" aria-hidden="true" />
            필요한 제품
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {requestProducts.map((product) => {
              const Icon = product.icon
              const productId = product.id as AccessRequestPlatform
              const checked = form.requested_platforms.includes(productId)

              return (
                <label
                  key={product.id}
                  className="grid min-h-[104px] cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-[8px] border border-[#D7DCE3] bg-[#F7F8FA] p-3 transition hover:border-[#B8C7BE] hover:bg-white has-[:checked]:border-[#101820] has-[:checked]:bg-white"
                >
                  <input
                    type="checkbox"
                    name="products"
                    value={product.id}
                    checked={checked}
                    onChange={() => togglePlatform(productId)}
                    className="mt-1 h-4 w-4 rounded border-[#B8C7BE]"
                    style={{ accentColor: product.color }}
                  />
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 text-sm font-semibold text-[#101820]">
                      <Icon className="h-4 w-4 shrink-0" style={{ color: product.color }} aria-hidden="true" />
                      {product.shortName}
                    </span>
                    <span className="mt-2 block text-xs leading-5 text-[#5E5E5E]">{product.tagline}</span>
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <fieldset className="grid gap-3">
          <legend className="flex items-center gap-2 text-sm font-semibold text-[#25314A]">
            <ShieldCheck className="h-4 w-4 text-[#60706A]" aria-hidden="true" />
            필요한 이용 범위
          </legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {permissionLevels.map((level) => {
              const selected = form.requested_permission_level === level.key

              return (
                <button
                  key={level.key}
                  type="button"
                  onClick={() => setField("requested_permission_level", level.key)}
                  className={`min-h-[96px] rounded-[8px] border p-3 text-left transition ${
                    selected
                      ? "border-[#101820] bg-[#F7F8FA] text-[#101820]"
                      : "border-[#D7DCE3] bg-white text-[#25314A] hover:border-[#B8C7BE]"
                  }`}
                >
                  <span className="block text-sm font-bold">{level.label}</span>
                  <span className="mt-2 block text-xs leading-5 text-[#5E5E5E]">{level.description}</span>
                </button>
              )
            })}
          </div>
        </fieldset>

        {submitState.type === "success" ? (
          <div className="rounded-[8px] border border-[#9FE5C1] bg-[#EFFAF4] p-4 text-sm leading-6 text-[#177D4E]">
            <div className="flex gap-2 font-semibold">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {submitState.message}
                {submitState.requestId ? ` 접수번호: ${submitState.requestId}` : ""}
              </span>
            </div>
          </div>
        ) : null}

        {submitState.type === "error" ? (
          <div className="rounded-[8px] border border-[#F5CE8B] bg-[#FFF8EC] p-4 text-sm leading-6 text-[#735A31]">
            <div className="flex gap-2 font-semibold text-[#9E5700]">
              <CircleAlert className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{submitState.message}</span>
            </div>
            {submitState.details?.length ? (
              <ul className="mt-2 list-disc pl-5 text-xs leading-5">
                {submitState.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        <Button type="submit" disabled={!canSubmit || loading} className="h-11 w-full bg-[#101820] text-white hover:bg-[#26342E]">
          {loading ? "신청 접수 중..." : "이용 권한 신청"}
        </Button>
      </form>
    </Card>
  )
}

function FieldInput({
  id,
  label,
  value,
  placeholder,
  icon: Icon,
  onChange,
}: {
  id: string
  label: string
  value: string
  placeholder: string
  icon: typeof UserRound
  onChange: (value: string) => void
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-semibold text-[#25314A]">
        <Icon className="h-4 w-4 text-[#60706A]" aria-hidden="true" />
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-11 rounded-[8px] border border-[#D7DCE3] bg-white px-3 text-sm font-medium text-[#101820] outline-none placeholder:text-[#9A9A9A] focus:border-[#177D4E] focus:ring-2 focus:ring-[#E5F5ED]"
      />
    </div>
  )
}
