import { DiscoveryInterface } from "@/components/discovery-interface"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your People
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Discover curated, repeatable communities in Madrid.
              From running crews to book clubs, find your next social circle.
            </p>
            <Link
              href="/hosts"
              className="inline-block text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Host a community? Join us →
            </Link>
          </div>
        </div>
      </div>

      {/* Discovery Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <DiscoveryInterface />
      </div>
    </main>
  )
}
