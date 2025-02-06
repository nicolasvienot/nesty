import PrivateRoute from "@/components/auth/PrivateRoute";
import { LogoutButton } from "@/components/auth/LogoutButton";

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <div className="min-h-screen bg-background p-8">
        <div className="absolute top-4 right-4">
          <LogoutButton />
        </div>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

          <div className="grid gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">
                Welcome to your dashboard!
              </h2>
              <p className="text-foreground/60">
                This is a protected page. You can only see this if you&apos;re
                logged in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
