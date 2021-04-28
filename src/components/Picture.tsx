import { Children, ReactElement } from "react"

import { Image, TProps as TImageProps } from "./Image"
import { Source, TProps as TSourceProps } from "./Source"

type TProps = Omit<JSX.IntrinsicElements["source"], "children"> & {
  children: [...Array<ReactElement<TSourceProps>>, ReactElement<TImageProps>]
}
export function Picture(props: TProps): JSX.Element {
  const imgChild = Children.toArray(props.children).find(
    (child) => {
      if (typeof child === 'object' && 'type' in child) {
        return child.type === Image
      }
    }
  )

  if (!imgChild) {
    console.warn(
      `A fallback <Image> is missing as the last child of the <Picture> component.`,
      `https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture`
    )
  }

  return (
    <picture>
      {props.children}
    </picture>
  )
}