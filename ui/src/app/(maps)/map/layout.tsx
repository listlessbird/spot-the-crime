"use client"
import { Inter } from "next/font/google"
import "../../globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export default function MapLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
