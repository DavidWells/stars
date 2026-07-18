---
repo: RDarrylR/aws-batch-parquet-telemetry-processor
url: 'https://github.com/RDarrylR/aws-batch-parquet-telemetry-processor'
homepage: null
starredAt: '2026-07-12T15:30:59Z'
createdAt: '2026-04-11T17:51:45Z'
updatedAt: '2026-07-12T15:31:00Z'
language: Python
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-07-18T22:38:18.244Z'
description: >-
  Learn how to use AWS Batch, Spot EC2, and Amazon Bedrock to process large
  Parquet files of industrial telemetry and generate incident reports.
tags: []
---

# AWS Batch + Bedrock for Industrial Telemetry

![Cover](generated-diagrams/cover.png)

A complete, working example of processing large parquet files at scale on **AWS Batch** with **EC2 Spot** (on-demand fallback), followed by **per-file LLM incident reports from Amazon Bedrock**. The example use case is industrial equipment monitoring for an operator with thousands of sites - each parquet file represents one site's high-frequency sensor telemetry (24 channels, float64, nanosecond timestamps), and each container runs real signal processing (rolling-window anomaly detection, FFT spectral analysis via scipy, fault flag decoding) before sending a compact summary to Bedrock for a structured health assessment.

This is the kind of workload that benefits from Batch: bursty, embarrassingly parallel, memory-heavy, and naturally suited to Spot pricing. It's also a pattern that generalizes well beyond industrial telemetry - drop in your own parquet schema and per-file analysis and the rest of the architecture stays the same.

Everything is managed with Terraform (AWS provider `~> 6.0`). Compute sizes, instance types, bucket names, the Bedrock model, and networking are all configurable. A local **React 19 + Vite 7** frontend is included for browsing the incident reports from your laptop.

## Architecture

![Architecture](generated-diagrams/batch-parquet-architecture.png)

### Components

| Component | Purpose |
|-----------|---------|
| **S3 Input Bucket** | Stores site telemetry parquet files and the file manifest JSON |
| **S3 Results Bucket** | Per-file processing results and LLM incident reports |
| **ECR Repository** | Hosts the Python 3.14 processor container image (pyarrow, numpy, scipy, boto3) |
| **AWS Batch Spot CE** | Primary compute - `SPOT_PRICE_CAPACITY_OPTIMIZED` allocation |
| **AWS Batch On-Demand CE** | Fallback compute when spot capacity isn't available |
| **Job Queue** | Routes jobs to spot first, on-demand second |
| **Launch Template** | Custom AMI support, IMDSv2 enforcement, instance/volume naming |
| **VPC** | Private subnets, NAT gateway, S3 gateway endpoint, VPC flow logs |
| **Bedrock Runtime** | LLM-based incident reports via VPC interface endpoint |
| **CloudWatch Logs** | Per-container output and processing summaries |
| **IAM Roles** | Least-privilege: separate roles for ECS instance, job execution, job task, spot fleet, Bedrock |
| **React Frontend** | Local-only viewer for browsing results, filterable by site and equipment health |

## How Processing Works

![Processing Flow](generated-diagrams/batch-processing-flow.png)

### 1. Manifest

All processing starts from a manifest file in S3 that lists every parquet file to process:

```
s3://input-bucket/manifests/file_manifest.json
```

```json
{
  "version": 1,
  "bucket": "my-input-bucket",
  "prefix": "input/",
  "files": [
    {"bucket": "my-input-bucket", "key": "input/site_telemetry_00000.parquet"},
    {"bucket": "my-input-bucket", "key": "input/site_telemetry_00001.parquet"}
  ],
  "total_files": 1000
}
```

The demo generator creates this manifest automatically when uploading to S3. For a real pipeline, generate it from your data ingestion system or an S3 listing.

### 2. Array Job Submission

`scripts/submit_jobs.py` reads the manifest and submits an AWS Batch **array job**. `FILES_PER_JOB` controls how many files each container processes:

```
1000 files / FILES_PER_JOB=10 = 100 containers (array size = 100)
1000 files / FILES_PER_JOB=5  = 200 containers (array size = 200)
1000 files / FILES_PER_JOB=1  = 1000 containers (array size = 1000)
```

Each submission generates a run ID (UTC timestamp) so results from different runs don't overwrite each other.

### 3. File Partitioning Inside Each Container

Each container gets two environment variables that AWS Batch sets automatically:

- `AWS_BATCH_JOB_ARRAY_INDEX` - this container's index (0, 1, 2, ...)
- `AWS_BATCH_JOB_ARRAY_SIZE` - the total number of containers

The container downloads the manifest and deterministically slices it so every file is processed exactly once with no cross-container coordination.

### 4. Per-File Signal Processing Pipeline

For each assigned file, the container runs this pipeline:

1. **Download and load** the parquet from S3 with pyarrow column projection
2. **Per-sensor global statistics** (min/max/mean/std for 24 channels)
3. **Rolling-window anomaly detection** using 1000-sample rolling mean and std, flagging 4-sigma outliers, collapsing contiguous flagged samples into discrete events
4. **FFT spectral analysis** on vibration channels using scipy's Welch method to find dominant frequencies for bearing-wear detection
5. **Fault flag decoding** - decode the `status_flags` uint32 bitfield into per-fault sample counts
6. **Bedrock LLM incident report** - send the compact summary to Amazon Nova Pro for a structured health assessment
7. **Write the result JSON** to S3 immediately - both to a timestamped run folder and `results/latest/`

Per-file processing time depends on how much work you ask it to do. With the lightweight pipeline in this demo, each file finishes in well under a minute on 4 vCPUs with 16 GB RAM. As you layer on heavier analysis - envelope detection, ML inference, longer windows, more sensors - it could stretch to 5-20 minutes per file, which is right in the sweet spot for Spot savings. Either way, the container defaults give you plenty of headroom to grow.

### 5. Per-File Results, Written Immediately

Results are written to S3 **after each file completes**, not at the end of the batch. This means:

- Results appear in S3 as soon as each file is done
- If a spot interruption kills the container, already-written results are safe
- Results are named after the input: `input/site_telemetry_00042.parquet` -> `results/<run-id>/site_telemetry_00042.json`
- A copy is also written to `results/latest/` so dashboards always show the most recent run

```
s3://results-bucket/
  results/
    2026-04-11T15-30-00/          <-- first run (preserved)
      site_telemetry_00000.json
      ...
    2026-04-11T16-45-12/          <-- second run (preserved)
      site_telemetry_00000.json
      ...
    latest/                        <-- always points to most recent
      site_telemetry_00000.json
      ...
```

Example result file (truncated):

```json
{
  "source_key": "input/site_telemetry_00042.parquet",
  "site_id": "SITE-US-TX-00042",
  "region": "us-east-2",
  "num_rows": 1000000,
  "sample_rate_hz": 1000.0,
  "time_range": {
    "start": "2026-04-11T14:46:22.103069362Z",
    "end": "2026-04-11T15:06:22.103069362Z"
  },
  "sensor_stats": {
    "sensor_00": {"label": "Vibration X - Spindle 1", "unit": "mm/s", "min": 0.1, "max": 8.3, "mean": 2.1, "std": 0.82}
  },
  "detected_events": [
    {
      "timestamp": "2026-04-11T15:03:14.123456789Z",
      "channel": "sensor_02",
      "peak_value": 12.4,
      "peak_z_score": 8.7,
      "duration_samples": 1820
    }
  ],
  "spectral_features": {
    "sensor_00": {"dominant_freq_hz": 242.5, "peak_power": 0.14}
  },
  "fault_counts": {
    "bearing_overtemp": 1200
  },
  "predictive_analysis": {
    "equipment_health": "at_risk",
    "bearing_wear_risk": "high",
    "lubrication_risk": "moderate",
    "thermal_risk": "high",
    "vibration_anomaly": true,
    "key_findings": ["..."],
    "recommended_actions": ["..."],
    "confidence": "high",
    "model_id": "amazon.nova-pro-v1:0"
  }
}
```

### 6. Bedrock LLM Incident Reports

After the numeric analysis, each container sends a compact summary to Amazon Bedrock. The model returns a structured JSON incident report with equipment health, per-subsystem risk levels, key findings, and recommended actions.

The default model is **Amazon Nova Pro** (`amazon.nova-pro-v1:0`). The model is fully configurable via `bedrock_model_id`. Supported alternatives:

- `amazon.nova-lite-v1:0` (cheapest, fastest - ~5x cheaper than Nova Pro, fine quality for structured output)
- `amazon.nova-pro-v1:0` (default - balanced)
- `amazon.nova-micro-v1:0`
- `anthropic.claude-haiku-4-5-20251001-v1:0` (Claude Haiku - fast and cheap)
- `anthropic.claude-sonnet-4-6-20260201-v1:0` (Claude Sonnet 4.6 - high quality)
- `anthropic.claude-opus-4-6-20260201-v1:0` (Claude Opus 4.6 - highest reasoning quality)

The container handles both Nova and Claude request/response formats automatically based on the model ID prefix. In production code you'd probably just use the [Bedrock Converse API](https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html), which unifies the message schema across providers so you don't need the format-switching logic at all.

**Cross-region inference profiles**: Some regions now require Nova and Claude models to be invoked through system-defined inference profiles (IDs like `us.amazon.nova-pro-v1:0`). The Terraform IAM policy in this repo allows both direct foundation-model ARNs and matching inference-profile ARNs, so it works either way. If direct invocation fails in your region, set `bedrock_model_id = "us.amazon.nova-pro-v1:0"` (or the region prefix for your location) in `terraform.tfvars`.

A Bedrock VPC interface endpoint is created automatically when `enable_bedrock_analysis = true`, keeping LLM traffic on the private network.

### 7. Spot Fallback and Retries

The job queue tries spot instances first. If spot capacity is unavailable, jobs automatically fall back to on-demand. This happens per-job, so some array indices can run on spot while others run on on-demand.

Failed jobs (spot reclamation, container pull errors) are retried automatically up to `job_retry_attempts` times. Instances scale to zero when all jobs are complete.

## Parquet Schema

Each file represents one industrial site's telemetry for a monitoring window.

| Column | Type | Description |
|--------|------|-------------|
| `timestamp_ns` | `int64` | Nanosecond unix epoch |
| `site_id` | `string` | Unique site identifier (e.g. `SITE-US-TX-00042`) |
| `region` | `string` | Region code |
| `sensor_00`..`sensor_08` | `float64` | Vibration X/Y/Z on 3 spindles (mm/s) |
| `sensor_09`..`sensor_11` | `float64` | Bearing temperatures on 3 spindles (deg C) |
| `sensor_12`..`sensor_14` | `float64` | Oil pressure at 3 points (bar) |
| `sensor_15`..`sensor_17` | `float64` | Coolant flow rate at 3 points (L/min) |
| `sensor_18`..`sensor_20` | `float64` | Motor current draw on 3 motors (A) |
| `sensor_21` | `float64` | Ambient air temperature (deg C) |
| `sensor_22` | `float64` | Relative humidity (%) |
| `sensor_23` | `float64` | Acoustic noise level (dB) |
| `status_flags` | `uint32` | Equipment fault flag bitfield |

The synthetic data generator simulates realistic conditions: periodic vibration at spindle rotation frequencies plus harmonics, slowly drifting baselines for temperatures and pressures, Gaussian noise, and injected anomaly events every ~10 files so the analysis has something to detect.

## Prerequisites

- Python 3.14+ with [uv](https://docs.astral.sh/uv/)
- Terraform >= 1.14
- AWS CLI v2 configured with appropriate credentials
- Docker
- Node.js 20.19+ or 22.12+ (required by Vite 7)
- Bedrock model access enabled for `amazon.nova-pro-v1:0` in your region

## Quick Start

### 1. Deploy Infrastructure

```bash
cp terraform/terraform.tfvars.example terraform/terraform.tfvars
# Edit terraform.tfvars to customize (bucket names, AMI, region, etc.)

make init
make plan
make apply
```

### 2. Set Environment Variables

```bash
eval $(make env)
```

This loads `PARQUET_BUCKET`, `RESULTS_BUCKET`, `JOB_QUEUE`, `JOB_DEFINITION`, and `ECR_REPO` from Terraform outputs. The `eval $(...)` form assumes a POSIX shell (bash or zsh). If you're on fish, use `make env | source`. On Windows PowerShell, read the output of `make env` and set each variable manually, or run it from WSL.

### 3. Generate Demo Data and Upload to S3

The generator runs in parallel across CPU cores and streams uploads to S3 so peak local disk stays small. Three recommended tiers:

```bash
# Tiny smoke test - 5 sites, 100K rows each, a few MB total
NUM_FILES=5 RECORDS_PER_FILE=100000 make generate-data

# Small - 100 sites, 500K rows each, ~10 GB total
NUM_FILES=100 RECORDS_PER_FILE=500000 make generate-data

# Large - 1000 sites, 500K rows each, ~50 GB total
NUM_FILES=1000 RECORDS_PER_FILE=500000 make generate-data
```

Default sample rate is 1 ms (1 kHz). Override with `SAMPLE_INTERVAL_MS=10` for 100 Hz, etc.

### 4. Build and Push Container

```bash
make deploy-container
```

Builds a linux/amd64 Docker image with Python 3.14 + pyarrow + numpy + scipy + boto3 and pushes to ECR.

### 5. Test Locally (Optional)

```bash
make test-local
```

Runs the container on your machine against real S3 data using your local AWS credentials.

### 6. Submit Processing Jobs

```bash
# Each container processes 10 files
FILES_PER_JOB=10 make submit-jobs

# Or 1 file per container for maximum parallelism
FILES_PER_JOB=1 make submit-jobs
```

### 7. Monitor

```bash
# Tail CloudWatch logs
make logs

# Check job status
aws batch describe-jobs --jobs <job-id> --query 'jobs[0].{status:status,reason:statusReason}' --region us-east-1

# List results
aws s3 ls s3://$RESULTS_BUCKET/results/latest/
```

### 8. Browse Results in the Frontend

```bash
make frontend-install   # one time
make frontend-dev       # opens http://localhost:5173
```

The frontend lists every result, filters by site / region / equipment health, and shows the full incident report for the selected site including sensor stats, detected events, fault counts, and the LLM-generated findings and recommended actions.

### Full Pipeline

```bash
make deploy          # Terraform apply + build/push container
make demo            # Generate data + submit jobs
```

## Configuration

All settings are configurable via `terraform/terraform.tfvars`. See [terraform/variables.tf](terraform/variables.tf) for the full list.

### Compute Environment

| Variable | Default | Description |
|----------|---------|-------------|
| `spot_compute_type` | `["optimal"]` | Spot instance types - `optimal` auto-selects cost-effective types |
| `spot_max_vcpus` | `128` | Maximum vCPUs for spot fleet |
| `spot_bid_percentage` | `60` | Max % of on-demand price for spot |
| `ondemand_compute_type` | `["optimal"]` | On-demand instance types - `optimal` auto-selects |
| `ondemand_max_vcpus` | `32` | Maximum vCPUs for on-demand |

### Job Resources

| Variable | Default | Description |
|----------|---------|-------------|
| `job_vcpus` | `4` | vCPUs per job container |
| `job_memory_mib` | `16384` | Memory (MiB) per job container |
| `job_timeout_seconds` | `3600` | Job timeout |
| `job_retry_attempts` | `2` | Retries on failure |

### Bedrock LLM Analysis

| Variable | Default | Description |
|----------|---------|-------------|
| `enable_bedrock_analysis` | `true` | Enable per-file LLM incident reports |
| `bedrock_model_id` | `amazon.nova-pro-v1:0` | Foundation model ID |
| `bedrock_region` | `us-east-1` | AWS region for Bedrock invocations |

### Custom AMI

| Variable | Default | Description |
|----------|---------|-------------|
| `custom_ami_id` | `""` (uses latest ECS-optimized AL2023) | Your custom AMI ID |
| `custom_ami_image_type` | `ECS_AL2023` | Base image type |
| `install_ecs_agent` | `false` | Install ECS agent at boot for non-ECS-optimized AMIs |

### Storage

| Variable | Default | Description |
|----------|---------|-------------|
| `parquet_bucket_name` | auto-generated with random suffix | Input bucket name |
| `create_input_bucket` | `true` | Set `false` to use an existing bucket |
| `results_bucket_name` | auto-generated with random suffix | Results bucket name |
| `create_results_bucket` | `true` | Set `false` to use an existing bucket |
| `results_prefix` | `results/` | S3 prefix for output files |

## Spot Instance Handling

- **Allocation strategy**: `SPOT_PRICE_CAPACITY_OPTIMIZED` balances lowest price with least interruption risk
- **Instance selection**: `optimal` lets Batch auto-select cost-effective instance types
- **Automatic retry**: Jobs that fail due to spot reclamation or container pull errors are retried automatically
- **Interruption logging**: Containers poll EC2 instance metadata (IMDSv2) every 5 seconds
- **Per-file results**: Results are written to S3 after each file, so completed work survives interruptions
- **Fallback**: On-demand compute environment catches jobs when no spot capacity is available
- **Scale to zero**: Instances terminate after jobs finish (`min_vcpus = 0`), no cost when idle

## Security and Well-Architected

These are the controls the demo ships with. "Tightening for production" below lists what you'd add on top.

- **IAM with least privilege as a starting point**: Separate roles for ECS instance, job execution, job task, spot fleet, and VPC Flow Logs. The job task role is scoped to `s3:GetObject` on `input/*` and `manifests/*`, `s3:PutObject` on the configured results prefix, `bedrock:InvokeModel` on the specific model (and matching cross-region inference profiles), and CloudWatch Logs on a single log group. Nothing else.
- **VPC isolation**: Compute runs in private subnets with no public IPs.
- **S3 VPC gateway endpoint**: Free, keeps S3 traffic on the private network.
- **Bedrock VPC interface endpoint**: Keeps LLM traffic on the private network.
- **TLS-only bucket policies**: Both S3 buckets have a `Deny` statement on `s3:*` with `aws:SecureTransport = false` so any non-HTTPS request is refused at the bucket level.
- **VPC flow logs (ALL traffic)**: Accepted and rejected flows both go to CloudWatch so lateral-movement forensics aren't limited to what was denied (SEC04-BP01).
- **IMDSv2 required**: Launch template enforces token-based instance metadata with `http_tokens = "required"` (SEC06-BP02).
- **Encryption at rest**: S3 buckets use AES256 server-side encryption. For production you'd typically upgrade this to a customer-managed KMS key - see the hardening section below.
- **Public access blocked**: All Terraform-managed S3 buckets have public access blocks enabled.
- **Restricted egress**: Compute and Bedrock-endpoint security groups only allow outbound on port 443.
- **Container hardening**: Docker container runs as an unprivileged user, with `readonlyRootFilesystem = true`, all Linux capabilities dropped, and a tmpfs mounted at `/tmp`.
- **ECR scan on push**: Container images are scanned for vulnerabilities on push.

## Tightening for production

This demo is a solid starting point, but "production-ready" is a stronger claim than I want to make here. Here's the explicit list of what you'd add before shipping something like this into a real environment.

**Data protection**

- Switch S3 encryption from SSE-S3 (AES256) to SSE-KMS with a customer-managed CMK (SEC08-BP01). You get auditable key usage via CloudTrail, revocation via key policy, and clean cross-account sharing.
- Add an explicit `s3:prefix` condition on `ListBucket` if your container code ever grows to use it. The current job role doesn't grant `ListBucket` at all.

**Network**

- Multi-AZ NAT gateways. The demo provisions a single NAT gateway in one AZ; if that AZ has a problem, every private subnet loses ECR access. In production either run one NAT per AZ or switch to ECR interface endpoints and delete the NAT entirely.
- Scope security group egress with AWS service prefix lists so you can't accidentally exfiltrate to the public internet.

**Container**

- Add a `HEALTHCHECK` to the Dockerfile if you extend the container to run longer-lived work.
- Set `ecr_image_tag_mutability = "IMMUTABLE"` once you're tagging with semantic versions instead of `latest` (the demo uses `MUTABLE` for a simpler `latest` workflow).

**Observability and ops**

- CloudWatch alarms on Batch job failures, Bedrock throttling, and spot reclamation rates. None exist in the demo.
- EventBridge rule on `Batch Job State Change` targeting SNS or Slack for failure alerting.
- Bump CloudWatch log retention from 14 days to 90+ for compliance and forensics.

**LLM and Bedrock**

- Attach a Bedrock Guardrail to catch prompt injection, PII, and off-topic responses with a managed policy instead of ad hoc checks.
- Validate the LLM response against a JSON schema before trusting it - the container parses the response as JSON but doesn't enforce the expected shape. Schema failures should trigger a retry.
- Prefer the [Bedrock Converse API](https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html) over per-model request/response format switching.

**Reliability**

- Run on both x86 and ARM spot pools for additional cost savings and resilience.
- Consider the `job_state_time_limit_action` block on the job queue to auto-cancel jobs stuck in RUNNABLE state.

## Local Frontend (React 19 + Vite 7)

The `frontend/` app runs locally and browses results in the S3 results bucket.

```bash
make frontend-install     # npm install
make frontend-env         # generates frontend/.env.local from Terraform outputs
make frontend-dev         # vite dev server on http://localhost:5173
```

The Vite dev server has a small custom plugin that proxies S3 calls through the Node-side AWS SDK using the local credential chain. Credentials never reach the browser. The frontend is intentionally local-only - it's a developer/operator tool, not something you'd deploy publicly.

## File Organization

```
aws-batch-parquet-telemetry-processor/
  terraform/              Terraform infrastructure (AWS provider ~> 6.0)
    providers.tf          Provider config and default tags
    variables.tf          All configurable variables
    main.tf               Data sources, locals, SSM AMI lookup, random suffix
    network.tf            VPC, subnets, NAT, S3 endpoint, Bedrock endpoint, flow logs
    s3.tf                 Input and results S3 buckets (optional - can use existing)
    ecr.tf                ECR repository with lifecycle policy
    iam.tf                Least-privilege IAM roles and policies
    batch.tf              Launch template, compute environments, job queue, job definition
    outputs.tf            Terraform outputs
    terraform.tfvars.example  Example configuration
  container/              Docker container for processing
    Dockerfile            Python 3.14-slim, non-root user
    process.py            Processor: manifest partitioning, sensor stats, rolling-window
                          anomaly detection, FFT spectral analysis (scipy), fault flag
                          decoding, Bedrock incident report, per-file result writes,
                          spot interruption monitor, summary logging
    requirements.txt      pyarrow, boto3, numpy, scipy
  scripts/                Development and operations scripts
    generate_demo_data.py Generate synthetic industrial telemetry, parallelized across
                          CPUs, streams uploads to S3, writes manifest
    submit_jobs.py        Read manifest, calculate array size, submit Batch array job
    pyproject.toml        Python project config for uv
    requirements.txt      pyarrow, boto3, numpy
  frontend/               Local React 19 + Vite 7 results viewer
    package.json          npm dependencies (React 19, Vite 7, AWS SDK v3)
    vite.config.js        Vite config with S3 proxy middleware
    .env.example          Frontend env vars template
    src/                  React components and S3 client
  generated-diagrams/     Architecture and flow diagrams (PNG)
  Makefile                Build, deploy, test, monitoring, and frontend targets
```

## Makefile Targets

| Target | Description |
|--------|-------------|
| `make init` | Initialize Terraform |
| `make plan` | Terraform plan |
| `make apply` | Terraform apply |
| `make destroy` | Tear down all Terraform-managed AWS resources |
| `make env` | Print export commands for env vars from Terraform outputs |
| `make generate-data` | Generate demo parquet files and upload to S3 |
| `make build-container` | Build the Docker image |
| `make push-container` | Push to ECR |
| `make deploy-container` | Build + push |
| `make test-local` | Run the container locally against real S3 data |
| `make submit-jobs` | Submit Batch array job |
| `make logs` | Tail CloudWatch logs |
| `make deploy` | `apply` + `deploy-container` |
| `make demo` | `generate-data` + `submit-jobs` |
| `make destroy-keep-data` | Destroy infrastructure but preserve the input S3 bucket and its data |
| `make frontend-install` | `npm install` for the React viewer |
| `make frontend-env` | Generate `frontend/.env.local` from Terraform outputs |
| `make frontend-dev` | Run the Vite dev server on http://localhost:5173 |

## Cost

Two parts: per-run costs that scale with how much work you actually process, and idle infrastructure costs that accrue whenever the stack is deployed.

**Per-run cost** (incremental, assuming infrastructure is already up):

| Tier | Files | Records each | Compute (spot) | Bedrock (Nova Pro) | NAT/ECR | **Total** |
| --- | --- | --- | --- | --- | --- | --- |
| Tiny (smoke test) | 5 | 100K | ~$0.01 | ~$0.02 | ~$0.02 | **~$0.05** |
| Small | 100 | 500K | ~$0.10 | ~$0.40 | ~$0.15 | **~$0.65** |
| Large | 1000 | 500K | ~$0.80 | ~$4.00 | ~$0.30 | **~$5.10** |

At the Large tier that's 500 million rows processed with per-file stats, rolling anomaly detection, FFT spectral analysis on vibration channels, and an LLM incident report for every site. Bedrock dominates the bill at the demo's current workload - compute is only about $1 thanks to Spot. As you scale per-file analysis up (longer windows, more channels, heavier signal processing, ML inference), compute grows but Bedrock stays roughly flat, and that's where Spot savings relative to on-demand really matter.

If you want to cut Bedrock cost dramatically, switch `bedrock_model_id` to `amazon.nova-lite-v1:0` (about 5x cheaper than Nova Pro) or `amazon.nova-micro-v1:0` (about 25x cheaper). For the structured JSON output this demo uses, Nova Lite is fine.

**Idle infrastructure cost** (accrues 24/7 while the stack is deployed, regardless of whether jobs are running):

| Resource | Monthly |
| --- | --- |
| NAT Gateway | ~$32 |
| Bedrock VPC interface endpoint | ~$14 |
| S3 storage (a few GB) | under $1 |
| ECR storage | under $1 |
| **Total idle** | **~$48/month** |

Nothing surprising here - that's how NAT and interface endpoints work, and both are the right architectural choice. It's just worth knowing before you deploy and walk away. For short-lived testing, run `make destroy` when you're done and you'll spend pennies total.

## Cleanup

```bash
make destroy
```

This tears down all Terraform-managed AWS resources. Buckets have `force_destroy = true` by default in dev.

To destroy infrastructure but **keep the input data bucket** (so you don't have to re-upload):

```bash
make destroy-keep-data
```

This removes the input bucket from Terraform state before destroying, so the bucket and its data survive. It prints the bucket name and the `terraform.tfvars` settings you'll need on your next deploy:

```hcl
create_input_bucket = false
parquet_bucket_name = "industrial-telemetry-dev-abcd1234"
```

## Read More

This repository is associated with the blog post at [Processing Industrial Telemetry at Scale with AWS Batch, Spot, and Bedrock](https://darryl-ruggles.cloud/processing-industrial-telemetry-at-scale-with-aws-batch-spot-and-bedrock/)

## Author

**Darryl Ruggles** -- [Blog](https://darryl-ruggles.cloud/) | [Bluesky](https://bsky.app/profile/darryl-ruggles.cloud) | [X](https://x.com/RDarrylR) | [LinkedIn](https://www.linkedin.com/in/darryl-ruggles/) | [GitHub](https://github.com/RDarrylR) | [Medium](https://medium.com/@RDarrylR) | [Dev.to](https://dev.to/rdarrylr) | [AWS Community Builder](https://community.aws/@darrylr)

Join the [Believe In Serverless](https://www.believeinserverless.com/) community!

## License

MIT - see [LICENSE](LICENSE) for details.
