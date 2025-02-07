"use client";

import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
    >
      {theme === "dark" ? "🌞 Light mode" : "🌙 Dark mode"}
    </button>
  );
}
