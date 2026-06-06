# Homepage Prelaunch Static Contract Aggregate Result v1

Date: 2026-06-07
Gate: Homepage-Prelaunch-Static-Contract-Aggregate
Status: pass
Scope: local/static Homepage Command Center prelaunch checks

## Purpose

Add a single local prelaunch aggregate runner for public/static Homepage Command
Center checks. The aggregate is intentionally limited to repository files,
static fixtures, public copy, responsive contract markers, readiness manifest
shape, and access request policy checks.

## Included Checks

- `check:homepage-public-copy`
- `check:command-center-contract`
- `check:command-center-readiness-manifest`
- `check:command-center-static`
- `check:command-center-fixture`
- `check:command-center-responsive`
- `check:access-request-policy`

## Explicit Exclusions

- live Command Center data
- remote smoke
- env/read-key use
- production API/readback
- authenticated UI smoke
- publish
- persist
- promote
- apply

## Excluded Package Scripts

- `smoke:command-center`
- `smoke:command-center:states`
- `dev`
- `start`
- `build`

## Package Wiring

- `check:homepage-prelaunch-static-contracts`: `node scripts/check-homepage-prelaunch-static-contracts.mjs`
- `verify:prelaunch-local`: `node scripts/check-homepage-prelaunch-static-contracts.mjs`

## Verification Results

Commands run:

```text
npm run check:homepage-prelaunch-static-contracts
npm run verify:prelaunch-local
npm run check:homepage-public-copy
npm run check:command-center-contract
npm run check:command-center-readiness-manifest
npm run check:command-center-static
npm run check:command-center-fixture
npm run check:command-center-responsive
npm run check:access-request-policy
npm run lint
npm run build
git diff --check
```

Results:

```text
check:homepage-prelaunch-static-contracts: pass
verify:prelaunch-local: pass
check:homepage-public-copy: pass
check:command-center-contract: pass
check:command-center-readiness-manifest: pass
check:command-center-static: pass
check:command-center-fixture: pass
check:command-center-responsive: pass
check:access-request-policy: pass
lint: pass
build: pass
git diff --check: pass
```

Aggregate output confirmed the static boundary:

```text
included: check:homepage-public-copy, check:command-center-contract, check:command-center-readiness-manifest, check:command-center-static, check:command-center-fixture, check:command-center-responsive, check:access-request-policy
excluded scripts: smoke:command-center, smoke:command-center:states, dev, start, build
excluded capabilities: live Command Center data, remote smoke, env/read-key use, production API/readback, authenticated UI smoke, publish, persist, promote, apply
```

## Caveats

- The aggregate does not run live opt-in checks, remote smoke, authenticated
  UI smoke, production API/readback, publish, persist, promote, or apply flows.
- The aggregate does not run `dev`, `start`, or `build`; build can be verified
  separately as a standard local build check.
- `git diff --check` passed with a Git line-ending warning that `package.json`
  may be written with CRLF the next time Git touches it.
