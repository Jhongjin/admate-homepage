"use client"

import { FormEvent, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  AtSign,
  Building2,
  CheckCircle2,
  CircleAlert,
  ClipboardList,
  FileText,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { products } from "@/lib/admate-content"
import {
  ACCESS_REQUEST_DIVISIONS,
  ACCESS_REQUEST_PRODUCT_PRESETS,
  ACCESS_REQUEST_USAGE_PURPOSES,
  HOME_ACCESS_REQUEST_PRODUCTS,
  NASMEDIA_EMAIL_DOMAIN,
  isEmailLocalPart,
  mergeUnique,
  type AccessRequestPlatform,
  type RequestedPermissionLevel,
} from "@/lib/access-request-contract"

type AccessRequestFormState = {
  requester_name: string
  email_local_part: string
  requester_division: string
  requester_team_name: string
  usage_purposes: string[]
  requested_platforms: AccessRequestPlatform[]
  requested_permission_level: RequestedPermissionLevel
  requested_hermes_reviewer: boolean
  request_note: string
}

type SubmitState =
  | { type: "idle" }
  | { type: "success"; message: string; requestId?: string }
  | { type: "error"; message: string; details?: string[] }

const initialForm: AccessRequestFormState = {
  requester_name: "",
  email_local_part: "",
  requester_division: "",
  requester_team_name: "",
  usage_purposes: [],
  requested_platforms: [],
  requested_permission_level: "view",
  requested_hermes_reviewer: false,
  request_note: "",
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
    label: "조회",
    description: "허용된 제품 화면과 운영 상태를 확인합니다.",
  },
  {
    key: "operate",
    label: "입력/운영",
    description: "담당 범위의 데이터를 입력하고 운영합니다.",
  },
  {
    key: "project_manage",
    label: "프로젝트 관리",
    description: "제품 운영 관리 권한 검토를 요청합니다.",
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
    usage_purposes: mergeUnique(initialForm.usage_purposes, preset.usage_purposes),
  }
}

function getErrorDetails(value: unknown) {
  if (!Array.isArray(value)) return undefined
  return value.map((item) => String(item)).filter(Boolean).slice(0, 5)
}

export function AccessRequestForm() {
  const searchParams = useSearchParams()
  const requestedProduct = normalizeProductParam(searchParams.get("product") || searchParams.get("platform"))
  const [form, setForm] = useState<AccessRequestFormState>(() => formWithPreset(requestedProduct))
  const [loading, setLoading] = useState(false)
  const [submitState, setSubmitState] = useState<SubmitState>({ type: "idle" })

  const emailLocalPart = form.email_local_part.trim().toLowerCase().replace(/@.*/, "")
  const requesterEmail = emailLocalPart ? `${emailLocalPart}@${NASMEDIA_EMAIL_DOMAIN}` : ""
  const requesterTeam = [form.requester_division, form.requester_team_name.trim()].filter(Boolean).join(" / ")
  const canSubmit = useMemo(
    () =>
      Boolean(
        form.requester_name.trim() &&
          emailLocalPart &&
          isEmailLocalPart(emailLocalPart) &&
          form.requester_division &&
          form.requester_team_name.trim() &&
          form.usage_purposes.length > 0 &&
          form.requested_platforms.length > 0,
      ),
    [emailLocalPart, form],
  )

  const setField = <K extends keyof AccessRequestFormState>(key: K, value: AccessRequestFormState[K]) => {
    setSubmitState({ type: "idle" })
    setForm((current) => ({ ...current, [key]: value }))
  }

  const toggleUsagePurpose = (value: string) => {
    setSubmitState({ type: "idle" })
    setForm((current) => ({
      ...current,
      usage_purposes: current.usage_purposes.includes(value)
        ? current.usage_purposes.filter((item) => item !== value)
        : [...current.usage_purposes, value],
    }))
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
      const payload = {
        requester_name: form.requester_name,
        requester_email_local_part: emailLocalPart,
        requester_email: requesterEmail,
        requester_division: form.requester_division,
        requester_team_name: form.requester_team_name,
        requester_team: requesterTeam,
        purpose: form.usage_purposes.join(", "),
        usage_purposes: form.usage_purposes,
        requested_platforms: form.requested_platforms,
        requested_permission_level: form.requested_permission_level,
        requested_hermes_reviewer: form.requested_hermes_reviewer,
        request_note: form.request_note,
        metadata: {
          form_version: "v2",
          email_domain: NASMEDIA_EMAIL_DOMAIN,
          division: form.requester_division,
          team: form.requester_team_name,
          usage_purposes: form.usage_purposes,
          requested_from: "admate-homepage",
          requested_product_query: requestedProduct || null,
          nasmedia_default_viewer_candidate: form.requester_division === "나스미디어",
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
        request_id?: string
        validation_errors?: unknown
      }

      if (!response.ok || result.ok === false) {
        setSubmitState({
          type: "error",
          message: result.error || "이용 권한 요청을 접수하지 못했습니다.",
          details: getErrorDetails(result.validation_errors),
        })
        return
      }

      setSubmitState({
        type: "success",
        message: "이용 권한 요청이 접수되었습니다. 담당자가 검토한 뒤 필요한 권한을 안내합니다.",
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
    <Card className="border-[#C9BFAF] bg-white p-5 shadow-[0_24px_80px_rgba(16,24,32,0.10)] sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-[#E2DACF] pb-5">
        <div className="min-w-0">
          <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8A765B]">Request form</div>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#101820]">이용 권한 요청서</h2>
          <p className="mt-2 text-sm leading-6 text-[#5E5E5E]">
            신청 내용은 담당자가 검토하며 승인 후 제품별 접근 범위를 안내합니다.
          </p>
        </div>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[8px] border border-[#D6CCBC] bg-[#F8F6F1] text-[#60706A]">
          <ClipboardList className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      <form className="mt-5 grid gap-5" onSubmit={submit}>
        <div className="grid gap-4 sm:grid-cols-2">
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
              회사 이메일
            </label>
            <div className="grid overflow-hidden rounded-[8px] border border-[#D7DCE3] bg-white focus-within:border-[#5E6AD2] focus-within:ring-2 focus-within:ring-[#ECEDF9] sm:grid-cols-[minmax(0,1fr)_auto]">
              <input
                id="email-local-part"
                name="emailLocalPart"
                type="text"
                inputMode="email"
                autoComplete="username"
                value={form.email_local_part}
                onChange={(event) => setField("email_local_part", event.target.value.replace(/@.*/, "").trim())}
                placeholder="local-part"
                pattern="[a-zA-Z0-9._%+-]+"
                className="min-h-11 min-w-0 border-0 bg-transparent px-3 text-sm font-medium text-[#101820] outline-none placeholder:text-[#9A9A9A]"
                aria-describedby="email-help"
              />
              <div className="flex min-h-11 items-center gap-2 border-t border-[#E5E5E5] bg-[#F8F6F1] px-3 text-sm font-semibold text-[#60706A] sm:border-l sm:border-t-0">
                <AtSign className="h-4 w-4" aria-hidden="true" />
                {NASMEDIA_EMAIL_DOMAIN}
              </div>
            </div>
            <p id="email-help" className="text-xs leading-5 text-[#68707C]">
              회사 도메인은 고정입니다. 앞부분만 입력하세요.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="requester-division" className="flex items-center gap-2 text-sm font-semibold text-[#25314A]">
              <Building2 className="h-4 w-4 text-[#60706A]" aria-hidden="true" />
              소속 실
            </label>
            <select
              id="requester-division"
              value={form.requester_division}
              onChange={(event) => setField("requester_division", event.target.value)}
              className="min-h-11 rounded-[8px] border border-[#D7DCE3] bg-white px-3 text-sm font-medium text-[#101820] outline-none focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#ECEDF9]"
            >
              <option value="">소속 실 선택</option>
              {ACCESS_REQUEST_DIVISIONS.map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>

          <FieldInput
            id="requester-team"
            label="부서/팀"
            value={form.requester_team_name}
            placeholder="Data Analytics Team"
            icon={Building2}
            onChange={(value) => setField("requester_team_name", value)}
          />
        </div>

        <fieldset className="grid gap-3">
          <legend className="flex items-center gap-2 text-sm font-semibold text-[#25314A]">
            <ShieldCheck className="h-4 w-4 text-[#60706A]" aria-hidden="true" />
            요청 제품
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {requestProducts.map((product) => {
              const Icon = product.icon
              const productId = product.id as AccessRequestPlatform
              const checked = form.requested_platforms.includes(productId)

              return (
                <label
                  key={product.id}
                  className="grid min-h-[104px] cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-[8px] border border-[#D7DCE3] bg-[#FBFAF7] p-3 transition hover:border-[#B8C7BE] hover:bg-white has-[:checked]:border-[#101820] has-[:checked]:bg-white"
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
                    <span className="mt-1 block text-xs font-semibold leading-5 text-[#68707C]">{product.subtitle}</span>
                    <span className="mt-2 block text-xs leading-5 text-[#5E5E5E]">{product.tagline}</span>
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <fieldset className="grid gap-3">
          <legend className="flex items-center gap-2 text-sm font-semibold text-[#25314A]">
            <FileText className="h-4 w-4 text-[#60706A]" aria-hidden="true" />
            사용 목적
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {ACCESS_REQUEST_USAGE_PURPOSES.map((purpose) => {
              const checked = form.usage_purposes.includes(purpose)

              return (
                <label
                  key={purpose}
                  className="flex min-h-11 cursor-pointer items-center gap-2 rounded-[8px] border border-[#D7DCE3] bg-white px-3 py-2 text-sm font-semibold text-[#25314A] transition hover:border-[#B8C7BE] has-[:checked]:border-[#5E6AD2] has-[:checked]:bg-[#ECEDF9] has-[:checked]:text-[#3943A8]"
                >
                  <input
                    type="checkbox"
                    name="usagePurposes"
                    value={purpose}
                    checked={checked}
                    onChange={() => toggleUsagePurpose(purpose)}
                    className="h-4 w-4 rounded border-[#B8C7BE]"
                    style={{ accentColor: "#5E6AD2" }}
                  />
                  {purpose}
                </label>
              )
            })}
          </div>
        </fieldset>

        <fieldset className="grid gap-3">
          <legend className="flex items-center gap-2 text-sm font-semibold text-[#25314A]">
            <ShieldCheck className="h-4 w-4 text-[#60706A]" aria-hidden="true" />
            요청 권한
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
                      ? "border-[#101820] bg-[#FBFAF7] text-[#101820]"
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

        <label className="grid gap-2 rounded-[8px] border border-[#D7DCE3] bg-[#FBFAF7] p-3">
          <span className="flex items-center gap-2 text-sm font-semibold text-[#25314A]">
            <input
              type="checkbox"
              checked={form.requested_hermes_reviewer}
              onChange={(event) => setField("requested_hermes_reviewer", event.target.checked)}
              className="h-4 w-4 rounded border-[#B8C7BE]"
              style={{ accentColor: "#5E6AD2" }}
            />
            운영 관리 권한도 요청
          </span>
          <span className="pl-6 text-xs leading-5 text-[#68707C]">
            제품 운영 관리나 검토 업무가 필요한 경우 선택하세요. 실제 권한은 승인 단계에서 확정됩니다.
          </span>
        </label>

        <div className="grid gap-2">
          <label htmlFor="request-note" className="flex items-center gap-2 text-sm font-semibold text-[#25314A]">
            <FileText className="h-4 w-4 text-[#60706A]" aria-hidden="true" />
            요청 사유 / 추가 메모
          </label>
          <textarea
            id="request-note"
            name="requestNote"
            rows={5}
            value={form.request_note}
            onChange={(event) => setField("request_note", event.target.value)}
            placeholder="업무 목적, 필요한 접근 범위, 사용 예정 제품을 간단히 적어주세요."
            className="min-h-[132px] resize-y rounded-[8px] border border-[#D7DCE3] bg-white px-3 py-3 text-sm font-medium leading-6 text-[#101820] outline-none placeholder:text-[#9A9A9A] focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#ECEDF9]"
          />
          <p className="text-xs leading-5 text-[#68707C]">
            광고주, 캠페인, 계정 식별값 같은 민감 정보는 입력하지 않아도 됩니다.
          </p>
        </div>

        {submitState.type === "success" ? (
          <div className="rounded-[8px] border border-[#9FE5C1] bg-[#EFFAF4] p-4 text-sm leading-6 text-[#177D4E]">
            <div className="flex gap-2 font-semibold">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{submitState.message}</span>
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
          {loading ? "요청 접수 중..." : "이용 권한 요청 제출"}
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
        className="min-h-11 rounded-[8px] border border-[#D7DCE3] bg-white px-3 text-sm font-medium text-[#101820] outline-none placeholder:text-[#9A9A9A] focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#ECEDF9]"
      />
    </div>
  )
}
