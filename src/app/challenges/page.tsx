"use client"

import { useEffect, useState } from 'react';
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import CategoryList from '@/components/specific/CategoryList';
import { Database } from '@/types/supabase';
import ChallengesLoading from './loading';

export default function ChallengesPage() {
  const { supabase } = useSupabaseAuth();
  const [categories, setCategories] = useState<Database['public']['Tables']['categories']['Row'][] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (error) throw error;
        setCategories(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error loading challenges. Please try again later.');
      }
    }

    fetchCategories();
  }, [supabase]);

  if (error) return <div>{error}</div>;
  if (!categories) return <ChallengesLoading />;

  return <CategoryList categories={categories} />;
}