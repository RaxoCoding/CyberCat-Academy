'use client'

import { ChallengeCard } from './ChallengeCard'
import { Skeleton } from '@/components/ui/skeleton'
import type { Database } from '@/types/supabase'

type Category = Database['public']['Tables']['categories']['Row']
type Challenge = Database['public']['Tables']['challenges']['Row']

interface ChallengeListProps {
    categories: Category[]
    challenges: Challenge[]
}

export default function ChallengeList({ categories, challenges }: ChallengeListProps) {
    const challengesByCategory = categories.map(category => ({
        ...category,
        challenges: challenges.filter(challenge => challenge.category_id === category.id)
    }))

    return (
        <div className="space-y-8">
            {challengesByCategory.map(category => (
                <div key={category.id} className="bg-secondary text-secondary-foreground rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.challenges.map(challenge => (
                            <ChallengeCard key={challenge.id} challenge={challenge} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}