import ThemeSwitcher from '@/components/shared/theme-switcher';
import GithubLinks from '@/components/shared/github-links';

const MainPage = () => {

  return (
    <div className="relative w-full mx-auto flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 text-center font-mono">
      {/* Blurred gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-tr from-purple-600 via-pink-500 to-blue-500 opacity-30 blur-3xl"
      />

      <div className="absolute flex gap-2 right-4 top-4">
        <ThemeSwitcher />
        <GithubLinks />
      </div>

      <main className="flex flex-1 flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
          Next Starter
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
          一个现代化、功能齐全的 Next.js 项目模板。
        </p>
        <p className="max-w-xl text-sm text-muted-foreground">
          （技术栈见左侧 Dock 栏）
        </p>
      </main>

      <footer className="py-6 text-sm text-muted-foreground md:py-8">
        <p>&copy; {new Date().getFullYear()} Eonova. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainPage;
