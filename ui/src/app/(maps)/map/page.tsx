"use client"
import dynamicImport from "next/dynamic"
import MapSidebar from "./sidebar"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { LayoutProvider } from "./layout-provider"

const Map = dynamicImport(
  () => import("@/app/(maps)/map/map").then((mod) => mod.Map),
  { ssr: false }
)

export default function Home() {
  return (
    <LayoutProvider>
      <div className="grid size-full lg:grid-cols-[300px_1fr] overflow-clip relative z-20">
        <div className="size-full">
          <div className="fixed left-0 top-0 w-[300px]">
            <MapSidebar />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <Button className="rounded-full" size="icon" variant="ghost">
              <ChevronLeftIcon className="w-4 h-4" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </header>
          <main className="flex flex-1">
            <div className="w-full">
              <div className="border-t border-gray-200 dark:border-gray-800 overflow-clip">
                <Map />
              </div>
            </div>
          </main>
        </div>
      </div>
    </LayoutProvider>
  )
}

export const dynamic = "force-dynamic"
