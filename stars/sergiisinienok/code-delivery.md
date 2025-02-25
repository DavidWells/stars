---
repo: sergiisinienok/code-delivery
url: 'https://github.com/sergiisinienok/code-delivery'
homepage: null
starredAt: '2020-03-23T00:47:59Z'
createdAt: '2019-10-12T14:24:22Z'
updatedAt: '2023-06-26T10:16:20Z'
language: TypeScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:02.244Z'
description: Code Delivery procedure 101 workshop
tags: []
---

# Code Delivery procedure 101 workshop

## Demo application - requirements

1. There should be the service to manage Products information. This service should provide the following functionality:
    1. List all the Products available to the user.
    2. Create new products.
    3. Edit existing products.

2. The service will consist of the following components:
    1. Products DB. Should be hosted separately. The service should support both Postgres and MongoDB.

    2. Products REST API. Should be hosted separately. Tech: NodeJS, TypeScript, ???. The API should support the following functionalities:
        1. HTTP POST /products - will create a new Product and return it's payload back to the client. Idempotent.
        2. HTTP GET /products - will return all the products available to the user.
        3. HTTP GET /product/{id} - will return the specific product by its ID.
        4. HTTP PATCH /product/{id} - will edit the product with the specified ID.
        5. API app should log its internal to stdout using Structured Logging approach.

    3. Products management UI. Should be hosted separately. Tech: AngularJS, TypeScript, ???. Should have the following functionalities:
        1. Products list view.
        2. Create new Product button.
        3. Edit Product button. Should open the Product edit form.

## Agenda

0. Generally:
    1. Talk about tooling a lot. Each tool worth a few words.
    2. Who is responsible for what. Roles: -DevOps- , Devs, PM, BA, QC, QA, etc.
    3. Think about Best practices at each stage of development.
    4. What should be automated or left for manual work?
    5. Why the same code breaks once deployed in Prod compared to lower stacks?
        1. Environment configuration issue. We're out of control on what's there and unable to easily track this.
        2. App's misconfigurations. How to appropriately configure your app.

1. What to start from - need a flowchart: Source Code => Build per app type.
    1. What kind of an app we'll be developing? How are the sandboxes/prod instances set up? (for each app type - how it works and infrastructure).
        1. Desktop app - ???
        2. Mobile app - ???
        3. Website - ???
        4. Public facing API - ???
        5. The service with UI, API, and other features.
2. Dev is working on the feature locally.
    1. Step by step guidance from making changes in local env till the app is available for testing in prod.
    2. Demo of the console / AWS interphase/ etc. and what is happening on the each step of a "file" delivery
    3. Source Control: working with branches, PR rewiev, Merge Strategies, Cherry Pick.
3. How to deliver our work:
    1. Copying our app(s), packaged locally, manually to the infrastructure. Pros and Cons. Environment inconsistency issue.
    2. Delivering code vs database - show an example of an app deployed without DB updates, both Postgres and MongoDB. Highlight the differences between Schema-driven and Schema-less DBs. Migrations types?
    3. What actually was deployed? App's Versioning and Source Control Tagging.
    4. Logging in general: types of logs and purpose of it. Log types. Structured VS Plain Text logs. Log levels.
    5. Misconfigurations - troubleshoot it using app logs.
    6. Configuration management. General app configuration VS Secrets (Passwords, Tokens, Access Keys, Hashes, etc.).
    7. All of the above is manual work. People are tend to make mistakes.
4. Fixes for our delivery-phase issues:
    1. Delivery automation 101: build and delivery scripts. Mention about "Build once - deploy everywhere" best practice.
    2. Packaging our deliverables, environment isolation. Docker.
    3. Configuration management best practices. ENV variables and other cool things.
5. Delivery Pipeline - godmode. CI/CD pipeline.
    1. Does it make sense to go this far? Yes! Prooflink ["DORA State Of DevOps 2018"]("../external-content/DORA-State of DevOps.pdf")
    2. Setting up CI/CD from scratch on a project. Where to start?
    3. Pick the CI/CD platform first. Pros and Cons of specific tools (like Jenkins vs TeamCity).
    4. DevOps. This is a set of practices, not a role! ["DevOps Manifesto"](https://sites.google.com/a/jezhumble.net/devops-manifesto/). Basic practices:
        1. Infrastructure As Code. Automated infrastructure provisioning.
        2. /// TBD:
    5. Infrastructure vs Code versions compatibility
6. A couple of little things to keep in mind:
    1. Maintenance windows. Notifications and service availability.
    2. Roots of backward compatibility.
    3. Backups and rollbacks: infrastructure, code and DB.
7. Roles in delivery: Who should do what? /// Questionable.

# Agenda to announce

We'll gonna be talking about the Software Delivery workflow from the Software Engineering perspective.
We'll cover the basic theory of this process with the widespread examples for the most popular application examples in modern IT.
Then we'll go ahead, wear the "Developer" hat and deliver the web app from scratch. As part of this demo, we'll scratch the surface of:
1. How Devs are working on the feature locally.
2. How to deliver our work to the end-user: good and bad examples.
3. Application infrastructure, configuration, logging. CI/CD pipeline and daily routines automation.
4. Application maintenance, backward compatibility and rollbacks.
5. Different roles in software delivery process.
6. Best practices ...

And many-many more that is there to have a fun!



# Time Spent.

1. 10-12-2019 - 3h.
2. 10-14-2019 - 4h.
3. 10-15-2019 - 3h.
4. 10-16-2019 - 3h.
5. 10-18-2019 - 4h.
6. 10-20-2019 - 4h.
7. 10-21-2019 - 4h.
8. 10-22-2019 - 4h.
9. 10-23-2019 - 4h.
10. 10-24-2019 - 6h.
11. 10-25-2019 - 4h.

----------------------------------------------------------------

# Useful links

1. ["Как установить Nginx в Ubuntu 18.04"](https://www.digitalocean.com/community/tutorials/nginx-ubuntu-18-04-ru)
2. ["PostgreSQL in the cloud"](elephantsql.com)
3. ["How To Set Up a Node.js Application for Production on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)
4. ["API boilerplate"](https://github.com/javieraviles/node-typescript-koa-rest)
5. ["UI Boilerplate"](https://github.com/Ismaestro/angular8-example-app)
6. ["Static Website example"](https://github.com/cloudacademy/static-website-example.git)
7. ["tmux shortcuts & cheatsheet"](https://gist.github.com/MohamedAlaa/2961058)
8. ["HTML presentation to PDF - decktape"](https://github.com/astefanutti/decktape) - `decktape remark index.html code-delivery-oct-2019.pdf`
