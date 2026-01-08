# Fluently

A structured daily routine language learning app with gamification elements.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

## Project Structure

```
├── apps/
│   ├── api/          # Express.js backend
│   ├── web/          # Next.js frontend
│   └── mobile/       # (Future)
├── packages/
│   ├── ui/           # Shared components
│   └── types/        # Shared Zod schemas
└── docs/             # Documentation
```

## Documentation

- [Product Requirements](./docs/prd-doc.md)
- [User Flow](./docs/app-flow-doc.md)
- [Frontend Guide](./docs/frontend-guide.md)
- [Backend Guide](./docs/backend-guide.md)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, TailwindCSS, Zustand, TanStack Query |
| Backend | Express.js, Prisma, PostgreSQL |
| AI | Google Gemini |
| Validation | Zod (shared) |
