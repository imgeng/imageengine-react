import { useImageEngineContext } from '../context'
import { generateSrcSetString  } from '../utils'

import { TSourceProps } from '../types'

export function Source(props: TSourceProps): JSX.Element {
  const { srcSet, ...other } = props

  const { deliveryAddress } = useImageEngineContext()

  return (
    <source srcSet={generateSrcSetString(srcSet, deliveryAddress)} {...other} />
  )
}