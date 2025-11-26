"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Mail, Lock, User, Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validatePassword = (pass: string) => {
    if (pass.length < 8) {
      setPasswordError("A senha deve ter no mínimo 8 caracteres");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = (pass: string, confirm: string) => {
    if (confirm && pass !== confirm) {
      setConfirmPasswordError("As senhas não coincidem");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validatePassword(password)) {
      setLoading(false);
      return;
    }

    if (!validateConfirmPassword(password, confirmPassword)) {
      setLoading(false);
      return;
    }

    try {
      // VERIFICAÇÃO CRÍTICA: Checar se email já existe no auth.users do Supabase
      const { data: existingAuthUser } = await supabase.auth.admin.listUsers();
      
      // Verificar também na tabela users_profiles
      const { data: existingProfile } = await supabase
        .from("users_profiles")
        .select("email")
        .eq("email", email)
        .maybeSingle();

      if (existingProfile) {
        setError("Este email já está cadastrado. Faça login ou use outro email.");
        setLoading(false);
        return;
      }

      // Criar conta no Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        // Verificar se é erro de email duplicado
        if (signUpError.message.includes("already registered") || 
            signUpError.message.includes("already exists") ||
            signUpError.message.includes("duplicate")) {
          setError("Este email já está cadastrado. Faça login ou use outro email.");
        } else {
          setError(signUpError.message || "Erro ao criar conta");
        }
        setLoading(false);
        return;
      }

      if (!data.user) {
        setError("Erro ao criar usuário. Tente novamente.");
        setLoading(false);
        return;
      }

      // Criar perfil inicial APENAS se o usuário foi criado com sucesso
      const { error: profileError } = await supabase
        .from("users_profiles")
        .insert({
          id: data.user.id,
          full_name: fullName,
          email: email,
          onboarding_completed: false,
        });

      if (profileError) {
        console.error("Erro ao criar perfil:", profileError);
        // Se der erro de duplicação aqui, significa que já existe
        if (profileError.message.includes("duplicate") || profileError.code === "23505") {
          setError("Este email já está cadastrado. Faça login ou use outro email.");
          setLoading(false);
          return;
        }
      }

      // Fazer login automático após cadastro bem-sucedido
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // Se der erro no login, redirecionar para página de login
        router.push("/auth/login");
        return;
      }

      // Redirecionar para onboarding
      router.push("/onboarding");
      router.refresh();
    } catch (err: any) {
      console.error("Erro no cadastro:", err);
      setError(err.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] rounded-2xl mb-4">
            <span className="text-5xl">🦊</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] bg-clip-text text-transparent mb-2">
            FocusFit
          </h1>
          <p className="text-gray-400">Comece sua jornada fitness!</p>
        </div>

        {/* Form */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#FF6A00]/20">
          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-[#FF6A00]/30 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6A00] transition-colors"
                  placeholder="Seu nome"
                  required
                />
              </div>
            </div>

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
                    if (confirmPassword) validateConfirmPassword(e.target.value, confirmPassword);
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (e.target.value) validateConfirmPassword(password, e.target.value);
                  }}
                  className="w-full bg-[#0D0D0D] border border-[#FF6A00]/30 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6A00] transition-colors"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
              {confirmPasswordError && (
                <p className="text-red-400 text-xs mt-1">{confirmPasswordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-[#FF6A00]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Criando conta...
                </>
              ) : (
                "Criar Conta"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Já tem uma conta?{" "}
              <button
                onClick={() => router.push("/auth/login")}
                className="text-[#FF6A00] hover:text-[#FF8A1E] font-medium transition-colors"
              >
                Faça login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
