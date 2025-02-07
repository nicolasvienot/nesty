"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const { isAuthenticated } = useAuthContext();
  const { logout } = useAuth();
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50">
      <div className="px-8">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">Nesty</span>
          </Link>

          <nav className="flex items-center space-x-4">
            {isAuthenticated && (
              <>
                {!isDashboard && (
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => logout()}
                  className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                >
                  Sign out
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
