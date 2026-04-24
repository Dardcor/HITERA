"use client";

import { useState } from 'react';
import KeuanganView from '../../components/Keuangan';
import KesehatanView from '../../components/Kesehatan';
import KeseharianView from '../../components/Keseharian';
import { LayoutDashboard, HeartPulse, BookOpen, Wallet, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<'keuangan' | 'kesehatan' | 'keseharian'>('keuangan');

    return (
        <div className="app-container">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    HITERA.
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div
                        className={`nav-item ${activeTab === 'keuangan' ? 'active' : ''}`}
                        onClick={() => setActiveTab('keuangan')}
                    >
                        <Wallet size={20} />
                        Keuangan
                    </div>
                    <div
                        className={`nav-item ${activeTab === 'kesehatan' ? 'active' : ''}`}
                        onClick={() => setActiveTab('kesehatan')}
                    >
                        <HeartPulse size={20} />
                        Kesehatan
                    </div>
                    <div
                        className={`nav-item ${activeTab === 'keseharian' ? 'active' : ''}`}
                        onClick={() => setActiveTab('keseharian')}
                    >
                        <BookOpen size={20} />
                        Keseharian
                    </div>
                </nav>

                <div style={{ marginTop: 'auto', padding: '0 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <Link href="/" style={{ textDecoration: 'none', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '500', transition: 'transform 0.2s' }}>
                        <LogOut size={20} />
                        Keluar Aplikasi
                    </Link>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                        <p>Hitera Productivity Suite</p>
                        <p style={{ marginTop: '8px', opacity: 0.5, letterSpacing: '0.5px' }}>SUPABASE READY.</p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                {activeTab === 'keuangan' && <KeuanganView />}
                {activeTab === 'kesehatan' && <KesehatanView />}
                {activeTab === 'keseharian' && <KeseharianView />}
            </main>
        </div>
    );
}
