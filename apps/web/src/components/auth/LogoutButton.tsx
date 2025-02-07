"use client";

import { useAuth } from "@/hooks/useAuth";

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={() => logout()}
      className="px-4 py-2 text-sm font-medium text-white bg-red-600/10 border border-red-600/20 rounded-md 
      hover:bg-red-600/20 hover:border-red-600/30 
      transition-all duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
    >
      Sign out
    </button>
  );
}
