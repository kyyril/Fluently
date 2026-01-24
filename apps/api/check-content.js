const { PrismaClient } = require('./prisma/generated-client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
    // Find today's daily log for Khairil
    const today = new Date(Date.UTC(2026, 0, 24, 0, 0, 0, 0));

    const logs = await prisma.dailyLog.findMany({
        where: { date: today },
        include: {
            tasks: true,
            user: { select: { displayName: true } }
        }
    });

    let output = '';
    for (const log of logs) {
        output += `User: ${log.user.displayName}\n`;
        output += `Date: ${log.date.toISOString()}\n`;
        output += `Day Recap: ${log.dayRecap || '(none)'}\n`;
        output += `AI Review: ${log.aiReview || '(none)'}\n\n`;
        output += `Tasks:\n`;
        for (const task of log.tasks) {
            output += `  ${task.taskType}:\n`;
            output += `    completed: ${task.completed}\n`;
            output += `    metadata: ${JSON.stringify(task.metadata, null, 2)}\n\n`;
        }
    }

    fs.writeFileSync('content-check.txt', output);
    console.log('Saved to content-check.txt');
}

main().catch(console.error).finally(() => prisma.$disconnect());
