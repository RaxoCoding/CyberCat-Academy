import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ScoreboardProps {
  scoreboardData: Array<{
    rank: number;
    username: string;
    score: number;
  }>;
}

export function Scoreboard({ scoreboardData }: ScoreboardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">CyberCat Academy Scoreboard</CardTitle>
      </CardHeader>
      <CardContent>
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
                <TableCell>{user.username}</TableCell>
                <TableCell className="text-right">{user.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}