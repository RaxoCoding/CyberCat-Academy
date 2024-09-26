import React, { useState, useEffect } from "react";
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
import { LayoutGrid, List, Minus, Plus } from "lucide-react";
import type { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { ChallengeTag } from "@/components/common/ChallengeTag";

type Challenge = Database["public"]["Views"]["public_challenges"]["Row"] & {
  id: string;
};

interface ChallengeListProps {
  challenges: Challenge[];
  solvedChallenges?: Set<number>;
  defaultViewMode?: "card" | "table";
}

export default function ChallengeList({
  challenges,
  defaultViewMode = "card",
  solvedChallenges = new Set(),
}: ChallengeListProps) {
  const [viewMode, setViewMode] = useState<"card" | "table">(defaultViewMode);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);
  const [filteredChallenges, setFilteredChallenges] = useState(challenges);
  const router = useRouter();

  const allTags = Array.from(
    new Set(challenges.flatMap((challenge) => challenge.tags || []))
  );
  const visibleTags = showAllTags ? allTags : allTags.slice(0, 5);

  useEffect(() => {
    setFilteredChallenges(
      challenges.filter(
        (challenge) =>
          selectedTags.length === 0 ||
          (challenge.tags &&
            selectedTags.every((tag) => challenge.tags!.includes(tag)))
      )
    );
  }, [challenges, selectedTags]);

  const toggleViewMode = () => {
    setViewMode(viewMode === "card" ? "table" : "card");
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div>
      <div className="mb-4 grid grid-cols-[1fr_auto] gap-4 items-start">
        <div className="flex flex-wrap items-center gap-2">
          {visibleTags.map((tag) => (
            <ChallengeTag
              key={tag}
              tag={tag}
              isSelected={selectedTags.includes(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
          {allTags.length > 5 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllTags(!showAllTags)}
            >
              {showAllTags ? (
                <Minus className="h-4 w-4 mr-2" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              {showAllTags ? "Show Less" : "Show More"}
            </Button>
          )}
        </div>
        <Button
          onClick={toggleViewMode}
          variant="ghost"
          size="sm"
          className="bg-inherit justify-self-end"
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
          {filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              isSolved={solvedChallenges.has(challenge.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-card text-card-foreground rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChallenges.map((challenge) => (
                <TableRow
                  key={challenge.id}
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => router.push(`/challenge/${challenge.name_id}`)}
                >
                  <TableCell>{challenge.name}</TableCell>
                  <TableCell>{challenge.description}</TableCell>
                  <TableCell>{challenge.points}</TableCell>
                  <TableCell>
                    {challenge.tags ? challenge.tags.join(", ") : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
