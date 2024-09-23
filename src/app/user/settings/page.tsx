"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function UserSettings() {
  const router = useRouter();
  const { supabase, user, loading } = useSupabaseAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loadingState, setLoadingState] = useState({
    updateUsername: false,
    updateEmail: false,
    updatePassword: false,
    delete: false,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email!);
      setUsername(user.user_metadata.username);
    }
  }, [user]);

  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState((prev) => ({ ...prev, updateUsername: true }));

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        data: { username },
      });

      if (updateError) {
        throw updateError;
      }

      toast({
        title: "Success",
        description: "Username updated successfully.",
        variant: "default",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingState((prev) => ({ ...prev, updateUsername: false }));
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState((prev) => ({ ...prev, updateEmail: true }));

    try {
      const { error: updateError } = await supabase.auth.updateUser(
        {
          email,
        },
        {
          emailRedirectTo: `${window.location.origin}/auth/email-verified`,
        }
      );

      if (updateError) {
        throw updateError;
      }

      toast({
        title: "Success",
        description:
          "Email update request sent. Please check your inbox to confirm the change.",
        variant: "default",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingState((prev) => ({ ...prev, updateEmail: false }));
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState((prev) => ({ ...prev, updatePassword: true }));

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        throw updateError;
      }

      toast({
        title: "Success",
        description: "Password updated successfully.",
        variant: "default",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingState((prev) => ({ ...prev, updatePassword: false }));
    }
  };

  const handleDelete = async () => {
    setLoadingState((prev) => ({ ...prev, delete: true }));

    try {
      const { error: deleteError } = await supabase.rpc("delete_user");

      if (deleteError) {
        throw deleteError;
      }

      await supabase.auth.signOut();
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingState((prev) => ({ ...prev, delete: false }));
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">User Settings</h1>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Update Username</CardTitle>
            <CardDescription>Change your username</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateUsername} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="max-w-md"
                />
              </div>
              <Button
                type="submit"
                className="max-w-md"
                disabled={loading || loadingState.updateUsername}
              >
                {loadingState.updateUsername && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Update Username
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Update Email</CardTitle>
            <CardDescription>Change your email address</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateEmail} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="max-w-md"
                />
              </div>
              <Button
                type="submit"
                className="max-w-md"
                disabled={loading || loadingState.updateEmail}
              >
                {loadingState.updateEmail && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Update Email
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Update Password</CardTitle>
            <CardDescription>Change your password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="max-w-md"
                />
              </div>
              <Button
                type="submit"
                className="max-w-md"
                disabled={loading || loadingState.updatePassword}
              >
                {loadingState.updatePassword && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
            <CardDescription>Permanently delete your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              className="max-w-md"
              onClick={() => setIsDeleteModalOpen(true)}
              disabled={loading || loadingState.delete}
            >
              {loadingState.delete && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Account Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              {loadingState.delete && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
