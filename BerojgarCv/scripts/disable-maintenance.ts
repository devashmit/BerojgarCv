import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.featureFlag.upsert({
    where: { id: 'maintenance_mode' },
    update: { enabled: false },
    create: { id: 'maintenance_mode', name: 'Maintenance Mode', description: 'Enable maintenance mode banner', enabled: false }
  })
  console.log('Maintenance mode disabled')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
