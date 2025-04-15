"use client"
import dynamic from "next/dynamic"
import AdminLayout from "@/components/admin/AdminLayout"
import { ToastProvider } from "@/components/providers/toast-provider"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/app/firebase/config"
import { onAuthStateChanged } from "firebase/auth"

const AdminPanel = dynamic(() => import("./AdminPanelContent"), { ssr: false })

export default function AdminPanelPage() {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/sign-in")
      }
    })

    return () => unsubscribe()
  }, [router])

  return (
    <ToastProvider>
      <AdminLayout>
        <AdminPanel />
      </AdminLayout>
    </ToastProvider>
  )
}
