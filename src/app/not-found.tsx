'use client'

import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'
import { useRouter } from 'next/navigation'


export const metadata: Metadata = {
  title: '404'
}

const NotFound = () => {
  const router = useRouter()

  return (
    <div className='mb-40 mt-52 flex flex-col items-center justify-center gap-12'>
      <h1 className='text-center text-6xl font-bold'>Not Found</h1>
      <Button onClick={() => router.push('/')}>Go to Homepage</Button>
    </div>
  )
}

export default NotFound
