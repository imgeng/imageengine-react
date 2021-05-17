import { useImageEngineContext } from "../context"
import { constructUrl, generateSrcSetString } from "../utils"
import { TImageProps } from "../types"

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

export function Image(props: TImageProps): JSX.Element {
  const { src, srcSet, directives, ...other } = props

  if (!src) {
    throw new Error(`Please ensure that the image component has an 'src' prop.`)
  }

  const { deliveryAddress } = useImageEngineContext()
  const imageUrl = deliveryAddress + src
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
      srcSet={srcSet && generateSrcSetString(srcSet, deliveryAddress)}
      {...other}
    />
  )
}
