---
repo: streamfold/rotel-nodejs
url: 'https://github.com/streamfold/rotel-nodejs'
homepage: null
starredAt: '2025-05-02T22:03:36Z'
createdAt: '2025-03-14T19:19:51Z'
updatedAt: '2025-05-03T08:59:33Z'
language: TypeScript
license: Apache-2.0
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-03T22:30:41.267Z'
description: Rotel for Node.js library
tags: []
---

# rotel 🌶️ 🍅
Node.js package for the Rotel lightweight OpenTelemetry collector.

[![npm version](https://badge.fury.io/js/@streamfold%2Frotel.svg)](https://badge.fury.io/js/@streamfold%2Frotel)
## Description

This package provides an embedded OpenTelemetry collector, built on the lightweight Rotel collector. When started, it spawns a background daemon that accepts OpenTelemetry metrics, traces, and logs. Designed for minimal overhead, Rotel reduces resource consumption while simplifying telemetry collection and processing in Node.js applications—without requiring additional sidecar containers.

| Telemetry Type | Support     |
|----------------|-------------|
| Metrics        | Alpha       |
| Traces         | Alpha       |
| Logs           | Alpha       |

## How it works

By default, the Rotel agent listens for OpenTelemetry data over **gRPC (port 4317)** and **HTTP (port 4318)** on _localhost_. It efficiently batches telemetry signals and forwards them to a configurable OpenTelemetry protocol (OTLP) compatible endpoint.

In your application, you use the [OpenTelemetry Javascript SDK](https://opentelemetry.io/docs/languages/js/) to add instrumentation for traces, metrics, and logs. The SDK by default will communicate over ports 4317 or 4318 on _localhost_ to the Rotel agent. You can now ship your instrumented application and efficiently export OpenTelemetry data to your vendor or observability tool of choice with a single deployment artifact.

Future updates will introduce support for filtering data, transforming telemetry, and exporting to different vendors and tools.

## Getting started

### Rotel configuration

Add the `rotel` npm package to your project's dependencies. There are two approaches to configuring rotel:
1. Typescript or Javascript 
2. Environment variables

#### JS / TS config 

In the startup section of your `index.js` or `index.ts` add the following code block. Replace the endpoint with the endpoint of your OpenTelemetry vendor and any required API KEY headers. 

---
```javascript
const { Rotel } = require("@streamfold/rotel");

const rotel = new Rotel({
  enabled: true,
  exporter: {
      endpoint: "https://foo.example.com",
      headers: {
          "x-api-key" : "xxxxx",
      }
    },
})
rotel.start()
```

#### Environment variables

You can also configure rotel entirely with environment variables. In your application startup, insert:
```javascript
const { Rotel } = require("@streamfold/rotel");
new Rotel().start();
```

In your application deployment configuration, set the following environment variables. These match the typed configuration above:
* `ROTEL_ENABLED=true`
* `ROTEL_OTLP_EXPORTER_ENDPOINT=https://foo.example.com`
* `ROTEL_OTLP_EXPORTER_CUSTOM_HEADERS=x-api-key={API_KEY}`

Any typed configuration options will override environment variables of the same name.

---

See the [*Configuration*](#configuration) section for the full list of options.

### OpenTelemetry SDK configuration

Once the rotel collector agent is running, you may need to configure your application's instrumentation. If you are using the default rotel endpoints of *localhost:4317* and *localhost:4318*, then you should not need to change anything. 

To set the endpoint the OpenTelemetry SDK will use, set the following environment variable:

* `OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317`

## Configuration

This is the full list of options and their environment variable alternatives. Any defaults left blank in the table are either False or None.

| Option Name                    | Type         | Environ                              | Default              | Options         |
|--------------------------------|--------------|--------------------------------------|----------------------|-----------------|
| enabled                        | boolean      | ROTEL_ENABLED                        |                      |                 |
| pid_file                       | string       | ROTEL_PID_FILE                       | /tmp/rotel-agent.pid |                 |
| log_file                       | string       | ROTEL_LOG_FILE                       | /tmp/rotel-agent.log |                 |
| log_format                     | string       | ROTEL_LOG_FORMAT                     | text                 | json, text      |
| debug_log                      | string[]     | ROTEL_DEBUG_LOG                      |                      | traces, metrics |
| otlp_grpc_endpoint             | string       | ROTEL_OTLP_GRPC_ENDPOINT             | localhost:4317       |                 |
| otlp_http_endpoint             | string       | ROTEL_OTLP_HTTP_ENDPOINT             | localhost:4318       |                 |
| otlp_receiver_traces_disabled  | boolean      | ROTEL_OTLP_RECEIVER_TRACES_DISABLED  |                      |                 |
| otlp_receiver_metrics_disabled | boolean      | ROTEL_OTLP_RECEIVER_METRICS_DISABLED |                      |                 |
| otlp_receiver_logs_disabled    | boolean      | ROTEL_OTLP_RECEIVER_LOGS_DISABLED    |                      |                 |
| exporter                       | OTLPExporter |                                      |                      |                 |

The OTLPExporter can be enabled with the following options.

| Option Name            | Type                   | Environ                                    | Default | Options      |
|------------------------|------------------------|--------------------------------------------|---------|--------------|
| endpoint               | string                 | ROTEL_OTLP_EXPORTER_ENDPOINT               |         |              |
| protocol               | string                 | ROTEL_OTLP_EXPORTER_PROTOCOL               | grpc    | grpc or http |
| headers                | Map<string, string>    | ROTEL_OTLP_EXPORTER_CUSTOM_HEADERS         |         |              |
| compression            | string                 | ROTEL_OTLP_EXPORTER_COMPRESSION            | gzip    | gzip or none |
| request_timeout        | string                 | ROTEL_OTLP_EXPORTER_REQUEST_TIMEOUT        | 5s      |              |
| retry_initial_backoff  | string                 | ROTEL_OTLP_EXPORTER_RETRY_INITIAL_BACKOFF  | 5s      |              |
| retry_max_backoff      | string                 | ROTEL_OTLP_EXPORTER_RETRY_MAX_BACKOFF      | 30s     |              |
| retry_max_elapsed_time | string                 | ROTEL_OTLP_EXPORTER_RETRY_MAX_ELAPSED_TIME | 300s    |              |
| batch_max_size         | number                 | ROTEL_OTLP_EXPORTER_BATCH_MAX_SIZE         | 8192    |              |
| batch_timeout          | string                 | ROTEL_OTLP_EXPORTER_BATCH_TIMEOUT          | 200ms   |              |
| tls_cert_file          | string                 | ROTEL_OTLP_EXPORTER_TLS_CERT_FILE          |         |              |
| tls_key_file           | string                 | ROTEL_OTLP_EXPORTER_TLS_KEY_FILE           |         |              |
| tls_ca_file            | string                 | ROTEL_OTLP_EXPORTER_TLS_CA_FILE            |         |              |
| tls_skip_verify        | boolean                | ROTEL_OTLP_EXPORTER_TLS_SKIP_VERIFY        |         |              |

### Endpoint overrides

When using the OTLP exporter over HTTP, the exporter will append `/v1/traces`, `/v1/metrics`, or `/v1/logs` to the endpoint URL for traces, metrics, and logs respectively. If the service you are exporting telemetry data to does not support these standard URL paths, you can individually override them for traces, metrics, and logs.

For example, to override the endpoint for traces and metrics you can do the following:
```javascript
const { Rotel } = require("@streamfold/rotel");

const rotel = new Rotel({
  enabled: true,
  exporter: {
      headers: {
          "x-api-key" : "xxxxx",
      },
      traces: {
        endpoint: "http://foo.example.com:4318/api/otlp/traces",
      },
      metrics: {
            endpoint = "http://foo.example.com:4318/api/otlp/metrics",
      }
  },
});
rotel.start();
```

Or, you can override the endpoints using environment variables:
* `ROTEL_OTLP_EXPORTER_TRACES_ENDPOINT=http://foo.example.com:4318/api/otlp/traces`
* `ROTEL_OTLP_EXPORTER_METRICS_ENDPOINT=http://foo.example.com:4318/api/otlp/metrics`
* `ROTEL_OTLP_EXPORTER_METRICS_ENDPOINT=http://foo.example.com:4318/api/otlp/logs`

All the OTLP exporter settings can be overridden per endpoint type (traces, metrics, logs). Any value that is not overridden will fall back to the top-level exporter configuration or the default.

### Retries and timeouts

You can override the default request timeout of 5 seconds for the OTLP Exporter with the exporter setting:

* `request_timeout`: Takes a string time duration, so `"250ms"` for 250 milliseconds, `"3s"` for 3 seconds, etc.

Requests will be retried if they match retryable error codes like 429 (Too Many Requests) or timeout. You can control the behavior with the following exporter options:

* `retry_initial_backoff`: Initial backoff duration
* `retry_max_backoff`: Maximum backoff interval
* `retry_max_elapsed_time`: Maximum wall time a request will be retried for until it is marked as permanent failure

All options should be represented as string time durations.

### Full OTEL example

To illustrate this further, here's a full example of how to use Rotel to send trace spans to [Axiom](https://axiom.co/)
from an application instrumented with OpenTelemetry.

The code sample depends on the following environment variables:
* `ROTEL_ENABLED=true`: Turn on or off based on the deployment environment
* `AXIOM_DATASET`: Name of an Axiom dataset
* `AXIOM_API_TOKEN`: Set to an API token that has access to the Axiom dataset

```javascript
const { Rotel } = require("@streamfold/rotel");

const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { trace } = require('@opentelemetry/api');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { ATTR_SERVICE_NAME } = require ('@opentelemetry/semantic-conventions');
const { resourceFromAttributes } = require('@opentelemetry/resources');

function initRotel() {
  const rotel = new Rotel({
    enabled: true,
    exporter: {
      endpoint: "https://api.axiom.co",
      protocol: "http",
      headers: {
        "Authorization": "Bearer " + process.env.AXIOM_API_TOKEN,
        "X-Axiom-Dataset": process.env.AXIOM_DATASET
      }
    },
  })
  return rotel;
}

function initOtel() {
  const exporter = new OTLPTraceExporter({                                                                                                                   
    url: 'http://127.0.0.1:4317', // points to out local rotel collector                                                                                                                    
  });                                                                                                                                                  
                                                                                                                                                     
  // Initialize the tracer provider                                                                                                                    
  const provider = new NodeTracerProvider({
    resource: resourceFromAttributes({
      [ATTR_SERVICE_NAME]: 'rotel-nodejs-service',
    }),
    spanProcessors: [
        new SimpleSpanProcessor(exporter)
    ],
  });

  // Register the provider as the global tracer provider
  provider.register();
  return provider;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main routine
  async function main() {
  const rotel = initRotel();
  const provider = initOtel();
  rotel.start();
  console.log("Hello from example");
  const tracer = trace.getTracer('rotel-node-js-hello-world');
  console.log("starting main span");
  const mainSpan = tracer.startSpan('main');
  // sleep for a second to simulate span start/end time
  await sleep(1000);
  mainSpan.end();
  console.log("main span ended, flushing")
  await provider.forceFlush();
  await provider.shutdown();
  rotel.stop();
  console.log("goodbye")
}

main();

```

For the complete example, see the [hello world](https://github.com/streamfold/rotel-nodejs-hello-world) application.

## Debugging

If you set the option `debug_log` to `["traces"]`, or the environment variable `ROTEL_DEBUG_LOG=traces`, then rotel will log a summary to the log file `/tmp/rotel-agent.log` each time it processes trace spans. You can add also specify *metrics* to debug metrics and *logs* to debug logs.   

## FAQ

### Do I need to call `rotel.stop()` when I exit?

In most deployment environments you do not need to call `rotel.stop()` and it is **generally recommended that you don't**. Calling `rotel.stop()` will
terminate the running agent on a host, so any further export calls from OTEL instrumentation will fail. In a multiprocess environment, such as
[clusters](https://nodejs.org/api/cluster.html) of node.js processes, terminating the Rotel agent from one process will terminate it for all other processes. On ephemeral deployment platforms, it is
usually fine to leave the agent running until the compute instance, VM/container/isolate, terminate.

## Community

Want to chat about this project, share feedback, or suggest improvements? Join our [Discord server](https://discord.gg/reUqNWTSGC)! Whether you're a user of this project or not, we'd love to hear your thoughts and ideas. See you there! 🚀

## Developing

See the [DEVELOPING.md](DEVELOPING.md) doc for building and development instructions.
