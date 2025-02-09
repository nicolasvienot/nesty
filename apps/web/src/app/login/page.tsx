import Link from "next/link";
import { PublicRoute } from "@/components/auth/PublicRoute";
import LoginForm from "@/components/auth/LoginForm";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/header/Header";

export default function LoginPage() {
  return (
    <PublicRoute>
      <Header />
      <div className="min-h-dvh bg-background flex flex-col items-center justify-center p-6 pt-24">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground">Welcome back</h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to your account
            </p>
          </div>
          <Card className="p-4">
            <LoginForm />
          </Card>
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </PublicRoute>
  );
}
