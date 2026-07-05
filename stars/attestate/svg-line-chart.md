---
repo: attestate/svg-line-chart
url: 'https://github.com/attestate/svg-line-chart'
homepage: ''
starredAt: '2021-04-08T22:10:01Z'
createdAt: '2021-04-08T16:10:02Z'
updatedAt: '2025-02-16T16:41:07Z'
language: JavaScript
license: GPL-3.0
branch: main
stars: 26
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:52.050Z'
description: SVG chart generator library (works fully server-side)
tags: []
---

# svg-line-chart

[![npm version](https://badge.fury.io/js/svg-line-chart.svg)](https://badge.fury.io/js/svg-line-chart) [![Node.js CI](https://github.com/attestate/svg-line-chart/actions/workflows/node.js.yml/badge.svg)](https://github.com/attestate/svg-line-chart/actions/workflows/node.js.yml)

![logo](./assets/logo.png)

#### SVG chart generator library (works fully server-side)

#### [API Documentation](./API.md) | [Changelog](./CHANGELOG.md)

___

## Why another library for charts?

- **Runs on the server** - unlike all 99% available libraries
- **Minimum size** - browser-svg-line-chart.js is 34KB
  ([d3.min.js](https://cdnjs.cloudflare.com/ajax/libs/d3/6.6.2/d3.min.js) is
  264KB!); anyway size doesn't matter here as it runs on your server!
- Just generates a `<svg>` line chart. NO EXTRA JS OR CSS.
- Responsiveness through `<svg>` tag
- Unit tests & Small code base
- CJS and ESM bundles

## About

svg-line-chart is a server side charting library. Create a simple line chart with numbers on the y-axis and [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) or Integers on the x-axis.

## Screenshot

![](./assets/screenshot1.png)
![](./assets/screenshot2.png)

We use this in production at https://news.kiwistand.com/stats

## Installation

```bash
$ npm i svg-line-chart vhtml htm
```

## Usage

A working example can be found in
[`./scripts/serve.mjs`](./scripts/serve.mjs).

```js                                                        
import htm from "htm";
import vhtml from "vhtml";

const html = htm.bind(vhtml);

import { plot } from 'svg-line-chart'

const x = [
  "2021-01-01",
  "2021-02-01",
  "2021-03-01",
  "2021-04-01",
  "2021-05-01",
].map((d) => new Date(d));

const y = [1, 2, 3, 4, 5];

// chart is a html string that can be rendered by the browser
const chart = plot(html)(
  { x, y },
  {
    props: {
      style: "display:block;margin:0 auto;",
    },
    margin: 25,
    width: 70,
    height: 20,
    title: "A line chart",
    polygon: {
      fill: 'none',
      style: 'fill:url(#polygrad);',
      strokeWidth: 0.01,
      stroke: "white",
    },
    line: {
      fill: "none",
      strokeWidth: 0.1,
      stroke: "black",
    },
    polygonGradient: {
      offSet1: "0%",
      stopColor1: "#ffffff00",
      offSet2: "100%",
      stopColor2: "#ffffff00",
    },
    xAxis: {
      strokeWidth: 0.1,
      stroke: "black",
    },
    yAxis: {
      strokeWidth: 0.1,
      stroke: "black",
    },
    xLabel: {
      fontSize: 1.5,
      name: "Date"
    },
    yLabel: {
      fontSize: 1.5,
      name: "PRICE (EUR)",
      locale: "en-US",
    },
    xGrid: {
      strokeWidth: 0.05,
      stroke: "lightgrey",
    },
    yGrid: {
      strokeWidth: 0.05,
      stroke: "lightgrey",
    },
    yNumLabels: 10,
  }
)
```

### Notes

- `plot` will try to automatically scale the y labels based on how many labels
  you prefer using `yNumLabels`. Please note that the algorithm behind
  `yNumLabels` is based on a best-effort strategy. There won't be a guarantee
  that it'll return the number specified.
- You will probably need more than 31 days on the x axis for the date scaling to work.
  
## API
The API documentation is available at [API.md](./API.md).

## Contributing

We love contributions from the community. Find a [good first issue](https://github.com/attestate/svg-line-chart/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

Want to suggest a feature or even better raise a PR for it? Head over to the [issues](https://github.com/attestate/svg-line-chart/issues) section.
## Changelog
The changelog is avaliable at [CHANGELOG.md](./CHANGELOG.md).

## License

See [License](./LICENSE).

## References

- https://css-tricks.com/how-to-make-charts-with-svg/
