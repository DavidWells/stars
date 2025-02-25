---
repo: uber/baseweb
url: 'https://github.com/uber/baseweb'
homepage: 'https://baseweb.design'
starredAt: '2020-06-05T14:57:02Z'
createdAt: '2018-03-09T01:32:10Z'
updatedAt: '2025-02-25T07:08:39Z'
language: TypeScript
license: MIT
branch: main
stars: 8787
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:50.170Z'
description: A React Component library implementing the Base design language
tags:
  - component-library
  - design-systems
  - react
  - react-components
---

**Uber is hiring in Amsterdam. Do you want to work on Base Web and other things? <a href="https://www.uber.com/global/en/careers/list/130852/">Please apply!</a>**

<h1>Base Web React Components</h1>

- [Documentation](https://baseweb.design)
- [Component catalog](https://baseweb.design/ladle)
- [Stackblitz playground](https://baseweb.design/new)

⚠️ **Maintenance status**. We are limiting our engagement with this repository while still mirroring our internal development. For more details, please check [Open Source Engagement and Future](https://baseweb.design/blog/open-source-engagement/). If you are an Uber developer and looking to open an issue, use this [link](https://t.uber.com/ui-platform-bug-2) or [contribute](https://p.uber.com/base-code).

**Base** is a design system comprised of modern, responsive, living components. Base Web is the React implementation of Base.

<p align="center">
  <a href="https://baseweb.design">
    <img width="500px" src="https://i.imgur.com/UaRZdTq.png">
  </a>
</p>

## Usage

On npm, you can find Base Web as `baseui`.

Add `baseui` and its peer dependencies to your project:

```bash
# using pnpm
pnpm add baseui@next styletron-react styletron-engine-monolithic

# using npm
npm install baseui@next styletron-react styletron-engine-monolithic
```

```javascript
import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
import { StatefulInput } from "baseui/input";

const engine = new Styletron();

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export default function Hello() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
          <StatefulInput />
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}
```

Both Base Web and Styletron come with [TypeScript](https://www.typescriptlang.org/index.html).

## Docs

To read the documentation, please visit [baseweb.design](https://baseweb.design). To preview more component examples, please visit [baseweb.design/ladle](https://baseweb.design/ladle).
