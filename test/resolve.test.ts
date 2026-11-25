import { describe, expect, test } from "bun:test"
import { resolveModelUid } from "../src/resolve.js"

function entry(modelUid: string, effortLevel?: string, base?: string) {
  return {
    modelUid,
    label: modelUid,
    disabled: false,
    contextWindow: 256000,
    effortLevel,
    baseModelUid: base,
  }
}

// swe-2-1 family: bare uid carries no effort; the five lanes do.
const SWE21 = [
  entry("swe-2-1", undefined, "swe-2-1"),
  entry("swe-2-1-low", "low", "swe-2-1"),
  entry("swe-2-1-medium", "medium", "swe-2-1"),
  entry("swe-2-1-high", "high", "swe-2-1"),
  entry("swe-2-1-xhigh", "xhigh", "swe-2-1"),
  entry("swe-2-1-max", "max", "swe-2-1"),
]
const CLAUDE = [
  entry("claude-opus-5-5-medium", "medium", "claude-opus-5-5"),
  entry("claude-opus-5-5-high", "high", "claude-opus-5-5"),
  entry("claude-opus-5-5-xhigh", "xhigh", "claude-opus-5-5"),
]
const CATALOG = [...SWE21, ...CLAUDE]

describe("resolveModelUid", () => {
  test("bare family uid without effort resolves to the bare uid itself", () => {
    expect(resolveModelUid("swe-2-1", CATALOG)).toBe("swe-2-1")
  })

  test("family uid + effort picks the matching lane", () => {
    expect(resolveModelUid("swe-2-1", CATALOG, "xhigh")).toBe("swe-2-1-xhigh")
  })

  test("deprecated per-effort uid passes through verbatim", () => {
    expect(resolveModelUid("swe-2-1-high", CATALOG)).toBe("swe-2-1-high")
  })

  test("per-effort uid + different effort rewrites the suffix", () => {
    expect(resolveModelUid("swe-2-1-high", CATALOG, "max")).toBe("swe-2-1-max")
  })

  test("non-swe family resolves the same way — no hardcoded lanes", () => {
    expect(resolveModelUid("claude-opus-5-5", CATALOG, "high")).toBe("claude-opus-5-5-high")
  })

  test("family id without a matching bare uid falls to the default member", () => {
    const noDefault = CLAUDE // no bare claude-opus-5-5 uid in the catalog
    expect(resolveModelUid("claude-opus-5-5", noDefault)).toBe("claude-opus-5-5-medium")
  })

  test("an unknown effort on an effortful uid still rewrites the suffix", () => {
    // catalog is not a contract: ask for an effort the family does not list
    const uid = resolveModelUid("swe-2-1-high", CATALOG, "minimal")
    expect(uid).toBe("swe-2-1-minimal")
  })

  test("unknown uid passes through unchanged", () => {
    expect(resolveModelUid("gpt-9-turbo", CATALOG, "high")).toBe("gpt-9-turbo")
  })

  test("no catalog: the id passes through, effort or not", () => {
    expect(resolveModelUid("swe-2-1", undefined, "high")).toBe("swe-2-1")
  })

  test("disabled entries are filtered by the caller, not the resolver", () => {
    // resolveModelUid receives whatever subset the caller chose — it does not
    // inspect `disabled` itself. Documented behavior: callers pass `enabled`.
    const disabledOnly = CATALOG.map((e) => ({ ...e, disabled: true }))
    expect(resolveModelUid("swe-2-1", disabledOnly, "high")).toBe("swe-2-1-high")
  })
})
