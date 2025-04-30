import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Music } from "lucide-react"
import { searchSongs } from "@/lib/genius"


export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  // Fix: Make sure q is optional and handle it safely
  const query = searchParams?.q || ""

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-purple-700 to-pink-600 py-6">
        <div className="container mx-auto px-4">
          <Link href="/">
            <h1 className="text-3xl font-bold text-white">Melovia</h1>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
          </Link>
          <h2 className="text-2xl font-semibold ml-4">
            Search Results for: <span className="text-purple-600">{query}</span>
          </h2>
        </div>

        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults query={query} />
        </Suspense>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Powered by Genius API. This site does not store any lyrics.</p>
          <p className="mt-2">© {new Date().getFullYear()} Melovia</p>
        </div>
      </footer>
    </div>
  )
}

// Add debugging to the SearchResults component to help diagnose issues

async function SearchResults({ query }: { query: string }) {
  if (!query) {
    return <p>Please enter a search term</p>
  }

  try {
    const results = await searchSongs(query)
    console.log(`Found ${results.length} results for query: ${query}`)

    if (!results.length) {
      return (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No results found</h3>
          <p className="text-gray-600">Try searching with different keywords</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((song) => (
          <Card key={song.id} className="overflow-hidden flex flex-col">
            <div className="aspect-square relative bg-gray-100">
              {song.song_art_image_url ? (
                <img
                  src={song.song_art_image_url || "/placeholder.svg"}
                  alt={`${song.title} by ${song.primary_artist.name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Music className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
            <CardContent className="flex-1 p-4">
              <h3 className="font-bold text-lg line-clamp-1">{song.title}</h3>
              <p className="text-gray-600">{song.primary_artist.name}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Link href={`/song/${song.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
              <a href={song.url} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error in search results:", error)
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">Error fetching results</h3>
        <p className="text-gray-600">Please try again later</p>
      </div>
    )
  }
}

function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="aspect-square bg-gray-200 animate-pulse" />
          <CardContent className="p-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="h-10 bg-gray-200 rounded animate-pulse w-28" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
