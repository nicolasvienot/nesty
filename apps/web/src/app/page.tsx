"use client";

import Link from "next/link";
import { Header } from "@/components/header/Header";
import { useAuthContext } from "@/contexts/AuthContext";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-24">
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
          <div className="space-y-4">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="w-full p-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-block font-medium transition-colors"
              >
                Access the dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="w-full p-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-block font-medium transition-colors"
                >
                  Sign in
                </Link>

                <Link
                  href="/register"
                  className="w-full p-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-block font-medium transition-colors dark:hover:bg-blue-950/50"
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
