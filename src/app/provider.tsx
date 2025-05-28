'use client'

import { Toaster } from '@/components/ui/toaster';
import { TRPCReactProvider } from '@/server/client';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from 'next-themes';
interface ProviderProps {
  children: React.ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
  return (
    <TRPCReactProvider>
      <JotaiProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          enableColorScheme
          disableTransitionOnChange
        >
          {children}
          <Toaster
            toastOptions={{
              duration: 2500,
            }}
            visibleToasts={5}
            expand
          />
        </ThemeProvider>
      </JotaiProvider>
    </TRPCReactProvider>
  );
};
