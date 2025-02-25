---
repo: thundra-io/treq
url: 'https://github.com/thundra-io/treq'
homepage: ''
starredAt: '2022-03-31T00:32:04Z'
createdAt: '2022-03-28T16:30:50Z'
updatedAt: '2024-01-24T19:50:24Z'
language: JavaScript
license: MIT
branch: master
stars: 32
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:52.682Z'
description: Tracer for module requires/imports to optimize coldstarts in serverless
tags:
  - aws
  - aws-lambda
  - aws-lambda-node
  - coldstart
  - profiling
  - serverless
  - tracing
---

# treq

![workflow](https://github.com/serkan-ozal/treq/actions/workflows/build.yml/badge.svg)
[![npm version](https://badge.fury.io/js/treq.svg)](https://badge.fury.io/js/treq)
![license](https://img.shields.io/badge/license-MIT-blue)

`treq` is a library to automatically trace requires/imports in your serverless applications 
and gives you insights about the most expensive modules in terms of coldstart overhead.

```
START RequestId: 7419d6fb-7dcb-4c53-a689-0d1d352328bc Version: $LATEST
2022-03-28T20:28:47.740Z	undefined	INFO	|-- require('/var/task/index.js') took 630.785845 ms
2022-03-28T20:28:47.740Z	undefined	INFO	..|-- require('@aws-sdk/client-dynamodb') took 282.050937 ms
2022-03-28T20:28:47.740Z	undefined	INFO	....|-- require('./DynamoDB') took 262.586494 ms
2022-03-28T20:28:47.740Z	undefined	INFO	......|-- require('./commands/BatchExecuteStatementCommand') took 54.849051 ms
2022-03-28T20:28:47.740Z	undefined	INFO	........|-- require('@aws-sdk/smithy-client') took 10.210297 ms
2022-03-28T20:28:47.740Z	undefined	INFO	........|-- require('../protocols/Aws_json1_0') took 25.35611 ms
2022-03-28T20:28:47.740Z	undefined	INFO	..........|-- require('uuid') took 11.320902 ms
2022-03-28T20:28:47.740Z	undefined	INFO	......|-- require('./DynamoDBClient') took 187.273312 ms
2022-03-28T20:28:47.740Z	undefined	INFO	........|-- require('@aws-sdk/config-resolver') took 12.8885 ms
2022-03-28T20:28:47.740Z	undefined	INFO	........|-- require('@aws-sdk/middleware-endpoint-discovery') took 12.118507 ms
2022-03-28T20:28:47.740Z	undefined	INFO	........|-- require('@aws-sdk/middleware-retry') took 13.529461 ms
2022-03-28T20:28:47.740Z	undefined	INFO	........|-- require('@aws-sdk/middleware-signing') took 17.70112 ms
2022-03-28T20:28:47.740Z	undefined	INFO	..........|-- require('./configurations') took 14.718523 ms
2022-03-28T20:28:47.740Z	undefined	INFO	............|-- require('@aws-sdk/signature-v4') took 11.853916 ms
2022-03-28T20:28:47.740Z	undefined	INFO	..............|-- require('./SignatureV4') took 10.149309 ms
2022-03-28T20:28:47.740Z	undefined	INFO	........|-- require('./runtimeConfig') took 123.567573 ms
2022-03-28T20:28:47.740Z	undefined	INFO	..........|-- require('@aws-sdk/client-sts') took 120.895623 ms
2022-03-28T20:28:47.740Z	undefined	INFO	............|-- require('./STS') took 116.251668 ms
2022-03-28T20:28:47.741Z	undefined	INFO	..............|-- require('./commands/AssumeRoleCommand') took 22.53696 ms
2022-03-28T20:28:47.741Z	undefined	INFO	................|-- require('../protocols/Aws_query') took 20.750245 ms
2022-03-28T20:28:47.741Z	undefined	INFO	..................|-- require('entities') took 14.045998 ms
2022-03-28T20:28:47.741Z	undefined	INFO	..............|-- require('./STSClient') took 89.669653 ms
2022-03-28T20:28:47.741Z	undefined	INFO	................|-- require('./runtimeConfig') took 87.875766 ms
2022-03-28T20:28:47.741Z	undefined	INFO	..................|-- require('@aws-sdk/credential-provider-node') took 84.898272 ms
2022-03-28T20:28:47.741Z	undefined	INFO	....................|-- require('./defaultProvider') took 83.672074 ms
2022-03-28T20:28:47.741Z	undefined	INFO	......................|-- require('@aws-sdk/credential-provider-ini') took 76.227651 ms
2022-03-28T20:28:47.741Z	undefined	INFO	........................|-- require('./fromIni') took 75.707995 ms
2022-03-28T20:28:47.741Z	undefined	INFO	..........................|-- require('./resolveProfileData') took 70.243135 ms
2022-03-28T20:28:47.741Z	undefined	INFO	............................|-- require('./resolveAssumeRoleCredentials') took 12.684291 ms
2022-03-28T20:28:47.741Z	undefined	INFO	..............................|-- require('./resolveCredentialSource') took 12.257091 ms
2022-03-28T20:28:47.741Z	undefined	INFO	................................|-- require('@aws-sdk/credential-provider-imds') took 11.887286 ms
2022-03-28T20:28:47.741Z	undefined	INFO	............................|-- require('./resolveSsoCredentials') took 54.422646 ms
2022-03-28T20:28:47.741Z	undefined	INFO	..............................|-- require('@aws-sdk/credential-provider-sso') took 53.719582 ms
2022-03-28T20:28:47.741Z	undefined	INFO	................................|-- require('./fromSSO') took 52.288542 ms
2022-03-28T20:28:47.741Z	undefined	INFO	..................................|-- require('./resolveSSOCredentials') took 50.657345 ms
2022-03-28T20:28:47.741Z	undefined	INFO	....................................|-- require('@aws-sdk/client-sso') took 50.277645 ms
2022-03-28T20:28:47.741Z	undefined	INFO	......................................|-- require('./SSO') took 43.303073 ms
2022-03-28T20:28:47.741Z	undefined	INFO	........................................|-- require('./SSOClient') took 35.038433 ms
2022-03-28T20:28:47.741Z	undefined	INFO	..........................................|-- require('./runtimeConfig') took 34.253186 ms
2022-03-28T20:28:47.741Z	undefined	INFO	............................................|-- require('@aws-sdk/node-http-handler') took 14.914675 ms
2022-03-28T20:28:47.741Z	undefined	INFO	..|-- require('@aws-sdk/client-s3') took 138.489329 ms
2022-03-28T20:28:47.741Z	undefined	INFO	....|-- require('./S3') took 123.365087 ms
2022-03-28T20:28:47.741Z	undefined	INFO	......|-- require('./commands/AbortMultipartUploadCommand') took 44.071934 ms
2022-03-28T20:28:47.741Z	undefined	INFO	........|-- require('../models/models_0') took 10.537944 ms
2022-03-28T20:28:47.741Z	undefined	INFO	........|-- require('../protocols/Aws_restXml') took 27.656476 ms
2022-03-28T20:28:47.741Z	undefined	INFO	......|-- require('./commands/DeleteObjectsCommand') took 15.740644 ms
2022-03-28T20:28:47.741Z	undefined	INFO	........|-- require('@aws-sdk/middleware-flexible-checksums') took 15.35287 ms
2022-03-28T20:28:47.741Z	undefined	INFO	..........|-- require('./flexibleChecksumsMiddleware') took 13.63264 ms
2022-03-28T20:28:47.741Z	undefined	INFO	............|-- require('./selectChecksumAlgorithmFunction') took 10.345904 ms
2022-03-28T20:28:47.741Z	undefined	INFO	......|-- require('./S3Client') took 18.328771 ms
2022-03-28T20:28:47.741Z	undefined	INFO	........|-- require('./runtimeConfig') took 12.748143 ms
2022-03-28T20:28:47.741Z	undefined	INFO	..|-- require('@aws-sdk/client-sqs') took 24.766564 ms
2022-03-28T20:28:47.741Z	undefined	INFO	....|-- require('./SQS') took 19.305477 ms
2022-03-28T20:28:47.741Z	undefined	INFO	..|-- require('@aws-sdk/client-ssm') took 185.064697 ms
2022-03-28T20:28:47.741Z	undefined	INFO	....|-- require('./SSM') took 135.679327 ms
2022-03-28T20:28:47.741Z	undefined	INFO	......|-- require('./commands/AddTagsToResourceCommand') took 62.956037 ms
2022-03-28T20:28:47.741Z	undefined	INFO	........|-- require('../models/models_0') took 17.333932 ms
2022-03-28T20:28:47.741Z	undefined	INFO	........|-- require('../protocols/Aws_json1_1') took 44.988784 ms
2022-03-28T20:28:47.741Z	undefined	INFO	..........|-- require('../models/models_1') took 11.553608 ms
2022-03-28T20:28:47.742Z	undefined	INFO	....|-- require('./commands') took 19.612849 ms
2022-03-28T20:28:47.742Z	undefined	INFO	......|-- require('./ListDocumentsCommand') took 13.616722 ms
2022-03-28T20:28:47.742Z	undefined	INFO	....|-- require('./pagination') took 19.10802 ms
END RequestId: 7419d6fb-7dcb-4c53-a689-0d1d352328bc
REPORT RequestId: 7419d6fb-7dcb-4c53-a689-0d1d352328bc	Duration: 2.86 ms	Billed Duration: 3 ms	Memory Size: 2048 MB	Max Memory Used: 95 MB	Init Duration: 798.59 ms	
XRAY TraceId: 1-62421a7e-0920949e7de8b8455b00f7c4	SegmentId: 05b5512a6f0e008a	Sampled: true	
```

## Installation

You can add `treq` package into your AWS Lambda function either by NPM package or by AWS Lambda layer as shown below:

### By NPM package

To install the middleware, you can use NPM:

```
npm install --save treq
```

### By AWS Lambda Layer

You can also add `treq` as layer into your AWS Lambda function.

```
arn:aws:lambda:${region}:273094347961:layer:treq:${layer-version}

```

**Latest layer version:** ![treq](https://api.globadge.com/v1/badgen/aws/lambda/layer/latest-version/us-east-1/273094347961/treq) (badge powered by [Globadge serverless](https://www.globadge.com/badges/serverless))

**Note:** In the ARN above, you need to replace `${region}` with the actual AWS region you deployed your AWS Lambda function. 


## Usage

* Configure `treq` to be required/bootstrapped automatically at startup by setting `NODE_OPTIONS` environment variable:
```
NODE_OPTIONS=-r treq
```

* **Optionally**, you can configure require duration threshold (in milliseconds) for tracing.
  Requires/imports take lower than the threshold are ignored from tracing. 
  By default, the threshold is `10` milliseconds and it can be configured by `TREQ_DURATION_THRESHOLD` environment variable.
  For example:
```
TREQ_DURATION_THRESHOLD=20
```

* **Optionally**, you can configure maximum depth/level limit to trace nested requires/imports.
  Nested requires/imports deeper than the maximum depth/level limit are ignored from tracing.
  By default, the max depth is `100` and it can be configured by `TREQ_MAX_DEPTH` environment variable.
  For example:
```
TREQ_MAX_DEPTH=3
```

* **Optionally**, you can disable `treq` by setting `TREQ_DISABLE` environment variable to `true`. 
  For example:
```
TREQ_DISABLE=true
```


## Contributing

Everyone is very welcome to contribute to this repository.
Feel free to [raise issues](https://github.com/serkan-ozal/treq/issues)
or to [submit Pull Requests](https://github.com/serkan-ozal/treq/pulls).


## License

Licensed under [MIT License](LICENSE).
