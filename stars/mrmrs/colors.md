---
repo: mrmrs/colors
url: 'https://github.com/mrmrs/colors'
homepage: 'http://clrs.cc'
starredAt: '2018-02-15T22:35:30Z'
createdAt: '2013-06-17T06:31:51Z'
updatedAt: '2025-02-24T13:21:22Z'
language: CSS
license: NOASSERTION
branch: main
stars: 9315
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:28.276Z'
description: Smarter defaults for colors on the web.
tags: []
---

# [colors.css 3.0.0](http://clrs.cc/)


Better default colors for the web. A collection of skin classes for faster prototyping and nicer looking sites.

[Customize your own defaults here.](https://components.ai/theme/DIgsnuGL20I1ZwsNP3YY)

#### Stats

903 | 85 | 85
---|---|---
bytes | selectors | declarations

## Installation

#### With [npm](https://npmjs.com)

```
npm install --save-dev colors.css
```

#### With Git

```
git clone https://github.com/tachyons-css/colors.css
```

## Usage

#### Using with [PostCSS](https://github.com/postcss/postcss)

Import the css module

```css
@import "colors.css";
```

Then process the CSS using the [`tachyons-cli`](https://github.com/tachyons-css/tachyons-cli)

```sh
$ npm i -g tachyons-cli
$ tachyons-cli path/to/css-file.css > dist/t.css
```

#### Using the CSS

The built CSS is located in the `css` directory. It contains an unminified and minified version.
You can either cut and paste that css or link to it directly in your html.

```html
<link rel="stylesheet" href="path/to/module/css/colors.css">
```

#### Development

The source CSS files can be found in the `src` directory.
Running `$ npm start` will process the source CSS and place the built CSS in the `css` directory.

## The CSS

```css
/*

  COLORS
  Better default colors for the web

*/
/* 

   VARIABLES

   - Cool
   - Warm
   - Gray Scale

*/
/*

   SKINS
   - Backgrounds
   - Colors
   - Border colors
   - SVG fills
   - SVG Strokes

*/
/* Backgrounds */
.bg-navy { background-color: #001F3F; }
.bg-blue { background-color: #0074D9; }
.bg-aqua { background-color: #7FDBFF; }
.bg-teal { background-color: #39CCCC; }
.bg-olive { background-color: #3D9970; }
.bg-green { background-color: #2ECC40; }
.bg-lime { background-color: #01FF70; }
.bg-yellow { background-color: #FFDC00; }
.bg-orange { background-color: #FF851B; }
.bg-red { background-color: #FF4136; }
.bg-fuchsia { background-color: #F012BE; }
.bg-purple { background-color: #B10DC9; }
.bg-maroon { background-color: #85144B; }
.bg-white { background-color: #FFFFFF; }
.bg-gray { background-color: #AAAAAA; }
.bg-silver { background-color: #DDDDDD; }
.bg-black { background-color: #111111; }
/* Colors */
.navy { color: #001F3F; }
.blue { color: #0074D9; }
.aqua { color: #7FDBFF; }
.teal { color: #39CCCC; }
.olive { color: #3D9970; }
.green { color: #2ECC40; }
.lime { color: #01FF70; }
.yellow { color: #FFDC00; }
.orange { color: #FF851B; }
.red { color: #FF4136; }
.fuchsia { color: #F012BE; }
.purple { color: #B10DC9; }
.maroon { color: #85144B; }
.white { color: #FFFFFF; }
.silver { color: #DDDDDD; }
.gray { color: #AAAAAA; }
.black { color: #111111; }
/* Border colors 

   Use with another border utility that sets border-width and style 
   i.e .border { border-width: 1px); border-style: solid); }     
*/
.border--navy { border-color: #001F3F; }
.border--blue { border-color: #0074D9; }
.border--aqua { border-color: #7FDBFF; }
.border--teal { border-color: #39CCCC; }
.border--olive { border-color: #3D9970; }
.border--green { border-color: #2ECC40; }
.border--lime { border-color: #01FF70; }
.border--yellow { border-color: #FFDC00; }
.border--orange { border-color: #FF851B; }
.border--red { border-color: #FF4136; }
.border--fuchsia { border-color: #F012BE; }
.border--purple { border-color: #B10DC9; }
.border--maroon { border-color: #85144B; }
.border--white { border-color: #FFFFFF; }
.border--gray { border-color: #AAAAAA; }
.border--silver { border-color: #DDDDDD; }
.border--black { border-color: #111111; }
/* Fills for SVG */
.fill-navy { fill: #001F3F; }
.fill-blue { fill: #0074D9; }
.fill-aqua { fill: #7FDBFF; }
.fill-teal { fill: #39CCCC; }
.fill-olive { fill: #3D9970; }
.fill-green { fill: #2ECC40; }
.fill-lime { fill: #01FF70; }
.fill-yellow { fill: #FFDC00; }
.fill-orange { fill: #FF851B; }
.fill-red { fill: #FF4136; }
.fill-fuchsia { fill: #F012BE; }
.fill-purple { fill: #B10DC9; }
.fill-maroon { fill: #85144B; }
.fill-white { fill: #FFFFFF; }
.fill-gray { fill: #AAAAAA; }
.fill-silver { fill: #DDDDDD; }
.fill-black { fill: #111111; }
/* Strokes for SVG */
.stroke-navy { stroke: #001F3F; }
.stroke-blue { stroke: #0074D9; }
.stroke-aqua { stroke: #7FDBFF; }
.stroke-teal { stroke: #39CCCC; }
.stroke-olive { stroke: #3D9970; }
.stroke-green { stroke: #2ECC40; }
.stroke-lime { stroke: #01FF70; }
.stroke-yellow { stroke: #FFDC00; }
.stroke-orange { stroke: #FF851B; }
.stroke-red { stroke: #FF4136; }
.stroke-fuchsia { stroke: #F012BE; }
.stroke-purple { stroke: #B10DC9; }
.stroke-maroon { stroke: #85144B; }
.stroke-white { stroke: #FFFFFF; }
.stroke-gray { stroke: #AAAAAA; }
.stroke-silver { stroke: #DDDDDD; }
.stroke-black { stroke: #111111; }
```

### More Open Source Color Systems

- [LCH - Natural](https://components.ai/theme/LSFBhQYkSnSDqZ1qzJjN)
- [LCH - B-Spline](https://components.ai/theme/eVFeV340xXtXCv4Ne3Wx)
- [LCH - Linear](https://components.ai/theme/XIM7Jo6uxkBEgnfbqrxK)
- [LCH - Monotone](https://components.ai/theme/5t1N11PUhqqsxmLudFpY)
- [LAB - Natural](https://components.ai/theme/A2zudJ4qzc4bLoUVBAZ3)
- [LAB - B-Spline](https://components.ai/theme/N9DlRkNZZagzZJTDi4Wr)
- [LAB - Linear](https://components.ai/theme/Jg0GRCvBLm6RbjeOCzLs)
- [LAB - Monotone](https://components.ai/theme/LZ23GsXttzH7Q3Y0OIHM)
- [RGB - Natural](https://components.ai/theme/K4C98oSFrgkCLOoQhXbJ)
- [RGB - B-Spline](https://components.ai/theme/IDL04FzjDpCEOg5NiW6i)
- [RGB - Linear](https://components.ai/theme/eab3gpmHglpIYDIUEYcl)
- [RGB - Monotone](https://components.ai/theme/3RD5FJ1wOaGAjmV2WE2j)



## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Authors

* [mrmrs](http://mrmrs.cc)
* [johno](http://johnotander.com)

## License

MIT

