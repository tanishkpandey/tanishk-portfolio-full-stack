import "./globals.css"
import { geistSans, geistMono } from "./fonts/fonts"
import { constructMetadata } from "@/lib/metadata"
import { Toaster } from "react-hot-toast"
import { NavbarWrapper } from "@/components/NavbarWrapper"
import { FooterWrapper } from "@/components/FooterWrapper"

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-50">
        <main className="container mx-auto max-w-screen-lg px-4">
          <NavbarWrapper />
          <Toaster position="top-center" reverseOrder={false} />
          {children}
          <FooterWrapper />
        </main>
      </body>
    </html>
  )
}
