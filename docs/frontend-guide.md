# Frontend Development Guide
## Fluently - Web Application

---

## 1. Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14+ (App Router) |
| Styling | TailwindCSS + CSS Variables |
| Icons | Lucide React |
| Server State | TanStack Query v5 |
| Client State | Zustand |
| Validation | Zod (shared with backend) |
| HTTP Client | Axios / Fetch |

---

## 2. Directory Structure

```
apps/web/src/
├── app/                      # Next.js App Router
│   ├── (auth)/               # Auth route group
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/          # Protected routes
│   │   ├── layout.tsx        # Dashboard layout
│   │   ├── page.tsx          # Main dashboard
│   │   ├── leaderboard/
│   │   └── profile/
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   └── globals.css           # Global styles & CSS vars
│
├── features/                 # Feature modules
│   ├── auth/
│   │   ├── components/       # Auth-specific components
│   │   ├── hooks/            # useAuth, useSession
│   │   └── stores/           # authStore.ts
│   ├── routine/
│   │   ├── components/       # TaskCard, ProgressBar
│   │   ├── hooks/            # useRoutine, useTasks
│   │   └── api/              # Routine API calls
│   ├── leaderboard/
│   │   ├── components/
│   │   └── hooks/
│   └── onboarding/
│       ├── components/
│       └── stores/
│
├── components/               # Shared components
│   ├── ui/                   # Re-export from @fluently/ui
│   ├── layout/               # Header, Sidebar, Footer
│   └── common/               # Loading, Error, etc.
│
├── lib/                      # Utilities
│   ├── api-client.ts         # Axios instance + interceptors
│   ├── query-client.ts       # TanStack Query setup
│   └── utils.ts              # Helper functions
│
└── stores/                   # Global Zustand stores
    ├── ui-store.ts           # Sidebar, modals, theme
    └── index.ts
```

---

## 3. Design System Usage

### 3.1 CSS Variables (Theme)

All colors are defined as CSS variables in `globals.css`:

```css
:root {
  /* Primary Colors */
  --color-primary: 220 90% 56%;
  --color-primary-foreground: 0 0% 100%;
  
  /* Background */
  --color-background: 0 0% 100%;
  --color-foreground: 222 47% 11%;
  
  /* Surface (Cards, Inputs) */
  --color-surface: 210 40% 98%;
  --color-surface-foreground: 222 47% 11%;
  
  /* Muted */
  --color-muted: 210 40% 96%;
  --color-muted-foreground: 215 16% 47%;
  
  /* Accent */
  --color-accent: 210 40% 96%;
  
  /* Destructive */
  --color-destructive: 0 84% 60%;
  
  /* Border & Ring */
  --color-border: 214 32% 91%;
  --color-ring: 220 90% 56%;
  
  /* Radius */
  --radius: 0.5rem;
}

.dark {
  --color-background: 222 47% 11%;
  --color-foreground: 210 40% 98%;
  --color-surface: 217 33% 17%;
  --color-surface-foreground: 210 40% 98%;
  --color-muted: 217 33% 17%;
  --color-muted-foreground: 215 20% 65%;
  --color-border: 217 33% 17%;
}
```

### 3.2 Using Design Tokens in Tailwind

```tsx
// ✅ Correct - Uses CSS variables
<div className="bg-background text-foreground">
  <Card className="bg-surface">
    <Button className="bg-primary text-primary-foreground">
      Click me
    </Button>
  </Card>
</div>

// ❌ Incorrect - Hardcoded colors
<div className="bg-white text-gray-900">
  <div className="bg-blue-500">...</div>
</div>
```

### 3.3 Importing UI Components

```tsx
// Import from shared package
import { Button, Card, Input, Modal } from '@fluently/ui';

// Use with consistent styling
export function TaskCard({ task }) {
  return (
    <Card>
      <h3>{task.name}</h3>
      <Button variant="primary">Complete</Button>
    </Card>
  );
}
```

---

## 4. State Management Rules

### 4.1 When to Use What

| State Type | Tool | Examples |
|------------|------|----------|
| **Server Data** | TanStack Query | User profile, tasks, leaderboard |
| **UI State** | Zustand | Sidebar open, modal state, theme |
| **Form State** | React Hook Form | Login form, task creation |
| **URL State** | Next.js params | Filters, pagination, search |

### 4.2 TanStack Query Example

```tsx
// features/routine/hooks/useRoutine.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export function useTodayRoutine() {
  return useQuery({
    queryKey: ['routine', 'today'],
    queryFn: () => api.get('/routine/today'),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCompleteTask() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (taskId: string) => api.post(`/tasks/${taskId}/complete`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routine', 'today'] });
    },
  });
}
```

### 4.3 Zustand Store Example

```tsx
// stores/ui-store.ts
import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  modalOpen: string | null;
  theme: 'light' | 'dark' | 'system';
  
  toggleSidebar: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  modalOpen: null,
  theme: 'system',
  
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  openModal: (id) => set({ modalOpen: id }),
  closeModal: () => set({ modalOpen: null }),
  setTheme: (theme) => set({ theme }),
}));
```

---

## 5. API Integration

### 5.1 API Client Setup

```tsx
// lib/api-client.ts
import axios from 'axios';
import { z } from 'zod';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor for auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response validation helper
export async function fetchWithValidation<T>(
  url: string,
  schema: z.ZodSchema<T>
): Promise<T> {
  const response = await api.get(url);
  return schema.parse(response.data);
}
```

### 5.2 Using Zod for Response Validation

```tsx
import { z } from 'zod';
import { fetchWithValidation } from '@/lib/api-client';

// Import shared schema from packages/types
import { UserSchema } from '@fluently/types';

export async function getCurrentUser() {
  return fetchWithValidation('/users/me', UserSchema);
}
```

---

## 6. Component Patterns

### 6.1 Feature Component Structure

```tsx
// features/routine/components/TaskCard.tsx
'use client';

import { Card, Button } from '@fluently/ui';
import { useCompleteTask } from '../hooks/useRoutine';
import { Check } from 'lucide-react';

interface TaskCardProps {
  task: {
    id: string;
    name: string;
    xp: number;
    completed: boolean;
  };
}

export function TaskCard({ task }: TaskCardProps) {
  const { mutate: complete, isPending } = useCompleteTask();
  
  return (
    <Card className="flex items-center justify-between p-4">
      <div>
        <h3 className="font-medium">{task.name}</h3>
        <span className="text-muted-foreground text-sm">+{task.xp} XP</span>
      </div>
      
      <Button
        variant={task.completed ? 'ghost' : 'primary'}
        size="sm"
        disabled={task.completed || isPending}
        onClick={() => complete(task.id)}
      >
        {task.completed ? <Check className="h-4 w-4" /> : 'Complete'}
      </Button>
    </Card>
  );
}
```

### 6.2 Page Component Structure

```tsx
// app/(dashboard)/page.tsx
import { Suspense } from 'react';
import { RoutineList } from '@/features/routine/components/RoutineList';
import { StatsHeader } from '@/features/routine/components/StatsHeader';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <Suspense fallback={<LoadingSkeleton />}>
        <StatsHeader />
      </Suspense>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">Today's Routine</h2>
      
      <Suspense fallback={<LoadingSkeleton />}>
        <RoutineList />
      </Suspense>
    </div>
  );
}
```

---

## 7. Dark Mode Implementation

```tsx
// components/ThemeProvider.tsx
'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/stores/ui-store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useUIStore((s) => s.theme);
  
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System preference
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', isDark);
    }
  }, [theme]);
  
  return <>{children}</>;
}
```

---

## 8. Best Practices

1. **Always use CSS variables** for colors, never hardcode
2. **Colocate feature code** - keep hooks, components, and API calls together
3. **Validate API responses** with Zod schemas from `@fluently/types`
4. **Use TanStack Query** for any data from the server
5. **Keep Zustand stores minimal** - only for true UI state
6. **Use `'use client'`** directive only where needed
