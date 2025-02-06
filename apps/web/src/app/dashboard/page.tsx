"use client";

import PrivateRoute from "@/components/auth/PrivateRoute";
import { LogoutButton } from "@/components/auth/LogoutButton";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { user } = useAuthContext();
  console.log(user);

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-background p-8">
        <div className="absolute top-4 right-4 flex gap-4">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600/10 border border-blue-600/20 rounded-md 
            hover:bg-blue-600/20 hover:border-blue-600/30 
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Home
          </Link>
          <LogoutButton />
        </div>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

          <div className="grid gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">
                Welcome {user?.name}!
              </h2>
              <div className="space-y-2">
                <p className="text-foreground/60">
                  This is a protected page. You can only see this if you&apos;re
                  logged in.
                </p>
                <p className="text-foreground/60">Email: {user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
