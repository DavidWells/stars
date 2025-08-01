---
repo: openstatusHQ/data-table-filters
url: 'https://github.com/openstatusHQ/data-table-filters'
homepage: 'https://logs.run'
starredAt: '2025-06-14T01:28:58Z'
createdAt: '2024-08-28T20:51:38Z'
updatedAt: '2025-06-14T22:15:03Z'
language: TypeScript
license: MIT
branch: main
stars: 1457
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-06-14T22:31:09.401Z'
description: A playground for tanstack-table
tags:
  - cmdk
  - data-table
  - nextjs
  - nuqs
  - react
  - shadcn
  - tanstack-react-query
  - tanstack-table
---

## About The Project

This is a standalone data-table demo that we will be using within the [OpenStatus](https://openstatus.dev) dashboard.

![Data Table with Infinite Scroll](https://data-table.openstatus.dev/assets/data-table-infinite.png)

Visit [data-table.openstatus.dev](https://data-table.openstatus.dev) to learn more.

To make it not only more accessible for you to use, but also work on PoC/MVP with data-tables, we have started this repository. We will maintain it and add new examples over time.

It currently includes two main concepts:

- [data-table with simple pagination](https://data-table.openstatus.dev/default) (client-side)
- [data-table with infinite scroll and click details](https://data-table.openstatus.dev/infinite) (server-side)

The UI is heavily inspired by datadog and vercel log tables.

> [!NOTE]
> We are working on a [Guide](https://data-table.openstatus.dev/guide) to help you get started and not wild guess anymore.

More Examples:

- [OpenStatus Light Viewer](https://data-table.openstatus.dev/light) (UI for [`vercel-edge-ping`](https://github.com/OpenStatusHQ/vercel-edge-ping))

## Built With

Our stack is:

- [nextjs](https://nextjs.org)
- [tanstack-query](https://tanstack.com/query/latest)
- [tanstack-table](https://tanstack.com/table/latest)
- [shadcn/ui](https://ui.shadcn.com)
- [cmdk](http://cmdk.paco.me)
- [nuqs](http://nuqs.47ng.com)
- [dnd-kit](https://dndkit.com)

We will consider making an example with [vitejs](https://vitejs.dev) for all our raw react lovers. **Contributions are welcome!**

## Getting Started

No environment variable required. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Want more?

If you are looking for specific use-cases or like what we are building and want to hire us, feel free write us to [hire@openstatus.dev](mailto:hire@openstatus.dev) or book a call via [cal.com](https://cal.com/team/openstatus/30min).

## Credits

- [sadmann17](https://x.com/sadmann17) for the dope `<Sortable />` component around `@dnd-kit` (see [sortable.sadmn.com](https://sortable.sadmn.com))
- [shelwin\_](https://x.com/shelwin_) for the draggable chart inspiration (see [zoom-chart-demo.vercel.app](https://zoom-chart-demo.vercel.app))
