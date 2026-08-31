import { NextResponse, type NextRequest } from "next/server";
import { siteFromHost } from "@/lib/sites";

export function proxy(request: NextRequest) {
  const site = siteFromHost(request.headers.get("host"));
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-site", site);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("x-site", site);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
