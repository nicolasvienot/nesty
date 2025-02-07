"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

type PublicRouteProps = {
  children: React.ReactNode;
};

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isInitialized && !isLoading && isAuthenticated) {
      redirect("/dashboard");
    }
  }, [isInitialized, isAuthenticated, isLoading]);

  if (isLoading || !isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
}
