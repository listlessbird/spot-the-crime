import { Button } from "@/components/ui/button"
import { LayersIcon, MapIcon, MapPinIcon } from "lucide-react"
import Link from "next/link"
import { MapSheet } from "./map-sheet"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { z } from "zod"
import { Slider } from "@/components/ui/slider"
import { useLayoutState } from "./layout-provider"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { LatLngExpression } from "leaflet"

function MapGenParams({
  id,
  coords,
  assets,
}: {
  id: string
  coords: LatLngExpression
  assets: any[]
}) {
  const { setGenOptions, hasPlaced, genOptions } = useLayoutState()

  const [loading, setLoading] = useState(false)

  const [radius, setRadius] = useState(0)

  if (!hasPlaced) return null

  console.log({ id, coords, assets })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-pretty">
          Set the parameters for the marker at
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Label htmlFor="radius">Radius:</Label>
          <Slider
            id="radius"
            className="cursor-pointer"
            defaultValue={[50]}
            max={100}
            step={5}
            // value={[]}
            onValueCommit={(value) => {
              setRadius(value[0])
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          onClick={() => {
            // artificial exponential delay
            // setTimeout(() => {
            setGenOptions({
              ...genOptions,
              placedItems: genOptions.placedItems.map((item) =>
                item.id === id ? { ...item, radius } : item
              ),
            })
            setLoading(false)
            // }, 2.3e3)
          }}
          className={cn(loading && "animate-spin")}
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
        <Button
          onClick={() => {
            if (genOptions.clearOneItemCb) genOptions.clearOneItemCb(id)
          }}
          variant="ghost"
        >
          Clear
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function MapSidebar() {
  const { genOptions } = useLayoutState()

  return (
    <div className="border-r bg-gray-100/40 dark:bg-gray-800/40 min-h-screen p-2 flex flex-col h-full">
      <div className="flex h-[60px] items-center border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <MapIcon className="h-6 w-6" />
          <span className="">GSC</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <LayersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <h2 className="font-semibold text-lg">Layers</h2>
          </div>
          <div className="grid gap-2"></div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <h2 className="font-semibold text-lg">Points of interest</h2>
          </div>
          <div className="grid gap-2">
            {/* <Label className="flex items-center" htmlFor="restaurants">
              <Input
                className="peer h-4 w-4"
                id="restaurants"
                type="checkbox"
              />
              <span className="ml-2 peer-disabled:opacity-50 dark:peer-disabled:opacity-70">
                Restaurants
              </span>
            </Label>
            <Label className="flex items-center" htmlFor="parks">
              <Input className="peer h-4 w-4" id="parks" type="checkbox" />
              <span className="ml-2 peer-disabled:opacity-50 dark:peer-disabled:opacity-70">
                Parks
              </span>
            </Label>
            <Label className="flex items-center" htmlFor="museums">
              <Input className="peer h-4 w-4" id="museums" type="checkbox" />
              <span className="ml-2 peer-disabled:opacity-50 dark:peer-disabled:opacity-70">
                Museums
              </span>
            </Label> */}
          </div>
          <div className="flex items-center gap-2">
            <LayersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <h2 className="font-semibold text-lg">Analytics</h2>
          </div>
          <div className="grid gap-2">
            {/* <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="ml-2 peer-disabled:opacity-50 dark:peer-disabled:opacity-70">
                Population density
              </span>
              <span className="ml-auto text-sm peer-disabled:opacity-50 dark:peer-disabled:opacity-70">
                2500/mi²
              </span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="ml-2 peer-disabled:opacity-50 dark:peer-disabled:opacity-70">
                Average income
              </span>
              <span className="ml-auto text-sm peer-disabled:opacity-50 dark:peer-disabled:opacity-70">
                $50,000
              </span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="ml-2 peer-disabled:opacity-50 dark:peer-disabled:opacity-70">
                Tourist hotspots
              </span>
              <span className="ml-auto text-sm peer-disabled:opacity-50 dark:peer-disabled:opacity-70">
                10
              </span>
            </div> */}
            <div className="justify-self-center flex flex-col gap-2 ">
              {genOptions?.placedItems?.map((item) => (
                <MapGenParams key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto mb-7">
        <MapSheet />
      </div>
    </div>
  )
}
