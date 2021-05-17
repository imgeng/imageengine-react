import { TDirectives, TSrcSet } from "../types"

const DIRECTIVE_MAPPING: { [key: string]: string } = {
  width: "w",
  autoWidthWithFallback: "w_auto",
  height: "h",
  compression: "cmpr",
  outputFormat: "f",
  fitMethod: "m",
  noOptimization: "pass",
  sharpness: "s",
  rotate: "r",
  scaleToScreenWidth: "pc",
  crop: "cr",
  inline: "in",
  keepMeta: "meta",
}

export function constructUrl(src: string, directives: TDirectives): string {
  const params = Object.entries(directives)
    // Filter out null, undefined and empty string values.
    .filter(([, value]) => value === 0 ? true : Boolean(value))
    .reduce((result, [key, value]) => {
      if (DIRECTIVE_MAPPING[key]) {
        return result + `/${DIRECTIVE_MAPPING[key]}_${value}`
      }

      console.warn(
        `Directive '${key}' isn't recognized and won't be applied to the image.`
      )
      return result
    }, "")

  return params === ""
    ? src
    : `${src}?imgeng=${params}`
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