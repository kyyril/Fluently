import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create titles
    const titles = [
        {
            name: 'Seedling',
            description: 'First week completed',
            icon: '🌱',
            requirement: 'first_week',
        },
        {
            name: 'On Fire',
            description: '7-day streak achieved',
            icon: '🔥',
            requirement: '7_day_streak',
        },
        {
            name: 'Champion',
            description: 'Top 10 on weekly leaderboard',
            icon: '🏆',
            requirement: 'top_10_leaderboard',
        },
        {
            name: 'Diamond',
            description: '100-day streak achieved',
            icon: '💎',
            requirement: '100_day_streak',
        },
        {
            name: 'Polyglot',
            description: 'Learning 3+ languages',
            icon: '🌍',
            requirement: 'multiple_languages',
        },
        {
            name: 'Night Owl',
            description: 'Completed tasks after midnight',
            icon: '🦉',
            requirement: 'night_completion',
        },
        {
            name: 'Early Bird',
            description: 'Completed all tasks before 9 AM',
            icon: '🐤',
            requirement: 'early_completion',
        },
        {
            name: 'Perfectionist',
            description: '7 days with 100% completion',
            icon: '✨',
            requirement: 'perfect_week',
        },
    ];

    for (const title of titles) {
        await prisma.title.upsert({
            where: { name: title.name },
            update: {},
            create: title,
        });
    }
    console.log(`✅ Created ${titles.length} titles`);

    // Create demo user
    const demoPassword = await bcrypt.hash('demo1234', 12);
    const demoUser = await prisma.user.upsert({
        where: { email: 'demo@fluently.app' },
        update: {},
        create: {
            email: 'demo@fluently.app',
            passwordHash: demoPassword,
            displayName: 'Demo User',
            nativeLanguage: 'en',
            targetLanguage: 'es',
            level: 'BEGINNER',
            totalXp: 500,
            currentStreak: 3,
            longestStreak: 7,
        },
    });
    console.log(`✅ Created demo user: demo@fluently.app / demo1234`);

    // Award demo user the Seedling title
    const seedlingTitle = await prisma.title.findUnique({
        where: { name: 'Seedling' },
    });
    if (seedlingTitle) {
        await prisma.userTitle.upsert({
            where: {
                userId_titleId: {
                    userId: demoUser.id,
                    titleId: seedlingTitle.id,
                },
            },
            update: {},
            create: {
                userId: demoUser.id,
                titleId: seedlingTitle.id,
            },
        });
    }

    console.log('✅ Seed completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
