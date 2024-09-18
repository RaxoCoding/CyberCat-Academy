'use client';

import { useEffect, useState } from 'react';
import { useSupabaseAuth } from '@/hooks/useSupbaseAuth';
import type { Database } from '@/types/supabase';
import CategoryList from '@/components/specific/CategoryList';

type Category = Database['public']['Tables']['categories']['Row'];

export default function ChallengesPage() {
  const { supabase } = useSupabaseAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching data:', error);
        setError('Error loading challenges. Please try again later.');
      } else {
        setCategories(data);
      }
    }

    fetchCategories();
  }, [supabase]);

  if (error) {
    return <div>{error}</div>;
  }

  return <CategoryList categories={categories} />;
}