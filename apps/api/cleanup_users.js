const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const result = await prisma.user.deleteMany({
        where: {
            passwordHash: ''
        }
    });
    console.log(`Deleted ${result.count} users with empty password hashes.`);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
