'use client';

import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import MainLayout from '@/components/layouts/main-layout';

const MainPage = () => {
  const router = useRouter();
  const goto = (name: string) => {
    router.push(`/hi/${encodeURIComponent(name)}`);
  };
  const [name, setName] = useState('');
  return (
    <MainLayout>
      <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
        Next Starter
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
        一个现代化的全栈 Next.js 启动模板
      </p>
      <div className="flex w-60 items-center space-x-4">
        <Input
          id="input"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              goto((e.target as HTMLInputElement).value);
            }
          }}
          placeholder="输入你的名字"
        />
        <Button onClick={() => goto(name)}>
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <p className="max-w-xl text-sm text-muted-foreground">
        （技术栈见左侧 Dock 栏）
      </p>
    </MainLayout>
  );
};

export default MainPage;
