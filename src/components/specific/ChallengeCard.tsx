import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Database } from "@/types/supabase";

interface ChallengeCardProps {
  challenge: Database["public"]["Views"]["public_challenges"]["Row"];
  solvedDate?: string;
}

export function ChallengeCard({ challenge, solvedDate }: ChallengeCardProps) {
  return (
    <Link href={`/challenge/${challenge.name}`}>
      <Card className="hover:bg-accent transition-colors">
        <CardHeader>
          <CardTitle>{challenge.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap mb-3">
          {challenge.tags.map((tag) => (
            <span key={tag} className="text-muted-foreground text-xs bg-primary text-primary-foreground px-2 py-1 rounded-md m-1">
              {tag}
            </span>
          ))}
          </div>
          <p className="text-muted-foreground">{challenge.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Points: {challenge.points}
          </span>
          {solvedDate && (
            <span className="text-sm text-muted-foreground">
              Solved: {new Date(solvedDate).toLocaleDateString()}
            </span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
