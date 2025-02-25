---
repo: theritikchoure/carrierjs
url: 'https://github.com/theritikchoure/carrierjs'
homepage: 'https://carrier.js.org'
starredAt: '2022-10-26T05:01:04Z'
createdAt: '2022-08-12T08:38:15Z'
updatedAt: '2023-10-10T12:56:46Z'
language: JavaScript
license: MIT
branch: master
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:16.643Z'
description: >-
  Carrier JS is promise based http client for browsers. It is used to interact
  with servers with ultimate caching feature.
tags:
  - carrierjs
  - hacktoberfest
  - hacktoberfest-accepted
  - hacktoberfest2023
  - javascript
  - nodejs
  - npm-package
  - promise
---

![Flow of Carrierjs](./docs/assets/images/carrierjs.png)

# Carrier JS

> Carrier JS is a **caching** based HTTP client for browsers. It has the ability to store copies of frequently accessed data in several places along the request-response path. It deliver cached responses for common requests and helps to access data  quickly and inexpensively.

[![NPM](https://img.shields.io/npm/v/carrierjs.svg)](https://www.npmjs.com/package/carrierjs) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![](https://data.jsdelivr.com/v1/package/npm/carrierjs/badge)](https://www.jsdelivr.com/package/npm/carrierjs) [![install size](https://packagephobia.com/badge?p=carrierjs)](https://packagephobia.com/result?p=carrierjs) [![Twitter Follow](https://img.shields.io/twitter/follow/carrier_js?label=Follow%20%40carrier_js&style=social)](https://twitter.com/carrier_js) [![Featured on Openbase](https://badges.openbase.com/js/featured/carrierjs.svg?style=openbase&token=aMSx3X4kMh92xyGaBRde6CF6tch2lyajOB1qU0M2M+Q=)](https://openbase.com/js/carrierjs?utm_source=embedded&amp;utm_medium=badge&amp;utm_campaign=rate-badge)

[![npm](https://img.shields.io/npm/dw/carrierjs?style=social)](https://www.npmjs.com/package/carrierjs)

[![NPM](https://nodei.co/npm/carrierjs.png)](https://nodei.co/npm/carrierjs/)

## Table of Contents

- [Why CarrierJs](#why-carrierjs)
- [How it works internally](#how-it-works-internally)
- [Benefits](#benefits)
- [Features](#features)
- [Browser Support](#browser-support)
- [Installation](#installation)
- [Examples](#examples)
- [Request method aliases](#request-method-aliases)
- [Set Request Headers](#set-request-headers)
- [Response Object](#response-object)
- [Handling Errors](#handling-errors)
- [References](#references)
- [Contribution](#contribution)
- [Attribution](#attribution)
- [License](#license)

## Why CarrierJs

Duplicate API requests are common and if dealt wisely, can help developers in creating a seamless user experience. In a scalable application, duplicate API requests can be problematic to the resources on a server, can affect the cost, and can interrupt performance.

That is why it is important to pay attention to API calls and ensure that no duplicate request is passed to the API server.

**Possible Reasons for duplicate API requests -**

There can be different scenarios where an API is called multiple times to get the data. For example,

- When a user taps on a button multiple times before it gets disabled.

- At times, one API response causes another API request to execute. Let's understand this with an analogy. There are several books with the same author details. As the details of the book get loaded, another requests to load the author's details is passed consequently. In this scenario, the request for multiple book details can hit the author's details API (while one is already under execution).

- API requests on scroll events can hit an API multiple times as the scroll event triggers rapidly.

![Flow of Carrierjs](./docs/assets/images/carrierjs-multiple-api-call.png)

To prevent from the duplicate API requests, **CarrierJs** comes into the picture 👇.

## How it works internally

Carrier JS operates with a robust internal mechanism that optimizes API requests through caching and allows you to control data freshness. Here's a detailed breakdown of its internal workings:

1. **Cache Check:** When you initiate an API request using Carrier JS, it first checks its cache to determine if the requested data is already stored there.

2. **Cache Hit:** If the data is found in the cache, Carrier JS promptly retrieves this cached data and returns it as the response. This cache hit not only accelerates response times but also reduces the load on the API server.

3. **Cache Miss:** In cases where the data is not present in the cache, Carrier JS seamlessly proceeds to fetch the data from the API server. It makes a network request to obtain the required information.

4. **Cache Write:** After successfully fetching the data from the API server, Carrier JS writes a copy of this data into its cache. This cache write operation ensures that the data is readily available for subsequent requests.

5. **Caching Benefits:** Subsequent requests for the same data benefit from this caching mechanism. Carrier JS serves the data directly from the cache, eliminating the need to re-fetch it from the server. This results in improved performance, reduced network traffic, and efficient resource utilization.

#### Controlling Data Freshness with refresh Parameter

Carrier JS provides you with the flexibility to decide whether you want to retrieve fresh data from the API server or use cached data. You can achieve this control by utilizing the `refresh` parameter.

- **Using `refresh`:** If you require the freshest data from the API server every time, simply include an extra parameter in your request URL — `refresh=true`. This instructs Carrier JS to bypass the cache and initiate a new request to obtain the latest data from the server.

#### Ultimate Caching Feature

Carrier JS's caching feature is designed to enhance the performance and efficiency of your application. It reduces the overhead of redundant server requests, minimizes bandwidth consumption, and ensures a responsive user experience.

The diagram below illustrates the seamless flow of Carrier JS as it internally fulfills requests, highlighting the prowess of its caching feature:

![Flow of Carrierjs](./docs/assets/images/code-flow.png)

With Carrier JS, you have the power to strike the perfect balance between performance optimization and data accuracy, all while minimizing the load on your API server.

## Benefits

There are several benefits of caching your API's response. Here are some of them:

- Your quality of service improves.
- The website consumes less bandwidth.
- The website latency decreases.
- Server load also decreases.

## Features

- Make **XMLHttpRequest** from browser
- Supports **All Browsers**
- Enable IndexedDB Based Caching which can store **250MB** of data
- Data will not expire unless explicit deletion of the database **(persistent storage)**
- It decreases server round trips for fetching data from the database by persisting data in the memory.

## Browser Support

| Chrome | Edge | Firefox | Opera | Safari |
| ------ | ---- | ------- | ----- | ------ |
| ✅     | ✅   | ✅      | ✅    | ✅     |

## Installation

### Using NPM

```bash
npm install --save carrierjs
```

### Using YARN

```bash
yarn add carrierjs
```

### Using cdnjs

```bash
<script src="https://cdnjs.cloudflare.com/ajax/libs/carrierjs/2.5.2/carrier.js">
```

### Using jsDelivr

```bash
<script src="https://cdn.jsdelivr.net/npm/carrierjs@latest/carrier.js">
```

### Using unpkg

```bash
<script src="https://unpkg.com/carrierjs@latest/carrier.js">
```

## Examples

**Performing a GET request:**

```jsx
import carrier from 'carrierjs';

// Using Promise
carrier.get('https://jsonplaceholder.typicode.com/todos/').then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
});

---------

// Using Async/Await
async function getUser() {
  try {
    const response = await carrier.get('https://jsonplaceholder.typicode.com/todos/')
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

getUser();
```

**Performing a POST request:**

```jsx
import carrier from 'carrierjs';

const data = {
    title: "delectus aut autem",
    completed: false
}

// Using Promise
carrier.post('https://jsonplaceholder.typicode.com/todos', data).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
});

---------

// Using Async/Await
async function createUser(data) {
  try {
    const response = await carrier.post('https://jsonplaceholder.typicode.com/todos', data)
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

createUser(data);
```

**Performing a PUT request:**

```jsx
import carrier from 'carrierjs';

const data = {
  title: "delectus aut autem",
  completed: false
}

// Using Promise
carrier.put('https://jsonplaceholder.typicode.com/todos/5', data).then((result) => {
  console.log(result)
}).catch((err) => {
  console.log(err)
});

---------

// Using Async/Await
async function updateUser(data) {
  try {
    const response = await carrier.put('https://jsonplaceholder.typicode.com/todos/5', data)
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

updateUser(data);
```

**Performing a PATCH request:**

```jsx
import carrier from 'carrierjs';

const data = {
  title: "delectus aut autem",
  completed: false
}

// Using Promise
carrier.patch('https://jsonplaceholder.typicode.com/todos/5', data).then((result) => {
  console.log(result)
}).catch((err) => {
  console.log(err)
});

---------

// Using Async/Await
async function updateUser(data) {
  try {
    const response = await carrier.patch('https://jsonplaceholder.typicode.com/todos/5', data)
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

updateUser(data);
```

**Performing a DELETE request:**

```jsx
import carrier from 'carrierjs';

// Using Promise
carrier.delete('https://jsonplaceholder.typicode.com/todos/5').then((result) => {
  console.log(result)
}).catch((err) => {
  console.log(err)
});

---------

// Using Async/Await
async function deleteUser(data) {
  try {
    const response = await carrier.delete('https://jsonplaceholder.typicode.com/todos/')
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

deleteUser(data);
```

## Request method aliases

For your ease, aliases have been provided for request methods.

**carrier.get(url, [refresh], [options])**

**carrier.post(url, [data], [options])**

**carrier.put(url, [data], [options])**

**carrier.patch(url, [data], [options])**

**carrier.delete(url, [data], [options])**

**Note -** While using this methods, `url` is required, `data` and `options` are optional. `refresh` is by default `false`. If you want to get fresh data everytime from the server, you need to send `true` after `url` parameter.

## Set Request Headers

Let's see how we can use it to add request headers to an HTTP request.

Now, there are multiple ways to set request headers. The most common way is to use the `headers` property of the `carrier` object like this:

```js
import carrier from 'carrierjs';

const fetchTodos = async () => {
	const result = await carrier.get(
		'https://jsonplaceholder.typicode.com/todos/',
    true,
		{
			headers: {
				'header_1': 'value_1',
				'header_2': 'value_2'
			}
		}
	);
	return result.response;
};
```

You can also add these headers using a ```config``` object for a cleaner code.

```js
import carrier from 'carrierjs';

const fetchTodos = async () => {
	const config = {
		headers: {
			'header_1': 'value_1',
      'header_2': 'value_2'
		}
	};
	const result = await carrier.get(
		'https://jsonplaceholder.typicode.com/todos/',
		config
	);
	return result.response;
};

```

**⚠️ Headers limitations**

Several headers are managed exclusively by the browser, e.g. `Referer` and `Host`. The full list is in the [specification](https://xhr.spec.whatwg.org/#the-setrequestheader()-method).

`carrier` not allowed to change them, for the sake of user safety and correctness of the request.

**⚠️ Can’t remove a header**

Another peculiarity of `carrier` is that one can’t undo `headers`.

Once the header is set, it’s set. Additional calls add information to the header, don’t overwrite it.

For instance:

```js
const config = {
    headers: {
      'header_1': 'value_1',
      'header_1': 'value_2'
    }
};

// the header will be:
// header_1: value_1, value_2
```

## Response Object

The response for a request contains the following information.

```js
{
  // `response` is the response that was provided by the server
  response: {},

  // `status` is the HTTP status code from the server response
  status: statusCode,

  // `type` is the type of response recieved from the server eg. json, script
  type: '',

  // `headers` the HTTP headers that the server responded with headers
  headers: {},

  // `request` is the request that generated this response
  request: {}

  // `url` is the url to that request is generated
  url: {}
}
```

## Handling Errors

To handle errors in a standard API calls, we use a `try...catch` block. For example, take a look at the following code, 

```js
import carrier from 'carrierjs';

const fetchTodos = async () => {
	try {
		const res = await carrier.get(
			`https://jsonplaceholder.typicode.com/todos/`
		);
	} catch (error) {
		// Do something with the error here
	}
};
```

If an error occurs, the `catch` block captures it. We need to add some logic in this block to handle the errors. We have to take care of three scenarios of errors:

- Request is made, but the server responds with an error.

- Request is made, but no response is received from the server.

- When an error occurs while setting up the request.

To handle these scenarios, we can use an `if-else` block like this:

```js
try {
    const res = await carrier.get(`https://jsonplaceholder.typicode.com/todos/`);
} catch (error) {
    if (error.response) {
		// Request made but the server responded with an error
	} else if (error.request) {
		// Request made but no response is received from the server.
	} else {
		// Error occured while setting up the request
	}
}
```

It is critical to check for the `request` and `response` properties because there will be no `response` property if we do not receive a response. Similarly, there will be no `request` property if the request is not set up. Let's take a look at these properties.

#### error.response

If the request is made and the server gives an error response, the error object will have a `response` property. It means that a `4XX` or `5XX` error has occurred. The response object has many properties which we can log, like the `status` property, which has the status code of the error.

#### error.request

`error.request` is the request object of the HTTP request that the client made. It contains information such as the HTTP method, URL, and the headers sent with the request. For CarrierJs, it is an instance of `XMLHttpRequest` when running in the browser and an instance of `http.ClientRequest` when executed in Node.js. We use it when we do not receive a valid response from the API due to a poor network or unauthorized access.

### Logging Errors

We can use these properties to log errors properly. It will look like this in code:

```js
try {
	const res = await carrier.get(`https://jsonplaceholder.typicode.com/todos/`);
} catch (error) {
	if (error.response) {
		// Request made but the server responded with an error
		console.log(error.response.status);
		console.log(error.response.headers);
	} else if (error.request) {
		// Request made but no response is received from the server.
		console.log(error.request);
	} else {
		// Error occured while setting up the request
		console.log('Error', error.message);
	}
}

```

## References

#### HTTP RFCs
1. [RFC 2616 - Hypertext Transfer Protocol -- HTTP/1.1](https://datatracker.ietf.org/doc/rfc2616/) - This RFC defines the HTTP 1.1 protocol, which is widely used for web communication. It covers the semantics and operations of HTTP methods like GET, POST, PUT, DELETE, and PATCH.
2. [RFC 7231 - Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content](https://datatracker.ietf.org/doc/rfc7231/) - This RFC updates and replaces RFC 2616, providing the latest HTTP semantics and content specifications.
3. [RFC 7230 - Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and Routing](https://datatracker.ietf.org/doc/rfc7230/) - This RFC defines the syntax and routing of HTTP messages, including headers and message parsing.

#### IndexedDB
1. [Indexed Database API (W3C Recommendation)](https://www.w3.org/TR/IndexedDB/) - Refer to the W3C Recommendation for Indexed Database API, which defines the web standard for client-side storage in web browsers.

These references cover the HTTP protocol and the use of IndexedDB, which are relevant to the Carrier.js library. Depending on the specific features and functionality of the library, you may also want to refer to other RFCs or web standards related to specific HTTP methods or browser technologies.


## Contribution

**Note** - Give a ⭐ to this project

- Fork this repository (Click the Fork button in the top right of this page, click your Profile Image)
- Clone your fork down to your local machine

```bash
git clone https://github.com/your-username/carrierjs.git
```

- Create a branch

```bash
git checkout -b branch-name
```

- Make your changes (choose from any task below)
- Commit and push

```bash
git add .
git commit -m 'Commit message'
git push origin branch-name
```

- Create a new pull request from your forked repository (Click the New Pull Request button located at the top of your repo)
- Wait for your PR review and merge approval!
- Star this repository if you had fun!

For more information, Please read [CONTRIBUTING.md](https://github.com/theritikchoure/carrierjs/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Attribution

You can use this badge for attribution in your project's readme file.

[![](https://img.shields.io/badge/Created%20with-CarrierJs-%2328b76b?style=for-the-badge)](https://carrier.js.org/) 

```js
[![](https://img.shields.io/badge/Created%20with-CarrierJs-%2328b76b?style=for-the-badge)](https://carrier.js.org/)
```


## License

This package is licensed under the MIT license &copy; [theritikchoure](https://github.com/theritikchoure)

## Thanks to all Contributors

<a href="https://github.com/theritikchoure/carrierjs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=theritikchoure/carrierjs" />
</a>
