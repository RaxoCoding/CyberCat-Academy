"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { handleError } from "@/utils/errorHandler";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sendResetLoading, setSendResetLoading] = useState(false);
  const { supabase, loading } = useSupabaseAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendResetLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        throw error;
      }

      toast.success("Password reset email sent. Check your inbox.");
    } catch (error: unknown) {
      toast.error(handleError(error));
    } finally {
      setSendResetLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading || sendResetLoading}
            >
              {sendResetLoading && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Send Reset Email
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link
              href="/auth/sign-in"
              className="text-sm text-primary hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}