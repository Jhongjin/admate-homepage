import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const source = readFileSync(
  resolve('src/components/access-request/AccessRequestForm.tsx'),
  'utf8',
)

assert(
  source.includes('const teamOperationsRequested = form.requested_permission_level === "project_manage"'),
  'team operation requests must remain tied to project_manage scope',
)

assert(
  source.includes('requested_hermes_reviewer: false'),
  'team operation requests must not automatically request Hermes review authority',
)

assert(
  source.includes('team_operations_requested: teamOperationsRequested'),
  'team operation intent must still be preserved in request metadata',
)

assert(
  !source.includes('requested_hermes_reviewer: teamOperationsRequested'),
  'Hermes review authority must stay separate from team operation requests',
)

console.log('Access request policy check passed.')
