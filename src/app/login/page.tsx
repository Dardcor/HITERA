import Link from 'next/link';
import { ArrowRight, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="auth-wrapper animate-fade-in">
            <div className="glass-panel auth-container">
                <h1 className="page-title" style={{ fontSize: '36px', textAlign: 'center', marginBottom: '8px' }}>Gears Up.</h1>
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

                    <Link href="/dashboard" className="styled-button" style={{ marginTop: '20px' }}>
                        Sinkronisasi & Masuk <ArrowRight size={20} />
                    </Link>
                </form>

                <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '15px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Identitas Baru? </span>
                    <Link href="/register" style={{ color: 'var(--accent-hover)', textDecoration: 'none', fontWeight: '700' }}>Daftarkan ke Sistem.</Link>
                </p>
            </div>
        </div>
    );
}
