import Link from "next/link";
import { PublicRoute } from "@/components/auth/PublicRoute";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <PublicRoute>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600/10 border border-blue-600/20 rounded-md 
            hover:bg-blue-600/20 hover:border-blue-600/30 
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Home
          </Link>
        </div>
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Welcome back</h1>
            <p className="mt-2 text-foreground/60">Sign in to your account</p>
          </div>
          <LoginForm />
          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-600"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </PublicRoute>
  );
}
