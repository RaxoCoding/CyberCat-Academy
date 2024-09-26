import { createServerSupabaseClient } from "@/lib/supabase-server";
import ClientChallengePage from "./ClientChallengePage";
import { Database } from "@/types/supabase";

type ChallengeWithAuthor = Database["public"]["Views"]["public_challenges"]["Row"] & {
  author: { username: string } | null;
};

export default async function ChallengePage({ params }: { params: { name_id: string } }) {
  const supabase = createServerSupabaseClient();

  // Fetch challenge data
  const { data: challengeData, error: challengeError } = await supabase
    .from("public_challenges")
    .select("*, author:users!author_id(username)")
    .eq("name_id", decodeURIComponent(params.name_id))
    .single();

  if (challengeError) {
    return <div>Challenge not found</div>;
  }

  const challenge: ChallengeWithAuthor = {
    ...challengeData,
    author: challengeData.author as unknown as { username: string } | null
  }

  // Fetch solve count and history
  const { count } = await supabase
    .from("users_link_challenges")
    .select("*", { count: "exact" })
    .eq("challenge_id", challenge.id);

  const { data: solveHistory } = await supabase
    .from("users_link_challenges")
    .select("users(username), created_at")
    .eq("challenge_id", challenge.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const initialSolveHistory = solveHistory?.map((item) => ({
    username: (item.users as unknown as { username: string }).username,
    solved_at: new Date(item.created_at).toLocaleString(),
  })) || [];

  return (
    <ClientChallengePage
      challenge={challenge}
      initialSolves={count || 0}
      initialSolveHistory={initialSolveHistory}
    />
  );
}
