"use client"

import '@/styles/globals.css'
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient, User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Trophy, Flag } from "lucide-react";
import { Database } from '@/types/supabase';

type DBUser = Database["public"]["Tables"]["users"]["Row"];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userAuth, setUserAuth] = useState<User | null>(null);
  const [user, setUser] = useState<DBUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      setUserAuth(session?.user ?? null);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUserAuth(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fetch profile whenever the user changes
  useEffect(() => {
    const getUser = async () => {
      if (userAuth) {
        const { data: userData, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("id", userAuth.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
        } else {
          setUser(userData);
        }
      } else {
        setUser(null);
      }
    };

    getUser();
  }, [userAuth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <SessionContextProvider supabaseClient={supabase}>
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
                {user ? (
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
        </body>
      </html>
    </SessionContextProvider>
  );
}
