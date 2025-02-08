"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Theme } from "@/types/theme";

type ThemeState = {
  userPreference: Theme;
  systemPreference: Theme;
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getThemeFromCookie = () => {
  const themeCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("theme="));
  return themeCookie ? (themeCookie.split("=")[1] as Theme) : undefined;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: Theme;
}

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const [themeState, setThemeState] = useState<ThemeState>(() => ({
    userPreference:
      initialTheme ||
      (typeof window !== "undefined" ? getThemeFromCookie() : undefined),
    systemPreference:
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
  }));

  const theme = themeState.userPreference ?? themeState.systemPreference;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setThemeState((prev) => ({
        ...prev,
        systemPreference: e.matches ? "dark" : "light",
      }));
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (themeState.userPreference) {
      document.cookie = `theme=${themeState.userPreference}; path=/; max-age=31536000;`;
    }
  }, [theme, themeState.userPreference]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => ({
      ...prev,
      userPreference: theme === "dark" ? "light" : "dark",
    }));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
