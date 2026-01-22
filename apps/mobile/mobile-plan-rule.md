# 📱 Fluently Mobile App - Development Plan & Rules

> **React Native with Expo** - Best Practices for Senior Mobile Development

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Tech Stack](#-tech-stack)
3. [Architecture](#-architecture)
4. [Folder Structure](#-folder-structure)
5. [Performance Guidelines](#-performance-guidelines)
6. [API Integration](#-api-integration)
7. [State Management](#-state-management)
8. [Navigation](#-navigation)
9. [UI/UX Principles](#-uiux-principles)
10. [Security](#-security)
11. [Testing Strategy](#-testing-strategy)
12. [Build & Deploy](#-build--deploy)

---

## 🎯 Project Overview

### Scope (User-Only Features)

| Feature | Description | API Endpoint |
|---------|-------------|--------------|
| **Authentication** | Login, Register, Onboarding | `/api/auth/*` |
| **Dashboard** | Daily routine, progress, stats | `/api/routine/today` |
| **Task Completion** | Complete daily tasks | `/api/tasks/*/complete` |
| **Speaking Session** | AI-powered speaking practice | `/api/tasks/*` + Gemini AI |
| **Articles** | Read learning articles | `/api/articles` |
| **Leaderboard** | View rankings | `/api/leaderboard` |
| **Profile** | View/edit profile, stats | `/api/users/me` |

### Out of Scope
- ❌ Admin panel
- ❌ Landing page
- ❌ Content management

---

## 🛠 Tech Stack

### Core

| Tool | Version | Purpose |
|------|---------|---------|
| **React Native** | 0.76+ | Mobile framework |
| **Expo** | SDK 53+ | Development & build |
| **TypeScript** | 5.3+ | Type safety |

### State & Data

| Tool | Purpose |
|------|---------|
| **TanStack Query v5** | Server state, caching, sync |
| **Zustand** | Client state (auth, preferences) |
| **MMKV** | Fast encrypted storage |

### Navigation & UI

| Tool | Purpose |
|------|---------|
| **Expo Router** | File-based navigation |
| **NativeWind v4** | TailwindCSS for RN |
| **Lucide React Native** | Icons |
| **React Native Reanimated** | Animations |
| **React Native Gesture Handler** | Gestures |

### Audio & AI

| Tool | Purpose |
|------|---------|
| **expo-av** | Audio recording & playback |
| **@google/generative-ai** | Gemini AI integration |

---

## 🏗 Architecture

### Clean Architecture Pattern

```
┌─────────────────────────────────────────────┐
│                 Presentation                 │
│  (Screens, Components, Hooks)               │
├─────────────────────────────────────────────┤
│                 Application                  │
│  (TanStack Query Hooks, Zustand Stores)     │
├─────────────────────────────────────────────┤
│                   Domain                     │
│  (Types, Schemas from @fluently/types)      │
├─────────────────────────────────────────────┤
│               Infrastructure                 │
│  (API Client, Storage, Audio)               │
└─────────────────────────────────────────────┘
```

### Key Principles

1. **Single Responsibility** - Each module does one thing well
2. **Dependency Inversion** - Depend on abstractions, not implementations
3. **Feature-First** - Group by feature, not by type
4. **Colocation** - Keep related files close together

---

## 📁 Folder Structure

```
apps/mobile/
├── app/                          # Expo Router screens
│   ├── (auth)/                   # Auth group (login, register)
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── onboarding.tsx
│   ├── (main)/                   # Main app (protected)
│   │   ├── _layout.tsx           # Tab navigator
│   │   ├── index.tsx             # Dashboard (home)
│   │   ├── speaking.tsx          # Speaking session
│   │   ├── articles/
│   │   │   ├── index.tsx
│   │   │   └── [slug].tsx
│   │   ├── leaderboard.tsx
│   │   └── profile.tsx
│   ├── _layout.tsx               # Root layout
│   └── index.tsx                 # Entry redirect
│
├── src/
│   ├── components/               # Shared UI components
│   │   ├── ui/                   # Base components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   ├── layout/               # Layout components
│   │   │   ├── SafeArea.tsx
│   │   │   └── Container.tsx
│   │   └── feedback/             # Feedback components
│   │       ├── Toast.tsx
│   │       ├── LoadingScreen.tsx
│   │       └── ErrorBoundary.tsx
│   │
│   ├── features/                 # Feature modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts
│   │   │   └── screens/
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── StatsCard.tsx
│   │   │   │   ├── TaskCard.tsx
│   │   │   │   └── ProgressRing.tsx
│   │   │   └── hooks/
│   │   │       └── useRoutine.ts
│   │   │
│   │   ├── speaking/
│   │   │   ├── components/
│   │   │   │   ├── RecordButton.tsx
│   │   │   │   ├── Timer.tsx
│   │   │   │   └── ConversationBubble.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAudioRecorder.ts
│   │   │   │   └── useSpeakingSession.ts
│   │   │   └── utils/
│   │   │       └── audioProcessor.ts
│   │   │
│   │   ├── articles/
│   │   │   ├── components/
│   │   │   └── hooks/
│   │   │       └── useArticles.ts
│   │   │
│   │   ├── leaderboard/
│   │   │   └── hooks/
│   │   │       └── useLeaderboard.ts
│   │   │
│   │   └── profile/
│   │       ├── components/
│   │       └── hooks/
│   │           └── useProfile.ts
│   │
│   ├── lib/                      # Core utilities
│   │   ├── api/
│   │   │   ├── client.ts         # Axios instance
│   │   │   ├── interceptors.ts   # Auth interceptor
│   │   │   └── types.ts
│   │   ├── storage/
│   │   │   ├── mmkv.ts           # MMKV setup
│   │   │   └── secureStore.ts    # Expo SecureStore
│   │   ├── auth/
│   │   │   └── session.ts
│   │   └── constants.ts
│   │
│   ├── stores/                   # Zustand stores
│   │   ├── authStore.ts
│   │   └── settingsStore.ts
│   │
│   ├── hooks/                    # Global hooks
│   │   ├── useAppState.ts
│   │   └── useNetworkStatus.ts
│   │
│   ├── types/                    # Local types
│   │   └── navigation.ts
│   │
│   └── theme/                    # Design system
│       ├── colors.ts
│       ├── typography.ts
│       └── spacing.ts
│
├── assets/                       # Static assets
│   ├── images/
│   ├── fonts/
│   └── animations/               # Lottie files
│
├── app.json                      # Expo config
├── babel.config.js
├── metro.config.js
├── tailwind.config.js            # NativeWind config
├── tsconfig.json
└── package.json
```

---

## ⚡ Performance Guidelines

### 1. List Rendering

```typescript
// ✅ DO: Use FlashList for large lists
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={items}
  renderItem={({ item }) => <TaskCard task={item} />}
  estimatedItemSize={80}
  keyExtractor={(item) => item.id}
/>

// ❌ DON'T: Use FlatList without optimization
// ❌ DON'T: Inline renderItem functions (causes re-renders)
```

### 2. Memoization

```typescript
// ✅ DO: Memoize expensive components
import { memo, useCallback, useMemo } from 'react';

const TaskCard = memo(({ task, onPress }: Props) => {
  // Component logic
});

// ✅ DO: Memoize callbacks passed to children
const handlePress = useCallback(() => {
  completeTask(task.id);
}, [task.id]);

// ✅ DO: Memoize computed values
const progress = useMemo(() => 
  tasks.filter(t => t.completed).length / tasks.length * 100,
  [tasks]
);
```

### 3. Image Optimization

```typescript
// ✅ DO: Use expo-image for better performance
import { Image } from 'expo-image';

<Image
  source={{ uri: avatarUrl }}
  style={styles.avatar}
  contentFit="cover"
  placeholder={blurhash}
  transition={200}
/>
```

### 4. Animation Best Practices

```typescript
// ✅ DO: Use Reanimated for animations
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue 
} from 'react-native-reanimated';

const scale = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: withSpring(scale.value) }],
}));

// Run animations on UI thread (worklets)
const handlePressIn = () => {
  'worklet';
  scale.value = 0.95;
};
```

### 5. Bundle Size Optimization

```typescript
// ✅ DO: Tree-shakeable imports
import { Flame } from 'lucide-react-native';

// ❌ DON'T: Import entire library
import * as Icons from 'lucide-react-native';
```

### 6. Network Optimization

```typescript
// ✅ DO: Prefetch predictable data
const queryClient = useQueryClient();

// Prefetch on hover/focus
const prefetchArticle = (slug: string) => {
  queryClient.prefetchQuery({
    queryKey: ['article', slug],
    queryFn: () => api.get(`/articles/${slug}`),
    staleTime: 5 * 60 * 1000,
  });
};

// ✅ DO: Use appropriate stale times
useQuery({
  queryKey: ['user', 'me'],
  staleTime: 5 * 60 * 1000,  // 5 minutes
  gcTime: 10 * 60 * 1000,    // 10 minutes
});
```

---

## 🔌 API Integration

### API Client Setup

```typescript
// src/lib/api/client.ts
import axios from 'axios';
import { getToken } from '../auth/session';
import { API_URL } from '../constants';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth interceptor
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Error interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or logout
      await clearSession();
    }
    return Promise.reject(error);
  }
);
```

### Query Hook Pattern

```typescript
// src/features/dashboard/hooks/useRoutine.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';

interface DailyRoutine {
  id: string;
  date: string;
  tasks: Task[];
  totalXp: number;
  progress: number;
}

export function useTodayRoutine() {
  return useQuery({
    queryKey: ['routine', 'today'],
    queryFn: async () => {
      const { data } = await api.get<{ success: boolean; data: DailyRoutine }>(
        '/routine/today'
      );
      return data.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useCompleteTask() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ taskId, metadata }: CompleteTaskInput) => {
      const { data } = await api.post(`/tasks/${taskId}/complete`, { metadata });
      return data.data;
    },
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['routine'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    // Optimistic update
    onMutate: async ({ taskId }) => {
      await queryClient.cancelQueries({ queryKey: ['routine', 'today'] });
      const previous = queryClient.getQueryData(['routine', 'today']);
      
      queryClient.setQueryData(['routine', 'today'], (old: DailyRoutine) => ({
        ...old,
        tasks: old.tasks.map(t => 
          t.id === taskId ? { ...t, completed: true } : t
        ),
      }));
      
      return { previous };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['routine', 'today'], context?.previous);
    },
  });
}
```

---

## 📦 State Management

### Auth Store (Zustand + MMKV)

```typescript
// src/stores/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/lib/storage/mmkv';

interface User {
  id: string;
  email: string;
  displayName: string;
  targetLanguage: string;
  level: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  
  // Actions
  setAuth: (user: User, token: string) => void;
  setOnboarded: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isOnboarded: false,
      
      setAuth: (user, token) => set({ 
        user, 
        token, 
        isAuthenticated: true 
      }),
      
      setOnboarded: (isOnboarded) => set({ isOnboarded }),
      
      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false,
        isOnboarded: false,
      }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
```

### Settings Store

```typescript
// src/stores/settingsStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/lib/storage/mmkv';

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  hapticEnabled: boolean;
  notificationsEnabled: boolean;
  audioQuality: 'low' | 'medium' | 'high';
  
  setTheme: (theme: SettingsState['theme']) => void;
  toggleHaptic: () => void;
  toggleNotifications: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      hapticEnabled: true,
      notificationsEnabled: true,
      audioQuality: 'medium',
      
      setTheme: (theme) => set({ theme }),
      toggleHaptic: () => set((s) => ({ hapticEnabled: !s.hapticEnabled })),
      toggleNotifications: () => set((s) => ({ 
        notificationsEnabled: !s.notificationsEnabled 
      })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
```

---

## 🧭 Navigation

### Root Layout

```typescript
// app/_layout.tsx
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/api/queryClient';
import { useAuthStore } from '@/stores/authStore';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
      </Stack>
    </QueryClientProvider>
  );
}
```

### Auth Layout (Guest Only)

```typescript
// app/(auth)/_layout.tsx
import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';

export default function AuthLayout() {
  const { isAuthenticated, isOnboarded } = useAuthStore();
  
  if (isAuthenticated && isOnboarded) {
    return <Redirect href="/(main)" />;
  }
  
  if (isAuthenticated && !isOnboarded) {
    return <Redirect href="/(auth)/onboarding" />;
  }
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}
```

### Main Tab Layout (Protected)

```typescript
// app/(main)/_layout.tsx
import { Redirect, Tabs } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { Home, Mic2, BookOpen, Trophy, User } from 'lucide-react-native';

export default function MainLayout() {
  const { isAuthenticated, isOnboarded } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }
  
  if (!isOnboarded) {
    return <Redirect href="/(auth)/onboarding" />;
  }
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#9ca3af',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0f0f0f',
          borderTopColor: '#262626',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="speaking"
        options={{
          title: 'Speaking',
          tabBarIcon: ({ color, size }) => <Mic2 color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="articles"
        options={{
          title: 'Articles',
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Ranking',
          tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
```

---

## 🎨 UI/UX Principles

### Design System (Mirror Web)

```typescript
// src/theme/colors.ts
export const colors = {
  primary: '#6366f1',     // Indigo
  primaryDark: '#4f46e5',
  
  background: '#0a0a0a',
  surface: '#171717',
  surfaceLight: '#262626',
  
  text: '#fafafa',
  textSecondary: '#a1a1aa',
  textMuted: '#71717a',
  
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  
  // Task colors
  podcast: '#3b82f6',
  speaking: '#a855f7',
  sentences: '#f97316',
  recap: '#22c55e',
};

// src/theme/typography.ts
export const typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
    black: 'Inter-Black',
  },
  sizes: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
};

// src/theme/spacing.ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
};
```

### Component Example

```typescript
// src/components/ui/Button.tsx
import { Pressable, Text, ActivityIndicator } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useSettingsStore } from '@/stores/settingsStore';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps {
  onPress: () => void;
  children: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
}

export function Button({
  onPress,
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
}: ButtonProps) {
  const scale = useSharedValue(1);
  const { hapticEnabled } = useSettingsStore();
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  const handlePressIn = () => {
    scale.value = withSpring(0.97);
    if (hapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };
  
  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || isLoading}
      style={[animatedStyle, styles[variant], styles[size]]}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{children}</Text>
      )}
    </AnimatedPressable>
  );
}
```

---

## 🔐 Security

### Secure Token Storage

```typescript
// src/lib/storage/secureStore.ts
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'fluently_auth_token';

export async function saveToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function deleteToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
```

### Security Rules

1. **Never log sensitive data** (tokens, passwords)
2. **Use SecureStore for auth tokens**
3. **MMKV for non-sensitive data only**
4. **Certificate pinning for production**
5. **Input validation with Zod**
6. **Sanitize WebView content**

---

## 🧪 Testing Strategy

### Unit Tests (Jest)

```typescript
// __tests__/stores/authStore.test.ts
import { useAuthStore } from '@/stores/authStore';

describe('AuthStore', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it('should set auth correctly', () => {
    const user = { id: '1', email: 'test@test.com', displayName: 'Test' };
    useAuthStore.getState().setAuth(user, 'token123');
    
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().user).toEqual(user);
  });
});
```

### Integration Tests (React Native Testing Library)

```typescript
// __tests__/features/dashboard/DashboardScreen.test.tsx
import { render, screen, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardScreen from '@/app/(main)/index';

const wrapper = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

describe('DashboardScreen', () => {
  it('should display loading state initially', () => {
    render(<DashboardScreen />, { wrapper });
    expect(screen.getByTestId('loading-skeleton')).toBeTruthy();
  });
});
```

---

## 🚀 Build & Deploy

### Environment Configuration

```bash
# .env.development
EXPO_PUBLIC_API_URL=http://localhost:4000/api
EXPO_PUBLIC_GEMINI_API_KEY=your_dev_key

# .env.production
EXPO_PUBLIC_API_URL=https://api.fluently.app/api
EXPO_PUBLIC_GEMINI_API_KEY=your_prod_key
```

### EAS Build

```json
// eas.json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "env": {
        "APP_ENV": "preview"
      }
    },
    "production": {
      "env": {
        "APP_ENV": "production"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### Build Commands

```bash
# Development build
eas build --profile development --platform all

# Preview (internal testing)
eas build --profile preview --platform all

# Production
eas build --profile production --platform all

# Submit to stores
eas submit --platform all
```

---

## 📝 Development Checklist

### Setup Phase
- [x] Initialize Expo project with TypeScript
- [x] Configure NativeWind
- [x] Setup folder structure
- [x] Configure API client
- [x] Setup Zustand stores
- [x] Configure navigation

### Core Features
- [x] Authentication flow (login, register)
- [x] Onboarding flow
- [x] Dashboard screen
- [x] Task completion
- [x] Speaking session with audio
- [x] Articles reader
- [x] Leaderboard
- [x] Profile screen

### Polish
- [x] Loading states & skeletons
- [x] Error handling & toasts
- [x] Pull-to-refresh
- [x] Haptic feedback
- [x] Animations
- [x] Dark mode

### Testing & QA
- [x] Unit tests for stores
- [ ] Integration tests
- [ ] E2E tests (Playwright)
- [ ] Performance profiling
- [ ] Accessibility audit

---

## 🔗 Shared Code with Web

The following can be shared from existing packages:

| Package | Usage |
|---------|-------|
| `@fluently/types` | Zod schemas, TypeScript types |

Note: `@fluently/ui` cannot be used directly (React DOM vs React Native), but patterns and logic can be mirrored.

---

*Last Updated: 2026-01-23*
*Version: 1.1.0*

