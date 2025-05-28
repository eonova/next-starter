'use client';

import { useAtom } from 'jotai';
import { countAtom } from '@/stores/atoms';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: {
    name: string
  }
}

const Page: React.FC<PageProps> = ({
  params
}) => {
  const [count, setCount] = useAtom(countAtom);
  return (
    <div>
      <h1>Hi {params.name}</h1>
      <div className="space-y-6 rounded-lg bg-card/70 p-6 shadow-lg backdrop-blur-sm dark:bg-card/60 md:p-8">
        <h2 className="text-2xl font-semibold text-card-foreground">
          Jotai Counter Example
        </h2>
        <p className="text-5xl font-bold text-primary">{count}</p>
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setCount((c) => c - 1)}
          >
            Decrement
          </Button>
          <Button size="lg" onClick={() => setCount((c) => c + 1)}>
            Increment
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
