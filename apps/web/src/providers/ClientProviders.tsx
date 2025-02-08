"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider } from "@heroui/react";
import { AuthenticationProvider } from "@/contexts/AuthenticationContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <AuthenticationProvider>{children}</AuthenticationProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
