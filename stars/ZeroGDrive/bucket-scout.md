---
repo: ZeroGDrive/bucket-scout
url: 'https://github.com/ZeroGDrive/bucket-scout'
homepage: null
starredAt: '2026-01-24T19:06:08Z'
createdAt: '2026-01-04T07:18:06Z'
updatedAt: '2026-01-24T22:30:25Z'
language: TypeScript
license: NA
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-01-24T22:32:30.864Z'
description: null
tags: []
---

# BucketScout

<p align="center">
  <img src="apps/web/src-tauri/icons/icon.png" alt="BucketScout Logo" width="128" height="128">
</p>

<p align="center">
  <strong>A powerful, cross-platform S3-compatible object storage browser</strong>
</p>

<p align="center">
  Manage your cloud storage across Cloudflare R2 and AWS S3 with an intuitive desktop application.
</p>

---

## Features

### Multi-Provider Support

- **Cloudflare R2** - Full support with account ID configuration and location hints
- **AWS S3** - Complete integration with 16+ region options
- **Multiple Accounts** - Manage unlimited storage accounts simultaneously

### File Operations

- **Upload** - Drag & drop or click to upload with multipart support for large files
- **Download** - Stream downloads with real-time progress tracking
- **Delete** - Batch delete with confirmation dialogs
- **Rename** - Quick inline renaming
- **Copy & Move** - Within buckets, across buckets, even across different accounts
- **Multi-select** - Batch operations on multiple files at once

### Folder Management

- **Create Folders** - Organize your storage with folder structures
- **Recursive Operations** - Copy, move, or delete entire folder trees
- **Download as ZIP** - Download complete folders as compressed archives

### File Preview

- **Images** - Preview JPG, PNG, GIF, WebP, BMP, SVG with thumbnails
- **Text Files** - View TXT, MD, CSV, LOG, and 15+ code file formats
- **JSON** - Syntax-aware JSON preview
- **PDF** - Full PDF viewing support
- **Metadata** - View content type, size, ETag, storage class, and custom metadata

### Sharing & Access

- **Presigned URLs** - Generate temporary shareable links (1h, 6h, 24h, 7 days)
- **Public URLs** - Quick access to public object URLs
- **One-click Copy** - Copy links to clipboard instantly

### Bucket Management

- **Create Buckets** - With region/location selection per provider
- **Delete Buckets** - Safe delete or force delete with all contents
- **List All Buckets** - View all buckets across your accounts

### Search & Navigation

- **Full-text Search** - Find files across your entire bucket
- **Breadcrumb Navigation** - Easy folder traversal
- **Grid & List Views** - Switch between viewing modes

### Metadata Editing

- **Content-Type** - Set MIME types
- **Cache-Control** - Configure caching headers
- **Custom Metadata** - Add key-value pairs to any object

### Desktop Experience

- **Native App** - Built with Tauri for performance
- **Drag & Drop** - Drop files directly from your file explorer
- **Auto Updates** - Stay up to date automatically
- **Cross-Platform** - Windows, macOS, and Linux

---

## Getting Started

### Download

Download the latest release for your platform from the [Releases](https://github.com/AyoubIssique/bucket-scout/releases) page.

### Build from Source

First, install the dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.

To run as a desktop app:

```bash
cd apps/web && bun run desktop:dev
```

To build the desktop app:

```bash
cd apps/web && bun run desktop:build
```

---

## Project Structure

```
bucket-scout/
├── apps/
│   └── web/              # Frontend + Tauri desktop app
│       ├── src/          # React frontend
│       └── src-tauri/    # Rust backend
└── packages/
    ├── config/           # Shared TypeScript config
    └── env/              # Environment variables
```

---

## Tech Stack

- **Frontend** - React, TanStack Router, TailwindCSS, shadcn/ui
- **Backend** - Rust, Tauri 2.0
- **S3 Client** - aws-sdk-rust
- **Build** - Turborepo, Bun, Vite

---

## Available Scripts

| Command                                | Description                        |
| -------------------------------------- | ---------------------------------- |
| `bun run dev`                          | Start all apps in development mode |
| `bun run build`                        | Build all applications             |
| `bun run dev:web`                      | Start only the web application     |
| `bun run check-types`                  | Check TypeScript types             |
| `bun run check`                        | Run Oxlint and Oxfmt               |
| `cd apps/web && bun run desktop:dev`   | Start Tauri desktop app            |
| `cd apps/web && bun run desktop:build` | Build Tauri desktop app            |

---

## Support the Project

If you find BucketScout useful, consider supporting its development:

### Buy Me a Coffee

<a href="https://buymeacoffee.com/zerogdrive" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50">
</a>

### Crypto

| Network           | Address                                      |
| ----------------- | -------------------------------------------- |
| **ERC-20 (USDT)** | `0x424dd2471d8231140f64c292845fcb2ca0cb1f06` |

---

## License

MIT

---

<p align="center">
  Made with Rust and React
</p>
