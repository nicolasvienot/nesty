"use client";

import Link from "next/link";
import { Header } from "@/components/header/Header";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuthentication();

  if (isLoading) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-dvh bg-background flex flex-col items-center justify-center p-6 pt-24">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground">
              Welcome to Nesty
            </h1>
            <p className="text-lg text-muted-foreground tracking-wide">
              {isAuthenticated
                ? "Continue to your dashboard to get started"
                : "Get started by signing in or creating an account"}
            </p>
          </div>
          <div className="space-y-2">
            {isAuthenticated ? (
              <Button
                as={Link}
                href="/dashboard"
                color="primary"
                className="w-full"
              >
                Access the dashboard
              </Button>
            ) : (
              <>
                <Button
                  as={Link}
                  href="/login"
                  size="lg"
                  color="primary"
                  className="w-full"
                >
                  Sign in
                </Button>
                <Button
                  as={Link}
                  href="/register"
                  variant="ghost"
                  size="lg"
                  color="primary"
                  className="w-full"
                >
                  Create account
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
