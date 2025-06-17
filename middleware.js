import { NextResponse } from "next/server";
import { getSession } from "./lib/auth0";

export default async function middleware(request) {
    const pathname = request.nextUrl.pathname;

    // Allow public and auth routes
    if (pathname === "/" || pathname.startsWith("/auth")) {
        return NextResponse.next();
    }

    const session = await getSession(request);

    if (!session || !session.user) {
        const loginUrl = new URL("/auth/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api).*)",
    ],
};
