import Link from "next/link";
import { PublicRoute } from "@/components/auth/PublicRoute";
import RegisterForm from "@/components/auth/RegisterForm";
import { Header } from "@/components/header/Header";

export default function RegisterPage() {
  return (
    <PublicRoute>
      <Header />
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Create account</h1>
            <p className="mt-2 text-foreground/60">
              Join Nesty to manage your projects
            </p>
          </div>
          <RegisterForm />
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </PublicRoute>
  );
}
