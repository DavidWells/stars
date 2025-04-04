---
repo: gmpetrov/ultimate-saas-ts
url: 'https://github.com/gmpetrov/ultimate-saas-ts'
homepage: utlimate-saas-js.vercel.app
starredAt: '2021-09-25T03:13:53Z'
createdAt: '2021-09-17T13:03:02Z'
updatedAt: '2025-02-05T11:03:58Z'
language: TypeScript
license: MIT
branch: master
stars: 1273
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:44.924Z'
description: Template to quickstart a SAAS business
tags: []
---

# 🚀⚡️🧑‍💻 *Ultimate SAAS template Typescript/Next.js/NextAuth.js/Prisma/Stripe/Tailwindcss/Postgresql* 

*My template to quickstart a SAAS project*

>Stop losing time implementing authentication and payment over and over again.  
Focus on what brings value to your customers

## Demo
https://utlimate-saas-js.vercel.app


## Features
- Authentication with NextAuth.js (Own Your Data ✅)
  - Email with magic link
  - Github 
  - Many other oauth providers available [check their docs](https://next-auth.js.org/configuration/providers/oauth-provider)
- Payment with Stripe
  - Stripe checkout
  - Stripe billing portal
  - Stripe webhooks (products / prices are synced)
- Hosted on [vercel](https://vercel.com/) for free 

## Stripe
Check the stripe section of this [repo](https://github.com/vercel/nextjs-subscription-payments) as the steps are very similar

## Postgresql
A postgresql db is needed to deploy the app.  
You can have a very small instance for free on [heroku](https://www.heroku.com/pricing#data-services)  
****

## Made with
- Typescript
- Next.js
- NextAuth.js
- Prisma
- Postgresql
- Stripe
- Tailwindcss
## Develop

```
# create .env 
cp .env.example .env

# install dependencies
yarn

# Launch pgsql and maildev
yarn docker:start

# migrate and seed the database
yarn prisma:migrate:dev

yarn prisma:seed

# install stripe cli 
https://stripe.com/docs/webhooks/test

stripe login

stripe listen --forward-to http://localhost:3000/api/stripe/webhook

# start server
yarn dev

```

## Inspirations
- https://github.com/vercel/nextjs-subscription-payments
- https://github.com/hexrcs/prisma-next-auth
