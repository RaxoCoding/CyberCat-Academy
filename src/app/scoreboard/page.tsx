"use client"

import { useEffect, useState } from 'react';
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Scoreboard } from "@/components/specific/Scoreboard";
import ScoreboardPageLoading from './loading';

interface ScoreboardData {
  rank: number;
  username: string;
  score: number;
}

export default function ScoreboardPage() {
  const { supabase, loading } = useSupabaseAuth();
  const [scoreboardData, setScoreboardData] = useState<ScoreboardData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function fetchScoreboardData(search: string) {
      if (!loading) {
        const { data, error } = await supabase
          .from("user_scores")
          .select("username, total_score")
          .ilike("username", "%" + search.toLowerCase() + "%")
          .order("total_score", { ascending: false })
          .limit(10);

        if (error) {
          console.error('Error fetching scoreboard:', error);
          setError('Error loading scoreboard. Please try again later.');
        } else {
          const formattedData = data.map((user, index) => ({
            rank: index + 1,
            username: user.username,
            score: user.total_score,
          }));
          setScoreboardData(formattedData);
        }
      }
    }

    fetchScoreboardData(search);
  }, [supabase, loading, search]);

  if (error) return <div>{error}</div>;
  if (!scoreboardData) return <ScoreboardPageLoading />;

  return <Scoreboard scoreboardData={scoreboardData} setSearch={setSearch} />;
}