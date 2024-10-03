import { NextResponse } from 'next/server';

export function middleware(req) {
    const { pathname } = req.nextUrl;

    // Check for the 'currentUser' cookie (or session token)
    const isLoggedIn = req.cookies.get('currentUser');

    // If the user is NOT logged in and tries to access a protected route, redirect to '/'
    if (!isLoggedIn && pathname !== '/') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // If user is already logged in and tries to access '/', redirect them to the dashboard
    if (isLoggedIn && pathname === '/') {
        return NextResponse.redirect(new URL('/home', req.url));
    }

    // Otherwise, allow the request to continue
    return NextResponse.next();
}

export const config = {
    matcher: ['/home/:path*', '/profile', '/profile/:path*', '/notification', '/notification/:path*'],
};
