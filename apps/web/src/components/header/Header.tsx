"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { SwitchTheme } from "@/components/theme/SwitchTheme";

export function Header() {
  const { isAuthenticated } = useAuthContext();
  const { logout } = useAuth();
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50">
      <div className="px-6">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">Nesty</span>
          </Link>
          <nav className="flex items-center space-x-2">
            {isAuthenticated && (
              <>
                {!isDashboard && (
                  <Button
                    as={Link}
                    href="/dashboard"
                    variant="light"
                    color="default"
                    size="sm"
                  >
                    Dashboard
                  </Button>
                )}
                <Button
                  onPress={() => logout()}
                  variant="light"
                  color="default"
                  size="sm"
                >
                  Logout
                </Button>
              </>
            )}
            <SwitchTheme />
          </nav>
        </div>
      </div>
    </header>
  );
}
