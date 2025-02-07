import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import api from "@/lib/api";
import { LoginRequest, RegisterRequest, AuthResponse } from "@/types";

export function useAuth() {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      try {
        const { data } = await api.post<AuthResponse>(
          "/auth/login",
          credentials
        );
        return data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["session"], data.user);
    },
  });

  const register = useMutation({
    mutationFn: async (userData: RegisterRequest) => {
      try {
        const { data } = await api.post<AuthResponse>(
          "/auth/register",
          userData
        );
        return data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["session"], data.user);
    },
  });

  const logout = async () => {
    await api.post("/auth/logout");
    queryClient.setQueryData(["session"], null);
  };

  return { login, register, logout };
}
