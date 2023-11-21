import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
    console.log("middlwaer");

    // if (!isAuthenticated) {
    //     return NextResponse.redirect("/login");
    // }

    return NextResponse.next();
}
