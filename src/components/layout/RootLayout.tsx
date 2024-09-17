import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { createClient, User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react'; // Import the icons

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      router.push('/');
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="dark">
      <Head>
        <title>CyberCat Academy</title>
        <meta name="description" content="Enhance your cybersecurity skills with CyberCat Academy" />
      </Head>
      <nav className="bg-secondary text-secondary-foreground p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            CyberCat Academy
          </Link>
          <div>
            {user ? (
              <>
                <span className="mr-4">Welcome, {user.email}</span>
                <Button variant="destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> {/* Add Logout icon */}
                  Logout
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link href="/auth">
                  <LogIn className="mr-2 h-4 w-4" /> {/* Add Login icon */}
                  Login / Sign Up
                </Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
      <main className="bg-background text-foreground">{children}</main>
    </div>
  );
}