'use client'

import { createClient } from "@supabase/supabase-js"
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Auth() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#404040',
                    brandAccent: '#52525b',
                  },
                },
              },
              style: {
                button: {
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '500',
                  padding: '10px 15px',
                },
                input: {
                  borderRadius: '6px',
                  fontSize: '16px',
                  padding: '10px 15px',
                },
                anchor: {
                  color: '#52525b',
                  fontWeight: '500',
                },
              },
            }}
            theme="dark"
            providers={["google", "github", "discord"]}
            socialLayout="horizontal"
          />
        </CardContent>
      </Card>
    </div>
  )
}