import { NextResponse } from "next/server"

import {
  normalizeAccessRequestInput,
  validateAccessRequestInput,
  type AccessRequestInput,
} from "../../../lib/access-request-contract"

export const dynamic = "force-dynamic"

const DEFAULT_SENTINEL_INTAKE_URL = "https://sentinel.admate.ai.kr/api/access-requests"
const ALLOWED_INTAKE_HOSTS = new Set(["sentinel.admate.ai.kr", "localhost", "127.0.0.1"])
const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
}

function parseJson(text: string) {
  if (!text) return null

  try {
    return JSON.parse(text) as Record<string, unknown>
  } catch {
    return null
  }
}

function intakeEndpoint() {
  const rawUrl = process.env.ADMATE_ACCESS_REQUEST_INTAKE_URL || DEFAULT_SENTINEL_INTAKE_URL
  const url = new URL(rawUrl)

  if (!["https:", "http:"].includes(url.protocol)) {
    throw new Error("invalid intake endpoint protocol")
  }

  if (!ALLOWED_INTAKE_HOSTS.has(url.hostname)) {
    throw new Error("invalid intake endpoint host")
  }

  if (url.protocol === "http:" && !["localhost", "127.0.0.1"].includes(url.hostname)) {
    throw new Error("insecure intake endpoint")
  }

  return url
}

function errorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error || "unknown error")
}

function publicError(error: unknown) {
  const message = errorMessage(error)

  if (message.includes("endpoint")) {
    return "권한 요청 접수 경로 설정을 확인할 수 없습니다."
  }

  if (message.includes("fetch failed") || message.includes("The operation was aborted")) {
    return "권한 요청 접수 시스템에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요."
  }

  return "권한 요청 접수 중 문제가 발생했습니다."
}

export async function POST(req: Request) {
  try {
    let body: AccessRequestInput

    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { ok: false, error: "요청 내용을 확인할 수 없습니다." },
        { status: 400, headers: NO_STORE_HEADERS },
      )
    }

    const input = normalizeAccessRequestInput(body)
    const validationErrors = validateAccessRequestInput(input)

    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "입력값을 확인해 주세요.",
          validation_errors: validationErrors,
        },
        { status: 400, headers: NO_STORE_HEADERS },
      )
    }

    const endpoint = intakeEndpoint()
    const payload = {
      ...input,
      metadata: {
        ...input.metadata,
        source: "admate-homepage",
        forwarded_by: "admate-homepage",
      },
    }

    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    })
    const responseText = await upstream.text()
    const responseJson = parseJson(responseText)

    if (!upstream.ok || responseJson?.ok === false) {
      const upstreamError = typeof responseJson?.error === "string" ? responseJson.error : null
      const status = upstream.status === 409 ? 409 : upstream.status >= 400 && upstream.status < 500 ? 400 : 502

      return NextResponse.json(
        {
          ok: false,
          error:
            upstreamError === "pending request already exists"
              ? "이미 검토 중인 이용 권한 요청이 있습니다."
              : "권한 요청을 접수하지 못했습니다. 입력 내용을 확인하거나 잠시 후 다시 시도해 주세요.",
          request_id: responseJson?.request_id ?? null,
          request_status: responseJson?.request_status ?? null,
          validation_errors: responseJson?.validation_errors ?? undefined,
        },
        { status, headers: NO_STORE_HEADERS },
      )
    }

    return NextResponse.json(
      {
        ok: true,
        request_id: responseJson?.request_id ?? null,
        request_status: responseJson?.request_status ?? "pending",
      },
      { status: 201, headers: NO_STORE_HEADERS },
    )
  } catch (error) {
    console.error("[api/access-requests][POST]", errorMessage(error))

    return NextResponse.json(
      {
        ok: false,
        error: publicError(error),
      },
      { status: 502, headers: NO_STORE_HEADERS },
    )
  }
}

