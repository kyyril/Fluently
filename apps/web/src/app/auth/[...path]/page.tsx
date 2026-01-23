'use client';

import { AuthView } from '@neondatabase/auth/react/ui';
import { authClient } from '@/lib/auth-client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import { useUser } from '@/hooks';
import { Loader2, Mail, CheckCircle2, AlertCircle, RefreshCcw, ArrowRight, ShieldCheck, Lock, Eye, EyeOff, BookOpen } from 'lucide-react';
import { Button, Input } from '@fluently/ui';
import Image from 'next/image';

const PENDING_EMAIL_KEY = 'fluently_auth_email';

/**
 * FORM VERIFIKASI EMAIL
 */
function VerifyEmailForm() {
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
    const [resendCooldown, setResendCooldown] = useState(0);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const emailParam = searchParams.get('email');
        const storedEmail = typeof window !== 'undefined' ? localStorage.getItem(PENDING_EMAIL_KEY) : null;
        setEmail(emailParam || storedEmail || '');
    }, [searchParams]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendCooldown > 0) {
            timer = setInterval(() => {
                setResendCooldown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendCooldown]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const client = authClient as any;
            const result = await (client.emailOtp?.verifyEmail || client.verifyEmail)?.({
                email,
                otp: code,
            });

            if (result?.error) {
                setError(result.error.message || 'Invalid or expired code.');
            } else {
                setSuccess(true);
                localStorage.removeItem(PENDING_EMAIL_KEY);
                setTimeout(() => router.push('/auth/sign-in'), 2000);
            }
        } catch (err: any) {
            setError('Verification failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (!email || resendCooldown > 0) return;
        setResendStatus('sending');
        setError(null);
        try {
            const client = authClient as any;
            const result = await (client.emailOtp?.sendVerificationOtp || client.sendVerificationOtp)?.({
                email,
                type: 'email-verification',
            });
            if (result?.error) setError(result.error.message);
            else {
                setResendStatus('sent');
                setResendCooldown(60); // 60 seconds cooldown
            }
        } catch (err) {
            setError('Failed to send new code.');
        } finally {
            if (resendStatus !== 'sent') setResendStatus('idle');
        }
    };

    if (success) {
        return (
            <div className="text-center space-y-4 py-12 animate-in fade-in zoom-in duration-500">
                <div className="mx-auto w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                    <CheckCircle2 className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Verified!</h2>
                    <p className="text-muted-foreground font-medium">Redirecting you to the app...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-white uppercase">Security</h1>
                <p className="text-white/40 text-sm font-medium">Verify your email address</p>
            </div>

            <form id="verify-form" onSubmit={handleVerify} className={`space-y-6 transition-opacity duration-300 ${isLoading ? 'opacity-70' : 'opacity-100'}`}>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Identity</label>
                    <div className="relative overflow-hidden rounded-xl bg-white/[0.03] h-12 flex items-center px-4">
                        <span className="text-white/30 text-xs font-medium truncate">{email}</span>
                    </div>
                </div>

                <div className="space-y-2 text-center">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">6-Digit Code</label>
                    <Input
                        type="text"
                        placeholder="000000"
                        value={code}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                            setCode(val);
                            if (val.length === 6) {
                                setTimeout(() => {
                                    const form = document.getElementById('verify-form') as HTMLFormElement;
                                    form?.requestSubmit();
                                }, 10);
                            }
                        }}
                        className="text-center text-4xl tracking-[0.4em] font-bold h-20 bg-white/[0.03] border-none text-white rounded-2xl focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-white/5"
                        required
                        autoFocus
                        disabled={isLoading}
                    />
                </div>

                {error && (
                    <div className="flex items-center gap-3 text-red-400 bg-red-400/10 p-4 rounded-2xl text-xs justify-center font-bold border border-red-400/20 animate-in shake-in">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {error}
                    </div>
                )}

                <Button type="submit" className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-white transition-all shadow-xl shadow-primary/10" disabled={isLoading || code.length < 6}>
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="animate-spin w-5 h-5" />
                            <span>Verifying...</span>
                        </div>
                    ) : 'Confirm Access'}
                </Button>
            </form>

            <div className="pt-6 border-t border-white/[0.05] text-center space-y-4">
                <Button
                    variant="ghost"
                    onClick={handleResend}
                    className="w-full rounded-xl gap-2 h-10 text-white/40 hover:text-white text-xs font-semibold transition-all disabled:opacity-30"
                    disabled={resendStatus === 'sending' || !email || resendCooldown > 0}
                >
                    {resendStatus === 'sending' ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                    ) : resendCooldown > 0 ? (
                        <span className="tabular-nums">{resendCooldown}s</span>
                    ) : (
                        <RefreshCcw className="w-3 h-3" />
                    )}
                    {resendCooldown > 0
                        ? `Wait to Resend`
                        : resendStatus === 'sent'
                            ? 'New Code Sent'
                            : 'Resend Code'}
                </Button>
                <button
                    onClick={() => router.push('/auth/sign-in')}
                    className="text-xs text-white/40 font-bold hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                    Back to authentication <ArrowRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
}

/**
 * FORM SIGN UP CUSTOM
 */
function CustomSignUpForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resending, setResending] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendCooldown > 0) {
            timer = setInterval(() => {
                setResendCooldown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendCooldown]);

    const handleResendAndRedirect = async () => {
        if (resendCooldown > 0) return;
        setResending(true);
        try {
            const client = authClient as any;
            await (client.emailOtp?.sendVerificationOtp || client.sendVerificationOtp)?.({
                email: formData.email,
                type: 'email-verification',
            });
            localStorage.setItem(PENDING_EMAIL_KEY, formData.email);
            setResendCooldown(60); // 60 seconds cooldown
            router.push(`/auth/verify-email?email=${encodeURIComponent(formData.email)}`);
        } catch (err) {
            setError('Failed to send code. Please try again.');
        } finally {
            setResending(false);
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const result = await authClient.signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
            });

            if (result?.error) {
                setError(result.error.message || 'Registration failed.');
            } else {
                localStorage.setItem(PENDING_EMAIL_KEY, formData.email);
                router.push(`/auth/verify-email?email=${encodeURIComponent(formData.email)}`);
            }
        } catch (err: any) {
            setError(err.message || 'Registration failed. The email might be already taken.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSignUp} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2 mb-4">
                <h1 className="text-3xl font-bold tracking-tight text-white">Join Us</h1>
                <p className="text-white/40 text-sm font-medium">Create your Fluently account</p>
            </div>

            <div className="space-y-4">
                <Input
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    required
                    className="h-12 bg-white/[0.03] border-none rounded-xl px-5 focus:ring-1 focus:ring-primary/30 text-white font-medium placeholder:text-white/10 transition-all"
                />
                <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    required
                    className="h-12 bg-white/[0.03] border-none rounded-xl px-5 focus:ring-1 focus:ring-primary/30 text-white font-medium placeholder:text-white/10 transition-all"
                />

                <div className="relative group">
                    <Input
                        type={showPass ? "text" : "password"}
                        placeholder="Create Password"
                        value={formData.password}
                        onChange={e => setFormData(p => ({ ...p, password: e.target.value }))}
                        required
                        className="h-12 bg-white/[0.03] border-none rounded-xl px-5 focus:ring-1 focus:ring-primary/30 text-white font-medium placeholder:text-white/10 transition-all pr-12"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                    >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>

                <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={e => setFormData(p => ({ ...p, confirmPassword: e.target.value }))}
                    required
                    className="h-12 bg-white/[0.03] border-none rounded-xl px-5 focus:ring-1 focus:ring-primary/30 text-white font-medium placeholder:text-white/10 transition-all"
                />

                {error && (
                    <div className="flex flex-col gap-4 p-5 bg-red-400/10 border border-red-400/20 rounded-[1.5rem] animate-in slide-in-from-top-4">
                        <p className="text-red-400 text-sm text-center font-bold leading-relaxed">{error}</p>

                        <div className="space-y-3 pt-4 border-t border-red-400/20">
                            <p className="text-center text-[10px] text-white/40 font-black uppercase tracking-widest leading-none">Already have an account?</p>
                            <Button
                                type="button"
                                onClick={handleResendAndRedirect}
                                className="w-full bg-white text-black hover:bg-white/90 font-black uppercase text-xs h-12 rounded-xl shadow-xl transition-transform active:scale-95 disabled:opacity-50"
                                disabled={resending || !formData.email || resendCooldown > 0}
                            >
                                {resending ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : resendCooldown > 0 ? (
                                    <span className="tabular-nums font-black mr-2">{resendCooldown}s</span>
                                ) : null}
                                {resendCooldown > 0 ? `Wait to Send Code` : `Send Security Code Anyway`}
                            </Button>
                        </div>
                    </div>
                )}

                <Button type="submit" className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-white transition-all shadow-xl shadow-primary/10" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Get Started'}
                </Button>
            </div>

            <div className="pt-4 text-center">
                <p className="text-sm text-white/20 font-medium">
                    Already a member? <button type="button" onClick={() => router.push('/auth/sign-in')} className="text-primary/80 font-bold hover:text-primary ml-1 transition-colors">Log In</button>
                </p>
            </div>
        </form>
    );
}

/**
 * FORM SIGN IN CUSTOM
 */
function CustomSignInForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPass, setShowPass] = useState(false);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const result = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
            });

            if (result?.error) {
                setError(result.error.message || 'Login failed. Please try again.');
            } else {
                router.push('/dashboard');
            }
        } catch (err: any) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const isUnverified = error?.toLowerCase().includes('verified') ||
        error?.includes('EMAIL_NOT_VERIFIED');

    return (
        <form onSubmit={handleSignIn} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2 mb-4">
                <h1 className="text-3xl font-bold tracking-tight text-white uppercase">Welcome</h1>
                <p className="text-white/40 text-sm font-medium">Sign in to your account</p>
            </div>

            <div className="space-y-4">
                <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    required
                    className="h-12 bg-white/[0.03] border-none rounded-xl px-5 focus:ring-1 focus:ring-primary/30 text-white font-medium placeholder:text-white/10 transition-all"
                />
                <div className="space-y-2">
                    <div className="relative group">
                        <Input
                            type={showPass ? "text" : "password"}
                            placeholder="Your Password"
                            value={formData.password}
                            onChange={e => setFormData(p => ({ ...p, password: e.target.value }))}
                            required
                            className="h-12 bg-white/[0.03] border-none rounded-xl px-5 focus:ring-1 focus:ring-primary/30 text-white font-medium placeholder:text-white/10 transition-all pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                        >
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    <div className="text-right px-1">
                        <button type="button" onClick={() => router.push('/auth/forgot-password')} className="text-xs text-primary font-bold hover:underline">Trouble logging in?</button>
                    </div>
                </div>

                {error && (
                    <div className="flex flex-col gap-4 p-5 bg-red-400/10 border border-red-400/20 rounded-[2rem] animate-in slide-in-from-top-4">
                        <p className="text-red-400 text-sm text-center font-bold leading-relaxed">{error}</p>
                        {isUnverified && (
                            <div className="space-y-3 pt-4 border-t border-red-400/20">
                                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Verify Required</p>
                                <Button
                                    type="button"
                                    className="w-full bg-primary text-white hover:bg-primary/80 h-12 text-xs font-black uppercase tracking-tight rounded-xl shadow-xl transition-transform active:scale-95 border-t border-white/10"
                                    onClick={() => router.push(`/auth/verify-email?email=${encodeURIComponent(formData.email)}`)}
                                >
                                    Proceed to Verification
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                <Button type="submit" className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-white transition-all shadow-xl shadow-primary/10" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Log In'}
                </Button>
            </div>

            <div className="pt-4 text-center">
                <p className="text-sm text-white/20 font-medium">
                    New here? <button type="button" onClick={() => router.push('/auth/sign-up')} className="text-primary/80 font-bold hover:text-primary ml-1 transition-colors">Create Account</button>
                </p>
            </div>
        </form>
    );
}

/**
 * PAGE WRAPPER UTAMA
 */
export default function AuthPage() {
    const { data: session, isPending: isSessionPending } = authClient.useSession();
    const { data: user, isLoading: isUserLoading } = useUser();
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (mounted && !isSessionPending && session?.user && !isUserLoading && user) {
            router.push(user.level ? '/dashboard' : '/onboarding');
        }
    }, [session, isSessionPending, user, isUserLoading, router, mounted]);

    if (!mounted || isSessionPending) {
        return <div className="min-h-screen flex items-center justify-center bg-[#050506]"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
    }

    const isVerify = pathname.includes('verify');
    const isSignUp = pathname.includes('sign-up');
    const isForgot = pathname.includes('forgot');
    const isReset = pathname.includes('reset');

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050506] p-4 relative overflow-hidden font-sans selection:bg-primary/30 selection:text-white">
            {/* Glossy backgrounds with better contrast */}
            <div className="absolute top-[-20%] right-[-10%] w-[90%] h-[80%] bg-primary/25 rounded-[100%] blur-[160px] animate-pulse duration-[8000ms]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[90%] h-[80%] bg-indigo-600/15 rounded-[100%] blur-[160px] animate-pulse duration-[10000ms] delay-1000" />

            {/* Noise overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />

            <div className="w-full max-w-[440px] z-10">
                <div className="mb-8 flex justify-center">
                    <button
                        onClick={() => router.push('/')}
                        className="group flex flex-col items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/brand.svg"
                                alt="Fluently"
                                fill
                                priority
                                className="object-contain"
                            />
                        </div>
                    </button>
                </div>

                <div className="bg-white/5 backdrop-blur-xl p-10 sm:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                    {/* Interior top border light glow */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {isVerify ? (
                        <Suspense><VerifyEmailForm /></Suspense>
                    ) : isSignUp ? (
                        <CustomSignUpForm />
                    ) : isForgot || isReset ? (
                        <AuthView pathname={isForgot ? 'forgot-password' : 'reset-password'} />
                    ) : (
                        <CustomSignInForm />
                    )}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-white/10 uppercase tracking-[0.4em] font-bold">
                        Secure Environment
                    </p>
                </div>
            </div>
        </div>
    );
}
