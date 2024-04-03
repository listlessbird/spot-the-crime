import { Layers, LayersIcon, MapIcon, MapPinIcon } from "lucide-react"
import Link from "next/link"

export default function MapSidebar() {
  return (
    // <div className="min-h-dvh bg-slate-300 min-w-[200px]">
    //   <div className="border-r bg-gray-100/40 dark:bg-gray-800/40">
    //     <div className="flex h-[60px] items-center border-b px-6">
    //       <Link className="flex items-center gap-2 font-semibold" href="#">
    //         <MapIcon className="h-6 w-6" />
    //         <span className="">Map</span>
    //       </Link>
    //     </div>
    //     <div className="p-2 flex flex-col gap-2">
    //       <h3 className="font-semibold text-lg">
    //         <Layers className="w-6 h-6 inline-block" /> Layers
    //       </h3>
    //     </div>
    //   </div>
    // </div>
    <div className="border-r bg-gray-100/40 dark:bg-gray-800/40 min-h-dvh">
      <div className="flex h-[60px] items-center border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <MapIcon className="h-6 w-6" />
          <span className="">Map</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <LayersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <h2 className="font-semibold text-lg">Layers</h2>
          </div>
          <div className="grid gap-2">
            {/* <Label className="flex items-center" htmlFor="streets">
              <Input className="peer h-4 w-4" id="streets" type="checkbox" />
              <span className="ml-2 peer-disabled:opacity-50 dark:peer-disabled:opacity-70">
                Streets
              </span>
            </Label>
            <Label className="flex items-center" htmlFor="satellite">
              <Input className="peer h-4 w-4" id="satellite" type="checkbox" />
              <span className="ml-2 peer-disabled:opacity-50 dark:peer-disabled:opacity-70">
                Satellite
              </span>
            </Label>
            <Label className="flex items-center" htmlFor="traffic">
              <Input className="peer h-4 w-4" id="traffic" type="checkbox" />
              <span className="ml-2 peer-disabled:opacity-50 dark:peer-disabled:opacity-70">
                Traffic
              </span>
            </Label> */}
          </div>
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
          </div>
        </div>
      </div>
    </div>
  )
}
