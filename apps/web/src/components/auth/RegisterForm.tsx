"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { FormInput } from "@/components/ui/FormInput";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { RegisterRequest } from "@/types";

export default function RegisterForm() {
  const { register } = useAuth();
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const userData: RegisterRequest = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      await register.mutateAsync(userData);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <FormInput
        type="text"
        name="name"
        label="Full Name"
        placeholder="Enter your full name"
        required
      />
      <FormInput
        type="email"
        name="email"
        label="Email"
        placeholder="Enter your email"
        required
      />
      <FormInput
        type="password"
        name="password"
        label="Password"
        placeholder="Create a password"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={register.isPending}
        className="w-full p-3 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none disabled:opacity-50 flex items-center justify-center"
      >
        {register.isPending && <LoadingSpinner size="sm" className="mr-2" />}
        {register.isPending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
