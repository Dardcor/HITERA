"use client";

import { useState, useEffect } from 'react';
import { User, Lock, Save, Loader2, ShieldCheck, UserCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ProfilView() {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
            .from('profiles')
            .select('username, full_name')
            .eq('id', user.id)
            .single();

        if (data) {
            setUsername(data.username || '');
            setFullName(data.full_name || '');
        }
        setLoading(false);
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                username,
                full_name: fullName,
                updated_at: new Date().toISOString(),
            });

        if (error) {
            setMessage({ type: 'error', text: 'Gagal memperbarui profil: ' + error.message });
        } else {
            setMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
        }
        setSaving(false);
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return setMessage({ type: 'error', text: 'Konfirmasi kata sandi tidak cocok.' });
        }

        setSaving(true);
        const { error } = await supabase.auth.updateUser({ password: newPassword });

        if (error) {
            setMessage({ type: 'error', text: 'Gagal ganti sandi: ' + error.message });
        } else {
            setMessage({ type: 'success', text: 'Kata sandi berhasil diperbarui!' });
            setNewPassword('');
            setConfirmPassword('');
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
                <Loader2 size={40} color="#8b5cf6" className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <header className="page-header">
                <div className="page-header-icon">
                    <UserCircle size={32} />
                </div>
                <div>
                    <h1 className="page-title">Identitas Vault</h1>
                    <p className="page-subtitle">Kelola informasi publik dan enkripsi keamanan akun Anda.</p>
                </div>
            </header>

            {message.text && (
                <div style={{
                    padding: '16px 24px',
                    borderRadius: '12px',
                    background: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    border: `1px solid ${message.type === 'success' ? 'var(--success)' : 'var(--danger)'}`,
                    color: message.type === 'success' ? 'var(--success)' : 'var(--danger)',
                    fontWeight: '500'
                }}>
                    {message.text}
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>

                {/* Profile Section */}
                <div className="glass-panel">
                    <h2 style={{ fontSize: '22px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <User size={24} color="var(--accent-hover)" /> Pengaturan Profil
                    </h2>
                    <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Username Unik</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="styled-input"
                                placeholder="@username_anda"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Nama Lengkap</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="styled-input"
                                placeholder="Hitera User"
                            />
                        </div>
                        <button type="submit" disabled={saving} className="styled-button">
                            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            Simpan Profil
                        </button>
                    </form>
                </div>

                {/* Password Section */}
                <div className="glass-panel">
                    <h2 style={{ fontSize: '22px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Lock size={24} color="var(--warning)" /> Keamanan Vault
                    </h2>
                    <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Kata Sandi Baru</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="styled-input"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Konfirmasi Sandi Baru</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="styled-input"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button type="submit" disabled={saving} className="styled-button" style={{ background: 'linear-gradient(135deg, var(--warning), #fbbf24)' }}>
                            {saving ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
                            Ubah Kata Sandi
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
