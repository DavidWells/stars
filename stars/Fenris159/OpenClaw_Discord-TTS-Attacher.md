---
repo: Fenris159/OpenClaw_Discord-TTS-Attacher
url: 'https://github.com/Fenris159/OpenClaw_Discord-TTS-Attacher'
homepage: null
starredAt: '2026-04-08T02:59:03Z'
createdAt: '2026-04-06T01:13:47Z'
updatedAt: '2026-04-08T02:59:04Z'
language: JavaScript
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-04-18T22:36:31.217Z'
description: >-
  An OpenClaw plugin that turns your assistant’s Discord text replies into a
  spoken MP3 and posts it as a normal file attachment in a follow-up message. 
tags: []
---

# Discord TTS Attacher

An **OpenClaw** plugin that turns your assistant’s **Discord text replies** into a **spoken MP3** and posts it as a **normal file attachment** in a follow-up message. It uses Microsoft’s **Edge neural voices** (via [`node-edge-tts`](https://www.npmjs.com/package/node-edge-tts)).

This is **not** Discord’s built-in “text-to-speech” in the client, and it is separate from OpenClaw’s other audio delivery paths. Listeners get a regular message with an MP3 they can play in Discord or download.

Synthesis runs in a **separate Node child process** (`worker.mjs`) so Edge TTS work stays off the gateway’s main event loop.[^child-process]

## What you need

- OpenClaw running with the **Discord** channel set up
- **Node.js** 18 or newer
- Outbound internet access (synthesis goes through Microsoft’s Edge TTS service)

## Install

Pick **one** way to install the plugin, then complete the shared steps below.

### 1. Install the files

**ClawHub** — from [ClawHub](https://clawhub.ai), using the OpenClaw CLI (package **`discord-tts-attacher`**):

```bash
openclaw plugins install clawhub:discord-tts-attacher
```

OpenClaw places the plugin under your extensions layout; you do not copy folders by hand.

**Manual** — copy the plugin tree so the folder name is exactly **`discord-tts-attacher`**:

`~/.openclaw/extensions/discord-tts-attacher/`

A **release** zip or ClawHub package includes plugin sources, **`package.json`**, **`openclaw.plugin.json`**, **`LICENSE`**, **`CHANGELOG.md`**, and **`README.md`**—it does **not** include a vendored copy of **`node-edge-tts`** inside the archive. Instead, **`package.json` declares `node-edge-tts` under `dependencies`**, so when you run **`npm install`**, npm **downloads and installs** it from the registry into **`node_modules`** (you need network access to npm for that step). **`openclaw`** is an **optional** peer dependency so you usually **do not** install it in the extension folder; the SDK is loaded from the running gateway or **`OPENCLAW_PACKAGE_ROOT`**.

```bash
cd ~/.openclaw/extensions/discord-tts-attacher
rm -rf node_modules
npm install
```

The plugin finds the **`openclaw`** package root from the running gateway (walking upward from the host process’s **`argv[1]`**), from **`OPENCLAW_PACKAGE_ROOT`**, or—if you install **`openclaw`** here—via **`openclaw/package.json`**. It loads **`definePluginEntry`** from **`dist/plugin-sdk/plugin-entry.js`**, and **`sendMessageDiscord`** from **`dist/extensions/discord/runtime-api.js`** on OpenClaw **2026.4+**, or from **`dist/plugin-sdk/discord.js`** on older installs. You do **not** need **`npm install openclaw`** in the extension folder unless you want that fallback.

If you used ClawHub and dependencies look wrong, run the same **`rm -rf node_modules && npm install`** in that plugin directory.

### 2. Enable in `openclaw.json`

- Add **`discord-tts-attacher`** to **`plugins.allow`**.
- Add an entry for **`discord-tts-attacher`** under **`plugins.entries`** (see the example below).

### 3. Restart

Restart the **OpenClaw gateway** so it loads the plugin.

## Example `openclaw.json` snippet

```json
"plugins": {
  "allow": ["discord", "discord-tts-attacher"],
  "entries": {
    "discord": { "enabled": true, "config": {} },
    "discord-tts-attacher": {
      "enabled": true,
      "config": {
        "voice": "en-US-AndrewNeural",
        "outputDir": "~/.openclaw/workspace/TTS",
        "maxTextLength": 3500
      }
    }
  }
}
```

Adjust paths for your machine (absolute paths are fine).

## Configuration

All options go under **`plugins.entries.discord-tts-attacher.config`**. Only the keys below are supported; extra keys may be rejected when OpenClaw loads your config.

### Timeouts

How long synthesis may run and how long the gateway waits for the finished MP3 both **scale with reply length** (longer text gets more time). The options in the table control those limits.


| Option                  | Type             | Default                  | What it does                                                                                                                   |
| ----------------------- | ---------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `enabled`               | boolean          | `true`                   | Turn the plugin on or off.                                                                                                     |
| `voice`                 | string           | `en-US-AndrewNeural`     | Edge **neural** voice name (e.g. `en-US-AriaNeural`).                                                                          |
| `outputDir`             | string           | see below                | Where temporary MP3s, job markers, and `worker.log` are written. Relative paths are resolved by OpenClaw.                      |
| `channelAllowlist`      | array of strings | *(empty = all channels)* | If set, only those **guild channel** IDs (snowflakes) get TTS. Direct messages and other targets are not limited by this list. |
| `maxTextLength`         | integer          | `12000`                  | Skip synthesis if the reply text is longer than this.                                                                          |
| `sendDedupeMs`          | integer          | `4000`                   | Ignore a second synthesis for the same target and text within this many milliseconds; use `0` to disable.                      |
| `debounceMs`            | integer          | `3500`                   | How long to wait after the last chunk of a streamed reply before starting synthesis.                                           |
| `pickupIntervalMs`      | integer          | `2000`                   | How often the gateway polls for worker completion (MP3 + done marker).                                                         |
| `pickupTimeoutMs`       | integer          | `60000`                  | Minimum pickup wait (ms). Actual wait is `max` of this and `synthTimeoutMs + pickupIntervalMs + 2000` (see above).             |
| `synthTimeoutBaseMs`    | integer          | `4000`                   | Base milliseconds in the synthesis timeout estimate.                                                                           |
| `synthTimeoutPerCharMs` | number           | `10`                     | Milliseconds per character added to the synthesis timeout estimate.                                                            |
| `synthTimeoutJitterMs`  | integer          | `5000`                   | Extra buffer (ms) added to the synthesis timeout estimate.                                                                     |
| `synthTimeoutMaxMs`     | integer          | `120000`                 | Upper cap (ms) for the synthesis timeout passed to the worker and `node-edge-tts`.                                             |


**Default `outputDir`:** `$OPENCLAW_STATE_DIR/workspace/TTS`, or `~/.openclaw/workspace/TTS` if that variable is unset.

## Environment variables


| Variable                 | Purpose                                                                                                                                                                                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DISCORD_TTS_OUTPUT_DIR` | Overrides the default output directory when `outputDir` is not set in config.                                                                                                                                                                                                                                                              |
| `OPENCLAW_STATE_DIR`     | Used when building the default TTS directory.                                                                                                                                                                                                                                                                                              |
| `OPENCLAW_PACKAGE_ROOT`  | Absolute path to the **`openclaw` npm package root** (directory whose **`package.json`** has **`"name": "openclaw"`** and which contains **`dist/plugin-sdk/plugin-entry.js`**, with Discord send in **`dist/extensions/discord/runtime-api.js`** or legacy **`dist/plugin-sdk/discord.js`**). Use this if the gateway does not resolve the package via **`argv[1]`** walk and you have not installed the optional **`openclaw`** package inside the extension. |


## Choosing a voice

Voices use Microsoft’s naming pattern, for example `en-US-AndrewNeural` or `en-GB-SoniaNeural`. Search for “Edge TTS voices list” or use tools that ship with `edge-tts` / `node-edge-tts` to list available voices.

## Privacy and files on disk

The plugin writes short-lived synthesis files and logs under **`outputDir`** (MP3s, completion markers, **`worker.log`**). **`worker.log`** is rewritten on each update so it only keeps entries from roughly the **last 24 hours** (older lines are dropped). Do not share that folder publicly if logs could expose sensitive routing details. Do **not** post or share your full **`openclaw.json`** (it can contain tokens and account information).

## Maintainers

If you have the **complete source repository** (not only a minimal plugin package), open the **development guide** next to the plugin sources for release builds, ClawHub publishing, where **`openclaw.plugin.json`** defines the config schema, and the exact timeout math used in code. Use **`npm run release`** and **`npm run check-version`** from the repository root.

[^child-process]: The plugin uses Node’s **`child_process.spawn`** with **`process.execPath`** and a **fixed path** to the bundled **`worker.mjs`**, passing only a **JSON job payload** (text, voice, paths, timeouts). **No shell** is invoked (no `shell: true`, no arbitrary commands). Registries or scanners that flag `child_process` (for example ClawHub) are seeing this intentional worker offload, not generic shell execution.

## License

MIT License
