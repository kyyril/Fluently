# Fluently

A structured daily routine language learning app with gamification elements.

## Key Features

- **AI Speaking Coach**: Real-time voice conversations powered by **Google Gemini**.
- **Daily Routine**: Structured 4-step daily workflow: Podcast Listening, Speaking Session, Sentence Creation, and Day Recap Journal.
- **Gamification**: Earn XP, level up, and maintain streaks. Compete on the global leaderboard.
- **Platform Sync**: Seamless data synchronization between Web and Mobile (Expo/React Native).
- **Smart Articles**: Curated reading materials with built-in vocabulary learning, interactive translations, and high-quality audio pronunciation.

## Preview

### Dashboard
![Dashboard](https://res.cloudinary.com/da5ggxk01/image/upload/v1769253224/e9acb5df-70d6-4979-8983-d194634c0ec8.png)

### Speaking Session
![Speaking Session](https://res.cloudinary.com/da5ggxk01/image/upload/v1769255992/dba91d31-499d-4efd-811a-3d6f65c62c3a.png)

### Leaderboard
![Leaderboard](https://res.cloudinary.com/da5ggxk01/image/upload/v1769253422/d66ac437-6c9e-481e-951b-e67f696fb13f.png)

### Mobile App (React Native)
![Mobile App](https://res.cloudinary.com/da5ggxk01/image/upload/v1769257077/68e027a8-b029-4bcd-a833-2a7a48855a24.png)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Web | Next.js 14, TailwindCSS, TanStack Query |
| Mobile | Expo, React Native, NativeWind |
| Backend | Express.js, Prisma, PostgreSQL (Neon) |
| AI | Google Gemini |
| Cache | Redis (ioredis) |

## Development

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev
```

## Test API
```bash
cd apps/api
powershell -ExecutionPolicy Bypass -File .\test-api.ps1
```