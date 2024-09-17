import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import RootLayout from '@/components/layout/RootLayout'
import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </SessionContextProvider>
  )
}