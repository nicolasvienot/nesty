"use client";

import { createContext, useContext, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useSession } from "@/hooks/useSession";
import { authStorage } from "@/lib/authStorage";
import { User } from "@/types/auth";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
  user: User;
};

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

  const loginMutation = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async ({ email, password }) => {
      const { data } = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      return data;
    },
    onSuccess: (data) => {
      authStorage.setToken(data.access_token);
      api.defaults.headers.common["Authorization"] =
        `Bearer ${data.access_token}`;
      queryClient.setQueryData(["session"], data.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      authStorage.clearToken();
      delete api.defaults.headers.common["Authorization"];
      queryClient.setQueryData(["session"], null);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading:
          isLoading || loginMutation.isPending || logoutMutation.isPending,
        isAuthenticated,
        login: (email: string, password: string) =>
          loginMutation.mutateAsync({ email, password }).then(() => undefined),
        logout: () => logoutMutation.mutate(),
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
