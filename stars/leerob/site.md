---
repo: leerob/site
url: 'https://github.com/leerob/site'
homepage: 'https://leerob.com'
starredAt: '2020-07-09T21:23:06Z'
createdAt: '2018-12-16T18:22:37Z'
updatedAt: '2025-02-25T18:13:50Z'
language: MDX
license: NA
branch: main
stars: 7361
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:44.528Z'
description: 'My site built with Next.js, Tailwind, and Vercel.'
tags:
  - blog
  - mdx
  - nextjs
  - portfolio
  - postgres
  - react
  - tailwindcss
  - vercel
---

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fleerob%2Fsite)

# site

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Postgres](https://vercel.com/postgres)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## Running Locally

This application requires Node.js v18.17+.

```bash
git clone https://github.com/leerob/site.git
cd site
bun install
bun run delete # Remove all of my notes
bun dev
```

Optional: Create a `.env.local` file with your `POSTGRES_URL` environment variable to store redirects.

## Database Schema

```sql
CREATE TABLE redirects (
  id SERIAL PRIMARY KEY,
  source VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  permanent BOOLEAN NOT NULL
);
```

## License

1. You are free to use this code as inspiration.
2. Please do not copy it directly.
3. Crediting the author is appreciated.

Please remove all of my personal information by running `bun run delete`.
