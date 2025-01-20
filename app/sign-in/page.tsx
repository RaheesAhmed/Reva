"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function SignIn() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
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
            Sign in to your account
          </h2>
          <p className="text-neutral-400">
            Enter your credentials to access your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
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
                autoComplete="current-password"
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
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <div className="text-center text-sm">
          <span className="text-neutral-400">Don't have an account? </span>
          <Link 
            href="/sign-up" 
            className="text-reva-400 hover:text-reva-300 transition-colors font-medium"
          >
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
} 