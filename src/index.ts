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

export * from "./errors.ts"
export * from "./wire.ts"
export * from "./metadata.ts"
export * from "./auth.ts"
export * from "./catalog.ts"
export * from "./effort.ts"
export * from "./chat.ts"
export * from "./constants.ts"

export {
  authorizeUrl,
} from "./auth/url.ts"
export {
  challengeFor,
  generateState,
  generateVerifier,
} from "./auth/pkce.ts"
export {
  exchangeCode,
} from "./auth/exchange.ts"
export {
  startCallbackServer,
  type CallbackServer,
} from "./auth/loopback.ts"
export {
  loginAuto,
  loginManual,
  type LoginFlow,
} from "./auth/login.ts"
export {
  openBrowser,
} from "./auth/browser.ts"
