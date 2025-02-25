---
repo: awsfundamentals-hq/aurora-dsql
url: 'https://github.com/awsfundamentals-hq/aurora-dsql'
homepage: 'https://awsfundamentals.com/newsletter'
starredAt: '2025-01-20T18:26:28Z'
createdAt: '2024-12-11T16:51:33Z'
updatedAt: '2025-02-07T16:52:31Z'
language: TypeScript
license: NA
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:11.014Z'
description: "\U0001F4BE Aurora DSQL Serverless"
tags:
  - aurora
  - aws
  - databases
  - drizzle-orm
  - dsql
  - lambda
  - newsletter
---

# Amazon Aurora DSQL Demo

This project demonstrates how to easily bootstrap & use a Amazon Aurora DSQL database using SST (Serverless Stack) v3.

## Getting Started

To run this application, follow these steps:

1. Ensure you have Node.js installed on your system.
2. Clone this repository to your local machine.
3. Install the dependencies by running `pnpm i` in the project root directory.
4. Run `pnpm run db:bootstrap` to set up our database.
5. Run `pnpm run db:schema:migrate` to create the migration.
6. Run `pnpm run db:schema:push` to push your migration to the database.
7. Run `pnpm run db:schema:studio` run the Drizzle studio to view the database in your browser.
8. Start the development server by running:

   ```
   npx sst dev
   ```

This command will deploy the application to your AWS account and start the local development environment.

## About the Project

This application is built using SST v3, which provides a powerful framework for building serverless applications.

It showcases a simple notes app that uses Amazon Aurora DSQL as the database.
The app allows you to create, read, update, and delete notes.

## Project Structure

- `sst.config.ts`: SST configuration file
- `app/page.tsx`: Main Next.js page for the frontend
- `lambda/api.ts`: Function that handles the API requests
- `lambda/db/schema.ts`: Database schema with [Drizzle](https://github.com/drizzle-team/drizzle-orm)
- `bootstrap-db.sh`: Script to bootstrap the database (there's no IaC support yet)
- `drizzle-wrapper.sh`: Script to get the database host and token before running Drizzle

## Learn More

To learn more about SST and how to use it for serverless development, check out the [SST documentation](https://docs.sst.dev/).
