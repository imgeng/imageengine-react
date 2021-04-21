# React components for ImageEngine integration

Hassle-free way to deliver optimized responsive images in your React applications.

## Quick start

The bundle includes three major components:

* `<Image>`
* `<Picture>`
* `<Source>`

The only prerequisite to start using them is placing `ImageEngineProvider` somewhere above in the tree. The provider requires one prop to be defined: `rootUrl`, which should be set to your [ImageEngine Delivery Address](https://docs.imageengine.io/docs/implementation/domain-name):

```jsx
import { ImageEngineProvider } from "@imageengine/react"

<ImageEngineProvider rootUrl="https://blazing-fast-pics.cdn.imgeng.in">
  <ShoppingCart />
</ImageEngineProvider>
```

```jsx
// ShoppingCart
import { Image } from "@imageengine/react"

<section>
  <Image
    src="pick-ups/custom/unstoppable.jpg"
    srcSet={...}
    sizes={...}
    directives={...}
    {...otherProps}
  />
</section>
```

## Component properties reference

### Image

`src` - Relative path to the image:
```
src: string
```

`directives` - ImageEngine directives:
```js
directives?: {
  // Define desired width.
  width?: number
  // Set width to auto (with fallback).
  autoWidthWithFallback?: number
  // Define desired height.
  height?: number
  // Adjust compression.
  // Possible range: 0-100.
  compression?: number
  // Define desired output format.
  outputFormat?:
    | "png"
    | "gif"
    | "jpg"
    | "bmp"
    | "webp"
    | "jpeg2000"
    | "svg"
    | "mp4"
    | "jxr"
    | "avif"
  // Define desired fit method.
  fitMethod?: "stretch" | "box" | "letterbox" | "cropbox"
  // Don't apply any optimizations to the origin image.
  noOptimization?: false
  // Adjust sharpness.
  // Possible range: 0-100.
  sharpness?: number
  // Define rotation.
  // Possible range: -360 to 360.
  rotate?: number
  // Use WURFL to calculate screen's width and then scale the image accordingly.
  // Possible range: 0-100 (float).
  scaleToScreenWidth?: number
  // Crop the image [width, height, left, top].
  crop?: number[]
  // Convert the image into a data url.
  inline?: false
  // Keep EXIF data.
  keepMeta?: false
}
```

`srcSet` - List of image variations for the image source set:

```js
srcSet?: [
  // Relative path to the image.
  string,
  // Width descriptor.
  string,
  // Custom optimization instructions.
  TDirectives?
]
```


### Source

List of image variations:

```js
srcSet?: [
  // Relative path to the image.
  string,
  // Width descriptor.
  string,
  // Custom optimization instructions.
  TDirectives?
]
```
