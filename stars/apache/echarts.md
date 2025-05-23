---
repo: apache/echarts
url: 'https://github.com/apache/echarts'
homepage: 'https://echarts.apache.org'
starredAt: '2019-10-06T18:41:43Z'
createdAt: '2013-04-03T03:18:59Z'
updatedAt: '2025-02-25T18:16:51Z'
language: TypeScript
license: Apache-2.0
branch: master
stars: 61972
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:19.042Z'
description: >-
  Apache ECharts is a powerful, interactive charting and data visualization
  library for browser
tags:
  - apache
  - canvas
  - charting-library
  - charts
  - data-visualization
  - data-viz
  - echarts
  - svg
  - visualization
---

# Apache ECharts

<a href="https://echarts.apache.org/">
    <img style="vertical-align: top;" src="./asset/logo.png?raw=true" alt="logo" height="50px">
</a>

Apache ECharts is a free, powerful charting and visualization library offering easy ways to add intuitive, interactive, and highly customizable charts to your commercial products. It is written in pure JavaScript and based on <a href="https://github.com/ecomfe/zrender">zrender</a>, which is a whole new lightweight canvas library.

**[中文官网](https://echarts.apache.org/zh/index.html)** | **[ENGLISH HOMEPAGE](https://echarts.apache.org/en/index.html)**

[![License](https://img.shields.io/npm/l/echarts?color=5470c6)](https://github.com/apache/echarts/blob/master/LICENSE) [![Latest npm release](https://img.shields.io/npm/v/echarts?color=91cc75)](https://www.npmjs.com/package/echarts) [![NPM downloads](https://img.shields.io/npm/dm/echarts.svg?label=npm%20downloads&style=flat&color=fac858)](https://www.npmjs.com/package/echarts) [![Contributors](https://img.shields.io/github/contributors/apache/echarts?color=3ba272)](https://github.com/apache/echarts/graphs/contributors)

[![Build Status](https://github.com/apache/echarts/actions/workflows/ci.yml/badge.svg)](https://github.com/apache/echarts/actions/workflows/ci.yml)

## Get Apache ECharts

You may choose one of the following methods:

+ Download from the [official website](https://echarts.apache.org/download.html)
+ `npm install echarts --save`
+ CDN: [jsDelivr CDN](https://www.jsdelivr.com/package/npm/echarts?path=dist)

## Docs

+ [Get Started](https://echarts.apache.org/handbook)
+ [API](https://echarts.apache.org/api.html)
+ [Option Manual](https://echarts.apache.org/option.html)
+ [Examples](https://echarts.apache.org/examples)

## Get Help

+ [GitHub Issues](https://github.com/apache/echarts/issues) for bug report and feature requests
+ Email [dev@echarts.apache.org](mailto:dev@echarts.apache.org) for general questions
+ Subscribe to the [mailing list](https://echarts.apache.org/maillist.html) to get updated with the project

## Build

Build echarts source code:

Execute the instructions in the root directory of the echarts:
([Node.js](https://nodejs.org) is required)

```shell
# Install the dependencies from NPM:
npm install

# Rebuild source code immediately in watch mode when changing the source code.
# It opens the `./test` directory, and you may open `-cases.html` to get the list
# of all test cases.
# If you wish to create a test case, run `npm run mktest:help` to learn more.
npm run dev

# Check the correctness of TypeScript code.
npm run checktype

# If intending to build and get all types of the "production" files:
npm run release
```

Then the "production" files are generated in the `dist` directory.

## Contribution

Please refer to the [contributing](https://github.com/apache/echarts/blob/master/CONTRIBUTING.md) document if you wish to debug locally or make pull requests.

## Resources

### Awesome ECharts

[https://github.com/ecomfe/awesome-echarts](https://github.com/ecomfe/awesome-echarts)

### Extensions

+ [ECharts GL](https://github.com/ecomfe/echarts-gl) An extension pack of ECharts, which provides 3D plots, globe visualization, and WebGL acceleration.

+ [Liquidfill 水球图](https://github.com/ecomfe/echarts-liquidfill)

+ [Wordcloud 字符云](https://github.com/ecomfe/echarts-wordcloud)

+ [Extension for Baidu Map 百度地图扩展](https://github.com/apache/echarts/tree/master/extension-src/bmap) An extension provides a wrapper of Baidu Map Service SDK.

+ [vue-echarts](https://github.com/ecomfe/vue-echarts) ECharts component for Vue.js

+ [echarts-stat](https://github.com/ecomfe/echarts-stat) Statistics tool for ECharts

## License

ECharts is available under the Apache License V2.

## Code of Conduct

Please refer to [Apache Code of Conduct](https://www.apache.org/foundation/policies/conduct.html).

## Paper

Deqing Li, Honghui Mei, Yi Shen, Shuang Su, Wenli Zhang, Junting Wang, Ming Zu, Wei Chen.
[ECharts: A Declarative Framework for Rapid Construction of Web-based Visualization](https://www.sciencedirect.com/science/article/pii/S2468502X18300068).
Visual Informatics, 2018.
