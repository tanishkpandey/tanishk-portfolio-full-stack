"use client"

import dynamic from "next/dynamic"
import AdminLayout from "@/components/admin/AdminLayout"
import { ToastProvider } from "@/components/providers/toast-provider"

const BlogPageContent = dynamic(() => import("./BlogPageContent"), {
  ssr: false,
})

export default function BlogPage() {
  return (
    <ToastProvider>
      <AdminLayout>
        <BlogPageContent />
      </AdminLayout>
    </ToastProvider>
  )
} 