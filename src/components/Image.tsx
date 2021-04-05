import { useImageEngineContext } from "../context"

type TProps = Omit<JSX.IntrinsicElements["img"], "src"> & {
  src: string
}

const ALLOWED_EXTENSIONS = [
  "png",
  "gif",
  "jpg",
  "bmp",
  "webp",
  "jpeg2000",
  "svg",
  "tif",
]

export function Image(props: TProps): JSX.Element {
  const { src, ...other } = props
  const { rootUrl } = useImageEngineContext()

  const [imageExtension] = src.split(".").slice(-1)

  if (!ALLOWED_EXTENSIONS.includes(imageExtension)) {
    console.warn(
      `The following image's extension doesn't match any of the allowed types and won't be optimized: ${src}.`,
      `List of supported extensions: ${ALLOWED_EXTENSIONS.join(", ")}.`
    )
  }

  return <img src={`${rootUrl}${src}`} {...other} />
}
