---
repo: fredericbarthelet/middy-mcp
url: 'https://github.com/fredericbarthelet/middy-mcp'
homepage: null
starredAt: '2025-04-22T22:11:50Z'
createdAt: '2025-04-04T13:01:02Z'
updatedAt: '2025-04-25T12:11:23Z'
language: TypeScript
license: MIT
branch: main
stars: 22
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-04-25T21:49:13.048Z'
description: Middy middleware for Model Context Protocol server hosting on AWS Lambda
tags: []
---

# Middy MCP

A Middy middleware for Model Context Protocol (MCP) server integration with AWS Lambda functions.

## Description

Middy MCP is a middleware that enables seamless integration between AWS Lambda functions and Model Context Protocol servers. It provides a convenient way to handle MCP requests and responses within your Lambda functions using the Middy middleware framework. It supports requests sent to AWS Lambda from API Gateway (both REST API / v1 and HTTP API / v2) using the Proxy integration, as well as requests sent form an ALB.

> Disclaimer: hosting your MCP server this way is only compatible with MCP clients using at least protocol version 2025-03-26.

## Install

```bash
pnpm install middy-mcp
```

## Requirements

- Node.js >= 18.0.0
- Middy >= 6.0.0

## Usage

This middleware can throw HTTP exceptions, so it can be convenient to use it in combination with the `@middy/http-error-handler`.

Hereafter is an exemple of a minimal Lambda function handler file. Deploy this lambda as a proxy integration on a `POST` route of your API Gateway and you're good to go.

```typescript
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import mcpMiddleware from "middy-mcp";

// Create an MCP server
const server = new McpServer({
  name: "Lambda hosted MCP Server",
  version: "1.0.0",
});

// Add an addition tool
server.tool("add", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
  content: [{ type: "text", text: String(a + b) }],
}));

export const handler = middy()
  .use(mcpMiddleware({ server }))
  .use(httpErrorHandler());
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to open an issue or to submit a pull request 🚀!
