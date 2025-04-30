"use server"

const GENIUS_API_KEY = process.env.GENIUS_API_KEY
const GENIUS_API_BASE_URL = "https://api.genius.com"

interface GeniusSearchResponse {
  response: {
    hits: Array<{
      result: {
        id: number
        title: string
        primary_artist: {
          id: number
          name: string
        }
        url: string
        song_art_image_url: string
      }
    }>
  }
}

interface GeniusSongResponse {
  response: {
    song: {
      id: number
      title: string
      url: string
      album?: {
        name: string
      }
      release_date?: string
      description_preview?: string
      song_art_image_url: string
      primary_artist: {
        id: number
        name: string
      }
    }
  }
}

export async function searchSongs(query: string) {
  if (!GENIUS_API_KEY) {
    throw new Error("GENIUS_API_KEY is not defined")
  }

  try {
    const response = await fetch(`${GENIUS_API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer ${GENIUS_API_KEY}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Genius API error: ${response.status}`)
    }

    const data = (await response.json()) as GeniusSearchResponse
    return data.response.hits.map((hit) => hit.result)
  } catch (error) {
    console.error("Error searching songs:", error)
    return []
  }
}

export async function getSongDetails(id: string) {
  if (!GENIUS_API_KEY) {
    throw new Error("GENIUS_API_KEY is not defined")
  }

  try {
    const response = await fetch(`${GENIUS_API_BASE_URL}/songs/${id}`, {
      headers: {
        Authorization: `Bearer ${GENIUS_API_KEY}`,
      },
      next: { revalidate: 86400 }, // Cache for 24 hours
    })

    if (!response.ok) {
      throw new Error(`Genius API error: ${response.status}`)
    }

    const data = (await response.json()) as GeniusSongResponse
    return data.response.song
  } catch (error) {
    console.error("Error getting song details:", error)
    throw new Error("Failed to fetch song details")
  }
}
