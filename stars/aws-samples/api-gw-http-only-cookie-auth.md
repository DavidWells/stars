---
repo: aws-samples/api-gw-http-only-cookie-auth
url: 'https://github.com/aws-samples/api-gw-http-only-cookie-auth'
homepage: >-
  https://aws.amazon.com/blogs/security/reduce-risk-by-implementing-httponly-cookie-authentication-in-amazon-api-gateway/
starredAt: '2024-12-29T23:16:13Z'
createdAt: '2022-08-24T18:07:44Z'
updatedAt: '2025-02-05T06:45:39Z'
language: TypeScript
license: MIT-0
branch: main
stars: 22
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:34.628Z'
description: null
tags:
  - api-gateway
  - aws
  - cognito
  - http-only-cookies
---

# How to implement HttpOnly cookie authentication in Amazon API Gateway

This repository contains accompanying source code for the AWS Blog post, [How to implement HttpOnly cookie authentication in Amazon API Gateway](https://aws.amazon.com/blogs/security/reduce-risk-by-implementing-httponly-cookie-authentication-in-amazon-api-gateway/). Read the blog for more information on architecture & concept. This repository only contains automated tools to easily deploy the solution.

## Pre-requisites

- You should have level 200-300 know-how on the [OAuth2 protocol](https://oauth.net/2/).
- You should have the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) installed & [configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html).
- Download & install [NodeJS](https://nodejs.org/en/download/)

## Deployment

You are going to use [AWS Cloud Development Kit](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) to deploy the solution with infrastructure as code. Follow the following steps to deploy the solution.

Open a terminal & clone this repository:
```
$ git clone https://github.com/aws-samples/api-gw-http-only-cookie-auth.git
```

Go into the cloned folder:
```
$ cd ./api-gw-http-only-cookie-auth
```

Run the deployment script and follow the on-screen quesetions:
```
$ npm run deploy
```

_...Wait until the script finishes & all resources are deployed..._

You should get the relevant URL's from the output. Note down those URL's. The output looks something like this:
```
Outputs:
ApiGwHttpOnlyCookieAuthStack.AppURL = https://1234567890.execute-api.eu-central-1.amazonaws.com
ApiGwHttpOnlyCookieAuthStack.SigninURL = https://http-only-cookie-1234567890-abcd-efgh-ijkl-1234567890.auth.eu-central-1.amazoncognito.com/login?client_id=1234567890&response_type=code&redirect_uri=https://1234567890.execute-api.eu-central-1.amazonaws.com/oauth2/callback
```

Create test user:
1. Navigate to the [Amazon Cognito](https://console.aws.amazon.com/cognito/home) console and choose **HttpOnlyCookie**.
1. Under **Users** choose **Create user**.
1. For **User name** enter any user name you like.
1. For **Email address** enter any email you like.
> Note: For this tutorial you don’t need to send out actual emails. That’s why the email does not need to actually exist.
5.	Choose **Mark email address as verified**.
6.	For **password** enter a password you can remember (or even better: use a password generator).
7.	Remember the **email** and **password** for later use.
8.	Choose **Create user**.

<img width="600" alt="Create user" src="https://user-images.githubusercontent.com/7549295/186923156-e81aa0aa-520b-4e6e-a3ea-90233b06eee5.png">

That's it 🎉

## Testing

Now that you have all components in place, you can test your OAuth2 Flow:
1. Paste in your `SigninURL` (from above) in a browser.
2.	In the newly opened browser tab, open [your developer tools](https://balsamiq.com/support/faqs/browserconsole/), so you can inspect the network requests.
3.	Login with your Email & password.
4.	Now you’ll see your `Hello from Lambda` message.

How do you know that the cookie was accurately set?
Check your browser network tab in the browser developer settings. You’ll see the `/oauth2/callback` request which looks like this:

<img width="600" alt="Callback network request" src="https://user-images.githubusercontent.com/7549295/186917482-dd368520-17be-4ca7-afc3-84626b60e15b.png">

As you can see the response headers include a `Set-Cookie` header as is specified in the `oAuth2Callback` Lambda function. This ensures that your OAuth2 access token is set as a HttpOnly cookie in the browser & access is prohibited from any client-side code.

Also, you can inspect the cookie in the browser cookie storage:

<img width="600" alt="Cookie storage" src="https://user-images.githubusercontent.com/7549295/186917664-1d1e82f7-a5cc-45f1-8f2f-75e3aab0ca25.png">

> Note: In case you want to retry the authentication: Navigate in your browser to the base URL of Amazon Cognito & clear all site data in the browser developer tools. Do the same for your API Gateway website. Now you can restart the test with a clean state.

When inspecting the HTTP request your browser makes in the developer tools you can see why authentication works. The HttpOnly cookie is automatically attached to every request:

<img width="600" alt="Browser requests include HttpOnly cookies" src="https://user-images.githubusercontent.com/7549295/186919707-8f49a8b9-6bf6-4702-8698-c4170c69cdec.png">

To verify that the `oAuth2Authorizer` Lambda function works correctly you need to paste the `AppURL` (from above) in an incognito window. Incognito windows do not share the cookie store with your browser session. That’s why you see a `{"message":"Forbidden"}` error message with HTTP response code `403 – Forbidden`.

You did it 🎉

## Tear down

Don’t forget to delete all unwanted resources to avoid costs. Simply run at the root of your project:
```
npx cdk destroy
```

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.
