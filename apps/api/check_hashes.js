const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany({
        select: {
            email: true,
            passwordHash: true
        }
    });
    console.log('Password Hashes:');
    users.forEach(u => {
        console.log(`'${u.email}': '${u.passwordHash ? u.passwordHash.substring(0, 10) + '...' : 'EMPTY'}'`);
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
