'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState, type ReactNode } from 'react'
import { trpc } from './client'

/**
 * tRPC Provider Component
 *
 * Wraps the application with:
 * - tRPC client for API calls
 * - React Query client for caching and state management
 *
 * The httpBatchLink batches multiple requests into single HTTP calls
 * for improved performance.
 */

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Browser: use relative URL or configured API URL
    return process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'
  }
  // SSR: use localhost
  return 'http://localhost:3001'
}

interface TRPCProviderProps {
  children: ReactNode
}

export function TRPCProvider({ children }: TRPCProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Stale time of 5 seconds - prevents refetching on every mount
            staleTime: 5 * 1000,
            // Retry failed queries once
            retry: 1,
            // Don't refetch on window focus for desktop app
            refetchOnWindowFocus: false,
          },
          mutations: {
            // Retry mutations once on failure
            retry: 1,
          },
        },
      })
  )

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/trpc`,
          // Include credentials for cross-origin requests
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            })
          },
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
