'use client'

import { Button } from "@/components/ui/button"

type PageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const Page = (props: PageProps) => {
  const { error, reset } = props

  return (
    <div className='space-y-4 px-2 py-8'>
      <h1 className='text-2xl font-bold'>Something went wrong</h1>
      <Button onClick={reset}>Try again</Button>
      <p className='break-words rounded-md bg-zinc-100 p-4 dark:bg-zinc-800'>{error.message}</p>
    </div>
  )
}

export default Page
