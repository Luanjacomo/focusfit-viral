"use client";

import { Trophy, Star, Flame, Target, Award, Lock, Zap } from "lucide-react";

export default function Achievements() {
  const achievements = [
    {
      id: 1,
      title: "Primeira Vitória",
      description: "Complete seu primeiro treino",
      icon: Trophy,
      unlocked: true,
      date: "15/01/2024",
      xp: 50,
      rarity: "common",
    },
    {
      id: 2,
      title: "Sequência de Fogo",
      description: "Mantenha 7 dias seguidos",
      icon: Flame,
      unlocked: true,
      date: "22/01/2024",
      xp: 100,
      rarity: "rare",
    },
    {
      id: 3,
      title: "Hidratação Master",
      description: "Complete a meta de água por 30 dias",
      icon: Target,
      unlocked: true,
      date: "10/02/2024",
      xp: 150,
      rarity: "rare",
    },
    {
      id: 4,
      title: "Guerreiro do Sono",
      description: "Durma 8h por 14 dias seguidos",
      icon: Star,
      unlocked: false,
      xp: 200,
      rarity: "epic",
    },
    {
      id: 5,
      title: "Alimentação Perfeita",
      description: "30 dias de alimentação saudável",
      icon: Award,
      unlocked: false,
      xp: 250,
      rarity: "epic",
    },
    {
      id: 6,
      title: "Ultra Focus",
      description: "Alcance o Level 5",
      icon: Zap,
      unlocked: false,
      xp: 500,
      rarity: "legendary",
    },
  ];

  const weeklyRanking = [
    { position: 1, name: "Você", points: 1850, avatar: "🦊" },
    { position: 2, name: "Maria Silva", points: 1720, avatar: "🐯" },
    { position: 3, name: "João Santos", points: 1680, avatar: "🐺" },
    { position: 4, name: "Ana Costa", points: 1540, avatar: "🦁" },
    { position: 5, name: "Pedro Lima", points: 1420, avatar: "🐻" },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return { bg: "#6ECFFF", text: "#6ECFFF", border: "#6ECFFF" };
      case "rare":
        return { bg: "#9FFFC4", text: "#9FFFC4", border: "#9FFFC4" };
      case "epic":
        return { bg: "#FF8A1E", text: "#FF8A1E", border: "#FF8A1E" };
      case "legendary":
        return { bg: "#FF6A00", text: "#FF6A00", border: "#FF6A00" };
      default:
        return { bg: "#6ECFFF", text: "#6ECFFF", border: "#6ECFFF" };
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "Comum";
      case "rare":
        return "Raro";
      case "epic":
        return "Épico";
      case "legendary":
        return "Lendário";
      default:
        return "Comum";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-[#FF6A00]/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Conquistas & Ranking</h2>
            <p className="text-sm text-gray-400">Seus troféus e posição global</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#FF6A00]/20 text-center">
            <div className="text-3xl font-bold text-[#FF6A00] mb-1">12</div>
            <div className="text-xs text-gray-400">Conquistas</div>
          </div>
          <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#9FFFC4]/20 text-center">
            <div className="text-3xl font-bold text-[#9FFFC4] mb-1">1,850</div>
            <div className="text-xs text-gray-400">XP Total</div>
          </div>
          <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#6ECFFF]/20 text-center">
            <div className="text-3xl font-bold text-[#6ECFFF] mb-1">#1</div>
            <div className="text-xs text-gray-400">Ranking</div>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div>
        <h3 className="text-lg font-bold mb-4">Suas Conquistas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            const colors = getRarityColor(achievement.rarity);
            const isLocked = !achievement.unlocked;

            return (
              <div
                key={achievement.id}
                className={`bg-[#1A1A1A] rounded-2xl p-5 border transition-all duration-300 ${
                  isLocked
                    ? "border-gray-700 opacity-60"
                    : `border-[${colors.border}]/30 hover:border-[${colors.border}]/50 hover:shadow-lg`
                }`}
                style={{
                  borderColor: isLocked ? undefined : `${colors.border}30`,
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isLocked ? "bg-gray-800" : ""
                    }`}
                    style={{
                      backgroundColor: isLocked ? undefined : `${colors.bg}20`,
                    }}
                  >
                    {isLocked ? (
                      <Lock className="w-7 h-7 text-gray-600" />
                    ) : (
                      <Icon className="w-7 h-7" style={{ color: colors.text }} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold">{achievement.title}</h4>
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${colors.bg}20`,
                          color: colors.text,
                        }}
                      >
                        {getRarityLabel(achievement.rarity)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>

                    <div className="flex items-center justify-between">
                      {achievement.unlocked ? (
                        <span className="text-xs text-gray-500">{achievement.date}</span>
                      ) : (
                        <span className="text-xs text-gray-600">Bloqueado</span>
                      )}
                      <span
                        className="text-sm font-bold"
                        style={{ color: isLocked ? "#6B7280" : colors.text }}
                      >
                        +{achievement.xp} XP
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Ranking */}
      <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#FF6A00]/20">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#FF6A00]" />
          Ranking Semanal
        </h3>

        <div className="space-y-3">
          {weeklyRanking.map((user) => {
            const isCurrentUser = user.position === 1;
            const medalColor =
              user.position === 1 ? "#FFD700" : user.position === 2 ? "#C0C0C0" : user.position === 3 ? "#CD7F32" : null;

            return (
              <div
                key={user.position}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                  isCurrentUser
                    ? "bg-gradient-to-r from-[#FF6A00]/20 to-[#FF8A1E]/20 border border-[#FF6A00]/30"
                    : "bg-[#0D0D0D] border border-gray-800 hover:border-gray-700"
                }`}
              >
                {/* Position */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0"
                  style={{
                    backgroundColor: medalColor ? `${medalColor}20` : "#1A1A1A",
                    color: medalColor || "#6B7280",
                  }}
                >
                  {user.position}
                </div>

                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF6A00]/20 to-[#FF8A1E]/20 rounded-full flex items-center justify-center text-2xl border border-[#FF6A00]/30 flex-shrink-0">
                  {user.avatar}
                </div>

                {/* Name */}
                <div className="flex-1">
                  <p className={`font-semibold ${isCurrentUser ? "text-[#FF6A00]" : ""}`}>{user.name}</p>
                  <p className="text-xs text-gray-400">{user.points} pontos</p>
                </div>

                {/* Badge */}
                {user.position <= 3 && (
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: `${medalColor}20`,
                      color: medalColor,
                    }}
                  >
                    Top {user.position}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View Full Ranking */}
        <button className="w-full mt-4 bg-[#0D0D0D] hover:bg-[#1A1A1A] text-gray-300 py-3 rounded-xl font-semibold transition-all duration-300 border border-gray-800 hover:border-[#FF6A00]/30">
          Ver Ranking Completo
        </button>
      </div>

      {/* Motivational Card */}
      <div className="bg-gradient-to-r from-[#FF6A00]/10 to-[#FF8A1E]/10 rounded-2xl p-6 border border-[#FF6A00]/30">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🏆</div>
          <div>
            <h3 className="font-bold text-lg mb-1">Continue Conquistando!</h3>
            <p className="text-gray-400 text-sm">
              Você está no topo! Complete mais desafios para desbloquear conquistas épicas e lendárias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
