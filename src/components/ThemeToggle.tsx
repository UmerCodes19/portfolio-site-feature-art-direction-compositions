"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="fixed top-6 right-6 z-[9999] flex items-center gap-2">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle Light & Dark Mode"
        style={{
          backgroundColor: isLight ? "rgba(255, 255, 255, 0.95)" : "rgba(24, 24, 27, 0.95)",
          color: isLight ? "#111111" : "#FFFFFF",
          borderColor: isLight ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.15)",
        }}
        className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-xs font-mono tracking-wider shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        title={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
      >
        <div className="relative w-4 h-4 flex items-center justify-center">
          {isLight ? (
            <Moon className="w-4 h-4 text-indigo-600 transition-transform group-hover:-rotate-12" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400 animate-spin-slow transition-transform group-hover:rotate-45" />
          )}
        </div>
        <span className="uppercase font-medium select-none">
          {isLight ? "Dark Mode" : "Light Mode"}
        </span>
        <span className="w-2 h-2 rounded-full bg-[#af5bf0] animate-pulse" />
      </button>
    </div>
  );
}
