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

export * from "./errors"
export * from "./wire"
export * from "./metadata"
export * from "./auth"
export * from "./catalog"
export * from "./effort"
export * from "./chat"
export * from "./constants"

export {
  authorizeUrl,
} from "./auth/url"
export {
  challengeFor,
  generateState,
  generateVerifier,
} from "./auth/pkce"
export {
  exchangeCode,
} from "./auth/exchange"
export {
  startCallbackServer,
  type CallbackServer,
} from "./auth/loopback"
export {
  loginAuto,
  loginManual,
  type LoginFlow,
} from "./auth/login"
export {
  openBrowser,
} from "./auth/browser"
