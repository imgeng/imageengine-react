import { TDirectives, TSrcSet } from "../components/Image"

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

const DEV_ADDRESS: string = "dev";

export function constructUrl(src: string, directives: TDirectives): string {
    const params = Object.entries(directives).reduce((result, [key, value]) => {
	if (value === null || value === undefined || value === "") {
	    return result;
	    
	} else if (DIRECTIVE_MAPPING[key]) {
	    return result + `/${DIRECTIVE_MAPPING[key]}_${value}`
	}

	console.warn(`Directive '${key}' isn't recognized and won't be applied to the image.`);
	
	return result
    }, "");

    return params ? `${src}?imgeng=${params}` : src;
};

export function generateSrcSetString(srcSet: TSrcSet, deliveryAddress: string, originalUrl?: string): string {
    return srcSet.reduce((result, { src, width, directives }) => {
	// Extract width directive and always apply it to the image as
	// its size has to match provided width descriptor.
	const widthDirective = {
	    width: Number(width.replace("w", "")),
	}

	let fullAddress : string;

	// If the delivery address is "dev" set the fullAddress to originalUrl
	// Otherwise set it to deliveryAddress + the srcSet src
	if (deliveryAddress === DEV_ADDRESS && originalUrl) {
	    fullAddress = originalUrl;
	} else {
	    fullAddress = deliveryAddress + src;
	}
	
	const fullImageUrl = constructUrl(
	    fullAddress,
	    directives
		? {
		    ...directives,
		    ...widthDirective,
		}
	    : widthDirective
	)
	const entry = `${fullImageUrl} ${width},\n`
	return result += entry
    }, "");
};

export function buildUrlFromDeliveryAddress(deliveryAddress: string, src: string): string {
    if (deliveryAddress === DEV_ADDRESS) {
	return src;
    } else {
	return deliveryAddress +  src;
    }
};
