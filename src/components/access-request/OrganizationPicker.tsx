"use client"

import { Building2 } from "lucide-react"

import {
  ACCESS_REQUEST_ORGANIZATION_HEADQUARTERS,
  getAccessRequestDepartmentOptions,
  getAccessRequestTeamOptions,
  type AccessRequestOrganizationSelection,
} from "@/lib/access-request-organization"

type OrganizationPickerProps = {
  value: AccessRequestOrganizationSelection
  onChange: (value: AccessRequestOrganizationSelection) => void
}

export function OrganizationPicker({ value, onChange }: OrganizationPickerProps) {
  const departments = getAccessRequestDepartmentOptions(value.headquarters)
  const teams = getAccessRequestTeamOptions(value.headquarters, value.department)

  const setHeadquarters = (headquarters: string) => {
    onChange({
      headquarters,
      department: "",
      team: "",
    })
  }

  const setDepartment = (department: string) => {
    onChange({
      ...value,
      department,
      team: "",
    })
  }

  return (
    <fieldset className="grid gap-3">
      <legend className="flex items-center gap-2 text-sm font-semibold text-[#25314A]">
        <Building2 className="h-4 w-4 text-[#60706A]" aria-hidden="true" />
        소속
      </legend>
      <div className="grid min-w-0 gap-3 sm:grid-cols-3">
        <label className="grid min-w-0 gap-2">
          <span className="text-xs font-semibold text-[#5A6672]">본부/조직</span>
          <select
            value={value.headquarters}
            onChange={(event) => setHeadquarters(event.target.value)}
            className="min-h-11 w-full min-w-0 rounded-[8px] border border-[#D7DCE3] bg-white px-3 text-sm font-medium text-[#101820] outline-none focus:border-[#177D4E] focus:ring-2 focus:ring-[#E5F5ED]"
            aria-label="본부 또는 조직"
          >
            <option value="">본부 또는 조직 선택</option>
            {ACCESS_REQUEST_ORGANIZATION_HEADQUARTERS.map((headquarters) => (
              <option key={headquarters} value={headquarters}>
                {headquarters}
              </option>
            ))}
          </select>
        </label>

        <label className="grid min-w-0 gap-2">
          <span className="text-xs font-semibold text-[#5A6672]">실/부서</span>
          <select
            value={value.department}
            onChange={(event) => setDepartment(event.target.value)}
            disabled={!value.headquarters || departments.length === 0}
            className="min-h-11 w-full min-w-0 rounded-[8px] border border-[#D7DCE3] bg-white px-3 text-sm font-medium text-[#101820] outline-none focus:border-[#177D4E] focus:ring-2 focus:ring-[#E5F5ED] disabled:bg-[#F7F8FA] disabled:text-[#9A9A9A]"
            aria-label="실 또는 부서"
          >
            <option value="">{departments.length > 0 ? "실 또는 부서 선택" : "선택할 하위 조직 없음"}</option>
            {departments.map((department) => (
              <option key={department.name} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
        </label>

        <label className="grid min-w-0 gap-2">
          <span className="text-xs font-semibold text-[#5A6672]">팀</span>
          <select
            value={value.team}
            onChange={(event) => onChange({ ...value, team: event.target.value })}
            disabled={!value.department || teams.length === 0}
            className="min-h-11 w-full min-w-0 rounded-[8px] border border-[#D7DCE3] bg-white px-3 text-sm font-medium text-[#101820] outline-none focus:border-[#177D4E] focus:ring-2 focus:ring-[#E5F5ED] disabled:bg-[#F7F8FA] disabled:text-[#9A9A9A]"
            aria-label="팀"
          >
            <option value="">{teams.length > 0 ? "팀 선택" : "선택할 팀 없음"}</option>
            {teams.map((team) => (
              <option key={team.name} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="text-xs leading-5 text-[#68707C]">현재 소속에 가장 가까운 조직까지 선택해 주세요.</p>
    </fieldset>
  )
}
