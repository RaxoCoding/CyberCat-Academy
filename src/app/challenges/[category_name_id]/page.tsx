import { createServerSupabaseClient } from "@/lib/supabase-server";
import ClientCategoryPage from "./ClientCategoryPage";

export default async function CategoryPage({ params }: { params: { category_name_id: string } }) {
  const supabase = createServerSupabaseClient();

  // Fetch category data
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("name_id", decodeURIComponent(params.category_name_id))
    .single();

  if (categoryError) {
    return <div>Category not found</div>;
  }

  // Fetch challenges for the category
  const { data: challenges, error: challengesError } = await supabase
    .from("public_challenges")
    .select("*")
    .eq("category_id", category.id)
    .order("points", { ascending: true });

  if (challengesError) {
    return <div>Error loading challenges</div>;
  }

  return <ClientCategoryPage category={category} initialChallenges={challenges} />;
}
