"use client";

import { useEffect, useState } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useParams } from "next/navigation";
import ChallengeDetails from "@/components/specific/ChallengeDetails";
import { Database } from "@/types/supabase";
import ChallengeLoading from "./loading";

export default function ChallengePage() {
  const { supabase, loading } = useSupabaseAuth();
  const params = useParams();
  const [challenge, setChallenge] = useState<
    Database["public"]["Views"]["public_challenges"]["Row"] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChallenge() {
      if (!loading && params.name_id) {
        const { data, error } = await supabase
          .from("public_challenges")
          .select("*")
          .eq("name_id", decodeURIComponent(params.name_id as string))
          .single();
        if (error) {
          console.error("Error fetching challenge:", error);
          setError("Challenge not found");
        } else {
          setChallenge(data);
        }
      }
    }

    fetchChallenge();
  }, [supabase, loading, params.name_id]);

  if (error) return <div>{error}</div>;
  if (!challenge) return <ChallengeLoading />;

  return (
    <div className="bg-background text-white">
      <ChallengeDetails challenge={challenge} />
    </div>
  );
}
