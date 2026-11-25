/**
 * devin-core — Connect-RPC transport, auth, PKCE and model-catalog layer for
 * the Devin (Cognition) backend. Shared by every *-devin client.
 *
 * Layer map:
 *   wire.ts       proto codec (tolerant reader — upstream frames carry
 *                 non-proto payloads; iterFields yields what decodes)
 *   metadata.ts   client fingerprint (tracks the installed `devin` CLI)
 *   errors.ts     DevinApiError — APICallError-shaped, no AI-SDK dep
 *   auth.ts       session token + GetUserJwt minting/cache
 *   auth/         PKCE login flow (loopback callback + manual code paste)
 *   catalog.ts    GetCascadeModelConfigs -> uid/pricing/context/effort
 *   effort.ts     reasoning-effort <-> wire-uid mapping
 *   chat.ts       GetChatMessage streaming transport
 *
 * The compliance layer (guard, override, pipeline, prune) is NOT here —
 * it lives in devin-engine, which depends on this package.
 */

export * from "./errors.js"
export * from "./wire.js"
export * from "./metadata.js"
export * from "./auth.js"
export * from "./catalog.js"
export * from "./effort.js"
export * from "./chat.js"
export * from "./constants.js"

export {
  authorizeUrl,
} from "./auth/url.js"
export {
  challengeFor,
  generateState,
  generateVerifier,
} from "./auth/pkce.js"
export {
  exchangeCode,
} from "./auth/exchange.js"
export {
  startCallbackServer,
  type CallbackServer,
} from "./auth/loopback.js"
export {
  loginAuto,
  loginManual,
  type LoginFlow,
} from "./auth/login.js"
export {
  openBrowser,
} from "./auth/browser.js"
// release-please smoke — conventional commit triggers the release PR
