const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const result = await prisma.$queryRawUnsafe('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\'');
    console.log('Tables:', JSON.stringify(result, null, 2));

    const columns = await prisma.$queryRawUnsafe('SELECT column_name, data_type FROM information_schema.columns WHERE table_name = \'user\'');
    console.log('User Columns:', JSON.stringify(columns, null, 2));
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
