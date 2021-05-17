import { ReactElement } from "react"

export type TSrcSet = Array<{
  // Relative path to the image.
  src: string
  // Width descriptor.
  width: string
  directives?: TDirectives
}>

export interface TDirectives {
  // Define desired width.
  width?: number
  // Set width to auto (with fallback).
  autoWidthWithFallback?: number
  // Define desired height.
  height?: number
  // Adjust compression.
  // Possible range: 0-100.
  compression?: number
  // Define desired output format.
  outputFormat?:
    | "png"
    | "gif"
    | "jpg"
    | "bmp"
    | "webp"
    | "jp2"
    | "svg"
    | "mp4"
    | "jxr"
    | "avif"
  // Define desired fit method.
  fitMethod?: "stretch" | "box" | "letterbox" | "cropbox"
  // Don't apply any optimizations to the origin image.
  noOptimization?: true
  // Adjust sharpness.
  // Possible range: 0-100.
  sharpness?: number
  // Define rotation.
  // Possible range: -360 to 360.
  rotate?: number
  // Use WURFL to calculate screen's width and then scale the image accordingly.
  // Possible range: 0-100 (float).
  scaleToScreenWidth?: number
  // Crop the image [width, height, left, top].
  crop?: number[]
  // Convert the image into a data url.
  inline?: true
  // Keep EXIF data.
  keepMeta?: true
}

export type TImageProps = Omit<JSX.IntrinsicElements["img"], "src" | "srcSet"> & {
  src: string
  directives?: TDirectives
  srcSet?: TSrcSet
}

export type TSourceProps = Omit<JSX.IntrinsicElements["source"], "srcSet"> & {
  srcSet: TSrcSet
}

export type TPictureProps = Omit<JSX.IntrinsicElements["source"], "children"> & {
  children: [...Array<ReactElement<TSourceProps>>, ReactElement<TImageProps>]
}