export interface RateLimitResult {
  success: boolean
  remaining: number
  reset: number
}

// In-memory store for Phase 2/3. Overwritten if deployed to Vercel/Redis, but fine for single-instance demo.
const store = new Map<string, { count: number; windowStart: number }>()

export function rateLimit(ip: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()
  const record = store.get(ip)

  if (!record || now - record.windowStart > windowMs) {
    // New window
    store.set(ip, { count: 1, windowStart: now })
    return { success: true, remaining: limit - 1, reset: now + windowMs }
  }

  if (record.count >= limit) {
    // Rate limited
    return { success: false, remaining: 0, reset: record.windowStart + windowMs }
  }

  // Increment
  store.set(ip, { count: record.count + 1, windowStart: record.windowStart })
  return { success: true, remaining: limit - record.count - 1, reset: record.windowStart + windowMs }
}
