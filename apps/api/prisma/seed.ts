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
    } as any);
    console.log(`✅ Created demo user: demo@fluently.app / demo1234`);

    // Create admin user
    const adminPassword = await bcrypt.hash('admin1234', 12);
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@fluently.app' },
        update: {},
        create: {
            email: 'admin@fluently.app',
            passwordHash: adminPassword,
            displayName: 'Admin User',
            nativeLanguage: 'en',
            targetLanguage: 'en',
            role: 'ADMIN',
            level: 'ADVANCED',
        },
    } as any);
    console.log(`✅ Created admin user: admin@fluently.app / admin1234`);

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

    // Create articles
    const showcaseArticle = {
        title: 'Comprehensive Markdown Feature Showcase',
        slug: 'markdown-feature-showcase',
        summary: 'This article demonstrates every markdown capability of our new renderer, including code blocks, tables, blockquotes, and rich typography.',
        readTime: 10,
        category: 'Technology',
        tags: ['Markdown', 'Features', 'UI'],
        published: true,
        content: `# Markdown Feature Showcase

Welcome to the new reading experience. This article demonstrates the full capabilities of our markdown renderer.

## 1. Rich Typography

We support **bold text** for emphasis, *italic text* for nuance, and even ~~strikethrough~~ for corrections. You can also create [links](https://example.com) that stand out.

## 2. Structured Lists

### Unordered List
*   First item
*   Second item
    *   Nested item A
    *   Nested item B
*   Third item

### Ordered List
1.  Step one: Create content
2.  Step two: Format it
3.  Step three: Publish

## 3. Blockquotes

Sometimes you need to highlight a key takeaway or a quote:

> "The limits of my language mean the limits of my world." 
>
> — Ludwig Wittgenstein

## 4. Code Syntax Highlighting

We now support beautiful syntax highlighting for multiple languages.

**TypeScript Example:**
\`\`\`typescript
interface User {
  id: string;
  name: string;
  role: 'ADMIN' | 'USER';
}

function greet(user: User) {
  console.log(\`Hello, \${user.name}!\`);
}
\`\`\`

**Python Example:**
\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`

## 5. Tables

Data is best presented in tables. Our renderer handles them gracefully.

| Feature | Status | Priority |
| :--- | :---: | ---: |
| Dictionary Lookup | ✅ Ready | High |
| Syntax Highlighting | ✅ Ready | Medium |
| Dark Mode | ✅ Ready | Low |
| Voice Narration | ⏳ Pending | High |

## 6. Inline Code

You can mention specific commands like \`npm install\` or file names like \`README.md\` inline with your text.

## Conclusion

This new design ensures that learning materials are not only functional but also **visually engaging** and **easy to read**. Enjoy your learning journey!`,
    };

    await (prisma as any).article.upsert({
        where: { slug: showcaseArticle.slug },
        update: showcaseArticle,
        create: showcaseArticle,
    });
    console.log('✅ Created showcase article');

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
