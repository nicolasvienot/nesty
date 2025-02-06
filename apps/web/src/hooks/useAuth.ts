import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { authStorage } from "@/lib/authStorage";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "@/types/auth";

export function useAuth() {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post<AuthResponse>("/auth/login", credentials);
      return data;
    },
    onSuccess: (data) => {
      authStorage.setToken(data.access_token);
      api.defaults.headers.common["Authorization"] =
        `Bearer ${data.access_token}`;
      queryClient.setQueryData(["session"], data.user);
    },
  });

  const register = useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const { data } = await api.post<AuthResponse>(
        "/auth/register",
        credentials
      );
      return data;
    },
    onSuccess: (data) => {
      authStorage.setToken(data.access_token);
      api.defaults.headers.common["Authorization"] =
        `Bearer ${data.access_token}`;
      queryClient.setQueryData(["session"], data.user);
    },
  });

  return { login, register };
}
