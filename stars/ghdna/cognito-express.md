---
repo: ghdna/cognito-express
url: 'https://github.com/ghdna/cognito-express'
homepage: 'https://www.npmjs.com/package/cognito-express'
starredAt: '2024-08-04T19:36:13Z'
createdAt: '2017-07-05T17:14:02Z'
updatedAt: '2025-02-20T19:50:49Z'
language: JavaScript
license: MIT
branch: master
stars: 218
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:27.014Z'
description: >-
  Authenticates API requests on a Node application by verifying the JWT
  signature of AccessToken or IDToken generated by Amazon Cognito.
tags:
  - accesstoken
  - amazon
  - amazon-cognito
  - amazon-web-services
  - authentication
  - aws
  - aws-cognito
  - cognito
  - cognito-express
  - cognito-user-pool
  - expressjs
  - idtoken
  - jwt
  - nodejs
---


# Cognito-Express: API Authentication with AWS Congito

[![NPM](https://nodei.co/npm/cognito-express.png?compact=true)](https://nodei.co/npm/cognito-express/)

[![Build Status](https://travis-ci.org/ghdna/cognito-express.svg?branch=master)](https://travis-ci.org/ghdna/cognito-express)
[![Package Quality](http://npm.packagequality.com/shield/cognito-express.png)](http://packagequality.com/#?package=cognito-express)
[![Code Climate](https://codeclimate.com/github/ghdna/cognito-express/badges/gpa.svg)](https://codeclimate.com/github/ghdna/cognito-express/)
[![Coverage Status](https://coveralls.io/repos/github/ghdna/cognito-express/badge.svg?branch=master)](https://coveralls.io/github/ghdna/cognito-express?branch=master)
[![dependencies Status](https://david-dm.org/ghdna/cognito-express/status.svg)](https://david-dm.org/ghdna/cognito-express)
[![Downloads](https://img.shields.io/npm/dt/cognito-express.svg)](https://www.npmjs.com/package/cognito-express)

## Synopsis

cognito-express authenticates API requests on a Node.js application (either running on a server or in an AWS Lambda function) by verifying the JWT signature of `AccessToken` or `IDToken` generated by Amazon Cognito.


![Architecture](https://i.ibb.co/RyrzfXD/Screen-Shot-2022-01-17-at-19-22-18.png)

## Motivation


![Architecture](https://image.ibb.co/nQG6wR/Screen_Shot_2017_10_30_at_18_30_25.png)

This module lets you authenticate Node.js API requests by verifying the JWT signature of `AccessToken` or `IDToken` - without needing to call Amazon Cognito for each API invocation.

The module can be easily and unobtrusively integrated into any application or framework that supports [Connect](http://www.senchalabs.org/connect/)-style middleware, including [Express](http://expressjs.com/).

This module essentially bundles steps 1-7  listed on the official AWS documentation on  [Using ID Tokens and Access Tokens in your Web APIs](http://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html#amazon-cognito-identity-user-pools-using-id-and-access-tokens-in-web-api)

1. Download and store the JSON Web Token (JWT) set for your user pool. 
2. Decode the token string into JWT format.
2. Check the `iss` claim. It should match your user pool. 
3. Check the `tokenUse` claim. It should match your set preference for `access` or `id` token types
4. Get the kid from the JWT token header and retrieve the corresponding JSON Web Key that was stored in step 1.
5. Verify the signature of the decoded JWT token.
6. Check the exp claim and make sure the token is not expired.

You can now trust the claims inside the token and use it as it fits your requirements.

## Prerequisites 

After successful authentication of a user, Amazon Cognito issues three tokens to the client:

- ID token
- Access token
- Refresh token

(Note: The login mechanism is not covered by this module and you'll have to build that separately)

Save these tokens within the client app (preferably as cookies). 
When any API is invoked from client, pass in the `AccessToken` or `IDToken` to the server.

It's completely up to you how you pass in the `AccessToken` or `IDToken`. Here are two options:
1. By adding them explicitly in Request Headers
2. Just save the tokens as cookies. This way they get attached to request headers whenever APIs are invoked.

## Configuration
```javascript
//Initializing CognitoExpress constructor
const cognitoExpress = new CognitoExpress({
	region: "us-east-1",
	cognitoUserPoolId: "us-east-1_dXlFef73t",
	tokenUse: "access", //Possible Values: access | id
	tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
});
```
## Usage
```javascript
cognitoExpress.validate(accessTokenFromClient, function(err, response) {
	if (err) {
		/*
			//API is not authenticated, do something with the error.
		    //Perhaps redirect user back to the login page
			
			//ERROR TYPES:
			
			//If accessTokenFromClient is null or undefined
			err = {
			    "name": "TokenNotFound",
			    "message": "access token not found"
			}
			
			//If tokenuse doesn't match accessTokenFromClient
			{
			    "name": "InvalidTokenUse",
			    "message": "Not an id token"
			}

			//If token expired
			err = {
			    "name": "TokenExpiredError",
			    "message": "jwt expired",
			    "expiredAt": "2017-07-05T16:41:59.000Z"
			}

			//If token's user pool doesn't match the one defined in constructor
			{
			    "name": "InvalidUserPool",
			    "message": "access token is not from the defined user pool"
			}

		*/
	} else {
		//Else API has been authenticated. Proceed.
		res.locals.user = response; //Optional - if you want to capture user information
		next();
	}
});

```

Also supports async/await pattern

```javascript
(async function main() {
  try {
    const response = await cognitoExpress.validate(accessTokenFromClient);
    console.log(response);
     //User is authenticated, proceed with rest of your business logic.

  } catch (e) {
    console.error(e);
     //User is not authenticated, do something with the error.
     //Perhaps redirect user back to the login page
  }
})();
```


## Full Example 
###### app.js - server
```javascript
//app.js
"use strict";

const express = require("express"),
	CognitoExpress = require("cognito-express"),
	port = process.env.PORT || 8000;

const app = express(),
	authenticatedRoute = express.Router(); //I prefer creating a separate Router for authenticated requests

app.use("/api", authenticatedRoute);

//Initializing CognitoExpress constructor
const cognitoExpress = new CognitoExpress({
	region: "us-east-1",
	cognitoUserPoolId: "us-east-1_dXlFef73t",
	tokenUse: "access", //Possible Values: access | id
	tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
});

//Our middleware that authenticates all APIs under our 'authenticatedRoute' Router
authenticatedRoute.use(function(req, res, next) {
	
	//I'm passing in the access token in header under key accessToken
	let accessTokenFromClient = req.headers.accesstoken;

	//Fail if token not present in header. 
	if (!accessTokenFromClient) return res.status(401).send("Access Token missing from header");

	cognitoExpress.validate(accessTokenFromClient, function(err, response) {
		
		//If API is not authenticated, Return 401 with error message. 
		if (err) return res.status(401).send(err);
		
		//Else API has been authenticated. Proceed.
		res.locals.user = response;
		next();
	});
});


//Define your routes that need authentication check
authenticatedRoute.get("/myfirstapi", function(req, res, next) {
	res.send(`Hi ${res.locals.user.username}, your API call is authenticated!`);
});

app.listen(port, function() {
	console.log(`Live on port: ${port}!`);
});
```

###### client.js - angular example
```javascript
//client.js - angular example

"use strict";

//I stored my access token value returned from Cognito in a cookie called ClientAccessToken

app.controller("MyFirstAPI", function($scope, $http, $cookies) {
	$http({
		method: "GET",
		url: "/api/myfirstapi",
		headers: {
			accesstoken: $cookies.get("ClientAccessToken") 
            }
		}
	}).then(
		function success(response) {
			//Authenticated. Do something with the response. 
		},
		function error(err) {
			console.error(err);
		}
	);
});
```


## Contributors

[Gary Arora](https://twitter.com/AroraGary)

## License

MIT
