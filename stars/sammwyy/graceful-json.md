---
repo: sammwyy/graceful-json
url: 'https://github.com/sammwyy/graceful-json'
homepage: 'https://www.npmjs.com/package/graceful-json'
starredAt: '2025-06-15T16:23:36Z'
createdAt: '2025-06-03T13:17:02Z'
updatedAt: '2025-06-19T20:48:20Z'
language: TypeScript
license: NA
branch: main
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-06-28T22:31:13.754Z'
description: A graceful JSON parser and serializer with fallback handling.
tags:
  - browser
  - bun
  - graceful
  - json
  - json-parser
  - llm
  - node
  - nodejs
  - parse
  - serializer
  - typescript
---

# Graceful JSON

A robust TypeScript/JavaScript library for parsing JSON from potentially malformed text. Perfect for handling LLM responses that may contain extra text, markdown formatting, or slightly invalid JSON syntax.

## Features

- 🤖 **LLM-Friendly**: Designed specifically for parsing AI/LLM responses
- 🛠️ **Auto-Repair**: Attempts to fix common JSON formatting issues
- 📝 **Markdown Support**: Handles JSON inside markdown code blocks
- 🔍 **Multiple Extraction**: Finds and parses multiple JSON objects in a single text
- 🎯 **Flexible Options**: Configurable parsing behavior
- 🌐 **Universal**: Works in Node.js, Bun, browsers, and other JS environments
- 💪 **TypeScript**: Full TypeScript support with comprehensive type definitions

## Installation

```bash
# npm
npm install graceful-json

# yarn
yarn add graceful-json

# pnpm
pnpm add graceful-json

# bun
bun add graceful-json
```

## Quick Start

```typescript
import { parseAllJSON, parseJSON } from 'graceful-json';

// Parse LLM response with extra text
const llmResponse = `
  Sure! Here's the data you requested:
  
  {"name": "John", "age": 30, "city": "New York"}
  
  Hope this helps!
`;

const results = parseAllJSON(llmResponse);
console.log(results[0].value); // { name: "John", age: 30, city: "New York" }

// Extract just the values
const values = parseJSON(llmResponse);
console.log(values); // [{ name: "John", age: 30, city: "New York" }]
```

## API Reference

### Usage

```typescript
import { GracefulJSON, parseAllJSON, parseJSON } from 'graceful-json';

// Class based
const parser = new GracefulJSON({
  includeArrays: true,
  includePrimitives: false,
  attemptRepair: true
});

const results = parser.parseAll(text);

// Function based
const allResults = parseAllJSON(text, { ... });

const onlyValues = parseJSON(text, { ... });
```

### Configuration Options

```typescript
interface ParseOptions {
  /** Whether to include arrays as valid JSON objects (default: true) */
  includeArrays?: boolean;
  
  /** Whether to include primitive values like strings, numbers (default: false) */
  includePrimitives?: boolean;
  
  /** Maximum depth to search for nested JSON (default: 10) */
  maxDepth?: number;
  
  /** Whether to attempt to fix common JSON formatting issues (default: true) */
  attemptRepair?: boolean;
}
```

### Result Interface

```typescript
interface ParseResult {
  /** The parsed JSON value */
  value: any;
  
  /** The original text that was parsed */
  originalText: string;
  
  /** Start position in the original input */
  startIndex: number;
  
  /** End position in the original input */
  endIndex: number;
  
  /** Whether the JSON was repaired during parsing */
  wasRepaired: boolean;
}
```

## Use Cases

### 1. LLM Response Parsing

```typescript
const llmResponse = `
  Here's your JSON data:

  \`\`\`json
  {
    "users": [
      {"id": 1, "name": "Alice"},
      {"id": 2, "name": "Bob"}
    ]
  }
  \`\`\`

  The data includes 2 users.
`;

const data = parseJSON(llmResponse);
console.log(data.users); // [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]
```

### 2. Multiple JSON Objects

```typescript
const text = `
  First: {"type": "user", "name": "Alice"}
  Second: {"type": "admin", "name": "Bob"}
  Array: [1, 2, 3]
`;

const values = parseJSON(text);
// Returns: [{"type": "user", "name": "Alice"}, {"type": "admin", "name": "Bob"}, [1, 2, 3]]
```

## Common JSON Repairs

The library automatically attempts to fix:

- Single quotes → Double quotes
- Unquoted object keys
- Trailing commas
- Missing commas between elements
- JavaScript-style comments
- Common formatting issues

## Environment Compatibility

- ✅ Node.js (16+)
- ✅ Bun
- ✅ Modern browsers
- ✅ TypeScript
- ✅ ESM and CommonJS

## License

MIT License

## Contribute

Pull requests and stars are always welcome. For more information, check out the [GitHub repository](https://github.com/sammwyy/graceful-json).
