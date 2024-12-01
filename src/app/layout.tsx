import "./globals.css";
import { geistSans, geistMono } from "./fonts/fonts";
import { constructMetadata } from "@/lib/metadata";
import { Toaster } from "react-hot-toast";
export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />        {children}
      </body>
    </html>
  );
}
