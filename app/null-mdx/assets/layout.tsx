import { MainLayout } from "@/components/main-layout"
import type React from "react"

export default function AssetsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
