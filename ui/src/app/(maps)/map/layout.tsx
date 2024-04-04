import { Inter } from "next/font/google"
import "../../globals.css"
import { Toaster } from "@/components/ui/toaster"

import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Spot the crime",
  description: "Calculate the crime rate in your area",
}

export default function MapLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
