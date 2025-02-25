---
repo: rob-blackbourn/jetblack-graphql-client
url: 'https://github.com/rob-blackbourn/jetblack-graphql-client'
homepage: null
starredAt: '2020-08-27T23:43:58Z'
createdAt: '2018-11-16T15:58:41Z'
updatedAt: '2023-10-05T09:38:24Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 22
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:38.399Z'
description: 'A simple non-caching GraphQL client for query, mutation and subscription'
tags: []
---

# jetblack-graphql-client

This is work in progress.

## Overview

A simple non-caching GraphQL client for query, mutation and subscription.

I wanted a simple non-caching GraphQL subscription client written in ES6
javascript with no external dependencies.

The protocol for GraphQL WebSocket subscriptions can be found [here](https://github.com/apollographql/subscriptions-transport-ws/blob/master/PROTOCOL.md).

This implementation is deliberately explicit and low on features as I wanted to keep
the algorithm clear. Features like observables and caching should be implmented in
other libraries. For example see [here](https://github.com/rob-blackbourn/jetblack-graphql-reconnect-client)
for a reconnecting subscriber.

## Installation

Install from npm.

```bash
yarn add @jetblack/graphql-client
```

## Usage

There are two functions:

 * `graphQLSubscriber (url, options, callback, protocols = 'graphql-ws')`
 * `graphQLFetch (url, query, variables = {}, operationName = null, init = fetchOptions)`

The `graphQLSubscriber` implements the `WebSocket` protocol. The function takes the
`url` for the `WebSocket`, an `options` object which is simply passed as JSON to the
server, and a `callback` with the prototype `(error, subscribe)`. A function is returned
which can be used to shutdown the subscriber.
If both `error` and `subscribe` are `null` the connection has been closed normally.

The `subscribe` argument is a function with the prototype `subscribe(query, variables, operationName, callback)`.
When `subscribe` is called it returns a function that can be called to unsubscribe.
The `callback` to the `subscribe` function has the prototype `callback(error, data)`. If
both `error` and `data` are `null` then connection hs been closed normally.

The `protocols` defaults to `"graphql-ws"`. The documentation suggests this can be an array or strings, but the first should be the default.

The `graphQLFetch` function is a simple `fetch` implementation for `query` and `mutation` operations.
There are numerous implementations of this available, and it is provided for convenience.
The `init` parameter is passed through to fetch. It has the default value `fetchOptions` which is defined as:

```js
const fetchOptions = {
  method: 'post',
  headers: { 'Content-Type': 'application/json' }
}

// The fetchOptions can be extended.
const myFetchOptions = {
    ...fetchOptions,
    mode: 'cors'
}
```



There follows an example of the `graphQLSubscriber`.

```js
import { Subscriber } from '@jetblack/graphql-client'

const url = 'ws://localhost/subscriptions'
const options = {}

const query = `
subscription {
    mySubscription {
        someData
    }
}
`
variables = {}
operationName = null

const shutdown = graphQLSubscriber(
    url,
    options,
    (error, subscribe) => {
        if (!(error || subscribe)) {
            // Normal closure.
            return
        }
        if (error) {
            console.error(error)
            throw error
        }
        const unsubscribe = subscribe(
            query,
            variables,
            operationName,
            (error, data) => {
                if (!(error || subscribe)) {
                    // Normal closure
                    return
                }
                if (error) {
                    console.error(error)
                    throw error
                }
                console.log(data)
            })
        
        // Some time later ...
        unsubscribe()
    })

// Some time later ...
shutdown()
```

The graphQLFetch function is used as follows.

```js
import { Fetcher } from '@jetblack/graphql-client'

const fetcher = new RetryFetcher('http://localhost/graphql')

// An example mutation.
graphQLFetch(
    `
mutate CreditAccount($account: ID!, $amount: Float!) {
    creditAccount(account: $account, amount: $amount) {
        balance
    }
}`,
    {
        account: '1234',
        amount: 19.99
    }
)
.then(respoonse => response.json())
.then(response => {
    console.log(response.data.balance)
})
.catch(error => {
    console.error(error)
})
```
