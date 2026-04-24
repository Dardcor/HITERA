import Link from 'next/link';
import { ArrowRight, Lock, Mail, User, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
    return (
        <div className="auth-wrapper animate-fade-in">
            <div className="glass-panel auth-container">
                <h1 className="page-title" style={{ fontSize: '36px', textAlign: 'center', marginBottom: '8px', background: 'none', WebkitTextFillColor: 'initial', color: '#5b21b6' }}>HITERA</h1>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '48px' }}>Inisialisasi wujud rekam nyata dirimu.</p>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                            <User size={16} /> Nama Identitas
                        </label>
                        <input type="text" placeholder="Username" className="styled-input" required />
                    </div>

                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                            <Mail size={16} /> Alamat Email Vault
                        </label>
                        <input type="email" placeholder="nama@email.com" className="styled-input" required />
                    </div>

                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                            <Lock size={16} /> Kata Sandi Akses
                        </label>
                        <input type="password" placeholder="Minimal keamanan 8 Karakter" className="styled-input" required />
                    </div>

                    <Link href="/dashboard" className="styled-button" style={{ marginTop: '20px' }}>
                        Register<ArrowRight size={20} />
                    </Link>
                </form>

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
