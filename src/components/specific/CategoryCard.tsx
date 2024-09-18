import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { icons } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  description: string;
  icon: string;
}

export default function CategoryCard({ name, description, icon }: CategoryCardProps) {
  const IconComponent = icons[icon as keyof typeof icons];

  return (
    <Link href={`/challenges/${encodeURIComponent(name)}`} passHref>
      <Card className="w-full hover:bg-accent transition-colors cursor-pointer">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {IconComponent && <IconComponent className="h-6 w-6" />}
            {name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}