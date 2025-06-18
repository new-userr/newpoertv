import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const postId = searchParams.get("postId")

  if (!postId) {
    return NextResponse.json({ error: "Missing postId parameter" }, { status: 400 })
  }

  try {
    // First try to get the media data using the oEmbed endpoint
    const oembedResponse = await fetch(
      `https://api.instagram.com/oembed?url=https://www.instagram.com/p/${postId}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`,
    )

    if (oembedResponse.ok) {
      const oembedData = await oembedResponse.json()
      // Extract the thumbnail URL from the HTML response
      const thumbnailMatch = oembedData.html.match(/background-image: url$$(.*?)$$/)
      if (thumbnailMatch && thumbnailMatch[1]) {
        return NextResponse.json({ thumbnailUrl: thumbnailMatch[1] })
      }
    }

    // If oEmbed fails, try the Graph API
    const graphResponse = await fetch(
      `https://graph.instagram.com/${postId}?fields=thumbnail_url,media_url&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`,
    )

    if (!graphResponse.ok) {
      throw new Error(`Instagram API error: ${graphResponse.statusText}`)
    }

    const graphData = await graphResponse.json()
    const thumbnailUrl = graphData.thumbnail_url || graphData.media_url

    if (!thumbnailUrl) {
      throw new Error("No thumbnail URL found")
    }

    return NextResponse.json({ thumbnailUrl })
  } catch (error) {
    console.error("Error fetching Instagram thumbnail:", error)
    // Return a default thumbnail URL
    return NextResponse.json({
      thumbnailUrl: `https://instagram.com/p/${postId}/media/?size=l`,
    })
  }
}

