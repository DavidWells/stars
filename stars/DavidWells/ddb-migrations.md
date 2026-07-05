---
repo: DavidWells/ddb-migrations
url: 'https://github.com/DavidWells/ddb-migrations'
homepage: ''
starredAt: '2026-06-01T03:03:31Z'
createdAt: '2026-05-04T20:19:21Z'
updatedAt: '2026-06-02T07:27:18Z'
language: TypeScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-07-05T01:53:40.974Z'
description: DDB data migration utilities
tags: []
---

# ddb-migration-tools

Stage-aware DynamoDB migrations for TypeScript projects.

A small, modern alternative to [`dynamo-data-migrations`](https://github.com/technogise/dynamo-data-migrations):

- AWS SDK v3 (the v2-based original is on an EOL SDK)
- Stage-based config (`dev` / `staging` / `prod`) instead of AWS credential profiles
- Shared account/region ledger table with app/stage-scoped rows
- SHA-256 drift detection on every applied migration
- Resumable migrations via a `checkpoint()` helper on the ledger row
- TypeScript-native: writes `.ts` migration files and runs them via `tsx`'s ESM loader, no compile step

## Install

```bash
npm install --save-dev ddb-migration-tools
```

## Agent skill

Install the companion agent skill for Claude Code, Codex, Cursor, and other Agent Skills-compatible tools:

```bash
npx skills add DavidWells/ddb-migrations
```

## Quick start

```bash
npx ddb-migrate init
# edit ddb-migrations.config.json
npx ddb-migrate create "add schema version to users"
npx ddb-migrate up     --stage dev
npx ddb-migrate status --stage dev
```

## Config

`ddb-migrations.config.json` (also accepts `.js`, `.mjs`, `.ts`):

```json
{
  "appName": "my-app",
  "migrationsDir": "migrations",
  "ledger": {
    "tableName": "ddb-migrations-ledger"
  },
  "stages": {
    "dev": {
      "region": "us-east-1",
      "tablePrefix": "my-app-dev-"
    },
    "staging": {
      "region": "us-east-1",
      "tablePrefix": "my-app-staging-"
    },
    "prod": {
      "region": "us-east-1",
      "tablePrefix": "my-app-prod-"
    }
  }
}
```

| Field | Description |
| --- | --- |
| `appName` | Default app/scope namespace for ledger rows. |
| `migrationsDir` | Directory holding migration files. Sorted alphabetically. |
| `ledger.tableName` | Shared migration ledger table. Defaults to `ddb-migrations-ledger`. Deploy one per AWS account/region. |
| `ledger.scope` | Optional namespace for ledger rows. Defaults to `appName`. |
| `ledger.region` | Region the ledger table lives in. Defaults to the active stage's `region`. Set this to centralize the ledger when app tables span regions. |
| `ledger.endpoint` | AWS endpoint override for the ledger client only (e.g. for a local ledger). |
| `stages.<name>.region` | AWS region for this stage's app tables. **Required.** |
| `stages.<name>.accountId` | Optional AWS account ID for audit/guardrail use. Not part of the ledger key. |
| `stages.<name>.tablePrefix` | Prepended to logical table names from `ctx.tableName('users')`. |
| `stages.<name>.tables` | Logical → physical table name overrides (wins over `tablePrefix`). |
| `stages.<name>.ledgerTable` | Stage-specific ledger table override. Most projects should prefer `ledger.tableName`. |
| `stages.<name>.ledgerRegion` | Stage-specific ledger region override. Wins over `ledger.region`. |
| `stages.<name>.ledgerEndpoint` | Stage-specific ledger endpoint override. Wins over `ledger.endpoint`. |
| `stages.<name>.endpoint` | AWS endpoint override (for ddb-local / testcontainers). |

Credentials come from the default AWS SDK credential chain: `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` env vars, IAM role, or `~/.aws/credentials`. Set `AWS_PROFILE` if you need a specific shared profile.

## Migration anatomy

For more patterns — idempotent backfills, expand-and-contract renames, parallel scans with checkpoints, GSI adds — see [`examples/`](./examples/).

Migrations may be single files:

```txt
migrations/
  2026-05-04_11-30_backfill_schema_version.ts
```

Or directories with an `index` entrypoint and colocated fixtures/helpers:

```txt
migrations/
  2026-05-04_11-30_backfill_schema_version/
    index.ts
    fixture.json
```

Directory migration checksums include every non-hidden file under the migration directory, so fixture/helper drift is detected after a migration has been applied.

```ts
// migrations/2026-05-04_11-30_backfill_schema_version/index.ts
import { ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import type { MigrationContext } from 'ddb-migration-tools';

export const description = 'Backfill schemaVersion=1 on User items';

export async function up(ctx: MigrationContext): Promise<void> {
  const Users = ctx.tableName('users'); // → 'my-app-dev-users'

  let cursor = (await ctx.getCheckpoint<{ lastKey?: Record<string, unknown> }>())?.lastKey;
  do {
    const page = await ctx.ddb.send(new ScanCommand({
      TableName: Users,
      ExclusiveStartKey: cursor,
      FilterExpression: 'attribute_not_exists(schemaVersion)',
    }));

    for (const item of page.Items ?? []) {
      if (ctx.dryRun) continue;
      await ctx.ddb.send(new UpdateCommand({
        TableName: Users,
        Key: { pk: item.pk, sk: item.sk },
        UpdateExpression: 'SET schemaVersion = :v',
        ConditionExpression: 'attribute_not_exists(schemaVersion)',
        ExpressionAttributeValues: { ':v': 1 },
      }));
    }

    cursor = page.LastEvaluatedKey;
    await ctx.checkpoint({ lastKey: cursor });
  } while (cursor);
}

export async function down(ctx: MigrationContext): Promise<void> {
  // The inverse, or throw if not reversible.
  throw new Error('not reversible');
}
```

### Migration context

| Field | Description |
| --- | --- |
| `ddb` | `DynamoDBDocumentClient` (marshaled). Use for item reads/writes. |
| `ddbRaw` | `DynamoDBClient` (low-level). Use for table-level operations. |
| `tableName(logical)` | Resolves a logical name to its physical name for the active stage. |
| `stage` | The stage name. |
| `dryRun` | `true` when running with `--dry-run`. Migrations should branch on this. |
| `logger` | Prefixed logger; prefer this over `console.log`. |
| `signal` | Aborted when the operator requests shutdown, such as the first Ctrl-C in the CLI. |
| `shouldStop()` | Returns `true` once shutdown has been requested. Check this at page/batch boundaries. |
| `throwIfStopped()` | Throws `MigrationInterruptedError` when shutdown has been requested, leaving the ledger row `in_progress` for a later resume. |
| `sdkStats` | Per-migration DynamoDB app-client `send()` stats. Use `snapshot()` or `reset()` for custom progress/reporting. |
| `checkpoint(value)` | Persist arbitrary JSON state on the ledger row for resume after a crash. |
| `getCheckpoint()` | Read the last checkpoint value. |

## CLI

```
ddb-migrate [-C <project>] current [--json]
ddb-migrate [-C <project>] init
ddb-migrate [-C <project>] create <description>
ddb-migrate [-C <project>] status --stage <name> [--json]
ddb-migrate [-C <project>] plan   --stage <name> [--to <id>] [--json]
ddb-migrate [-C <project>] doctor --stage <name> [--json]
ddb-migrate [-C <project>] up     --stage <name> [--to <id>] [--dry-run] [--force] [--capacity] [--no-sdk-stats] [--json]
ddb-migrate [-C <project>] down   --stage <name> [--shift N] [--dry-run] [--force] [--capacity] [--no-sdk-stats] [--json]
ddb-migrate [-C <project>] checkpoint show  <migrationId> --stage <name> [--json]
ddb-migrate [-C <project>] checkpoint clear <migrationId> --stage <name> --force [--json]
```

Use `-C, --cwd` to run from outside the project directory:

```bash
ddb-migrate -C services/api doctor --stage dev
ddb-migrate -C services/api plan --stage dev
ddb-migrate -C services/api up --stage dev --dry-run
ddb-migrate -C services/api up --stage dev
```

`DDB_MIGRATE_CWD` is also honored when `--cwd` is not set.

### Operator workflow

For a normal stage rollout:

```bash
ddb-migrate -C services/api current
ddb-migrate -C services/api doctor --stage dev
ddb-migrate -C services/api plan --stage dev
ddb-migrate -C services/api up --stage dev --dry-run
ddb-migrate -C services/api up --stage dev
ddb-migrate -C services/api status --stage dev
```

For prod-like stages, non-dry-run `up` requires `--force`:

```bash
ddb-migrate -C services/api up --stage prod --dry-run
ddb-migrate -C services/api up --stage prod --force
```

Rollback is destructive, so non-dry-run `down` always requires `--force`:

```bash
ddb-migrate -C services/api down --stage dev --shift 1 --dry-run
ddb-migrate -C services/api down --stage dev --shift 1 --force
```

`plan` is intentionally different from `up --dry-run`: it does not import or
execute migration code. It only compares migration files with the ledger and
prints what would be selected for execution.

Use `--json` on read-style commands for CI and agents. `up --json` and
`down --json` print the final command result as JSON; progress events are only
rendered in human output mode.

Long-running migrations can call `ctx.progress(...)` to emit structured
progress and `ctx.throwIfStopped()` at page or batch boundaries for cooperative
Ctrl-C handling.

### SDK call stats

Migration app-table clients are wrapped by default so progress output can show DynamoDB SDK activity alongside migration business counters:

```txt
[2026-06-02_cleanup] apply delete 5400/11375 47.5% rem=5975 eta=9m3s
  sdk calls=5693 reads=293 writes=5400 pages=293 items=29187
  written=0 updated=0 deleted=5400 skipped=0
```

These are top-level `ctx.ddb.send()` / `ctx.ddbRaw.send()` calls observed by the wrapper. They are not AWS SDK internal retry attempts and do not include ledger/checkpoint writes.

Use `--no-sdk-stats` to disable SDK stats collection for a CLI run:

```bash
ddb-migrate up --stage dev --no-sdk-stats
```

Use `--capacity` to request `ReturnConsumedCapacity=TOTAL` on supported app-table commands and render total consumed capacity as `cu`:

```bash
ddb-migrate up --stage dev --capacity
```

Projects can set defaults in config:

```json
{
  "observability": {
    "sdkStatsEnabled": true,
    "captureConsumedCapacity": false
  }
}
```

Migration code can also inspect or reset stats directly:

```ts
ctx.progress({ phase: 'apply', sdk: ctx.sdkStats.snapshot() });
ctx.sdkStats.reset();
```

### Status values

| Status | Meaning |
| --- | --- |
| `pending` | File exists, no ledger entry. |
| `completed` | Applied successfully; checksum recorded. |
| `in_progress` | Started but never marked complete (likely interrupted). Rerunning `up` will retry it. |
| `failed` | Last run threw. Rerun after fixing or investigate. |
| `orphan` | Ledger entry whose file has been deleted from disk. |

### Drift detection

Each completed entry stores a SHA-256 of the file content. If the file changes after being applied, `up` refuses to run and reports the drifted id. Restore the original file or roll back before continuing.

### Dry-run semantics

`--dry-run` does two things:

1. Skips ledger writes (`markStart` / `markComplete` / `checkpoint`).
2. Sets `ctx.dryRun = true` so migration code can branch on it.

The framework can't know which calls inside a migration are side-effects, so **migrations are responsible for honoring `ctx.dryRun`**.

## Running TypeScript migrations

The CLI auto-registers `tsx`'s ESM loader before importing `.ts` migration files. As long as `tsx` is installed (it's a runtime dep of this package), `.ts` migrations Just Work — no compile step.

If you'd rather precompile, point `migrationsDir` at a directory of `.mjs` / `.js` files.

## Centralized ledger across regions

By default, the ledger client reuses the stage's region — one ledger per AWS account/region. If your app tables span multiple regions but you want a single shared ledger, set `ledger.region` (or `stages.<name>.ledgerRegion`) to the region where you deployed the ledger table:

```json
{
  "ledger": { "tableName": "ddb-migrations-ledger", "region": "us-east-1" },
  "stages": {
    "prod-us":  { "region": "us-east-1", "tablePrefix": "myapp-prod-us-"  },
    "prod-eu":  { "region": "eu-west-1", "tablePrefix": "myapp-prod-eu-"  }
  }
}
```

Each stage still talks to its own app tables in `stage.region`; only the ledger reads and writes route to `ledger.region`. The `region` attribute on each ledger row continues to record the *app* region the migration ran against, so you can still tell which region the side effects landed in.

## Multi-stage promotion

By default, each AWS account/region has one shared ledger table, while app/stage isolation lives in the item keys:

```txt
pk = SCOPE#<ledger.scope or appName>#STAGE#<stage>
sk = MIGRATION#<migrationId>
```

`accountId` and `region` are stored as item attributes when configured, but are not part of the primary key. The account is implied by the DynamoDB table you are writing to.

Promotion looks like:

```bash
# developer iterating
ddb-migrate up --stage dev

# CI on merge
ddb-migrate up --stage staging

# CI on release (gated)
ddb-migrate up --stage prod
```

Files and migration directories in `migrations/` are sorted lexicographically by id, so the timestamped prefix from `create` makes ordering deterministic across stages. Don't reorder or rename migrations after they've been applied somewhere — drift detection will trip.

## Why not `dynamo-data-migrations`?

| | `dynamo-data-migrations` | `ddb-migration-tools` |
| --- | --- | --- |
| AWS SDK | v2 (EOL) | v3 |
| Multi-env model | AWS profiles | Logical stages with table prefixes |
| Ledger table | One hard-coded name per account | One shared table per account/region, scoped by app/stage keys |
| Drift detection | None | SHA-256 per applied entry |
| Resumable migrations | None | `ctx.checkpoint()` |
| TS migrations | Custom `ts-import` | `tsx` ESM loader |
| Last release | Mar 2024 | active |

The shape (timestamped files, ledger table, `up` / `down` / `status` CLI) is intentionally similar — that part of the design is well-trodden.

## Contributor Utilities

### Preview TTY progress output

Use the render harness to inspect the migration progress display without touching DynamoDB:

```bash
npx tsx tests/render-progress/index.ts
```

The optional arguments are:

```bash
npx tsx tests/render-progress/index.ts <columns> <delayMs> <stepSize> <total>
```

For example, this previews an 88-column terminal with fast frames and a smaller fake delete plan:

```bash
npx tsx tests/render-progress/index.ts 88 80 1000 5000
```

## License

MIT
