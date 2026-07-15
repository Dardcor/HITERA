'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export interface User {
    id: string;
    email?: string;
    user_metadata?: {
        nama?: string;
    };
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const storedUser = localStorage.getItem('hitera_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error(e);
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            const isDashboard = pathname?.startsWith('/dashboard');
            const isAuthPage = pathname === '/login' || pathname === '/register';
            
            if (isDashboard && !user) {
                router.replace('/login');
            } else if (isAuthPage && user) {
                router.replace('/dashboard');
            }
        }
    }, [user, loading, pathname, router]);

    const signOut = async () => {
        localStorage.removeItem('hitera_user');
        setUser(null);
        router.replace('/');
    };

    const authValue = { user, loading, signOut };

    if (loading && pathname?.startsWith('/dashboard')) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-[var(--bg-primary)]">
                <div className="w-10 h-10 border-4 border-t-[var(--accent-blue)] border-r-[var(--accent-green)] border-b-[var(--accent-red)] border-l-[var(--accent-yellow)] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}
