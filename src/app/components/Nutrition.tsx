"use client";

import { useState } from "react";
import { Camera, Utensils, TrendingUp, CheckCircle, Apple, Pizza, Salad } from "lucide-react";

export default function Nutrition() {
  const [meals, setMeals] = useState([
    { id: 1, name: "Café da Manhã", calories: 450, protein: 25, carbs: 50, fat: 15, time: "08:30", healthy: true },
    { id: 2, name: "Almoço", calories: 650, protein: 40, carbs: 70, fat: 20, time: "12:45", healthy: true },
  ]);

  const [dailyGoal] = useState({ calories: 2000, protein: 150, carbs: 250, fat: 65 });

  const totalConsumed = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const handleAddMeal = () => {
    // Simular adição de refeição via foto
    const newMeal = {
      id: meals.length + 1,
      name: "Lanche",
      calories: 200,
      protein: 10,
      carbs: 25,
      fat: 8,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      healthy: true,
    };
    setMeals([...meals, newMeal]);
  };

  const macros = [
    {
      name: "Calorias",
      current: totalConsumed.calories,
      goal: dailyGoal.calories,
      unit: "kcal",
      color: "#FF6A00",
      icon: Utensils,
    },
    {
      name: "Proteínas",
      current: totalConsumed.protein,
      goal: dailyGoal.protein,
      unit: "g",
      color: "#FF8A1E",
      icon: TrendingUp,
    },
    {
      name: "Carboidratos",
      current: totalConsumed.carbs,
      goal: dailyGoal.carbs,
      unit: "g",
      color: "#9FFFC4",
      icon: Apple,
    },
    {
      name: "Gorduras",
      current: totalConsumed.fat,
      goal: dailyGoal.fat,
      unit: "g",
      color: "#6ECFFF",
      icon: Salad,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-[#FF6A00]/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] rounded-xl flex items-center justify-center">
            <Utensils className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Alimentação</h2>
            <p className="text-sm text-gray-400">Registre suas refeições com IA</p>
          </div>
        </div>

        {/* Add Meal Button */}
        <button
          onClick={handleAddMeal}
          className="w-full bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6A00]/30 hover:scale-105 flex items-center justify-center gap-2"
        >
          <Camera className="w-5 h-5" />
          Fotografar Refeição
        </button>
      </div>

      {/* Macros Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {macros.map((macro, index) => {
          const Icon = macro.icon;
          const progress = Math.min((macro.current / macro.goal) * 100, 100);
          const isComplete = macro.current >= macro.goal;

          return (
            <div
              key={index}
              className="bg-[#1A1A1A] rounded-2xl p-4 border border-[#FF6A00]/20 hover:border-[#FF6A00]/40 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${macro.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: macro.color }} />
                </div>
                {isComplete && <CheckCircle className="w-4 h-4 text-[#9FFFC4] ml-auto" />}
              </div>
              <p className="text-xs text-gray-400 mb-1">{macro.name}</p>
              <p className="text-lg font-bold mb-1">
                {macro.current}
                <span className="text-sm text-gray-400">/{macro.goal}</span>
              </p>
              <div className="h-1.5 bg-[#0D0D0D] rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progress}%`, backgroundColor: macro.color }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Meals List */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span>Refeições de Hoje</span>
          <span className="text-sm text-gray-400">({meals.length})</span>
        </h3>

        {meals.map((meal) => (
          <div
            key={meal.id}
            className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#FF6A00]/20 hover:border-[#FF6A00]/40 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF6A00]/20 to-[#FF8A1E]/20 rounded-xl flex items-center justify-center border border-[#FF6A00]/30">
                  {meal.healthy ? (
                    <Salad className="w-6 h-6 text-[#9FFFC4]" />
                  ) : (
                    <Pizza className="w-6 h-6 text-[#FF6A00]" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold">{meal.name}</h4>
                  <p className="text-xs text-gray-400">{meal.time}</p>
                </div>
              </div>
              {meal.healthy && (
                <div className="w-8 h-8 bg-[#9FFFC4]/20 rounded-full flex items-center justify-center border border-[#9FFFC4]/30">
                  <CheckCircle className="w-4 h-4 text-[#9FFFC4]" />
                </div>
              )}
            </div>

            {/* Macros Grid */}
            <div className="grid grid-cols-4 gap-3 bg-[#0D0D0D] rounded-xl p-3 border border-[#FF6A00]/10">
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">Calorias</p>
                <p className="text-sm font-bold text-[#FF6A00]">{meal.calories}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">Proteína</p>
                <p className="text-sm font-bold text-[#FF8A1E]">{meal.protein}g</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">Carbs</p>
                <p className="text-sm font-bold text-[#9FFFC4]">{meal.carbs}g</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">Gordura</p>
                <p className="text-sm font-bold text-[#6ECFFF]">{meal.fat}g</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Info Card */}
      <div className="bg-gradient-to-r from-[#9FFFC4]/10 to-[#9FFFC4]/5 rounded-2xl p-6 border border-[#9FFFC4]/30">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🤖</div>
          <div>
            <h3 className="font-bold text-lg mb-1 text-[#9FFFC4]">IA Nutricional</h3>
            <p className="text-gray-400 text-sm">
              Tire uma foto da sua refeição e nossa IA calculará automaticamente as calorias e macronutrientes. Simples e preciso!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
