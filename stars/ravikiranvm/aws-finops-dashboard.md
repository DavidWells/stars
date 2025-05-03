---
repo: ravikiranvm/aws-finops-dashboard
url: 'https://github.com/ravikiranvm/aws-finops-dashboard'
homepage: ''
starredAt: '2025-05-01T03:51:32Z'
createdAt: '2025-04-05T12:32:16Z'
updatedAt: '2025-05-03T19:01:45Z'
language: Python
license: MIT
branch: main
stars: 329
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-03T22:30:41.348Z'
description: >-
  A terminal-based AWS cost and resource dashboard built with Python and the
  Rich library. It provides an overview of AWS spend by account, service-level
  breakdowns, budget tracking, and EC2 instance summaries.
tags: []
---

# AWS FinOps Dashboard (CLI) v2.2.4

[![PyPI version](https://img.shields.io/pypi/v/aws-finops-dashboard.svg)](https://pypi.org/project/aws-finops-dashboard/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/ravikiranvm/aws-finops-dashboard.svg)](https://github.com/ravikiranvm/aws-finops-dashboard/stargazers)
[![Downloads](https://static.pepy.tech/badge/aws-finops-dashboard)](https://pepy.tech/project/aws-finops-dashboard)

A terminal-based AWS cost and resource dashboard built with Python and the [Rich](https://github.com/Textualize/rich) library.
It provides an overview of AWS spend by profile, service-level breakdowns, budget tracking, EC2 instance summaries, and allows exporting data to CSV or JSON.

---

## Features

- **Cost Analysis by Time Period**: 
  - View current & previous month's spend by default
  - Set custom time ranges (e.g., 7, 30, 90 days) with `--time-range` option
- **Cost by AWS Service**: Sorted by highest cost for better insights
- **Cost by Tag**: Get the cost data by one or more tags with `--tag`(cost allocation tags must be enabled)
- **AWS Budgets Information**: Displays budget limits and actual spend
- **EC2 Instance Status**: Detailed state information across specified/accessible regions
- **Cost Trend Analysis**: View detailed cost trends in bar charts for the last 6 months across AWS profiles
- **Profile Management**:
  - Automatic profile detection
  - Specific profile selection with `--profiles`
  - Use all available profiles with `--all`
  - Combine profiles from the same AWS account with `--combine`
- **Region Control**: Specify regions for EC2 discovery using `--regions`
- **Export Options**:
  - CSV export with `--report-name` and `--report-type csv`
  - JSON export with `--report-name` and `--report-type json`
  - Export to both CSV and JSON formats with `--report-name` and `--report-type csv json`
  - Specify output directory using `--dir`
- **Improved Error Handling**: Resilient and user-friendly error messages
- **Beautiful Terminal UI**: Styled with the Rich library for a visually appealing experience

---

## Prerequisites

- **Python 3.8 or later**: Ensure you have the required Python version installed
- **AWS CLI configured with named profiles**: Set up your AWS CLI profiles for seamless integration
- **AWS credentials with permissions**:
  - `ce:GetCostAndUsage`
  - `budgets:DescribeBudgets`
  - `ec2:DescribeInstances`
  - `ec2:DescribeRegions`
  - `sts:GetCallerIdentity`

---

## Installation

There are several ways to install the AWS FinOps Dashboard:

### Option 1: Using pipx (Recommended)
```bash
pipx install aws-finops-dashboard
```

If you don't have `pipx`, install it with:

```bash
python -m pip install --user pipx
python -m pipx ensurepath
```

### Option 2: Using pip
```bash
pip install aws-finops-dashboard
```

### Option 3: Using uv (Fast Python Package Installer)
[uv](https://github.com/astral-sh/uv) is a modern Python package installer and resolver that's extremely fast.

```bash
# Install uv if you don't have it yet
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install aws-finops-dashboard
uv pip install aws-finops-dashboard
```

### Option 4: From Source
```bash
# Clone the repository
git clone https://github.com/ravikiranvm/aws-finops-dashboard.git
cd aws-finops-dashboard

# Install using pip
pip install -e .
```

---

## Set Up AWS CLI Profiles

If you haven't already, configure your named profiles using the AWS CLI:

```bash
aws configure --profile profile1-name
aws configure --profile profile2-name
# ... etc ...
```

Repeat this for all the profiles you want the dashboard to potentially access.

---

## Command Line Usage

Run the script using `aws-finops` followed by options:

```bash
aws-finops [options]
```

### Command Line Options

| Flag | Description |
|---|---|
| `--profiles`, `-p` | Specific AWS profiles to use (space-separated). If omitted, uses 'default' profile if available, otherwise all profiles. |
| `--regions`, `-r` | Specific AWS regions to check for EC2 instances (space-separated). If omitted, attempts to check all accessible regions. |
| `--all`, `-a` | Use all available AWS profiles found in your config. |
| `--combine`, `-c` | Combine profiles from the same AWS account into single rows. |
| `--tag`, `-g` | Filter cost data by one or more cost allocation tags in `Key=Value` format. Example: `--tag Team=DevOps Env=Prod` |
| `--report-name`, `-n` | Specify the base name for the report file (without extension). |
| `--report-type`, `-y` | Specify one or more report types (space-separated): 'csv' and/or 'json'. |
| `--dir`, `-d` | Directory to save the report file(s) (default: current directory). |
| `--time-range`, `-t` | Time range for cost data in days (default: current month). Examples: 7, 30, 90. |
| `--trend` | View cost trend analysis for the last 6 months. |

### Examples

```bash
# Use default profile, show output in terminal only
aws-finops

# Use specific profiles 'dev' and 'prod'
aws-finops --profiles dev prod

# Use all available profiles
aws-finops --all

# Combine profiles from the same AWS account
aws-finops --all --combine

# Specify custom regions to check for EC2 instances
aws-finops --regions us-east-1 eu-west-1 ap-southeast-2

# View cost data for the last 30 days instead of current month
aws-finops --time-range 30

# View cost data only for a specific tag (e.g., Team=DevOps)
aws-finops --tag Team=DevOps

# View cost data for multiple tags (e.g., Team=DevOps and Env=Prod)
aws-finops --tag Team=Devops Env=Prod

# Export data to CSV only
aws-finops --all --report-name aws_dashboard_data --report-type csv

# Export data to JSON only
aws-finops --all --report-name aws_dashboard_data --report-type json

# Export data to both CSV and JSON formats simultaneously
aws-finops --all --report-name aws_dashboard_data --report-type csv json

# Export combined data for 'dev' and 'prod' profiles to a specific directory
aws-finops --profiles dev prod --combine --report-name report --report-type csv --dir output_reports

# View cost trend analysis as bar charts for profile 'dev' and 'prod'
aws-finops --profiles dev prod -r us-east-1 --trend

# View cost trend analysis for all cli profiles for a specific cost tag 'Team=DevOps'
aws-finops --all --trend --tag Team=DevOps
```

You'll see a live-updating table of your AWS account cost and usage details in the terminal. If export options are specified, a report file will also be generated upon completion.

---

## Example Terminal Output

![Dashboard](aws-finops-dashboard-v2.2.3.png)

![Trend](aws-finops-dashboard_trend.png)

---

## Export Formats

### CSV Output Format

When exporting to CSV, a file is generated with the following columns:

- `CLI Profile`
- `AWS Account ID`
- `Last Month Cost` (or previous period based on time range)
- `Current Month Cost` (or current period based on time range)
- `Cost By Service` (Each service and its cost appears on a new line within the cell)
- `Budget Status` (Each budget's limit and actual spend appears on a new line within the cell)
- `EC2 Instances` (Each instance state and its count appears on a new line within the cell)

**Note:** Due to the multi-line formatting in some cells, it's best viewed in spreadsheet software (like Excel, Google Sheets, LibreOffice Calc) rather than plain text editors.

### JSON Output Format

When exporting to JSON, a structured file is generated that includes all dashboard data in a format that's easy to parse programmatically.

---

## Cost For Every Run

This script makes API calls to AWS, primarily to Cost Explorer, Budgets, EC2, and STS. AWS may charge for some API calls (typically `$0.01` for each API call, check current pricing).

The number of API calls depends heavily on the options used:

- **Cost Explorer & Budgets:** Typically 3 `ce:GetCostAndUsage` and 1 `budgets:DescribeBudgets` call per profile processed.
- **STS:** 1 `sts:GetCallerIdentity` call per profile processed (used for account ID).
- **EC2:**
  - 1 `ec2:DescribeRegions` call initially (per session).
  - If `--regions` is **not** specified, the script attempts to check accessibility by calling `ec2:DescribeInstances` in *multiple regions*, potentially increasing API calls significantly.
  - If `--regions` **is** specified, 1 `ec2:DescribeInstances` call is made *per specified region* (per profile, unless `--combine` is used, where it's called once per region for the primary profile).

**To minimize API calls and potential costs:**

- Use the `--profiles` argument to specify only the profiles you need.
- Use the `--regions` argument to limit EC2 checks to only relevant regions. This significantly reduces `ec2:DescribeInstances` calls compared to automatic region discovery.
- Consider using the `--combine` option when working with multiple profiles from the same AWS account.

The exact cost per run is usually negligible but depends on the scale of your usage and AWS pricing.

---

## Contributing

Contributions are welcome! Feel free to fork and improve the project.

### Development Setup with pip

```bash
# Fork this repository on GitHub first:
# https://github.com/ravikiranvm/aws-finops-dashboard

# Then clone your fork locally
git clone https://github.com/your-username/aws-finops-dashboard.git
cd aws-finops-dashboard

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt
pip install -e ".[dev]"

# Run the formatter
hatch run fmt

# Run linters
hatch run lint

# Run the tool
python -m aws_finops_dashboard.cli --help
```

### Development Setup with uv

`uv` provides a much faster development environment setup:

```bash
# Fork this repository on GitHub first:
# https://github.com/ravikiranvm/aws-finops-dashboard

# Then clone your fork locally
git clone https://github.com/your-username/aws-finops-dashboard.git
cd aws-finops-dashboard

# Install uv if you don't have it yet
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create and sync the virtual environment (.venv)
uv venv
uv pip install -e ".[dev]"

# Activate the virtual environment
source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`

# Run the formatter
uv run hatch run fmt

# Run linters
uv run hatch run lint

# Run tests 
uv run hatch run test

# Run the tool
aws-finops
```

---

## Acknowledgments

Special thanks to [cschnidr](https://github.com/cschnidr) & [MKAbuMattar](https://github.com/MKAbuMattar) for their valuable contributions to significantly improve this project!

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
