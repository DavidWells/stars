---
repo: twoflags-io/twoflags-api
url: 'https://github.com/twoflags-io/twoflags-api'
homepage: null
starredAt: '2020-04-08T16:39:36Z'
createdAt: '2020-04-08T02:02:21Z'
updatedAt: '2024-12-09T17:15:58Z'
language: TypeScript
license: NA
branch: master
stars: 55
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:59.016Z'
description: TwoFlags Feature Flags API
tags: []
---

# twoflags-api

TwoFlags is an OpenSource Feature Flags service built on
Cloudflare Workers and Workers KV. 

It supports:
- Multi-tenancy, Multiple accounts on the same service
- Environments
- Namespaces
- Flag types: `string`, `number`, `boolean`, `segment`
- String flag's selectors to name string values
- Segments flags for A/B Tests
    - Correlation UID (Anonymized user will always receive the same value)
    - Segment progression doesn't affect previous values. 
    - (Coming soon) User Overrides
- API Keys
- Datadog Logging. (https://www.datadoghq.com/) (_Other Log solutions on the roadmap_)
- Optimized Resolver Endpoint
- [React SDK](https://www.npmjs.com/package/@twoflags/react-featureflags)
- [API Documentation](https://twoflags-io.github.io/twoflags/) With OpenAPI 3.0 spec.   

To install on your own Cloudflare Account follow the steps in [INSTALL](./INSTALL.md)

# Authors

Ernesto F. [@efreyreg](https://twitter.com/efreyreg)
&
Julio M. [@julio_menendez](https://twitter.com/julio_menendez)

PS: If you want to take it for a spin, send us a message so we can create you a trial 
account on a demo environment we hosted on https://api.twoflags.io
