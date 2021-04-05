import { useImageEngineContext } from "../context"

type TProps = Omit<JSX.IntrinsicElements["img"], "src"> & {
  src: string
}

export function Image(props: TProps): JSX.Element {
  const { src, ...other } = props
  const { rootUrl } = useImageEngineContext()

  return <img src={`${rootUrl}${src}`} {...other} />
}
