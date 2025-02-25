---
repo: silvermine/serverless-plugin-external-sns-events
url: 'https://github.com/silvermine/serverless-plugin-external-sns-events'
homepage: null
starredAt: '2016-11-28T18:46:15Z'
createdAt: '2016-10-16T21:11:54Z'
updatedAt: '2024-05-21T00:26:37Z'
language: JavaScript
license: MIT
branch: master
stars: 26
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:50:36.020Z'
description: null
tags: []
---

# Serverless Plugin: External SNS Events

[![Build Status](https://travis-ci.org/silvermine/serverless-plugin-external-sns-events.svg?branch=master)](https://travis-ci.org/silvermine/serverless-plugin-external-sns-events)
[![Coverage Status](https://coveralls.io/repos/github/silvermine/serverless-plugin-external-sns-events/badge.svg?branch=master)](https://coveralls.io/github/silvermine/serverless-plugin-external-sns-events?branch=master)
[![Dependency Status](https://david-dm.org/silvermine/serverless-plugin-external-sns-events.svg)](https://david-dm.org/silvermine/serverless-plugin-external-sns-events)
[![Dev Dependency Status](https://david-dm.org/silvermine/serverless-plugin-external-sns-events/dev-status.svg)](https://david-dm.org/silvermine/serverless-plugin-external-sns-events#info=devDependencies&view=table)


## What is it?

This is a plugin for the Serverless framework to allow you have a function that
uses an already existing, or external (to that service), SNS topic as an event
source.

By default, the Serverless [SNS event
source](https://serverless.com/framework/docs/providers/aws/events/sns/) will
create a new topic just for that function, but in many cases if you want a
function to subscribe to a topic, the topic will have already been created,
either in the same service or in a different service.


## How do I use it?

Rather than defining an `sns` event for your function, define an `externalSNS`
event, where the value is a string, the name of the topic that you want to
subscribe this function to.

NOTE: at this time, it is assumed that the topic is in the same account and
region as the Lambda function itself. That can be changed in the future if
needed - feel free to open an issue, and preferably submit a pull request.

```yaml
functions:
   doSomething:
      name: ${self:service}-${self:provider.stage}-doSomething
      handler: src/DoSomething.handler
      events:
         - externalSNS: 'some-topic-name'
```

By doing that, the `deploy` and `remove` commands in SLS will now subscribe and
unsubscribe your function to or from the specified topic. If you would like to
subscribe or unsubscribe the functions manually (outside of a deploy or remove
command), you can use `serverless subscribeExternalSNS` or
`serverless unsubscribeExternalSNS`.


## How do I contribute?

Easy! Pull requests are welcome! Just do the following:

   * Clone the code
   * Install the dependencies with `npm install`
   * Create a feature branch (e.g. `git checkout -b my_new_feature`)
   * Make your changes and commit them with a reasonable commit message
   * Make sure the code passes our standards with `grunt standards`
   * Make sure all unit tests pass with `npm test`

Our goal is 100% unit test coverage, with **good and effective** tests (it's
easy to hit 100% coverage with junk tests, so we differentiate). We **will not
accept pull requests for new features that do not include unit tests**. If you
are submitting a pull request to fix a bug, we may accept it without unit tests
(we will certainly write our own for that bug), but we *strongly encourage* you
to write a unit test exhibiting the bug, commit that, and then commit a fix in
a separate commit. This *greatly increases* the likelihood that we will accept
your pull request and the speed with which we can process it.


## License

This software is released under the MIT license. See [the license file](LICENSE) for more details.
