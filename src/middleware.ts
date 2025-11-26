import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Verificar autenticação
  const { data: { session } } = await supabase.auth.getSession();

  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isOnboardingPage = request.nextUrl.pathname.startsWith('/onboarding');

  // Se não está autenticado e não está em página de auth, redirecionar para login
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Se está autenticado e está em página de auth, redirecionar para home
  if (session && isAuthPage) {
    // Verificar onboarding antes de redirecionar
    const { data: profile } = await supabase
      .from('users_profiles')
      .select('onboarding_completed')
      .eq('id', session.user.id)
      .single();

    if (profile && !profile.onboarding_completed) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
    
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se está autenticado, verificar onboarding
  if (session && !isOnboardingPage && !isAuthPage) {
    const { data: profile } = await supabase
      .from('users_profiles')
      .select('onboarding_completed')
      .eq('id', session.user.id)
      .single();

    if (profile && !profile.onboarding_completed) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
