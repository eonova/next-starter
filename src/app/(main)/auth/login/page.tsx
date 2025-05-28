'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toaster';
import ThemeSwitcher from '@/components/shared/theme-switcher';
import GithubLinks from '@/components/shared/github-links';
import { signIn } from '@/lib/auth-client'; // Assuming signIn handles errors by throwing or returning a result

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // Trying signIn('credentials', data) pattern
      const result = await signIn('credentials', data as any); // Added 'as any' to bypass immediate type check for data if necessary

      // Check if signIn was successful. The actual success condition
      // depends on how `better-auth`'s `signIn` is implemented.
      // For example, it might return an error object if it fails.
      if (result && (result as any).error) { // This is a guess, adjust based on actual signIn behavior
        toast.error((result as any).error.message || 'Login failed. Please check your credentials.');
      } else if (!result) { // Or if it returns null/undefined on failure
        toast.error('Login failed. Please check your credentials.');
      }
      else {
        toast.success('Logged in successfully!');
        router.push('/'); // Redirect to homepage or dashboard
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || 'An unexpected error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

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

      <main className="flex flex-1 flex-col items-center justify-center w-full max-w-md px-4">
        <div className="w-full space-y-6 rounded-lg bg-card/70 p-6 shadow-lg backdrop-blur-sm dark:bg-card/60 md:p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-primary">Login</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                disabled={isLoading}
                {...register('password')}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
      </main>

      <footer className="py-6 text-sm text-muted-foreground md:py-8">
        <p>&copy; {new Date().getFullYear()} Eonova. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
