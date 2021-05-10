import { TSrcSet } from './Image'
import { useImageEngineContext } from '../context'
import { generateSrcSetString  } from '../utils'

export type TProps = Omit<JSX.IntrinsicElements["source"], "srcSet"> & {
  srcSet: TSrcSet
}

export function Source (props: TProps): JSX.Element {
  const { srcSet, src, ...other } = props

  const { deliveryAddress } = useImageEngineContext()
  
  return (
    <source srcSet={generateSrcSetString(srcSet, deliveryAddress, src)} {...other} />
  )
}