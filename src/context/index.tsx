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

function useImageEngineContext(): { rootUrl: string } {
  const ctx = useContext(ImageEngineContext)

  if (ctx.rootUrl === "") {
    throw new Error(
      "Please ensure that you've included ImageEngineProvider with a 'rootUrl' prop defined somewhere above Image components."
    )
  }

  return ctx
}

export { ImageEngineProvider, useImageEngineContext }
