"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // Verificar se completou onboarding
          const { data: profile } = await supabase
            .from("users_profiles")
            .select("onboarding_completed")
            .eq("id", user.id)
            .single();

          if (profile?.onboarding_completed) {
            router.push("/");
          } else {
            router.push("/onboarding");
          }
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Erro no callback:", error);
        router.push("/auth/login");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-[#FF6A00] animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Autenticando...</p>
      </div>
    </div>
  );
}
