---
repo: johnvmt/graphql-http-ws-client
url: 'https://github.com/johnvmt/graphql-http-ws-client'
homepage: null
starredAt: '2020-08-28T00:48:05Z'
createdAt: '2019-10-15T23:20:43Z'
updatedAt: '2022-06-16T15:21:08Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:38.275Z'
description: null
tags: []
---

## GraphQL client over HTTP/WS

### Node.js with HTTP and WS links, and context

	import { createGraphQLClient } from "graphql-http-ws-client";
	import WebSocket from "ws";
	import fetch from "node-fetch";

    let addContext = async () => {
		return {
			headers: {
				Authorization: `Bearer MYAUTHTOKEN`
			}
		}
    };
	
	const { client } = createGraphQLClient("MY_GRAPHQL_URL", {
		createWSLink: true,
        createHTTPLink: true,
        websocket: WebSocket,
        httpLinkOptions: {
            fetch: fetch,
            setContext: addContext
        },
        wsLinkOptions: {
            connectionParams: addContext
        }
	});

### Node.js with HTTP link only (no Subscriptions)

	import { createGraphQLClient } from "graphql-http-ws-client";
	import fetch from "node-fetch";
	
	const { client } = createGraphQLClient("MY_GRAPHQL_URL", {
		httpLinkOptions: {
		    fetch: fetch
		},
		createWSLink: false
	});

### Node.js with WS link only

	import { createGraphQLClient } from "graphql-http-ws-client";
	import WebSocket from "ws";
	import fetch from "node-fetch";
	
	const { client } = createGraphQLClient("MY_GRAPHQL_URL", {
		websocket: WebSocket,
		createHTTPLink: false
	});

### Node.js with WS link and [graphql-transport-ws subprotocol](https://github.com/enisdenjo/graphql-ws/issues/154)

	import { createGraphQLClient } from "graphql-http-ws-client";
	import WebSocket from "ws";
	import fetch from "node-fetch";
	
	const { client } = createGraphQLClient("MY_GRAPHQL_URL", {
		websocket: WebSocket,
        wsSubprotocol: "graphql-transport-ws",
		createHTTPLink: false
	});

### Node.js with WS link and [graphql-ws subprotocol](https://github.com/enisdenjo/graphql-ws/issues/154) (default)

	import { createGraphQLClient } from "graphql-ws";
	import WebSocket from "ws";
	import fetch from "node-fetch";
	
	const { client } = createGraphQLClient("MY_GRAPHQL_URL", {
		websocket: WebSocket,
        wsSubprotocol: "graphql-ws",
		createHTTPLink: false
	});
	
### React with HTTP and WS links

	import WebSocket from "ws";
	import fetch from "node-fetch";
	import {createGraphQLClient, gql} from "graphql-http-ws-client";
	import { persistCache } from "apollo-cache-persist";
	const { client, cache } = createGraphQLClient("MY_GRAPHQL_URL");
	
	const waitOnCache = persistCache({
		cache: cache,
		storage: window.localStorage
	});
	
	waitOnCache.then(() => {
		ReactDOM.render(
			<ApolloProvider client={client}>
				<Router>
					<App/>
				</Router>
			</ApolloProvider>,
			document.getElementById('root')
		)
	});

### Simple Queries

Using the [server example from graphql-http-ws-server](https://github.com/johnvmt/graphql-http-ws-server#readme)

    client.query({
        query: `query {
            hello
        }`
    }).then(({data}) => {
        console.log("DATA", data);
    });

### Simple Subscriptions

Using the [server example from graphql-http-ws-server](https://github.com/johnvmt/graphql-http-ws-server#readme)

    client.subscribe({
        query: `subscription {
            time
        }`
    }).subscribe({
        next({data}) {
            console.log(data);
        }
    });
    
### Changes

#### v2.0

- Changed package type to module
- Passed-in queries and mutations are now automatically wrapped with gql() tag, if they are not already wrapped

#### v0.3

- Queries and mutations can now be passed as strings instead of being wrapped in the `gql` tag

#### v0.2
- Module now requires graphql and subscriptions-transport-ws as peer dependencies
- Module now exports gql and all exports from @apollo/client/core
- Renamed createWebsocketLink to createWSLink and websocket option to ws for consistency with options
- New httpLinkOptions and wsLinkOptions parameters
    - fetch option moves to httpLinkOptions option
    - all ws link options move to wsLinkOptions option
