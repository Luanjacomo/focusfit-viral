"use client";

import { useState } from "react";
import { TrendingUp, Camera, ChevronLeft, ChevronRight } from "lucide-react";

export default function Progress() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const progressPhotos = [
    { date: "01/01/2024", label: "Início", weight: 85, bf: 22 },
    { date: "01/02/2024", label: "1 Mês", weight: 82, bf: 20 },
    { date: "01/03/2024", label: "2 Meses", weight: 79, bf: 18 },
    { date: "Hoje", label: "3 Meses", weight: 76, bf: 15 },
  ];

  const stats = [
    { label: "Peso Perdido", value: "9kg", color: "#FF6A00" },
    { label: "Gordura Corporal", value: "-7%", color: "#9FFFC4" },
    { label: "Dias Ativos", value: "89", color: "#6ECFFF" },
    { label: "Treinos", value: "67", color: "#FF8A1E" },
  ];

  const measurements = [
    { part: "Peito", initial: 95, current: 98, unit: "cm" },
    { part: "Cintura", initial: 90, current: 82, unit: "cm" },
    { part: "Braço", initial: 32, current: 35, unit: "cm" },
    { part: "Coxa", initial: 58, current: 60, unit: "cm" },
  ];

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : progressPhotos.length - 1));
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev < progressPhotos.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-[#FF6A00]/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Evolução Visual</h2>
            <p className="text-sm text-gray-400">Acompanhe sua transformação</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#FF6A00]/20 hover:border-[#FF6A00]/40 transition-all duration-300"
          >
            <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Photo Comparison Slider */}
      <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#FF6A00]/20">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Camera className="w-5 h-5 text-[#FF6A00]" />
          Galeria de Evolução
        </h3>

        {/* Photo Viewer */}
        <div className="relative bg-[#0D0D0D] rounded-xl overflow-hidden border border-[#FF6A00]/20 aspect-video">
          {/* Photo Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D]">
            <div className="text-center">
              <Camera className="w-16 h-16 text-[#FF6A00] mx-auto mb-4 opacity-50" />
              <p className="text-gray-400 mb-2">Foto de Progresso</p>
              <p className="text-sm text-gray-500">{progressPhotos[currentPhotoIndex].date}</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#FF6A00]/80 hover:bg-[#FF6A00] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={handleNextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#FF6A00]/80 hover:bg-[#FF6A00] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Photo Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-lg">{progressPhotos[currentPhotoIndex].label}</p>
                <p className="text-sm text-gray-300">{progressPhotos[currentPhotoIndex].date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Peso</p>
                <p className="font-bold text-[#FF6A00]">{progressPhotos[currentPhotoIndex].weight}kg</p>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Timeline */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {progressPhotos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhotoIndex(index)}
              className={`aspect-square rounded-lg border-2 transition-all duration-300 ${
                currentPhotoIndex === index
                  ? "border-[#FF6A00] bg-[#FF6A00]/20"
                  : "border-gray-700 bg-[#0D0D0D] hover:border-[#FF6A00]/50"
              }`}
            >
              <div className="h-full flex flex-col items-center justify-center">
                <Camera className="w-6 h-6 text-gray-500 mb-1" />
                <span className="text-xs text-gray-400">{photo.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Add Photo Button */}
        <button className="w-full mt-4 bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6A00]/30 hover:scale-105 flex items-center justify-center gap-2">
          <Camera className="w-5 h-5" />
          Adicionar Nova Foto
        </button>
      </div>

      {/* Measurements */}
      <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#FF6A00]/20">
        <h3 className="text-lg font-bold mb-4">Medidas Corporais</h3>

        <div className="space-y-4">
          {measurements.map((measurement, index) => {
            const difference = measurement.current - measurement.initial;
            const isPositive = difference > 0;
            const percentage = Math.abs((difference / measurement.initial) * 100).toFixed(1);

            return (
              <div key={index} className="bg-[#0D0D0D] rounded-xl p-4 border border-[#FF6A00]/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{measurement.part}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      {measurement.initial} → {measurement.current} {measurement.unit}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        isPositive ? "bg-[#9FFFC4]/20 text-[#9FFFC4]" : "bg-[#FF6A00]/20 text-[#FF6A00]"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {difference} {measurement.unit}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `${(measurement.current / (measurement.initial + 20)) * 100}%`,
                        backgroundColor: isPositive ? "#9FFFC4" : "#FF6A00",
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Share Progress */}
      <div className="bg-gradient-to-r from-[#FF6A00]/10 to-[#FF8A1E]/10 rounded-2xl p-6 border border-[#FF6A00]/30">
        <div className="flex items-start gap-4">
          <div className="text-4xl">📸</div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">Compartilhe sua Evolução</h3>
            <p className="text-gray-400 text-sm mb-4">
              Inspire outras pessoas compartilhando seu progresso nas redes sociais!
            </p>
            <button className="bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6A00]/30 hover:scale-105">
              Compartilhar no Instagram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
