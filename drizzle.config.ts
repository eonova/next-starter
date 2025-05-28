import type { Config } from 'drizzle-kit'

import { env } from './src/config/env'

export default {
  dialect: 'postgresql',
  schema: './src/db/schema/index.ts',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  out: './src/db/migrations',
  strict: true,
  verbose: true,
} satisfies Config
