---
repo: DavidWells/targeted-test-runner
url: 'https://github.com/DavidWells/targeted-test-runner'
homepage: ''
starredAt: '2025-06-05T23:28:01Z'
createdAt: '2025-06-04T18:18:28Z'
updatedAt: '2025-06-13T00:38:25Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-06-14T22:31:10.697Z'
description: Discover and run tests with ease
tags: []
---

# Targeted Test Runner (tt)

A CLI tool for running specific tests by description without manually modifying test files.

## Installation

```bash
npm install targeted-test-runner -g
```

## Usage

`tt --help`

### Basic Usage

Run all test files in the current directory:

```bash
tt
```

Run a specific test by its description:

```bash
tt "should handle user login"
```

The tool will:
1. Find all test files in the current directory
2. Fuzzy match the test description (if provided)
3. Create a temporary file with `.only` added to the matched test (if description provided)
4. Run the test(s)
5. Clean up any temporary files

### Examples

```bash
# Run all tests in the current directory
tt

# List all available tests
tt --list

# Run a specific test by description
tt "should handle user login"

# Run all tests matching a description
tt "login" --all

# Run all tests in a specific file
tt src/tests/auth.test.js

# Run tests in a specific file matching a description
tt src/tests/auth.test.js "login"

# Run all tests in a directory
tt src/tests/

# Run tests in a directory matching a description
tt src/tests/ "login"
```

### Advanced Usage

#### Run Tests from a Specific File

Run tests from a specific file by providing the file path first:

```bash
tt ./path/to/test.js "test description"
```

#### Run All Matching Tests

Use the `-a` or `--all` flag to run all matching tests instead of just the best match:

```bash
# Run all tests matching the description
tt "test description" -a 

# Run all tests from a specific file matching the description
tt ./path/to/test.js "test description" -a 
```

#### Example

Given a test file `test-file.test.js`

```js
// test-file.test.js
const { test } = require('uvu')
const assert = require('uvu/assert')

test('test one', () => {
  assert.equal(1, 1)
})

test('test two', () => {
  assert.equal(2, 2)
})

test.run()
```

You can target specific tests:

```bash
tt test-file.test.js "two"
```

This will automagically create a temp file with `test.only` applied to our matches:

```js
// test-file.test.js
const { test } = require('uvu')
const assert = require('uvu/assert')

test('test one', () => {
  assert.equal(1, 1)
})

test.only('test two', () => {
  assert.equal(2, 2)
})

test.run()
```

Run specific tests:

```bash
# Run all test files in the directory
tt

# Run the best matching test with description matching "foo"
tt 'foo'

# Run all tests containing 'api requests'
tt 'api requests' --all

# Run tests only from a specific file
tt ./path/to/test.js 'test description xyz'

# Run all tests in a dir
tt ./path/to/dir

# Run tests only from a dir that match `xyz`
tt ./path/to/dir 'xyz'

# Run all matching tests from a specific file
tt ./path/to/test.js 'test' --all
```

## Configuration

### Debug Logging

Enable debug logging by setting the `DEBUG` environment variable:

```bash
DEBUG=tt:* tt 'test description'
```

Available debug namespaces:
- `tt:cli`: CLI operations
- `tt:processor`: Test file processing
- `tt:runner`: Test execution

## Development

### Setup

```bash
npm install
```

### Running Tests

```bash
npm test
```

### Project Structure

```
.
├── src/
│   ├── index.js           # CLI entry point
│   └── utils/
│       ├── logger.js      # Logging configuration
│       ├── test-processor.js  # Test file processing
│       ├── test-runner.js # Test execution
│       └── cleanup.js     # Temporary file cleanup
├── tests/
│   ├── unit/             # Unit tests
│   └── integration/      # Integration tests
└── fixtures/             # Test fixtures
```

## License

ISC
