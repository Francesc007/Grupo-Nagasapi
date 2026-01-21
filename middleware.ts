import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired - this is required for Server Components
  // and to keep the user logged in.
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  // Si hay un error de Refresh Token, no es crítico para el middleware en sí,
  // ya que simplemente significa que el usuario no está autenticado o la sesión expiró.
  if (error) {
    // Opcional: podrías loguear solo si no es un error de "token no encontrado"
    // console.error("Middleware auth error:", error.message)
  }

  // Comentamos la protección del middleware temporalmente
  // para que la verificación se haga directamente en el componente (Client Side)
  /*
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // ... logic ...
  }
  */

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
