---
repo: alexknowshtml/peek-api
url: 'https://github.com/alexknowshtml/peek-api'
homepage: null
starredAt: '2026-02-24T06:53:34Z'
createdAt: '2026-02-04T18:06:37Z'
updatedAt: '2026-04-06T19:05:43Z'
language: JavaScript
license: MIT
branch: main
stars: 26
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-04-18T22:36:32.502Z'
description: >-
  Discover internal APIs from any website. Captures XHR/fetch calls, extracts
  auth headers, outputs structured endpoint catalogs. Like opening Chrome
  DevTools Network tab, but automated and AI-agent friendly.
tags: []
---

# peek-api

Discover and call internal APIs from any website. Monitors browser network traffic, captures XHR/fetch calls, extracts authentication headers, and outputs structured endpoint catalogs. Also makes direct HTTP API calls using session cookies -- no browser needed.

Like opening Chrome DevTools Network tab, but automated and scriptable.

> Built on the ideas from [Unbrowse](https://github.com/lekt9/unbrowse-openclaw) by [@nicedayfor](https://github.com/nicedayfor). Their work on API discovery for AI agents is what inspired this project. This is a standalone reimplementation with no framework dependencies -- the core capture/extract/report workflow works with any agent platform, any automation stack, or just on its own from the command line.
>
> <details>
> <summary>How this differs from Unbrowse</summary>
>
> Unbrowse is a plugin for the [OpenClaw](https://github.com/nicedayfor/openclaw) agent framework. It's tightly integrated -- it uses OpenClaw's browser service, generates OpenClaw-specific "skills", and requires the OpenClaw runtime.
>
> `peek-api` extracts the same core idea (browse a site, capture API traffic, extract auth, catalog endpoints) and makes it a standalone CLI:
>
> | | Unbrowse | peek-api |
> |---|---|---|
> | **Runtime** | Requires OpenClaw agent framework | Standalone Node.js CLI |
> | **Browser** | OpenClaw's managed browser service | Playwright (local or remote CDP) |
> | **Auth** | Managed by OpenClaw | `login` command saves portable session files |
> | **Bot detection** | OpenClaw handles it | Built-in stealth mode via `--stealth` |
> | **Output** | OpenClaw skill definitions | Markdown report + JSON (use with anything) |
> | **Agent integration** | OpenClaw only | Agent-agnostic (works with Claude, GPT, etc.) |
> | **Direct HTTP** | Not available | Call APIs directly with session cookies |
>
> If you're using OpenClaw, use Unbrowse. If you want API capture without framework lock-in, use this.
> </details>

## Install

```bash
npm install -g peek-api
# or run directly
npx peek-api https://example.com
```

## Quick Start

```bash
# 1. Save a login session (opens a browser for you to log in)
peek-api login https://linkedin.com/login --stealth

# 2. Capture authenticated API traffic using the saved session
peek-api https://linkedin.com/feed --session ./linkedin.com-session.json --stealth

# 3. Call APIs directly with session cookies (no browser needed)
peek-api http https://www.instagram.com/api/v1/direct_v2/inbox/ -s ./ig-session.json
```

## Three Modes

### Browser Capture (default)

Launch a browser, navigate pages, capture all API traffic:

```bash
# Capture APIs from a public site
peek-api https://example.com

# Authenticated capture with saved session
peek-api https://linkedin.com/feed --session ./session.json --stealth

# Connect to already-running Chrome
peek-api https://app.example.com --cdp ws://localhost:9222/devtools/browser/abc123

# Capture multiple pages on the same site
peek-api https://linkedin.com/feed -p /messaging/,/notifications/ --stealth -s ./session.json

# Visible browser for debugging
peek-api https://example.com --no-headless --duration 60
```

### Direct HTTP (`http`)

Make API calls directly using session cookies. No browser needed -- works even when sites block browser automation (Instagram, etc.):

```bash
# GET an API endpoint
peek-api http https://www.instagram.com/api/v1/direct_v2/inbox/ -s ./ig-session.json

# Search
peek-api http "https://www.instagram.com/api/v1/web/search/topsearch/?context=blended&query=coffee" -s ./ig.json

# POST with a body
peek-api http https://api.example.com/data -s ./session.json -X POST -d '{"key":"value"}'

# Add custom headers
peek-api http https://api.example.com/data -s ./session.json -H "X-Custom: value"

# Save response to file
peek-api http https://www.instagram.com/api/v1/feed/timeline/ -s ./ig.json -o timeline.json

# Pipe-friendly raw output
peek-api http https://api.example.com/data -s ./session.json --raw | jq .
```

The `http` command automatically:
- Extracts cookies from your session file and sends them
- Detects CSRF tokens (csrftoken, JSESSIONID) and adds them as headers
- Adds platform-specific headers for known sites (Instagram's X-IG-App-ID, etc.)
- Pretty-prints JSON responses
- Detects expired sessions (302 redirects to login)

### Login

Save a browser session for authenticated access:

```bash
# Opens a browser window - log in manually, then press Enter
peek-api login https://linkedin.com/login --stealth

# Session is saved to linkedin.com-session.json
```

## Output (Browser Capture)

Creates a `peek-api-{domain}/` directory with three files:

### CAPTURE.md

Human-readable endpoint report with auth headers and grouped endpoints.

```markdown
# API Capture: linkedin.com
**Endpoints Found:** 26

## Authentication Headers
csrf-token, x-restli-protocol-version, ...

## Discovered Endpoints

### /voyager/api/relationships
- `GET /voyager/api/relationships/connectionsSummary`
- `GET /voyager/api/relationships/invitationsSummary`
```

### auth.json

Extracted authentication headers and session cookies.

```json
{
  "domain": "linkedin.com",
  "headers": {
    "csrf-token": "ajax:...",
    "x-restli-protocol-version": "2.0.0"
  },
  "cookies": {
    "li_at": "...",
    "JSESSIONID": "..."
  }
}
```

### endpoints.json

Full endpoint data including method, URL, params, headers, and POST bodies.

## Options

### Capture Options

| Option | Description |
|--------|-------------|
| `-d, --duration <seconds>` | Capture duration per page (default: 30) |
| `-s, --session <file>` | Playwright storage state JSON for authenticated sessions |
| `--stealth` | Use stealth mode to avoid bot detection |
| `--headless / --no-headless` | Run headless or visible (default: headless) |
| `--cdp <endpoint>` | Connect to existing Chrome via CDP WebSocket |
| `-p, --pages <paths>` | Additional pages to visit (comma-separated) |
| `--scroll-interval <ms>` | Auto-scroll interval (default: 3000) |
| `--user-agent <string>` | Custom user agent |
| `-o, --output <dir>` | Custom output directory |
| `--verbose` | Show all captured requests in real-time |

### HTTP Options

| Option | Description |
|--------|-------------|
| `-s, --session <file>` | Session file with cookies (required) |
| `-X, --method <method>` | HTTP method (default: GET) |
| `-H, --header "Key: Val"` | Additional header (repeatable) |
| `-d, --data <body>` | Request body (for POST/PUT) |
| `--data-file <path>` | Read request body from file |
| `--user-agent <string>` | Custom user agent |
| `-o, --output <file>` | Save response body to file |
| `--raw` | Output raw response (no formatting, pipe-friendly) |
| `--verbose` | Show request/response headers |

### Login Options

| Option | Description |
|--------|-------------|
| `--stealth` | Use stealth mode (recommended for LinkedIn, Instagram, etc.) |
| `-o, --output <file>` | Custom session file path (default: `{domain}-session.json`) |

## How It Works

### Browser Capture

1. Launches a browser (or connects to an existing one via CDP)
2. Optionally loads a saved session for authenticated access
3. Navigates to the target URL and any additional pages
4. Monitors all network requests, filtering for API calls (XHR/fetch)
5. Extracts authentication headers (Bearer tokens, CSRF, API keys, cookies)
6. Deduplicates endpoints by method + path
7. Generates a structured report with endpoint catalog and auth info

### Direct HTTP

1. Reads a Playwright session file (cookies + storage)
2. Builds a cookie string from all saved cookies
3. Auto-detects CSRF tokens and platform-specific headers
4. Makes the HTTP request with full auth context
5. Returns the response (pretty-printed JSON or raw)

### Login

1. Opens a visible Chrome window pointed at the URL you specify
2. You log in manually -- handle 2FA, captchas, security checks at your own pace
3. Come back to the terminal and press Enter
4. Cookies and localStorage are saved to a JSON file (Playwright storage state format)

Sessions typically last 7-30 days before you need to re-login.

## Stealth Mode

Some sites (LinkedIn, Instagram, etc.) detect and block browser automation. The `--stealth` flag uses [puppeteer-extra-plugin-stealth](https://github.com/nicedayfor/puppeteer-extra-plugin-stealth) to avoid detection. Use it for both `login` and `capture` commands.

## Filtering

The tool automatically filters out:
- Static assets (JS, CSS, images, fonts, etc.)
- Common analytics/tracking requests (Google Analytics, Facebook Pixel, etc.)
- Non-API resource types

Only XHR/fetch requests and URLs containing `/api/`, `/graphql/`, or `/rest/` are captured.

## When Browser Capture Doesn't Work

Some sites (notably Instagram) block all automated browsers -- even stealth mode with real Chrome. In these cases, use the `http` command instead:

```bash
# 1. Login normally to get session cookies
peek-api login https://instagram.com/accounts/login --stealth

# 2. Call APIs directly with session cookies (no browser needed)
peek-api http https://www.instagram.com/api/v1/direct_v2/inbox/ -s ./instagram.com-session.json
```

This bypasses browser detection entirely. The session file contains all cookies needed to authenticate API requests from any HTTP client.

## Use Cases

- **API discovery** - Find what internal APIs a site uses
- **Direct API access** - Call discovered APIs from the command line
- **Build integrations** - Get structured endpoint data for programmatic access
- **AI agent tooling** - Generate API catalogs that agents can call
- **Reverse engineering** - Understand how a web app communicates with its backend
- **Monitoring** - Track what APIs are called during specific user flows

## License

MIT
