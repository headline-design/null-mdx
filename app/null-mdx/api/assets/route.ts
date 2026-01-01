import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

const BUCKET_NAME = "docs-blog-media"

async function getSupabaseServer() {
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options)
        })
      },
    },
  })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const folder = searchParams.get("folder") || ""

  const supabase = await getSupabaseServer()

  const { data, error } = await supabase.storage.from(BUCKET_NAME).list(folder, {
    sortBy: { column: "created_at", order: "desc" },
  })

  if (error) {
    console.log("[v0] GET assets error:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  console.log("[v0] GET assets success, count:", data?.length)
  return NextResponse.json({ assets: data })
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const files = formData.getAll("files") as File[]

  if (!files || files.length === 0) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 })
  }

  const supabase = await getSupabaseServer()
  const results: { url: string; path: string }[] = []

  for (const file of files) {
    // Generate timestamped filename to avoid collisions
    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-")
    const path = `${timestamp}-${safeName}`

    const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(path, file, {
      cacheControl: "31536000",
      upsert: true,
    })

    if (error) {
      console.log("[v0] POST upload error:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${data.path}`

    results.push({ url, path: data.path })
  }

  return NextResponse.json({ uploads: results })
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path")

  if (!path) {
    return NextResponse.json({ error: "Path is required" }, { status: 400 })
  }

  const supabase = await getSupabaseServer()

  const { error } = await supabase.storage.from(BUCKET_NAME).remove([path])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
