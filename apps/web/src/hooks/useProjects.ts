import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

type Project = {
  id: string;
  name: string;
  repository: string;
};

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await api.get("/projects");
      return data;
    },
  });
}
