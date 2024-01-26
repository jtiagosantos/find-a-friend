'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { queryClient } from '@/infra/libs/react-query';
import { Toaster } from '@/shared/components/ui/toaster';

export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {children}
        <Toaster />
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
};
