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
                    <div className="text-center space-y-4 py-4">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <Headphones className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Listen to a Podcast</h3>
                        <p className="text-muted-foreground">
                            Listen to at least 15 minutes of content in your target language.
                            Focus on native speakers and try to catch the main theme.
                        </p>
                        <Button className="w-full" onClick={() => setStep('active')}>Start Task</Button>
                    </div>
                );

            case 'DAY_RECAP':
                return (
                    <div className="text-center space-y-4 py-4">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Journal Your Day</h3>
                        <p className="text-muted-foreground">
                            Summarize your day in your target language. Keep track of your
                            learning progress and daily activities.
                        </p>
                        <Button className="w-full" onClick={() => setStep('active')}>Start Writing</Button>
                    </div>
                );


            case 'CREATE_SENTENCES':
                return (
                    <div className="text-center space-y-4 py-4">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border-none">
                            <PenLine className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Sentence Construction</h3>
                        <p className="text-muted-foreground">
                            Take the verbs you just learned and use them in full sentences.
                            This builds practical speaking and writing skills.
                        </p>
                        <Button className="w-full" onClick={() => setStep('active')}>Start Writing</Button>
                    </div>
                );
            default:
                return (
                    <div className="text-center space-y-4 py-4">
                        <h3 className="text-xl font-bold">{getTaskName(task.taskType)}</h3>
                        <p className="text-muted-foreground">Ready to start this language learning task?</p>
                        <Button className="w-full" onClick={() => setStep('active')}>Start Task</Button>
                    </div>
                );
        }
    };

    const renderActiveTask = () => {
        switch (task.taskType) {
            case 'PODCAST_LISTENING':
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Video/Podcast Title</label>
                            <Input
                                placeholder="e.g. Spanish with Juan - Episode 45"
                                value={podcastForm.title}
                                onChange={(e) => setPodcastForm({ ...podcastForm, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Short Description</label>
                            <textarea
                                className="w-full min-h-[80px] p-3 bg-muted rounded-xl border-none focus:ring-2 focus:ring-primary  resize-none text-sm"
                                placeholder="What was it about?"
                                value={podcastForm.description}
                                onChange={(e) => setPodcastForm({ ...podcastForm, description: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground italic">Source Link (Optional)</label>
                                <Input
                                    placeholder="YouTube/Spotify Link"
                                    value={podcastForm.link}
                                    onChange={(e) => setPodcastForm({ ...podcastForm, link: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground italic">Conclusion (Optional)</label>
                                <Input
                                    placeholder="Your takeaway..."
                                    value={podcastForm.conclusion}
                                    onChange={(e) => setPodcastForm({ ...podcastForm, conclusion: e.target.value })}
                                />
                            </div>
                        </div>
                        <Button
                            className="w-full mt-2"
                            onClick={() => handleComplete(podcastForm)}
                            disabled={!podcastForm.title || !podcastForm.description || isCompleting}
                        >
                            {isCompleting ? <Loader2 className="h-4 w-4 mr-2" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                            Complete Task & Get Score
                        </Button>
                    </div>
                );
            case 'DAY_RECAP':
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Your Daily Recap</label>
                            <textarea
                                className="w-full min-h-[150px] p-4 bg-muted rounded-xl border-none focus:ring-2 focus:ring-primary  resize-none"
                                placeholder="Hoy aprendí sobre..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <Button
                            className="w-full"
                            onClick={() => handleComplete({ content: input })}
                            disabled={isCompleting || input.length < 10}
                        >
                            {isCompleting ? <Loader2 className="h-4 w-4 mr-2" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                            Save Journal Entry
                        </Button>
                    </div>
                );

            case 'SPEAKING_SESSION':
                return (
                    <div className="text-center space-y-6 py-6">
                        <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center ">
                            <Mic className="h-12 w-12 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black">Recording...</h3>
                            <p className="text-muted-foreground">Talk about your weekend plans or a recent book you read.</p>
                        </div>
                        <Button variant="outline" className="w-full" onClick={() => handleComplete()}>Finish Session</Button>
                    </div>
                );

            case 'CREATE_SENTENCES': {
                const canAdd = sentences.length < 10;
                const canRemove = sentences.length > 3;
                const allFilled = sentences.every(s => s.trim().length >= 5);

                const addSentence = () => {
                    if (canAdd) setSentences([...sentences, '']);
                };

                const removeSentence = (index: number) => {
                    if (canRemove) {
                        const newSentences = [...sentences];
                        newSentences.splice(index, 1);
                        setSentences(newSentences);
                    }
                };

                return (
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground italic mb-2">
                            Write at least 3 sentences (max 10). Each must have at least 5 characters.
                        </p>

                        <div className="max-h-[350px] overflow-y-auto pr-2 space-y-4 pt-1">
                            {sentences.map((sentence, i) => (
                                <div key={i} className="relative group animate-in fade-in slide-in-from-top-1">
                                    <div className="flex items-center justify-between mb-1 px-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary/70">
                                            Sentence {i + 1}
                                        </label>
                                        {canRemove && (
                                            <button
                                                onClick={() => removeSentence(i)}
                                                className="text-muted-foreground hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </button>
                                        )}
                                    </div>
                                    <Input
                                        placeholder={`Enter sentence ${i + 1}...`}
                                        value={sentence}
                                        onChange={(e) => {
                                            const newSentences = [...sentences];
                                            newSentences[i] = e.target.value;
                                            setSentences(newSentences);
                                        }}
                                        className={sentence.trim().length > 0 && sentence.trim().length < 5 ? "border-red-500/50" : ""}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-4">
                            {canAdd && (
                                <Button
                                    variant="outline"
                                    className="flex-1 border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 h-12"
                                    onClick={addSentence}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Sentence
                                </Button>
                            )}

                            <Button
                                className="flex-[2] h-12 font-bold"
                                onClick={() => handleComplete({ sentences: sentences.filter(s => s.trim()) })}
                                disabled={!allFilled || isCompleting}
                            >
                                {isCompleting ? (
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                    <Send className="h-4 w-4 mr-2" />
                                )}
                                Submit {sentences.length} Sentences
                            </Button>
                        </div>
                    </div>
                );
            }
            default:
                return (
                    <div className="text-center space-y-6 py-8">
                        <p className="text-lg">Are you finished with this task?</p>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" onClick={() => setStep('intro')}>Not yet</Button>
                            <Button onClick={() => handleComplete()}>Yes, I'm Done</Button>
                        </div>
                    </div>
                );
        }
    };

    const renderSuccess = () => (
        <div className="text-center space-y-6 py-4">
            <div className="mx-auto w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>

            {task.taskType === 'DAY_RECAP' && input && (
                <div className="bg-muted p-4 rounded-xl text-left space-y-3">
                    <p className="text-sm font-semibold flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" /> Your Entry
                    </p>
                    <p className="text-sm italic text-muted-foreground leading-relaxed">
                        "{input}"
                    </p>
                </div>
            )}

            <div>
                <h3 className="text-2xl font-bold">Good Job!</h3>
                <p className="text-muted-foreground">You've earned <span className="text-primary font-bold">+{getTaskXp(task.taskType)} XP</span></p>
            </div>


            {task.taskType === 'CREATE_SENTENCES' && sentences.some(s => s.trim()) && (
                <div className="bg-muted p-4 rounded-xl text-left space-y-3 text-sm">
                    <p className="font-semibold flex items-center gap-2">
                        <PenLine className="h-4 w-4 text-primary" /> Your Sentences
                    </p>
                    <div className="space-y-2">
                        {sentences.filter(s => s.trim()).map((s, i) => (
                            <p key={i} className="text-muted-foreground leading-relaxed">
                                <span className="text-primary font-bold mr-2">{i + 1}.</span> {s}
                            </p>
                        ))}
                    </div>
                </div>
            )}

            {task.taskType === 'PODCAST_LISTENING' && podcastForm.title && (
                <div className="bg-muted p-4 rounded-xl text-left space-y-3 text-sm">
                    <div className="flex items-center gap-2 font-bold text-primary">
                        <Headphones className="h-4 w-4" /> {podcastForm.title}
                    </div>
                    <p className="text-muted-foreground">{podcastForm.description}</p>
                    {podcastForm.conclusion && (
                        <div className="pt-2 border-t border-border">
                            <p className="font-medium text-xs text-muted-foreground uppercase tracking-wider">Conclusion:</p>
                            <p className="">{podcastForm.conclusion}</p>
                        </div>
                    )}
                </div>
            )}

            <Button className="w-full" onClick={() => {
                onClose();
                setTimeout(() => {
                    setStep('intro');
                    setInput('');
                    setAiResult(null);
                    setPodcastForm({ title: '', description: '', link: '', conclusion: '' });
                }, 300);
            }}>
                Return to Dashboard
            </Button>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={step !== 'success' ? getTaskName(task.taskType) : ''}
            size="md"
        >
            <div key={step}>
                {step === 'intro' && renderTaskIntro()}
                {step === 'active' && renderActiveTask()}
                {step === 'success' && renderSuccess()}
            </div>
        </Modal>
    );
}
