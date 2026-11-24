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
    this.isRetryable = options.isRetryable ?? false
  }
}
