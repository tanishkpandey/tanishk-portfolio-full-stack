"use client"

import dynamic from "next/dynamic"
import AdminLayout from "@/components/admin/AdminLayout"
import { ToastProvider } from "@/components/providers/toast-provider"

const ResourcesPageContent = dynamic(() => import("./ResourcesPageContent"), {
  ssr: false,
})

export default function ResourcesPage() {
  return (
    <ToastProvider>
      <AdminLayout>
        <ResourcesPageContent />
      </AdminLayout>
    </ToastProvider>
  )
}
