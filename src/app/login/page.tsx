import Link from 'next/link';
import { ArrowRight, Lock, Mail, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="auth-wrapper animate-fade-in">
            <div className="glass-panel auth-container">
                <h1 className="page-title" style={{ fontSize: '36px', textAlign: 'center', marginBottom: '8px', background: 'none', WebkitTextFillColor: 'initial', color: '#5b21b6' }}>HITERA</h1>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '48px' }}>Masuk dengan kredensial aman di Vault Anda</p>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                            <Mail size={16} /> Alamat Email Vault
                        </label>
                        <input type="email" placeholder="nama@email.com" className="styled-input" required />
                    </div>

                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                            <Lock size={16} /> Kata Sandi Enkripsi
                        </label>
                        <input type="password" placeholder="••••••••" className="styled-input" required />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '-8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: 'var(--text-secondary)', userSelect: 'none' }}>
                            <input type="checkbox" style={{ accentColor: 'var(--accent-hover)', width: '16px', height: '16px', cursor: 'pointer' }} />
                            Ingat Kredensial Saya
                        </label>
                        <Link href="/forgot-password" style={{ fontSize: '14px', color: 'var(--accent-hover)', textDecoration: 'none', fontWeight: '500' }}>Lupa Sandi?</Link>
                    </div>

                    <Link href="/dashboard" className="styled-button" style={{ marginTop: '12px' }}>
                        Masuk <ArrowRight size={20} />
                    </Link>
                </form>

                <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '15px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Identitas Baru? </span>
                    <Link href="/register" style={{ color: 'var(--accent-hover)', textDecoration: 'none', fontWeight: '700' }}>Daftarkan ke Sistem.</Link>
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
