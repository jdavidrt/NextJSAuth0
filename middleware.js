import { NextResponse } from "next/server";
import { getSession } from "./lib/auth0";

export default async function middleware(request) {
    const pathname = request.nextUrl.pathname;

    // Allow public and auth routes
    if (pathname === "/" || pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    try {
        const session = await getSession(request);

        if (!session || !session.user) {
            const loginUrl = new URL("/api/auth/login", request.url);
            return NextResponse.redirect(loginUrl);
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error:", error);
        const loginUrl = new URL("/api/auth/login", request.url);
        return NextResponse.redirect(loginUrl);
    }
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/auth).*)",
    ],
};