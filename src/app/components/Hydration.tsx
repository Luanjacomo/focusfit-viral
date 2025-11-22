"use client";

import { useState } from "react";
import { Droplet, Plus, TrendingUp, CheckCircle } from "lucide-react";

export default function Hydration() {
  const [waterIntake, setWaterIntake] = useState(6);
  const dailyGoal = 8;
  const glassSize = 250; // ml

  const hours = [
    { time: "08:00", completed: true },
    { time: "09:30", completed: true },
    { time: "11:00", completed: true },
    { time: "12:30", completed: true },
    { time: "14:00", completed: true },
    { time: "15:30", completed: true },
    { time: "17:00", completed: false },
    { time: "19:00", completed: false },
  ];

  const handleAddWater = () => {
    if (waterIntake < dailyGoal) {
      setWaterIntake(waterIntake + 1);
    }
  };

  const progress = (waterIntake / dailyGoal) * 100;
  const totalMl = waterIntake * glassSize;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-[#6ECFFF]/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#6ECFFF] to-[#6ECFFF]/70 rounded-xl flex items-center justify-center">
            <Droplet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Hidratação</h2>
            <p className="text-sm text-gray-400">Mantenha-se hidratado o dia todo</p>
          </div>
        </div>

        {/* Water Bottle Visualization */}
        <div className="flex items-center gap-6">
          {/* Bottle */}
          <div className="relative w-24 h-64 bg-[#0D0D0D] rounded-3xl border-4 border-[#6ECFFF]/30 overflow-hidden">
            {/* Water Level */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#6ECFFF] to-[#6ECFFF]/70 transition-all duration-500"
              style={{ height: `${progress}%` }}
            >
              {/* Water Animation */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 animate-pulse"></div>
            </div>

            {/* Bottle Marks */}
            {[0, 25, 50, 75, 100].map((mark) => (
              <div
                key={mark}
                className="absolute left-0 right-0 border-t border-[#6ECFFF]/20"
                style={{ top: `${100 - mark}%` }}
              ></div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-[#6ECFFF]">{waterIntake}</span>
                <span className="text-2xl text-gray-400">/ {dailyGoal}</span>
              </div>
              <p className="text-sm text-gray-400">copos de água (250ml)</p>
            </div>

            <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#6ECFFF]/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Total de Hoje</span>
                <span className="text-[#6ECFFF] font-bold">{totalMl}ml</span>
              </div>
              <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#6ECFFF] to-[#6ECFFF]/70 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={handleAddWater}
              disabled={waterIntake >= dailyGoal}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                waterIntake >= dailyGoal
                  ? "bg-[#9FFFC4]/20 text-[#9FFFC4] border border-[#9FFFC4]/30 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#6ECFFF] to-[#6ECFFF]/70 text-white hover:shadow-lg hover:shadow-[#6ECFFF]/30 hover:scale-105"
              }`}
            >
              {waterIntake >= dailyGoal ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Meta Atingida!
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Adicionar Copo
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hourly Tracking */}
      <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#6ECFFF]/20">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#6ECFFF]" />
          Registro por Hora
        </h3>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {hours.map((hour, index) => (
            <div key={index} className="text-center">
              <div
                className={`w-full aspect-square rounded-xl flex items-center justify-center mb-2 transition-all duration-300 ${
                  hour.completed
                    ? "bg-gradient-to-br from-[#6ECFFF] to-[#6ECFFF]/70 shadow-lg shadow-[#6ECFFF]/30"
                    : "bg-[#0D0D0D] border border-gray-700"
                }`}
              >
                {hour.completed ? (
                  <Droplet className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-gray-600 text-sm">•</span>
                )}
              </div>
              <span className="text-xs text-gray-400">{hour.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#6ECFFF]/10 to-[#6ECFFF]/5 rounded-2xl p-5 border border-[#6ECFFF]/30">
          <div className="text-3xl mb-3">💧</div>
          <h4 className="font-bold mb-2">Benefícios da Hidratação</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Melhora o desempenho físico</li>
            <li>• Aumenta a concentração</li>
            <li>• Acelera a recuperação muscular</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-[#9FFFC4]/10 to-[#9FFFC4]/5 rounded-2xl p-5 border border-[#9FFFC4]/30">
          <div className="text-3xl mb-3">⏰</div>
          <h4 className="font-bold mb-2">Lembretes Ativos</h4>
          <p className="text-sm text-gray-400 mb-3">
            Receba notificações a cada 2 horas para manter sua hidratação em dia.
          </p>
          <button className="text-sm text-[#9FFFC4] font-semibold hover:underline">
            Configurar Lembretes →
          </button>
        </div>
      </div>

      {/* Motivational Card */}
      <div className="bg-gradient-to-r from-[#6ECFFF]/10 to-[#6ECFFF]/5 rounded-2xl p-6 border border-[#6ECFFF]/30">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🌊</div>
          <div>
            <h3 className="font-bold text-lg mb-1 text-[#6ECFFF]">Dica do Focus</h3>
            <p className="text-gray-400 text-sm">
              Beber água regularmente mantém seu corpo funcionando perfeitamente. Continue assim e veja seu mascote ficar mais energizado!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
