import { TSrcSet } from './Image'
import { useImageEngineContext } from '../context'
import { generateSrcSetString  } from '../utils'

type TProps = Omit<JSX.IntrinsicElements["source"], "srcSet"> & {
  srcSet: TSrcSet
}

export function Source (props: TProps): JSX.Element {
  const { srcSet, ...other } = props

  const { rootUrl } = useImageEngineContext()

  return <source srcSet={generateSrcSetString(srcSet, rootUrl)} {...other} />
}