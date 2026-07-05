---
repo: jacobparis/trackcn
url: 'https://github.com/jacobparis/trackcn'
homepage: 'https://github.com/jacobparis/trackcn#readme'
starredAt: '2026-07-02T16:53:27Z'
createdAt: '2026-07-02T01:19:36Z'
updatedAt: '2026-07-03T05:55:25Z'
language: JavaScript
license: MIT
branch: main
stars: 18
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-07-05T01:53:39.837Z'
description: >-
  Track GitHub files, directories, commits, pull requests, and agent skills like
  dependencies.
tags: []
---

# trackcn

Clone individual files and directories from various GitHub repositories into your codebase, and pull upstream changes at any time.

```bash
npx trackcn add anthropics/skills/tree/main/skills ./.claude/skills
```

That's Anthropic's skill library — updated weekly, and meant to be edited. Tune `frontend-design` to your design system; when upstream improves it, `trackcn pull` applies the upstream *diff* over your version, and collisions become merge markers your agent resolves.

## Use-cases

### Agent skills

Install a skill library once, modify the skills to fit your project, and keep pulling upstream improvements without losing your edits:

```bash
trackcn add mattpocock/skills/tree/main/skills ./.agents/skills
```

Use trackcn when you intend to **edit the skills you install** — a `design.md` you tune to your product, project best practices you extend — and still want upstream updates. 

Many skills are essentially just documentation and shouldn't be edited by hand. If you're not going to modify it yourself, then you may prefer the skills.sh CLI which offers symlinking for you.

### Design tokens

Keep your project in sync with an upstream design system. Your designer can maintain one repository as the central source of tokens, such as a globals.css file from tweakcn.com.

All of your other projects can track it and pull in changes as the tokens update.

```
trackcn add vercel/ai-chatbot/blob/main/app/globals.css ./app/globals.css
```

### UI components

Pull components from GitHub, customize them heavily, and subscribe to changes when they update upstream.

`shadcn` now has a GitHub Registries feature, which are a `registry.json` file in the root of the repo that describes where to find its components. `trackcn` has native support for these, and if you want to feature certain files, folders, or bundles to use with `trackcn`, you should use the exact same format.

`trackcn` also supports GitHub Registries from private repositories, which the `shadcn` CLI currently does not

```
# List what a repository offers (reads its root registry.json)
trackcn add jacobparis/trackcn

# Install and track a curated item
trackcn add jacobparis/trackcn/trackcn-skill
```

The official shadcn components don't actually update very often, so trackcn's update feature isn't a big win again the main registry. Instead, add components from another codebase directly. 

```
trackcn add vercel/eve/tree/main/apps/templates/web-chat-next/components ./components
```

Live codebases work the best since they're maintained constantly. Alternatively, make a design template using https://ui.shadcn.com/create and treat that as your source of truth 

#### trackcn vs shadcn 

The `shadcn` CLI contains a powerful registry system, with explicit support for import aliasing, design tokens, Tailwind config, and dependency installation. It's designed to guide you down the happy path and does a great job.

But when Tailwind 4 came out, shadcn users had to remain on Tailwind 3 until shadcn built in explicit support, updating the tooling to handle the new config and design tokens.

This tool has the opposite philosophy: `trackcn add` will let you install ANYTHING, even with imports that reference non-existent files from upstream, because your agent can fix these after installation. It's your own responsibility to modify the code to work with your codebase.

### Templates

You can track both individual files and directories

```bash
trackcn add owner/repo/tree/main/README.txt ./dest # this is a file
trackcn add owner/repo/tree/main/components ./dest # this is a directory
trackcn add owner/repo/tree/main/README.txt/ ./dest # this is a directory also 
```

Templates are just big directories. Add a whole template repo to the root of your project and pull in updates even as you build out your product. 

```
trackcn add vercel/eve/tree/main/apps/templates/web-chat-next ./
```

## How do updates work 

When you add code with trackcn, it's saved in a `trackcn.json` file with its current path in your project, with its source path in the upstream repo, and the upstream commit SHA.

When you run `trackcn pull` it checks your local version against the upstream version at the specified commit.
- If they're identical, you just get the latest version.
- If they're not identical (because you made local changes) then we compute the diff range between the upstream file at your SHA and its latest version, which contains all future work done to that file that you don't have. 

`trackcn` applies that diff over your local file with merge markers similar to what you'd get with a git merge conflict.

AI models are very good at resolving these, and will take the spirit of the upstream changes and apply them thematically to your code. 

You can ask your coding agent to run `trackcn pull` and it should be smart enough to figure it out end-to-end. There is no actual AI functionality in `trackcn` itself, it just combines the code with diffs in the right place to let your agent know what it needs to do.

### Commits, commit ranges, and pull requests

The above update feature is really just a specific case of applying the diff from a commit range to your codebase. You are free to do this directly

Take a bug fix commit from one repository and apply to yours. Steal a whole feature by applying someone's PR to your project. 

```bash
trackcn add owner/repo/commit/abc1234              # one commit's changes
trackcn add owner/repo/compare/v1.0...v2.0         # everything between two revisions
trackcn add owner/repo/pull/42                     # a PR's changes; pull picks up new commits
```

If you `trackcn pull`, commits will do nothing since they're immutable. Pull Requests will update to the branch head though, so you can use this on work-in-progress branches.

### Gists

One way to package code for distribution via trackcn is via GitHub Gist. This will install every file in a gist at once.

```
trackcn add https://gist.github.com/jacobparis/447756a5b23554960db21c3f44825825
```

Gist doesn't support a directory structure, and you can't use `/` in the filename. They do support backslashes though, and so trackcn will correctly install a file name `app\components\button.tsx` to the `app/components` directory 

Files with the .diff or .patch extension will be applied as diffs in the same way that commits and component updates are, resulting in diff merge markers on the target file. 

Use this to ship a config change such as `package.json.patch`
```patch
diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@ -1,3 +1,6 @@
 {
-  "name": "test"
+  "name": "test",
+  "dependencies": {
+    "zod": "^3.0.0"
+  }
 }
 ```

### Registry bundles

Repositories that publish a root [shadcn GitHub registry](https://ui.shadcn.com/docs/registry/github) `registry.json` expose curated installable items — configs, rules, docs, workflows:

```bash
trackcn add acme/toolkit                    # list a repository's install options
trackcn add acme/toolkit/project-conventions
trackcn add acme/toolkit/project-conventions#v1.0.0
```

### Post-pull hooks

Run a command whenever a source's files change on pull — pull SVG icons and regenerate your sprite sheet automatically:

```bash
trackcn add lucide-icons/lucide/tree/main/icons ./icons --post-pull "pnpm build:icons"
```

### Line ranges

Track only the lines you need from a source file:

```bash
trackcn add owner/repo/blob/main/styles.css#L227-L300 ./styles/prose.css
```

**Preview:** ranges re-slice on pull but are positional — they can't follow content that moves upstream. Use with caution


## How it works

Everything you install is recorded in `trackcn.json` — committed to your repo, so every collaborator and CI run gets the same content:

- Each tracked file and directory is marked with the upstream commit SHA it came from, plus a content hash of what was written.
- `trackcn pull` computes the upstream diff from the point you diverged to the latest upstream, then applies that diff over your code — not the upstream contents.
- Where the diff collides with your local edits, trackcn prepends a merge-marker block containing the upstream diff:

```
<<<<<<< trackcn
@@ -1,3 +1,7 @@
 export function greet(name: string): string {
   return `Hello, ${name}!`;
 }
+
+export function farewell(name: string): string {
+  return `Goodbye, ${name}!`;
+}
>>>>>>> trackcn
export function greet(name: string): string {
  return `Hello, ${name}! Welcome to the app.`;
}
```

The file is intentionally invalid until resolved — but this isn't the kind of conflict you solve by hand anymore. The block is the pure upstream diff and the code below it is yours, so tell your agent to run `trackcn pull` and reconcile: it applies the upstream change to your version and removes the markers.

If a file on disk still matches what trackcn last wrote, upstream changes apply cleanly and silently. If you modified it, it's protected — markers, never overwrites. `--force` overrides, `--dry-run` previews. See [SPEC.md](SPEC.md) for the full merge semantics.

## For agents

trackcn currently ships a version-matched usage guide with the CLI. Install it as a skill so your agent knows the workflow before it ever runs a command:

```bash
trackcn add jacobparis/trackcn/trackcn-skill
```

All commands accept `--json` for structured output.

## Commands

```
trackcn add <url...> [directory]     Install files from GitHub sources
trackcn pull [--dry-run] [--force]   Update installed files from their sources
trackcn status [--json]              Check if files are up to date
trackcn remove <url> [--hard]        Untrack a source (--hard deletes files)
trackcn auth [login|status|logout]   Manage GitHub login
```

Shorthands like `owner/repo/tree/ref/path` and full `https://github.com/...` URLs are interchangeable.

### CI gate

`trackcn status` exits 1 if any source is stale or any tracked file has drifted:

```yaml
- run: npx trackcn status
```

## Authentication

Run `trackcn auth login` for a browser-based GitHub login, or set `GITHUB_TOKEN` (e.g. in CI) — either lifts the API limit from 60 to 5,000 requests/hour. Required in practice for large directories and busy networks. If you hit the limit unauthenticated at an interactive terminal, trackcn starts the login for you.
