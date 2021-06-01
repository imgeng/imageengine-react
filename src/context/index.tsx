import { createContext, useContext, ReactNode } from "react"

import { TImageEngineProvider } from '../types'

const ImageEngineContext = createContext<Omit<TImageEngineProvider, 'children'>>({ deliveryAddress: "" })

function ImageEngineProvider({ children, deliveryAddress, stripFromSrc }: TImageEngineProvider): JSX.Element {
  return (
    <ImageEngineContext.Provider
      value={{
        deliveryAddress: deliveryAddress.endsWith('/') ? deliveryAddress.slice(0, -1) : deliveryAddress,
        stripFromSrc,
      }}
    >
      {children}
    </ImageEngineContext.Provider>
  )
}

function useImageEngineContext(): Omit<TImageEngineProvider, 'children'> {
  const ctx = useContext(ImageEngineContext)

  if (ctx.deliveryAddress === "") {
    throw new Error(
      "Please ensure that you've defined <ImageEngineProvider deliveryAddress='...'> " +
      "somewhere above <Image> / <Source> components in the DOM tree."
    )
  }

  return ctx
}

export { ImageEngineProvider, useImageEngineContext }
