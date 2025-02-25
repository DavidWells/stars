---
repo: pilcrowonpaper/object-parser
url: 'https://github.com/pilcrowonpaper/object-parser'
homepage: ''
starredAt: '2024-07-19T15:53:30Z'
createdAt: '2024-07-19T13:10:07Z'
updatedAt: '2024-12-11T21:23:25Z'
language: TypeScript
license: MIT
branch: main
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:28.431Z'
description: A small library for parsing objects.
tags: []
---

# Object parser

A small library for parsing objects.

```ts
import { ObjectParser } from "@pilcrowjs/object-parser";

const response = await fetch("https://api.example.com/users/6493");
const result: unknown = await response.json();
const parser = new ObjectParser(result);

if (parser.has("error")) {
	const error = parser.getString("error");
} else {
	const userId = parser.getNumber("id");
	const username = parser.getString("username");
	const profilePicture = parser.getString("picture", "medium");
	const friends = parser.getArray("friends").map((friend) => {
		return new ObjectParser(friend).getString("username");
	});
}
```

```json
{
	"error": "Invalid user ID"
}
```

```json
{
	"id": 6493,
	"username": "pilcrow",
	"icons": {
		"small": "https://images.example.com/user/6493/128px.jpg",
		"medium": "https://images.example.com/user/6493/256px.jpg",
		"large": "https://images.example.com/user/6493/512px.jpg"
	},
	"friends": [
		{
			"id": 4456,
			"username": "lucy"
		}
	]
}
```

## Installation

```
npm install @pilcrowjs/object-parser
```

## API

```ts
class ObjectParser {
	constructor(value: unknown): this;

	has(...path: string[]): boolean;
	get(...path: string[]): unknown;
	isString(...path: string[]): boolean;
	getString(...path: string[]): string;
	isNumber(...path: string[]): boolean;
	getNumber(...path: string[]): number;
	isBoolean(...path: string[]): boolean;
	getBoolean(...path: string[]): boolean;
	isBigInt(...path: string[]): boolean;
	getBigInt(...path: string[]): bigint;
	// Note: 'null' is not considered an object.
	isObject(...path: string[]): boolean;
	getObject(...path: string[]): object;
	isArray(...path: string[]): boolean;
	getArray(...path: string[]): unknown[];
	isNull(...path: string[]): boolean;
	isUndefined(...path: string[]): boolean;
	createParser(...path: string[]): ObjectParser;
}
```
