'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useSupabaseAuth } from "@/hooks/useSupbaseAuth";
import type { Database } from '@/types/supabase'
import { Button } from '@/components/ui/button';
import { Swords, Goal } from 'lucide-react';

type Challenge = Database['public']['Tables']['challenges']['Row']

export default function ChallengeDetails({ challenge }: { challenge: Challenge }) {
  const [flag, setFlag] = useState('')
  const [message, setMessage] = useState('')
  const supabase = createClientComponentClient<Database>()
  const { user: userAuth, supabase2, loading } = useSupabaseAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    const { data, error } = await supabase
      .rpc('add_solved_challenge', {
        p_user_id: userAuth.id,
        p_challenge_id: challenge.id,
        p_submitted_flag: flag
      })

    if (error) {
      setMessage('An error occurred. Please try again.')
    } else if (data) {
      setMessage('Congratulations! You solved the challenge!')
    } else {
      setMessage('Incorrect flag. Try again!')
    }
  }

  const handleDownload = () => {
    const dummyData = 'Challenge file contents'
    const blob = new Blob([dummyData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = challenge.url
    a.download = `${challenge.name}_file.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
      <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg">
      <p className="text-lg mb-4">{challenge.description}</p>
      <p className="mb-4">Points: {challenge.points}</p>
      <Button className="bg-primary text-primary-foreground px-3 py-1 rounded" variant="destructive" onClick={handleDownload}>
        <Swords className="mr-2 h-4 w-4" />
        Start challenge
      </Button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mt-10">
          <label htmlFor="flag" className="block text-sm font-medium mb-1">
            Enter Flag:
          </label>
          <input
            type="text"
            id="flag"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            className="mr-20 w-9/12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-secondary text-secondary-foreground"
            required
          />

          <Button className="bg-primary text-primary-foreground px-3 py-1 rounded" type="submit" variant="destructive" onClick={handleDownload}>
            <Goal className="mr-2 h-4 w-4" />
            Submit Flag
          </Button>
        </div>
      </form>
      {message && (
        <p className={`mt-4 text-center ${message.includes('Congratulations') ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  )
}