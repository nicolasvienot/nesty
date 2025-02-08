"use client";

import { createContext, useContext, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/hooks/useSession";
import { User } from "@/types";

type AuthenticationContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const AuthenticationContext = createContext<
  AuthenticationContextType | undefined
>(undefined);

export function AuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["session"] });
  }, [queryClient]);

  const { user, isLoading, isAuthenticated } = useSession();

  return (
    <AuthenticationContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error("useAuthentication must be used within an AuthProvider");
  }
  return context;
}
