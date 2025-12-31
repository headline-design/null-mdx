import { getSupabaseClient } from "./client"

const BUCKET_NAME = "docs-blog-media"

export function getStorageUrl(path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    // Fallback for development without Supabase
    return `/images/${path}`
  }
  return `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${path}`
}

export function getOptimizedImageUrl(
  path: string,
  options: { width?: number; height?: number; quality?: number } = {},
): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    return `/images/${path}`
  }

  const { width = 800, quality = 75 } = options
  return `${supabaseUrl}/storage/v1/render/image/public/${BUCKET_NAME}/${path}?width=${width}&quality=${quality}`
}

export async function uploadImage(file: File, path: string) {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(path, file, {
    cacheControl: "31536000", // 1 year
    upsert: true,
  })

  if (error) throw error
  return getStorageUrl(data.path)
}

export async function deleteImage(path: string) {
  const supabase = getSupabaseClient()

  const { error } = await supabase.storage.from(BUCKET_NAME).remove([path])

  if (error) throw error
}

export async function listImages(folder?: string) {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase.storage.from(BUCKET_NAME).list(folder || "", {
    sortBy: { column: "created_at", order: "desc" },
  })

  if (error) throw error
  return data
}
