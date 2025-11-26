"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Lock, Loader2, CheckCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (pass: string) => {
    if (pass.length < 8) {
      setPasswordError("A senha deve ter no mínimo 8 caracteres");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validatePassword(password)) {
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Erro ao redefinir senha");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-green-500/20">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Senha redefinida com sucesso!
            </h2>
            <p className="text-gray-400">
              Redirecionando para o login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] rounded-2xl mb-4">
            <span className="text-5xl">🦊</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] bg-clip-text text-transparent mb-2">
            Redefinir Senha
          </h1>
          <p className="text-gray-400">Crie uma nova senha segura</p>
        </div>

        <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#FF6A00]/20">
          <form onSubmit={handleResetPassword} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nova Senha
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar Nova Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-[#FF6A00]/30 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6A00] transition-colors"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-[#FF6A00]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Redefinindo...
                </>
              ) : (
                "Redefinir Senha"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/auth/login")}
              className="text-gray-400 hover:text-[#FF6A00] text-sm transition-colors"
            >
              Voltar para o login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
