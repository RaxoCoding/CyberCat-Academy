"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EmailVerified() {
  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Email Verified
          </CardTitle>
          <CardDescription className="text-center">
            Your email address has been successfully verified.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}