"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ChevronRight, ChevronLeft, Target, Dumbbell, Clock, Calendar, Ruler, Weight, User as UserIcon, Loader2 } from "lucide-react";

interface QuizData {
  fitness_goal: string;
  experience_level: string;
  preferred_workout_time: string;
  workout_frequency: number;
  height: number;
  weight: number;
  age: number;
  gender: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState<QuizData>({
    fitness_goal: "",
    experience_level: "",
    preferred_workout_time: "",
    workout_frequency: 3,
    height: 0,
    weight: 0,
    age: 0,
    gender: "",
  });

  const totalSteps = 8;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("Usuário não autenticado");

      // Calcular metas baseadas no objetivo
      let calorie_goal = 2000;
      if (quizData.fitness_goal === "lose_weight") calorie_goal = 1800;
      if (quizData.fitness_goal === "gain_muscle") calorie_goal = 2500;

      // Atualizar perfil com dados do quiz
      const { error } = await supabase
        .from("users_profiles")
        .update({
          ...quizData,
          onboarding_completed: true,
          calorie_goal,
          water_goal: 2000,
          sleep_goal: 8.0,
        })
        .eq("id", user.id);

      if (error) throw error;

      // Criar conquista de boas-vindas
      await supabase.from("achievements").insert({
        user_id: user.id,
        achievement_type: "milestone",
        achievement_name: "Bem-vindo!",
        description: "Completou o cadastro e está pronto para começar",
        icon: "🎉",
      });

      router.push("/");
    } catch (err: any) {
      console.error("Erro ao completar onboarding:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="w-16 h-16 mx-auto mb-4 text-[#FF6A00]" />
              <h2 className="text-2xl font-bold text-white mb-2">Qual é seu objetivo?</h2>
              <p className="text-gray-400">Vamos personalizar sua experiência</p>
            </div>
            <div className="space-y-3">
              {[
                { value: "lose_weight", label: "Perder Peso", emoji: "🔥" },
                { value: "gain_muscle", label: "Ganhar Massa Muscular", emoji: "💪" },
                { value: "maintain", label: "Manter Forma", emoji: "⚖️" },
                { value: "improve_health", label: "Melhorar Saúde", emoji: "❤️" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuizData({ ...quizData, fitness_goal: option.value })}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${
                    quizData.fitness_goal === option.value
                      ? "border-[#FF6A00] bg-[#FF6A00]/10"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <span className="text-3xl">{option.emoji}</span>
                  <span className="text-lg font-medium text-white">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Dumbbell className="w-16 h-16 mx-auto mb-4 text-[#FF6A00]" />
              <h2 className="text-2xl font-bold text-white mb-2">Nível de Experiência</h2>
              <p className="text-gray-400">Como você se descreveria?</p>
            </div>
            <div className="space-y-3">
              {[
                { value: "beginner", label: "Iniciante", desc: "Começando agora" },
                { value: "intermediate", label: "Intermediário", desc: "Treino regularmente" },
                { value: "advanced", label: "Avançado", desc: "Treino há anos" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuizData({ ...quizData, experience_level: option.value })}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    quizData.experience_level === option.value
                      ? "border-[#FF6A00] bg-[#FF6A00]/10"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <div className="font-medium text-white text-lg">{option.label}</div>
                  <div className="text-sm text-gray-400">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Clock className="w-16 h-16 mx-auto mb-4 text-[#FF6A00]" />
              <h2 className="text-2xl font-bold text-white mb-2">Horário Preferido</h2>
              <p className="text-gray-400">Quando você prefere treinar?</p>
            </div>
            <div className="space-y-3">
              {[
                { value: "morning", label: "Manhã", emoji: "🌅" },
                { value: "afternoon", label: "Tarde", emoji: "☀️" },
                { value: "evening", label: "Noite", emoji: "🌙" },
                { value: "night", label: "Madrugada", emoji: "🌃" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuizData({ ...quizData, preferred_workout_time: option.value })}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${
                    quizData.preferred_workout_time === option.value
                      ? "border-[#FF6A00] bg-[#FF6A00]/10"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <span className="text-3xl">{option.emoji}</span>
                  <span className="text-lg font-medium text-white">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-[#FF6A00]" />
              <h2 className="text-2xl font-bold text-white mb-2">Frequência Semanal</h2>
              <p className="text-gray-400">Quantas vezes por semana você quer treinar?</p>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-6xl font-bold text-[#FF6A00] mb-2">
                  {quizData.workout_frequency}x
                </div>
                <div className="text-gray-400">por semana</div>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                value={quizData.workout_frequency}
                onChange={(e) => setQuizData({ ...quizData, workout_frequency: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FF6A00]"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1x</span>
                <span>7x</span>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Ruler className="w-16 h-16 mx-auto mb-4 text-[#FF6A00]" />
              <h2 className="text-2xl font-bold text-white mb-2">Sua Altura</h2>
              <p className="text-gray-400">Em centímetros</p>
            </div>
            <div className="space-y-4">
              <input
                type="number"
                value={quizData.height || ""}
                onChange={(e) => setQuizData({ ...quizData, height: parseFloat(e.target.value) })}
                className="w-full bg-[#1A1A1A] border border-[#FF6A00]/30 rounded-lg px-4 py-4 text-white text-center text-3xl font-bold focus:outline-none focus:border-[#FF6A00] transition-colors"
                placeholder="170"
                min="100"
                max="250"
              />
              <div className="text-center text-gray-400">cm</div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Weight className="w-16 h-16 mx-auto mb-4 text-[#FF6A00]" />
              <h2 className="text-2xl font-bold text-white mb-2">Seu Peso</h2>
              <p className="text-gray-400">Em quilogramas</p>
            </div>
            <div className="space-y-4">
              <input
                type="number"
                value={quizData.weight || ""}
                onChange={(e) => setQuizData({ ...quizData, weight: parseFloat(e.target.value) })}
                className="w-full bg-[#1A1A1A] border border-[#FF6A00]/30 rounded-lg px-4 py-4 text-white text-center text-3xl font-bold focus:outline-none focus:border-[#FF6A00] transition-colors"
                placeholder="70"
                min="30"
                max="300"
              />
              <div className="text-center text-gray-400">kg</div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <UserIcon className="w-16 h-16 mx-auto mb-4 text-[#FF6A00]" />
              <h2 className="text-2xl font-bold text-white mb-2">Sua Idade</h2>
              <p className="text-gray-400">Anos completos</p>
            </div>
            <div className="space-y-4">
              <input
                type="number"
                value={quizData.age || ""}
                onChange={(e) => setQuizData({ ...quizData, age: parseInt(e.target.value) })}
                className="w-full bg-[#1A1A1A] border border-[#FF6A00]/30 rounded-lg px-4 py-4 text-white text-center text-3xl font-bold focus:outline-none focus:border-[#FF6A00] transition-colors"
                placeholder="25"
                min="13"
                max="120"
              />
              <div className="text-center text-gray-400">anos</div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <UserIcon className="w-16 h-16 mx-auto mb-4 text-[#FF6A00]" />
              <h2 className="text-2xl font-bold text-white mb-2">Gênero</h2>
              <p className="text-gray-400">Para personalizar suas metas</p>
            </div>
            <div className="space-y-3">
              {[
                { value: "male", label: "Masculino", emoji: "👨" },
                { value: "female", label: "Feminino", emoji: "👩" },
                { value: "other", label: "Outro", emoji: "🧑" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuizData({ ...quizData, gender: option.value })}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${
                    quizData.gender === option.value
                      ? "border-[#FF6A00] bg-[#FF6A00]/10"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <span className="text-3xl">{option.emoji}</span>
                  <span className="text-lg font-medium text-white">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return quizData.fitness_goal !== "";
      case 2: return quizData.experience_level !== "";
      case 3: return quizData.preferred_workout_time !== "";
      case 4: return quizData.workout_frequency > 0;
      case 5: return quizData.height > 0;
      case 6: return quizData.weight > 0;
      case 7: return quizData.age > 0;
      case 8: return quizData.gender !== "";
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Passo {step} de {totalSteps}</span>
            <span className="text-sm text-[#FF6A00] font-medium">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#FF6A00]/20">
          {renderStep()}

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Voltar
              </button>
            )}
            
            {step < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] text-white rounded-lg hover:shadow-lg hover:shadow-[#FF6A00]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próximo
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!canProceed() || loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] text-white rounded-lg hover:shadow-lg hover:shadow-[#FF6A00]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Finalizando...
                  </>
                ) : (
                  <>
                    Começar! 🎉
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
