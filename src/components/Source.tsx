import { useImageEngineContext } from '../context'
import { generateSrcSetString  } from '../utils'

import { TSourceProps } from '../types'

export function Source(props: TSourceProps): JSX.Element {
  const { srcSet, ...other } = props

  const { deliveryAddress, stripFromSrc } = useImageEngineContext()

  const srcSetString = generateSrcSetString(
    (stripFromSrc
      ? srcSet.map((image) => ({
        ...image,
        src: image.src.replace(stripFromSrc, "")
      }))
      : srcSet
    ),
    deliveryAddress
  )

  return (
    <source
      srcSet={srcSetString}
      {...other}
    />
  )
}