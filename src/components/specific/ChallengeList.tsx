import { ChallengeCard } from "./ChallengeCard";
import type { Database } from "@/types/supabase";

type Challenge = Database["public"]["Views"]["public_challenges"]["Row"];

interface ChallengeListProps {
  challenges: Challenge[];
}

export default function ChallengeList({ challenges }: ChallengeListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
}
