# Backend Development Guide
## Fluently - API Server

---

## 1. Tech Stack

| Category | Technology |
|----------|------------|
| Runtime | Node.js 20+ |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Validation | Zod |
| AI | Google Gemini SDK |
| Auth | JWT (jsonwebtoken) |

---

## 2. Architecture Overview

### Clean Architecture Layers

```
┌────────────────────────────────────────────────────────┐
│                      ROUTES                            │
│            (HTTP endpoints, request parsing)           │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────┐
│                   CONTROLLERS                          │
│        (Request/Response handling, validation)         │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────┐
│                    SERVICES                            │
│              (Business logic, rules)                   │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────┐
│                  REPOSITORIES                          │
│           (Data access, Prisma queries)                │
└────────────────────────────────────────────────────────┘
```

---

## 3. Directory Structure

```
apps/api/src/
├── config/
│   ├── env.ts                # Environment variables
│   ├── database.ts           # Prisma client instance
│   └── gemini.ts             # Gemini AI client
│
├── routes/
│   ├── index.ts              # Route aggregator
│   ├── auth.routes.ts        # /auth/*
│   ├── users.routes.ts       # /users/*
│   ├── routine.routes.ts     # /routine/*
│   ├── tasks.routes.ts       # /tasks/*
│   └── leaderboard.routes.ts # /leaderboard/*
│
├── controllers/
│   ├── auth.controller.ts
│   ├── users.controller.ts
│   ├── routine.controller.ts
│   ├── tasks.controller.ts
│   └── leaderboard.controller.ts
│
├── services/
│   ├── auth.service.ts
│   ├── users.service.ts
│   ├── routine.service.ts
│   ├── tasks.service.ts
│   ├── leaderboard.service.ts
│   └── ai.service.ts         # Gemini integration
│
├── repositories/
│   ├── user.repository.ts
│   ├── routine.repository.ts
│   ├── task.repository.ts
│   └── leaderboard.repository.ts
│
├── middleware/
│   ├── auth.middleware.ts    # JWT verification
│   ├── validate.middleware.ts # Zod validation
│   └── error.middleware.ts   # Global error handler
│
├── utils/
│   ├── api-response.ts       # Standardized responses
│   └── errors.ts             # Custom error classes
│
└── server.ts                 # Entry point
```

---

## 4. Prisma Schema (Draft)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String
  displayName   String
  avatarUrl     String?
  
  nativeLanguage   String
  targetLanguage   String
  level            Level     @default(BEGINNER)
  
  totalXp          Int       @default(0)
  currentStreak    Int       @default(0)
  longestStreak    Int       @default(0)
  
  titles           UserTitle[]
  dailyLogs        DailyLog[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Level {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}

model DailyLog {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  date      DateTime @db.Date
  
  tasks     TaskCompletion[]
  dayRecap  String?           // User's journal entry
  aiReview  String?           // AI grammar feedback
  
  totalXp   Int      @default(0)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([userId, date])
}

model TaskCompletion {
  id          String   @id @default(cuid())
  dailyLogId  String
  dailyLog    DailyLog @relation(fields: [dailyLogId], references: [id])
  
  taskType    TaskType
  completed   Boolean  @default(false)
  completedAt DateTime?
  xpEarned    Int      @default(0)
  
  // Task-specific data
  metadata    Json?    // e.g., { podcastUrl, verbsLearned, sentences }
  
  @@unique([dailyLogId, taskType])
}

enum TaskType {
  PODCAST_LISTENING
  TRANSCRIBE_ARTICLE
  LEARN_VERBS
  SPEAKING_SESSION
  CREATE_SENTENCES
  DAY_RECAP
}

model Title {
  id          String   @id @default(cuid())
  name        String   @unique
  description String
  icon        String   // Emoji or icon name
  requirement String   // e.g., "7_day_streak", "100_xp"
  
  users       UserTitle[]
}

model UserTitle {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  titleId   String
  title     Title    @relation(fields: [titleId], references: [id])
  
  earnedAt  DateTime @default(now())
  
  @@unique([userId, titleId])
}
```

---

## 5. API Endpoints

### 5.1 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Create new account |
| POST | `/auth/login` | Login, returns JWT |
| POST | `/auth/refresh` | Refresh token |
| POST | `/auth/logout` | Invalidate token |

### 5.2 Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me` | Get current user profile |
| PATCH | `/users/me` | Update profile |
| GET | `/users/:id` | Get public profile |
| GET | `/users/me/stats` | Get user statistics |

### 5.3 Routine

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/routine/today` | Get today's routine & tasks |
| POST | `/routine/today` | Create today's log if not exists |
| GET | `/routine/history` | Get past daily logs |

### 5.4 Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tasks/:taskId/complete` | Mark task as complete |
| PATCH | `/tasks/:taskId` | Update task data |
| POST | `/tasks/day-recap/review` | Get AI grammar review |

### 5.5 Leaderboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/leaderboard/weekly` | Weekly XP rankings |
| GET | `/leaderboard/all-time` | All-time rankings |

---

## 6. Validation Middleware

### 6.1 Zod Validation Setup

```typescript
// middleware/validate.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          details: error.errors,
        });
      }
      next(error);
    }
  };
}
```

### 6.2 Using Shared Schemas

```typescript
// routes/auth.routes.ts
import { Router } from 'express';
import { RegisterSchema, LoginSchema } from '@fluently/types';
import { validate } from '../middleware/validate.middleware';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.post('/register', validate(RegisterSchema), authController.register);
router.post('/login', validate(LoginSchema), authController.login);

export default router;
```

---

## 7. Error Handling

### 7.1 Custom Error Classes

```typescript
// utils/errors.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}
```

### 7.2 Global Error Handler

```typescript
// middleware/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`[ERROR] ${error.message}`, error.stack);
  
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: error.message,
      code: error.code,
    });
  }
  
  // Prisma errors
  if (error.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({
      success: false,
      error: 'Database operation failed',
    });
  }
  
  // Default 500
  return res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
}
```

---

## 8. Service Layer Pattern

```typescript
// services/routine.service.ts
import { prisma } from '../config/database';
import { NotFoundError } from '../utils/errors';
import * as routineRepo from '../repositories/routine.repository';

export async function getTodayRoutine(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let dailyLog = await routineRepo.findDailyLog(userId, today);
  
  if (!dailyLog) {
    dailyLog = await routineRepo.createDailyLog(userId, today);
  }
  
  return dailyLog;
}

export async function completeTask(
  userId: string,
  taskId: string
) {
  const task = await routineRepo.findTask(taskId);
  
  if (!task) {
    throw new NotFoundError('Task');
  }
  
  // Verify ownership
  const dailyLog = await routineRepo.findDailyLogById(task.dailyLogId);
  if (dailyLog?.userId !== userId) {
    throw new NotFoundError('Task');
  }
  
  // Mark complete and award XP
  const xp = getXpForTaskType(task.taskType);
  
  return routineRepo.completeTask(taskId, xp);
}
```

---

## 9. Gemini AI Integration

```typescript
// services/ai.service.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function reviewGrammar(
  text: string,
  targetLanguage: string
): Promise<{ feedback: string; corrected: string }> {
  const prompt = `
You are a language teacher reviewing a student's writing in ${targetLanguage}.

Student's text:
"${text}"

Provide:
1. Brief feedback on what was done well
2. Grammar corrections with explanations
3. A corrected version of the text

Format your response as JSON:
{
  "feedback": "...",
  "corrections": ["..."],
  "corrected": "..."
}
`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();
  
  return JSON.parse(response);
}

export async function generatePracticeSentences(
  verbs: string[],
  targetLanguage: string,
  level: string
): Promise<string[]> {
  const prompt = `
Generate 3 practice sentences for each verb at ${level} level in ${targetLanguage}.
Verbs: ${verbs.join(', ')}

Return as JSON array of sentences.
`;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}
```

---

## 10. Server Entry Point

```typescript
// server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env';
import routes from './routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});

export default app;
```

---

## 11. Best Practices

1. **Never put business logic in controllers** - Controllers only handle HTTP
2. **Always validate input with Zod** - Use shared schemas from `@fluently/types`
3. **Use repositories for data access** - Don't use Prisma directly in services
4. **Handle errors consistently** - Use custom error classes
5. **Keep services testable** - Inject dependencies where possible
6. **Log appropriately** - Use structured logging in production
