"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

type RouteGuardProps = {
  children: React.ReactNode;
};

export default function RouteGuard({ children }: RouteGuardProps) {
  const { isAuthenticated, isLoading } = useAuthentication();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isInitialized && !isLoading && !isAuthenticated) {
      redirect("/");
    }
  }, [isInitialized, isAuthenticated, isLoading]);

  if (isLoading || !isInitialized) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
}
