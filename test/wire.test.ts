import { describe, expect, test } from "bun:test"
import { encodeVarint, encodeString, encodeMessage, iterFields } from "../src/wire.js"
import { DevinApiError } from "../src/errors.js"

describe("wire codec", () => {
  test("varint round-trips", () => {
    const buf = encodeVarint(300)
    const [v, off] = (() => {
      let off = 0
      const gen = iterFields(Buffer.concat([Buffer.from([0x08]), buf]))
      const f = gen.next().value!
      return [f.value, off]
    })()
    expect(v).toBe(300n)
  })

  test("string field encodes with tag + len", () => {
    const buf = encodeString(1, "hi")
    expect(buf[0]).toBe(0x0a) // field 1, wire 2
    expect(buf[1]).toBe(2)
    expect(buf.subarray(2).toString()).toBe("hi")
  })

  test("iterFields reads back what we write", () => {
    const msg = Buffer.concat([
      encodeString(1, "alpha"),
      encodeMessage(2, encodeString(1, "nested")),
    ])
    const fields = [...iterFields(msg)]
    expect(fields).toHaveLength(2)
    expect(fields[0]!.num).toBe(1)
    expect(fields[0]!.value!.toString()).toBe("alpha")
    expect(fields[1]!.num).toBe(2)
    const inner = [...iterFields(fields[1]!.value as Buffer)]
    expect(inner[0]!.value!.toString()).toBe("nested")
  })
})

describe("DevinApiError", () => {
  test("carries statusCode and the AI-SDK retryable default", () => {
    const e = new DevinApiError("boom", { statusCode: 429 })
    expect(e.message).toBe("boom")
    expect(e.statusCode).toBe(429)
    expect(e.isRetryable).toBe(true)
  })

  test("5xx/408/409/429 retryable, other 4xx not", () => {
    expect(new DevinApiError("x", { statusCode: 500 }).isRetryable).toBe(true)
    expect(new DevinApiError("x", { statusCode: 408 }).isRetryable).toBe(true)
    expect(new DevinApiError("x", { statusCode: 404 }).isRetryable).toBe(false)
    expect(new DevinApiError("x", { statusCode: 403 }).isRetryable).toBe(false)
  })
})
