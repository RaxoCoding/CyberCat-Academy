import { useQuery } from "@tanstack/react-query";
import { useSupabaseAuth } from "./useSupabaseAuth";
import { Database } from "@/types/supabase";

type Challenge = Database["public"]["Views"]["public_challenges"]["Row"];

type UserProfile = Database["public"]["Views"]["user_scores"]["Row"] & {
  created_at: string;
  challenges_solved_list: Challenge[];
};

type OptionalUser =
  | { id: string; username?: string }
  | {id?: string; username: string };

export function useSpecificUser(targetUser: OptionalUser) {
  const { supabase, loading: supabaseLoading } = useSupabaseAuth();

  if(!targetUser.id && !targetUser.username) {
    throw new Error("Code logic error. Report to support. #useSpecificUser");
  }

  const targetField = {
    key: targetUser.id ? "id" : "username",
    value: (targetUser.id ?? targetUser.username) as string,
  };

  const fetchUserProfile = async (): Promise<UserProfile | null> => {
    const { data: userData, error: userDataError } = await supabase
      .from("users")
      .select("id, created_at")
      .eq(targetField.key, targetField.value)
      .single();

    if (userDataError) throw userDataError;

    const user_id = userData.id;

    const { data: userScore, error: userScoreError } = await supabase
      .from("user_scores")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (userScoreError) throw userScoreError;

    const { data: userSolvesData, error: userSolvesError } = await supabase
      .from("users_link_challenges")
      .select(
        `
      challenge_id,
      created_at,
      public_challenges (
        id,
        name,
        description,
        points,
        category_id,
        tags
      )
    `
      )
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (userSolvesError) throw userSolvesError;

    const solvedChallenges = userSolvesData!.map((item) => ({
      ...(item.public_challenges as unknown as Challenge),
    }));

    const userProfile: UserProfile = {
      ...userData,
      ...userScore,
      challenges_solved_list: solvedChallenges,
    };

    return userProfile;
  };

  const {
    data: userProfile,
    error,
    isLoading,
  } = useQuery<UserProfile | null, Error>({
    queryKey: ["user_profile", targetField.key, targetField.value],
    queryFn: fetchUserProfile,
    enabled: !!supabaseLoading,
  });

  return {
    userProfile,
    error,
    isLoading: isLoading,
  };
}
