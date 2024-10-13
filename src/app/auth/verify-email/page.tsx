import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function VerifyEmail() {
  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-center">
            We&apos;ve sent you an email with a verification link. Please check your inbox and click the link to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mt-4">
            Once verified, you can{" "}
            <Link href="/auth/sign-in" className="text-primary hover:underline">
              sign in to your account
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}