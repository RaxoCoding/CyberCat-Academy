"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseAuth } from "@/hooks/useSupbaseAuth";
import type { Database } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Swords,
  Goal,
  Link,
  FileText,
  Trophy,
  Clock,
  Users,
} from "lucide-react";
import { ChallengeTag } from "@/components/common/ChallengeTag";

type Challenge = Database["public"]["Views"]["public_challenges"]["Row"];

export default function ChallengeDetails({
  challenge,
}: {
  challenge: Challenge;
}) {
  const [flag, setFlag] = useState("");
  const [message, setMessage] = useState("");
  const [solves, setSolves] = useState(0);
  const [solveHistory, setSolveHistory] = useState<
    { username: string; solved_at: string }[]
  >([]);
  const supabase = createClientComponentClient<Database>();
  const { user: userAuth } = useSupabaseAuth();

  useEffect(() => {
    async function fetchSolveData() {
      const { count } = await supabase
        .from("users_link_challenges")
        .select("*", { count: "exact" })
        .eq("challenge_id", challenge.id);

      setSolves(count || 0);

      const { data: history } = await supabase
        .from("users_link_challenges")
        .select("users(username), created_at")
        .eq("challenge_id", challenge.id)
        .order("created_at", { ascending: false })
        .limit(5);

      setSolveHistory(
        history?.map((item) => ({
          username:
            (item.users as unknown as { username: string })?.username ||
            "Unknown",
          solved_at: new Date(item.created_at).toLocaleString(),
        })) || []
      );
    }

    fetchSolveData();
  }, [supabase, challenge.id]);

  if (!userAuth) {
    return <div>For authenticated users only...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const { data, error } = await supabase.rpc("add_solved_challenge", {
      p_user_id: userAuth.id,
      p_challenge_id: challenge.id,
      p_submitted_flag: flag,
    });

    if (error) {
      setMessage("An error occurred. Please try again.");
    } else if (data) {
      setMessage("Congratulations! You solved the challenge!");
      setSolves(solves + 1);
      setSolveHistory([
        {
          username: userAuth.user_metadata.username || "You",
          solved_at: new Date().toLocaleString(),
        },
        ...solveHistory,
      ]);
    } else {
      setMessage("Incorrect flag. Try again!");
    }
  };

  const handleDownload = () => {
    window.open(challenge.url, "_blank");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{challenge.name}</span>
            <span className="text-xl font-normal">{challenge.points} pts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">{challenge.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {challenge.tags.map((tag) => (
              <ChallengeTag key={tag} tag={tag} alwaysPrimary />
            ))}
          </div>
          <div className="space-y-2 mb-4">
            {challenge.ressources.map((resource) => (
              <a
                key={resource}
                href={resource}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:underline"
              >
                <Link className="w-4 h-4 mr-2" />
                {resource}
              </a>
            ))}
          </div>
          <Button
            className="w-full mb-4"
            variant="default"
            onClick={handleDownload}
          >
            <Swords className="mr-2 h-4 w-4" />
            Start Challenge
          </Button>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="flag" className="block text-sm font-medium mb-1">
                Enter Flag:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="flag"
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                  className="flex-grow px-3 py-2 border rounded-md bg-secondary text-secondary-foreground"
                  required
                />
                <Button type="submit" variant="default">
                  <Goal className="mr-2 h-4 w-4" />
                  Submit
                </Button>
              </div>
            </div>
          </form>
          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes("Congratulations")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="w-5 h-5 mr-2" />
            Challenge Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Total Solves:
            </span>
            <span className="font-bold">{solves}</span>
          </div>
          <h4 className="font-semibold mb-2">Recent Solves:</h4>
          <ul className="space-y-2">
            {solveHistory.map((solve, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <span>{solve.username}</span>
                <span className="text-muted-foreground flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {solve.solved_at}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {challenge.writeups.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Writeups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {challenge.writeups.map((writeup) => (
                <li key={writeup}>
                  <a
                    href={writeup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:underline"
                  >
                    <Link className="w-4 h-4 mr-2" />
                    {writeup}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
