'use client';

import { useParams, useRouter } from 'next/navigation';
import MainLayout from '@/components/layouts/main-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { useAtom } from 'jotai';
import { countAtom } from '@/stores/atoms';

function Page() {
  const params = useParams();
  const router = useRouter();

  const [count, setCount] = useAtom(countAtom);

  const goBack = () => {
    router.back();
  };

  return (
    <MainLayout>
      <div>Hi, {params.name}</div>
      <div className="flex flex-col gap-2">
        {/* Jotai Counter Card */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-lg p-6 w-full max-w-xs">
          <div className="flex flex-col space-y-4 items-center">
            <h3 className="text-xl font-semibold text-primary">Jotai Counter</h3>
            <div className="text-5xl font-bold text-foreground">{count}</div>
            <div className="flex space-x-3 pt-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCount(count - 1)}
              >
                -1
              </Button>
              <Button
                size="lg"
                onClick={() => setCount(count + 1)}
              >
                +1
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={goBack}>
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </Button>
      </div>
    </MainLayout>
  );
}

export default Page;
