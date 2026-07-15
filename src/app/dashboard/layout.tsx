// Force recompile to clear Next.js cache
import { LanguageProvider } from '@/contexts/LanguageContext';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import MobileNav from '@/components/layout/MobileNav';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LanguageProvider>
            <div className="flex h-screen bg-[var(--bg-primary)] overflow-hidden">
                <Sidebar />

                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <Topbar />

                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>

                    <MobileNav />
                </div>
            </div>
        </LanguageProvider>
    );
}
