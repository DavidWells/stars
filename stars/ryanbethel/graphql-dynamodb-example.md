---
repo: ryanbethel/graphql-dynamodb-example
url: 'https://github.com/ryanbethel/graphql-dynamodb-example'
homepage: null
starredAt: '2021-10-31T20:47:30Z'
createdAt: '2020-11-24T12:00:29Z'
updatedAt: '2023-10-27T23:47:04Z'
language: JavaScript
license: NA
branch: main
stars: 29
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:40.827Z'
description: null
tags: []
---

# DynamoDB and GraphQL together

This is an example GraphQL API that is backed by DynamoDB. It will deploy to AWS serverless technology using the Architect framework([arc.codes](arc.codes)). For a more detailed explanation of the code see the blog post on [css-tricks](https://css-tricks.com/how-to-make-graphql-and-dynamodb-play-nicely-together/).

## Getting Started

1. Clone the repository.
    ```
    git clone https://github.com/rbethel/graphql-dynamodb-example.git
    ```
2. Install Dependencies.
    ```
    npm install
    ```
3. Create your preferences file for seeding local data.
    ```
    cp preferences.arc.example preferences.arc
    ```
4. Start the development sandbox.
    ```
    npm start
    ```
5. Navigate to the graphiQL playground
    ```
    http://localhost:3333
    ```
6. Run the sample query below
    ```
    query { team( id:"t_01" ){
        id
        name
        members{
            id
            name
            credentials{
                id
                certification{
                    id
                    name
                }
            }
        }
    }}
    ```

## Architect Framework

This project uses the Architect Framework ([arc.codes](arc.codes)) to build serverless web apps that deploy to AWS. This is an Infrastructure-as-Code open source project that makes working with AWS much easier.

## Local Development

The best part of Architect is that all the infrastructure that it deploys can be easily run in local development using the built in sandbox. This includes DynamoDB tables. There is a small script in the `sandbox-scripts` folder that will seed the local database with development data when you run the local development server.

## Deployment

To deploy to AWS only requires a single command. You do need an AWS account. Follow the instructions in the [arc.codes](arc.codes) docs to setup.
