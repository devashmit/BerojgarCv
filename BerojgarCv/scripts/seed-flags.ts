// Run: npx ts-node --project tsconfig.json scripts/seed-flags.ts
import { prisma } from '../src/lib/prisma'

async function main() {
  await prisma.featureFlag.createMany({
    skipDuplicates: true,
    data: [
      { id: 'pdf_download_enabled',   name: 'PDF Downloads',      enabled: true,  description: 'PDF download button. Disable if generation is broken.' },
      { id: 'public_sharing_enabled', name: 'Public Sharing',     enabled: true,  description: 'Share button and /preview pages.' },
      { id: 'new_signups_enabled',    name: 'New Signups',        enabled: true,  description: 'Sign up page. Disable for closed beta.' },
      { id: 't7_rirekisho_enabled',   name: 'Rirekisho Template', enabled: true,  description: 'T7 Japan template in selector.' },
      { id: 'maintenance_mode',       name: 'Maintenance Mode',   enabled: false, description: 'Shows maintenance banner across all pages.' },
      { id: 'ai_improvement_enabled', name: 'AI Bullet Improver', enabled: true,  description: 'AI bullet improve button.' },
    ],
  })
  console.log('✅ Feature flags seeded successfully')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
