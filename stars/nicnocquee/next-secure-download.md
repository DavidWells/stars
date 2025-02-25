---
repo: nicnocquee/next-secure-download
url: 'https://github.com/nicnocquee/next-secure-download'
homepage: 'https://nextsecure.nico.fyi'
starredAt: '2021-06-28T05:51:36Z'
createdAt: '2021-06-16T20:22:25Z'
updatedAt: '2024-09-11T07:08:25Z'
language: TypeScript
license: MIT
branch: main
stars: 32
isPublic: true
isTemplate: true
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:32.041Z'
description: A Next.js project to serve a password-protected download link.
tags:
  - nextjs
  - nodejs
  - react
  - reactjs
  - secure
---

![Next secure download logo](https://github.com/nicnocquee/next-secure-download/blob/main/public/next-secure-download-icon-small.png?raw=true)

# About

This repo contains the basic [Next.js](https://nextjs.org) project that will allow you to create a public password-protected file download link. The file will be protected using basic authentication.

Btw, support this repo in Product Hunt, will you? 😁

<a href="https://www.producthunt.com/posts/next-secure-download?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-next-secure-download" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=300610&theme=light" alt="Next Secure Download - Create a password-protected download link for free | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

# Motivation

I needed a solution to make a file publicly downloadable, but

- ✅ it should be **FREE**.
- ✅ the files are password-protected.
- ✅ the files can be directly downloaded, no download page.
- ✅ the files can be downloaded from script or command line.

I couldn't find anything that meets those requirements. So I made this repo by storing the files in private GitHub repository and serving them through [Vercel](https://vercel.com), both of which are FREE.

# Demo

1. Check out [this demo website](https://nextsecure.nico.fyi/) which was deployed to Vercel.
2. Click the "Download secret file" link.
3. Use `admin` and `supersecret` as User and Password, respectively.

You can also directly download the file from the browser by opening this link [https://nextsecure.nico.fyi/api/download/secret.json](https://nextsecure.nico.fyi/api/download/secret.json). Enter `admin` and `supersecret` as User and Password, respectively.

And since the file is protected using basic authentication, you can also download the file directly from command line using curl:

```shell
curl -OJ "https://admin:supersecret@nextsecure.nico.fyi/api/download/secret.json"
```

# How to use

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fnicnocquee%2Fnext-secure-download.git&env=ADMIN_USERNAME,ADMIN_PASSWORD&envDescription=Use%20ADMIN_USERNAME%20and%20ADMIN_PASSWORD%20for%20the%20basic%20authentication.&demo-title=Password%20Protected%20File%20Download&demo-url=https%3A%2F%2Fnext-secure-download.vercel.app%2F)

1. Click the "Deploy" button above to deploy this project to your Vercel account. Please register with Vercel if you haven't.
2. Fill up `ADMIN_USERNAME` and `ADMIN_PASSWORD` environment variables with the username and password you want to use to protect your file.
3. Then follow the rest of the instructions until the project is deployed. Make sure the repository that will be created is private!
4. Once it's deployed, test it by visiting the project's URL. Then click the "Download secret file" link. You should be prompted with username and password dialogue.
5. To change, remove, or add the file that you want to protect, first clone the repository of your project.
6. Put the file to be downloaded in `files` directory.
7. Commit the file to your repository then push to Github.
8. Vercel will automatically build your project and your file will be available for download with the username and password you defined.
9. Your file then can be downloaded from `https://your-vercel-deployment-url/api/download/the-file-name-here` URL.

If you'd rather watch a video on how to use this project, check it out in [this blog post](https://nicnocquee.medium.com/create-password-protected-download-links-for-free-with-github-and-vercel-a4758602b21e).

# Use cases

- Securely store and serve a configuration file for your app.
- Share files with others privately.

# Code overview

The not-so-secret sauce is inside the `app/api/download/[file_name]/route.ts` and `middleware.ts`. In `middleware.ts`, the app will check the credentials. In `app/api/download/[file_name]/route.ts`, the app will find and return the file. That's it.

# Notes

1. It goes without saying that the files remain secret as long as your repository is private!
2. Do not forget to assign values to `ADMIN_USERNAME` and `ADMIN_PASSWORD` environment variables, or else the files can be freely downloaded.
3. If you change the username and password, you need to redeploy the deployment in vercel.
4. Of course you can [deploy the project to your own server](https://nextjs.org/docs/deployment#other-hosting-options).
5. This solution is FREE as long as GitHub and Vercel remains having FREE plans. 😆

# License

MIT

# Info

I'm making a book about [Pull Requests Best Practices. Boost Your Team's Efficiency: Master the Art of Writing & Reviewing Pull Requests!
](https://pr.nico.fyi). Check it out!
