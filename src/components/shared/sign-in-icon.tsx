
'use client'

import { User2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const SignInIcon: React.FC = () => {
  return (
    <div>
      <Button asChild variant="outline" size="icon">
        <Link href={'/auth/login'} aria-label="Sign in">
          <User2Icon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Sign in</span>
        </Link>
      </Button>
    </div>
  )
}

export default SignInIcon
