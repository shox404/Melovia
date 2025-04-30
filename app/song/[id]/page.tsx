import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, ExternalLink, Music, User } from "lucide-react"
import { getSongDetails } from "@/lib/genius"
import type { Metadata } from "next"

interface SongPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: SongPageProps): Promise<Metadata> {
  try {
    const song = await getSongDetails(params.id)
    return {
      title: `${song.title} by ${song.primary_artist.name} | Melovia`,
      description: `View details and lyrics for ${song.title} by ${song.primary_artist.name}`,
    }
  } catch (error) {
    return {
      title: "Song Details | Melovia",
      description: "View song details and lyrics",
    }
  }
}

export default async function SongPage({ params }: SongPageProps) {
  try {
    const song = await getSongDetails(params.id)

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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              {song.song_art_image_url ? (
                <img
                  src={song.song_art_image_url || "/placeholder.svg"}
                  alt={`${song.title} by ${song.primary_artist.name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Music className="h-24 w-24 text-gray-400" />
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-2">{song.title}</h1>
              <h2 className="text-xl text-gray-600 mb-6">{song.primary_artist.name}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-gray-500" />
                  <span>Artist: {song.primary_artist.name}</span>
                </div>
                {song.release_date && (
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                    <span>Released: {new Date(song.release_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">About This Song</h3>
                  {song.description_preview ? (
                    <p className="text-gray-700">{song.description_preview}</p>
                  ) : (
                    <p className="text-gray-500 italic">No description available</p>
                  )}
                </div>

                <div className="pt-4">
                  <h3 className="text-xl font-semibold mb-3">Lyrics</h3>
                  <p className="mb-4">
                    Due to copyright restrictions, we cannot display the full lyrics here. Please visit Genius to view
                    the complete lyrics.
                  </p>
                  <a href={song.url} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button className="flex items-center">
                      View Lyrics on Genius
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-gray-100 py-6 mt-12">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            <p>Powered by Genius API. This site does not store any lyrics.</p>
            <p className="mt-2">© {new Date().getFullYear()} Melovia</p>
          </div>
        </footer>
      </div>
    )
  } catch (error) {
    console.error("Error loading song details:", error)
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
          </div>

          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">Error loading song details</h3>
            <p className="text-gray-600 mb-6">We couldn't load the details for this song.</p>
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </main>

        <footer className="bg-gray-100 py-6 mt-12">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            <p>Powered by Genius API. This site does not store any lyrics.</p>
            <p className="mt-2">© {new Date().getFullYear()} Melovia</p>
          </div>
        </footer>
      </div>
    )
  }
}
