import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get("url")

    if (!url) {
      return NextResponse.json({ error: "Missing URL parameter" }, { status: 400 })
    }

    // Cache the response for 24 hours
    const response = await fetch(
      `https://graph.facebook.com/v10.0/instagram_oembed?url=${encodeURIComponent(
        url,
      )}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`,
      {
        next: {
          revalidate: 86400, // 24 hours
        },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch from Instagram API")
    }

    const data = await response.json()

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
    })
  } catch (error) {
    console.error("Instagram API Error:", error)
    return NextResponse.json({ error: "Failed to fetch embed code" }, { status: 500 })
  }
}

