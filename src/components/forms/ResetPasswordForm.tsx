"use client";

import { useState, useEffect } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { handleError } from "@/utils/errorHandler";
import { toast } from "sonner";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const { supabase, loading } = useSupabaseAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if the user has a valid recovery token
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        // If there's no session, redirect to the sign-in page
        router.push("/auth/sign-in");
      }
    };

    checkSession();
  }, [supabase.auth, router]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setResetLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        throw error;
      }

      toast.success("Password reset successfully. Redirecting to home...");
      setTimeout(() => router.push("/"), 1000);
    } catch (error: unknown) {
      toast.error(handleError(error));
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <form onSubmit={handleResetPassword} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={loading || resetLoading}
      >
        {resetLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        Reset Password
      </Button>
    </form>
  );
}
