import { LatLngExpression } from "leaflet"
import React, { createContext, useState } from "react"

type ControlContextType = {
  pos: LatLngExpression
  setPos: (pos: LatLngExpression) => void
}

export const ControlContext = createContext<ControlContextType | {}>({})

export function ControlProvider({ children }: { children: React.ReactNode }) {
  const [pos, setPos] = useState({ lat: null, lng: null })

  return (
    <ControlContext.Provider value={{ pos, setPos }}>
      {children}
    </ControlContext.Provider>
  )
}
