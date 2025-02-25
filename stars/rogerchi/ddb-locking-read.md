---
repo: rogerchi/ddb-locking-read
url: 'https://github.com/rogerchi/ddb-locking-read'
homepage: null
starredAt: '2024-12-05T16:51:10Z'
createdAt: '2024-12-05T16:33:22Z'
updatedAt: '2024-12-06T23:38:19Z'
language: TypeScript
license: NA
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:18.179Z'
description: null
tags: []
---

# DynamoDB Locking Read Pattern

This project demonstrates how to implement a distributed pessimistic locking pattern using Amazon DynamoDB's conditional expressions. It showcases a practical example of managing concurrent access in serverless and distributed systems.

## Overview

The example implements a hash chain where multiple processes try to:

1. Read the current hash
2. Generate the next N hashes in the chain
3. Update the stored hash

This demonstrates why locking is necessary - each process must read the current state before it can generate the next hash, and concurrent updates would break the chain.

## Features

- Pessimistic locking using DynamoDB conditional expressions
- Self-cleaning locks with automatic expiration
- Retry logic with random backoff
- Detailed logging of lock acquisition and processing
- Real computational work (hash generation) to simulate processing time

## Prerequisites

- Node.js and pnpm
- AWS credentials configured
- DynamoDB local or access to DynamoDB in AWS

## Installation

```bash
pnpm install
```

## Running the Example

1. Create the DynamoDB table and initial data:

```bash
pnpm setup
```

2. Run the example:

```bash
pnpm start
```

3. Clean up the DynamoDB table:

```bash
pnpm teardown
```

## How It Works

The code demonstrates a locking pattern where:

1. Processes attempt to acquire a lock using a conditional update
2. Only one process can hold the lock at a time
3. Locks automatically expire after a set duration
4. Failed lock acquisitions include information about the current lock holder
5. Processes retry with random backoff when lock acquisition fails

The example simulates real work by generating multiple rounds of SHA-256 hashes, showing how the locking pattern protects concurrent access to shared resources.

## Output

The program produces detailed logs showing:

- Lock acquisition attempts and timing
- Processing time for each hash generation
- Retry attempts and backoff delays
- Final sequence of all operations

## Project Structure

- `index.ts`: Main implementation of the locking pattern
- `setup.ts`: Creates the DynamoDB table and initial data
- `teardown.ts`: Cleans up the DynamoDB table
- `logger.ts`: Handles logging and visualization of the process sequence

## Learn More

For more details about DynamoDB locking patterns, see the accompanying blog post: [Practical DynamoDB - Locking Reads](https://dev.to/aws-builders/practical-dynamodb-locking-reads-4o4i).
