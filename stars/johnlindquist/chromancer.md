---
repo: johnlindquist/chromancer
url: 'https://github.com/johnlindquist/chromancer'
homepage: null
starredAt: '2025-06-20T22:46:16Z'
createdAt: '2025-06-04T04:28:55Z'
updatedAt: '2025-06-25T05:11:32Z'
language: TypeScript
license: MIT
branch: main
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-06-28T22:31:13.350Z'
description: Command-line interface for Chrome automation using DevTools Protocol
tags: []
---

# Chromancer 🧙

[![npm version](https://badge.fury.io/js/chromancer.svg)](https://www.npmjs.com/package/chromancer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/chromancer.svg)](https://nodejs.org)

A powerful command-line interface for automating Chrome browser using Playwright. Perfect for web scraping, automation, testing, and browser workflows.

## ✨ What's New

- **🤖 AI-Powered Automation** - Natural language commands with AI integration
- **🔍 Intelligent DOM Inspection** - Smart selector discovery for robust automation
- **🔄 AI Feedback Loop** - Automatic workflow refinement and verification
- **📊 Enhanced Data Extraction** - Automatic formatting and file saving
- **🚀 DOM Pipeline Optimizations** - Mini digest, selector ranking, and structured logs for 90% better success rates
- **🎭 Playwright-powered** - Built on Playwright for superior performance and features
- **📝 YAML Workflows** - Write automation scripts in simple YAML with variable support
- **💡 Smart Error Tips** - Helpful error messages that teach correct usage
- **🎯 10+ New Commands** - Claude, inspect, record, export, fill, scroll, cookies, PDF, network monitoring, and more
- **🚀 Quick Commands** - One-line site testing and data extraction
- **⚙️ Config System** - Persistent settings and defaults
- **📚 Interactive Examples** - Learn by example with categorized recipes

## Features

- 🚀 **Easy Setup** - Onboarding wizard with `chromancer init`
- 🤖 **AI Assistant** - Natural language to automation with Claude
- 🔄 **Session Management** - All commands work with your active Chrome instance
- 🎮 **Interactive REPL** - Execute commands interactively with history
- 📝 **YAML Workflows** - Automate complex tasks with simple YAML files
- 🎬 **Record & Replay** - Record browser interactions and generate scripts
- 📊 **Data Export** - Extract data as JSON, CSV, HTML, or Markdown
- 🖱️ **Smart Automation** - Click, type, scroll, fill forms automatically
- 📸 **Screenshots & PDFs** - Capture pages in multiple formats
- 🍪 **Cookie Management** - Save and restore browser sessions
- 🌐 **Network Monitoring** - Track and analyze network requests
- 💡 **Helpful Errors** - Smart error messages with solutions
- 🔍 **DOM Inspector** - Intelligent selector discovery

## Requirements

- Node.js 18.0.0 or higher
- Chrome or Chromium browser installed

## Installation

### Global Installation (Recommended)

```bash
npm install -g chromancer
```

### Quick Start

```bash
# First time? Run the setup wizard
chromancer init

# Start Chrome
chromancer spawn

# Try it out!
chromancer navigate https://example.com
chromancer screenshot example.png
```

## 🎯 Core Commands

### Browser Control

```bash
# Start Chrome with remote debugging
chromancer spawn                    # Opens Chrome
chromancer spawn --headless         # Headless mode
chromancer spawn --profile work     # Use Chrome profile

# Navigate pages
chromancer navigate https://example.com
chromancer go https://example.com   # Alias for navigate

# Stop Chrome
chromancer stop
```

### AI-Powered Natural Language Automation

```bash
# Use natural language to control the browser
chromancer ai "click the login button and wait for dashboard"
chromancer ai "scroll down and take a screenshot of the footer"
chromancer ai "extract all product prices from this page"

# Interactive mode with AI feedback loop
chromancer ai "find and click all download links"
# AI will verify results and refine if needed

# Preview generated workflow without executing
chromancer ai --dry-run "fill out the contact form"

# Skip interactive verification
chromancer ai --no-interactive "navigate to settings and click logout"

# Default command - just type your instruction!
chromancer "take a screenshot of the hero section"
```

#### 🔧 Advanced DOM Pipeline Optimizations

The Claude command includes intelligent DOM analysis and optimization features that automatically activate during workflow generation and refinement:

**When it's triggered:**
- Automatically when data extraction fails (selectors return 0 items)
- During autofix attempts when previous workflows didn't succeed
- When the `--auto-inspect` flag is enabled (default: true)

**How it works:**

1. **Mini DOM Digest (~2-3KB)**
   - Captures page structure efficiently without overwhelming token limits
   - Collects top element patterns, text samples, and data attributes
   - Caches digest per URL for performance

2. **Intelligent Selector Ranking**
   - Tests and ranks selectors by confidence score
   - Considers element count, content consistency, and specificity
   - Provides alternative selectors when primary ones fail

3. **Structured Run Logs**
   - Saves detailed execution results as JSON
   - Tracks selector performance and sample data
   - Enables learning from past successes/failures

4. **Enhanced Autofix Loop**
   - Feeds actual page structure to Claude during retries
   - Uses ranked selectors for better alternatives
   - Reduces false positives and wasted tokens

**Why it matters:**
- **Higher success rates**: Claude gets real page data, not guesses
- **Faster iterations**: Mini digest reduces token usage by ~90%
- **Better debugging**: Run logs track exactly what worked/failed
- **Smarter retries**: Each attempt builds on previous knowledge

**Example workflow with optimizations:**
```bash
# First attempt might fail
chromancer ai "extract all product prices"
# 🔍 DOM inspection automatically activates
# 📊 Generates mini digest with top patterns
# 🎯 AI receives: ".price-tag (47 elements)", ".product-price (23 elements)"
# ✅ Second attempt uses better selectors
```

### Page Interaction

```bash
# Click elements
chromancer click "button.submit"
chromancer click "#menu" --right    # Right click

# Type text
chromancer type "input[name=email]" "user@example.com"
chromancer type "#search" "query" --press-enter

# Fill forms automatically
chromancer fill --auto-generate     # Generate test data
chromancer fill --data '{"name": "John", "email": "john@example.com"}'

# Scroll pages
chromancer scroll down
chromancer scroll --to "#footer"
chromancer scroll --by 500          # Pixels
```

### Data Extraction

```bash
# Take screenshots
chromancer screenshot page.png
chromancer shot page.png            # Alias

# Generate PDFs
chromancer pdf --output report.pdf --format A4

# Export page data
chromancer export --format json --selector "table"
chromancer export --format csv --output data.csv

# Quick data extraction
chromancer quick extract https://news.site "h2.headline"

# Inspect DOM to find selectors
chromancer inspect "product prices"         # AI-powered selector discovery
chromancer inspect "search results" --json  # Raw inspection data
chromancer inspect "navigation links" --selector "nav"  # Limit scope
```

### Testing & Monitoring

```bash
# Quick site check
chromancer quick check example.com

# Comprehensive site test
chromancer quick test example.com   # Tests a11y, performance, mobile, console errors

# Monitor network traffic
chromancer network --filter "api" --type xhr
chromancer network --block "ads" --block "analytics"

# Wait for conditions
chromancer wait --selector ".loaded"
chromancer wait --text "Success"
chromancer wait --url "https://example.com/dashboard"
```

## 🤖 AI-Powered Automation with Claude

The Claude command transforms natural language into Chromancer workflows with intelligent feedback and verification:

### Key Features

- **Natural Language Processing**: Write commands in plain English
- **Intelligent Feedback Loop**: Claude verifies results and automatically refines workflows
- **DOM Inspection**: Automatically inspects page structure when selectors fail
- **Data Extraction**: Smart detection and formatting of extracted data
- **Workflow Management**: Save and reuse successful workflows

### Examples

```bash
# Basic automation
chromancer ai "go to github.com and click the sign in button"

# Data extraction with automatic formatting
chromancer ai "extract all article headlines and save them as JSON"

# Complex workflows
chromancer ai "login to dashboard, navigate to reports, and download the monthly CSV"

# With verification
chromancer ai "find all product cards and verify each has a price"
```

### Advanced Options

```bash
# Preview without executing
chromancer ai --dry-run "fill out the entire registration form"

# Skip interactive feedback
chromancer ai --no-interactive "take screenshots of each section"

# Set maximum retry attempts
chromancer ai "find and click the hidden menu"

# Disable auto DOM inspection
chromancer ai --no-auto-inspect "click the submit button"
```

### How It Works

1. **Natural Language → YAML**: Claude converts your instruction to a workflow
2. **Execution**: The workflow runs against your Chrome instance
3. **Verification**: Claude analyzes the results
4. **Refinement**: If needed, Claude adjusts and retries
5. **Success**: Workflow can be saved for future use

## 📝 YAML Workflows

Create reusable automation scripts with YAML:

### Example: Login Workflow

```yaml
# login.yml
- navigate: https://github.com/login
- type:
    selector: input[name="login"]
    text: ${USERNAME}
- type:
    selector: input[name="password"]
    text: ${PASSWORD}
- click: input[type="submit"]
- wait:
    url: https://github.com
- screenshot: logged-in.png
```

Run with variables:
```bash
chromancer run login.yml --var USERNAME=myuser --var PASSWORD=mypass
```

### Example: Web Scraping

```yaml
# scrape-news.yml
- navigate: https://news.ycombinator.com
- wait: .itemlist
- evaluate: |
    Array.from(document.querySelectorAll('.athing')).slice(0, 10).map(item => ({
      title: item.querySelector('.titleline a')?.textContent,
      link: item.querySelector('.titleline a')?.href
    }))
- export:
    format: json
    output: news-stories.json
```

## 🎬 Recording Browser Actions

Record your interactions and generate automation scripts:

```bash
# Start recording
chromancer record --output actions.json

# Perform actions in browser...
# Press Ctrl+C to stop

# Generate JavaScript
chromancer record --output script.js --format js
```

## 🍪 Session Management

Save and restore browser sessions:

```bash
# Save cookies
chromancer cookies save --output session.json

# Restore cookies
chromancer cookies load --file session.json

# Manage individual cookies
chromancer cookies list
chromancer cookies set sessionId=abc123
chromancer cookies delete trackingId
```

## 🔍 DOM Inspection

The inspect command helps you discover working selectors intelligently:

```bash
# Find selectors for specific content
chromancer inspect "product prices"
chromancer inspect "article titles"
chromancer inspect "navigation menu"

# Get raw JSON data for advanced analysis
chromancer inspect "search results" --json

# Limit inspection to specific areas
chromancer inspect "prices" --selector ".product-grid"
```

The inspector provides:
- Common selector patterns
- Page structure analysis
- Tested selector suggestions with element counts
- Sample content from found elements

## 🎮 Interactive Mode

Start an interactive session for rapid testing:

```bash
chromancer interactive

# In the session:
> navigate https://example.com
> click button
> type input "text"
> screenshot test.png
> help              # Show all commands
> exit
```

## ⚙️ Configuration

Set persistent defaults:

```bash
# View current config
chromancer config list

# Set defaults
chromancer config set chrome.port 9223
chromancer config set commands.screenshot.fullPage true
chromancer config set ui.colorOutput false

# Reset to defaults
chromancer config reset
```

## 📚 Learning Resources

### Interactive Examples

```bash
# List all example categories
chromancer examples --list

# View specific examples
chromancer examples login       # Authentication patterns
chromancer examples scraping    # Data extraction
chromancer examples testing     # Site testing
chromancer examples forms       # Form automation
```

### Quick Commands for Common Tasks

```bash
# Quick site check - health, performance, accessibility
chromancer quick check example.com

# Quick screenshot
chromancer quick capture https://example.com screenshot.png

# Quick data extraction
chromancer quick extract https://news.site "article h2" --json
```

## 🔧 Advanced Features

### Chrome Profiles

Use different Chrome profiles for different tasks:

```bash
# Personal browsing
chromancer spawn --profile personal

# Work browsing with saved logins
chromancer spawn --profile work
```

### Wait for Login

Handle authentication flows:

```bash
# Navigate and wait for manual login
chromancer wait-for-login https://app.example.com

# With custom ready selector
chromancer wait-for-login https://github.com --ready-selector ".Header-link--profile"
```

### Error Handling in Workflows

```bash
# Continue on error
chromancer run workflow.yml --continue-on-error

# Strict mode (default) - stop on first error
chromancer run workflow.yml --strict
```

## 💡 Smart Error Messages

Chromancer provides helpful error messages with solutions:

```
❌ Element not found: button
💡 Tip: Did you forget to add a class (.) or ID (#) prefix?

Example:
   chromancer click ".button" # for class
   chromancer click "#button" # for ID

📚 Docs: https://chromancer.dev/docs/click#errors
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run working features test
node test/test-working-features.js

# Test with Docker Chrome
docker run -d --name chrome-test -p 9222:9222 zenika/alpine-chrome \
  --no-sandbox --remote-debugging-host=0.0.0.0 --remote-debugging-port=9222
```

## Example Workflows

### Daily Screenshot

```bash
#!/bin/bash
chromancer spawn --headless
chromancer navigate https://dashboard.example.com
chromancer wait --selector ".data-loaded"
chromancer screenshot "dashboard-$(date +%Y%m%d).png"
chromancer stop
```

### Form Testing

```yaml
# test-registration.yml
- navigate: https://app.example.com/register
- fill:
    form:
      firstName: Test
      lastName: User
      email: test@example.com
      password: SecurePass123!
- click: input[name="terms"]
- screenshot: form-filled.png
- click: button[type="submit"]
- wait:
    text: "Registration successful"
```

### API Monitoring

```bash
# Monitor API calls for 30 seconds
chromancer navigate https://app.example.com
chromancer network --filter "/api/" --duration 30000 --output api-calls.json

# Analyze the results
cat api-calls.json | jq '.[] | select(.duration > 1000)'
```

### AI-Powered Web Scraping

```bash
# Extract data with natural language
chromancer ai "extract all product names and prices from this page"
# Automatically saves to timestamped JSON file

# Complex data extraction
chromancer ai "find all news articles, get their titles, dates, and first paragraph"

# Table extraction
chromancer ai "extract the pricing table and save it as CSV"

# Multi-step scraping
chromancer ai "go to the blog section, then extract all post titles and links"

# Or use the default command!
chromancer "scrape all email addresses from this page"
```

## Platform Support

- **Windows**: Full support with automatic Chrome detection
- **macOS**: Supports Chrome, Chromium, and Chrome Canary
- **Linux**: Supports system packages and snap packages
- **Docker**: Works with headless Chrome containers

## Troubleshooting

### Chrome not found

```bash
# Let chromancer find Chrome
chromancer spawn

# Or specify Chrome location
export CHROME_PATH="/path/to/chrome"
```

### Debugging issues

```bash
# Use verbose mode for detailed logs
chromancer navigate https://example.com --verbose

# Check Chrome connection
chromancer quick check localhost
```

### Common Issues

- **Port in use**: Use `chromancer stop` or specify a different port with `--port`
- **Timeouts**: Increase timeout with `--timeout 60000`
- **Selectors not found**: Use `chromancer select` to explore available elements

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © John Lindquist

## Acknowledgments

Chromancer is now powered by [Playwright](https://playwright.dev/) for robust browser automation.
