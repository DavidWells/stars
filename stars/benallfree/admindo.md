---
repo: benallfree/admindo
url: 'https://github.com/benallfree/admindo'
homepage: 'https://admindo.dev'
starredAt: '2025-05-28T23:10:14Z'
createdAt: '2025-05-28T03:35:48Z'
updatedAt: '2025-05-31T14:17:05Z'
language: JavaScript
license: NA
branch: main
stars: 28
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-31T21:04:41.090Z'
description: The admin for Cloudflare Durable Objects
tags:
  - cli
  - cloudflare
  - cloudflare-durable-objects
  - cloudflare-workers
  - durable-ob
  - web-admin
---

# admindo

![AdminDO Logo](https://raw.githubusercontent.com/benallfree/admindo/refs/heads/main/site/admindo.svg)

Admin dashboard for Cloudflare Durable Objects.

## Quickstart

admindo separates frontend and backend. Frontend compoents are pure HTML components and can be easily integrated.

```html
<html>
  <head>
    <script type="module" src="https://unpkg.com/admindo"></script>
    <script type="module" src="https://unpkg.com/admindo-plugin-about"></script>
  </head>
  <body>
    <admin-do />
  </body>
</html>
```

## Configuration

### Root Prefix

You can configure AdminDO to work under a specific path prefix using the `root` attribute:

```html
<!-- AdminDO will handle routes under /admin path -->
<admin-do root="/admin" />

<!-- All plugin routes will be relative to /admin -->
<!-- Example: dashboard at /admin/, plugins at /admin/plugin-name -->
```

This is useful when:

- Mounting AdminDO under a subdirectory
- Integrating with existing routing systems
- Deploying multiple AdminDO instances with different paths

## Available Plugins

- [about](./plugins/about) - Author credits
- [better-auth](./plugins/better-auth) - Enhanced authentication functionality
- [dofs-browser](./plugins/dofs-browser) - Durable Objects File System GUI
- [dterm](./plugins/dterm) - Durable Objects File System terminal
- [dorm](./plugins/dorm) - Durable Objects ORM
