import "./globals.css"
import { geistSans, geistMono } from "./fonts/fonts"
import { constructMetadata } from "@/lib/metadata"
import { Toaster } from "react-hot-toast"
import { NavbarWrapper } from "@/components/NavbarWrapper"
import { FooterWrapper } from "@/components/FooterWrapper"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="container mx-auto max-w-screen-lg px-4">
            <NavbarWrapper />
            <Toaster position="top-center" reverseOrder={false} />
            {children}
            <FooterWrapper />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
