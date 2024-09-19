"use client"

import '@/styles/globals.css'
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSupabaseAuth } from "@/hooks/useSupbaseAuth";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Trophy, Flag } from "lucide-react";
import { Database } from '@/types/supabase';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

type DBUser = Database["public"]["Tables"]["users"]["Row"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user: userAuth, supabase, loading } = useSupabaseAuth();
  const [user, setUser] = useState<DBUser | null>(null);

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
      </Head>
      <body>
        <nav className="bg-secondary text-secondary-foreground p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold">
                CyberCat Academy
              </Link>
              <Button asChild variant="link">
                <Link href="/challenges">
                  <Flag className="mr-2 h-4 w-4" />
                  Challenges
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link href="/scoreboard">
                  <Trophy className="mr-2 h-4 w-4" />
                  Scoreboard
                </Link>
              </Button>
            </div>
            <div>
              {loading ? (
                <span>Loading...</span>
              ) : user ? (
                <>
                  <span className="mr-4">Welcome, {user.username}</span>
                  <Button variant="destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button asChild>
                  <Link href="/auth">
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
      </body>
    </html>
  );
}