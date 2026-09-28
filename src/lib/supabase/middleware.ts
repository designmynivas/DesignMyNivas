import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let supabaseResponse = NextResponse.next({
    request,
  });

  // Redirect /admin root directly to /admin/dashboard
  if (pathname === "/admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  // Redirect obsolete sections to /admin/dashboard
  if (
    pathname.startsWith("/admin/videos") ||
    pathname.startsWith("/admin/settings")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase credentials are placeholder or not set, allow admin navigation for local scaffolding
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refresh user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Admin route protection
  if (pathname.startsWith("/admin")) {
    // If on /admin/login and already authenticated, redirect to /admin/projects
    if (pathname === "/admin/login") {
      if (user) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/projects";
        return NextResponse.redirect(url);
      }
      return supabaseResponse;
    }

    // For all other /admin routes, require authentication
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
