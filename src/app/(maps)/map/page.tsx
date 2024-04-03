"use client"
import dynamicImport from "next/dynamic"
import MapSidebar from "./sidebar"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

const Map = dynamicImport(
  () => import("@/app/(maps)/map/map").then((mod) => mod.Map),
  { ssr: false }
)

export default function Home() {
  return (
    <div className="grid size-full lg:grid-cols-[300px_1fr]">
      <MapSidebar />
      <div className="flex flex-col w-full">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Button className="rounded-full" size="icon" variant="ghost">
            <ChevronLeftIcon className="w-4 h-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="w-full">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full bg-gray-100/50 dark:bg-gray-800/50"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </form>
          </div>
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
  )
}

export const dynamic = "force-dynamic"
