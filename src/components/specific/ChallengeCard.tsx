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
