import { useImageEngineContext } from "../context"
import { constructUrl, generateSrcSetString, buildUrlFromDeliveryAddress } from "../utils"

const ALLOWED_INPUT_EXTENSIONS = [
  "png",
  "gif",
  "jpg",
  "bmp",
  "webp",
  "jp2",
  "svg",
  "tif",
]

export type TSrcSet = Array<{
  // Relative path to the image.
  src: string
  // Width descriptor.
  width: string
  directives?: TDirectives
}>

export type TDirectives = {
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
    | ""
  // Define desired fit method.
  fitMethod?: "stretch" | "box" | "letterbox" | "cropbox" | ""
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

export type TProps = Omit<JSX.IntrinsicElements["img"], "src" | "srcSet"> & {
  src: string
  directives?: TDirectives
  srcSet?: TSrcSet
}

export function Image(props: TProps): JSX.Element {
  const { src, srcSet, directives, ...other } = props

  if (!src) {
    throw new Error(`Please ensure that the image component has an 'src' prop.`)
  }

  const { deliveryAddress } = useImageEngineContext()
  const imageUrl = buildUrlFromDeliveryAddress(deliveryAddress, src);
  const [imageExtension] = src.split(".").slice(-1)

  if (!ALLOWED_INPUT_EXTENSIONS.includes(imageExtension)) {
    console.warn(
      `The following image's extension doesn't match any of the allowed types and won't be optimized: ${src}.`,
      `List of supported extensions: ${ALLOWED_INPUT_EXTENSIONS.join(", ")}.`
    )
  }

  return (
    <img
      src={
        directives ? constructUrl(imageUrl, directives) : imageUrl
      }
      srcSet={srcSet && generateSrcSetString(srcSet, deliveryAddress, imageUrl)}
      {...other}
    />
  )
}
