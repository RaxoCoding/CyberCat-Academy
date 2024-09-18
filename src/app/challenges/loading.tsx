import { Skeleton } from "@/components/ui/skeleton"

export default function ChallengePageSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-secondary text-secondary-foreground rounded-lg p-6">
                    <Skeleton className="h-8 w-1/4 mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, j) => (
                            <Skeleton key={j} className="h-40 w-full" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}