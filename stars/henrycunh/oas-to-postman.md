---
repo: henrycunh/oas-to-postman
url: 'https://github.com/henrycunh/oas-to-postman'
homepage: null
starredAt: '2022-02-05T18:56:04Z'
createdAt: '2021-07-30T16:05:12Z'
updatedAt: '2022-04-24T17:56:28Z'
language: TypeScript
license: NA
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:16.208Z'
description: OpenAPI Specification to Postman Collection
tags: []
---

<div align="center">
    <img src="./assets/logo.png" width="600" />
    <div>
      <strong align="center">OAS 2 Postman</strong>
    </div>
    <div align="center">
      Convert OpenAPI specification files to Postman Collections
    </div>
    </br>
    <a href="https://oas2pm.abaca.team">
    <img src="https://img.shields.io/static/v1?label=live&message=demo&color=green&style=for-the-badge" />
    </a>
</div>
</br>

---

</br>


<details open="open">
  <summary><strong style="display: inline-block">Table of Contents</strong></summary>
  
  1. [Overview](#overview)
  1. [Development](#development)
  
</details>

## Using

You can simply prepend `oas2pm.abaca.team?url=` to any OpenAPI specification url!

## Development

- Clone the repository and install the dependencies
    ```sh
    yarn
    # or
    npm i
    ```
- Run the Netlify development server
  ```sh
  yarn dev
  ```
- Access the endpoint
    - By default it's located at http://localhost:8888/.netlify/functions/convert
