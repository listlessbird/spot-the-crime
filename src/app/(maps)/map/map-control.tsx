import React, { createContext } from "react"

export const ControlContext = createContext({})

export function ControlProvider({ children }: React.ReactNode) {
  return <ControlContext.Provider value={}>{children}</ControlContext.Provider>
}
