"use client";

import { useState } from "react";
import { Moon, Sun, Clock, TrendingUp, Bell, BellOff } from "lucide-react";

export default function Sleep() {
  const [sleepHours, setSleepHours] = useState(7);
  const [bedtime, setBedtime] = useState("23:00");
  const [wakeTime, setWakeTime] = useState("06:00");
  const [phoneBlockEnabled, setPhoneBlockEnabled] = useState(true);

  const sleepGoal = 8;
  const sleepQuality = sleepHours >= 7 ? "Boa" : sleepHours >= 6 ? "Regular" : "Ruim";
  const sleepQualityColor = sleepHours >= 7 ? "#9FFFC4" : sleepHours >= 6 ? "#FF8A1E" : "#FF6A00";

  const weekData = [
    { day: "Seg", hours: 7.5, quality: "good" },
    { day: "Ter", hours: 8, quality: "good" },
    { day: "Qua", hours: 7, quality: "good" },
    { day: "Qui", hours: 6, quality: "medium" },
    { day: "Sex", hours: 5.5, quality: "bad" },
    { day: "Sáb", hours: 9, quality: "good" },
    { day: "Dom", hours: 8, quality: "good" },
  ];

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "good":
        return "#9FFFC4";
      case "medium":
        return "#FF8A1E";
      case "bad":
        return "#FF6A00";
      default:
        return "#6ECFFF";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-[#6ECFFF]/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#6ECFFF] to-[#6ECFFF]/70 rounded-xl flex items-center justify-center">
            <Moon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Gerenciamento de Sono</h2>
            <p className="text-sm text-gray-400">Durma bem, treine melhor</p>
          </div>
        </div>

        {/* Sleep Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Last Night */}
          <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#6ECFFF]/20">
            <div className="flex items-center gap-2 mb-2">
              <Moon className="w-4 h-4 text-[#6ECFFF]" />
              <span className="text-sm text-gray-400">Última Noite</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#6ECFFF]">{sleepHours}</span>
              <span className="text-gray-400">horas</span>
            </div>
            <div className="mt-2">
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full"
                style={{ backgroundColor: `${sleepQualityColor}20`, color: sleepQualityColor }}
              >
                {sleepQuality}
              </span>
            </div>
          </div>

          {/* Bedtime */}
          <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#6ECFFF]/20">
            <div className="flex items-center gap-2 mb-2">
              <Moon className="w-4 h-4 text-[#6ECFFF]" />
              <span className="text-sm text-gray-400">Hora de Dormir</span>
            </div>
            <div className="text-3xl font-bold text-[#6ECFFF]">{bedtime}</div>
            <button className="mt-2 text-xs text-[#6ECFFF] hover:underline">Ajustar</button>
          </div>

          {/* Wake Time */}
          <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#6ECFFF]/20">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="w-4 h-4 text-[#FF8A1E]" />
              <span className="text-sm text-gray-400">Hora de Acordar</span>
            </div>
            <div className="text-3xl font-bold text-[#FF8A1E]">{wakeTime}</div>
            <button className="mt-2 text-xs text-[#FF8A1E] hover:underline">Ajustar</button>
          </div>
        </div>
      </div>

      {/* Weekly Sleep Chart */}
      <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#6ECFFF]/20">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#6ECFFF]" />
          Sono da Semana
        </h3>

        <div className="space-y-3">
          {weekData.map((day, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-sm text-gray-400 w-12">{day.day}</span>
              <div className="flex-1 h-8 bg-[#0D0D0D] rounded-lg overflow-hidden border border-[#6ECFFF]/10">
                <div
                  className="h-full flex items-center px-3 text-sm font-semibold transition-all duration-500"
                  style={{
                    width: `${(day.hours / 10) * 100}%`,
                    backgroundColor: getQualityColor(day.quality),
                  }}
                >
                  {day.hours}h
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Goal Line */}
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#9FFFC4] to-transparent"></div>
          <span className="whitespace-nowrap">Meta: {sleepGoal}h</span>
          <div className="w-full h-px bg-gradient-to-r from-[#9FFFC4] via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Phone Block Feature */}
      <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#6ECFFF]/20">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#6ECFFF]/20 rounded-xl flex items-center justify-center border border-[#6ECFFF]/30">
              {phoneBlockEnabled ? <BellOff className="w-5 h-5 text-[#6ECFFF]" /> : <Bell className="w-5 h-5 text-gray-500" />}
            </div>
            <div>
              <h3 className="font-bold">Bloqueio Noturno</h3>
              <p className="text-sm text-gray-400">Bloqueia o celular durante o sono</p>
            </div>
          </div>
          <button
            onClick={() => setPhoneBlockEnabled(!phoneBlockEnabled)}
            className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
              phoneBlockEnabled ? "bg-[#6ECFFF]" : "bg-gray-700"
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${
                phoneBlockEnabled ? "left-8" : "left-1"
              }`}
            ></div>
          </button>
        </div>

        {phoneBlockEnabled && (
          <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#6ECFFF]/20">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-[#6ECFFF]" />
              <span className="text-sm font-semibold">Período de Bloqueio</span>
            </div>
            <p className="text-sm text-gray-400">
              {bedtime} - {wakeTime}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Apenas chamadas de emergência serão permitidas
            </p>
          </div>
        )}
      </div>

      {/* Sleep Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#6ECFFF]/10 to-[#6ECFFF]/5 rounded-2xl p-5 border border-[#6ECFFF]/30">
          <div className="text-3xl mb-3">😴</div>
          <h4 className="font-bold mb-2">Dicas para Dormir Melhor</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Evite telas 1h antes de dormir</li>
            <li>• Mantenha o quarto escuro e fresco</li>
            <li>• Estabeleça uma rotina consistente</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-[#9FFFC4]/10 to-[#9FFFC4]/5 rounded-2xl p-5 border border-[#9FFFC4]/30">
          <div className="text-3xl mb-3">🎯</div>
          <h4 className="font-bold mb-2">Impacto no Mascote</h4>
          <p className="text-sm text-gray-400">
            Dormir bem deixa o Focus mais energizado e motivado! Sono ruim deixa ele cansado e sonolento.
          </p>
        </div>
      </div>

      {/* Motivational Card */}
      <div className="bg-gradient-to-r from-[#6ECFFF]/10 to-[#6ECFFF]/5 rounded-2xl p-6 border border-[#6ECFFF]/30">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🌙</div>
          <div>
            <h3 className="font-bold text-lg mb-1 text-[#6ECFFF]">Dica do Focus</h3>
            <p className="text-gray-400 text-sm">
              O sono é essencial para recuperação muscular e crescimento. Durma 7-8 horas por noite para maximizar seus resultados!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
