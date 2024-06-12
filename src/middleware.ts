import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { isRegisterTokenValid } from "./services/businesses.service";

export async function middleware(req: NextRequest) {
  const userCookie = cookies().get("user");
  const businessCookie = cookies().get("business");
  const currentUrl = req.url;
  const currentPath = req.url.replace("http://localhost:3000", "");

  const imInIndex = currentPath == "/";
  const imInDashboardPages =
    currentUrl.includes("/dashboard") || currentPath == "/bienvenido";
  const imInUserPages = !imInDashboardPages && !imInIndex;

  const home = NextResponse.redirect(new URL("/", currentUrl));

  if (currentPath.includes("/unete")) {
    const token = req.nextUrl.searchParams.get("token");
    if (!token) return home;

    const isValid = await isRegisterTokenValid(token);
    if (!isValid) return home;

    return NextResponse.next();
  }

  if (userCookie && imInDashboardPages)
    return NextResponse.redirect(new URL("/negocios", currentUrl));

  if (businessCookie && (imInUserPages || imInIndex))
    return NextResponse.redirect(new URL("/dashboard", currentUrl));

  if ((!userCookie && imInUserPages) || (!businessCookie && imInDashboardPages))
    return home;

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },
  ],
};
