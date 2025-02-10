import Link from "next/link";
import { PublicRoute } from "@/components/auth/PublicRoute";
import RegisterForm from "@/components/auth/RegisterForm";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/header/Header";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";

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
            <div className="space-y-4">
              <GoogleAuthButton />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-content1 px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              <RegisterForm />
            </div>
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
