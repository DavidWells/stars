---
repo: SamSaffron/op-cache
url: 'https://github.com/SamSaffron/op-cache'
homepage: null
starredAt: '2026-04-22T14:16:12Z'
createdAt: '2026-02-03T04:26:46Z'
updatedAt: '2026-07-02T17:01:26Z'
language: Rust
license: MIT
branch: main
stars: 36
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-07-05T01:53:43.496Z'
description: null
tags: []
---

# op-cache

A fast caching proxy for 1Password CLI `op read` commands.

## Why?

`op read` is slow (~200-500ms) because it needs to communicate with the 1Password desktop app. If you're reading the same secret multiple times (e.g., in scripts), this adds up.

`op-cache` maintains a local daemon that caches secrets in memory, reducing repeated reads to ~1-2ms.

## Installation

```bash
cargo install --path .
```

Or build manually:

```bash
cargo build --release
# Binary at target/release/op-cache
```

## Usage

```bash
# Read a secret (auto-starts daemon if needed)
op-cache read op://vault/item/field

# Check daemon status
op-cache status

# View cache statistics
op-cache stats

# Clear the cache
op-cache clear

# Stop the daemon
op-cache stop
```

### Running Commands with Secrets

`op-cache run` scans your environment for variables with `op://` values, resolves them all concurrently through the cache, then replaces the current process with your command (via `exec`). If any resolution fails, the command is aborted.

```bash
# Run a command with secrets in env vars
export DATABASE_URL="op://Private/DB/url"
export API_KEY="op://Private/API/token"
op-cache run -- ./my-app

# Works with any command
op-cache run -- env | grep SECRET
op-cache run -- docker compose up
```

### Example

```bash
$ op-cache read op://Private/API/token
sk-abc123...

$ op-cache stats
Cache Statistics:
  Entries: 1
  Hits:    0
  Misses:  1
  Hit Rate: 0.0%

$ op-cache read op://Private/API/token  # Cache hit - fast!
sk-abc123...

$ op-cache stats
Cache Statistics:
  Entries: 1
  Hits:    1
  Misses:  1
  Hit Rate: 50.0%
```

## How It Works

```
┌─────────────┐                      ┌─────────────┐
│  op-cache   │◄── Unix Socket ────►│   Daemon    │
│  (client)   │   /tmp/op-cache.sock │  (cache)    │
└──────┬──────┘                      └─────────────┘
       │
       │ cache miss
       ▼
┌─────────────┐
│   op read   │
└─────────────┘
```

1. Client checks daemon cache for the secret
2. On cache hit: return immediately (~1-2ms)
3. On cache miss: client runs `op read`, stores result in cache, returns value
4. Daemon is auto-started on first use

The client (not the daemon) executes `op read`. This ensures proper access to your desktop session and 1Password app integration.

## Configuration

Config file: `~/.config/op-cache/config.yaml`

```yaml
socket_path: /tmp/op-cache.sock
ttl_seconds: 86400      # Cache TTL (default: 24 hours)
max_entries: 1000       # Max cached secrets
op_path: op             # Path to op CLI
op_timeout_seconds: 30  # Timeout for op commands
```

All settings are optional - sensible defaults are used.

## Performance

| Operation | Latency |
|-----------|---------|
| Cache hit | ~1-2ms |
| Cache miss | ~200-500ms (op read time) |
| Cold start | ~50ms (daemon spawn) |

## Security Notes

- Secrets are cached in memory only (never written to disk)
- Cache is per-user (Unix socket permissions)
- TTL ensures secrets expire (default 24 hours)
- `op-cache clear` immediately purges all cached secrets
- Daemon stops cleanly on `op-cache stop` or system shutdown

## License

MIT
