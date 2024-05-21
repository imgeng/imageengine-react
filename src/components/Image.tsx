import { useImageEngineContext } from "../context"
import { constructUrl, generateSrcSetString } from "../utils"
import { TImageProps } from "../types"

import { IEFormat } from "@imageengine/imageengine-helpers";

const ALLOWED_INPUT_EXTENSIONS: (IEFormat | 'tif')[] = [
  "png",
  "gif",
  "jpg",
  "jpeg",
  "bmp",
  "webp",
  "jp2",
  "svg",
  "mp4",
  "jxr",
  "avif",
  "jxl",
  "tif",
]

export function Image(props: TImageProps): JSX.Element {
  const { src, srcSet, directives, ...other } = props

  if (!src) {
    throw new Error(`Please ensure that the image component has an 'src' prop.`)
  }

  const { deliveryAddress, stripFromSrc } = useImageEngineContext()
  const imageUrl = deliveryAddress + (stripFromSrc ? src.replace(stripFromSrc, '') : src)
  const [imageExtension] = new URL(imageUrl).pathname.split(".").slice(-1)

  if (!ALLOWED_INPUT_EXTENSIONS.includes(imageExtension.toLowerCase() as IEFormat)) {
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
      srcSet={srcSet && generateSrcSetString(srcSet, deliveryAddress)}
      {...other}
    />
  )
}
