"use client";

import { useState, useEffect } from "react";
import { Flame, Droplet, Moon, Dumbbell, Target, TrendingUp, Zap } from "lucide-react";
import FocusMascot from "./FocusMascot";

interface DashboardProps {
  userLevel: number;
  streak: number;
}

export default function Dashboard({ userLevel, streak }: DashboardProps) {
  const [dailyProgress, setDailyProgress] = useState({
    workout: 1,
    nutrition: 2,
    hydration: 6,
    sleep: 7,
  });

  const [mascotMood, setMascotMood] = useState<"happy" | "tired" | "motivated" | "celebrating">("motivated");

  const goals = [
    { icon: Dumbbell, label: "Treino", current: dailyProgress.workout, target: 1, color: "#FF6A00", unit: "sessão" },
    { icon: Target, label: "Alimentação", current: dailyProgress.nutrition, target: 3, color: "#9FFFC4", unit: "refeições" },
    { icon: Droplet, label: "Hidratação", current: dailyProgress.hydration, target: 8, color: "#6ECFFF", unit: "copos" },
    { icon: Moon, label: "Sono", current: dailyProgress.sleep, target: 8, color: "#6ECFFF", unit: "horas" },
  ];

  const weeklyStats = [
    { day: "Seg", completed: true },
    { day: "Ter", completed: true },
    { day: "Qua", completed: true },
    { day: "Qui", completed: false },
    { day: "Sex", completed: false },
    { day: "Sáb", completed: false },
    { day: "Dom", completed: false },
  ];

  const totalProgress = Math.round(
    ((dailyProgress.workout / 1) * 25 +
      (dailyProgress.nutrition / 3) * 25 +
      (dailyProgress.hydration / 8) * 25 +
      (dailyProgress.sleep / 8) * 25)
  );

  useEffect(() => {
    if (totalProgress >= 80) setMascotMood("celebrating");
    else if (dailyProgress.sleep < 6) setMascotMood("tired");
    else if (dailyProgress.workout >= 1) setMascotMood("happy");
    else setMascotMood("motivated");
  }, [dailyProgress, totalProgress]);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-[#FF6A00]/30 shadow-xl shadow-[#FF6A00]/10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Olá, Campeão! 👋
            </h2>
            <p className="text-gray-400 mb-4">
              Você está no <span className="text-[#FF6A00] font-semibold">Level {userLevel}</span> e mantém um streak de{" "}
              <span className="text-[#FF8A1E] font-semibold">{streak} dias</span>!
            </p>
            
            {/* Daily Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Progresso Diário</span>
                <span className="text-[#FF6A00] font-bold">{totalProgress}%</span>
              </div>
              <div className="h-3 bg-[#1A1A1A] rounded-full overflow-hidden border border-[#FF6A00]/20">
                <div
                  className="h-full bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] transition-all duration-500 rounded-full"
                  style={{ width: `${totalProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Mascot */}
          <div className="flex-shrink-0">
            <FocusMascot level={userLevel} mood={mascotMood} size="large" />
          </div>
        </div>
      </div>

      {/* Weekly Streak */}
      <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#FF6A00]/20">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-[#FF6A00]" />
          <h3 className="text-lg font-bold">Sequência Semanal</h3>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weeklyStats.map((day, index) => (
            <div key={index} className="text-center">
              <div
                className={`w-full aspect-square rounded-xl flex items-center justify-center mb-2 transition-all duration-300 ${
                  day.completed
                    ? "bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] shadow-lg shadow-[#FF6A00]/30"
                    : "bg-[#0D0D0D] border border-gray-700"
                }`}
              >
                {day.completed ? (
                  <Zap className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-gray-600 text-sm">•</span>
                )}
              </div>
              <span className="text-xs text-gray-400">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Goals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {goals.map((goal, index) => {
          const Icon = goal.icon;
          const progress = Math.min((goal.current / goal.target) * 100, 100);
          const isCompleted = goal.current >= goal.target;

          return (
            <div
              key={index}
              className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#FF6A00]/20 hover:border-[#FF6A00]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6A00]/10"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${goal.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: goal.color }} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{goal.label}</h4>
                    <p className="text-xs text-gray-400">
                      {goal.current}/{goal.target} {goal.unit}
                    </p>
                  </div>
                </div>
                {isCompleted && (
                  <div className="w-8 h-8 bg-[#9FFFC4] rounded-full flex items-center justify-center">
                    <span className="text-lg">✓</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-[#0D0D0D] rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500 rounded-full"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: goal.color,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#FF6A00]/20 to-[#FF8A1E]/10 rounded-xl p-4 border border-[#FF6A00]/30">
          <div className="text-3xl font-bold text-[#FF6A00] mb-1">{streak}</div>
          <div className="text-sm text-gray-400">Dias Seguidos</div>
        </div>
        <div className="bg-gradient-to-br from-[#9FFFC4]/20 to-[#9FFFC4]/10 rounded-xl p-4 border border-[#9FFFC4]/30">
          <div className="text-3xl font-bold text-[#9FFFC4] mb-1">12</div>
          <div className="text-sm text-gray-400">Conquistas</div>
        </div>
        <div className="bg-gradient-to-br from-[#6ECFFF]/20 to-[#6ECFFF]/10 rounded-xl p-4 border border-[#6ECFFF]/30">
          <div className="text-3xl font-bold text-[#6ECFFF] mb-1">2.4L</div>
          <div className="text-sm text-gray-400">Água Hoje</div>
        </div>
        <div className="bg-gradient-to-br from-[#FF8A1E]/20 to-[#FF6A00]/10 rounded-xl p-4 border border-[#FF8A1E]/30">
          <div className="text-3xl font-bold text-[#FF8A1E] mb-1">1,850</div>
          <div className="text-sm text-gray-400">Calorias</div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-[#FF6A00]/10 to-[#FF8A1E]/10 rounded-2xl p-6 border border-[#FF6A00]/30">
        <div className="flex items-start gap-4">
          <div className="text-4xl">💪</div>
          <div>
            <h3 className="font-bold text-lg mb-1">Continue assim!</h3>
            <p className="text-gray-400 text-sm">
              Você está fazendo um trabalho incrível. Mais {100 - totalProgress}% para completar suas metas de hoje!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
