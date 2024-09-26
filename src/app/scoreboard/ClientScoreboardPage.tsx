"use client";

import { useState, useEffect } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SearchBar } from "@/components/common/SearchBar";

interface ScoreboardData {
  rank: number;
  username: string;
  score: number;
}

interface ClientScoreboardPageProps {
  initialScoreboardData: ScoreboardData[];
  initialTotalPages: number;
}

const USERS_PER_PAGE = 100;

export default function ClientScoreboardPage({
  initialScoreboardData,
  initialTotalPages,
}: ClientScoreboardPageProps) {
  const [scoreboardData, setScoreboardData] = useState<ScoreboardData[]>(
    initialScoreboardData
  );
  const { supabase, loading } = useSupabaseAuth();
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function fetchScoreboardData(search: string, page: number) {
      const from = (page - 1) * USERS_PER_PAGE;
      const to = from + USERS_PER_PAGE - 1;

      if (!loading) {
        const { data, error, count } = await supabase
          .from("user_scores")
          .select("username, total_score")
          .ilike("username", "%" + search.toLowerCase() + "%")
          .order("total_score", { ascending: false })
          .range(from, to);

        if (error) {
          console.error("Error fetching scoreboard:", error);
        } else {
          const formattedData = data.map((user, index) => ({
            rank: from + index + 1,
            username: user.username,
            score: user.total_score,
          }));
          setScoreboardData(formattedData);
          count && setTotalPages(Math.ceil((count || 0) / USERS_PER_PAGE));
        }
      }
    }

    fetchScoreboardData(search, page);
  }, [supabase, loading, setSearch, setPage, search, page]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          CyberCat Academy Scoreboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SearchBar
          placeholder="Search for a user..."
          setSearch={(value: string) => {
            setPage(1);
            setSearch(value);
          }}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scoreboardData.map((user) => (
              <TableRow key={user.rank}>
                <TableCell className="font-medium">{user.rank}</TableCell>
                <TableCell>
                  <Link
                    href={`/user/${encodeURIComponent(user.username)}`}
                    className="text-primary hover:underline"
                  >
                    {user.username}
                  </Link>
                </TableCell>
                <TableCell className="text-right">{user.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            variant="outline"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
