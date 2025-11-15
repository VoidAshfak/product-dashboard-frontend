import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/products", "/analytics"];

export const proxy = async (req: NextRequest) => {
    console.log("I am middleware");
    
    const { pathname } = req.nextUrl;

    const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

    if (!isProtected) return NextResponse.next();

    const token = req.cookies.get("accessToken"); // match your backend cookie name

    if (!token) {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/products/:path*", "/analytics/:path*"],
};
