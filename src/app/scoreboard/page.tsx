import { createServerSupabaseClient } from "@/lib/supabase-server";
import ClientScoreboardPage from "./ClientScoreboardPage";

const USERS_PER_PAGE = 100;

export default async function ScoreboardPage() {
  const supabase = createServerSupabaseClient();

  const {
    data: scoreboardData,
    error,
    count,
  } = await supabase
    .from("user_scores")
    .select("username, total_score", { count: "exact" })
    .order("total_score", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Error fetching scoreboard data:", error);
    return <div>Error loading scoreboard. Please try again later.</div>;
  }

  const formattedScoreboardData = scoreboardData.map((user, index) => ({
    rank: index + 1,
    username: user.username,
    score: user.total_score,
  }));

  const totalPages = Math.ceil((count || 0) / USERS_PER_PAGE);

  return (
    <ClientScoreboardPage
      initialScoreboardData={formattedScoreboardData}
      initialTotalPages={totalPages}
    />
  );
}
