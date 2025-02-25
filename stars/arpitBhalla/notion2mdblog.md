---
repo: arpitBhalla/notion2mdblog
url: 'https://github.com/arpitBhalla/notion2mdblog'
homepage: 'https://www.npmjs.com/package/notion2mdblog'
starredAt: '2022-03-19T18:13:07Z'
createdAt: '2022-01-01T18:13:12Z'
updatedAt: '2023-10-16T16:34:01Z'
language: TypeScript
license: NA
branch: master
stars: 17
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:57.211Z'
description: "Convert notion page\U0001F4DC to markdown \U0001F516"
tags:
  - notion
  - notion-blog
  - notion-markdown
  - notion-md
  - notion-sdk
  - notion2blog
  - notion2md
---

# Notion to markdown blog

## Install

```bash
npm install notion2mdblog
```

```bash
yarn add notion2mdblog
```

## Usage

```typescript
// Client is extended from @notionhq/client
import { Client } from "notion2mdblog";
import fs from "node:fs";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_KEY,
});

async function main() {
  const blogPages = await notion.markdown.db2md({
    database_id: NOTION_DATABASE_ID,
  });
  blogPages.map((blogPage) => {
    fs.writeFileSync(`blogs/${blogPage.title}`, blogPage.content);
  });
}
main();
```
