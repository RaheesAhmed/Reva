"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function SignUp() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast({
        title: "Success",
        description: "Account created successfully. Please sign in.",
      });

      router.push("/sign-in");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-neutral-900">
      <Card className="w-full max-w-md space-y-8 p-8 bg-neutral-800/50 border-neutral-700/40 backdrop-blur-sm shadow-2xl">
        <div className="text-center">
          <div className="flex items-baseline justify-center mb-8">
            <span className="text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-reva-400 via-reva-500 to-reva-600 tracking-tight">
              reva
            </span>
            <span className="text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/70">
              .
            </span>
            <span className="text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-reva-400 via-reva-500 to-reva-600">
              ai
            </span>
          </div>
          <h2 className="text-3xl font-semibold text-white mb-2">
            Create your account
          </h2>
          <p className="text-neutral-400">
            Join us to access premium real estate analysis tools
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-neutral-200">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="mt-1 bg-neutral-900/50 border-neutral-700/40 text-white placeholder:text-neutral-400 focus:border-reva-500 focus:ring-reva-500"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-neutral-200">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 bg-neutral-900/50 border-neutral-700/40 text-white placeholder:text-neutral-400 focus:border-reva-500 focus:ring-reva-500"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-neutral-200">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 bg-neutral-900/50 border-neutral-700/40 text-white placeholder:text-neutral-400 focus:border-reva-500 focus:ring-reva-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            className={`w-full bg-reva-500 hover:bg-reva-600 text-white transition-all duration-200 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </Button>
        </form>
        <div className="text-center text-sm">
          <span className="text-neutral-400">Already have an account? </span>
          <Link 
            href="/sign-in" 
            className="text-reva-400 hover:text-reva-300 transition-colors font-medium"
          >
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
} 