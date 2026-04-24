"use client";

import { useState, useEffect } from 'react';
import KeuanganView from '../../components/Keuangan';
import KesehatanView from '../../components/Kesehatan';
import KeseharianView from '../../components/Keseharian';
import ProfilView from '../../components/Profil';
import { HeartPulse, BookOpen, Wallet, LogOut, LayoutDashboard, Menu, X, UserCircle, ChevronRight, ChevronLeft, Home, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'beranda' | 'keuangan' | 'kesehatan' | 'keseharian' | 'profil'>('beranda');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/login');
            } else {
                setLoading(false);
            }
        };

        checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                router.push('/login');
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
                <div style={{ textAlign: 'center' }}>
                    <Loader2 size={48} color="#8b5cf6" className="animate-spin" style={{ marginBottom: '16px' }} />
                    <p style={{ color: 'var(--text-secondary)', letterSpacing: '1px' }}>MENYIAPKAN VAULT ANDA...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Sidebar Navigation */}
            <aside
                className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}
                style={{
                    width: isSidebarCollapsed ? '100px' : '300px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: 'rgba(19, 19, 31, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRight: '1px solid var(--glass-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '32px 0',
                    position: 'relative',
                    zIndex: 100
                }}
            >
                {/* Collapse Toggle Button */}
                <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    style={{
                        position: 'absolute',
                        right: '-16px',
                        top: '40px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--accent-color)',
                        border: 'none',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        zIndex: 101,
                        transition: 'transform 0.3s'
                    }}
                >
                    {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>

                <div style={{
                    padding: '0 24px',
                    marginBottom: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                    gap: '16px'
                }}>
                    <img
                        src="/hitera.png"
                        alt="Logo"
                        style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '12px',
                            boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)'
                        }}
                    />
                    {!isSidebarCollapsed && (
                        <span style={{
                            fontSize: '22px',
                            fontWeight: '800',
                            letterSpacing: '2px',
                            color: '#8b5cf6',
                            fontFamily: 'Outfit'
                        }}>HITERA</span>
                    )}
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 16px' }}>
                    <div
                        className={`nav-item ${activeTab === 'beranda' ? 'active' : ''}`}
                        onClick={() => setActiveTab('beranda')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '14px 20px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            color: activeTab === 'beranda' ? 'white' : 'var(--text-secondary)',
                            background: activeTab === 'beranda' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                            transition: 'all 0.3s',
                            justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <LayoutDashboard size={22} color={activeTab === 'beranda' ? '#8b5cf6' : 'currentColor'} />
                        {!isSidebarCollapsed && <span style={{ fontWeight: '500', fontSize: '15px' }}>Beranda</span>}
                        {activeTab === 'beranda' && !isSidebarCollapsed && <div style={{ position: 'absolute', right: '0', width: '4px', height: '20px', background: '#8b5cf6', borderRadius: '4px 0 0 4px' }}></div>}
                    </div>

                    <div
                        className={`nav-item ${activeTab === 'keuangan' ? 'active' : ''}`}
                        onClick={() => setActiveTab('keuangan')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '14px 20px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            color: activeTab === 'keuangan' ? 'white' : 'var(--text-secondary)',
                            background: activeTab === 'keuangan' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                            transition: 'all 0.3s',
                            justifyContent: isSidebarCollapsed ? 'center' : 'flex-start'
                        }}
                    >
                        <Wallet size={22} color={activeTab === 'keuangan' ? '#8b5cf6' : 'currentColor'} />
                        {!isSidebarCollapsed && <span style={{ fontWeight: '500', fontSize: '15px' }}>Keuangan</span>}
                    </div>

                    <div
                        className={`nav-item ${activeTab === 'kesehatan' ? 'active' : ''}`}
                        onClick={() => setActiveTab('kesehatan')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '14px 20px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            color: activeTab === 'kesehatan' ? 'white' : 'var(--text-secondary)',
                            background: activeTab === 'kesehatan' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                            transition: 'all 0.3s',
                            justifyContent: isSidebarCollapsed ? 'center' : 'flex-start'
                        }}
                    >
                        <HeartPulse size={22} color={activeTab === 'kesehatan' ? '#10b981' : 'currentColor'} />
                        {!isSidebarCollapsed && <span style={{ fontWeight: '500', fontSize: '15px' }}>Kesehatan</span>}
                    </div>

                    <div
                        className={`nav-item ${activeTab === 'keseharian' ? 'active' : ''}`}
                        onClick={() => setActiveTab('keseharian')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '14px 20px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            color: activeTab === 'keseharian' ? 'white' : 'var(--text-secondary)',
                            background: activeTab === 'keseharian' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                            transition: 'all 0.3s',
                            justifyContent: isSidebarCollapsed ? 'center' : 'flex-start'
                        }}
                    >
                        <BookOpen size={22} color={activeTab === 'keseharian' ? '#3b82f6' : 'currentColor'} />
                        {!isSidebarCollapsed && <span style={{ fontWeight: '500', fontSize: '15px' }}>Keseharian</span>}
                    </div>

                    <div style={{ height: '1px', background: 'var(--glass-border)', margin: '16px 20px' }}></div>

                    <div
                        className={`nav-item ${activeTab === 'profil' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profil')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '14px 20px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            color: activeTab === 'profil' ? 'white' : 'var(--text-secondary)',
                            background: activeTab === 'profil' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                            transition: 'all 0.3s',
                            justifyContent: isSidebarCollapsed ? 'center' : 'flex-start'
                        }}
                    >
                        <UserCircle size={22} />
                        {!isSidebarCollapsed && <span style={{ fontWeight: '500', fontSize: '15px' }}>Profil Saya</span>}
                    </div>
                </nav>

                <div style={{ marginTop: 'auto', padding: '0 16px' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            border: 'none',
                            outline: 'none',
                            color: 'var(--danger)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '14px 20px',
                            borderRadius: '12px',
                            fontWeight: '600',
                            transition: 'all 0.3s',
                            background: 'rgba(239, 68, 68, 0.05)',
                            cursor: 'pointer',
                            justifyContent: isSidebarCollapsed ? 'center' : 'flex-start'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'}
                    >
                        <LogOut size={22} />
                        {!isSidebarCollapsed && <span>Keluar</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content" style={{
                flex: 1,
                padding: '40px',
                overflowY: 'auto',
                height: '100vh',
                transition: 'all 0.4s'
            }}>
                {activeTab === 'beranda' && (
                    <div className="animate-fade-in">
                        <header style={{ marginBottom: '48px' }}>
                            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Pusat Kendali <span style={{ color: '#8b5cf6' }}>HITERA</span></h1>
                            <p style={{ color: 'var(--text-secondary)' }}>Ringkasan aktivitas dan status ekosistem Anda hari ini.</p>
                        </header>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                            <div className="glass-panel" style={{ padding: '32px' }} onClick={() => setActiveTab('keuangan')}>
                                <Wallet size={32} color="#8b5cf6" style={{ marginBottom: '24px' }} />
                                <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Ringkasan Keuangan</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>Pantau saldo dan transaksi terakhir Anda.</p>
                                <button className="styled-button" style={{ width: 'auto', padding: '10px 24px' }}>Buka Keuangan</button>
                            </div>
                            <div className="glass-panel" style={{ padding: '32px' }} onClick={() => setActiveTab('kesehatan')}>
                                <HeartPulse size={32} color="#10b981" style={{ marginBottom: '24px' }} />
                                <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Status Kesehatan</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>Cek hidrasi dan waktu istirahat Anda.</p>
                                <button className="styled-button" style={{ width: 'auto', padding: '10px 24px' }}>Buka Kesehatan</button>
                            </div>
                            <div className="glass-panel" style={{ padding: '32px' }} onClick={() => setActiveTab('keseharian')}>
                                <BookOpen size={32} color="#3b82f6" style={{ marginBottom: '24px' }} />
                                <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Agenda & Jurnal</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>Tinjau tugas yang harus diselesaikan.</p>
                                <button className="styled-button" style={{ width: 'auto', padding: '10px 24px' }}>Buka Keseharian</button>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'keuangan' && <KeuanganView />}
                {activeTab === 'kesehatan' && <KesehatanView />}
                {activeTab === 'keseharian' && <KeseharianView />}
                {activeTab === 'profil' && <ProfilView />}
            </main>
        </div>
    );
}
