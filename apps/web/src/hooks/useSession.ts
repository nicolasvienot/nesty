import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "@/lib/api";
import { User } from "@/types";

export function useSession() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["session"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/auth/session");
        return data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          return null;
        }
        throw error;
      }
    },
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: 1000 * 60 * 55,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
  };
}
