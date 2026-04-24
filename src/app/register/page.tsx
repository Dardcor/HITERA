"use client";

import Link from 'next/link';
import { ArrowRight, Lock, Mail, User, ArrowLeft, Loader2, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    }
                }
            });

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => router.push('/login'), 3000);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Gagal mendaftar. Periksa koneksi atau data Anda.';
            setErrorMsg(message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="auth-wrapper animate-fade-in">
            <div className="glass-panel auth-container">
                <h1 className="page-title" style={{ fontSize: '36px', textAlign: 'center', marginBottom: '8px', background: 'none', WebkitTextFillColor: 'initial', color: '#5b21b6' }}>HITERA</h1>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '48px' }}>Inisialisasi wujud rekam nyata dirimu.</p>

                {success ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <div style={{ color: 'var(--success)', marginBottom: '24px' }}>
                            <CheckCircle size={64} style={{ margin: '0 auto' }} />
                        </div>
                        <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Pendaftaran Berhasil!</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            Sinyal identitas telah diterima. Silakan cek email Anda untuk konfirmasi atau tunggu pengalihan otomatis ke halaman Login.
                        </p>
                    </div>
                ) : (
                    <>
                        {errorMsg && (
                            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', padding: '12px', borderRadius: '12px', marginBottom: '24px', fontSize: '14px', textAlign: 'center' }}>
                                {errorMsg}
                            </div>
                        )}

                        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                                    <User size={16} /> Nama Identitas
                                </label>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="styled-input"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                                    <Mail size={16} /> Alamat Email Vault
                                </label>
                                <input
                                    type="email"
                                    placeholder="nama@email.com"
                                    className="styled-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoCapitalize="none"
                                    required
                                />
                            </div>

                            <div style={{ position: 'relative' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                                    <Lock size={16} /> Kata Sandi Akses
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Minimal keamanan 8 Karakter"
                                        className="styled-input"
                                        style={{ paddingRight: '50px' }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={8}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '16px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--text-secondary)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '4px',
                                            transition: 'color 0.2s',
                                            outline: 'none'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className="styled-button" style={{ marginTop: '12px', opacity: loading ? 0.7 : 1 }}>
                                {loading ? <Loader2 size={20} className="animate-spin" /> : <>Inisialisasi Identitas <ArrowRight size={20} /></>}
                            </button>
                        </form>
                    </>
                )}

                <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '15px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Merasa Familiar? </span>
                    <Link href="/login" style={{ color: 'var(--accent-hover)', textDecoration: 'none', fontWeight: '700' }}>Kembali Masuk.</Link>
                </p>

                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', opacity: 0.8 }}>
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
