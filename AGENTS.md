# AGENTS.md — working in devin-core

The wire-protocol library: Connect-RPC transport, auth, PKCE login, model catalog, effort mapping. **No compliance logic here** — that is devin-engine's layer. If a change touches refusals, overrides, retries or sanitize, it belongs in devin-engine, not here.

## Hard rules

- **Runtime-portable**: `node:*` APIs only — no Bun-only calls, no AI-SDK dependency. `DevinApiError` carries the AI-SDK error symbol so hosts duck-type it without the package.
- **Tolerant wire codec**: `iterFields` yields what decodes and skips what doesn't — never throw on unknown fields, the backend adds them without notice.
- `metadata.ts` fingerprints as the installed `devin` CLI — keep the version format in sync with what the real CLI emits.
- Proto field numbers in `chat.ts`/`wire.ts` are reverse-engineered; the comments citing mitm evidence are load-bearing — do not delete them.

## Versioning & releases

- Exact-pin consumers: devin-engine pins this package exactly. When you publish a new core, the engine's pin needs a manual bump PR — `npm pkg set dependencies.devin-core=X.Y.Z && npm install && gh pr create --fill` in the engine repo.
- release-please + trusted publishing via the shared `gh-actions` reusables; see the ecosystem root AGENTS.md for the protection-drop merge dance.

## Ecosystem

| Repo | Role |
|---|---|
| **`devin-core`** (this) | wire + auth + PKCE + catalog |
| `devin-engine` | guarded-retry pipeline over this package |
| `devin-proxy` | OpenAI-compatible standalone proxy |
| `opencode-devin` | OpenCode v2 plugin |
| `claude-devin` | Claude-compatible surface |
