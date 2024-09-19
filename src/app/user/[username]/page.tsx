"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSupabaseAuth } from "@/hooks/useSupbaseAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChallengeList from "@/components/specific/ChallengeList";
import { Database } from "@/types/supabase";
import UserProfileLoading from "./loading";

type UserProfile = Database["public"]["Views"]["user_scores"]["Row"];

type SolvedChallenge = Database["public"]["Views"]["public_challenges"]["Row"];

export default function UserProfilePage() {
  const { supabase } = useSupabaseAuth();
  const params = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [solvedChallenges, setSolvedChallenges] = useState<
    SolvedChallenge[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      if (params.username) {
        const { data: profileData, error: profileError } = await supabase
          .from("user_scores")
          .select("*")
          .eq("username", params.username)
          .single();

        if (profileError) {
          console.error("Error fetching user profile:", profileError);
          setError("User not found");
          return;
        }

        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("created_at")
          .eq("id", profileData.user_id)
          .single();

        if (userError) {
          console.error("Error fetching user data:", userError);
          setError("Error loading user data");
          return;
        }

        setProfile({ ...profileData, created_at: userData.created_at });

        const { data: challengesData, error: challengesError } = await supabase
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
          .eq("user_id", profileData.user_id)
          .order("created_at", { ascending: false });

        if (challengesError) {
          console.error("Error fetching solved challenges:", challengesError);
          setError("Error loading solved challenges");
          return;
        }

				const solvedChallenges = challengesData.map((item) => ({
					...(item.public_challenges as unknown as SolvedChallenge),
					created_at: item.created_at,
				}));

        setSolvedChallenges(solvedChallenges);
      }
    }

    fetchUserProfile();
  }, [supabase, params.username]);

  if (error) return <div>{error}</div>;
  if (!profile || !solvedChallenges) return <UserProfileLoading />;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{profile.username}&apos;s Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Account created: {new Date(profile.created_at).toLocaleDateString()}
          </p>
          <p>Total points: {profile.total_score}</p>
          <p>Challenges solved: {profile.challenges_solved}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Solved Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          <ChallengeList defaultViewMode="table" challenges={solvedChallenges} showSolvedDate />
        </CardContent>
      </Card>
    </div>
  );
}
