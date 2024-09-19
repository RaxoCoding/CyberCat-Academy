import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Database } from "@/types/supabase";
import { ChallengeTag } from "@/components/common/ChallengeTag";

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
              <ChallengeTag key={tag} tag={tag} alwaysPrimary />
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
