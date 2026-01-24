'use client';

import { useState, useEffect } from 'react';
import { Modal, ModalFooter, Button, Input } from '@fluently/ui';
import { useCompleteTask, getTaskName, getTaskXp } from '@/hooks';
import { Loader2, CheckCircle2, AlertCircle, Headphones, PenLine, Languages, Mic, Send, BookOpen, Plus, Trash2 } from 'lucide-react';

interface Task {
    id: string;
    taskType: string;
    completed: boolean;
    metadata?: any;
}

interface TaskDialogProps {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
}

export function TaskDialog({ task, isOpen, onClose }: TaskDialogProps) {
    const { mutate: completeTask, isPending: isCompleting } = useCompleteTask();
    const [step, setStep] = useState<'intro' | 'active' | 'success'>('intro');
    const [input, setInput] = useState('');
    const [aiResult, setAiResult] = useState<any>(null);
    const [sentences, setSentences] = useState(['', '', '']);
    const [podcastForm, setPodcastForm] = useState({
        title: '',
        description: '',
        link: '',
        conclusion: ''
    });


    useEffect(() => {
        if (isOpen && task) {
            if (task.completed) {
                setStep('success');
                if (task.metadata) {
                    if (task.taskType === 'PODCAST_LISTENING') {
                        setPodcastForm({
                            title: task.metadata.title || '',
                            description: task.metadata.description || '',
                            link: task.metadata.link || '',
                            conclusion: task.metadata.conclusion || ''
                        });
                    } else if (task.taskType === 'DAY_RECAP') {
                        setInput(task.metadata.content || '');
                    } else if (task.taskType === 'CREATE_SENTENCES') {
                        setSentences(task.metadata.sentences || ['', '', '']);
                    }
                }
            } else {
                setStep('intro');
                setInput('');
                setAiResult(null);
                setSentences(['', '', '']);
                setPodcastForm({ title: '', description: '', link: '', conclusion: '' });
            }
        }
    }, [isOpen, task?.id]);

    if (!task) return null;

    const handleComplete = (metadata?: Record<string, any>) => {
        completeTask({ taskId: task.id, metadata }, {
            onSuccess: () => {
                setStep('success');
            }
        });
    };


    const renderTaskIntro = () => {
        switch (task.taskType) {
            case 'PODCAST_LISTENING':
                return (
                    <div className="text-center space-y-6 py-6">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Headphones className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black tracking-tight">Podcast Review</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed px-4">
                                Listen to at least 15 minutes of content. Focus on native speakers and summarize your takeaways.
                            </p>
                        </div>
                        <Button className="w-full h-12 font-bold" onClick={() => setStep('active')}>Start Task</Button>
                    </div>
                );

            case 'DAY_RECAP':
                return (
                    <div className="text-center space-y-6 py-6">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black tracking-tight">Daily Journal</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed px-4">
                                Summarize your day in English. Track your progress and common mistakes you made today.
                            </p>
                        </div>
                        <Button className="w-full h-12 font-bold" onClick={() => setStep('active')}>Start Writing</Button>
                    </div>
                );


            case 'CREATE_SENTENCES':
                return (
                    <div className="text-center space-y-6 py-6">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <PenLine className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black tracking-tight">Construction</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed px-4">
                                Practice your verbs by building full sentences. Focus on natural phrasing and grammar.
                            </p>
                        </div>
                        <Button className="w-full h-12 font-bold" onClick={() => setStep('active')}>Start Writing</Button>
                    </div>
                );
            default:
                return (
                    <div className="text-center space-y-6 py-6">
                        <h3 className="text-2xl font-black tracking-tight">{getTaskName(task.taskType)}</h3>
                        <p className="text-muted-foreground text-sm">Ready to start this language learning task?</p>
                        <Button className="w-full h-12 font-bold" onClick={() => setStep('active')}>Start Task</Button>
                    </div>
                );
        }
    };

    const renderActiveTask = () => {
        switch (task.taskType) {
            case 'PODCAST_LISTENING':
                return (
                    <div className="space-y-4">
                        <div className="space-y-1.5 px-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Title</label>
                            <Input
                                placeholder="e.g. Spanish with Juan - Episode 45"
                                value={podcastForm.title}
                                onChange={(e) => setPodcastForm({ ...podcastForm, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1.5 px-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Key Takeaways</label>
                            <textarea
                                className="w-full min-h-[100px] p-4 bg-muted/30 rounded-2xl border-none focus:ring-1 focus:ring-primary/40 outline-none resize-none text-sm transition-all"
                                placeholder="What did you learn from this session?"
                                value={podcastForm.description}
                                onChange={(e) => setPodcastForm({ ...podcastForm, description: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3 px-1">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40 italic">Link (Optional)</label>
                                <Input
                                    placeholder="Source..."
                                    value={podcastForm.link}
                                    onChange={(e) => setPodcastForm({ ...podcastForm, link: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40 italic">Note (Optional)</label>
                                <Input
                                    placeholder="Quick note..."
                                    value={podcastForm.conclusion}
                                    onChange={(e) => setPodcastForm({ ...podcastForm, conclusion: e.target.value })}
                                />
                            </div>
                        </div>
                        <Button
                            className="w-full h-14 mt-4 font-bold"
                            onClick={() => handleComplete(podcastForm)}
                            disabled={!podcastForm.title || !podcastForm.description || isCompleting}
                        >
                            {isCompleting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                            Finish Task
                        </Button>
                    </div>
                );
            case 'DAY_RECAP':
                return (
                    <div className="space-y-4">
                        <div className="space-y-1.5 px-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Daily Journal Entry</label>
                            <textarea
                                className="w-full min-h-[200px] p-5 bg-muted/30 rounded-2xl border-none focus:ring-1 focus:ring-primary/40 outline-none resize-none text-sm leading-relaxed"
                                placeholder="Today I practiced my speaking skills and learned new verbs..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <Button
                            className="w-full h-14 font-bold"
                            onClick={() => handleComplete({ content: input })}
                            disabled={isCompleting || input.length < 10}
                        >
                            {isCompleting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                            Post to Timeline
                        </Button>
                    </div>
                );

            case 'SPEAKING_SESSION':
                return (
                    <div className="text-center space-y-8 py-8">
                        <div className="mx-auto w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center ">
                            <Mic className="h-10 w-10 text-primary" />
                        </div>
                        <div className="space-y-2 px-4">
                            <h3 className="text-3xl font-black tracking-tight">Practice Session</h3>
                            <p className="text-muted-foreground text-sm">Finish your active speaking session to claim rewards.</p>
                        </div>
                        <Button className="w-full h-14 font-bold" onClick={() => handleComplete()}>Finish Session</Button>
                    </div>
                );

            case 'CREATE_SENTENCES': {
                const canAdd = sentences.length < 10;
                const canRemove = sentences.length > 3;
                const allFilled = sentences.every(s => s.trim().length >= 5);

                const addSentence = () => { if (canAdd) setSentences([...sentences, '']); };
                const removeSentence = (index: number) => {
                    if (canRemove) {
                        const newSentences = [...sentences];
                        newSentences.splice(index, 1);
                        setSentences(newSentences);
                    }
                };

                return (
                    <div className="space-y-4">
                        <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 px-1 pt-1">
                            {sentences.map((sentence, i) => (
                                <div key={i} className="relative group animate-in fade-in slide-in-from-top-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-primary/60">
                                            Construct {i + 1}
                                        </label>
                                        {canRemove && (
                                            <button onClick={() => removeSentence(i)} className="text-muted-foreground/30 hover:text-red-500 transition-colors">
                                                <Trash2 className="h-3 w-3" />
                                            </button>
                                        )}
                                    </div>
                                    <Input
                                        placeholder="Type your sentence..."
                                        value={sentence}
                                        onChange={(e) => {
                                            const newSentences = [...sentences];
                                            newSentences[i] = e.target.value;
                                            setSentences(newSentences);
                                        }}
                                        className={sentence.trim().length > 0 && sentence.trim().length < 5 ? "ring-1 ring-red-500/50" : ""}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 pt-4 px-1">
                            {canAdd && (
                                <Button
                                    variant="ghost"
                                    className="flex-1 bg-surface/50 rounded-2xl h-14 text-muted-foreground hover:text-primary"
                                    onClick={addSentence}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add
                                </Button>
                            )}

                            <Button
                                className="flex-[3] h-14 font-black uppercase tracking-widest text-xs"
                                onClick={() => handleComplete({ sentences: sentences.filter(s => s.trim()) })}
                                disabled={!allFilled || isCompleting}
                            >
                                {isCompleting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                                Submit Construction
                            </Button>
                        </div>
                    </div>
                );
            }
            default:
                return null;
        }
    };

    const renderSuccess = () => (
        <div className="text-center space-y-10 py-6">
            <div className="mx-auto w-24 h-24 bg-green-500/10 rounded-2xl flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>

            <div className="space-y-2">
                <h3 className="text-4xl font-black tracking-tighter">Excellent!</h3>
                <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
                    You earned <span className="text-primary">+{getTaskXp(task.taskType)} XP</span>
                </p>
            </div>

            <Button className="w-full h-14 font-bold" onClick={() => {
                onClose();
                setTimeout(() => {
                    setStep('intro');
                    setInput('');
                    setAiResult(null);
                    setPodcastForm({ title: '', description: '', link: '', conclusion: '' });
                }, 300);
            }}>
                Back to Dashboard
            </Button>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title=""
            size="md"
        >
            <div key={step} className="animate-in fade-in duration-500">
                {step === 'intro' && renderTaskIntro()}
                {step === 'active' && renderActiveTask()}
                {step === 'success' && renderSuccess()}
            </div>
        </Modal>
    );
}
