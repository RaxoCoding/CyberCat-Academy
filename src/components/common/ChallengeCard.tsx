"use client"

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
import { CircleCheck } from "lucide-react";

interface ChallengeCardProps {
  challenge: Database["public"]["Views"]["public_challenges"]["Row"]
  isSolved: boolean;
}

export function ChallengeCard({ challenge, isSolved }: ChallengeCardProps) {
  return (
    <Link href={`/challenge/${challenge.name_id}`}>
      <Card className="hover:bg-accent transition-colors">
        <CardHeader>
          <CardTitle className="flex">
            {isSolved && (
              <CircleCheck className="mr-2 h-6 w-6 text-green-500" />
            )}
            {challenge.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {challenge.tags && challenge.tags.length > 0 && (
            <div className="flex flex-wrap mb-3 gap-2">
              {challenge.tags.map((tag) => (
                <ChallengeTag key={tag} tag={tag} alwaysPrimary />
              ))}
            </div>
          )}
          <p className="text-muted-foreground truncate">
            {challenge.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Points: {challenge.points}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
