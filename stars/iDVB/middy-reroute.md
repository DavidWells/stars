---
repo: iDVB/middy-reroute
url: 'https://github.com/iDVB/middy-reroute'
homepage: 'https://reroute.danvanbrunt.com'
starredAt: '2019-08-28T03:45:48Z'
createdAt: '2019-01-08T21:27:23Z'
updatedAt: '2025-01-30T03:58:48Z'
language: JavaScript
license: MIT
branch: master
stars: 22
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:27.172Z'
description: >-
  middy-reroute is a MiddyJS middleware (AWS Lambda) providing complex redirect,
  rewrite and proxying capabilities by placing a rules file into your S3 bucket.
tags:
  - aws
  - cloudfront
  - javascript
  - lambda
  - lambdaatedge
  - middleware
  - middy
  - proxy
  - redirects
  - rewrites
  - s3
---

<div align="center">
  <p><strong>middy-reroute is a <a href="https://github.com/middyjs/middy">MiddyJS</a> middleware (AWS Lambda) providing complex redirect, rewrite and proxying capabilities by simply placing a rules file into your S3 bucket.</strong></p>
</div>

<div align="center">
<p>
  <a href="http://badge.fury.io/js/middy-reroute">
    <img src="https://badge.fury.io/js/middy-reroute.svg" alt="npm version" style="max-width:100%;">
  </a>
  <a href="https://codecov.io/gh/iDVB/middy-reroute">
    <img src="https://codecov.io/gh/iDVB/middy-reroute/branch/master/graph/badge.svg" alt="codecov" style="max-width:100%;">
  </a>
  <a href="https://standardjs.com/">
    <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard Code Style"  style="max-width:100%;">
  </a>
</p>
</div>


## TOC

 - [Install](#install)
 - [Why?](#why?)
 - [Requirements](#requirements)
 - [Usage](#usage)
 - [API](#API)
 - [Contributing](#contributing)
 - [License](#license)


## Why?

Serverless hosting of static websites presents a [few challenges](https://read.acloud.guru/6-things-i-wish-i-had-known-before-going-serverless-502236cf5540#84cf) when it comes to typical server http responses. What we really want as developers it to have the power of `.htaccess` or similar functions. This allowed you to create complex redirect and rewrite rules and simply by placing this file alongside your application files you'd be off to the races. 

So far, no cloud provider offers this ease of configuration without a bit of setup. In the case of AWS, you can use Lambda@Edge to intercept all incoming requests and to handle them as you like. middy-reroute aims to simplify that process by handling all the heavy lifting and offering you a familiar `_redirects` file with which to implement your desired redirects, rewrites, proxies, and custom 404s.

This functionality is modeled very closely after a [similar core feature of Netlify's hosting service](https://www.netlify.com/docs/redirects/).

## Install

As simple as:

```bash
npm install middy middy-reroute
```

## Requirements

- middy
- Node >= 6
- Lambda@Edge
  - Cloudfront -> Lambda -> S3
  - origin-request event
- (Optional) Whitelist `Host`, `Accept-Language`, and `CloudFront-Viewer-Country` headers on Cloudfront CDN. These will allow you to use Host, Language and Country specific conditions in the rules.

middy-reroute has been built to work by default from **Node >= 6**.
You will also need the core middyjs middleware engine.

While most of middy's middlewares have been written for use with AWS Lambda + API Gateway, middy-reroute work **exclusively** with [Lambda@Edge](https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html). This is due to the fact that the middleware needs to run at the edge CDN so that it can intercept requests made to your origin (S3).

Not familiar with Lambda@Edge? No worries, it's easier then it sounds, and there are many great tutorials and courses. Full disclosure, I'm the author of [this course](https://acloud.guru/learn/lambda-edge).

## Usage

Using middy-reroute is pretty effortless but very powerful.

 1. Create your Lambda function similar to the handler.js below.
 2. Associate this function with the `origin-request` event of your CloudFront CDN that sits in front of your site's s3 bucket.
 3. IF you want to take advantage of domain/host specific routing.
    1. [Whitelist](https://github.com/iDVB/middy-reroute/blob/master/example/serverless.yml#L131-L132) the `Host` header on the above CDN.
 4. Place your desired rules into a [_redirects](#_redirects-file) file and upload into the root of your S3 bucket.
 5. Profit!

Example:

```javascript
# handler.js

const middy = require('middy');
const { reroute } = require('middy-reroute');

// This is your typical handler. The only difference here is that you know that the event you get will already be manipulated by the middy-reroute middleware.
const finalHandler = (event, context, callback) => {
  // middy-reroute will always return three types of events
  // 1) full original event untouched
  // 2) full original event with the [uri] changed
  // 3) raw response which may be a redirect or a response that includes the body etc. Eg. Custom 404, proxied response etc.
  const request = !!event.Records ? event.Records[0].cf.request : event;

  // Unless you have additional operations, you would normally just return middy-reroute's event untouched.
  callback(null, request);
}

const handler = middy(finalHandler)
  .use(reroute());

module.exports = { handler };
```

## _redirects file

See [Netlify's docs](https://www.netlify.com/docs/redirects/) for more detailed information about options.

```markdown
# Redirect with 301
/home           /
/google         https://www.google.com

# Redirect with 302
/my-redirect    /             302

# Rewrite a path
/pass-through   /index.html   200
/*              /index.html   200

# Custom 404
/ecommerce      /closed       404

# Placeholders
/news/:year/:month/:date/:slug    /blog/:date/:month/:year/:slug

# Splats
/news/*   /blog/:splat

# Proxying
/api/*  https://api.example.com/:splat  200

# Country
/  /china   302  Country=cn,hk,tw
/  /israel  302  Country=il

# Language
/china/*  /china/zh-cn/:splat  302  Language=zh

# UserAgent
/*  /upgrade-browser  200!  UserAgent=IE:<=11
/*  /great-choice     200!  UserAgent=Chrome:*,Firefox:*
```

> Country codes should be [iso3166](http://dev.maxmind.com/geoip/legacy/codes/iso3166/) and [language codes](http://www.metamodpro.com/browser-language-codes) the proper format.

>For languages, note that en will match en-US and en-GB, zh will match zh-tw and zh-hk, etc.

## API

### options

```javascript
{
    // 'file' is the S3 key where your rules file can be found
    file: '_redirects',  // default

    // 'multiFile' is a boolean to denote if you would like middy-reroute to
    // look for host specific rules files or just a single rules file matching
    // the *options.file* param above. MultiFiles will resolve to 
    // `${options.file}_${host}`
    // Eg. multiFile: true (and the host is domain.com)
    //     _redirects_domain.com
    multiFile: false,  // default

    // 'rulesBucket' is the bucket to reference when looking for the rules files
    // Default: As a default the origin bucket is used.
    rulesBucket: 'my-existing-bucket-name',

    // 'regex'
    regex: {
      // 'htmlEnd' is used to identify URI that end in an html file.
      // These will be rewriten if *options.friendlyUrls*: true.
      htmlEnd: /(.*)\/((.*)\.html?)$/,  // default

      // 'ignoreRules' is used to identify lines in the rules file that should
      // be completely ignored.
      // Default: Ignores comments and empty lines.
      ignoreRules: /^(?:\s*(?:#.*)*)$[\r\n]{0,1}|(?:#.*)*/gm,  // default

      // 'ruleline' is used to parse each individual line of rules in the rules
      // file. Change this at your own discretion. At the very lease the same 
      // number and order of match groups needs to be defined.
      ruleline: /([^\s\r\n]+)(?:\s+)([^\s\r\n]+)(?:\s+(\d+)([!]?))?(?:(?:\s+)?([^\s\r\n]+))?/,  // default

      // 'absoluteUri' is used to identify if a URL is absolute vs relative.
      //  /this  =  false
      //  http://domain.com/this   =  true
      absoluteUri: /^(?:[a-z]+:)?\/\//,  // default
    },

    // 'defaultStatus' - specifies the default http status to use when none is
    // specified in the rule.
    defaultStatus: 301,  // default

    // 'redirectStatuses' declares which http statuses should result in
    // redirects.
    redirectStatuses: [301, 302, 303],  // default

    // 'friendlyUrls' specifies whether the URIs should be redirected 
    // to avoid ending in .html
    // Eg. 
    //   /thing/index.html  =  /thing/
    //   /thing/about.html  =  /thing/about/
    friendlyUrls: true,  // default

    // 'defaultDoc' is the name of the file that should be served up when
    // paths are referenced.
    // Eg. /thing  will be rewriten to /thing/index.html
    // note* Since it's a rewrite the user will still see this as /thing
    defaultDoc: `index.html`,  // default

    // 'custom404' is the S3 key where to automatically look for your custom
    //  404 page when a resource can't be found.
    custom404: `404.html`,  // default

    // 'cacheTtl' is the TTL in seconds that S3 calls should be cached.
    //  Eg. get rules file or custom404
    //  set to 0 to disable caching
    cacheTtl: 300, // secounds default

    // 'incomingProtocol' is the protocol prepended to the HOST and URI before
    //  looking in the rules for a match. If you configure CloudFront to
    //  forward http to https then this should always be the default.
    incomingProtocol: 'https://',  // default

    // 's3Options' is the options passed into the AWS SDK S3 client when instantiated.
    s3Options: { httpOptions: { connectTimeout: 2000 } },
  };
```

## Origin-Request Event Object

The following is a typical event object that gets fed into your Lambda@Edge function for a `origin-request` event.

```javascript
{
  "Records": [
    {
      "cf": {
        "request": {
          "clientIp": "99.99.999.999",
          "headers": {
            "host": [{
              "key": "Host",
                // 'value' will either be your [S3 bucket domain]
                // OR your incoming [Host] depending on if you whitelist it
              "value": "somedomain.com"
            }],
            "cloudFront-viewer-country": [{
              key:'CloudFront-Viewer-Country',
              value: "CA"
            }],
            "accept-language": [{
              key:'Accept-Language',
              value: "en-GB,en-US;q=0.9,fr-CA;q=0.7,en;q=0.8"
            }],
          },
          "method": "GET",
          "origin": {
            "s3": {
              "authMethod": "origin-access-identity",
              "customHeaders": {},
              // 'domainName' will be your [S3 bucket domain]
              "domainName": "some-unique-bucketname.s3.amazonaws.com",
              "path": "",
              "region": "us-east-1"
            }
          },
          "querystring": "",
          // 'uri' is your incoming request path
          // This is the property manipulated by middy-reroute
          // during a rewrite
          "uri": "/news"
        }
      }
    }
  ]
}
```

## Future Features?

There are still a few things that Netlify's rules can do that middy-reroute can't. Additionally, there are quite a few new ones that come to mind that would be great.

### [Querystrings](https://www.netlify.com/docs/redirects/#query-params) that are placeholder-able

```markdown
# base case
/path/* /otherpath/:splat 301​

# one value or the other.  Must match exactly!
/path/* param1=:value1 /otherpath/:value1/:splat 301
/path/* param2=:value2 /otherpath/:value2/:splat 301​

# both values - ordering from the browser doesn't matter.
/path/* param1=:value1 param2=:value2 /otherpath/:value1/:value2/:splat 301
```

### [Access control](https://www.netlify.com/docs/redirects/#role-based-redirect-rules) dependent rules

This is an example of a feature that already exists using Netlify's rules. However, since this would require the middleware having a handle of you application's business logic, we'd need to think about how to best pass this into the middleware, to allow for customization. At the end of the day, the middleware is just going to parse the JWT token and match the important role bits to the rules. So we'd at least need to pass the middleware the role param path (in JWT) and the JWT secret or function for parsing the secret.

```bash
/admin/*	200!	Role=admin
```

### Flattening chained rules

Another existing Netlify feature that I believe gets applied to all rules. Currently, middy-reroute just applies that `first` rule it finds in the rules file from top-to-bottom.

```bash
      /redirect1   /redirect2   302
      /redirect2   /redirect3   302

# =>  /redirect1   /redirect3   302`
```

### Conditions that are placeholder-able

Thought this could be neat if there was a way to use the matched condition in the resolved URI somehow. Not sure what the proper indentifier would be though. And I could see you may want to define character case.

```bash
      /country_flag.gif   /flags/::country.gif     200
# =>  /country_flag.gif   /flags/ca.gif           200`

      /country_flag.gif   /flags/::COUNTRY.gif     200
# =>  /country_flag.gif   /flags/CA.gif           200`
```

## Contributing

Everyone is very welcome to contribute to this repository. Feel free to [raise issues](https://github.com/iDVB/middy-reroute/issues) or to [submit Pull Requests](https://github.com/iDVB/middy-reroute/pulls).


## License

Licensed under [MIT License](LICENSE).
