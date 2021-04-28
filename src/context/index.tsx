import { createContext, useContext, ReactNode } from "react"

const ImageEngineContext = createContext({ deliveryAddress: "" })

type TProps = {
  children: ReactNode
  deliveryAddress: string
}

function ImageEngineProvider({ children, deliveryAddress }: TProps): JSX.Element {
  return (
    <ImageEngineContext.Provider
      value={{
        deliveryAddress: deliveryAddress.endsWith('/') ? deliveryAddress.slice(0, -1) : deliveryAddress
      }}
    >
      {children}
    </ImageEngineContext.Provider>
  )
}

function useImageEngineContext(): { deliveryAddress: string } {
  const ctx = useContext(ImageEngineContext)

  if (ctx.deliveryAddress === "") {
    throw new Error(
      "Please ensure that you've defined <ImageEngineProvider deliveryAddress='...'> somewhere above <Image> components in the DOM tree."
    )
  }

  return ctx
}

export { ImageEngineProvider, useImageEngineContext }
