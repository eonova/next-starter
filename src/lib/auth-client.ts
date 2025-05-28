import { toast } from '@/components/ui/toaster'
import type { auth } from '@/lib/auth'

import { inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

// @see https://github.com/better-auth/better-auth/issues/1391
const authClient: ReturnType<typeof createAuthClient> = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error('Too many requests')
      }
    }
  }
})

export const signIn: typeof authClient.signIn = authClient.signIn
export const signOut: typeof authClient.signOut = authClient.signOut
export const useSession: typeof authClient.useSession = authClient.useSession

// export type Session = typeof authClient.$Infer.Session
export type User = (typeof authClient.$Infer.Session)['user']
