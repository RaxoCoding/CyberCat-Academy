"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useAuthedUser } from "@/hooks/useAuthedUser";
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
import { toast } from "sonner";
import { handleError } from "@/utils/errorHandler";

export default function UserSettings() {
  const router = useRouter();
  const { user, isLoading, updateUser, deleteUser, logout } = useAuthedUser();
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
      setEmail(user.email);
      setUsername(user.username);
    }
  }, [user]);

  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState((prev) => ({ ...prev, updateUsername: true }));

    updateUser({
      updates: { data: { username } },
      onSuccess: () => toast.success("Username updated successfully."),
      onError: (error: unknown) => toast.error(handleError(error)),
      onSettled: () => {
        setLoadingState((prev) => ({ ...prev, updateUsername: false }));
      },
    });
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState((prev) => ({ ...prev, updateEmail: true }));

    updateUser({
      updates: { email },
      options: {
        emailRedirectTo: `${window.location.origin}/auth/email-verified`,
      },
      onSuccess: () =>
        toast.success(
          "Email update request sent. Please check your inbox to confirm the change."
        ),
      onError: (error: unknown) => toast.error(handleError(error)),
      onSettled: () => {
        setLoadingState((prev) => ({ ...prev, updateEmail: false }));
      },
    });
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState((prev) => ({ ...prev, updatePassword: true }));

    updateUser({
      updates: { password },
      onSuccess: () => toast.success("Password updated successfully."),
      onError: (error: unknown) => toast.error(handleError(error)),
      onSettled: () => {
        setLoadingState((prev) => ({ ...prev, updatePassword: false }));
      },
    });
  };

  const handleDelete = async () => {
    setLoadingState((prev) => ({ ...prev, delete: true }));

    deleteUser({
      onSuccess: () => {
        toast.success("Account deleted successfully.");
        router.push("/");
      },
      onError: (error) => toast.error(handleError(error)),
      onSettled: () => setLoadingState((prev) => ({ ...prev, delete: false })),
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to access user settings.</div>;
  }

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
                disabled={isLoading || loadingState.updateUsername}
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
                disabled={isLoading || loadingState.updateEmail}
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
                disabled={isLoading || loadingState.updatePassword}
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
              disabled={isLoading || loadingState.delete}
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
