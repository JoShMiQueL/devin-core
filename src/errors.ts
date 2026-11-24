/**
 * Error base for the whole library — no AI-SDK dependency.
 *
 * The shape mirrors `APICallError` from `@ai-sdk/provider` (message,
 * `statusCode`, `url`, `responseBody`, `isRetryable`, `responseHeaders`) so a
 * host that does depend on the AI SDK can read the same fields without a
 * mapping layer.
 */

export interface DevinApiErrorOptions {
  statusCode?: number
  url?: string
  responseBody?: string
  responseHeaders?: Record<string, string>
  isRetryable?: boolean
}

/**
 * `Symbol.for("vercel.ai.error.AI_APICallError")` — the marker AI SDK checks
 * in `APICallError.isInstance`. Setting it here makes a `DevinApiError`
 * report as an APICallError to hosts that duck-type, without taking the
 * `@ai-sdk/provider` dependency.
 */
const AI_SDK_API_ERROR_MARKER = Symbol.for("vercel.ai.error.AI_APICallError")

export class DevinApiError extends Error {
  readonly statusCode?: number
  readonly url: string
  readonly responseBody?: string
  readonly responseHeaders?: Record<string, string>
  readonly isRetryable: boolean

  constructor(message: string, options: DevinApiErrorOptions = {}) {
    super(message)
    this.name = "DevinApiError"
    this.statusCode = options.statusCode
    this.url = options.url ?? ""
    this.responseBody = options.responseBody
    this.responseHeaders = options.responseHeaders
    // AI SDK default: retryable on 408/409/429 and any 5xx, unless told.
    this.isRetryable = options.isRetryable ??
      (options.statusCode != null &&
        (options.statusCode === 408 ||
         options.statusCode === 409 ||
         options.statusCode === 429 ||
         options.statusCode >= 500))
    // AISDKError marker — see the constant above. `in` checks the symbol key.
    ;(this as unknown as Record<symbol, boolean>)[AI_SDK_API_ERROR_MARKER] = true
  }
}
