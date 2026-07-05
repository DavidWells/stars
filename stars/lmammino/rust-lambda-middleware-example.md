---
repo: lmammino/rust-lambda-middleware-example
url: 'https://github.com/lmammino/rust-lambda-middleware-example'
homepage: null
starredAt: '2026-05-13T15:22:00Z'
createdAt: '2026-04-26T10:56:27Z'
updatedAt: '2026-05-13T15:22:00Z'
language: Rust
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-07-05T01:53:41.941Z'
description: A sample rate limit middleware for your Rust lambdas
tags: []
---

# rust-lambda-middleware-example

Companion code for the blog post [**Writing middlewares for Rust Lambda functions**](https://loige.co/writing-middlewares-for-rust-lambda-functions/) on [loige.co](https://loige.co).

A minimal AWS Lambda in Rust that shows how to build reusable middleware with [tower](https://crates.io/crates/tower) (the generic middleware engine that already underpins the Rust Lambda runtime). The worked example is a DynamoDB-backed IP rate limiter that:

- keys requests on the client IP read from the API Gateway request context (HTTP API v2 / REST v1; other integrations need a different extractor),
- uses a fixed window configurable via `RATE_LIMIT_WINDOW_SECS`,
- exposes `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` response headers (GitHub-style, epoch-second reset),
- returns a plain JSON `429` with `Retry-After` when the limit is exceeded,
- uses a DynamoDB atomic counter with TTL-based cleanup.

## Layout

The repo is a Cargo workspace with two members:

```
Cargo.toml                          - virtual workspace
template.yaml                       - SAM template (DynamoDB table + Lambda + HTTP API)
library/                            - reusable middleware crate (package: rust-lambda-middleware-example)
  Cargo.toml
  src/
    lib.rs                          - library entry point; re-exports the rate limiter
    ip_extractor.rs                 - client IP extraction from API Gateway request context (HTTP API v2 / REST v1)
    rate_limit.rs                   - Tower Layer + Service with DynamoDB-backed counter
  examples/
    noop_layer.rs                   - the bare-minimum tower middleware shape
    log_layer_request_only.rs       - log layer evolution, stage 1: pre-request log only
    log_layer_broken.rs             - log layer evolution, stage 2: naive attempt that does NOT compile
    log_layer_manual_poll.rs        - log layer evolution, stage 3: hand-rolled Future
    log_layer.rs                    - log layer evolution, stage 4: idiomatic Box::pin(async move)
    powered_by_layer.rs             - injects an x-powered-by response header
    error_recovery.rs               - intercepts inner-service errors and returns a 503
lambdas/
  hello/                            - deployable Lambda (package: hello)
    Cargo.toml
    src/
      main.rs                       - runtime entry point: env config, service composition, lambda_http::run
      http_handler.rs               - the HTTP handler function (cargo-lambda-style split)
```

The rate limiter and the IP extractor live in the `library` crate
(`library/src/lib.rs`), so the deployable Lambda (`lambdas/hello/`) and
any external consumer can `use rust_lambda_middleware_example::*;`.

## Run an example

The `examples/` directory ships the smaller middleware patterns from the
post as standalone runnable demos:

```sh
cargo run --example noop_layer
cargo run --example log_layer_request_only
cargo run --example log_layer_manual_poll
cargo run --example log_layer
cargo run --example powered_by_layer
cargo run --example error_recovery
```

Each one builds a tiny `ServiceBuilder` stack, fires a synthetic request
through it with `tower::ServiceExt::oneshot`, and prints the response.
No AWS credentials needed.

The four `log_layer_*` files walk through the evolution from a trivial
no-op-with-a-log-line to the idiomatic `Box::pin(async move { … })` shape;
the article walks through them in order. The middle stage,
`log_layer_broken.rs`, is intentionally not compilable, so it is gated
behind the `intentionally-broken` Cargo feature. To reproduce the
failure for yourself:

```sh
cargo build --example log_layer_broken --features intentionally-broken
```

Expected output: an `error[E0728]: 'await' is only allowed inside 'async'
functions and blocks`. That error is the whole point of the file.

## Build and deploy

Requires [cargo-lambda](https://www.cargo-lambda.info/) and the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html).

```sh
sam build
sam deploy --guided
```

## Try it

After deploy, copy the `HelloApi` endpoint from the stack outputs, then:

```sh
for i in (seq 1 12); curl -i $URL; end
```

The first 10 requests should return `200` with decrementing `X-RateLimit-Remaining`. The 11th returns `429` with `Retry-After`.

## Composing additional middleware

Tower layers stack, so adding more middleware is just another `.layer(...)` on the builder. For example, with `tower-http` you could add CORS in front of the rate limiter:

```rust
use lambda_http::tower::ServiceBuilder;
use tower_http::cors::CorsLayer;

let service = ServiceBuilder::new()
    .layer(CorsLayer::permissive())  // outer: runs first on the way in, last on the way out
    .layer(rate_limit)                // inner: the middleware in this repo
    .service(service_fn(handler));
```

This snippet is illustrative — `tower-http` is not a dependency of this crate. The point is that the same `Layer`/`Service` traits used to write the rate limiter compose with anything else in the Tower ecosystem.

## License

MIT
