import type { ReactNode } from "react"
// import { TRPCProvider } from "@/trpc/provider"
import "../styles/globals.css"

export const metadata = {
  title: "Claude Skill Builder",
  description: "Create, manage, and test Claude AI skills",
}

/**
 * Root Layout
 *
 * Wraps the entire application with necessary providers:
 * - TRPCProvider: React Query + tRPC for API calls
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gray-900 text-white antialiased">
        {/* <TRPCProvider> */}
          {children}
        {/* </TRPCProvider> */}
      </body>
    </html>
  )
}
