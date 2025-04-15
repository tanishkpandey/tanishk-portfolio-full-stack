"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, BookOpen, FileText, Code2, Menu, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { signOut } from "firebase/auth"
import { auth } from "@/app/firebase/config"

const sidebarItems = [
  {
    title: "Home",
    href: "/admin-panel",
    icon: Home,
  },
  {
    title: "Resources",
    href: "/admin-panel/resources",
    icon: BookOpen,
  },
  {
    title: "Blog",
    href: "/admin-panel/blog",
    icon: FileText,
  },
  {
    title: "Snippets",
    href: "/admin-panel/snippets",
    icon: Code2,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth)

      // Clear the authentication token cookie
      document.cookie =
        "userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

      toast({
        title: "Logged out successfully",
        description: "You have been logged out of the admin panel.",
      })

      // Redirect to sign-in page
      router.push("/sign-in")
    } catch (error) {
      console.error("Error during logout:", error)
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-card border-r border-border transition-transform duration-200 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
        </div>
        <nav className="flex flex-col p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div
        className={cn(
          "flex-1 transition-all duration-200 ease-in-out",
          isSidebarOpen ? "ml-64" : "ml-0"
        )}
      >
        {/* Admin Navbar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">
              {sidebarItems.find((item) => item.href === pathname)?.title ||
                "Admin Panel"}
            </h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
