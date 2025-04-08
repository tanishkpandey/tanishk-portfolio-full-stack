import "./globals.css"
import { geistSans, geistMono } from "./fonts/fonts"
import { constructMetadata } from "@/lib/metadata"
import { Toaster } from "react-hot-toast"
import { Navbar } from "@/components/Navbar"
export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-50">
        <main className="container mx-auto max-w-screen-lg px-4">
          <Navbar />
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </main>
      </body>
    </html>
  )
}
