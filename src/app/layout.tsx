"use client";

import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Trophy, Flag, User, Menu, Loader2 } from "lucide-react";
import { Database } from "@/types/supabase";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/sonner";

type DBUser = Database["public"]["Views"]["user_scores"]["Row"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user: userAuth, supabase, loading } = useSupabaseAuth();
  const [user, setUser] = useState<DBUser | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function getUser() {
      if (userAuth) {
        const { data: userData, error: profileError } = await supabase
          .from("user_scores")
          .select("*")
          .eq("user_id", userAuth.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
        } else {
          setUser(userData);
        }
      } else {
        setUser(null);
      }
    }

    getUser();
  }, [userAuth, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <html className="dark">
      <Head>
        <title>CyberCat Academy</title>
        <meta
          name="description"
          content="Enhance your cybersecurity skills with Cyber Cat Challenges"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <nav className="bg-card text-card-foreground p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold mr-4">
                CyberCat Academy
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
            <div
              className={`md:flex items-center gap-4 ${
                isMenuOpen
                  ? "flex flex-col absolute top-16 left-0 right-0 bg-card p-4 z-50"
                  : "hidden"
              }`}
            >
              <Button
                asChild
                variant="link"
                className="w-full md:w-auto justify-start"
              >
                <Link href="/challenges">
                  <Flag className="mr-2 h-4 w-4" />
                  Challenges
                </Link>
              </Button>
              <Button
                asChild
                variant="link"
                className="w-full md:w-auto justify-start"
              >
                <Link href="/scoreboard">
                  <Trophy className="mr-2 h-4 w-4" />
                  Scoreboard
                </Link>
              </Button>
              {loading ? (
                <Button asChild className="w-full md:w-auto" disabled>
                  <Link href="/auth/sign-in">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Login / Sign Up
                  </Link>
                </Button>
              ) : user ? (
                <div className="flex gap-2 w-full md:w-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full md:w-auto">
                        <User className="mr-2 h-4 w-4" />
                        {user.username}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href={`/user/${user.username}`}>Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href="/user/settings">Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Button asChild className="w-full md:w-auto">
                  <Link href="/auth/sign-in">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login / Sign Up
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </nav>
        <main className="bg-background text-foreground p-8">{children}</main>
        <Analytics />
        <SpeedInsights />
        <Toaster richColors />
      </body>
    </html>
  );
}
