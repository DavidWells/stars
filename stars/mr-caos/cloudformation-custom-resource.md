---
repo: mr-caos/cloudformation-custom-resource
url: 'https://github.com/mr-caos/cloudformation-custom-resource'
homepage: null
starredAt: '2019-02-10T23:55:54Z'
createdAt: '2018-05-25T13:43:38Z'
updatedAt: '2019-12-14T08:23:51Z'
language: null
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:46.188Z'
description: null
tags: []
---

<h1>Cloudformation and Lambda Custom Resources</h1>

Amazon Web Services is the most advanced IAAS platform and it keeps evolving at a very impressive pace. Most of their services are great for developers, providing them with unprecedented capabilities. Nevertheless, nobody is perfect. When releasing all that stuff in such a short time frame, it’s inevitable to come out with a few questionable items. In my personal opinion, Cloudformation goes straight into that category.

Until HelloWorlds and Reference Architecture templates it could look pretty straight forward. When you start an actual project though, the issues starts to pile up so quickly, that soon you find yourself sinking in a messy Cloudformation nightmare. I say it from experience. Any basic production system, with all standard enterprise features, will quickly results in thousands of lines of unmanageable code. You will continuously stumble upon unsupported features. The stack updates work pretty much randomly depending on the type of resources you’ve employed. Etc, etc, etc…

Here we will focus on how to deal with the countless of unsupported feature. Let me just first digress on a topic I care a lot. The creation of new declarative languages.
<h2>JSON and YAML syntax</h2>

As I’ve said, when I’ve started playing with Cloudformation HelloWorlds it looked pretty much fine. Even then though, something was already bothering me. Why this JSON or YAML syntax? I think I may actually know the reasons, it must be something like (in no particular order):

    non-developers must be able to understand and contribute
    it has to be both human readable and manageable by automatic tools
    changes must apply on the fly, without any preprocessing (compiling or interpreting)
    it needs to be platform independent and language agnostic

So you create your own declarative language based on any of XML, JSON or YAML. It’s a pattern that I’ve encountered so many times throughout my career. I’ve seen it at companies of any size, applied to job schedulers, translation systems, testing frameworks, GUIs, etc.

At the beginning it’s really cool. Then new requirements start flowing in. First thing first, you need variables. After a short time, you have to add conditional statements. Then of course you start considering loops. Eventually you’ll need to factorize your code into functions and maybe classes. Does it ring a bell? You have re-implemented a full-fledged programming language. Just it has an awful syntax, it’s crazy verbose, nobody out there knows it and cherry on the pie, nobody apart from a developer can even think to look at it.

Sorry Clouformation team, for you is too late. For the others, let me tell you something. If you start considering to implement your new declarative language, just STOP! DO NOT DO IT, NEVER EVER!!! Instead, take any existing mainstream programming language, or a few if you have the resources, and create an old good API!
<h2>Unsupported features</h2>

Ok that was completely out of the scope of this article. Plus there’s not much we can do about it. Let’s get back to the original topic now.

Start playing with Cloudformation and you will soon get accustomed to an unexpected (at least for me) category of problems. The unsupported features. There is an endless list of those, even pretty basic ones.

At AWS, it seems that for some reason the Cloudformation support is not part of the DOD (definition of done) of every new features. The outcome of this situation is that very often AWS teams announce a service has been upgraded and has an exciting new functionality. They show case it in with nice presentation where they demo it on the console. They publish the SDK documentation, all very complete with nice examples. Then you go look at how to employ it in Cloudformation and… surprise! It’s not supported yet. When will it be? No way to know, they say: “we do not disclose the details of our long term road map”. And the simple fact they say “long term” is enough for you to understand that you’re sc….d. Sorry, that is way to late for you.

Let’s say it all together, very loud please. Guys, Cloudformation must be part of the DOD!!!
<h2>Lambda Custom Resources</h2>

Here come the Lambda Custom Resources. One common way to work around missing Cloudformation features is to use Custom Resources. You basically inline a Lambda in your Cloudformation template. This Lambda then calls the AWS SDK where the functionality is implemented.

It’s actually a little more complicated than that. Cloudformation provides automatic support for updates, deletes and rollbacks. This means that your Lambda will have to implement both positive and negative behaviors, based on the current context of your stack. Let’s dive into the details.
