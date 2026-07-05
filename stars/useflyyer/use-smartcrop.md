---
repo: useflyyer/use-smartcrop
url: 'https://github.com/useflyyer/use-smartcrop'
homepage: 'https://www.npmjs.com/package/use-smartcrop'
starredAt: '2021-04-18T08:05:29Z'
createdAt: '2021-04-05T15:41:15Z'
updatedAt: '2025-02-11T16:59:19Z'
language: JavaScript
license: NOASSERTION
branch: main
stars: 102
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:49.242Z'
description: >-
  React hook for smartcrop.js to content aware image cropping with points of
  interest and facial recognition.
tags:
  - color
  - flyyer
  - image-recognition
  - react
  - react-hooks
  - smartcrop
  - typescript
---

# use-smartcrop

This is the React Hook version of [jwagner/smartcrop.js](https://github.com/jwagner/smartcrop.js/) + [lokesh/color-thief](https://github.com/lokesh/color-thief) with Typescript support.

We made this hook for [Flyyer.io](https://www.flyyer.io?ref=github) to enable developers to create content-aware marketing and social images but it is useful for any kind of project.

![example of content aware cropping](.github/image.png)

## Usage

Install this dependency:

```sh
yarn add use-smartcrop
```

By default images are loading with `crossOrigin=""` prop. [See this StackOverflow thread](https://stackoverflow.com/questions/22097747/how-to-fix-getimagedata-error-the-canvas-has-been-tainted-by-cross-origin-data).

Common case usage:

```tsx
import React from "react";
import { useSmartcrop, SmartcropStatus } from "use-smartcrop";

function App() {
  const src = "https://images.pexels.com/photos/1496286/pexels-photo-1496286.jpeg";
  // Width and height are required.
  const [cropped, error] = useSmartcrop({ src }, { width: 200, height: 400, minScale: 1.0 });
  if (error) {
    console.error(error);
  }

  return (
    <div>
      {cropped && <img src={cropped} />}
    </div>
  );
}
```

## API

### Hook

```tsx
const [dataURL, error] = useSmartcrop(
  /**
   * Properties of a <img> element.
   * Smartcrop will not be executed (so `dataURL` will be null) if `src` is not provided.
   * */
  image: ComponentProps<"img"> | null | undefined,
  /** See below */
  options: CropOptions,
)
```

### Options

```ts
/**
 * Arguments for `smartcrop.js`
 * From: https://github.com/jwagner/smartcrop.js
 */
export interface CropOptions {
  /**
   * Minimal scale of the crop rect, set to `1.0` to prevent smaller than necessary crops (lowers the risk of chopping things off).
   */
  minScale?: number;
  /**
   * Width of the crop you want to use.
   */
  width: number;
  /**
   *  Height of the crop you want to use.
   */
  height: number;
  /**
   * Optional array of regions whose 'interestingness' you want to boost
   */
  boost?: CropBoost[];
  /**
   * Optional boolean if set to `false` it will turn off the rule of thirds composition weight
   */
  ruleOfThirds?: boolean;
  debug?: boolean;
}
```
