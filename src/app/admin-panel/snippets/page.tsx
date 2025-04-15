"use client"

import dynamic from "next/dynamic"
import AdminLayout from "@/components/admin/AdminLayout"
import { ToastProvider } from "@/components/providers/toast-provider"

const SnippetsPageContent = dynamic(() => import("./SnippetsPageContent"), {
  ssr: false,
})

export default function SnippetsPage() {
  return (
    <ToastProvider>
      <AdminLayout>
        <SnippetsPageContent />
      </AdminLayout>
    </ToastProvider>
  )
} 