import { createServerSupabaseClient } from "@/lib/supabase-server";
import ClientScoreboardPage from "./ClientScoreboardPage";
import { Database } from "@/types/supabase";

const USERS_PER_PAGE = 100;

type UserScore = Database["public"]["Views"]["user_scores"]["Row"] & {
  username: string,
  total_score: number;
}

export default async function ScoreboardPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const supabase = createServerSupabaseClient();
  const page = parseInt(searchParams.page || '1', 10);
  const from = (page - 1) * USERS_PER_PAGE;
  const to = from + USERS_PER_PAGE - 1;

  const { data: scoreboardData, error, count } = await supabase
    .from("user_scores")
    .select("username, total_score", { count: 'exact' })
    .order("total_score", { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching scoreboard data:', error);
    return <div>Error loading scoreboard. Please try again later.</div>;
  }

  const formattedScoreboardData = (scoreboardData as UserScore[]).map((user, index) => ({
    rank: from + index + 1,
    username: user.username,
    score: user.total_score,
  }));

  const totalPages = Math.ceil((count || 0) / USERS_PER_PAGE);

  return (
    <ClientScoreboardPage 
      initialScoreboardData={formattedScoreboardData} 
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
