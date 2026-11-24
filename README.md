# devin-core

Connect-RPC transport, auth, PKCE and model-catalog layer for the Devin (Cognition) backend. The shared base every `*-devin` client builds on — the protocol, none of the compliance logic.

```
wire.ts       proto codec (tolerant reader — iterFields yields what decodes)
metadata.ts   client fingerprint (tracks the installed `devin` CLI)
errors.ts     DevinApiError — APICallError-shaped, no AI-SDK dependency
auth.ts       session token + GetUserJwt minting/cache
auth/         PKCE login flow (loopback callback + manual code paste)
catalog.ts    GetCascadeModelConfigs -> uid/pricing/context/effort
effort.ts     reasoning-effort <-> wire-uid mapping
chat.ts       GetChatMessage streaming transport
constants.ts  endpoints, env var, token prefix
```

Runtime-portable — `node:http`/`node:child_process`, no Bun-only APIs, no AI-SDK dependency. `DevinApiError` carries the `vercel.ai.error.AI_APICallError` symbol so AI-SDK hosts duck-type it without the package.

## Usage

```ts
import { streamChatEvents, getCachedCatalog, getCachedUserJwt, loginAuto, openBrowser } from "devin-core"

// PKCE login -> session token
const flow = await loginAuto()
openBrowser(flow.url)
const apiKey = await flow.finish()

// stream
for await (const ev of streamChatEvents({ apiKey, modelUid: "swe-2-high", messages })) {
  if (ev.kind === "text") process.stdout.write(ev.text)
}
```

The compliance layer (refusal guard, system-override injection, guarded retry, sanitize, prune, model resolve) is **not** here — it lives in [`devin-engine`](https://github.com/JoShMiQueL/devin-engine), which depends on this package.

## Ecosystem

| Package | Role |
| --- | --- |
| **`devin-core`** (this) | Connect-RPC wire, auth, PKCE, model catalog |
| `devin-engine` | guarded-retry pipeline over this package |
| `devin-proxy` | standalone OpenAI-compatible proxy (npm + GitHub) |
| `devin-proxy-py` | Python original — reference implementation |
| `opencode-devin` | OpenCode v2 plugin |
| `claude-devin` | Claude-compatible surface |

Topic `devin-ecosystem` groups the repos on GitHub.
