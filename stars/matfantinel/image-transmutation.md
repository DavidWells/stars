---
repo: matfantinel/image-transmutation
url: 'https://github.com/matfantinel/image-transmutation'
homepage: null
starredAt: '2023-05-15T02:24:33Z'
createdAt: '2021-01-29T20:18:45Z'
updatedAt: '2024-11-20T04:28:18Z'
language: JavaScript
license: GPL-3.0
branch: main
stars: 22
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:49.800Z'
description: >-
  A script built with NodeJS that automatically converts and resizes your images
  based on the given arguments
tags: []
---

# Image Transmutation 🧙💫

[![npm version](https://badge.fury.io/js/image-transmutation.svg)](//npmjs.com/package/image-transmutation)

This is a helper script built with NodeJS that automatically converts and resizes your images based on the given arguments. It uses [Sharp](https://github.com/lovell/sharp) to do the necessary conversions.

It is usable via command line, so you can add it to your package.json scripts after installing the NPM package.

I have written [a blog post about optimizing images](https://fantinel.dev/web-images-modern-formats/), which includes usage of this script, if you'd like to read more about use cases for it.

**Why transmutation?** Transmutation is the action of altering the properties of an object or being (or an image file). It is also a school of magic in many fantasy universes! 🎲

## Installation

Simply run 
```shell
npm install -D image-transmutation
```
to install it as a development dependency on your project.

### NodeJS version support

This package (v1.0.0) **requires NodeJS 18 or newer**. In case you need support for older NodeJS versions, you can use v0.1.3 by installing it with: `npm install -D image-transmutation@0.1.3`

## How to use

1. Once you install the NPM package, you can use it with the `image-transmutation` command.
2. I recommend adding it to your package.json scripts, like so:
```
"scripts": {
  "optimize-images": "image-transmutation --run --sourceFolder \"./source\" --targetFolder \"./target\" --inputFormats \"jpg\" --inputFormats \"jpeg\" --inputFormats \"png\" --outputFormats \"webp\" --outputFormats \"avif\" --widths 500 --widths 1000 --enlarge"
}
```
3. Run `npm run optimize-images` to execute the script.
4. You can add it to a "postbuild" script, so it runs automatically after your build process.

## Available arguments
```
  --help, -h        Displays this help text

  --run, -r         Executes the script
    --sourceFolder      REQUIRED - The relative or absolute path to the folder where the images currently are.
    --targetFolder      REQUIRED - The relative or absolute path to the destination folder where the converted images will be saved at. Warning: all contents in the folder will be deleted prior to execution.
    --inputFormats      REQUIRED - The existing formats that the script will look for, like jpg and png.
    --outputFormats     REQUIRED - The formats the script will convert to.
    --widths            Optional - The widths to which the images will be resized to. If not declared, images will be kept at their original size.
    --enlarge           Optional - Defines if images should be enlarged in case their original width is smaller than the target size defined on --widths.
    --clearTarget       Optional - Defines if the targetFolder should be cleared (all files deleted) before the optimization runs.
```

## Example command
This command runs using the folders built-in to this repository. It takes jpg, jpeg and png images and converts them into webp and avif, with widths of 500px and 1000px.

```
image-transmutation --run --sourceFolder "testing-room/source" --targetFolder "testing-room/target" --inputFormats "jpg" --inputFormats "jpeg" --inputFormats "png" --outputFormats "webp" --outputFormats "avif" --widths 500 --widths 1000 --enlarge
```

As a result:

```
/testing-room
  /source
    fluid.png
```

generates
```
/testing-room
  /target
    fluid-500w.avif
    fluid-500w.webp
    fluid-1000w.avif
    fluid-1000w.webp
```
