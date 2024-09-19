'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useSupabaseAuth } from "@/hooks/useSupbaseAuth";
import type { Database } from '@/types/supabase'
import { Button } from '@/components/ui/button';
import { Swords, Goal } from 'lucide-react';

type Challenge = Database['public']['Views']['public_challenges']['Row']

export default function ChallengeDetails({ challenge }: { challenge: Challenge }) {
  const [flag, setFlag] = useState('')
  const [message, setMessage] = useState('')
  const supabase = createClientComponentClient<Database>()
  const { user: userAuth } = useSupabaseAuth();

  if (!userAuth) {
    return <div>For authenticated user only...</div>
  }

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
    const a = document.createElement('a')
    a.href = challenge.url
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
      <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg">
      <p className="text-lg mb-4">{challenge.description}</p>
      <p className="mb-4">Points: {challenge.points}</p>
      <div className="flex flex-wrap mb-3">
        {challenge.tags.map((tag) => (
          <span key={tag} className="text-muted-foreground text-xs bg-primary text-primary-foreground px-2 py-1 rounded-md m-1">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap mb-3">
        <ul className="space-y-2">
          {challenge.ressources.map((ressource) => (
            <li key={ressource} className="flex items-center space-x-2">
              <span key={ressource} className="w-2 h-2 bg-primary rounded-full"></span>
              <a href={ressource} className="text-muted-foreground hover:text-green-400 transition-colors duration-200">
                {ressource}
              </a>
            </li>
          ))}
        </ul>
      </div>
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

      <div className="flex flex-wrap mt-3">
        <ul className="space-y-2">
          {challenge.writeups.map((writeup) => (
            <li key={writeup} className="flex items-center space-x-2">
              <span key={writeup} className="w-2 h-2 bg-primary rounded-full"></span>
              <a href={writeup} className="text-muted-foreground hover:text-green-400 transition-colors duration-200">
                {writeup}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  )
}