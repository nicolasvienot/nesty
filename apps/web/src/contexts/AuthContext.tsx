"use client";

import { createContext, useContext, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useSession } from "@/hooks/useSession";
import { authStorage } from "@/lib/authStorage";
import { User } from "@/types/auth";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = authStorage.getToken();
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      queryClient.invalidateQueries({ queryKey: ["session"] });
    }
  }, [queryClient]);

  const { user, isLoading, isAuthenticated } = useSession();

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
