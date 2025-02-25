---
repo: azu/exponential-backoff-generator
url: 'https://github.com/azu/exponential-backoff-generator'
homepage: ''
starredAt: '2021-11-21T23:17:11Z'
createdAt: '2019-05-26T03:58:19Z'
updatedAt: '2023-10-21T20:28:37Z'
language: TypeScript
license: MIT
branch: master
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:36.321Z'
description: Exponential backoff generator. Provide robust retry function.
tags:
  - async
  - exponential-backoff
  - retry
  - typescript
---

# exponential-backoff-generator [![Actions Status: test](https://github.com/azu/exponential-backoff-generator/workflows/test/badge.svg)](https://github.com/azu/exponential-backoff-generator/actions?query=workflow%3A"test")

Exponential backoff generator. This library provide robust retry function.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install exponential-backoff-generator

Requirement:

- Support ECMAScript 2018+

## Usage

```ts
export type BackoffOptions = {
    // max retry count
    // Default: 7
    retries?: number;
    // Initial timeout in milliseconds
    // Default: 100
    // Note: `min` should be grater than 0.
    min?: number;
    // max timeout in milliseconds
    // Default: 10 * 1000(10 seconds)
    max?: number;
    // Timeout will be multiplied by Factor.
    // Default: 2
    // Default durations are 2 * 100, 4 * 100, 8 * 100, 16 * 100, 32 * 100
    factor?: number;
    // Adding random jitter to each duration
    // jitter value should be 0 - 1.0
    // jitter value is seed value for Math.random().
    // Default: 0
    // For more details, see https://aws.amazon.com/jp/blogs/architecture/exponential-backoff-and-jitter/
    jitter?: number;
}
export declare function generateBackoff(options?: BackoffOptions): IterableIterator<{
    attempts: number;
    duration: number;
    sleep(): Promise<{}>;
}>;
```

`generateBackoff()` function return an iterable objects.
The iterable objects has these properties.

- `attempts`: current try count
- `duration`: duration for current attempts
- `sleep`: a function return a promise that will be resolved after `duration`

It works with [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) statement.

```js
import { generateBackoff } from "exponential-backoff-generator";
const doAsyncTask = async () => {
    const backoff = generateBackoff();
    for (const { sleep } of backoff) {
        try {
            return await YourAsyncTaskWantToRetry();
        } catch(error) {
            await sleep(); // wait 100ms, 200ms, 400ms, 800ms ...
        }
    }
    throw new Error("YourAsyncTaskWantToRetry failed at all");
};

doAsyncTask().then(result => {
    console.log(result); // YourAsyncTaskWantToRetry resolved value
}).catch(error => {
    console.error(error); // Error: YourAsyncTaskWantToRetry failed at all
});
```

[Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) create an array from iterable object.

```js
import { generateBackoff } from "exponential-backoff-generator";
const backoff = generateBackoff();
// create duration array from iterable objects.
const generated = Array.from(backoff, (({ duration }) => duration));
assert.deepStrictEqual(generated, [
    100, // duration for each attempt
    200,
    400,
    800,
    1600,
    3200,
    6400,
    10000
]);
```

## Examples

```js
const doAsyncTask = async () => {
    const rejectOrResolve = () => {
        if (Math.random() < 0.5) {
            return Promise.resolve("value");
        } else {
            return Promise.reject(new Error("reject"));
        }
    };
    const backoff = generateBackoff({
        retries: 7, // max retry count
        min: 100, // min duration is 100ms
        max: 10 * 1000 // max duration is 10sec
    });
    for (const { sleep } of backoff) {
        try {
            // Do not forget `await`!
            return await rejectOrResolve();
        } catch(error) {
            await sleep();
        }
    }
    // all retries are failed, invoke current line
    throw new Error("doAsyncTask failed at all");
};

doAsyncTask().then(value => {
    // if anyone retry is success, call then block
    console.log(value); // => "value"
}).catch(error => {
    // if all retries are failed, call catch block
    console.error(error); // => Error: doAsyncTask failed at all
})
````

## See Also

- [yoshuawuyts/exponential-backoff: Exponential backoff generator with jitter.](https://github.com/yoshuawuyts/exponential-backoff)
- [Designing robust and predictable APIs with idempotency](https://stripe.com/ja-us/blog/idempotency)
- [segmentio/backo: exponential backoff without the weird cruft](https://github.com/segmentio/backo)
- [Exponential backoff - Wikipedia](https://en.wikipedia.org/wiki/Exponential_backoff)
- [Error Retries and Exponential Backoff in AWS - Amazon Web Services](https://docs.aws.amazon.com/general/latest/gr/api-retries.html)


## Changelog

See [Releases page](https://github.com/azu/exponential-backoff-generator/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/exponential-backoff-generator/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
