import { Children } from "react"

import { Image } from "./Image"

import { TPictureProps } from '../types'

export function Picture(props: TPictureProps): JSX.Element {
  const imgChild = Children.toArray(props.children).find((child) => {
    if (typeof child === "object" && "type" in child) {
      return child.type === Image
    }
  })

  if (!imgChild) {
    console.warn(
      `A fallback <Image> is missing as the last child of the <Picture> component.`,
      `https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture`
    )
  }

  return <picture>{props.children}</picture>
}