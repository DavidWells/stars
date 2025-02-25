---
repo: stratiformdigital/serverless-online
url: 'https://github.com/stratiformdigital/serverless-online'
homepage: 'https://www.npmjs.com/package/@stratiformdigital/serverless-online'
starredAt: '2024-02-16T00:09:17Z'
createdAt: '2022-01-12T16:56:32Z'
updatedAt: '2024-09-13T11:34:20Z'
language: JavaScript
license: MIT
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:35.939Z'
description: Faster lambda development in AWS through hot deploys and streaming logs.
tags:
  - aws
  - lambda
  - serverless
  - serverless-plugin
---

<h1 align="center" style="border-bottom: none;"> serverless-online</h1>
<h3 align="center">Faster lambda development in AWS through hot deploys and streaming logs.</h3>
<p align="center">
  <a href="https://github.com/stratiformdigital/serverless-online/releases/latest">
    <img alt="latest release" src="https://img.shields.io/github/release/stratiformdigital/serverless-online.svg">
  </a>
  <a href="https://www.npmjs.com/package/@stratiformdigital/serverless-online">
    <img alt="npm latest version" src="https://img.shields.io/npm/v/@stratiformdigital/serverless-online/latest.svg">
  </a>
  <a href="https://codeclimate.com/github/stratiformdigital/serverless-online/maintainability">
    <img alt="Maintainability" src="https://api.codeclimate.com/v1/badges/ed37d65c137b0d54c158/maintainability">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img alt="semantic-release: angular" src="https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release">
  </a>
  <a href="https://dependabot.com/">
    <img alt="Dependabot" src="https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot">
  </a>
  <a href="https://github.com/prettier/prettier">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
</p>

## Usage

```
...

plugins:
  - serverless-online

...

sls online --function myFunctionName --stage myStage
```

## Background

_What?_

This [Serverless](https://www.serverless.com/) plugin's goal is to improve the cloud development workflow for lambda functions by making it easier to deploy changes rapidly and see realtime logs.

_Why?_

Developing lambda functions against Amazon is relatively slow. While local development workflows and tools help greatly, using them is not always a practical option. There are parity issues at times between what we mock locally and how amazon operates. The 'send email' functionality comes to mind; it's a relatively simple piece of functionality but won't work locally out of the box... an 'if(running locally) do this else() do that' needs to be added to it. Cognito logic in support of local is also worth mentioning.
The assumptions this plugin makes are as follows: We develop locally because it's faster than developing in Amazon. But by developing in Amazon, we have full parity between development and production. If we can improve the cloud development experience by making it faster with better feedback, we can have a simpler and better product.

_How?_

- This plugin utilizes the [deploy function](https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy-function/) capability of serverless' core to update lambda code. This functionality provides a way to directly update the S3 lambda package of an already deployed function, without using Cloudformation. The bypassing of CF is where the massive speed gains are seen. Deploying a single function with 'sls deploy' (using CF) can take 50 seconds. Deploying with 'deploy function' takes about 5. This plugin redeploys functions in less than 1; details further on.
- The plugin accepts a 'sls online' command. The command is run from a service, and for a target lambda function. That's important to absorb. This plugin and the dev workflow it supports is scoped to the service context and function level. Appliances can be written to parallelize the running of this plugin against multiple services at once, but the plugin itself doesn't want to support anything outside of a single service. The command is also run against a single lambda by passing a --function argument; this is because 'sls deploy function' is scoped to single functions, and I didn't want to get too clever. Hopefully 'sls deploy function' will start accepting '\*' as its target function. Until then, or until this plugin is modified to run against all lambdas in a service, this plugin runs in a service context against one function at a time.
- On command launch, the plugin starts running and holds the process open until exited by the user (CTRL+C).
- Next, the target lambda function is deployed using 'sls deploy function'
- Next, [chokidar](https://github.com/paulmillr/chokidar) begins polling the service directory for any changes. Any changes to non hidden folders (.serverless and .webpack for instance) will trigger a redeploy of the function. This process won't quit until the user terminates the 'sls online' process.
- At the same time as above, the lambda logs for the target function begin streaming to the console. This functionality sits on top of the [serverless logs](https://www.serverless.com/framework/docs/providers/aws/cli-reference/logs/) command which is part of serverless' core.
- When a change to a file is made, it is redeployed with 'sls deploy function.' Since we have held the process open and have already started serverless and resolved any cloudformation references, the redeploy of the function is sub second.

## Assorted Notes/Considerations

- serverless-bundle, serverless-webpack are supported. Really these are supported by 'serverless deploy function'; since we sit on top of that, we inherit that behavior. There were only a few issues that needed to be addressed, regarding running webpack more than once in one command. The linters that run with webapck/bundle run as part of 'serverless deploy function' and so too this plugin. The linter logs can be seen in the console output of 'sls online'.
- As mentioned above, it might be helpful to be able to start 'sls online' for all functions in a service. If serverless adds '\*' functionality to 'sls deploy function', adding that support to this plugin is an easy call. If serverless doesn't add that support and we deem it helpful (feedback needed, time will tell), I believe there's no major roadblock to modifying the plugin to implement that functionality within itself.
- I think there might be value in supporting the execution of the lambda with a test event, just after function update. Right now the plugin updates the function very quickly while streaming logs. Often times, we want to make the update, test, and see logs. Adding an online.test configuration to the yaml is simple. Perhaps the user specifies a json file contianing the test event, and the configuration just points to that file. My hang up is knowing when to quit. How broadly applicable is this functionality? What if I want to test with more than one event? What about one select event out of several? I'm quitting. There's existing tooling to test lambdas, and for now I'd like to leave the execution of test events in the hands of the developer. I expect a limited scope of this type of functionality will be useful and worth implementing, but I'm holding off for now, waiting for feedback and time downrange with the plugin.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

See [LICENSE](LICENSE) for full details.
