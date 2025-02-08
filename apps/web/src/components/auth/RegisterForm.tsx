"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        name="name"
        label="Full name"
        placeholder="Enter your full name"
        required
      />
      <Input
        type="email"
        name="email"
        label="Email"
        placeholder="Enter your email"
        required
      />
      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="Create a password"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full" isDisabled={register.isPending}>
        {register.isPending && <LoadingSpinner size="sm" className="mr-2" />}
        {register.isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
