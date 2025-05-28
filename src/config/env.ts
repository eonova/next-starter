import { createEnv } from '@t3-oss/env-nextjs'
import { vercel } from '@t3-oss/env-nextjs/presets-zod'
import { z } from 'zod'

export const flags = {
  auth: process.env.NEXT_PUBLIC_FLAG_AUTH === 'true',
  analytics: process.env.NEXT_PUBLIC_FLAG_ANALYTICS === 'true',
}

export const env = createEnv({
  skipValidation: !!process.env.CI,
  extends: [vercel()],

  shared: {
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
  },

  server: {
    ...(flags.auth
      ? {
        BETTER_AUTH_SECRET: z.string().min(1),
        BETTER_AUTH_URL: z.string().url(),
        GOOGLE_CLIENT_ID: z.string().min(1),
        GOOGLE_CLIENT_SECRET: z.string().min(1),
        GITHUB_CLIENT_ID: z.string().min(1),
        GITHUB_CLIENT_SECRET: z.string().min(1)
      }
      : {}),


    DATABASE_URL: z.string().url(),
    REACT_SCAN_MONITOR_API_KEY: z.string().optional()
  },
  client: {
    ...(flags.analytics
      ? {
        NEXT_PUBLIC_UMAMI_URL: z.string().url(),
        NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().uuid()
      }
      : {}),

    NEXT_PUBLIC_FLAG_AUTH: z.string().min(1).optional(),
    NEXT_PUBLIC_FLAG_ANALYTICS: z.string().min(1).optional(),

    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: z.string().min(1).optional(),
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: z.string().min(1).optional()
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    NEXT_PUBLIC_UMAMI_URL: process.env.NEXT_PUBLIC_UMAMI_URL,
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,

    NEXT_PUBLIC_FLAG_AUTH: process.env.NEXT_PUBLIC_FLAG_AUTH,
    NEXT_PUBLIC_FLAG_ANALYTICS: process.env.NEXT_PUBLIC_FLAG_ANALYTICS,

    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF
  },

  emptyStringAsUndefined: true
})
