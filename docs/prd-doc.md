# Product Requirement Document (PRD)
## Fluently - Language Learning App

### 1. Overview

**Product Name:** Fluently  
**Version:** 1.0.0  
**Last Updated:** 2026-01-08

---

### 2. Purpose & Vision

**Fluently** is a structured daily routine language learning application designed to build consistent learning habits through gamification. Unlike traditional language apps that focus on isolated lessons, Fluently creates a **holistic daily practice regimen** that covers all four language skills: *Listening, Writing, Reading,* and *Speaking*.

---

### 3. Target Audience

| Segment | Description |
|---------|-------------|
| **Primary** | Self-learners aged 18-35 who want structured language practice |
| **Secondary** | Language enthusiasts who struggle with consistency |
| **Tertiary** | Professionals preparing for language certifications |

---

### 4. Core Value Proposition

> **"Structure breeds fluency."**

- **Habit-First Approach**: Gamified daily routines that build muscle memory
- **Accountability**: Leaderboards and streaks to maintain motivation
- **AI-Powered Feedback**: Instant grammar correction and personalized practice

---

### 5. Core Features

#### 5.1 Daily Routine System

The heart of Fluently is a **6-step daily routine**:

| # | Activity | Duration | Skill |
|---|----------|----------|-------|
| 1 | **Podcast Listening** | ~30 min | Listening |
| 2 | **Article Transcription** | ~20 min | Writing/Reading |
| 3 | **Verb Learning** | ~15 min | Vocabulary |
| 4 | **Speaking Session** | 45 min | Speaking |
| 5 | **Sentence Creation** | ~15 min | Grammar |
| 6 | **Day Recap Journal** | ~15 min | Writing |

**Completion Rules:**
- Users check off each activity as completed
- XP awarded per activity
- Bonus XP for completing all 6 activities

#### 5.2 Gamification System

| Feature | Description |
|---------|-------------|
| **XP System** | Points earned per completed activity |
| **Daily Streak** | Consecutive days with at least 1 activity |
| **Weekly Streak** | Weeks with 100% routine completion |
| **Leaderboard** | Weekly rankings among all users |
| **Titles** | Unlockable badges based on milestones |

**Title Examples:**
- 🌱 *Seedling* - First week completed
- 🔥 *On Fire* - 7-day streak
- 🏆 *Champion* - Top 10 on leaderboard
- 💎 *Diamond* - 100-day streak

#### 5.3 AI Integration (Google Gemini)

| Feature | AI Usage |
|---------|----------|
| **Grammar Check** | Corrects Day Recap journal entries |
| **Sentence Feedback** | Reviews user-created sentences |
| **Practice Generator** | Generates contextual practice sentences |

---

### 6. Onboarding Flow

```
┌─────────────────┐
│  Landing Page   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Registration  │
│ (Email/OAuth)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Select Language │
│ (Target + Native)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Set Level      │
│ (Beginner/Inter │
│  /Advanced)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Customize Daily │
│ Routine Goals   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Dashboard    │
└─────────────────┘
```

---

### 7. Technical Requirements

| Category | Requirement |
|----------|-------------|
| **Frontend** | Next.js 14+, TailwindCSS, TypeScript |
| **Backend** | Express.js, Prisma, PostgreSQL |
| **AI** | Google Gemini API |
| **Auth** | JWT-based or OAuth 2.0 |
| **Deployment** | Vercel (Frontend), Railway/Render (Backend) |

---

### 8. Success Metrics

| Metric | Target |
|--------|--------|
| Daily Active Users (DAU) | 10,000+ |
| 7-Day Retention | > 40% |
| Average Session Length | > 20 min |
| Routine Completion Rate | > 60% |

---

### 9. Future Roadmap

- [ ] Mobile App (React Native)
- [ ] Community Features (Discussion forums)
- [ ] Premium Tier (Advanced AI features)
- [ ] Tutor Marketplace
- [ ] Certification Prep Mode
