"use client";

import { useEffect, useState } from "react";
import { useSupabaseAuth } from "@/hooks/useSupbaseAuth";
import { useParams } from "next/navigation";
import ChallengeList from "@/components/specific/ChallengeList";
import { Database } from "@/types/supabase";
import CategoryChallengesLoading from "./loading";

export default function CategoryPage() {
  const { supabase, loading } = useSupabaseAuth();
  const params = useParams();
  const [category, setCategory] = useState<
    Database["public"]["Tables"]["categories"]["Row"] | null
  >(null);
  const [challenges, setChallenges] = useState<
    Database["public"]["Views"]["public_challenges"]["Row"][] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategoryAndChallenges() {
      if (!loading && params.category) {
        const { data: categoryData, error: categoryError } = await supabase
          .from("categories")
          .select("*")
          .eq("name", decodeURIComponent(params.category as string))
          .single();

        if (categoryError) {
          console.error("Error fetching category:", categoryError);
          setError("Category not found");
          return;
        }

        setCategory(categoryData);

        const { data: challengesData, error: challengesError } = await supabase
          .from("public_challenges")
          .select("*")
          .eq("category_id", categoryData.id)
          .order("points");

        if (challengesError) {
          console.error("Error fetching challenges:", challengesError);
          setError("Error loading challenges. Please try again later.");
        } else {
          setChallenges(challengesData);
        }
      }
    }

    fetchCategoryAndChallenges();
  }, [supabase, loading, params.category]);

  if (error) return <div>{error}</div>;
  if (!category || !challenges) return <CategoryChallengesLoading />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{category.name} Challenges</h1>
      <ChallengeList challenges={challenges} />
    </div>
  );
}
