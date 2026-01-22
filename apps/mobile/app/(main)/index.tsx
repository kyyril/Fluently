import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { useTodayRoutine } from '@/features/dashboard/hooks/useRoutine';
import { useAuthStore } from '@/stores/authStore';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Flame, Star, Trophy, Target, Headset, Mic2, PenLine, BookText, ChevronRight, Check } from 'lucide-react-native';
import { TASK_COLORS, TASK_NAMES, TASK_XP } from '@/lib/constants';

const TASK_ICONS: Record<string, React.ReactNode> = {
    PODCAST_LISTENING: <Headset className="text-task-podcast" size={24} />,
    SPEAKING_SESSION: <Mic2 className="text-task-speaking" size={24} />,
    CREATE_SENTENCES: <PenLine className="text-task-sentences" size={24} />,
    DAY_RECAP: <BookText className="text-task-recap" size={24} />,
};

export default function DashboardScreen() {
    const { user } = useAuthStore();
    const { data: routine, isLoading, refetch } = useTodayRoutine();

    const completedCount = routine?.tasks.filter((t) => t.completed).length || 0;
    const totalTasks = routine?.tasks.length || 0;
    const progress = routine?.progress || 0;

    return (
        <ScrollView
            className="flex-1 bg-black"
            contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#6366f1" />
            }
        >
            {/* Header */}
            <View className="mb-8 mt-10">
                <View className="flex-row items-center mb-1">
                    <Target size={12} className="text-indigo-500 mr-2" />
                    <Text className="text-indigo-500 text-[10px] font-black uppercase tracking-widest">
                        Daily Progress
                    </Text>
                </View>
                <Text className="text-white text-3xl font-black">
                    Hello, <Text className="text-indigo-500">{user?.displayName?.split(' ')[0] || 'Learner'}</Text>
                </Text>
                <Text className="text-zinc-400 text-sm mt-1">
                    {progress === 100
                        ? "You've crushed all your goals! 🚀"
                        : `You've completed ${completedCount} out of ${totalTasks} tasks.`}
                </Text>
            </View>

            {/* Stats Grid */}
            <View className="flex-row flex-wrap justify-between mb-8">
                <StatCard
                    icon={<Flame size={20} color="#f97316" />}
                    value={user?.currentStreak || 0}
                    label="Streak"
                    bgColor="bg-orange-500/10"
                />
                <StatCard
                    icon={<Star size={20} color="#eab308" />}
                    value={user?.totalXp || 0}
                    label="Points"
                    bgColor="bg-yellow-500/10"
                />
                <StatCard
                    icon={<Trophy size={20} color="#6366f1" />}
                    value={user?.longestStreak || 0}
                    label="Best"
                    bgColor="bg-indigo-500/10"
                />
                <StatCard
                    icon={<Target size={20} color="#22c55e" />}
                    value={`${completedCount}/${totalTasks}`}
                    label="Tasks"
                    bgColor="bg-green-500/10"
                />
            </View>

            {/* Progress Bar Alternative for Mobile */}
            <View className="mb-8">
                <View className="flex-row justify-between items-end mb-2">
                    <Text className="text-white font-bold">Overall Progress</Text>
                    <Text className="text-indigo-500 font-black text-xl">{progress}%</Text>
                </View>
                <View className="h-3 bg-zinc-900 rounded-full overflow-hidden">
                    <View
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </View>
            </View>

            {/* Routine Section */}
            <View className="mb-4 flex-row justify-between items-center">
                <Text className="text-zinc-500 text-xs font-black uppercase tracking-widest">
                    Today's Routine
                </Text>
                <Text className="text-zinc-700 text-[10px] font-bold">
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Text>
            </View>

            <View className="gap-y-3">
                {isLoading ? (
                    [1, 2, 3, 4].map((i) => (
                        <View key={i} className="h-20 bg-zinc-900 rounded-3xl animate-pulse" />
                    ))
                ) : (
                    routine?.tasks.map((task) => (
                        <Card key={task.id} className={task.completed ? 'opacity-50' : ''}>
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center flex-1">
                                    <View className={`w-12 h-12 rounded-2xl items-center justify-center ${task.completed ? 'bg-zinc-800' : TASK_COLORS[task.taskType]?.bg || 'bg-zinc-800'}`}>
                                        {task.completed ? <Check color="#71717a" size={24} /> : TASK_ICONS[task.taskType]}
                                    </View>
                                    <View className="ml-4 flex-1">
                                        <Text className={`text-white font-bold text-base ${task.completed ? 'line-through text-zinc-500' : ''}`}>
                                            {TASK_NAMES[task.taskType] || task.taskType}
                                        </Text>
                                        <View className="flex-row items-center mt-0.5">
                                            <Text className="text-indigo-500 text-[10px] font-black">+{TASK_XP[task.taskType] || 0} XP</Text>
                                            <Text className="text-zinc-600 mx-1.5 text-[10px]">•</Text>
                                            <Text className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">Daily Target</Text>
                                        </View>
                                    </View>
                                </View>
                                {task.completed ? (
                                    <View className="bg-green-500/10 px-2 py-1 rounded-md">
                                        <Text className="text-green-500 text-[8px] font-black uppercase tracking-widest">Completed</Text>
                                    </View>
                                ) : (
                                    <ChevronRight size={20} color="#52525b" />
                                )}
                            </View>
                        </Card>
                    ))
                )}
            </View>

            {/* Rewards Info */}
            <View className="mt-8 items-center">
                <View className="bg-indigo-500/5 px-4 py-2 rounded-full flex-row items-center">
                    <Star size={12} color="#eab308" fill="#eab308" />
                    <Text className="text-zinc-400 text-[10px] font-bold ml-2">
                        Finish all tasks to earn <Text className="text-indigo-500 font-black">200 XP</Text> bonus
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

function StatCard({ icon, value, label, bgColor }: { icon: React.ReactNode, value: string | number, label: string, bgColor: string }) {
    return (
        <View className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 w-[48%] mb-3">
            <View className={`w-9 h-9 ${bgColor} rounded-xl items-center justify-center mb-3`}>
                {icon}
            </View>
            <Text className="text-white text-xl font-black tracking-tight">{value}</Text>
            <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{label}</Text>
        </View>
    );
}
