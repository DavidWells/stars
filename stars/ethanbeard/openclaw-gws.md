---
repo: ethanbeard/openclaw-gws
url: 'https://github.com/ethanbeard/openclaw-gws'
homepage: null
starredAt: '2026-04-12T02:38:00Z'
createdAt: '2026-04-10T19:42:06Z'
updatedAt: '2026-04-13T15:21:09Z'
language: TypeScript
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-04-18T22:36:31.079Z'
description: Gmail watcher for OpenClaw agents via Google Workspace CLI (gws)
tags: []
---

# openclaw-gws

Gmail watcher for [OpenClaw](https://openclaw.ai) agents. Uses the [Google Workspace CLI](https://github.com/googleworkspace/cli) (`gws`) to stream new emails to your agent in real-time.

Zero tokens burned between emails. Agent only wakes when something arrives.

## Prerequisites

### 1. Install gws and gcloud

Install `gws`:

```bash
npm install -g @googleworkspace/cli
```

Install the [gcloud CLI](https://cloud.google.com/sdk/docs/install) and make sure `gcloud` is available in your PATH.

`gws` is the CLI the plugin runs at runtime. `gcloud` is a setup dependency for the initial Google Cloud configuration.

After installing both, open a new terminal or run `source ~/.zshrc` so they are in your PATH.

### 2. Set up OAuth

```bash
gws auth setup
```

This creates a GCP project and OAuth client. You need to add your Gmail address as a test user in the [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent) (required while the app is unverified):

1. Go to your GCP project's OAuth consent screen
2. Under **Test users**, click **Add users**
3. Add your Gmail address
4. Save

### 3. Authenticate with file-based storage

The plugin runs `gws` as a background subprocess of the OpenClaw gateway. The OS keyring requires user interaction, which isn't available in that context. You must use file-based credential storage:

```bash
GOOGLE_WORKSPACE_CLI_KEYRING_BACKEND=file gws auth login
```

This opens a browser for Google OAuth. After authorizing, credentials are saved to `~/.config/gws/credentials.enc`. The plugin automatically sets this env var when spawning `gws`, so you only need to do this once.

### 4. Enable the Gmail API

```bash
gcloud services enable gmail.googleapis.com --project YOUR_PROJECT_ID
```

`gws auth setup` prints your project ID. You can also find it with `gcloud config get project`.

## Install

Current OpenClaw releases block plugins that use `child_process` unless you explicitly allow the install. This plugin shells out to the local `gws` and `openclaw` CLIs, so use:

```bash
openclaw plugins install --dangerously-force-unsafe-install openclaw-gws
```

For local testing from a tarball:

```bash
openclaw plugins install --dangerously-force-unsafe-install ~/openclaw-gws-0.1.1.tgz
```

Reinstalling the plugin does not preserve its config entry. If you uninstall and reinstall, set `plugins.entries.openclaw-gws.config.project` again before expecting the watcher to start.

## Configure

```bash
openclaw config set plugins.entries.openclaw-gws.config.project YOUR_PROJECT_ID
```

Or set the environment variable `GOOGLE_WORKSPACE_PROJECT_ID`.

Restart or reload the gateway after configuring. If the plugin is already running, changes to `project`, `agentId`, or batching settings are picked up on the next plugin start.

Optional settings:

```bash
openclaw config set plugins.entries.openclaw-gws.config.agentId main
openclaw config set plugins.entries.openclaw-gws.config.debounceSeconds 30
openclaw config set plugins.entries.openclaw-gws.config.maxBatchSize 10
```

Use `agentId` if you want email deliveries routed to a specific OpenClaw agent instead of the default `main`.

For multi-agent setups, set `agentId` explicitly so emails go to the intended agent.

## How it works

The plugin spawns `gws gmail +watch` as a background process. When a new email arrives in your Gmail inbox, `gws` streams it as NDJSON via Google Pub/Sub. The plugin parses the event, extracts From/Subject/snippet, batches emails within a 30-second window, and delivers them to your agent via `openclaw agent --deliver`.

If the `gws` process exits (network issue, auth expired), the plugin automatically restarts it with exponential backoff (1s, 2s, 4s, up to 60s).

The plugin also ships a `gws` skill and `/gws` chat commands for watcher management. It does not expose first-class model tools.

## Chat Commands

After install, you can control the watcher from chat with:

- `/gws status`
- `/gws pause`
- `/gws resume`

## Troubleshooting

**I installed the plugin, but nothing happens:**
Make sure you set `plugins.entries.openclaw-gws.config.project` and restarted the gateway. A fresh install does not infer your Google Cloud project automatically.

**"No credentials found" errors in gateway log:**
Re-run auth with file-based storage: `GOOGLE_WORKSPACE_CLI_KEYRING_BACKEND=file gws auth login`

**"Access blocked: app has not completed Google verification":**
Add your Gmail address as a test user in the OAuth consent screen (see Prerequisites step 2).

**gws not found when gateway starts:**
Make sure `gws` is in your PATH. The gateway inherits the PATH from whatever process starts it (e.g. the OpenClaw Mac app).

**Plugin installs are blocked as unsafe:**
Current OpenClaw releases may block this plugin at install time because it uses `child_process` to run the local `gws` and `openclaw` CLIs. Install with `--dangerously-force-unsafe-install`.

**How do I pause or resume the watcher?**
Use `/gws pause` or `/gws resume` in chat. You can also set `plugins.entries.openclaw-gws.config.paused` manually, then restart or reload the gateway.

## Development

```bash
npm install
npm run typecheck
```

This validates the TypeScript sources and local SDK type stubs before publishing changes.

## License

MIT
