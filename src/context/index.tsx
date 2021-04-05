import { createContext, useContext, ReactNode } from "react"

const ImageEngineContext = createContext({ rootUrl: "" })

type TProps = {
  children: ReactNode
  rootUrl: string
}

function ImageEngineProvider({ children, rootUrl }: TProps): JSX.Element {
  return (
    <ImageEngineContext.Provider
      value={{
        rootUrl,
      }}
    >
      {children}
    </ImageEngineContext.Provider>
  )
}

function useImageEngineContext() {
  const ctx = useContext(ImageEngineContext)

  if (!ctx) {
    throw new Error(
      "useImageEngineContext must be used within ImageEngineProvider"
    )
  }

  return ctx
}

export { ImageEngineProvider, useImageEngineContext }
