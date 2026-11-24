/** Shared constants for devin-core. */

/** Devin webapp — hosts the CLI login page (`/auth/cli/continue`). */
export const WEBAPP_URL = "https://app.devin.ai"

/** Devin auth API — exchanges the PKCE code for a session token. */
export const AUTH_API_URL = "https://api.devin.ai"

/** Default Codeium API server (Cascade gRPC) when no tenant host is known. */
export const DEFAULT_API_SERVER = "https://server.codeium.com"

/** Prefix the Devin CLI puts in front of the session JWT. */
export const TOKEN_PREFIX = "devin-session-token$"

/** Loopback callback path required by the webapp's safe-redirect check. */
export const CALLBACK_PATH = "/callback"
