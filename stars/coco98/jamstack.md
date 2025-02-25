---
repo: coco98/jamstack
url: 'https://github.com/coco98/jamstack'
homepage: null
starredAt: '2018-11-19T18:53:15Z'
createdAt: '2018-10-29T07:59:40Z'
updatedAt: '2020-01-13T03:19:17Z'
language: JavaScript
license: NA
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:02.641Z'
description: null
tags: []
---

# gatsby-postgres-graphql

Boilerplate to get started with Gatsby, Hasura GraphQL engine as CMS and postgres as database using the awesome plugin [gatsby-source-graphql](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-graphql).

![Gatsby Postgres GraphQL](./assets/gatsby-postgres-graphql.png)

# Tutorial

- Deploy Postgres and GraphQL Engine on Heroku:
  
  [![Deploy to
  heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku)
- Get the Heroku app URL (say `my-app.herokuapp.com`)
- Clone this repo:
  ```bash
  git clone https://github.com/hasura/graphql-engine
  cd graphql-engine/community/boilerplates/gatsby-postgres-graphql
  ```

- Create `author` table:
  
  Open Hasura console: visit https://my-app.herokuapp.com on a browser  
  Navigate to `Data` section in the top nav bar and create a table as follows:

  ![Create author table](./assets/add_table.jpg)

- Insert sample data into `author` table:

  ![Insert data into author table](./assets/insert_data.jpg)

  Verify if the row is inserted successfully

  ![Insert data into author table](./assets/browse_rows.jpg)

- Install npm modules:
  ```bash
  npm install
  ```

- Configure gatsby to use `gatsby-source-graphql` plugin and a connection GraphQL url to stitch the schema.

```js
{
  plugins: [
    {
      resolve: 'gatsby-source-graphql', // <- Configure plugin
      options: {
        typeName: 'HASURA',
        fieldName: 'hasura', // <- fieldName under which schema will be stitched
        createLink: () =>
          createHttpLink({
            uri: `${ process.env.HASURA_GRAPHQL_URL }`, // <- Configure connection GraphQL url
            headers: {},
            fetch,
          }),
        refetchInterval: 10, // Refresh every 10 seconds for new data
      },
    },
  ]
}
```

- Make a GraphQL query from your component

```js
const Index = ({ data }) => (
  <div>
    <h1>My Authors </h1>
    <AuthorList authors={data.hasura.author} />
  </div>
)
export const query = graphql`
  query AuthorQuery {
    hasura {        # <- fieldName as configured in the gatsby-config
      author {      # Normal GraphQL query
        id
        name
      }
    }
  }
`
```

- Run the app:
  ```bash
  HASURA_GRAPHQL_URL=https://my-app.herokuapp.com/v1alpha1/graphql npm run develop
  ```
- Test the app
  Visit [http://localhost:8000](http://localhost:8000) to view the app

  ![Demo app](./assets/test_app.jpg)


# Deploying to netlify on data changes
- Setup a git repo based continuous build on netlify
- Create a build-hook
- Head to the events tab on the hasura console
- Create a new trigger. Select the table you want to listen to changes on and the operations.
- Set the URL to be the netlify build-trigger URL

# Contributing

Checkout the [contributing guide](../../../CONTRIBUTING.md#community-content) for more details.
