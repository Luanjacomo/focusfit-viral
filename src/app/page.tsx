"use client";

import { useState } from "react";
import { Home, Dumbbell, Utensils, Droplet, Moon, Trophy, Settings, TrendingUp } from "lucide-react";
import Dashboard from "./components/Dashboard";
import Workouts from "./components/Workouts";
import Nutrition from "./components/Nutrition";
import Hydration from "./components/Hydration";
import Sleep from "./components/Sleep";
import Progress from "./components/Progress";
import Achievements from "./components/Achievements";
import SettingsPage from "./components/SettingsPage";

type TabType = "dashboard" | "workouts" | "nutrition" | "hydration" | "sleep" | "progress" | "achievements" | "settings";

export default function FocusFitApp() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [userLevel, setUserLevel] = useState(1);
  const [streak, setStreak] = useState(3);

  const tabs = [
    { id: "dashboard", icon: Home, label: "Início" },
    { id: "workouts", icon: Dumbbell, label: "Treinos" },
    { id: "nutrition", icon: Utensils, label: "Alimentação" },
    { id: "hydration", icon: Droplet, label: "Hidratação" },
    { id: "sleep", icon: Moon, label: "Sono" },
    { id: "progress", icon: TrendingUp, label: "Evolução" },
    { id: "achievements", icon: Trophy, label: "Conquistas" },
    { id: "settings", icon: Settings, label: "Config" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard userLevel={userLevel} streak={streak} />;
      case "workouts":
        return <Workouts />;
      case "nutrition":
        return <Nutrition />;
      case "hydration":
        return <Hydration />;
      case "sleep":
        return <Sleep />;
      case "progress":
        return <Progress />;
      case "achievements":
        return <Achievements />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Dashboard userLevel={userLevel} streak={streak} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pb-24 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-[#FF6A00]/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] rounded-xl flex items-center justify-center">
              <span className="text-2xl">🦊</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] bg-clip-text text-transparent">
                FocusFit
              </h1>
              <p className="text-xs text-gray-400">Level {userLevel} • {streak} dias</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-[#1A1A1A] px-3 py-2 rounded-lg border border-[#FF6A00]/30">
              <div className="w-2 h-2 bg-[#FF6A00] rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">🔥 {streak} dias</span>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed left-0 top-16 bottom-0 w-64 bg-[#0D0D0D] border-r border-[#FF6A00]/20 p-4">
        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#FF6A00] to-[#FF8A1E] text-white shadow-lg shadow-[#FF6A00]/30"
                    : "text-gray-400 hover:bg-[#1A1A1A] hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="md:ml-64 max-w-7xl mx-auto px-4 py-6">
        {renderContent()}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0D0D0D]/95 backdrop-blur-sm border-t border-[#FF6A00]/20">
        <div className="grid grid-cols-4 gap-1 p-2">
          {tabs.slice(0, 4).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-[#FF6A00] to-[#FF8A1E] text-white"
                    : "text-gray-400"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
