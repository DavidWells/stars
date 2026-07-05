---
repo: joelhooks/plugged-in-awake
url: 'https://github.com/joelhooks/plugged-in-awake'
homepage: null
starredAt: '2026-05-25T18:46:13Z'
createdAt: '2026-04-30T22:39:54Z'
updatedAt: '2026-05-25T19:08:42Z'
language: Swift
license: NA
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-07-05T01:53:40.911Z'
description: null
tags: []
---

# PluggedInAwake

Native macOS menu bar app that prevents system sleep **only when external power is connected**.

## What it does

- Lives in the menu bar (no Dock icon)
- Registers itself to open at login by default, with an “Open at Login” menu toggle
- Monitors AC vs battery power changes in real time
- Monitors macOS thermal pressure in real time
- Enables a `PreventSystemSleep` power assertion only on AC while thermal pressure is safe
- Releases the assertion immediately when unplugged or when thermal pressure reaches Serious/Critical

## Run (dev)

```bash
cd /Users/joel/Code/joelhooks/plugged-in-awake
./Scripts/compile_and_run.sh
```

## Build `.app`

```bash
cd /Users/joel/Code/joelhooks/plugged-in-awake
./Scripts/package_app.sh release
open PluggedInAwake.app
```

## Notes

- This app uses normal macOS power assertions (`IOPMAssertionTypePreventSystemSleep`).
- Thermal protection uses macOS `ProcessInfo.thermalState`, not raw SMC temperature sensors.
- Lid-closed behavior can still be constrained by Apple hardware/firmware clamshell rules in some setups.
