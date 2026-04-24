import Link from 'next/link';
import { ArrowRight, Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
    return (
        <div className="auth-wrapper animate-fade-in">
            <div className="glass-panel auth-container">
                <h1 className="page-title" style={{ fontSize: '32px', textAlign: 'center', marginBottom: '8px', background: 'none', WebkitTextFillColor: 'initial', color: '#5b21b6' }}>HITERA</h1>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px', lineHeight: '1.6' }}>Masukkan email Vault Anda di bawah untuk menerima protokol persetujuan reset sandi enkripsi.</p>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                            <Mail size={16} /> Alamat Email Valid
                        </label>
                        <input type="email" placeholder="Ketik email terdaftar..." className="styled-input" required />
                    </div>

                    <Link href="/login" className="styled-button" style={{ marginTop: '12px' }}>
                        Kirim Sinyal Pemulihan <ArrowRight size={20} />
                    </Link>
                </form>

                <div style={{ textAlign: 'center', marginTop: '48px' }}>
                    <Link href="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '14px', opacity: 0.8, fontWeight: '500' }}>
                        <ArrowLeft size={16} /> Batal & Kembali Bersiap
                    </Link>
                </div>
            </div>
        </div>
    );
}
