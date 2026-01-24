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

## CI/CD dengan Vercel & GitHub
Proyek ini dikonfigurasi untuk CI/CD otomatis. Setiap kali Anda melakukan `push` ke branch `main`, Vercel akan memulai proses deploy dan GitHub Actions akan menjalankan validasi kode.

### 1. Validasi Kode Otomatis (GitHub Actions)
File `.github/workflows/ci.yml` telah dikonfigurasi untuk:
- Menjalankan `pnpm install`.
- Melakukan Linting ke seluruh workspace.
- Memastikan build berhasil (Type check).

### 2. Deployment Otomatis (Vercel)
Untuk efisiensi monorepo, gunakan fitur **Ignore Build Step** di dashboard Vercel agar Vercel hanya mendeploy aplikasi yang berubah.

#### Konfigurasi per Project:
1. **API (Express Serverless)**:
   - Root Directory: `apps/api`
   - Build Command: `cd ../.. && npx turbo run build --filter=@fluently/api`
   - Ignore Build Step: `npx turbo-ignore`
2. **Web (Next.js)**:
   - Root Directory: `apps/web`
   - Build Command: `cd ../.. && npx turbo run build --filter=@fluently/web`
   - Ignore Build Step: `npx turbo-ignore`

> **Note**: Penggunaan `npx turbo-ignore` memastikan bahwa jika Anda hanya mengubah kode di folder `apps/web`, Vercel tidak akan membuang-buang waktu (dan limit menit build) untuk mendeploy ulang `apps/api`.

### 3. Environment Variables (Wajib)
Pastikan variable berikut diset di Vercel:
- **API**: `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, `NEON_AUTH_JWKS_URL`, `GEMINI_API_KEY`.
- **Web**: `NEXT_PUBLIC_API_URL` (URL deploy API Anda).


## Test api
cd apps/api
powershell -ExecutionPolicy Bypass -File .\test-api.ps1

## Reset database
npx prisma db push --force-reset && npx tsx prisma/seed.ts
