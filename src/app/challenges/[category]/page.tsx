import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ChallengeList from "@/components/specific/ChallengeList";
import type { Database } from "@/types/supabase";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  // First, fetch the category
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("name", decodeURIComponent(params.category))
    .single();

  if (categoryError || !category) {
    console.error("Error fetching category:", categoryError);
    notFound();
  }

  // Then, fetch the challenges using the category's id
  const { data: challenges, error: challengesError } = await supabase
    .from("challenges")
    .select("*")
    .eq("category_id", category.id)
    .order("points");

  if (challengesError) {
    console.error("Error fetching challenges:", challengesError);
    return <div>Error loading challenges. Please try again later.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{category.name} Challenges</h1>
      <ChallengeList challenges={challenges || []} />
    </div>
  );
}
