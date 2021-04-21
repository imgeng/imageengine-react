# Dedicated React components for ImageEngine integration 

Hassle-free way to deliver optimized responsive images in your React applications.

## Quick start

The bundle includes three major components:

* `<Image>`
* `<Picture>`
* `<Source>`

The only prerequisite to start using them is placing `ImageEngineProvider` somewhere above in the tree. The provider requires one prop to be defined: `rootUrl`, which is supposed to contain your [image origin](https://docs.imageengine.io/docs/implementation/origin):

```jsx
import { ImageEngineProvider } from "@imageengine/react"

<ImageEngineProvider rootUrl="https//blazing.fast.pics.imgeng.in">
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

## Component reference

### Image
```
src: string
```

Relative path to the image.

```
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
  // Define desired fit method.
  fitMethod?: "stretch" | "box" | "letterbox" | "cropbox"
  // Don't apply any optimizations to the origin image.
  noOptimization?: true
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
  inline?: true
  // Keep EXIF data.
  keepMeta?: true
}
```

Custom optimization instructions.


```
srcSet?: [
  // Relative path to the image.
  string,
  // Width descriptor.
  string,
  // Custom optimization instructions.
  TDirectives?
]
```

List of image variations.


### Source
```
srcSet?: [
  // Relative path to the image.
  string,
  // Width descriptor.
  string,
  // Custom optimization instructions.
  TDirectives?
]
```

List of image variations.
