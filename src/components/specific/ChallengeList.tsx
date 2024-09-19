import React, { useState } from "react";
import { ChallengeCard } from "./ChallengeCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import type { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";

type Challenge = Database["public"]["Views"]["public_challenges"]["Row"] & {
  created_at?: string;
};

interface ChallengeListProps {
  challenges: Challenge[];
  showSolvedDate?: boolean;
  defaultViewMode?: "card" | "table";
}

export default function ChallengeList({
  challenges,
  showSolvedDate = false,
  defaultViewMode = "card",
}: ChallengeListProps) {
  const [viewMode, setViewMode] = useState<"card" | "table">(defaultViewMode);
  const router = useRouter();

  const toggleViewMode = () => {
    setViewMode(viewMode === "card" ? "table" : "card");
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button
          onClick={toggleViewMode}
          variant="ghost"
          size="sm"
          className="bg-inherit"
        >
          {viewMode === "card" ? (
            <List className="h-4 w-4 mr-2" />
          ) : (
            <LayoutGrid className="h-4 w-4 mr-2" />
          )}
          {viewMode === "card" ? "Table View" : "Card View"}
        </Button>
      </div>

      {viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              solvedDate={showSolvedDate ? challenge.created_at : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Points</TableHead>
                {showSolvedDate && <TableHead>Solved Date</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {challenges.map((challenge) => (
                <TableRow
                  key={challenge.id}
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => router.push(`/challenge/${challenge.name}`)}
                >
                  <TableCell>{challenge.name}</TableCell>
                  <TableCell>{challenge.description}</TableCell>
                  <TableCell>{challenge.points}</TableCell>
                  {showSolvedDate && challenge.created_at && (
                    <TableCell>
                      {new Date(challenge.created_at).toLocaleDateString()}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
