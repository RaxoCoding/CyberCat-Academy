'use client';

import { useEffect, useState } from 'react';
import { useSupabaseAuth } from '@/hooks/useSupbaseAuth';
import { notFound } from 'next/navigation';
import ChallengeDetails from '@/components/specific/ChallengeDetails';
import type { Database } from '@/types/supabase';

type Challenge = Database['public']['Tables']['challenges']['Row'];

export default function ChallengePage({
  params,
}: {
  params: { name: string };
}) {
  const { supabase } = useSupabaseAuth();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChallenge() {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('name', decodeURIComponent(params.name))
        .single();

      if (error) {
        console.error('Error fetching challenge:', error);
        setError('Error loading challenge. Please try again later.');
      } else {
        setChallenge(data);
      }
    }

    fetchChallenge();
  }, [supabase, params.name]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!challenge) {
    return notFound();
  }

  return (
    <div className="bg-background text-white">
      <h1 className="text-4xl font-bold mb-8">{challenge.name}</h1>
      <ChallengeDetails challenge={challenge} />
    </div>
  );
}