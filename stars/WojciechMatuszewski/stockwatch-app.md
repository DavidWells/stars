---
repo: WojciechMatuszewski/stockwatch-app
url: 'https://github.com/WojciechMatuszewski/stockwatch-app'
homepage: null
starredAt: '2021-12-27T23:55:43Z'
createdAt: '2021-12-13T05:21:39Z'
updatedAt: '2024-06-12T15:57:31Z'
language: TypeScript
license: NA
branch: main
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:25.429Z'
description: null
tags: []
---

# StockWatchApp

Inspired by [this video](https://www.youtube.com/watch?v=XoMSzGybxZg) with my own spin.

The main reason for creating this POC were:

- Learning how the new _event source mapping_ filtering works.

- Trying out the _Amazon API Gateway_ integration with _AWS Step Functions_.

## Architecture

The architecture I've built significantly differs from the one presented in the video I was inspired by. This is mostly because there are usually multiple ways to achieve desired result in AWS :)

Instead of watching stock prices, this architecture looks at the _BINANCE:BTCUSDT_ and _BINANCE:BTCUSDT_ pairs.

![Architecture](./images/_architecture.jpeg)

## Deployment

1. `cd infra`

2. `npm run bootstrap`

3. `npm run deploy`

4. Amend the value of the `SymbolsAPIKeyParameter` _SSM_ parameter. Use the APIKey from [https://finnhub.io/](https://finnhub.io/).

5. Either manually execute the `SymbolsPriceOrchestrator` state machine couple of times (with 1-minute interval), or enable the _EventBridge_ scheduled rule.

6. You might want to change the test _SNS_ subscription in `SymbolsEventDispatcher`.

**Please remember that this code is far from production-grade quality. This is just me playing around and learning new concepts**.

## Learnings

- The property in the `Properties` block of a given _CloudFormation_ resource does not have only to be of type _string_. It can also be an array or other structure.

  - Having said that, I think it's better always to pass strings. In Golang, it's easier to _unmarshal_ the structure rather than guess its type.

- The `Test` tab within the _APIGW_ console is handy. It will print all the logs related to a given integration execution.

  - If you are trying to debug an integration error, this is very helpful.

  - You should set up _API Gateway_ logging, but having the quick and dirty way to check them works as well.

- When creating _API Gateway_ `HTTPIntegration`, you are forced to **hardcode** the returned status codes (unless you want to map every possible combination).

  - Check out [this StackOverflow answer](https://stackoverflow.com/a/41682424) for more details.

- **The VTL in the _APIGW_ is not the same as VTL in AppSync**.

  - It looks to me that **AppSync extends the VTL language by adding many helpers**. **_API Gateway_ is also doing that**, but the catch is that **what is available in _AppSync_ might not be available in _API Gateway_ VTL**.

  - There are multiple hints regarding this in the [AppSync documentation](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-context-reference.html).

    > AWS **_AppSync_ defines** a set of variables and functions for working with resolver mapping templates. This makes logical operations on data easier with GraphQL.

- The values you specify in the `requestOverrides` for **_querystrings_** have to be strings. If they are not, _APIGW_ will **silently reject the override and proceed as if you did not specify it in your VTL template**.

  - I hate it when tools "silently fail". It is so much better to "fail in the open".

- The **type coercion** in **_API Gateway_ is weird**.

  - If you specify a variable that is a number in quotation marks, it will become a string.

    ```vtl
    "$context.requestTimeEpoch" // OK
    "$context.requestTimeEpoch - 60" // "123456 + - 60" // WTF :D
    ```

- With the _SDK Integrations_ we can **finally use DynamoDB `Query` operation within the _StepFunctions_**!

  - This is excellent news. You no longer have to write a _Lambda_ function to perform that operation.

- The _APIGW StepFunctions optimized_ integration **requires arrays as properties for `QueryParameters`**.

  How can one use the _JSONPath_ and the `States.Format` with the array requirement?

  ```text
  "symbol.$": "States.StringToJson(States.Format('[\"{}\"]', $.symbols[0].SK.S))"
  ```

- The _APIGW StepFunctions optimized_ integration **does not support the `parameters` (Like in `Pass` state) property**. This makes it hard to format the results correctly.

  - If you use `resultSelector` and `resultPath`, you will end up with a nested object passed to your next state.

  - One could use _Pass_ state just after the _Task_ to format the results

- The `DynamoAttributeValue.fromNumber` in _StepFunctions_ is **broken**!

  - See [this issue](https://github.com/aws/aws-cdk/issues/12456) for more details

- The new _event source mappings_ filtering capabilities are not supported in L2 Lambda CDK constructs.

  - You either have to use the `CfnEventSourceMapping` or [add a manual override as per this blog post](https://medium.com/@philipzeh/event-filtering-for-lambda-functions-using-aws-cdk-d332140590f8).

  - The filtering capabilities are neat! And the supported syntax is the same as _EventBridge_.

  - You can learn a bit more about the technology behind the feature by reading [this blog post](https://www.tbray.org/ongoing/When/202x/2021/12/03/Filtering-Lessons).

- The _EventBridge_ `PutEvents` API is a bit awkward to use with the `ReportBatchItemFailures` setting (for example, in the context of _DynamoDB_).

  - The response from `PutEvents` contains the `EventID` attribute, but this ID is the internal _EventBridge_ event ID, not the ID of the event you are reading from the source.

  - To monitor failed events, you can either use _DLQ_ or rely on a metric that _EventBridge_ updates.

  - Note that **the _DLQ_ is set in the context of a rule and not in the context of a bus**. This means that if the `PutEvents` call fails, you need to handle it separately from the events that are pushed to the _DLQ_.

- **The `PutRule` API call does not support adding the _target_**.

  - This is **very different from how the `AWS::Events::Rule` _CloudFormation_ resource works**. There you can specify the target along with the rule.

- The **_EventBridge_ to _SNS_ integration does not support setting the `MessageAttributes` property**.

  - It would be awesome if that support was present. I would not have to resort to using a _Lambda_ function in-between those two services just to set the `MessageAttributes` property.

- The **_SNS_ `MessageDeduplicationId` parameter is only allowed for FIFO topics**. Makes sense.

  - It would be neat to have `MessageIdempotencyId` or something similar available to us.
