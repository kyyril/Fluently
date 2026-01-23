import { prisma } from '../src/config/database';
import bcrypt from 'bcryptjs';


async function main() {
    console.log('Seeding database...');

    // Create titles
    const titles = [
        {
            name: 'Seedling',
            description: 'First week completed',
            icon: 'sprout',
            requirement: 'first_week',
        },
        {
            name: 'On Fire',
            description: '7-day streak achieved',
            icon: 'flame',
            requirement: '7_day_streak',
        },
        {
            name: 'Champion',
            description: 'Top 10 on weekly leaderboard',
            icon: 'trophy',
            requirement: 'top_10_leaderboard',
        },
        {
            name: 'Diamond',
            description: '100-day streak achieved',
            icon: 'gem',
            requirement: '100_day_streak',
        },
        {
            name: 'Polyglot',
            description: 'Learning 3+ languages',
            icon: 'globe',
            requirement: 'multiple_languages',
        },
        {
            name: 'Night Owl',
            description: 'Completed tasks after midnight',
            icon: 'moon',
            requirement: 'night_completion',
        },
        {
            name: 'Early Bird',
            description: 'Completed all tasks before 9 AM',
            icon: 'sun',
            requirement: 'early_completion',
        },
        {
            name: 'Perfectionist',
            description: '7 days with 100% completion',
            icon: 'check-circle',
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
    console.log(`Created ${titles.length} titles`);

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
    } as any);
    console.log(`Created demo user: demo@fluently.app / demo1234`);

    // Create primary admin from environment
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@fluently.app';
    const adminUser = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            passwordHash: '', // No password for OAuth users
            displayName: 'System Admin',
            nativeLanguage: 'en',
            targetLanguage: 'en',
            role: 'ADMIN',
            level: 'ADVANCED',
        },
    } as any);
    console.log(`Created system admin: ${adminEmail}`);

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
        await prisma.userTitle.upsert({
            where: {
                userId_titleId: {
                    userId: adminUser.id,
                    titleId: seedlingTitle.id,
                },
            },
            update: {},
            create: {
                userId: adminUser.id,
                titleId: seedlingTitle.id,
            },
        });
    }

    // Create a DailyLog for the demo user for today so it shows up in the weekly leaderboard
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.dailyLog.upsert({
        where: {
            userId_date: {
                userId: demoUser.id,
                date: today,
            },
        },
        update: {
            totalXp: 150,
        },
        create: {
            userId: demoUser.id,
            date: today,
            totalXp: 150,
            tasks: {
                create: [
                    {
                        taskType: 'PODCAST_LISTENING',
                        completed: true,
                        completedAt: new Date(),
                        xpEarned: 50,
                    },
                    {
                        taskType: 'CREATE_SENTENCES',
                        completed: true,
                        completedAt: new Date(),
                        xpEarned: 100,
                    },
                ],
            },
        },
    });
    console.log(`Created daily log for demo user for today`);

    console.log('Seed completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
