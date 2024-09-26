"use client";

import { useState } from 'react';
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Database } from '@/types/supabase';
import CategoryChallengesLoading from './loading';
import ChallengeList from "@/components/common/ChallengeList";
import { useSolvedChallenges } from '@/hooks/useSolvedChallenges';

type Challenge = Database["public"]["Views"]["public_challenges"]["Row"] & {
  id: string;
};
type Category = Database["public"]["Tables"]["categories"]["Row"];

interface ClientCategoryPageProps {
  category: Category;
  initialChallenges: Challenge[];
}

export default function ClientCategoryPage({ category, initialChallenges }: ClientCategoryPageProps) {
  const { loading } = useSupabaseAuth();
  const [challenges] = useState<Challenge[]>(initialChallenges);
  const { solvedChallenges } = useSolvedChallenges();

  if (loading) return <CategoryChallengesLoading />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{category.name} Challenges</h1>
      <ChallengeList 
        challenges={challenges} 
        solvedChallenges={solvedChallenges}
      />
    </div>
  );
}