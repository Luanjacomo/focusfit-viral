"use client";

import { useState } from "react";
import { Settings, User, Target, Bell, Moon, Droplet, Dumbbell, Save } from "lucide-react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Campeão",
    age: 25,
    weight: 76,
    height: 175,
    goal: "Perder Peso",
  });

  const [goals, setGoals] = useState({
    dailyCalories: 2000,
    dailyProtein: 150,
    dailyWater: 8,
    dailySleep: 8,
    weeklyWorkouts: 5,
  });

  const [notifications, setNotifications] = useState({
    workouts: true,
    meals: true,
    water: true,
    sleep: true,
  });

  const goalOptions = ["Perder Peso", "Ganhar Massa", "Manter Forma", "Melhorar Saúde"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-[#FF6A00]/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] rounded-xl flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Configurações</h2>
            <p className="text-sm text-gray-400">Personalize sua experiência</p>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#FF6A00]/20">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-[#FF6A00]" />
          Perfil
        </h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Nome</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-[#0D0D0D] border border-[#FF6A00]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6A00]/50 transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Idade</label>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                className="w-full bg-[#0D0D0D] border border-[#FF6A00]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6A00]/50 transition-all duration-300"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Peso (kg)</label>
              <input
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({ ...profile, weight: parseInt(e.target.value) })}
                className="w-full bg-[#0D0D0D] border border-[#FF6A00]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6A00]/50 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Altura (cm)</label>
            <input
              type="number"
              value={profile.height}
              onChange={(e) => setProfile({ ...profile, height: parseInt(e.target.value) })}
              className="w-full bg-[#0D0D0D] border border-[#FF6A00]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6A00]/50 transition-all duration-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Objetivo Principal</label>
            <select
              value={profile.goal}
              onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
              className="w-full bg-[#0D0D0D] border border-[#FF6A00]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6A00]/50 transition-all duration-300"
            >
              {goalOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Goals Section */}
      <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#FF6A00]/20">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#FF6A00]" />
          Metas Diárias
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <Dumbbell className="w-4 h-4" />
                Calorias Diárias
              </label>
              <span className="text-[#FF6A00] font-bold">{goals.dailyCalories} kcal</span>
            </div>
            <input
              type="range"
              min="1200"
              max="3500"
              step="100"
              value={goals.dailyCalories}
              onChange={(e) => setGoals({ ...goals, dailyCalories: parseInt(e.target.value) })}
              className="w-full h-2 bg-[#0D0D0D] rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #FF6A00 0%, #FF6A00 ${
                  ((goals.dailyCalories - 1200) / (3500 - 1200)) * 100
                }%, #0D0D0D ${((goals.dailyCalories - 1200) / (3500 - 1200)) * 100}%, #0D0D0D 100%)`,
              }}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Proteínas Diárias
              </label>
              <span className="text-[#FF8A1E] font-bold">{goals.dailyProtein}g</span>
            </div>
            <input
              type="range"
              min="50"
              max="250"
              step="10"
              value={goals.dailyProtein}
              onChange={(e) => setGoals({ ...goals, dailyProtein: parseInt(e.target.value) })}
              className="w-full h-2 bg-[#0D0D0D] rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #FF8A1E 0%, #FF8A1E ${
                  ((goals.dailyProtein - 50) / (250 - 50)) * 100
                }%, #0D0D0D ${((goals.dailyProtein - 50) / (250 - 50)) * 100}%, #0D0D0D 100%)`,
              }}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <Droplet className="w-4 h-4" />
                Copos de Água
              </label>
              <span className="text-[#6ECFFF] font-bold">{goals.dailyWater} copos</span>
            </div>
            <input
              type="range"
              min="4"
              max="12"
              step="1"
              value={goals.dailyWater}
              onChange={(e) => setGoals({ ...goals, dailyWater: parseInt(e.target.value) })}
              className="w-full h-2 bg-[#0D0D0D] rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #6ECFFF 0%, #6ECFFF ${
                  ((goals.dailyWater - 4) / (12 - 4)) * 100
                }%, #0D0D0D ${((goals.dailyWater - 4) / (12 - 4)) * 100}%, #0D0D0D 100%)`,
              }}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <Moon className="w-4 h-4" />
                Horas de Sono
              </label>
              <span className="text-[#6ECFFF] font-bold">{goals.dailySleep}h</span>
            </div>
            <input
              type="range"
              min="5"
              max="10"
              step="0.5"
              value={goals.dailySleep}
              onChange={(e) => setGoals({ ...goals, dailySleep: parseFloat(e.target.value) })}
              className="w-full h-2 bg-[#0D0D0D] rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #6ECFFF 0%, #6ECFFF ${
                  ((goals.dailySleep - 5) / (10 - 5)) * 100
                }%, #0D0D0D ${((goals.dailySleep - 5) / (10 - 5)) * 100}%, #0D0D0D 100%)`,
              }}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <Dumbbell className="w-4 h-4" />
                Treinos Semanais
              </label>
              <span className="text-[#9FFFC4] font-bold">{goals.weeklyWorkouts}x</span>
            </div>
            <input
              type="range"
              min="1"
              max="7"
              step="1"
              value={goals.weeklyWorkouts}
              onChange={(e) => setGoals({ ...goals, weeklyWorkouts: parseInt(e.target.value) })}
              className="w-full h-2 bg-[#0D0D0D] rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #9FFFC4 0%, #9FFFC4 ${
                  ((goals.weeklyWorkouts - 1) / (7 - 1)) * 100
                }%, #0D0D0D ${((goals.weeklyWorkouts - 1) / (7 - 1)) * 100}%, #0D0D0D 100%)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#FF6A00]/20">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#FF6A00]" />
          Notificações
        </h3>

        <div className="space-y-4">
          {[
            { key: "workouts", label: "Lembretes de Treino", icon: Dumbbell },
            { key: "meals", label: "Lembretes de Alimentação", icon: Target },
            { key: "water", label: "Lembretes de Hidratação", icon: Droplet },
            { key: "sleep", label: "Lembretes de Sono", icon: Moon },
          ].map((item) => {
            const Icon = item.icon;
            const isEnabled = notifications[item.key as keyof typeof notifications];

            return (
              <div key={item.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FF6A00]/20 rounded-xl flex items-center justify-center border border-[#FF6A00]/30">
                    <Icon className="w-5 h-5 text-[#FF6A00]" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                <button
                  onClick={() =>
                    setNotifications({
                      ...notifications,
                      [item.key]: !isEnabled,
                    })
                  }
                  className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                    isEnabled ? "bg-[#FF6A00]" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${
                      isEnabled ? "left-8" : "left-1"
                    }`}
                  ></div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      <button className="w-full bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6A00]/30 hover:scale-105 flex items-center justify-center gap-2">
        <Save className="w-5 h-5" />
        Salvar Configurações
      </button>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-[#9FFFC4]/10 to-[#9FFFC4]/5 rounded-2xl p-6 border border-[#9FFFC4]/30">
        <div className="flex items-start gap-4">
          <div className="text-4xl">⚙️</div>
          <div>
            <h3 className="font-bold text-lg mb-1 text-[#9FFFC4]">Personalize sua Jornada</h3>
            <p className="text-gray-400 text-sm">
              Ajuste suas metas e preferências para uma experiência totalmente personalizada. O Focus se adapta ao seu estilo!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
