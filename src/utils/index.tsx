import { TDirectives } from "../components/Image"

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
  const params = Object.entries(directives).reduce((result, [key, value]) => {
    if (DIRECTIVE_MAPPING[key]) {
      return result + `/${DIRECTIVE_MAPPING[key]}_${value}`
    }

    console.warn(
      `Directive '${key}' isn't recognized and won't be applied to the image.`
    )
    return result
  }, "")

  return `${src}?imgeng=${params}`
}
