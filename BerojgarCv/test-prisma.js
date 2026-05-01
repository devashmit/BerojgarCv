const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const cv = await prisma.cV.findUnique({
      where: { id: 'cmnptwdtx0009665ytx1zq2tp' },
      include: { user: true }
    });
    console.log('CV Found:', !!cv);
    if (!cv) {
      console.log('CV IS NULL!');
    }
  } catch (e) {
    console.error('ERROR:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}
main();
