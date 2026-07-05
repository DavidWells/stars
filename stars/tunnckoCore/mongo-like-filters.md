---
repo: tunnckoCore/mongo-like-filters
url: 'https://github.com/tunnckoCore/mongo-like-filters'
homepage: ''
starredAt: '2025-08-03T15:23:36Z'
createdAt: '2025-08-03T12:16:51Z'
updatedAt: '2025-08-05T16:02:40Z'
language: TypeScript
license: MPL-2.0
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-08-23T22:30:27.362Z'
description: >-
  A lightweight, type-safe TypeScript library for filtering objects using
  MongoDB-style query syntax
tags: []
---

# mongo-like-filters

A lightweight, type-safe TypeScript library for filtering objects using MongoDB-style query syntax.
Perfect for client-side filtering, in-memory data processing, and anywhere you need powerful object
querying without a database.

## ✨ Features

- 🎯 **MongoDB-style syntax** - Familiar query operators like `_eq`, `_gt`, `_in`, `_regex`, etc.
- 🔍 **Deep object traversal** - Query nested properties with dot notation (`profile.location.city`)
- 📋 **Array support** - Filter arrays with `_elemMatch` and direct index access (`items.0.name`)
- 🔤 **String operations** - Case-sensitive and case-insensitive string matching
- 📏 **Size operations** - Check array/string/object sizes with flexible comparison
- 🎛️ **Logical operators** - Complex queries with `_and`, `_or`, `_not`
- 📅 **Date support** - Native Date object comparisons
- 🛡️ **Type-safe** - Full TypeScript support with proper type definitions
- 🚀 **Zero dependencies** - Lightweight and fast
- 🔧 **Extensible** - Custom field extractors for advanced use cases

## 📦 Installation

```bash
npm install mongo-like-filters
```

## 🚀 Quick Start

```typescript
import { matches } from 'mongo-like-filters';

const users = [
  { name: 'John', age: 30, roles: ['admin'] },
  { name: 'Jane', age: 25, roles: ['user'] },
  { name: 'Bob', age: 35, roles: ['user', 'moderator'] },
];

// Simple equality
const johns = users.filter((user) => matches({ name: 'John' }, user));

// Comparison operators
// NOTE: matches returns matcher function when called with no second argument
const adults = users.filter(matches({ age: { _gte: 30 } }));

// Array operations
const admins = users.filter((user) => matches({ roles: 'admin' }, user));

// Complex queries
const matcher = matches({
  _and: [{ age: { _gt: 25 } }, { roles: { _in: ['user', 'moderator'] } }],
});

const seniorUsers = users.filter(matcher);
```

## 📖 API Reference

### matches(expression, data, extractor?)

Main function to test if a record matches the given filter expression.

**Parameters:**

- `expression`: Filter expression object
- `data`: Object(s) to test against
- `extractor?`: Optional custom field extractor function

**Returns:** `boolean`

## 🎯 Complete Operator Reference

### Equality and Comparison Operators

#### `_eq` (Equal) / Direct Assignment

```typescript
// These are equivalent
matches({ age: 30 }, user);
matches({ age: { _eq: 30 } }, user);

// Works with any type
matches({ name: 'John' }, user);
matches({ active: true }, user);
matches({ createdAt: new Date('2025-01-15') }, user);
```

#### `_ne` (Not Equal)

```typescript
matches({ status: { _ne: 'deleted' } }, user);
matches({ age: { _ne: 25 } }, user);
```

#### Numerical Comparisons

```typescript
// Greater than
matches({ age: { _gt: 25 } }, user);

// Greater than or equal
matches({ age: { _gte: 30 } }, user);

// Less than
matches({ score: { _lt: 100 } }, user);

// Less than or equal
matches({ rating: { _lte: 4.5 } }, user);

// Works with dates too
matches({ createdAt: { _gt: new Date('2024-01-01') } }, user);
```

### String Operators

#### Case-Sensitive String Operations

```typescript
// Contains substring
matches({ email: { _contains: 'gmail' } }, user);

// Starts with
matches({ name: { _startsWith: 'J' } }, user);

// Ends with
matches({ email: { _endsWith: '.com' } }, user);
```

#### Case-Insensitive String Operations

```typescript
// Case-insensitive contains
matches({ email: { _icontains: 'GMAIL' } }, user);

// Case-insensitive starts with
matches({ name: { _istartsWith: 'j' } }, user);

// Case-insensitive ends with
matches({ email: { _iendsWith: '.COM' } }, user);
```

#### Regular Expression Matching

```typescript
// Email validation
matches({ email: { _regex: '^[a-z]+@gmail\\.com$' } }, user);

// Phone number patterns
matches({ phone: { _regex: '^\\+1\\d{10}$' } }, user);
```

### Array Operators

#### Array Value Membership

```typescript
// Check if value is in array
matches({ status: { _in: ['active', 'pending', 'verified'] } }, user);

// Check if value is NOT in array
matches({ role: { _nin: ['banned', 'suspended'] } }, user);
```

#### Array Contains Value (Direct Assignment)

When you assign a value directly to an array field, it checks if the array contains that value:

```typescript
const user = { roles: ['user', 'admin'] };

// Check if array contains "admin"
matches({ roles: 'admin' }, user); // true
matches({ roles: 'guest' }, user); // false

// For array equality, use _eq explicitly
matches({ roles: { _eq: ['user', 'admin'] } }, user); // true (exact match)
```

#### `_elemMatch` - Matching Objects in Arrays

**Important**: `_elemMatch` is specifically designed for arrays containing objects, not primitive
values.

```typescript
const user = {
  projects: [
    { name: 'Website', status: 'active', priority: 'high' },
    { name: 'Mobile App', status: 'completed', priority: 'medium' },
    { name: 'API', status: 'pending', priority: 'high' },
  ],
};

// Find users with active high-priority projects
matches(
  {
    projects: {
      _elemMatch: {
        status: 'active',
        priority: 'high',
      },
    },
  },
  user,
); // true

// Complex conditions within _elemMatch
matches(
  {
    projects: {
      _elemMatch: {
        _and: [{ status: { _ne: 'completed' } }, { priority: { _in: ['high', 'critical'] } }],
      },
    },
  },
  user,
);
```

### The `_size` Operator - Comprehensive Guide

The `_size` operator is versatile and works differently depending on the target:

#### Array Size

```typescript
const user = { roles: ['user', 'admin'], tags: [] };

// Exact size
matches({ roles: { _size: 2 } }, user); // true
matches({ tags: { _size: 0 } }, user); // true

// Size with comparison operators
matches({ roles: { _size: { _gt: 1 } } }, user); // true
matches({ roles: { _size: { _gte: 2 } } }, user); // true
matches({ roles: { _size: { _lt: 5 } } }, user); // true

// for arrays, you can skip the _size operator
matches({ roles: { _gt: 1 } }, user); // true
matches({ roles: { _gte: 2 } }, user); // true
matches({ roles: { _lt: 5 } }, user); // true
```

#### String Length

```typescript
const user = { name: 'John', bio: '' };

// Exact length
matches({ name: { _size: 4 } }, user); // true
matches({ bio: { _size: 0 } }, user); // true

// Length with comparisons
matches({ name: { _size: { _gte: 3 } } }, user); // true
matches({ bio: { _size: { _eq: 0 } } }, user); // true
```

#### Object Property Count

```typescript
const user = {
  settings: { theme: 'dark', notifications: true },
  emptyObj: {},
};

// Count of object keys
matches({ settings: { _size: 2 } }, user); // true (2 properties)
matches({ emptyObj: { _size: 0 } }, user); // true (no properties)

// Property count with comparisons
matches({ settings: { _size: { _gt: 1 } } }, user); // true
```

### Logical Operators

#### `_and` - All Conditions Must Match

```typescript
matches(
  {
    _and: [{ age: { _gte: 25 } }, { status: 'active' }, { roles: { _size: { _gt: 0 } } }],
  },
  users,
);

// Multiple conditions at the same level are implicitly AND
matches(
  {
    age: { _gte: 25 },
    status: 'active',
    verified: true,
  },
  user,
);
```

#### `_or` - Any Condition Must Match

```typescript
matches(
  {
    _or: [{ role: 'admin' }, { permissions: { _contains: 'write' } }, { age: { _gt: 65 } }],
  },
  user,
);
```

#### `_not` - Condition Must NOT Match

```typescript
matches(
  {
    _not: { status: 'deleted' },
  },
  user,
);

// Complex negation
matches(
  {
    _not: {
      _and: [{ role: 'guest' }, { verified: false }],
    },
  },
  user,
);
```

### Existence Operator

#### `_exists` - Field Presence Check

```typescript
// Field must exist (not null or undefined)
matches({ 'profile.bio': { _exists: true } }, user);

// Field must not exist (null or undefined)
matches({ deletedAt: { _exists: false } }, user);

// Works with nested properties
matches({ 'settings.theme': { _exists: true } }, user);
```

### Nested Object Access with Dot Notation

#### Deep Property Access

```typescript
const user = {
  profile: {
    location: {
      city: 'New York',
      country: 'USA',
    },
  },
};

matches({ 'profile.location.city': 'New York' }, user);
matches({ 'profile.location.country': { _ne: 'Canada' } }, user);
```

#### Array Index Access

```typescript
const user = {
  skills: ['JavaScript', 'TypeScript', 'React'],
  projects: [
    { name: 'App 1', status: 'active' },
    { name: 'App 2', status: 'completed' },
  ],
};

// Access specific array indices
matches({ 'skills.0': 'JavaScript' }, user);
matches({ 'skills.2': { _contains: 'React' } }, user);

// Access nested properties in array elements
matches({ 'projects.0.status': 'active' }, user);
matches({ 'projects.1.name': { _startsWith: 'App' } }, user);
```

#### Automatic Array Traversal

The library automatically traverses arrays when using dot notation:

```typescript
const company = {
  employees: [
    {
      name: 'John',
      skills: [
        { name: 'JavaScript', level: 'expert' },
        { name: 'Python', level: 'intermediate' },
      ],
    },
    {
      name: 'Jane',
      skills: [
        { name: 'Java', level: 'expert' },
        { name: 'JavaScript', level: 'advanced' },
      ],
    },
  ],
};

// Automatically traverses employees array and skills array
matches({ 'employees.skills.name': 'JavaScript' }, company); // true

// Works with operators too
matches({ 'employees.skills.level': { _in: ['expert', 'advanced'] } }, company);
```

## 🔍 Advanced Examples

### Complex Filtering Scenarios

```typescript
const products = [
  {
    name: 'Laptop',
    price: 999,
    categories: ['electronics', 'computers'],
    specs: { ram: '16GB', storage: '512GB' },
    reviews: [
      { rating: 5, comment: 'Excellent!' },
      { rating: 4, comment: 'Good value' },
    ],
  },
];

// Multi-level complex query
const premiumLaptops = products.filter((product) =>
  matches(
    {
      _and: [
        { price: { _gte: 800 } },
        { categories: 'electronics' },
        { 'specs.ram': { _regex: '1[6-9]GB|[2-9][0-9]GB' } }, // 16GB or more
        {
          reviews: {
            _elemMatch: {
              rating: { _gte: 4 },
            },
          },
        },
      ],
    },
    product,
  ),
);
```

### Date Range Filtering

```typescript
const events = [
  { name: 'Conference', date: new Date('2025-02-15') },
  { name: 'Workshop', date: new Date('2025-03-20') },
];

// Events in Q1 2025
const q1Events = events.filter((event) =>
  matches(
    {
      _and: [{ date: { _gte: new Date('2025-01-01') } }, { date: { _lt: new Date('2025-04-01') } }],
    },
    event,
  ),
);
```

## ⚠️ Edge Cases and Important Behavior

### Array Filtering vs Element Matching

```typescript
const user = { roles: ['user', 'admin'] };

// Different behaviors:
matches({ roles: 'admin' }, user); // true - contains "admin"
matches({ roles: { _eq: ['user', 'admin'] } }, user); // true - exact array match
matches({ roles: { _eq: ['admin', 'user'] } }, user); // false - different order
matches({ roles: { _in: ['user', 'admin'] } }, user); // true - contains any of the elements
matches({ roles: { _size: 2 } }, user); // true - array size matches
matches({ 'roles.0': { _eq: 'user' } }}, user) // true - first element matches
```

### Null and Undefined Handling

```typescript
const user = { name: 'John', age: null, bio: undefined };

matches({ age: null }, user); // true, exact match
matches({ age: { _exists: true } }, user); // false, `null` and `undefined` are not considered as existing values
matches({ age: { _exists: false } }, user); // true
matches({ bio: { _exists: false } }, user); // true
matches({ bio: { _exists: true } }, user); // false
matches({ missing: { _exists: false } }, user); // true
```

### Empty Values with Size

```typescript
const data = {
  emptyArray: [],
  emptyString: '',
  emptyObject: {},
};

matches({ emptyArray: { _size: 0 } }, data); // true
matches({ emptyString: { _size: 0 } }, data); // true
matches({ emptyObject: { _size: 0 } }, data); // true
```

### Logical Operator Conflicts

```typescript
// ❌ This will throw a FilterError
try {
  matches({ _and: [...], _or: [...] }, user); // Cannot use both at same level
} catch (error) {
  console.log(error instanceof FilterError); // true
}

// ✅ Correct way to combine
matches({
  _and: [
    { age: { _gt: 18 } },
    {
      _or: [
        { role: "admin" },
        { verified: true }
      ]
    }
  ]
}, user);
```

## 🔧 Custom Field Extractors

Customize how fields are extracted from objects:

```typescript
// Case-insensitive field extraction
const caseInsensitiveExtractor = (obj: any, key: string) => {
  const value = obj[key];
  return typeof value === 'string' ? value.toLowerCase() : value;
};

const user = { name: 'John Doe' };
matches({ name: 'john doe' }, user, caseInsensitiveExtractor); // true

// Custom transformation
const trimExtractor = (obj: any, key: string) => {
  const value = obj[key];
  return typeof value === 'string' ? value.trim() : value;
};
```

## 🚀 Performance Tips

- Use specific comparison operators (`_eq`, `_gt`) rather than regex when possible
- Structure `_and` conditions with the most selective filters first
- Use `_exists: false` instead of complex null/undefined checks
- For large datasets, consider pre-filtering with simple conditions before complex ones

## 🐛 Error Handling

The library throws `FilterError` for invalid expressions:

```typescript
import { FilterError } from 'mongo-like-filters';

try {
  matches({ _and: [], _or: [] }, user); // Invalid: both _and and _or at same level
} catch (error) {
  if (error instanceof FilterError) {
    console.log('Filter error:', error.message);
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open
an issue first to discuss what you would like to change.

## 📄 License

MPL-2.0 License - see the [LICENSE](./LICENSE.md) file for details.
