const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Dropping all tables...');
    const tables = [
        'User', 'DailyLog', 'TaskCompletion', 'UserTitle', 'Title', 'Article', 'ArticleRead',
        'user', 'session', 'account', 'verification'
    ];

    for (const table of tables) {
        try {
            await prisma.$executeRawUnsafe('DROP TABLE IF EXISTS "' + table + '" CASCADE');
            console.log('Dropped ' + table);
        } catch (e) {
            console.warn('Failed to drop ' + table + ': ' + e.message);
        }
    }
    console.log('Finished dropping tables.');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
