---
repo: alexknowshtml/drawbridge
url: 'https://github.com/alexknowshtml/drawbridge'
homepage: null
starredAt: '2026-02-16T21:13:42Z'
createdAt: '2026-02-08T20:10:18Z'
updatedAt: '2026-04-01T01:41:56Z'
language: TypeScript
license: NA
branch: main
stars: 64
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-04-18T22:36:32.974Z'
description: >-
  Claude Code skill + real-time diagram server. Ask Claude to draw flowcharts,
  architecture diagrams, and dependency maps — watch them appear live on an
  Excalidraw canvas.
tags: []
---

# Drawbridge

**A Claude Code skill + real-time diagram server.** Ask Claude to draw a flowchart, architecture diagram, or dependency map — and watch it appear live on an Excalidraw canvas in your browser.

![Drawbridge demo — elements appearing in real-time as an AI pushes them](demo.gif)

## Table of Contents

- [Using with Claude Code](#using-with-claude-code)
- [How It Works](#how-it-works)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Element Format](#element-format)
- [Color Palette](#color-palette)
- [Sizing Rules](#sizing-rules)
- [Drawing Order](#drawing-order)
- [Complete Examples](#complete-examples)
- [Rendering to PNG/SVG](#rendering-to-pngsvg)
- [Persistence](#persistence)
- [Frontend Features](#frontend-features)
- [Architecture](#architecture)
- [Credits](#credits)

## Using with Claude Code

Drawbridge includes a ready-to-use Claude Code skill that teaches Claude how to generate and push diagrams. Once installed, Claude will automatically use Drawbridge when you ask for flowcharts, architecture diagrams, dependency maps, or any visual diagram.

### Install the Skill

Copy the skill file into your project's `.claude/skills/` directory:

```bash
# From your project root
mkdir -p .claude/skills/drawbridge
cp /path/to/drawbridge/skills/SKILL.md .claude/skills/drawbridge/SKILL.md
```

Or if you cloned the repo:

```bash
mkdir -p .claude/skills/drawbridge
cp drawbridge/skills/SKILL.md .claude/skills/drawbridge/SKILL.md
```

### What the Skill Includes

- Complete element format reference (labeled shapes, arrows, bindings, zones)
- Color palette with semantic meanings
- Sizing rules and font minimums
- Drawing order for progressive streaming
- Full examples (connected boxes, multi-tier architecture)
- Render-to-PNG/SVG workflow

### Try It

After installing the skill, ask Claude:

> "Draw a diagram of a three-tier web architecture"

Claude will push elements to your Drawbridge server and they'll appear live in your browser.

## How It Works

```
AI / Script ──HTTP POST──> Drawbridge Server ──WebSocket──> Browser (Excalidraw)
```

1. **Server** runs Express (HTTP API) + WebSocket on configurable ports
2. **Browser** loads Excalidraw and connects via WebSocket to a session
3. **AI/Script** pushes simplified "skeleton" elements via HTTP — the browser converts them to full Excalidraw elements using `convertToExcalidrawElements` with proper font loading and text measurement
4. Elements appear in real-time on every connected browser

## Quick Start

```bash
git clone https://github.com/alexknowshtml/drawbridge.git
cd drawbridge
npm install
npm run build
npm start           # Starts API server on :3062, WebSocket on :3061
npx serve dist      # Serve the frontend on :3000 (or any static file server)
```

Open `http://localhost:3000/#my-session` in a browser, then push elements:

```bash
curl -X POST http://localhost:3062/api/session/my-session/elements \
  -H "Content-Type: application/json" \
  -d '{
    "elements": [
      { "type": "rectangle", "id": "b1", "x": 100, "y": 100, "width": 200, "height": 80,
        "roundness": { "type": 3 }, "backgroundColor": "#a5d8ff", "fillStyle": "solid",
        "label": { "text": "Hello World", "fontSize": 20 } }
    ]
  }'
```

## Configuration

| Environment Variable | Default | Description |
|---|---|---|
| `DRAWBRIDGE_PORT` | `3062` | HTTP + WebSocket port |
| `DRAWBRIDGE_DATA_DIR` | `./data` | Directory for persistent session data |
| `DO_SPACES_ACCESS_KEY` | — | DigitalOcean Spaces access key (enables image storage) |
| `DO_SPACES_SECRET_KEY` | — | DigitalOcean Spaces secret key |
| `DO_SPACES_BUCKET` | — | Spaces bucket name |
| `DO_SPACES_REGION` | `nyc3` | Spaces region |

HTTP API and WebSocket run on the same port. The frontend auto-detects: on HTTPS (production), it connects to the same origin; on HTTP (local dev via Vite), it connects to port 3062.

When the `DO_SPACES_*` variables are set, images dropped onto the canvas are uploaded to DO Spaces and persist across page refreshes. Without them, the server runs fine but images are ephemeral (lost on reload).

### Container Deployment

```bash
podman-compose up -d   # Builds and starts on port 5050
```

Or with systemd for auto-restart on boot:

```bash
systemctl --user enable drawbridge.service
systemctl --user start drawbridge.service
```

## API Reference

### Sessions

Sessions are created automatically when you first push elements to a session ID. Session IDs come from the URL hash: `http://host/#session-name`.

#### `POST /api/session/:id/elements`

Replace all elements in a session.

```bash
curl -X POST http://localhost:3062/api/session/demo/elements \
  -H "Content-Type: application/json" \
  -d '{"elements": [...]}'
```

#### `POST /api/session/:id/append`

Add elements to existing canvas (progressive drawing).

```bash
curl -X POST http://localhost:3062/api/session/demo/append \
  -H "Content-Type: application/json" \
  -d '{"elements": [...]}'
```

#### `POST /api/session/:id/clear`

Clear all elements and delete persisted data for a session.

#### `POST /api/session/:id/undo`

Undo the last operation. Replays the append-only log minus the last entry.

```bash
curl -X POST http://localhost:3062/api/session/demo/undo
```

#### `POST /api/session/:id/viewport`

Set the camera position and zoom level.

```bash
curl -X POST http://localhost:3062/api/session/demo/viewport \
  -H "Content-Type: application/json" \
  -d '{"x": 0, "y": 0, "width": 800, "height": 600}'
```

#### `GET /api/session/:id`

Get current session state (elements, appState, viewport).

#### `POST /api/session/:id/files`

Upload an image file to DO Spaces (requires Spaces credentials).

```bash
curl -X POST http://localhost:3062/api/session/demo/files \
  -H "Content-Type: application/json" \
  -d '{"fileId": "abc123", "dataURL": "data:image/png;base64,...", "mimeType": "image/png"}'
```

#### `GET /api/session/:id/files`

Get file metadata for a session (CDN URLs, mime types).

#### `GET /api/session/:id/files/:fileId`

Proxy download of a stored image. Serves the file from DO Spaces through the server to avoid CORS issues.

#### `GET /api/sessions`

List all active sessions with element and client counts.

#### `GET /health`

Health check returning session and client counts.

### WebSocket

Connect to `ws://host:3061/ws/:sessionId` for real-time updates. Messages are JSON:

- **Server → Client**: `{ type: "elements", elements: [...] }` — full element replacement
- **Server → Client**: `{ type: "append", elements: [...] }` — new elements added
- **Server → Client**: `{ type: "viewport", viewport: { x, y, width, height } }` — camera update
- **Server → Client**: `{ type: "files-meta", files: {...} }` — file metadata on connect (CDN URLs for stored images)
- **Server → Client**: `{ type: "file-added", file: {...} }` — new image uploaded by another client
- **Server → Client**: `{ type: "clear" }` — canvas cleared
- **Client → Server**: `{ type: "update", elements: [...] }` — user edited the canvas

## Element Format

Drawbridge uses a simplified "skeleton" format. You only specify what matters — `convertToExcalidrawElements` fills in all required internal properties (groupIds, frameId, seeds, versions, etc.).

### Required Fields (all elements)

`type`, `id` (unique string), `x`, `y`

### Defaults (skip these)

`strokeColor="#1e1e1e"`, `backgroundColor="transparent"`, `fillStyle="solid"`, `strokeWidth=2`, `roughness=1`, `opacity=100`

### Labeled Shapes

Add `label` to any shape for auto-centered text. No separate text elements needed:

```json
{
  "type": "rectangle", "id": "r1", "x": 100, "y": 100, "width": 200, "height": 80,
  "roundness": { "type": 3 },
  "backgroundColor": "#a5d8ff", "fillStyle": "solid",
  "label": { "text": "API Server", "fontSize": 20 }
}
```

Works on `rectangle`, `ellipse`, and `diamond`. Text auto-centers and container auto-resizes to fit.

### Multi-line Labels

Use `\n` for line breaks. The container auto-sizes:

```json
{
  "type": "rectangle", "id": "task1", "x": 50, "y": 50, "width": 200, "height": 90,
  "roundness": { "type": 3 },
  "backgroundColor": "#ffc9c9", "fillStyle": "solid",
  "label": { "text": "Fix login bug\nP0 - Critical\n3 users affected", "fontSize": 16 }
}
```

### Standalone Text

For titles and annotations (not inside a shape):

```json
{
  "type": "text", "id": "t1", "x": 150, "y": 50,
  "text": "System Architecture", "fontSize": 28
}
```

### Arrows

```json
{
  "type": "arrow", "id": "a1", "x": 300, "y": 150, "width": 200, "height": 0,
  "points": [[0,0],[200,0]], "endArrowhead": "arrow"
}
```

- `points`: `[dx, dy]` offsets from element x,y
- `endArrowhead`: `null` | `"arrow"` | `"bar"` | `"dot"` | `"triangle"`

### Arrow Labels

Text centered along an arrow:

```json
{
  "type": "arrow", "id": "a1", "x": 300, "y": 150, "width": 200, "height": 0,
  "points": [[0,0],[200,0]], "endArrowhead": "arrow",
  "label": { "text": "API call", "fontSize": 16 }
}
```

### Arrow Bindings

Bind arrows to shapes so they stay connected when shapes are moved:

```json
{
  "type": "arrow", "id": "a1", "x": 300, "y": 150, "width": 200, "height": 0,
  "points": [[0,0],[200,0]], "endArrowhead": "arrow",
  "start": { "id": "box1" },
  "end": { "id": "box2" }
}
```

**Important:** Use `start`/`end` (skeleton format), not `startBinding`/`endBinding` (internal format). The converter resolves bindings automatically.

### Camera Control

Include a `cameraUpdate` pseudo-element to auto-frame the view:

```json
{ "type": "cameraUpdate", "x": 0, "y": 0, "width": 800, "height": 600 }
```

This gets stripped from elements and forwarded as a viewport command. The browser zooms and scrolls to fit the specified rectangle.

### Background Zones

Group related elements with semi-transparent rectangles:

```json
{
  "type": "rectangle", "id": "zone1", "x": 80, "y": 80, "width": 540, "height": 400,
  "backgroundColor": "#d3f9d8", "fillStyle": "solid", "roundness": { "type": 3 },
  "strokeColor": "#22c55e", "strokeWidth": 1, "opacity": 35
}
```

Place zones first in the elements array (z-order: first = back).

## Color Palette

### Fills (pastel, for shape backgrounds)

| Color | Hex | Use |
|-------|-----|-----|
| Light Blue | `#a5d8ff` | Input, sources, primary |
| Light Green | `#b2f2bb` | Success, output, completed |
| Light Orange | `#ffd8a8` | Warning, pending, external |
| Light Purple | `#d0bfff` | Processing, middleware |
| Light Red | `#ffc9c9` | Error, critical, alerts |
| Light Yellow | `#fff3bf` | Notes, decisions, planning |
| Light Teal | `#c3fae8` | Storage, data, memory |

### Strokes (for shape borders and text)

| Color | Hex | Use |
|-------|-----|-----|
| Blue | `#1971c2` | Primary |
| Green | `#2f9e44` | Success |
| Purple | `#6741d9` | Accent |
| Orange | `#e8590c` | Warning |
| Red | `#e03131` | Error |
| Teal | `#0c8599` | Data |
| Gray | `#868e96` | Neutral/Complete |

### Background Zones (use with `opacity: 30-35`)

| Color | Hex | Use |
|-------|-----|-----|
| Blue zone | `#dbe4ff` | UI / frontend layer |
| Purple zone | `#e5dbff` | Logic / agent layer |
| Green zone | `#d3f9d8` | Data / tool layer |

## Sizing Rules

### Font Sizes

- **Minimum 16** for body text, labels, descriptions
- **Minimum 20** for titles and headings
- **Minimum 14** for secondary annotations only (sparingly)
- **Never** use fontSize below 14

### Element Sizes

- **Minimum 120x60** for labeled rectangles/ellipses
- **20-30px gaps** between elements minimum

## Drawing Order

Array order = z-order (first element = back, last = front).

For progressive drawing (streaming to the viewer), emit elements in this order:

```
background zone -> shape -> its arrows -> next shape -> its arrows -> ...
```

This creates a natural "building up" animation as each element appears with a pencil sound effect.

## Complete Examples

### Two Connected Boxes

```json
[
  { "type": "rectangle", "id": "b1", "x": 100, "y": 100, "width": 200, "height": 100,
    "roundness": { "type": 3 }, "backgroundColor": "#a5d8ff", "fillStyle": "solid",
    "label": { "text": "Start", "fontSize": 20 } },
  { "type": "arrow", "id": "a1", "x": 300, "y": 150, "width": 150, "height": 0,
    "points": [[0,0],[150,0]], "endArrowhead": "arrow",
    "start": { "id": "b1" },
    "end": { "id": "b2" } },
  { "type": "rectangle", "id": "b2", "x": 450, "y": 100, "width": 200, "height": 100,
    "roundness": { "type": 3 }, "backgroundColor": "#b2f2bb", "fillStyle": "solid",
    "label": { "text": "End", "fontSize": 20 } }
]
```

### Three-Tier Architecture with Zones

```json
[
  { "type": "text", "id": "title", "x": 200, "y": 10, "text": "System Architecture", "fontSize": 28 },

  { "type": "rectangle", "id": "zone-fe", "x": 80, "y": 60, "width": 300, "height": 200,
    "backgroundColor": "#dbe4ff", "fillStyle": "solid", "roundness": { "type": 3 },
    "strokeColor": "#4a9eed", "strokeWidth": 1, "opacity": 35 },
  { "type": "text", "id": "zone-fe-label", "x": 100, "y": 66, "text": "Frontend",
    "fontSize": 16, "strokeColor": "#1971c2" },

  { "type": "rectangle", "id": "app", "x": 120, "y": 100, "width": 200, "height": 80,
    "roundness": { "type": 3 }, "backgroundColor": "#a5d8ff", "fillStyle": "solid",
    "label": { "text": "React App", "fontSize": 20 } },

  { "type": "arrow", "id": "a1", "x": 320, "y": 140, "width": 150, "height": 0,
    "points": [[0,0],[150,0]], "endArrowhead": "arrow",
    "start": { "id": "app" }, "end": { "id": "api" },
    "label": { "text": "REST API", "fontSize": 14 } },

  { "type": "rectangle", "id": "api", "x": 470, "y": 100, "width": 200, "height": 80,
    "roundness": { "type": 3 }, "backgroundColor": "#d0bfff", "fillStyle": "solid",
    "label": { "text": "API Server", "fontSize": 20 } }
]
```

## Rendering to PNG/SVG

Export diagrams to static images using the included Playwright-based renderer:

```bash
# Install Playwright browsers (first time only)
npx playwright install chromium

# Render from a .excalidraw file
npm run render -- input.excalidraw output.png
npm run render -- input.excalidraw output.svg

# Render from a live session
curl -s http://localhost:3062/api/session/my-session | \
  python3 -c "
import json, sys
d = json.load(sys.stdin)
json.dump({
  'type': 'excalidraw', 'version': 2,
  'source': 'https://excalidraw.com',
  'elements': d['elements'],
  'appState': {'viewBackgroundColor': '#ffffff', 'gridSize': None},
  'files': {}
}, open('/tmp/diagram.excalidraw', 'w'))
"
npm run render -- /tmp/diagram.excalidraw /tmp/diagram.png
```

The renderer handles both skeleton elements (with `label`, `start`/`end`) and fully-resolved Excalidraw elements. Uses headless Chromium with Excalidraw 0.18 for faithful hand-drawn style output. Takes about 5-8 seconds.

## Persistence

Sessions are persisted to disk automatically using an **append-only log + snapshot** strategy:

- Every mutation (set, append, update, clear) is appended as a single JSON line to `data/{session}.log`
- After every 20 operations, a full snapshot is written to `data/{session}.snapshot.json` and the log is truncated
- On server restart, sessions are restored from the latest snapshot + replayed log entries
- Snapshots use atomic write (write to `.tmp`, then rename) to prevent corruption
- The browser also caches elements in `localStorage` for instant display while reconnecting

**Image storage** — When DO Spaces credentials are configured, images dropped onto the canvas are uploaded to `files/{sessionId}/{fileId}.{ext}` in the Spaces bucket. File metadata (CDN URLs, mime types) is stored locally in `data/{session}.files.json`. On page reload, the browser fetches images through a same-origin proxy endpoint to avoid CORS issues with DO Spaces.

**Undo** works by removing the last log entry and rebuilding state from the snapshot + remaining entries. Call `POST /api/session/:id/undo`.

**Clear** deletes all persisted files for that session.

## Frontend Features

- **Font preloading** — Excalifont and Assistant fonts are loaded before any text measurement, ensuring labels render correctly inside shapes
- **Smart element detection** — Automatically detects skeleton vs already-resolved elements and only runs conversion when needed
- **Pencil sounds** — Short sine wave chirps play when elements appear (different frequencies per element type). Requires a user click to activate (browser AudioContext policy)
- **Camera control** — `cameraUpdate` pseudo-elements auto-frame the viewport on the diagram
- **WebSocket reconnection** — Automatically reconnects after 5 seconds if the connection drops
- **localStorage caching** — Elements are cached per session for instant display on page reload
- **Image persistence** — Images dropped onto the canvas are uploaded to DO Spaces and reloaded on refresh via a same-origin proxy

## Architecture

```
drawbridge/
  server.js         # Express + WebSocket server
  lib/
    spaces-client.js  # DO Spaces upload client
  data/             # Persisted session data (auto-created)
  src/
    App.tsx         # React frontend with Excalidraw component
    main.tsx        # React entry point
  scripts/
    render.ts       # Playwright-based PNG/SVG renderer
    generate-env.sh # Generate .env from credential store
  skills/
    SKILL.md        # Claude Code skill (copy to .claude/skills/drawbridge/)
  index.html        # Frontend shell
  vite.config.ts    # Vite build configuration
```

## Credits

Inspired by [antonpk1/excalidraw-mcp-app](https://github.com/antonpk1/excalidraw-mcp-app). Drawbridge extracts the core patterns (label property, font preloading, `convertToExcalidrawElements`) and rebuilds them as a standalone HTTP/WebSocket server, making it usable from any AI agent, script, or tool — not just MCP.

## License

MIT
