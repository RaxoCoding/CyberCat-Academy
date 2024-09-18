import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ChallengeDetails from "@/components/specific/ChallengeDetails";
import type { Database } from "@/types/supabase";

export default async function ChallengePage({
  params,
}: {
  params: { name: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: challenge, error } = await supabase
    .from("public_challenges")
    .select("*")
    .eq("name", decodeURIComponent(params.name))
    .single();

  if (error || !challenge) {
    notFound();
  }

  return (
    <div className="bg-background text-white">
      <h1 className="text-4xl font-bold mb-8">{challenge.name}</h1>
      <ChallengeDetails challenge={challenge} />
    </div>
  );
}
