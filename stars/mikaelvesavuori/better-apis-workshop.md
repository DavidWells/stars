---
repo: mikaelvesavuori/better-apis-workshop
url: 'https://github.com/mikaelvesavuori/better-apis-workshop'
homepage: ''
starredAt: '2021-12-18T07:18:49Z'
createdAt: '2021-12-13T07:21:42Z'
updatedAt: '2024-10-19T07:25:29Z'
language: TypeScript
license: MIT
branch: main
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:27.119Z'
description: 'Workshop and demo for improving API quality, stability, and observability.'
tags:
  - apis
  - aws
  - demo
  - learning
  - observability
  - quality
  - security
  - serverless
  - stability
  - workshop
---

# Better APIs workshop: Enhancing an API for quality, stability, and observability

_This is a simple workshop combined with a fairly elaborate demonstration of how to approach improving an API to production-grade levels._

**Go to [https://betterapis.mikaelvesavuori.se](https://betterapis.mikaelvesavuori.se) for the documentation, assignment, and examples on implementation practices.**

---

Writing and maintaining APIs can be hard. While the cloud, serverless, and the microservices revolution made it easier and more convenient to set an API skeleton up, age-old issues like software quality ([SOLID](https://stackoverflow.blog/2021/11/01/why-solid-principles-are-still-the-foundation-for-modern-software-architecture/), etc) and understanding the needs of the API consumers still persist.

Werner Vogels, legendary CTO of Amazon, [states his API rules like this](https://www.youtube.com/watch?app=desktop&v=8_Xs8Ik0h1w):

```text
1. APIs are Forever
2. Never Break Backward Compatibility
3. Work Backwards from Customer Use Cases
4. Create APIs That are Self Describing and Have a Clear, Specific Purpose
5. Create APIs with Explicit and Well-Documented Failure Modes
6. Avoid Leaking Implementation Details at All Costs
```

In practice, how can we begin moving towards those ideals?

This project (together with the accompanying [docs and reading materials](https://mikael-vesavuori.gitbook.io/better-apis-quality-stability-observability/)) presents an application and a made-up (but "real-ish") scenario that, taken together, practically demonstrate a range of techniques or methods, patterns, implementations, as well as tools, that all help enhance quality, stability, and observability of applications:

**Quality** means our applications are well-built, functional, safe and secure, maintainable, and are built to high standards.

**Stability** means that our application can withstand external pressure and internal change, without failing at predictably providing its key business values.

**Observability** means that we can understand, from the outputs of our application, what it is doing and if it is behaving well. Or as [Charity Majors writes](https://twitter.com/mipsytipsy/status/1305398051842871297):

```text
📉 Monitoring is for running and understanding other people's code (aka "your infrastructure")

📈 Observability is for running and understanding *your* code -- the code you write, change and ship every day; the code that solves your core business problems.
```

Of the three above concepts, _stability_ is the most misunderstood one, and it will be the biggest and most pronounced component here. It will be impossible to reach what Vogels is pointing to, without addressing the need for stability.

_**Caveat**: No single example can fully encompass all details involved in such a complex territory as this, but at least I will give it a try!_

## How to follow along

You can...

- **Go on a guided tour**: Grab a coffee, just read and follow along with links and references to the work.

or

- **Do the workshop part**: Clone the repo, run `npm install` and `npm start`, then read about the patterns and try it out in your own self-paced way.

## The scenario

You are supporting your friends, who are making a new social online game, by providing an API service that churns out fake users. For their initial MVP, they asked you to create a service that just returns hardcoded feedback; an object like so, `{ "name": "Someguy Someguyson" }`. This was enough while they built their network code and first Non-Player Character engine.

Now, things are starting to become more involved:

- They are ready for a bit more detailed user data, meaning more fields.
- They are also considering pivoting the game to use cats, instead of humans.
- Of course, it's also ideal if the team can be sensibly isolated from any work on new features by individual contributors in the open-source community, who will need to have the work thoroughly documented and coded to a level that marks the high ambitions and makes it easy to contribute.
- Oh, and it would be good with a dedicated beta feature set, too.

For the near future, the **API must be able to handle all these use-cases**. It would also be perfect if the API can have **stable interfaces (for new clients and old), and not use several endpoints**, as the development overhead is already big for the two weekend game programmers.

_**Given the scenario, how would you approach addressing the requirements?**_
