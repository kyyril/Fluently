const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany({
        select: {
            email: true,
            displayName: true
        }
    });
    console.log('All Users:');
    users.forEach(u => {
        console.log(`'${u.email}' (Length: ${u.email.length}) - '${u.displayName}'`);
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
