---
repo: revskill10/ream.js
url: 'https://github.com/revskill10/ream.js'
homepage: null
starredAt: '2025-07-16T17:25:09Z'
createdAt: '2025-07-16T14:28:44Z'
updatedAt: '2025-07-29T15:30:54Z'
language: TypeScript
license: MIT
branch: main
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-08-02T22:32:28.289Z'
description: The simplest Javascript Datetime library
tags: []
---

# ream.js

A comprehensive, functional datetime library for JavaScript/TypeScript with immutable data structures, **real IANA timezone database support**, and a plugin system.

## Features

- 🚀 **Functional Programming**: Pure functions and immutable data structures
- 🌍 **Real Timezone Database**: Full IANA timezone support with automatic DST detection
- 🕐 **DST Handling**: Accurate daylight saving time transitions and calculations
- 📅 **Calendar Arithmetic**: Safe date/time arithmetic with overflow handling
- 🎨 **Formatting System**: Comprehensive token-based formatting with locale support
- ⏱️ **Duration Operations**: Monoid operations and humanization
- 🔄 **Recurrence Generators**: Flexible recurring date/time patterns
- 🔌 **Plugin System**: Extensible architecture for custom functionality
- 📦 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 🌐 **Zero Dependencies**: Uses built-in `Intl` API for timezone data

## Installation

```bash
npm install ream.js
```

## Quick Start

```typescript
import ream from 'ream.js';

// Create dates
const date = ream('2023-07-15T14:30:45.123Z');
const now = ream();

// Chain operations
const result = date
  .add(1, 'days')
  .subtract(2, 'hours')
  .tz('America/New_York')
  .format('YYYY-MM-DD HH:mm:ss');

// Use generators
const monthly = everyMonth()(date);
const firstMonth = monthly.next().value;
const secondMonth = monthly.next().value;

// Use plugins
const extended = extend(relativePlugin)(date);
console.log(extended.fromNow()); // "2 hours ago"
```

## Core Types

- **Instant**: Point in time (epoch milliseconds)
- **Duration**: Time span with monoid operations
- **PlainDate**: Calendar date without timezone
- **PlainTime**: Time of day without timezone
- **PlainDateTime**: Combined date and time
- **ZDT**: Zoned DateTime with functor operations

## API Documentation

For complete API documentation, see the [REAM.md specification](./REAM.md).

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the library
npm run build

# Watch mode for development
npm run watch:test
```

## Real Timezone Database Support

ream.js includes comprehensive support for real IANA timezone data using the built-in JavaScript `Intl` API:

```typescript
import ream, { getTimezoneInfo, isDST, isValidTimezone } from 'ream.js';

// Real timezone information
const tzInfo = getTimezoneInfo('America/New_York', instant(Date.now()));
console.log(tzInfo);
// {
//   name: 'America/New_York',
//   offsetMinutes: -240,  // EDT (UTC-4) or -300 (EST, UTC-5)
//   dst: true,           // true during daylight saving time
//   abbreviation: 'EDT'  // timezone abbreviation
// }

// Enhanced ReamDate with timezone methods
const date = ream('2023-07-15T14:30:00', 'America/New_York');
console.log(date.timezone().name);        // 'America/New_York'
console.log(date.timezone().abbreviation); // 'EDT'
console.log(date.isDST());                // true
console.log(date.offset());               // -240

// Timezone validation and utilities
console.log(isValidTimezone('America/New_York')); // true
console.log(isDST('Europe/London'));              // depends on current date

// Convert between timezones
const utcDate = ream('2023-07-15T16:30:00Z');
const nyDate = utcDate.tz('America/New_York');
const londonDate = utcDate.tz('Europe/London');
```

### Features:
- ✅ Real IANA timezone data (no external dependencies)
- ✅ Automatic DST detection and handling
- ✅ Timezone abbreviations (EST, EDT, GMT, BST, etc.)
- ✅ Timezone validation
- ✅ Support for all IANA timezone identifiers
- ✅ Works in browsers and Node.js

See [TIMEZONE_FEATURES.md](./TIMEZONE_FEATURES.md) for comprehensive documentation.

## Publishing

This library uses automated npm publishing via GitHub Actions. To publish a new version:

1. Update the version in `package.json`
2. Create a new GitHub release with a tag matching the version (e.g., `v1.0.1`)
3. The GitHub Action will automatically run tests and publish to npm

### Setup NPM Publishing (for maintainers)

1. Create an npm account and generate an access token
2. Add the token as a GitHub secret named `NPM_TOKEN`
3. Ensure the package name in `package.json` is available on npm

## License

MIT
