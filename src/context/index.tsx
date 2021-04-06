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
      "Please ensure that you've included an ImageEngineProvider somewhere above your image components with a 'rootUrl' prop defined."
    )
  }

  return ctx
}

export { ImageEngineProvider, useImageEngineContext }
