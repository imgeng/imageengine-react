import { TSrcSet } from "../types"
import { IEDirectives, build_IE_url } from "@imageengine/imageengine-helpers";

export function constructUrl(src: string, directives: IEDirectives): string {
  return build_IE_url(src, directives, true);
}

export function generateSrcSetString(srcSet: TSrcSet, deliveryAddress: string): string {
  return srcSet.reduce((result, { src, width, directives }) => {
    // Extract width directive and always apply it to the image as
    // its size has to match provided width descriptor.
    const widthDirective = {
      width: Number(width.replace("w", "")),
    }
    const fullImageUrl = constructUrl(
      deliveryAddress + src,
      directives
        ? {
            ...directives,
            ...widthDirective,
          }
        : widthDirective
    )
    const entry = `${fullImageUrl} ${width},\n`
    return result += entry
  }, "")
}