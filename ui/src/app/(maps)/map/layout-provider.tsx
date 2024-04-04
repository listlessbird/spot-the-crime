import { LatLngExpression } from "leaflet"
import { createContext, useContext, useMemo, useState } from "react"

type Item = {
  id: string
  coords: LatLngExpression
  assets: any[]
}

type LayoutContextType = {
  hasPlaced: boolean
  setHasPlaced: React.Dispatch<React.SetStateAction<boolean>>
  genOptions: {
    radius: number
    hotspotCount: number
    placedItems: Item[]
    clearPlacedItemsCb: null | (() => void)
    clearOneItemCb: null | ((id: string) => void)
  }
  setGenOptions: React.Dispatch<
    React.SetStateAction<{
      radius: number
      hotspotCount: number
      placedItems: Item[]
      clearPlacedItemsCb: null | (() => void)
      clearOneItemCb: null | ((id: string) => void)
    }>
  >
}

const LayoutContext = createContext<LayoutContextType | null>(null)

export function useLayoutState() {
  const ctx = useContext(LayoutContext)

  if (!ctx) {
    throw new Error("useLayoutState must be used within a LayoutProvider")
  }

  return ctx
}

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [hasPlaced, setHasPlaced] = useState(false)
  const [genOptions, setGenOptions] = useState({
    radius: 0,
    hotspotCount: 0,
    placedItems: [],
    clearPlacedItemsCb: null,
  })

  const ctxVal = useMemo(() => {
    return {
      hasPlaced,
      setHasPlaced,
      genOptions,
      setGenOptions,
    }
  }, [hasPlaced, genOptions])

  return (
    <LayoutContext.Provider value={{ ...ctxVal }}>
      {children}
    </LayoutContext.Provider>
  )
}
