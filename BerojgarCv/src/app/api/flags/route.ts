import { NextResponse } from 'next/server'
import { getFlags } from '@/lib/featureFlags'

// Public endpoint — returns only the flags needed by the client UI
// No secrets, no admin data
export const runtime = 'nodejs'

export async function GET() {
  const flags = await getFlags()
  return NextResponse.json({
    pdf_download_enabled: flags.pdf_download_enabled ?? true,
    public_sharing_enabled: flags.public_sharing_enabled ?? true,
    t7_rirekisho_enabled: flags.t7_rirekisho_enabled ?? true,
    ai_improvement_enabled: flags.ai_improvement_enabled ?? true,
    maintenance_mode: flags.maintenance_mode ?? false,
    new_signups_enabled: flags.new_signups_enabled ?? true,
  })
}
