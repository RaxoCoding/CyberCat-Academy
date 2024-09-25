import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { icons } from 'lucide-react';
import { Database } from '@/types/supabase';

interface CategoryCardProps {
  category: Database["public"]["Tables"]["categories"]["Row"]
}

export default function CategoryCard({ category }: CategoryCardProps) {
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