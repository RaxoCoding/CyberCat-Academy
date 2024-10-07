"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChallengeList from "@/components/common/ChallengeList";
import UserProfileLoading from "./loading";
import { useSpecificUser } from "@/hooks/useUserProfile";

export default function UserProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { userProfile, isLoading } = useSpecificUser({ username });

  if (!userProfile || isLoading) return <UserProfileLoading />;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{userProfile!.username}&apos;s Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Account created: {new Date(userProfile!.created_at).toLocaleDateString()}
          </p>
          <p>Total points: {userProfile.total_score}</p>
          <p>Challenges solved: {userProfile.challenges_solved}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Solved Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          <ChallengeList
            defaultViewMode="table"
            challenges={userProfile.challenges_solved_list}
          />
        </CardContent>
      </Card>
    </div>
  );
}
