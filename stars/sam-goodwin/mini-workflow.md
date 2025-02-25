---
repo: sam-goodwin/mini-workflow
url: 'https://github.com/sam-goodwin/mini-workflow'
homepage: null
starredAt: '2024-10-02T16:49:44Z'
createdAt: '2024-09-30T23:04:52Z'
updatedAt: '2024-12-12T10:26:41Z'
language: TypeScript
license: NA
branch: main
stars: 26
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:19.420Z'
description: null
tags: []
---

# mini-workflow

This is a mini Temporal-like workflow engine for TypeScript implemented with pluggable backends for AWS (CloudFlare coming soon).

> [!CAUTION]
> The code was build in a day and is not fully tested. The e2e example works, but there may be bugs.

# Example

- See the [example/index.ts](./example/index.ts) file for the Lambda Function entrypoint.
- See the [example/workflow.ts](./example/workflow.ts) file for the workflow implementation.
- See the [sst.config.ts](./sst.config.ts) file for infrastructure configuration.

# Usage

## SST Config

```ts
const engine = new WorkflowEngine("WorkflowEngine", {
  worker: "example/index.execute",
  orchestrator: "example/index.orchestrate",
});
```

## App Code

```ts
import { workflow } from "mini-workflow";

// a workflow is implemented as a simple function accepting context and arbitrary parameters
export const uploadObjectWorkflow = workflow(
  "uploadObjectWorkflow",
  async (ctx, key: string, data: string) => {
    // ctx.sleep will sleep (pause the workflow) for 1 second
    await ctx.sleep(1);

    // ctx.task will asynchronously (and durably, with at-least-once delivery) run the provided function in the worker Lambda Function
    await ctx.task(async () => {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: data,
        })
      );
    });

    const response = await ctx.task(async () => {
      const response = await s3Client.send(
        new GetObjectCommand({
          Bucket: bucketName,
          Key: key,
        })
      );

      return response.Body?.transformToString() ?? "";
    });

    return response;
  }
);
```

# Debug

Replay events in a Javascript Debug Terminal to step-through debug a workflow that ran in AWS (or is still running).

```sh
npx tsx ./src/cli.ts replay \
  --main ./example/workflow.ts \
  --bucket-name <bucket-name>  \
  --execution-id <execution-id>
```

https://github.com/user-attachments/assets/fba13d37-60bd-4f8d-a276-a345e4415614
