export type AccessRequestOrganizationCategory =
  | "ad_planner"
  | "media_admin"
  | "executive_viewer"
  | "non_ad"
  | "platform"
  | "management"
  | "audit"
  | "support"
  | "unknown"

export type AccessRequestOrganizationNode = {
  name: string
  code: string
  category?: AccessRequestOrganizationCategory
  children?: readonly AccessRequestOrganizationNode[]
}

export type AccessRequestOrganizationSelection = {
  headquarters: string
  department: string
  team: string
}

const adPlannerCategory = "ad_planner" satisfies AccessRequestOrganizationCategory
const platformCategory = "platform" satisfies AccessRequestOrganizationCategory
const managementCategory = "management" satisfies AccessRequestOrganizationCategory

export const ACCESS_REQUEST_ORGANIZATION_TREE: readonly AccessRequestOrganizationNode[] = [
  {
    name: "감사실",
    code: "audit_office",
    category: "audit",
  },
  {
    name: "경영기획본부",
    code: "management_planning_hq",
    category: managementCategory,
    children: [
      { name: "경영기획팀", code: "management_planning_team", category: managementCategory },
      { name: "인재경영팀", code: "people_management_team", category: managementCategory },
      { name: "경영지원팀", code: "management_support_team", category: managementCategory },
      { name: "재무팀", code: "finance_team", category: managementCategory },
      { name: "회계팀", code: "accounting_team", category: managementCategory },
      { name: "자금팀", code: "treasury_team", category: managementCategory },
    ],
  },
  {
    name: "광고1본부",
    code: "ad_hq_1",
    category: adPlannerCategory,
    children: [
      {
        name: "1실",
        code: "ad_hq_1_office_1",
        category: adPlannerCategory,
        children: [
          { name: "1팀(유혜민팀)", code: "ad_hq_1_office_1_team_01", category: adPlannerCategory },
          { name: "2팀(남기욱팀)", code: "ad_hq_1_office_1_team_02", category: adPlannerCategory },
          { name: "3팀(이대로팀)", code: "ad_hq_1_office_1_team_03", category: adPlannerCategory },
          { name: "넥서스팀", code: "ad_hq_1_office_1_nexus_team", category: adPlannerCategory },
        ],
      },
      {
        name: "2실",
        code: "ad_hq_1_office_2",
        category: adPlannerCategory,
        children: [
          { name: "5팀(부현석팀)", code: "ad_hq_1_office_2_team_05", category: adPlannerCategory },
          { name: "6팀(황연하팀)", code: "ad_hq_1_office_2_team_06", category: adPlannerCategory },
          { name: "7팀(이태석팀)", code: "ad_hq_1_office_2_team_07", category: adPlannerCategory },
        ],
      },
      {
        name: "3실",
        code: "ad_hq_1_office_3",
        category: adPlannerCategory,
        children: [
          { name: "8팀(임배현팀)", code: "ad_hq_1_office_3_team_08", category: adPlannerCategory },
          { name: "9팀(황운주팀)", code: "ad_hq_1_office_3_team_09", category: adPlannerCategory },
          { name: "10팀(김정인팀)", code: "ad_hq_1_office_3_team_10", category: adPlannerCategory },
        ],
      },
    ],
  },
  {
    name: "광고2본부",
    code: "ad_hq_2",
    category: adPlannerCategory,
    children: [
      {
        name: "4실",
        code: "ad_hq_2_office_4",
        category: adPlannerCategory,
        children: [
          { name: "1팀(최경미팀)", code: "ad_hq_2_office_4_team_01", category: adPlannerCategory },
          { name: "2팀(이수진팀)", code: "ad_hq_2_office_4_team_02", category: adPlannerCategory },
          { name: "3팀(김선영팀)", code: "ad_hq_2_office_4_team_03", category: adPlannerCategory },
          { name: "4팀(김종섭팀)", code: "ad_hq_2_office_4_team_04", category: adPlannerCategory },
        ],
      },
      {
        name: "5실",
        code: "ad_hq_2_office_5",
        category: adPlannerCategory,
        children: [
          { name: "5팀(장규민팀)", code: "ad_hq_2_office_5_team_05", category: adPlannerCategory },
          { name: "6팀(장태준팀)", code: "ad_hq_2_office_5_team_06", category: adPlannerCategory },
          { name: "7팀(우희철팀)", code: "ad_hq_2_office_5_team_07", category: adPlannerCategory },
          { name: "8팀(최지훈팀)", code: "ad_hq_2_office_5_team_08", category: adPlannerCategory },
        ],
      },
      {
        name: "6실",
        code: "ad_hq_2_office_6",
        category: adPlannerCategory,
        children: [
          { name: "9팀(박민용팀)", code: "ad_hq_2_office_6_team_09", category: adPlannerCategory },
          { name: "10팀(이창민팀)", code: "ad_hq_2_office_6_team_10", category: adPlannerCategory },
          { name: "11팀(박연주팀)", code: "ad_hq_2_office_6_team_11", category: adPlannerCategory },
          { name: "MIC", code: "ad_hq_2_office_6_mic", category: "non_ad" },
        ],
      },
    ],
  },
  {
    name: "광고3본부",
    code: "ad_hq_3",
    category: adPlannerCategory,
    children: [
      {
        name: "C레벨 컨설팅실",
        code: "ad_hq_3_c_level_consulting_office",
        category: adPlannerCategory,
        children: [
          { name: "전략&컨설팅1팀", code: "ad_hq_3_strategy_consulting_team_01", category: adPlannerCategory },
          { name: "전략&컨설팅2팀", code: "ad_hq_3_strategy_consulting_team_02", category: adPlannerCategory },
          { name: "전략&컨설팅3팀", code: "ad_hq_3_strategy_consulting_team_03", category: adPlannerCategory },
          { name: "디지털&OOH팀", code: "ad_hq_3_digital_ooh_team", category: adPlannerCategory },
        ],
      },
      {
        name: "모바일마케팅실",
        code: "ad_hq_3_mobile_marketing_office",
        category: adPlannerCategory,
        children: [
          { name: "모바일마케팅1팀", code: "ad_hq_3_mobile_marketing_team_01", category: adPlannerCategory },
          { name: "모바일마케팅2팀", code: "ad_hq_3_mobile_marketing_team_02", category: adPlannerCategory },
          { name: "모바일마케팅3팀", code: "ad_hq_3_mobile_marketing_team_03", category: adPlannerCategory },
        ],
      },
    ],
  },
  {
    name: "미디어본부",
    code: "media_hq",
    category: "non_ad",
    children: [
      {
        name: "미디어사업전략실",
        code: "media_business_strategy_office",
        category: "non_ad",
        children: [
          { name: "미디어기획팀", code: "media_planning_team", category: "non_ad" },
          { name: "OOH매체사업팀", code: "ooh_media_business_team", category: "non_ad" },
          { name: "미디어인사이트팀", code: "media_insight_team", category: "non_ad" },
        ],
      },
      {
        name: "미디어채널실",
        code: "media_channel_office",
        category: "non_ad",
        children: [
          { name: "미디어채널1팀", code: "media_channel_team_01", category: "non_ad" },
          { name: "미디어채널2팀", code: "media_channel_team_02", category: "non_ad" },
          { name: "데이터분석팀", code: "media_data_analytics_team", category: "media_admin" },
        ],
      },
    ],
  },
  {
    name: "플랫폼사업본부",
    code: "platform_business_hq",
    category: platformCategory,
    children: [
      {
        name: "플랫폼사업1실",
        code: "platform_business_office_1",
        category: platformCategory,
        children: [
          { name: "nap cps팀", code: "platform_business_office_1_nap_cps_team", category: platformCategory },
          { name: "nap reward팀", code: "platform_business_office_1_nap_reward_team", category: platformCategory },
        ],
      },
      {
        name: "플랫폼사업2실",
        code: "platform_business_office_2",
        category: platformCategory,
        children: [
          { name: "nap dsp팀", code: "platform_business_office_2_nap_dsp_team", category: platformCategory },
          { name: "nap mx팀", code: "platform_business_office_2_nap_mx_team", category: platformCategory },
          { name: "nap ua TF", code: "platform_business_office_2_nap_ua_tf", category: platformCategory },
        ],
      },
      {
        name: "플랫폼개발실",
        code: "platform_development_office",
        category: platformCategory,
        children: [
          { name: "dsp개발팀", code: "platform_dsp_development_team", category: platformCategory },
          { name: "mx개발팀", code: "platform_mx_development_team", category: platformCategory },
          { name: "cps개발팀", code: "platform_cps_development_team", category: platformCategory },
          { name: "reward개발팀", code: "platform_reward_development_team", category: platformCategory },
        ],
      },
      {
        name: "AX전략실",
        code: "ax_strategy_office",
        category: platformCategory,
        children: [
          { name: "서비스기획팀", code: "ax_service_planning_team", category: platformCategory },
          { name: "매체개발TF", code: "ax_media_development_tf", category: platformCategory },
          { name: "AX사업개발1팀", code: "ax_business_development_team_01", category: platformCategory },
          { name: "AX사업개발2팀", code: "ax_business_development_team_02", category: platformCategory },
        ],
      },
      {
        name: "ICT기획실",
        code: "ict_planning_office",
        category: platformCategory,
        children: [
          { name: "IT운영팀", code: "it_operations_team", category: platformCategory },
          { name: "정보보호팀", code: "information_security_team", category: platformCategory },
          { name: "ICT개발팀", code: "ict_development_team", category: platformCategory },
        ],
      },
    ],
  },
]

export const ACCESS_REQUEST_ORGANIZATION_HEADQUARTERS = ACCESS_REQUEST_ORGANIZATION_TREE.map((node) => node.name)

export function getAccessRequestDepartmentOptions(headquarters: string): readonly AccessRequestOrganizationNode[] {
  return ACCESS_REQUEST_ORGANIZATION_TREE.find((node) => node.name === headquarters)?.children ?? []
}

export function getAccessRequestTeamOptions(headquarters: string, department: string): readonly AccessRequestOrganizationNode[] {
  return getAccessRequestDepartmentOptions(headquarters).find((node) => node.name === department)?.children ?? []
}

export function getAccessRequestOrganizationPath(selection: AccessRequestOrganizationSelection): string[] {
  return [selection.headquarters, selection.department, selection.team].map((item) => item.trim()).filter(Boolean)
}

export function formatAccessRequestOrganizationPath(selection: AccessRequestOrganizationSelection) {
  return getAccessRequestOrganizationPath(selection).join(" / ")
}

export function getAccessRequestOrganizationNodePath(selection: AccessRequestOrganizationSelection) {
  const nodePath: AccessRequestOrganizationNode[] = []
  let nodes: readonly AccessRequestOrganizationNode[] = ACCESS_REQUEST_ORGANIZATION_TREE

  for (const name of getAccessRequestOrganizationPath(selection)) {
    const node = nodes.find((item) => item.name === name)
    if (!node) break
    nodePath.push(node)
    nodes = node.children ?? []
  }

  return nodePath
}

export function getAccessRequestOrganizationMetadata(selection: AccessRequestOrganizationSelection) {
  const nodePath = getAccessRequestOrganizationNodePath(selection)
  const leaf = nodePath[nodePath.length - 1]
  let category: AccessRequestOrganizationCategory = "unknown"

  for (const node of nodePath) {
    if (node.category) category = node.category
  }

  return {
    organization_code_path: nodePath.map((node) => node.code),
    organization_leaf_code: leaf?.code ?? null,
    organization_category: category,
    organization_primary_user_org: category === "ad_planner",
    organization_admin_org: category === "media_admin",
    organization_non_ad_org: ["audit", "management", "non_ad", "platform", "support"].includes(category),
  }
}

export function isAccessRequestOrganizationSelectionComplete(selection: AccessRequestOrganizationSelection) {
  if (!selection.headquarters) return false

  const departments = getAccessRequestDepartmentOptions(selection.headquarters)
  if (departments.length === 0) return true
  if (!selection.department) return false

  const teams = getAccessRequestTeamOptions(selection.headquarters, selection.department)
  return teams.length === 0 || Boolean(selection.team)
}
