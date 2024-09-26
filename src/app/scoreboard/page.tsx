import { createServerSupabaseClient } from "@/lib/supabase-server";
import ClientScoreboardPage from "./ClientScoreboardPage";

const USERS_PER_PAGE = 100;

<<<<<<< HEAD
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
=======
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
>>>>>>> Fantabc-feature/scoreboard-search-bar
    return <div>Error loading scoreboard. Please try again later.</div>;
  }

  const formattedScoreboardData = scoreboardData.map((user, index) => ({
<<<<<<< HEAD
    rank: from + index + 1,
=======
    rank: index + 1,
>>>>>>> Fantabc-feature/scoreboard-search-bar
    username: user.username,
    score: user.total_score,
  }));

  const totalPages = Math.ceil((count || 0) / USERS_PER_PAGE);

  return (
<<<<<<< HEAD
    <ClientScoreboardPage 
      initialScoreboardData={formattedScoreboardData} 
      currentPage={page}
      totalPages={totalPages}
=======
    <ClientScoreboardPage
      initialScoreboardData={formattedScoreboardData}
      initialTotalPages={totalPages}
>>>>>>> Fantabc-feature/scoreboard-search-bar
    />
  );
}
