// Basic mocks
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// Mock MMKV
jest.mock('react-native-mmkv', () => ({
    MMKV: jest.fn().mockImplementation(() => ({
        getString: jest.fn(),
        set: jest.fn(),
        delete: jest.fn(),
        getAllKeys: jest.fn(() => []),
    })),
}));

// Mock Expo modules
jest.mock('expo-secure-store', () => ({
    setItemAsync: jest.fn(),
    getItemAsync: jest.fn(),
    deleteItemAsync: jest.fn(),
}));

jest.mock('expo-haptics', () => ({
    impactAsync: jest.fn(),
    notificationAsync: jest.fn(),
    ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
    NotificationFeedbackType: { Success: 'success', Warning: 'warning', Error: 'error' },
}));

// Mock NativeWind
jest.mock('nativewind', () => ({
    styled: (Component) => Component,
}));
