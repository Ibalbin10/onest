import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TanStackQueryProvider } from "@/lib/providers/tanstack-query-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Onest - Find Your People",
  description: "A curated discovery layer for high-quality IRL communities",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanStackQueryProvider>{children}</TanStackQueryProvider>
      </body>
    </html>
  )
}
