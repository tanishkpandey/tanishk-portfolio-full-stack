"use client"

import { ThemeProvider } from "@/components/theme-provider"

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="w-full max-w-none">{children}</div>
    </ThemeProvider>
  )
}
