import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { Database } from "@/types/supabase";

interface ChallengeCardProps {
  challenge: Database["public"]["Tables"]["challenges"]["Row"];
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-4 hover:bg-gray-600 transition-colors">
      <h3 className="text-xl font-medium mb-2">{challenge.name}</h3>
      <p className="text-gray-300 mb-2">{challenge.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">
          Points: {challenge.points}
        </span>
        <Button
          asChild
          variant="ghost"
          className="bg-primary text-primary-foreground px-3 py-1 rounded"
        >
          <Link href={"/challenge/" + challenge.name}>
            <Check className="mr-2 h-4 w-4" />
            Solve
          </Link>
        </Button>
      </div>
    </div>
  );
}
