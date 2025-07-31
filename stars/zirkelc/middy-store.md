---
repo: zirkelc/middy-store
url: 'https://github.com/zirkelc/middy-store'
homepage: ''
starredAt: '2025-07-04T22:26:47Z'
createdAt: '2024-02-07T14:26:47Z'
updatedAt: '2025-07-04T22:26:47Z'
language: TypeScript
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-07-12T22:31:52.794Z'
description: 'Middleware for Step Functions: Automatically Store and Load Payloads'
tags: []
---

[![CI](https://github.com/zirkelc/middy-store/actions/workflows/ci.yml/badge.svg)](https://github.com/zirkelc/middy-store/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/middy-store)](https://www.npmjs.com/package/middy-store)
[![npm](https://img.shields.io/npm/dt/middy-store)](https://www.npmjs.com/package/middy-store)

# Middleware `middy-store`

`middy-store` is a middleware for Lambda that automatically stores and loads payloads from and to a Store like Amazon S3 or potentially other services.

## Installation
You will need [@middy/core](https://www.npmjs.com/package/@middy/core) >= v5 to use `middy-store`. 
Please be aware that the API is not stable yet and might change in the future. To avoid accidental breaking changes, please pin the version of `middy-store` and its sub-packages in your `package.json` to an exact version.

```sh
npm install --save-exact @middy/core middy-store middy-store-s3 
```

## Motivation

AWS services have certain limits that one must be aware of. For example, AWS Lambda has a [payload limit](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html) of 6MB for synchronous invocations and 256KB for asynchronous invocations. AWS Step Functions allows for a [maximum input or output size](https://docs.aws.amazon.com/step-functions/latest/dg/service-quotas.html#service-limits-state-machine-executions) of 256KB of data as a UTF-8 encoded string. If you exceed this limit when returning data, you will encounter the infamous [`States.DataLimitExceeded`](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#error-data-limit-exceed) exception. 

![States.DataLimitExceeded](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qqydvhfhzhuf3ha5e4y3.png)

The usual workaround for this limitation is to check the size of your payload and save it temporarily in persistent storage such as Amazon S3. Then, you return the object URL or ARN for S3. The next Lambda checks if there is a URL or ARN in the input and loads the payload from S3. As one can imagine, this results in a lot of boilerplate code to store and load the payload from and to Amazon S3, which has to be repeated in every Lambda. 

![Lambda Workflow with Upload and Download to S3](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/evycm8daut8y82jh8rs0.png)

This becomes even more cumbersome when you only want to save part of the payload to S3 and leave the rest as is. For example, when working with Step Functions, the payload could contain control flow data for states like `Choice` or `Map`, which has to be accessed directly. This means the first Lambda saves a partial payload to S3, and the next Lambda has to load the partial payload from S3 and merge it with the rest of the payload. This requires ensuring that the types are consistent across multiple functions, which is, of course, very error-prone.

## How it works

`middy-store` is a middleware for Middy. It receives the input for a Lambda function before the handler is called, and it receives the output after the handler has finished. Let's start with the output: `middy-store` receives the output from the handler function and checks the size of the entire payload. To calculate the size, it optionally stringifies the payload and uses `Buffer.byteLength()` to calculate the UTF-8 encoded size of the payload. If the size is larger than a certain threshold, the payload is stored in a store like Amazon S3. The reference to the stored payload (e.g., S3 URL or ARN) is then returned as the output instead of the original payload.

The next Lambda function receives this output as its input. `middy-store` will then check if there is a reference to a stored payload in the input. If there is a reference, the original payload is loaded from the store and returned as the input to the handler function. The handler function can then use the payload as if it was passed directly to the Lambda function.

Here's an example to illustrate how `middy-store` works:

```ts
// ./src/functions/handler1.ts
export const handler1 = middy()
  .use(
    middyStore({
      stores: [new S3Store({ /* S3 options */ })],
    })
  )
  .handler(async (input) => {
    // output 1MB of random data as base64 encoded string
    return randomBytes(1024 * 1024).toString('base64');
  });

// ./src/functions/handler2.ts
export const handler2 = middy()
  .use(
    middyStore({
      stores: [new S3Store({ /* S3 options */ })],
    })
  )
  .handler(async (input) => {
    // input is the 1MB of random data
    return console.log(`Size: ${Buffer.from(input, "base64").byteLength / 1024 / 1024} MB`);
  });

// ./src/workflow.ts
// The output is now a reference to the stored payload in S3
const output1 = await handler1({});

// Print the returned reference
// { "@middy-store": "s3://my-bucket/my-key"}
console.log(output1); 

// Pass the output as input to the next Lambda
const output2 = await handler2(output1);
```

## How it works

`middy-store` is a middleware for Middy. It's attached to a Lambda function and is called twice during a Lambda invocation: *before* and *after* the Lambda `handler()` runs. It receives the input before the handler runs and receives the output from the handler after it has finished. 

![Data flowing through a Middleware](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dcvbli8dufk6tc6q0t3o.png)

Let's start at the end with the output *after* a successful invocation to make it easier to follow: `middy-store` receives the output (the payload) from the `handler()` function and checks the size. To calculate the size, it stringifies the payload, if it is an object, and uses `Buffer.byteLength()` to calculate the UTF-8 encoded string size. If the size is larger than a certain configurable threshold, the payload is stored in a Store like Amazon S3. The reference to the stored payload (e.g., an S3 URL or ARN) is then returned as the output instead of the original output.

Now let's look at the next Lambda function (e.g. in a state machine), which will receive this output as its input. This time we are looking at the input *before* the `handler()` is invoked: `middy-store` receives the input to the handler and searches for a reference to a stored payload. If it finds one, the payload is loaded from the Store and returned as the input to the handler. The handler uses the payload as if it was passed directly to it.

Here's an example to illustrate how `middy-store` works:

```ts
/* ./src/functions/handler1.ts */
export const handler1 = middy()
  .use(
    middyStore({
      stores: [new S3Store({ /* S3 options */ })],
    })
  )
  .handler(async (input) => {
    // Return 1MB of random data as a base64 encoded string as output 
    return randomBytes(1024 * 1024).toString('base64');
  });

/* ./src/functions/handler2.ts */
export const handler2 = middy()
  .use(
    middyStore({
      stores: [new S3Store({ /* S3 options */ })],
    })
  )
  .handler(async (input) => {
    // Print the size of the input
    return console.log(`Size: ${Buffer.from(input, "base64").byteLength / 1024 / 1024} MB`);
  });

/* ./src/workflow.ts */
// First Lambda returns a large output
// It automatically uploads the data to S3 
const output1 = await handler1({});

// Output is a reference to the S3 object: { "@middy-store": "s3://bucket/key"}
console.log(output1); 

// Second Lambda receives the output as input
// It automatically downloads the data from S3
const output2 = await handler2(output1);
```

### What's a Store?

In general, a Store is any service that allows you to store and load arbitrary payloads, like Amazon S3 or other persistent storage systems. Databases like DynamoDB can also act as a Store. The Store receives a payload from the Lambda handler, serializes it (if it's an object), and stores it in persistent storage. When the next Lambda handler needs the payload, the Store loads the payload from the storage, deserializes and returns it.

`middy-store` interacts with a Store through a `StoreInterface` interface, which every Store has to implement. The interface defines the functions `canStore()` and `store()` to store payloads, and `canLoad()` and `load()` to load payloads.

```ts
interface StoreInterface<TPayload = unknown, TReference = unknown> {
  name: string;
  canLoad: (args: LoadArgs<unknown>) => boolean;
  load: (args: LoadArgs<TReference | unknown>) => Promise<TPayload>;
  canStore: (args: StoreArgs<TPayload>) => boolean;
  store: (args: StoreArgs<TPayload>) => Promise<TReference>;
}
```

- `canStore()` serves as a guard to check if the Store can store a given payload. It receives the payload and its byte size and checks if the payload fits within the maximum size limits of the Store. For example, a Store backed by DynamoDB has a maximum item size of 400KB, while an S3 store has effectively no limit on the payload size it can store.

- `store()` receives a payload and stores it in its underlying storage system. It returns a reference to the payload, which is a unique identifier to identify the stored payload within the underlying service. For example, the Amazon S3 Store uses an S3 URI in the format `s3://<bucket>/<key>` as a reference, while other Amazon services might use ARNs.

- `canLoad()` acts like a filter to check if the Store can load a certain reference. It receives the reference to a stored payload and checks if it's a valid identifier for the underlying storage system. For example, the Amazon S3 Store checks if the reference is a valid S3 URI, while a DynamoDB Store would check if it's a valid ARN.

- `load()` receives the reference to a stored payload and loads the payload from storage. Depending on the Store, the payload will be deserialized into its original type according to the metadata that was stored alongside it. For example, a payload of type `application/json` will get parsed back into a JSON object, while a plain string of type `text/plain` will remain unaltered.

### Single and Multiple Stores

Most of the time, you will only need one Store, like Amazon S3, which can effectively store any payload. However, `middy-store` lets you work with multiple Stores at the same time. This can be useful if you want to store different types of payloads in different Stores. For example, you might want to store large payloads in S3 and small payloads in DynamoDB.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q5w1i4w88z17absmruwa.png)

`middy-store` accepts an `Array<StoreInterface>` in the options to provide one or more Stores. When `middy-store` runs *before* the handler and finds a reference in the input, it will iterate over the Stores and call `canLoad()` with the reference for each Store. The first Store that returns `true` will be used to load the payload with `load()`.

On the other hand, when `middy-store` runs *after* the handler and the output is larger than the maximum allowed size, it will iterate over the Stores and call `canStore()` for each Store. The first Store that returns `true` will be used to store the payload with `store()`.

Therefore, it is important to note that the order of the Stores in the array is important. 

### References

When a payload is stored in a Store, `middy-store` will return a reference to the stored payload. The reference is a unique identifier to find the stored payload in the Store. The value of the identifier depends on the Store and its configuration. For example, the Amazon S3 Store will use an S3 URI by default. However, it can also be configured to return other formats like an ARN `arn:aws:s3:::<bucket>/<key>`, an HTTP endpoint `https://<bucket>.s3.us-west-1.amazonaws.com/<key>`, or a structured object with the `bucket` and `key`.

The output from the handler *after* `middy-store` will contain the reference to the stored payload:

```ts
/* Output with reference */
{
  "@middy-store": "s3://bucket/key"
}
```

`middy-store` embeds the reference from the Store in the output as an object with a key `"@middy-store"`. This allows `middy-store` to quickly find all references when the next Lambda function is called and load the payloads from the Store *before* the handler runs. In case you are wondering, `middy-store` recursively iterates through the input object and searches for the `"@middy-store"` key. That means the input can contain multiple references, even from different Stores, and `middy-store` will find and load them. 

### Selecting a Payload

By default, `middy-store` will store the entire output of the handler as a payload in the Store. However, you can also select only a part of the output to be stored. This is useful for workflows like AWS Step Functions, where you might need some of the data for control flow, e.g., a `Choice` state.

`middy-store` accepts a `selector` in its `storingOptions` config. The `selector` is a string path to the relevant value in the output that should be stored.

Here's an example:

```ts
const output = {
  a: {
    b: ['foo', 'bar', 'baz'],
  },
};

export const handler = middy()
  .use(
    middyStore({
      stores: [new S3Store({ /* S3 options */ })],
      storingOptions: {
        selector: '',          /* select the entire output as payload */
        // selector: 'a';      /* selects the payload at the path 'a' */
        // selector: 'a.b';    /* selects the payload at the path 'a.b' */
        // selector: 'a.b.0'; /* selects the payload at the path 'a.b[0]' */
        // selector: 'a.b.*'; /* selects the payloads at the paths 'a.b[0]', 'a.b[1]', 'a.b[2]', etc. */
      }
    })
  )
  .handler(async () => output);

await handler({});
```

The default selector is an empty string (or undefined), which selects the entire output as a payload. In this case, `middy-store` will return an object with only one property, which is the reference to the stored payload.

```ts
/* selector: '' */
{
  "@middy-store": "s3://bucket/key"
}
```

The selectors `a`, `a.b`, or `a.b[0]` select the value at the path and store only this part in the Store. The reference to the stored payload will be inserted at the path in the output, thereby replacing the original value.

```ts
/* selector: 'a' */
{
  a: {
    "@middy-store": "s3://bucket/key"
  }
}
/* selector: 'a.b' */
{
  a: {
    b: {
      "@middy-store": "s3://bucket/key"
    }
  }
}
/* selector: 'a.b[0]' */
{
  a: {
    b: [
      { "@middy-store": "s3://bucket/key" }, 
      'bar', 
      'baz'
    ]
  }
}
```

A selector ending with `.*` like `a.b.*` acts like an iterator. It will select the array at `a.b` and store each element in the array in the Store separately. Each element will be replaced with the reference to the stored payload.

```ts
/* selector: 'a.b.*' */
{
  a: {
    b: [
      { "@middy-store": "s3://bucket/key" }, 
      { "@middy-store": "s3://bucket/key" }, 
      { "@middy-store": "s3://bucket/key" }
    ]
  }
}
```

### Size Limit

`middy-store` will calculate the size of the entire output returned from the handler. The size is calculated by stringifying the output, if it's not already a string, and calculating the UTF-8 encoded size of the string in bytes. It will then compare this size to the configured `minSize` in the `storingOptions` config. If the output size is equal to or greater than the `minSize`, it will store the output or a part of it in the Store.

```ts
export const handler = middy()
  .use(
    middyStore({
      stores: [new S3Store({ /* S3 options */ })],
      storingOptions: {
        minSize: Sizes.STEP_FUNCTIONS,  /* 256KB */
        // minSize: Sizes.LAMBDA_SYNC,  /* 6MB */
        // minSize: Sizes.LAMBDA_ASYNC, /* 256KB */
        // minSize: 1024 * 1024,        /* 1MB */
        // minSize: Sizes.ZERO,         /* 0 */
        // minSize: Sizes.INFINITY,     /* Infinity */
        // minSize: Sizes.kb(512),      /* 512KB */
        // minSize: Sizes.mb(1),        /* 1MB */
      }
    })
  )
  .handler(async () => output);

await handler({});
```

`middy-store` provides a `Sizes` helper with some predefined limits for Lambda and Step Functions. If `minSize` is not specified, it will use `Sizes.STEP_FUNCTIONS` with 256KB as the default minimum size. The `Sizes.ZERO` (equal to the number 0) means that `middy-store` will always store the payload in a Store, ignoring the actual output size. On the other hand, `Sizes.INFINITY` (equal to `Math.POSITIVE_INFINITY`) means that it will never store the payload in a Store.

#### Options

The `middyStore()` function accepts the following options:

| Option                        | Type                            | Default                   | Description |
| ----------------------------- | ------------------------------- | ------------------------- | ----------- |
| `stores`                      | `Array<StoreInterface>`         | **Required**              | An array of store implementations to store and load payloads. |
| `loadingOptions`              | `LoadingOptions`                | `undefined`               | The options for loading payloads from the store. |
| `loadingOptions.skip`         | `boolean`                       | `undefined`               | Skip loading the payload from the store, even if the input contains a reference. |
| `loadingOptions.passThrough`  | `boolean`                       | `undefined`               | Pass the input through if no store was found to load the reference. |
| `storingOptions`              | `StoringOptions`                | `undefined`               | The options for storing payloads into the store. |
| `storingOptions.skip`         | `boolean`                       | `undefined`               | Skip storing the payload in the store, even if the output exceeds the maximum size. |
| `storingOptions.passThrough`  | `boolean`                       | `undefined`               | Pass the output through if no store was found to store the payload. |
| `storingOptions.selector`     | `string`                        | `undefined`               | Selects the payload from the output to store in the store. |
| `storingOptions.size`         | `number`                        | `Sizes.STEP_FUNCTIONS`    | The maximum output size in bytes before the output is stored in the store. If the output exceeds this size, it will be stored in a store. Defaults to 256KB, the maximum output size for [Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/limits-overview.html). |
| `logger`                      | `Logger`                        | `undefined`               | The logger function to use for logging. |

## Stores

### Amazon S3

The `middy-store-s3` package provides a store implementation for Amazon S3. It uses the official `@aws-sdk/client-s3` package to interact with S3.

```ts
import { middyStore } from 'middy-store';
import { S3Store } from 'middy-store-s3';

const handler = middy()
  .use(
    middyStore({
      stores: [
        new S3Store({
          config: { region: "us-east-1" },
          bucket: "bucket",
          key: () => randomUUID(),
          format: "arn",
        }),
      ],
    }),
  )
  .handler(async (input) => {
    return { /* ... */ };
  });
```

The `S3Store` only requires a `bucket` where the payloads are being stored. The `key` is optional and defaults to `randomUUID()`. The `format` configures the style of the reference that is returned after a payload is stored. The supported formats include `arn`, `object`, or one of the URL formats from the [amazon-s3-url](https://www.npmjs.com/package/amazon-s3-url) package. It's important to note that `S3Store` can load any of these formats; the `format` config only concerns the returned reference. The `config` is the [S3 client configuration](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-s3/Interface/S3ClientConfig/) and is optional. If not set, the S3 client will resolve the config (credentials, region, etc.) from the environment or file system.

#### Options

The `S3Store` accepts the following options:

| Option     | Type                                      | Default                   | Description |
| ---------- | ----------------------------------------- | ------------------------- | ----------- |
| `bucket`   | `string \| Fn<string>`                    | **Required**              | The name of the S3 bucket to store the payloads. |
| `key`      | `string \| Fn<string>`                    | `randomUUID`              | The key to store the payload in the bucket. Defaults to `randomUUID()` from `node:crypto`. |
| `config`   | `S3ClientConfig  \| Fn<S3ClientConfig>`   | `{}`                      | The [S3 client configuration](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-s3/Interface/S3ClientConfig/).|
| `format`   | `S3ReferenceFormat`                       | `url-s3-global-path`      | The format of the S3 reference: `arn`, `object` or one of the URL formats from [amazon-s3-url](https://www.npmjs.com/package/amazon-s3-url) package. Defaults to S3 URI format `s3://<bucket>/<...keys>`. |
| `maxSize`  | `number`                                  | `undefined`               | The maximum payload size in bytes that can be stored in S3. If the payload exceeds this size, it will not be stored in S3. |
| `logger`   | `Logger`                                  | `undefined`               | The logger function to use for logging. |

### Custom Store

A new Store can be implemented as a class or a plain object, as long as it provides the required functions from the `StoreInterface` interface.

Here's an example of a Store to store and load payloads as base64 encoded [data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs#datatextplainbase64sgvsbg8sifdvcmxkiq):

```ts
import { StoreInterface, middyStore } from 'middy-store';

const base64Store: StoreInterface<string, string> = {
  name: "base64",
  /* Reference must be a string starting with "data:text/plain;base64," */
  canLoad: ({ reference }) => {
    return (
      typeof reference === "string" &&
      reference.startsWith("data:text/plain;base64,")
    );
  },
  /* Decode base64 string and parse into object */
  load: async ({ reference }) => {
    const base64 = reference.replace("data:text/plain;base64,", "");
    return Buffer.from(base64, "base64").toString();
  },
  /* Payload must be a string or an object */
  canStore: ({ payload }) => {
    return typeof payload === "string" || typeof payload === "object";
  },
  /* Stringify object and encode as base64 string */
  store: async ({ payload }) => {
    const base64 = Buffer.from(JSON.stringify(payload)).toString("base64");
    return `data:text/plain;base64,${base64}`;
  },
};

const handler = middy()
  .use(
    middyStore({
      stores: [base64Store],
      storingOptions: {
        minSize: Sizes.ZERO, /* Always store the data */ 
      }
    }),
  )
  .handler(async (input) => {
    /* Random text with 100 words */ 
    return `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`;
  });

const output = await handler(null, context);

/* Prints: { '@middy-store': 'data:text/plain;base64,IkxvcmVtIGlwc3VtIGRvbG9yIHNpdC...' } */
console.log(output);
```

This example is the perfect way to try `middy-store`, because it doesn't rely on external resources like an S3 bucket. You will find it in the repository at [examples/custom-store](./examples/custom-store) and should be able to run it locally.

## Packages

- [`middy-store`](./packages/core/): This is the core package of `middy-store` and provides the middleware function `middyStore()` for Middy to use.
- [`middy-store-s3`](./packages/store-s3/): This package provides a store implementation for Amazon S3. It uses the `@aws-sdk/client-s3` to interact with S3.
- [`middy-store-dynamodb`](./packages/store-dynamodb/): Planned, but not yet implemented. This package will provide a store implementation for Amazon DynamoDB.
