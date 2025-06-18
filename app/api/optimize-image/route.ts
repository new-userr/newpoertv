import { NextResponse } from "next/server"
import sharp from "sharp"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // Optimize the image
    const optimizedImage = await sharp(buffer).resize(1280, 720, { fit: "cover" }).webp({ quality: 80 }).toBuffer()

    return new NextResponse(optimizedImage, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Image optimization error:", error)
    return NextResponse.json({ error: "Failed to optimize image" }, { status: 500 })
  }
}

