---
repo: maheshpaulj/serverless-pdf-generator
url: 'https://github.com/maheshpaulj/serverless-pdf-generator'
homepage: 'https://www.npmjs.com/package/@maheshpaul/serverless-pdf-generator'
starredAt: '2025-02-19T01:32:48Z'
createdAt: '2025-02-16T08:18:38Z'
updatedAt: '2025-02-19T13:11:38Z'
language: TypeScript
license: MIT
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:07.473Z'
description: >-
  serverless-pdf-generator is a lightweight package that simplifies the process
  of generating PDFs from web pages in a serverless environment like Vercel. It
  utilizes Puppeteer and Chromium to render pages and generate high-quality
  PDFs.
tags:
  - nextjs
  - node-module
  - node-package
  - nodemodules
  - npm
  - pdf-generation
  - react
---

# Serverless PDF Generator

`serverless-pdf-generator` is a lightweight package that simplifies the process of generating PDFs from web pages in a serverless environment like Vercel. It utilizes Puppeteer and Chromium to render pages and generate high-quality PDFs.

## Features

- 📄 Convert any URL to a PDF easily.
- 🚀 Optimized for serverless environments (Vercel, AWS Lambda, etc).
- ⚡ Supports Puppeteer and Chromium-min for minimal dependencies.
- 🎯 Customizable PDF output (format, margins, background printing, etc.).

## Installation

```sh
npm install @maheshpaul/serverless-pdf-generator
```

## Usage

### Next.js API Route Example

Create an API route at `src/app/api/pdf/route.ts`:

```ts
import { handlePDFRequest } from '@maheshpaul/serverless-pdf-generator';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    return handlePDFRequest(request, async () => {
        const url = new URL(request.url).searchParams.get('url');
        if (!url) throw new Error('Missing URL');
        return { url, filename: 'download.pdf' };
    }, {
        format: 'A4',
        printBackground: true,
        development: process.env.NODE_ENV === 'development'
    });
}
```

### Next.js Client Component Example

Create a download button in a React client component:

```tsx
'use client';

export default function DownloadPDF() {
  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/pdf?url=${encodeURIComponent('https://google.com')}`);
      if (!response.ok) throw new Error('PDF generation failed');
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'google.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download PDF');
    }
  };
  
  return (
    <button onClick={handleDownload} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      Download PDF
    </button>
  );
}
```

### React Server Component Example

If using a server-side approach in a React environment:

```tsx
import React, { useState } from 'react';

const DownloadPDF = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/pdf?url=https://example.com');
      if (!response.ok) throw new Error('PDF generation failed');
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'example.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('Error downloading PDF');
    }
    setLoading(false);
  };

  return (
    <button onClick={handleDownload} disabled={loading} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
      {loading ? 'Generating...' : 'Download PDF'}
    </button>
  );
};

export default DownloadPDF;
```

## API

### `generatePDF(options: PDFGeneratorOptions)`

Generates a PDF from a given URL.

#### Parameters

```ts
interface PDFGeneratorOptions {
  url: string;
  format?: 'A4' | 'Letter' | 'Legal';
  margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  printBackground?: boolean;
  development?: boolean;
}
```

#### Example

```ts
import { generatePDF } from '@maheshpaul/serverless-pdf-generator';

async function downloadPDF() {
  const pdfBuffer = await generatePDF({ url: 'https://example.com' });
  require('fs').writeFileSync('output.pdf', pdfBuffer);
}
```

### `handlePDFRequest(request: NextRequest, getData: () => Promise<{ url: string; filename?: string }>, options?: Omit<PDFGeneratorOptions, 'url'>)`

Handles a Next.js API request for generating a PDF.

#### Example

```ts
export async function GET(request: NextRequest) {
    return handlePDFRequest(request, async () => {
        return { url: 'https://example.com', filename: 'example.pdf' };
    }, { format: 'A4' });
}
```

## Deployment

This package is optimized for serverless environments like Vercel. If using locally, ensure you have set `process.env.NODE_ENV === 'development'` to automatically switch between local and serverless execution.


## License

MIT License

## Author

Created by [Mahesh Paul](https://github.com/maheshpaulj). Contributions are welcome!
