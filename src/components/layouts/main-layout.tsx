import GithubLinks from '../shared/github-links';
import ThemeSwitcher from '../shared/theme-switcher';
import SignInIcon from '../shared/sign-in-icon';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative w-full mx-auto flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 text-center font-mono">
      {/* Blurred gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-tr from-purple-600 via-pink-500 to-blue-500 opacity-30 blur-3xl"
      />

      <div className="absolute flex gap-2 right-4 top-4 z-10">
        <ThemeSwitcher />
        <GithubLinks />
        <SignInIcon />
      </div>

      <main className="flex flex-1 flex-col items-center justify-center space-y-6">
        {children}
      </main>

      <footer className="py-6 text-sm text-muted-foreground md:py-8">
        <p>&copy; {new Date().getFullYear()} Eonova. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MainLayout;
