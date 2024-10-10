"use client"

import { useQuery } from "@tanstack/react-query";
import { useSupabaseAuth } from "./useSupabaseAuth";
import { Database } from "@/types/supabase";

type Category = Database["public"]["Tables"]["categories"]["Row"];

export function useCategories() {
  const { supabase, loading: supabaseLoading } = useSupabaseAuth();

  const fetchCategories = async (): Promise<Category[]> => {
    const { data: categoriesData, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

		if (error) throw error;

    return categoriesData;
  };

  const {
    data: categories,
    error,
    isLoading,
  } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    enabled: !!supabaseLoading,
  });

  return {
    categories,
    error,
    isLoading: isLoading,
  };
}
