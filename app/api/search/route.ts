import { NextResponse } from "next/server"

const GENIUS_API_KEY = process.env.GENIUS_API_KEY
const GENIUS_API_BASE_URL = "https://api.genius.com"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  if (!GENIUS_API_KEY) {
    console.error("GENIUS_API_KEY is not configured")
    return NextResponse.json({ error: "API key is not configured" }, { status: 500 })
  }

  try {
    console.log(`Searching for: ${query} with API key: ${GENIUS_API_KEY.substring(0, 5)}...`)
    
    const response = await fetch(`${GENIUS_API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
      headers: {
        // Fix: The correct format for the Authorization header
        "Authorization": `Bearer ${GENIUS_API_KEY}`
      },
      cache: "no-store"
    })

    if (!response.ok) {
      console.error(`Genius API error: ${response.status}`)
      const errorText = await response.text()
      console.error(`Error response: ${errorText}`)
      return NextResponse.json({ error: `Genius API returned ${response.status}` }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error searching songs:", error)
    return NextResponse.json({ error: "Failed to fetch from Genius API" }, { status: 500 })
  }
}
