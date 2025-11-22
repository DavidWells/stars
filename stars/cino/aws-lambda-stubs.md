---
repo: cino/aws-lambda-stubs
url: 'https://github.com/cino/aws-lambda-stubs'
homepage: ''
starredAt: '2025-11-05T02:39:13Z'
createdAt: '2025-10-13T18:29:48Z'
updatedAt: '2025-11-21T15:27:07Z'
language: TypeScript
license: MIT
branch: main
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-11-22T22:30:55.116Z'
description: Providing stubs for all AWS Lambda invocation types for easy unit testing
tags:
  - lambda
  - stubs
  - testing
  - typescript
---

# AWS Lambda Stubs

Gone are the days you need to write stubs to unit test your AWS Lambda functions locally. This repository provides simple stubs for AWS Lambda services, allowing you to focus on writing and testing your Lambda functions without the overhead of continuously writing the same boilerplate stubs.

This is highly inspired by [@types/aws-lambda](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-lambda) that already provides the type definitions for AWS Lambda events and context.

There is support for all the typed AWS Lambda events defined in [@types/aws-lambda](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-lambda) and will be continuously updated as new event types are added. Each event that exists in [@types/aws-lambda](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-lambda) will have a corresponding stub function that is named by appending `Stub` to the event name. For example, for the `SQSEvent` type, there will be a `SQSEventStub` function that generates a stubbed SQS event object.

## Installation

You can install the package via npm:

```bash
npm install --save-dev aws-lambda-stubs
```

## Usage

Here's a simple example of how to use the stubs in your unit tests, given that `handler` is a Lambda function you want to test:

```typescript
import { SQSEventStub } from "aws-lambda-stubs";
import { describe, expect, it } from "vitest";
import { handler } from "../src/sqs";

describe("sqs handler", () => {
  it("should log the received event", async () => {
    const mockEvent = SQSEventStub([
      {
        body: { message: "Hello, World!" },
      }
    ]);

    expect(handler(mockEvent)).toEqual({});
  });
});
```

The content of mockEvent will be:

```json
{
  "Records": [
    {
      "messageId": "1",
      "receiptHandle": "MessageReceiptHandle",
      "body": "{\"key\":\"value\"}",
      "attributes": {
        "ApproximateReceiveCount": "1",
        "SentTimestamp": "1523232000000",
        "SenderId": "123456789012",
        "ApproximateFirstReceiveTimestamp": "1523232000001"
      },
      "messageAttributes": {},
      "md5OfBody": "a7353f7cddce808de0032747a0b7be50",
      "eventSource": "aws:sqs",
      "eventSourceARN": "arn:aws:sqs:us-east-1:012345678901:queue-name",
      "awsRegion": "us-east-1"
    }
  ]
}
```

As you can see, the stub provides a valid SQS event object that can be used to test your Lambda function locally. Saving you the trouble of having to create these objects manually.

Using the stubs will provide you valid AWS Lambda event objects, that are type-safe and in-sync with the actual AWS Lambda event definitions and typescript types from [@types/aws-lambda](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-lambda).


> [!IMPORTANT]
> Always customize the stub data to match your specific test cases. The stubs provide default values, but you should modify them to reflect the scenarios you want to test. Especially ensure that if you are checking against specific values in your tests, the stub data should match those values accordingly to avoid test failures if the default stubs change.


## Contributing

Contributions are welcome! If you have suggestions for new stubs or improvements to existing ones, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
