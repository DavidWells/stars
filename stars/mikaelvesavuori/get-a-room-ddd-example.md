---
repo: mikaelvesavuori/get-a-room-ddd-example
url: 'https://github.com/mikaelvesavuori/get-a-room-ddd-example'
homepage: ''
starredAt: '2025-01-14T06:58:01Z'
createdAt: '2022-09-28T05:19:31Z'
updatedAt: '2025-01-14T09:02:04Z'
language: TypeScript
license: MIT
branch: main
stars: 38
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:16.063Z'
description: >-
  Get-A-Room example application using Domain Driven Design and Clean
  Architecture. Written in TypeScript and deployed to AWS with a serverless
  stack.
tags:
  - aws
  - clean-architecture
  - ddd
  - ddd-example
  - example
  - serverless
  - typescript
---

# Domain Driven Microservices on AWS in Practice

_This project provides a Domain Driven Design & Clean Architecture-informed, multi-service event-driven architecture to run a simple room reservation application._

**Go to [https://ddd.mikaelvesavuori.se](https://ddd.mikaelvesavuori.se) for the book that introduces DDD and our example codebase (this one!).**

## Detailed instructions in READMEs of each Bounded Context (microservice)

This README only sets the overall stage. Please refer to the respective `README.md` files for each microservice in the `code` directory.

---

## Scenario

The expensive and outdated room booking system at your company has been making life miserable for pretty much everyone there. Your team has volunteered to replace the system with a cost-efficient custom implementation, with a target of doing so within the space of one week. To drive down cost and maintenance you've already settled on using serverless cloud technologies as the core components. Now comes the real question: How do you _design_ the system?

You've just had a brainstorming session and a requirements workshop together with stakeholders from the business and office management side of things, as well as with some front end developers in the company.

For now, these are the identified requirements:

- Book rooms in one facility and time zone (could be more later)
- Book rooms in slots of 1 hour (might change or be dynamic later)
- Allow for the cancellation of room bookings
- Your team will focus on providing the back end, APIs and such; Front end is out of scope for your team
- Optional: Allow for rooms that are not checked-in within 10 minutes of their starting time to be cancelled

When it comes to integration work:

- Assume that the front end will require an updated views on bookings
- Assume that the front end will provide as input:
  - The user name
  - The room name or ID
  - The start and end times of the slot

## Solution diagram

![Complete solution diagram](/readme/solution-diagram.png)

## Structure

- `code`: Source code
- `data-modeling`: JSON files that at least roughly attempt to show requests and responses etc.
- `diagrams`: Diagrams for the solution

## Out of scope

In the interest of time and energy, certain features of a full solution are excluded from the scope of this exercise. We shouldn't spend time on details like worrying for conflicting names and multiple time zones, as that is not what we are focusing our cognitive effort on here, and the precise scope has to do with an implementation in one location.
