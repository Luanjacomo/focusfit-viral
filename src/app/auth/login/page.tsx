"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Mail, Lock, Loader2, Chrome, KeyRound } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "magic-link" | "reset">("login");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (pass: string) => {
    if (pass.length < 8) {
      setPasswordError("A senha deve ter no mínimo 8 caracteres");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    if (!validatePassword(password)) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Traduzir mensagens de erro do Supabase
        let errorMessage = "Erro ao fazer login";
        if (error.message === "Invalid login credentials") {
          errorMessage = "Email ou senha incorretos. Você não tem uma conta criada ou as credenciais estão erradas.";
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage = "Por favor, confirme seu email antes de fazer login";
        } else if (error.message) {
          errorMessage = error.message;
        }
        setError(errorMessage);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Verificar se o perfil existe
        const { data: profile, error: profileError } = await supabase
          .from("users_profiles")
          .select("onboarding_completed")
          .eq("id", data.user.id)
          .maybeSingle();

        // Se não existe perfil, criar um (apenas para usuários que conseguiram fazer login)
        if (!profile && !profileError) {
          const { error: insertError } = await supabase
            .from("users_profiles")
            .insert({
              id: data.user.id,
              email: data.user.email,
              full_name: data.user.user_metadata?.full_name || data.user.email,
              onboarding_completed: false,
            });

          if (insertError) {
            console.error("Erro ao criar perfil:", insertError);
          }

          // Redirecionar para onboarding
          window.location.href = "/onboarding";
          return;
        }

        // Se perfil existe, verificar onboarding
        if (profile?.onboarding_completed) {
          window.location.href = "/";
        } else {
          window.location.href = "/onboarding";
        }
      } else {
        setError("Erro ao autenticar usuário");
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login com Google");
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      setSuccessMessage("Link mágico enviado! Verifique seu e-mail.");
    } catch (err: any) {
      setError(err.message || "Erro ao enviar link mágico");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      setSuccessMessage("E-mail de recuperação enviado! Verifique sua caixa de entrada.");
    } catch (err: any) {
      setError(err.message || "Erro ao enviar e-mail de recuperação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex">
      {/* Lado esquerdo - Informações do App */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0D0D0D] p-8 flex-col justify-between overflow-y-auto">
        <div>
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] rounded-2xl mb-4">
            <span className="text-3xl">🦊</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            FocusFit
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Transforme sua rotina fitness com inteligência e foco
          </p>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] rounded-xl p-4">
              <h3 className="text-white font-semibold text-base mb-1">
                Focus, o Seu Novo Parceiro de Evolução 🦊
              </h3>
              <p className="text-white/90 text-xs leading-relaxed">
                A mascote "Focus" — uma raposa bípede carismática — evolui junto com você. Quanto mais você treina, se alimenta bem, dorme e se hidrata, mais forte e focada ela fica.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] rounded-xl p-4">
              <h3 className="text-white font-semibold text-base mb-1">
                Treinos Rápidos e Inteligentes 💪
              </h3>
              <p className="text-white/90 text-xs leading-relaxed">
                Sessões de 20 minutos, dinâmicas e adaptadas ao seu nível. Exercícios variáveis, sistema de vidas, mensagens motivacionais e desafios para manter você 100% no foco.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] rounded-xl p-4">
              <h3 className="text-white font-semibold text-base mb-1">
                Alimentação Inteligente 🍽️
              </h3>
              <p className="text-white/90 text-xs leading-relaxed">
                Fotografe sua refeição e receba uma estimativa automática de calorias. O mascote reage às suas escolhas, tornando sua nutrição mais divertida e consciente.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] rounded-xl p-4">
              <h3 className="text-white font-semibold text-base mb-1">
                Hidratação com Feedback 💧
              </h3>
              <p className="text-white/90 text-xs leading-relaxed">
                Defina metas diárias, receba lembretes e acompanhe gráficos simples. Sua hidratação também afeta a evolução do mascote.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] rounded-xl p-4">
              <h3 className="text-white font-semibold text-base mb-1">
                Sono Mais Consistente 😴
              </h3>
              <p className="text-white/90 text-xs leading-relaxed">
                Configure horários para dormir/acordar e deixe o app ajudar a manter sua rotina. Mais disciplina, mais energia.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] rounded-xl p-4">
              <h3 className="text-white font-semibold text-base mb-1">
                Evolução Visual 📸
              </h3>
              <p className="text-white/90 text-xs leading-relaxed">
                Acompanhe seu progresso com fotos comparativas semanais ou mensais — veja sua transformação lado a lado.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] rounded-xl p-4">
              <h3 className="text-white font-semibold text-base mb-1">
                Gamificação e Desafios 🎮
              </h3>
              <p className="text-white/90 text-xs leading-relaxed">
                Streaks, missões de 7 a 90 dias, recompensas e compartilhamento social tornam cada conquista mais motivadora e viralizável.
              </p>
            </div>
          </div>
        </div>

        <div className="text-gray-600 text-xs mt-6">
          © 2024 FocusFit. Todos os direitos reservados.
        </div>
      </div>

      {/* Lado direito - Formulário de Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] rounded-2xl mb-4">
              <span className="text-5xl">🦊</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] bg-clip-text text-transparent mb-2">
              FocusFit
            </h1>
          </div>

          <div className="bg-[#1A1A1A] rounded-2xl p-6 sm:p-8 border border-[#FF6A00]/20">
            {/* Título */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {mode === "login" && "Bem-vindo de volta!"}
                {mode === "magic-link" && "Login sem senha"}
                {mode === "reset" && "Recuperar senha"}
              </h2>
              <p className="text-gray-400 text-sm">
                {mode === "login" && "Entre para continuar sua jornada fitness"}
                {mode === "magic-link" && "Receba um link mágico no seu e-mail"}
                {mode === "reset" && "Enviaremos instruções para seu e-mail"}
              </p>
            </div>

            {/* Mensagens */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm mb-4">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-green-400 text-sm mb-4">
                {successMessage}
              </div>
            )}

            {/* Login com Google */}
            {mode === "login" && (
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-white text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mb-6"
              >
                <Chrome className="w-5 h-5" />
                Continuar com Google
              </button>
            )}

            {mode === "login" && (
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#1A1A1A] text-gray-400">ou</span>
                </div>
              </div>
            )}

            {/* Formulário */}
            <form onSubmit={mode === "login" ? handleLogin : mode === "magic-link" ? handleMagicLink : handlePasswordReset} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0D0D0D] border border-[#FF6A00]/30 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6A00] transition-colors"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              {mode === "login" && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (e.target.value) validatePassword(e.target.value);
                      }}
                      className="w-full bg-[#0D0D0D] border border-[#FF6A00]/30 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6A00] transition-colors"
                      placeholder="••••••••"
                      required
                      minLength={8}
                    />
                  </div>
                  {passwordError && (
                    <p className="text-red-400 text-xs mt-1">{passwordError}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-1">Mínimo de 8 caracteres</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-[#FF6A00]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    {mode === "login" && "Entrar"}
                    {mode === "magic-link" && (
                      <>
                        <KeyRound className="w-5 h-5" />
                        Enviar link mágico
                      </>
                    )}
                    {mode === "reset" && "Enviar e-mail de recuperação"}
                  </>
                )}
              </button>
            </form>

            {/* Links de navegação */}
            <div className="mt-6 space-y-3">
              {mode === "login" && (
                <>
                  <button
                    onClick={() => setMode("magic-link")}
                    className="w-full text-center text-sm text-gray-400 hover:text-[#FF6A00] transition-colors"
                  >
                    Prefiro login sem senha (link mágico)
                  </button>
                  <button
                    onClick={() => setMode("reset")}
                    className="w-full text-center text-sm text-gray-400 hover:text-[#FF6A00] transition-colors"
                  >
                    Esqueci minha senha
                  </button>
                </>
              )}

              {(mode === "magic-link" || mode === "reset") && (
                <button
                  onClick={() => {
                    setMode("login");
                    setError("");
                    setSuccessMessage("");
                  }}
                  className="w-full text-center text-sm text-gray-400 hover:text-[#FF6A00] transition-colors"
                >
                  Voltar para login
                </button>
              )}

              <div className="pt-3 border-t border-gray-700">
                <p className="text-gray-400 text-sm text-center">
                  Não tem uma conta?{" "}
                  <button
                    onClick={() => router.push("/auth/signup")}
                    className="text-[#FF6A00] hover:text-[#FF8A1E] font-medium transition-colors"
                  >
                    Cadastre-se gratuitamente
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
