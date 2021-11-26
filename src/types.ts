import { ReactElement, ReactNode } from "react"
import { IEDirectives } from "@imageengine/imageengine-helpers";

export type TSrcSet = Array<{
  // Relative path to the image.
  src: string
  // Width descriptor.
  width: string
  directives?: IEDirectives
}>

export type TImageEngineProvider = {
  children: ReactNode
  deliveryAddress: string
  stripFromSrc?: string
}

export type TImageProps = Omit<JSX.IntrinsicElements["img"], "src" | "srcSet"> & {
  src: string
  directives?: IEDirectives
  srcSet?: TSrcSet
}

export type TSourceProps = Omit<JSX.IntrinsicElements["source"], "srcSet"> & {
  srcSet: TSrcSet
}

export type TPictureProps = Omit<JSX.IntrinsicElements["source"], "children"> & {
  children: [...Array<ReactElement<TSourceProps>>, ReactElement<TImageProps>]
}

export * from "@imageengine/imageengine-helpers";
