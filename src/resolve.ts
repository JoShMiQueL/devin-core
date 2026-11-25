/**
 * Catalog-driven client-model resolution.
 *
 * Maps a client-facing model id — a family base uid, a bare uid, or a
 * deprecated per-effort uid — plus an optional reasoning effort to the wire
 * uid the account's catalog actually serves. This is the generic resolution
 * shared by the opencode plugin (variants) and the standalone proxy
 * (model + reasoning_effort): both resolve against the live catalog instead
 * of a hardcoded tier table, so every family in the subscription is routable.
 */

import type { ModelCatalogEntry } from "./catalog.js"
import { defaultMember, splitEffortSuffix, toEffortLevel, withEffortSuffix } from "./effort.js"

/**
 * Resolve `modelId` + `effort` against the catalog.
 *
 * Rules, in order:
 *
 * 1. A known effort that a family member carries wins — the member's exact
 *    uid ships.
 * 2. A requested effort the catalog does not list is still written onto a
 *    uid that already carries one (the catalog is not a contract).
 * 3. A uid the catalog lists verbatim passes through untouched.
 * 4. A family id that is not itself a uid (e.g. `claude-opus-5-5`) resolves
 *    to the family's default member.
 * 5. Anything else passes through unchanged — the catalog not knowing a uid
 *    is not proof it does not exist.
 */
export function resolveModelUid(
  modelId: string,
  catalog: readonly ModelCatalogEntry[] | undefined,
  requestedEffort?: unknown,
): string {
  const effort = toEffortLevel(requestedEffort)
  const self = splitEffortSuffix(modelId)
  const family = catalog?.filter((entry) => (entry.baseModelUid ?? entry.modelUid) === self.baseModelUid) ?? []
  if (effort) {
    const match = family.find((entry) => entry.effortLevel === effort)
    if (match) return match.modelUid
    if (self.effortLevel) return withEffortSuffix(modelId, effort)
  }
  if (!catalog || catalog.some((entry) => entry.modelUid === modelId)) return modelId
  return defaultMember(family)?.modelUid ?? modelId
}
