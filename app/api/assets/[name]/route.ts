import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase/client"

const BUCKET_NAME = "docs-blog-media"

export async function GET(request: Request, { params }: { params: Promise<{ name: string }> }) {
  try {
    const { name } = await params
    const supabase = getSupabaseClient()

    // Download the file from Supabase storage
    const { data, error } = await supabase.storage.from(BUCKET_NAME).download(name)

    if (error) {
      console.error("[v0] Failed to download asset:", error)
      return NextResponse.json({ error: "Asset not found" }, { status: 404 })
    }

    // Get content type from file extension
    const ext = name.split(".").pop()?.toLowerCase()
    const contentTypeMap: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
      svg: "image/svg+xml",
      pdf: "application/pdf",
      mp4: "video/mp4",
      webm: "video/webm",
    }
    const contentType = contentTypeMap[ext || ""] || "application/octet-stream"

    // Convert blob to array buffer
    const arrayBuffer = await data.arrayBuffer()

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("[v0] Asset serve error:", error)
    return NextResponse.json({ error: "Failed to serve asset" }, { status: 500 })
  }
}
