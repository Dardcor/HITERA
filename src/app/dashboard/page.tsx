"use client";

import { useState } from 'react';
import KeuanganView from '../../components/Keuangan';
import KesehatanView from '../../components/Kesehatan';
import KeseharianView from '../../components/Keseharian';
import { HeartPulse, BookOpen, Wallet, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<'keuangan' | 'kesehatan' | 'keseharian'>('keuangan');

    return (
        <div className="app-container">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <div className="sidebar-logo" style={{ background: 'none', WebkitTextFillColor: 'initial', color: '#5b21b6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <img src="/hitera.png" alt="Hitera Logo" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)' }} />
                    HITERA
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
