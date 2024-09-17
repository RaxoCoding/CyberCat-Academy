import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { createClient, User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

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
    <>
      <Head>
        <title>CyberCat Academy</title>
        <meta name="description" content="Enhance your cybersecurity skills with CyberCat Academy" />
      </Head>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            CyberCat Academy
          </Link>
          <div>
            {user ? (
              <>
                <span className="mr-4">Welcome, {user.email}</span>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/auth" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
}