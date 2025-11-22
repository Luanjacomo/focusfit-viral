"use client";

import { useState } from "react";
import { Play, Clock, Flame, CheckCircle, Lock, TrendingUp } from "lucide-react";

export default function Workouts() {
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);

  const workouts = [
    {
      id: 1,
      title: "HIIT Iniciante",
      duration: 20,
      difficulty: "Fácil",
      calories: 180,
      exercises: ["Polichinelos", "Agachamentos", "Flexões", "Prancha"],
      locked: false,
      xp: 50,
    },
    {
      id: 2,
      title: "Cardio Intenso",
      duration: 20,
      difficulty: "Médio",
      calories: 250,
      exercises: ["Burpees", "Mountain Climbers", "Jump Squats", "High Knees"],
      locked: false,
      xp: 75,
    },
    {
      id: 3,
      title: "Força Total",
      duration: 20,
      difficulty: "Médio",
      calories: 200,
      exercises: ["Flexões", "Agachamentos", "Lunges", "Prancha Lateral"],
      locked: false,
      xp: 75,
    },
    {
      id: 4,
      title: "Core Destroyer",
      duration: 20,
      difficulty: "Difícil",
      calories: 220,
      exercises: ["Prancha", "Russian Twists", "Leg Raises", "Bicycle Crunches"],
      locked: true,
      xp: 100,
    },
    {
      id: 5,
      title: "Beast Mode",
      duration: 20,
      difficulty: "Extremo",
      calories: 300,
      exercises: ["Burpees", "Pistol Squats", "Handstand Push-ups", "Dragon Flags"],
      locked: true,
      xp: 150,
    },
  ];

  const handleStartWorkout = (id: number) => {
    setSelectedWorkout(id);
    // Simular conclusão após 2 segundos
    setTimeout(() => {
      setCompletedWorkouts([...completedWorkouts, id]);
      setSelectedWorkout(null);
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "text-[#9FFFC4] bg-[#9FFFC4]/20 border-[#9FFFC4]/30";
      case "Médio":
        return "text-[#FF8A1E] bg-[#FF8A1E]/20 border-[#FF8A1E]/30";
      case "Difícil":
        return "text-[#FF6A00] bg-[#FF6A00]/20 border-[#FF6A00]/30";
      case "Extremo":
        return "text-red-500 bg-red-500/20 border-red-500/30";
      default:
        return "text-gray-400 bg-gray-400/20 border-gray-400/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-[#FF6A00]/30">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] rounded-xl flex items-center justify-center">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Treinos Diários</h2>
            <p className="text-sm text-gray-400">20 minutos de alta intensidade</p>
          </div>
        </div>
        
        {/* Daily Progress */}
        <div className="mt-4 bg-[#0D0D0D] rounded-xl p-4 border border-[#FF6A00]/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progresso de Hoje</span>
            <span className="text-[#FF6A00] font-bold">{completedWorkouts.length}/3</span>
          </div>
          <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] transition-all duration-500"
              style={{ width: `${(completedWorkouts.length / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Workout Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workouts.map((workout) => {
          const isCompleted = completedWorkouts.includes(workout.id);
          const isActive = selectedWorkout === workout.id;
          const isLocked = workout.locked;

          return (
            <div
              key={workout.id}
              className={`bg-[#1A1A1A] rounded-2xl p-6 border transition-all duration-300 ${
                isLocked
                  ? "border-gray-700 opacity-60"
                  : isCompleted
                  ? "border-[#9FFFC4]/50 bg-[#9FFFC4]/5"
                  : "border-[#FF6A00]/20 hover:border-[#FF6A00]/40 hover:shadow-lg hover:shadow-[#FF6A00]/10"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold">{workout.title}</h3>
                    {isLocked && <Lock className="w-4 h-4 text-gray-500" />}
                    {isCompleted && <CheckCircle className="w-5 h-5 text-[#9FFFC4]" />}
                  </div>
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(
                      workout.difficulty
                    )}`}
                  >
                    {workout.difficulty}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <Clock className="w-4 h-4 text-[#FF6A00] mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Duração</p>
                  <p className="text-sm font-bold">{workout.duration} min</p>
                </div>
                <div className="text-center">
                  <Flame className="w-4 h-4 text-[#FF8A1E] mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Calorias</p>
                  <p className="text-sm font-bold">{workout.calories}</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-4 h-4 text-[#9FFFC4] mx-auto mb-1" />
                  <p className="text-xs text-gray-400">XP</p>
                  <p className="text-sm font-bold">+{workout.xp}</p>
                </div>
              </div>

              {/* Exercises */}
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-2">Exercícios:</p>
                <div className="flex flex-wrap gap-2">
                  {workout.exercises.map((exercise, index) => (
                    <span
                      key={index}
                      className="text-xs bg-[#0D0D0D] px-2 py-1 rounded-lg border border-[#FF6A00]/20"
                    >
                      {exercise}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => !isLocked && !isCompleted && handleStartWorkout(workout.id)}
                disabled={isLocked || isCompleted || isActive}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isLocked
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : isCompleted
                    ? "bg-[#9FFFC4]/20 text-[#9FFFC4] border border-[#9FFFC4]/30"
                    : isActive
                    ? "bg-[#FF8A1E] text-white animate-pulse"
                    : "bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] text-white hover:shadow-lg hover:shadow-[#FF6A00]/30 hover:scale-105"
                }`}
              >
                {isLocked ? (
                  <>
                    <Lock className="w-5 h-5" />
                    Bloqueado
                  </>
                ) : isCompleted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Concluído
                  </>
                ) : isActive ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Iniciando...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Iniciar Treino
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Motivational Card */}
      <div className="bg-gradient-to-r from-[#FF6A00]/10 to-[#FF8A1E]/10 rounded-2xl p-6 border border-[#FF6A00]/30">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🎯</div>
          <div>
            <h3 className="font-bold text-lg mb-1">Dica do Focus</h3>
            <p className="text-gray-400 text-sm">
              Complete 3 treinos hoje para desbloquear o próximo nível! Cada treino te deixa mais forte e mais perto dos seus objetivos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
