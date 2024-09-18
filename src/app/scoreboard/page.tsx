import React from "react";
import { createClient } from "@supabase/supabase-js";
import { Scoreboard } from "@/components/specific/Scoreboard";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ScoreboardData {
  rank: number;
  username: string;
  score: number;
}

async function fetchScoreboardData(): Promise<ScoreboardData[]> {
  const { data, error } = await supabase
    .from("users")
    .select("username, score")
    .order("score", { ascending: false })
    .limit(10);

  if (error) throw error;

  return data.map((user, index) => ({
    rank: index + 1,
    username: user.username,
    score: user.score,
  }));
}

export default async function ScoreboardPage() {
  const scoreboardData = await fetchScoreboardData();

  return <Scoreboard scoreboardData={scoreboardData} />;
}
