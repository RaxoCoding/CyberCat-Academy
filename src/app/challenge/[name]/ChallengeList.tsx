'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import Link from 'next/link'

type Challenge = Database['public']['Tables']['challenges']['Row']
type Category = Database['public']['Tables']['categories']['Row']

export default function ChallengeList() {
  const [categories, setCategories] = useState<Category[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name')

        if (categoriesError) throw categoriesError

        const { data: challengesData, error: challengesError } = await supabase
          .from('challenges')
          .select('*')
          .order('points', { ascending: true })

        if (challengesError) throw challengesError

        setCategories(categoriesData)
        setChallenges(challengesData)
      } catch (err) {
        setError('Failed to fetch challenges. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase])

  if (loading) return <div className="text-center">Loading challenges...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>

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
              <div key={challenge.id} className="bg-background text-background-foreground rounded-lg p-4 hover:bg-gray-800 transition-colors">
                <h3 className="text-xl font-medium mb-2">{challenge.name}</h3>
                <p className="text-gray-300 mb-2">{challenge.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Points: {challenge.points}</span>
                  <Link
                    href={`/challenge/${encodeURIComponent(challenge.name)}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Solve
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}