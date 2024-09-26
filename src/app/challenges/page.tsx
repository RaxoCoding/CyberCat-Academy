import { createServerSupabaseClient } from "@/lib/supabase-server";
import ClientChallengesPage from "./ClientChallengesPage";

export default async function ChallengesPage() {
  const supabase = createServerSupabaseClient();

  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return <div>Error loading challenges. Please try again later.</div>;
  }

  return <ClientChallengesPage initialCategories={categories} />;
}