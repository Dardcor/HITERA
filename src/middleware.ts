import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const session = request.cookies.get('hitera_session');
    const pathname = request.nextUrl.pathname;

    const isAuthPage = pathname === '/login' || pathname === '/register';
    const isDashboard = pathname.startsWith('/dashboard');

    if (isDashboard && !session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isAuthPage && session) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
