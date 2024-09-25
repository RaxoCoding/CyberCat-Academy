import { ScrollArea } from "@/components/ui/scroll-area"
import CategoryCard from "./CategoryCard";
import { Database } from "@/types/supabase";

type Category = Database['public']['Tables']['categories']['Row'];

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Challenge Categories</h1>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 gap-6">
          {categories.map((category) => (
            <CategoryCard 
              key={category.id} 
              category={category}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}