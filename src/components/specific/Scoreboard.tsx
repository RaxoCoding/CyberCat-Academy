import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SearchBar } from '../common/SearchBar';

interface ScoreboardProps {
  scoreboardData: Array<{
    rank: number;
    username: string;
    score: number;
  }>,
  setSearch: (value: string) => void;
}

export function Scoreboard({ scoreboardData, setSearch }: ScoreboardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">CyberCat Academy Scoreboard</CardTitle>
      </CardHeader>
      <CardContent>
        <SearchBar placeholder="Rechercher un utilisateur..." setSearch={setSearch} />
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
                  <Link href={`/user/${encodeURIComponent(user.username)}`} className="text-primary hover:underline">
                    {user.username}
                  </Link>
                </TableCell>
                <TableCell className="text-right">{user.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}