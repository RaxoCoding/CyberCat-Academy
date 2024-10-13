"use client";

import { useState, useEffect } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Database } from "@/types/supabase";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { icons } from "lucide-react";

type Category = Database["public"]["Tables"]["categories"]["Row"];

interface ClientChallengesPageProps {
  initialCategories: Category[];
}

export default function ClientChallengesPage({
  initialCategories,
}: ClientChallengesPageProps) {
  const { supabase } = useSupabaseAuth();
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("name");

        if (error) throw error;
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchCategories();
  }, [supabase]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Challenge Categories</h1>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function CategoryCard({ category }: { category: Category }) {
  const IconComponent = icons[category.icon as keyof typeof icons];

  return (
    <Link href={`/challenges/${category.name_id}`} passHref>
      <Card className="w-full hover:bg-accent transition-colors cursor-pointer">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {IconComponent && <IconComponent className="h-6 w-6" />}
            {category.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{category.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
