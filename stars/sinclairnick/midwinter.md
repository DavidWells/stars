---
repo: sinclairnick/midwinter
url: 'https://github.com/sinclairnick/midwinter'
homepage: ''
starredAt: '2025-03-31T16:35:33Z'
createdAt: '2025-01-06T08:10:28Z'
updatedAt: '2025-04-02T17:09:35Z'
language: TypeScript
license: MIT
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-04-12T22:30:07.052Z'
description: ❄️ the middleware engine for modern backends
tags: []
---

<center>

# ❄️ Midwinter.js

_Middleware + WinterCG = Midwinter_

</center>

Midwinter is a plugin-based middleware engine used to build HTTP backend applications.

The main innovation driving Midwinter is enabling middleware to declare _metadata_. This enables powerful introspection and static analysis, which in turn enables an infinitely flexible plugin system.

The plugin system is so powerful that even core functionality like routing can happily exist as a plugin.

```sh
npm i midwinter
```

> [!IMPORTANT]  
> Midwinter is currently in beta status. It won't be fundamentally overhauled but may experience some breaking API changes. That said, it is currently used in production.

## Motivation

When we add middleware to our applications, it might change a `req` object, add some routes, or something else entirely. As we build up an increasingly complex web of routes, each piece of middleware becomes impossible to track and is essentially a black box.

To improve this situation, we can inform both static and runtime environments as to how our application behaves, in the form of _types_ and _metadata_, respectively. In doing so, we can offload fundamental functionality to plugins; programmatically introspect and understand our applications; and trace how our request context changes over time, via TypeScript.

## Basic Usage

```ts
const withAuth = new Midwinter({
  requiresAuth: true, // Define metadata (optional)
}).use((req, ctx) => {
  return { userId: "123" }; // Add data to request context
});

const getUser = new Midwinter()
  .use(withAuth) // Apply middleware
  .end((req, ctx) => {
    const { userId } = ctx;

    return Response.json({ userId });
  });

const response = await getUser(new Request(/*...*/));

await response.json(); // { userId: "123" }

getUser.meta.requiresAuth; // true
```

## Table of Contents

- [Guide](#guide)
  - [Getting Started](#getting-started)
  - [Return value behaviour](#return-value-behaviour)
  - [Request Context](#request-context)
  - [Listening to responses](#listening-to-responses)
  - [Chaining](#chaining)
  - [`.end`ing pipelines](#ending-pipelines)
  - [Metadata](#metadata)
- [Plugins](#plugins)
  - [Official Plugins](#official-plugins)
  - [Routing](#routing)
  - [Validation](#validation)
  - [Cors](#cors)
  - [Client Types](#client-types)

### Key Concepts

<details>
<summary>
<b>Request Context</b>
</summary>

The request context represents how our app changes over the lifetime of a request. Using Midwinter, the changes to this context are automatically inferred, and can be explicitly defined if necessary.

> _e.g. determining the current user and adding to the request context_

</details>

<details>
<summary>
<b>Metadata</b>
</summary>

Middleware can also register information that doesn't depend on the request lifecycle, in the form of metadata. For example, a given middleware could provide metadata about OpenAPI validation schema, to trivially enable client-side types.

> _e.g specifying the path, method or validation schema for a request handler, for later use with a routing or validation plugin._

</details>

## Guide

The following is the entire Midwinter API:

```ts
const handle = new Midwinter(meta)
  //
  .use(middleware)
  //
  .end(endMiddleware);
```

Midwinter is remarkably simple and deceptively powerful. With only this API, we can create complex middleware pipelines and defer much of what might exist in a framework to plugins instead, without any loss of _functionality_ or _ergonomics_.

> [!NOTE]  
> These docs are currently a work in progress. They are mostly there but may hve the odd gap or minor error. Please raise an issue if you run into anything.

### Getting Started

At it's simplest, middleware can be a regular function.

```ts
const isAuthed = async (req: Request) => {
  const user = await getUser(req);

  if (user == null) {
    throw new Error("Unauthorized!");
  }
};
```

This can then be used to create a basic **middleware pipeline**.

```ts
const handleRequest = new Midwinter()
  .use(isAuthed) // <--
  .end(() => Response.json({ ok: true }));
```

When we `.use` a middleware, we are registering it to a middleware **pipeline**. To actually invoke this middleware pipeline, we need to `.end` it, returning a **request handler** function.

```ts
// Defining and registering middleware
const middleware = new Midwinter().use(() => {});

// Ending a pipeline
const handle = middleware.end(() => new Response(/**...*/));

// Executing the request handler
const response = await handle(new Request(/**... */));
```

We can chain middleware together into reusable pipelines.

```ts
const one = new Midwinter().use(() => {
  console.log(1);
});

const two = new Midwinter().use(() => {
  console.log(2);
});

const three = () => {
  console.log(3);
};

const withOneTwoThree = one.use(two).use(three);
```

The above example demonstrates the three ways middleware can be defined/registered:

1. **Extending** from an existing pipeline
2. Applying a **pipeline** via `.use`
3. Applying a **function** via `.use`

In other words, **instances of Midwinter** can also be treated as middleware itself!

When this pipeline is `.use`d or extended, the middleware is run in sequence.

```ts
const handle = withOneTwoThree.end();

handle(new Request(/**... */));
// 1
// 2
// 3
```

When our middleware returns an **object**, it gets shallowly merged with the existing **request context**. This context is passed as the second parameter to any middleware functions.

```ts
const withReqId = new Middleware().use((req) => {
  return { id: req.headers.get("x-request-id") };
});

const withLogReqId = withReqId.end((req, ctx) => {
  console.log(ctx.id);
});
```

We can also specify **metadata** to make our app more informative to **both humans and computers**.

```ts
const withPath = <T extends string>(path: T) => {
  return new Midwinter({ path });
};

const middleware = new Midwinter().use(withPath("/users/:id")).end();

middleware.meta.path === "/users/:id";
// The `meta.path` type is also `/users/:id`
```

So far, we've only been intercepting the _request_. But we can also intercept and modify the _response_. By returning a function, we can register response middleware.

```ts
const withTiming = new Midwinter().use(() => {
  const start = Date.now();

  return (res: Response) => {
    const headers = new Headers(res.headers);

    headers.set("x-timing", String(Date.now() - start));

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers,
    });
  };
});
```

---

We have seen how Midwinter is fairly simple, but these trivial examples hardly show how it is _powerful_. To dive deeper into how Midwinter works, continue on below. To get a better sense of how this paradigm can enable interesting plugins, continue to the [Plugins](#plugins) section.

### Return value behaviour

<details>
<summary>Expand</summary>

Middleware often needs to update the request context,return early responses and observe/modify outbound responses. Midwinter achieves this using a functional style, relying on the value returned by a middleware function.

|              |                                                                              |
| ------------ | ---------------------------------------------------------------------------- |
| **Object**   | Update request context (shallowly)                                           |
| **Function** | Registers a "response listener" (outbound middleware)                        |
| **Response** | Return the response, passing through any response listeners defined upstream |

> Note that response listeners are executed in _reverse_ or "inside-out" order

On top of being convenient and simple, relying on return type maintains type-safety across our middleware pipeline by simply inferring what request context updates our middleware makes. In turn, we can avoid entire classes of errors and work, knowing what data does (not) exist at a given point.

These three options look something like:

```ts
new Midwinter().use(() => {
  if (withUpdate) {
    return { foo: "bar" };
  }

  if (withResponse) {
    return Response.json({ early: true });
  }

  return (res: Response) => {
    // Optionally return a modified response
    return new Response(res.body, {
      status: 301,
    });
  };
});
```

</details>

### Request Context

<details>
<summary>Expand</summary>

The second argument Midwinter passes to any middleware is the request context.

```ts
const withIp = new Midwinter().use(() => ({ ip: "123" }));

const ipLogger = withIp.use((req, ctx) => {
  console.log(ctx.ip);
});
```

#### Updating the request context

##### Via return value

We can return a simple JavaScript object to indicate a context update.

```ts
const withReqTime = mid.define((req, ctx) => {
  return { start: new Date() };
});

new Midwinter()
  .use(withReqTime) //
  .use((req, ctx) => {
    ctx.start != null; // true
  });
```

##### Via mutation

Much of the time, we only need to return one of the above three return value possibilities: object, function or response.

While returning both a response and response listener is redundant, we may still want to _update the request_ context during these two cases. To do so, we can mutate the request context directly.

```ts
const withReqTime = new Midwinter().use<{ start: number }>((req, ctx) => {
  const start = Date.now()

  // Update context
	ctx.start = start


	// Returning a response listener
  return () => {
    const end = Date.now()

		console.log("Took" start - end)
  };
});
```

In this example, the type has been explicitly provided, which maintains type-safety. However, this is entirely optional.

</details>

### Listening to responses

<details>
<summary>Expand</summary>

Returning a function enables listening to and modifying the outbound response. The function takes a single argument: the response object.

```ts
new Midwinter().use(() => {
  return (res: Response) => {
    // TODO: Return a new response... or not
  };
});
```

We can modify the response object by returning a new one. Bear in mind both `Request` and `Response`, as per the WinterCG standard, are _immutable_, so you should make use of the [`.clone()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone) method when applicable.

</details>

### Chaining

<details>
<summary>Expand</summary>

Midwinter makes heavy use of chaining and TypeScript inference which helps to compose complex middleware pipelines using simple code, and to string our applications together at the type-level to surface issues before running anything, like trying to access missing data from the request context.

```ts
const withAuth = new Midwinter().use(/**... */);
const isAdmin = withAuth.use(/**... */);
const isSuperAdmin = isAdmin.use(/**... */);

new Midwinter().use(isSuperAdmin);
```

By chaining we can extend middleware pipelines easily and create complex pathways for a request to travel through.

> Each time we chain middleware a _new instance_ is returned, meaning each pipeline is independent and changing one will not change any others.

</details>

### `.end`ing pipelines

<details>
<summary>Expand</summary>

To officially _end_ a middleware pipeline, and thus return a request handler we can run, we use the `.end` method. This is is similar to `.use`, but _must_ return a `Response` object.

Instead of a new `Midwinter` instance being returned, `.end` results in a request handler function that accepts a `Request` and returns a `Response` promise.

```ts
const handle = new Midwinter()
  .use(withA)
  .use(withB)
  .use(withC)
  .end((req, ctx, meta) => {
    return Response.json({ ok: true });
  });

// Invoke the handler like:
const response = await handle(request);
```

</details>

### Metadata

Metadata enables middleware to "decorate" our backend apps in powerful ways that traditional middleware can't.

```ts
const withName = (name: string) => {
  const meta = { name };

  return new Midwinter(
    meta // <--
  );
};
```

In this case, our "middleware" actually runs nothing at all - it is _only_ metadata. If we `.use` this middeware, our resulting request handler will possess this metadata, which can then be utilised by other tooling to great effect.

```ts
const handle = new Midwinter()
  .use(withName("getUser")) // <--
  .end(() => {
    // ...
  });

handle.meta.name === "getUser";
```

This approach to metadata enables plugins, or own code, to fully "see" our app, both programmatically and type-wise. This feature enables a very simple and powerful paradigm for plugins.

#### Metadata merging

Like request context updates, metadata is shallowly merged.

```ts
const handle = new Midwinter()
  .use(withName("getUser")) // <--
  .use(withName("getPost")) // <--
  .end(() => {
    // ...
  });

handle.meta.name === "getPost";
```

## Plugins

In Midwinter, "plugins" (as opposed to regular middleware), broadly refers to a set of interacting middleware, or functionality that operates on request handlers.

For example, a plugin might add some metadata to a middleware pipeline and then access that metadata elsewhere, down the line.

### Official Plugins

Midwinter itself is a very slim middleware pipeline, and so most "app stuff" is provided by plugins.

Core app functionality like routing and validation (among others) are provided. However, even these can be replaced by third party alternatives, without much downside.

> More official plugins will be added in coming months. Feel free to open a PR for any requests.

### Routing

<details>
<summary>Expand</summary>

Routing is central to any backend app. However, with the advent of full-stack frameworks and file-system routing, not all apps _need_ an explicit router.

For those who do, this plugin enables a flexible routing solution.

In short, the routing plugin turns a list of request handlers into an actual "app".

#### Setup

```ts
import * as Routing from "midwinter/routing";

export const { router, route } = Routing.init(opts);
```

#### `routing`

The `routing` function is a middleware that adds routing-related metadata to a route.

```ts
const handle = new Midwinter()
  .use(
    route({
      path: "/user",
      method: "/get",
    })
  )
  .end(() => {
    // ...
  });
```

To more easily group routes, while avoiding duplication, we can create a prefixed route utility like so.

```ts
const apiRoute = prefixed("/api/v1")

const getPost = new Midwinter()
	.use(apiRoute({
		path: "/post/:id",
		method: "get
	}))
	.end(() => {
		// ...
	})

getPost.meta.path // /api/v1/post/:id
```

#### `router`

To actually instantiate our app router, we use the `router` function.

```ts
const app = router([getPost, ...others], opts);

// Call app router on new request:
const response = await app(request);
```

</details>

### Validation

<details>
<summary>Expand</summary>

Input and output validation is table stakes for any serious backend app. While we can always imperatively validate data, the validation plugin enables a declarative API that is more concise.

By virtue of being declarative, the validation plugin also facilitates opportunities for easily inferring types or generating specs like OpenAPI.

The validation plugin works with most popular schema validation libraries out of the box. The below examples are using `zod`.

#### Setup

```ts
import * as Validation from "midwinter/validation";

export const { valid, validLazy, output } = Validation.init(opts);
```

#### `valid`

The `valid` function enables validating various input and outputs of your backend.

```ts
const Schema = z.object({
  // ...
});

new Midwinter()
  .use(
    valid({
      // All possible fields:
      Query: Schema,
      Params: Schema,
      Headers: Schema,
      Body: Schema,
      Output: Schema,
    })
  )
  .end((req, ctx) => {
    const { query, params, headers, body } = ctx;
  });
```

With `valid`, all components are pre-parsed and added to the context.

> Note that `Output` _does not_ parse the response.body. See below.

#### `validLazy`

In contrast to `valid`, `validLazy` does not pre-parse anything. Instead a parsing function is added to the context, offering greater flexibility over how parsing is handled and what to parse.

```ts
new Midwinter()
  .use(
    validLazy({
      // ...same options
    })
  )
  .end(async (req, ctx) => {
    const { parse } = ctx;

    // Parse a single part
    const query = await parse("query");

    // or parse all parts
    const { query, params, body, headers } = await parse();
  });
```

#### `output`

At a minimum, the `output` function allows us to return a value, which will then get packaged into a JSON response.

If we've specified an `Output` schema, our return value will be validated against this.

```ts
mid
  .use(
    valid({
      Output: z.object({ foo: z.string() }), // <-- Optionally specify output schema here
    })
  )
  .end(
    output((req, ctx) => {
      return { foo: "bar" }; // <-- Will be parsed and returned as a JSON Response
    })
  );
```

</details>

### Cors

<details>
<summary>Expand</summary>

TODO: Add docs

```ts
import * as Cors from "midwinter/cors";

export const { cors } = Cors.init();

new Midwinter().use(cors(opts));
```

</details>

### Client Types

<details>
<summary>Expand</summary>

TODO: Add docs

```ts
import * as ClientTypes from "midwinter/client-types";
import type { AppRoutes } from "./app";

export type AppDef = ClientTypes.InferApp<typeof AppRoutes>;
```

</details>

### Open Telemetry

<details>
<summary>Expand</summary>

TODO: Add docs

```ts
import * as Otel from "midwinter/otel";

const { otel } = Otel.init();

new Midwinter().use(otel());
```

</details>

### OpenAPI

> Coming soon

...
