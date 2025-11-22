"use client";

import { useEffect, useState } from "react";

interface FocusMascotProps {
  level: number;
  mood: "happy" | "tired" | "motivated" | "celebrating";
  size?: "small" | "medium" | "large";
}

export default function FocusMascot({ level, mood, size = "medium" }: FocusMascotProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [mood, level]);

  const sizeClasses = {
    small: "w-20 h-20",
    medium: "w-32 h-32",
    large: "w-40 h-40 md:w-48 md:h-48",
  };

  const getMascotEmoji = () => {
    if (mood === "celebrating") return "🦊✨";
    if (mood === "tired") return "🦊😴";
    if (mood === "happy") return "🦊💪";
    return "🦊";
  };

  const getMascotMessage = () => {
    if (mood === "celebrating") return "Incrível! Continue assim!";
    if (mood === "tired") return "Hora de descansar...";
    if (mood === "happy") return "Você está arrasando!";
    return "Vamos nessa!";
  };

  const getLevelBadge = () => {
    if (level >= 5) return "Ultra Focus 🔥";
    if (level >= 4) return "Atleta 💪";
    if (level >= 3) return "Forte 🏋️";
    if (level >= 2) return "Firme ⚡";
    return "Iniciante 🌱";
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Mascot Container */}
      <div className="relative">
        {/* Glow Effect for High Levels */}
        {level >= 5 && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] rounded-full blur-2xl opacity-30 animate-pulse"></div>
        )}

        {/* Mascot */}
        <div
          className={`${sizeClasses[size]} relative bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-full border-4 border-[#FF6A00] flex items-center justify-center transition-all duration-300 ${
            isAnimating ? "scale-110" : "scale-100"
          } hover:scale-105 cursor-pointer shadow-xl shadow-[#FF6A00]/20`}
        >
          <span className="text-5xl md:text-6xl">{getMascotEmoji()}</span>
        </div>

        {/* Level Badge */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-lg">
          Lv {level}
        </div>
      </div>

      {/* Status Message */}
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-300">{getMascotMessage()}</p>
        <p className="text-xs text-[#FF6A00]">{getLevelBadge()}</p>
      </div>

      {/* Mood Indicator */}
      <div className="flex gap-1">
        {["happy", "motivated", "tired", "celebrating"].map((m) => (
          <div
            key={m}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              mood === m ? "bg-[#FF6A00] scale-125" : "bg-gray-700"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
