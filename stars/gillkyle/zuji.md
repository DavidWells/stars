---
repo: gillkyle/zuji
url: 'https://github.com/gillkyle/zuji'
homepage: 'https://zuji-ts.vercel.app/'
starredAt: '2025-05-30T21:24:20Z'
createdAt: '2025-01-09T05:42:14Z'
updatedAt: '2025-05-30T21:24:21Z'
language: TypeScript
license: MIT
branch: main
stars: 25
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-31T21:04:40.721Z'
description: 'Tiny (900B) TypeScript first, human-readable numeric formatting'
tags:
  - format
  - formatter
  - formatting
  - javascript
  - number
  - number-formatter
  - numeral
  - types
  - typescript
---

<div align="center">
  <h1>千 zuji</h1>
  <br/>
  <div><strong>TypeScript first, human-readable numeric formatting</strong></div>
  <span>1540 → 1.5k</span>
  <h1></h1>
</div>

zuji is a developer friendly API for formatting numbers. It is:

- **straightforward to pick up** - the entire API surface is a single function + a few exported types if you need them
- **standards based** - extends the `Intl.NumberFormat` API, making it consistent with JavaScript runtimes
- **comprehensive** - covers virtually every option you need to format numbers, supporting every ISO standard locale
- **tiny** - [~900 bytes](https://bundlephobia.com/package/zuji@1.0.8) with zero dependencies and single purpose
- **flexible** - when you need to configure it further

## Installation

```bash
npm install zuji
# or
pnpm add zuji
# or
yarn add zuji
# or
bun add zuji
```

## Usage

```js
import { zuji } from "zuji";

// use shortcuts
// -> currency
zuji(1234.56, "compact-currency-usd"); // "$1.23K"

// -> integer
zuji(1234, "standard-integer"); // "1,234"

// -> percentage
zuji(0.1234, "compact-percent"); // "12%"

// or fallback to an even narrower typed Intl.NumberFormatOptions
// -> currency without trailing zeros, in accounting notation
zuji(-1050, {
  style: "currency",
  currency: "USD",
  currencySign: "accounting",
  trailingZeroDisplay: "stripIfInteger",
}); // "($1,050)"
```

## Why zuji?

Number formatting is simple on the surface but becomes increasingly complex when you introduce:

- Different grouping separators (1,000 in US vs 1.000 in Spain)
- Currencies ($ vs ¥)
- Notations (1,000,000 vs 1M vs 1e6)
- Rounding (0.99 -> 100% vs 0.99 -> 99%)
- And more...

zuji gives you a method to cover these problems out of the box. **You won't have to learn a new formatting grammar or pour through MDN docs to get it right**.

## Built-in Shortcuts

The easiest way to format numbers is using pre-configured shortcuts:

- `standard-decimal` - Normal decimal with grouping and no rounding
- `standard-integer` - Number with grouping rounded to integer
- `compact-decimal` - Abbreviated number with shortened label
- `compact-integer` - Abbreviated number rounded to integer
- `standard-percent` - Percentage with grouping and decimals
- `compact-percent` - Percentage without decimals
- `standard-currency-usd` - US Dollar currency
- `compact-currency-usd` - Abbreviated US Dollar currency
- `accounting-currency-usd` - US Dollar with accounting notation
- And more...

## API Reference

zuji takes two arguments:

1. **value** - The number to format
2. **options** - Either a pre-configured string shortcut or a typed `ZujiOptions` object

The `ZujiOptions` object supports all `Intl.NumberFormat` options including:

- `style` - decimal, currency, percent, unit
- `notation` - standard, scientific, engineering, compact
- `unit` - kilometer, celsius, megabyte, etc.
- `currency` - USD, EUR, JPY, etc.
- `signDisplay` - auto, always, never, exceptZero
- `roundingMode` - halfExpand, ceil, floor, etc.
- And many more...

See the [full documentation](https://zuji-ts.vercel.app) for complete examples and API reference.

## TypeScript

zuji is written in TypeScript and exports helper types including `ZujiShortcut` and `ZujiOptions`. Intellisense and autocomplete with descriptive examples will show up in your editor for any option you provide.

## Why the name?

The name zuji comes from the Japanese word sūji (数字), which means "number" or "numeral".

## Playground

See the [interactive playground](https://zuji-ts.vercel.app/#playground) to explore the API and test out formatting options.

## License

MIT © [Kyle Gill](https://github.com/gillkyle)
