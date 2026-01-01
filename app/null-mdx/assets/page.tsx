"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Trash2, Copy, Check, ImageIcon, FileText, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Asset {
  name: string
  id: string
  updated_at: string
  created_at: string
  metadata: {
    size: number
    mimetype: string
  }
}

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const fetchAssets = useCallback(async () => {
    try {
      const res = await fetch("/api/null-mdx/assets")
      if (!res.ok) {
        console.error("Failed to fetch assets: HTTP", res.status)
        setAssets([])
      } else {
        const data = await res.json()
        setAssets(data.assets || [])
      }
    } catch (error) {
      console.error("Failed to fetch assets:", error)
      setAssets([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAssets()
  }, [fetchAssets])

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setUploading(true)
    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i])
    }

    try {
      const res = await fetch("/api/null-mdx/assets", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        await fetchAssets()
      }
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (path: string) => {
    try {
      const res = await fetch(`/api/null-mdx/assets?path=${encodeURIComponent(path)}`, {
        method: "DELETE",
      })

      if (res.ok) {
        await fetchAssets()
      }
    } catch (error) {
      console.error("Delete failed:", error)
    }
  }

  const copyUrl = async (name: string) => {
    const url = `/api/null-mdx/assets/${name}`
    await navigator.clipboard.writeText(url)
    setCopiedId(name)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleUpload(e.dataTransfer.files)
  }

  const isImage = (mimetype: string) => mimetype?.startsWith("image/")

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-8 md:px-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Asset Manager</h1>
          <p className="mt-2 text-muted-foreground">Upload and manage images and files for your content.</p>
        </div>

        {/* Upload area */}
        <div
          className={cn(
            "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
            dragActive ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/50",
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
          <p className="mb-2 text-sm text-muted-foreground">Drag and drop files here, or click to select</p>
          <Input
            type="file"
            multiple
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => handleUpload(e.target.files)}
            disabled={uploading}
          />
          <Button variant="secondary" disabled={uploading}>
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Select Files"
            )}
          </Button>
        </div>

        {/* Assets grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ImageIcon className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">No assets uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {assets.map((asset) => (
              <Card key={asset.id} className="group overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-square bg-muted">
                    {isImage(asset.metadata?.mimetype) ? (
                      <img src={`/api/null-mdx/assets/${asset.name}`} alt={asset.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <FileText className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}

                    {/* Overlay actions */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button size="icon" variant="secondary" onClick={() => copyUrl(asset.name)}>
                        {copiedId === asset.name ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => handleDelete(asset.name)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-2">
                    <p className="truncate text-xs font-medium">{asset.name}</p>
                    <p className="text-xs text-muted-foreground">{formatSize(asset.metadata?.size || 0)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
