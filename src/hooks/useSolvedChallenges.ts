import { useState, useEffect } from 'react';
import { useSupabaseAuth } from './useSupabaseAuth';

export function useSolvedChallenges() {
  const [solvedChallenges, setSolvedChallenges] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const { supabase, user } = useSupabaseAuth();

  useEffect(() => {
    async function fetchSolvedChallenges() {
      if (user) {
        setLoading(true);
        const { data, error } = await supabase
          .from("users_link_challenges")
          .select("challenge_id")
          .eq("user_id", user.id);

        if (data && !error) {
          setSolvedChallenges(new Set(data.map(item => item.challenge_id)));
        }
        setLoading(false);
      } else {
        setSolvedChallenges(new Set());
        setLoading(false);
      }
    }

    fetchSolvedChallenges();
  }, [supabase, user]);

  const addSolvedChallenge = (challengeId: number) => {
    setSolvedChallenges(prev => new Set(prev).add(challengeId));
  };

  return { solvedChallenges, loading, addSolvedChallenge };
}