import Link from "next/link";
import { PublicRoute } from "@/components/auth/PublicRoute";
import RegisterForm from "@/components/auth/RegisterForm";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/header/Header";

export default function RegisterPage() {
  return (
    <PublicRoute>
      <Header />
      <div className="min-h-dvh bg-background flex flex-col items-center justify-center p-6 pt-24">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground">
              Create account
            </h1>
            <p className="mt-2 text-muted-foreground">
              Join Nesty to manage your projects
            </p>
          </div>
          <Card className="p-4">
            <RegisterForm />
          </Card>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </PublicRoute>
  );
}
