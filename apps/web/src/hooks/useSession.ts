import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { authStorage } from "@/lib/authStorage";

type User = {
  id: string;
  email: string;
  name: string;
};

export function useSession() {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery<User>({
    queryKey: ["session"],
    queryFn: async () => {
      const token = authStorage.getToken();
      if (!token) return null;

      try {
        const { data } = await api.get("/auth/session");
        return data;
      } catch (error) {
        authStorage.clearToken();
        throw error;
      }
    },
  });

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    refetchSession: refetch,
  };
}
