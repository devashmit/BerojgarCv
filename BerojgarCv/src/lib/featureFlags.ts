import { prisma } from '@/lib/prisma'

let cache: Record<string, boolean> = {}
let cacheExpiry = 0

export async function getFlags(): Promise<Record<string, boolean>> {
  if (Date.now() < cacheExpiry) return cache
  try {
    const flags = await prisma.featureFlag.findMany()
    cache = Object.fromEntries(flags.map((f: { id: string; enabled: boolean }) => [f.id, f.enabled]))
    cacheExpiry = Date.now() + 30_000
  } catch {
    // If DB is down, return cached or defaults
    if (Object.keys(cache).length === 0) {
      cache = {
        pdf_download_enabled: true,
        public_sharing_enabled: true,
        new_signups_enabled: true,
        t7_rirekisho_enabled: true,
        maintenance_mode: false,
        ai_improvement_enabled: true,
      }
    }
  }
  return cache
}

export async function isEnabled(flagId: string): Promise<boolean> {
  const flags = await getFlags()
  return flags[flagId] ?? true
}

export function bustFlagsCache() {
  cacheExpiry = 0
}
