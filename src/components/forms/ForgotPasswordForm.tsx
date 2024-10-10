"use client";

import { useState } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { handleError } from "@/utils/errorHandler";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
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
        {sendResetLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        Send Reset Email
      </Button>
    </form>
  );
}
