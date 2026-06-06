export const COMMAND_CENTER_READINESS_MANIFEST_VERSION = "cc-readiness-manifest-v1"

export type CommandCenterReadinessProductId =
  | "sentinel"
  | "compass"
  | "lens"
  | "foresight"
  | "creative_studio"

export type CommandCenterReadinessStatus = "ready" | "watch" | "blocked"
export type CommandCenterReadinessLevel = "static_ready" | "static_watch" | "static_blocked"

export type CommandCenterReadinessReasonCode =
  | "local_contract"
  | "static_fixture"
  | "public_copy"
  | "sanitized_summary"
  | "review_queue"
  | "readiness_pending"

export type CommandCenterReadinessCounts = {
  total: number
  ready: number
  watch: number
  blocked: number
}

export type CommandCenterReadinessSafetyFlags = {
  localOnly: true
  staticOnly: true
  publicSafe: true
  sanitizedOnly: true
  noLiveData: true
  noAuth: true
  noEnvRead: true
  noProductionApi: true
  noDbRead: true
  noDbWrite: true
  noProviderCall: true
  noWorkflowExecution: true
  noPersistence: true
  noPublish: true
  noApplyOrPromote: true
  noMediaAssetRead: true
}

export type CommandCenterReadinessProduct = {
  id: CommandCenterReadinessProductId
  label: string
  status: CommandCenterReadinessStatus
  readiness: CommandCenterReadinessLevel
  counts: CommandCenterReadinessCounts
  reasonCodes: CommandCenterReadinessReasonCode[]
}

export type CommandCenterReadinessManifest = {
  contractVersion: typeof COMMAND_CENTER_READINESS_MANIFEST_VERSION
  scope: "public_static_command_center_readiness"
  status: CommandCenterReadinessStatus
  products: Record<CommandCenterReadinessProductId, CommandCenterReadinessProduct>
  counts: CommandCenterReadinessCounts & {
    productLanes: number
  }
  safetyFlags: CommandCenterReadinessSafetyFlags
}

export const commandCenterReadinessManifest = {
  "contractVersion": "cc-readiness-manifest-v1",
  "scope": "public_static_command_center_readiness",
  "status": "ready",
  "products": {
    "sentinel": {
      "id": "sentinel",
      "label": "AdMate Sentinel",
      "status": "ready",
      "readiness": "static_ready",
      "counts": {
        "total": 4,
        "ready": 4,
        "watch": 0,
        "blocked": 0
      },
      "reasonCodes": ["local_contract", "static_fixture", "public_copy", "sanitized_summary"]
    },
    "compass": {
      "id": "compass",
      "label": "AdMate Compass",
      "status": "ready",
      "readiness": "static_ready",
      "counts": {
        "total": 4,
        "ready": 4,
        "watch": 0,
        "blocked": 0
      },
      "reasonCodes": ["local_contract", "static_fixture", "public_copy", "sanitized_summary"]
    },
    "lens": {
      "id": "lens",
      "label": "AdMate Lens",
      "status": "watch",
      "readiness": "static_watch",
      "counts": {
        "total": 4,
        "ready": 3,
        "watch": 1,
        "blocked": 0
      },
      "reasonCodes": ["local_contract", "static_fixture", "sanitized_summary", "review_queue"]
    },
    "foresight": {
      "id": "foresight",
      "label": "AdMate Foresight",
      "status": "watch",
      "readiness": "static_watch",
      "counts": {
        "total": 4,
        "ready": 2,
        "watch": 2,
        "blocked": 0
      },
      "reasonCodes": ["local_contract", "static_fixture", "sanitized_summary", "readiness_pending"]
    },
    "creative_studio": {
      "id": "creative_studio",
      "label": "AdMate Creative Studio",
      "status": "ready",
      "readiness": "static_ready",
      "counts": {
        "total": 4,
        "ready": 4,
        "watch": 0,
        "blocked": 0
      },
      "reasonCodes": ["local_contract", "static_fixture", "public_copy", "sanitized_summary"]
    }
  },
  "counts": {
    "productLanes": 5,
    "total": 20,
    "ready": 17,
    "watch": 3,
    "blocked": 0
  },
  "safetyFlags": {
    "localOnly": true,
    "staticOnly": true,
    "publicSafe": true,
    "sanitizedOnly": true,
    "noLiveData": true,
    "noAuth": true,
    "noEnvRead": true,
    "noProductionApi": true,
    "noDbRead": true,
    "noDbWrite": true,
    "noProviderCall": true,
    "noWorkflowExecution": true,
    "noPersistence": true,
    "noPublish": true,
    "noApplyOrPromote": true,
    "noMediaAssetRead": true
  }
} as const satisfies CommandCenterReadinessManifest
