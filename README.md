# React components for ImageEngine integration

Hassle-free way to deliver optimized responsive images in your React applications.

## Quick start

The bundle includes three major components:

* `<Image>`
* `<Picture>`
* `<Source>`

The only prerequisite to start using them is placing `ImageEngineProvider` somewhere above in the DOM tree. The provider requires one prop to be defined: `deliveryAddress`, which should be set to your [ImageEngine Delivery Address](https://docs.imageengine.io/docs/implementation/origin):

```jsx
import { ImageEngineProvider } from "@imageengine/react"

function App () {
  return (
    <ImageEngineProvider deliveryAddress="https://blazing-fast-pics.cdn.imgeng.in">
      <ShoppingCart />
      ...
    </ImageEngineProvider>
  )
}

```

```jsx
import { Image } from "@imageengine/react"

function ShoppingCart () {
  return (
    <section>
      <Image
        src="pick-ups/custom/unstoppable.jpg"
        srcSet={...}
        sizes={...}
        directives={...}
        {...otherProps}
      />
    </section>
    ...
  )
}
```

## Component props reference

### Image
`src` - Relative path to the image:
```ts
src: string
```

`directives` - ImageEngine directives:
```ts
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

`srcSet` - List of image variations for the image source set:
```ts
srcSet?: [{
  // Relative path to the image.
  src: string
  // Width descriptor.
  width: string
  // Custom optimization instructions.
  directives?: TDirectives
}]
```


### Source
`srcSet` - List of image variations for the image source set:
```ts
srcSet?: [{
  // Relative path to the image.
  src: string
  // Width descriptor.
  width: string
  directives?: TDirectives
}]
```
