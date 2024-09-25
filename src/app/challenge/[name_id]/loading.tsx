import { Skeleton } from "@/components/ui/skeleton";

export default function ChallengeLoading() {
  return (
    <div className="bg-background text-white">
      <Skeleton className="h-12 w-3/4 mb-8" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}