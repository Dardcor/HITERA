'use client';

import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

export default function Topbar() {
    const pathname = usePathname();
    const { t } = useTranslation();
    const { user } = useAuth();
    const [hasUnread, setHasUnread] = useState(false);

    useEffect(() => {
        if (!user) return;
        
        // Cek unread notifikasi dari localStorage atau biarkan false
        const historyStr = localStorage.getItem('hitera_notifikasi_history');
        if (historyStr) {
            try {
                const history = JSON.parse(historyStr);
                const hasAny = history.some((n: any) => !n.is_read);
                setHasUnread(hasAny);
            } catch(e){}
        }
    }, [user, pathname]);

    const getPageTitle = () => {
        if (pathname.includes('/keuangan')) return t('finance');
        if (pathname.includes('/kesehatan')) return t('health');
        if (pathname.includes('/tugas')) return t('tasks');
        if (pathname.includes('/pengaturan')) return t('settings');
        return t('home');
    };

    return (
        <>
            <header className="hidden md:flex h-16 border-b border-[var(--border)] bg-[var(--bg-primary)] px-4 md:px-8 items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <h1 className="text-lg font-bold text-[var(--text-primary)] capitalize">{getPageTitle()}</h1>
                </div>

                <div className="flex items-center gap-3 md:gap-6">
                    <Link href="/dashboard/notifikasi" className="relative p-2 text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors">
                        <Bell size={20} />
                        {hasUnread && (
                            <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[var(--bg-primary)]"></span>
                        )}
                    </Link>
                </div>
            </header>

            {pathname !== '/dashboard' && (
                <header className="md:hidden h-14 bg-[var(--bg-primary)] px-4 flex items-center justify-between sticky top-0 z-30">
                    <h1 className="text-[20px] font-bold text-[var(--text-primary)] capitalize">{getPageTitle()}</h1>
                    <Link href="/dashboard/notifikasi" className="relative p-2 text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors">
                        <Bell size={20} />
                        {hasUnread && (
                            <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[var(--bg-primary)]"></span>
                        )}
                    </Link>
                </header>
            )}
        </>
    );
}
