'use client'

import { GithubIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'

interface GithubLinksProps {
  repoUrl?: string
}

const GithubLinks: React.FC<GithubLinksProps> = ({ repoUrl = 'https://github.com/eonova/next-starter' }) => {
  return (
    <div>
      <Button asChild variant="outline" size="icon">
        <a href={repoUrl} target="_blank" rel="noopener noreferrer" aria-label="View source code on GitHub">
          <GithubIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">GitHub Repository</span>
        </a>
      </Button>
    </div>
  )
}

export default GithubLinks
