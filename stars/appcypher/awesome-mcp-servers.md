---
repo: appcypher/awesome-mcp-servers
url: 'https://github.com/appcypher/awesome-mcp-servers'
homepage: ''
starredAt: '2025-01-02T22:57:35Z'
createdAt: '2024-11-28T23:53:45Z'
updatedAt: '2025-02-25T18:53:33Z'
language: null
license: NA
branch: main
stars: 850
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:32.570Z'
description: Awesome MCP Servers - A curated list of Model Context Protocol servers
tags:
  - ai
  - anthropic-claude
  - awesome
  - context
  - mcp
  - model-context-protocol
  - servers
  - tool-use
  - tools
---

# Awesome MCP Servers ![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)

A curated list of awesome Model Context Protocol (MCP) servers. MCP is an open protocol that enables AI models to securely interact with local and remote resources through standardized server implementations. This list focuses on production-ready and experimental MCP servers that extend AI capabilities through file access, database connections, API integrations, and other contextual services.

<br />

## Supported Clients

|                                                                                                                                                                                          | MCP Host                                                                    | Documentation                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [<div align="center"><img src="https://claude.ai/favicon.ico" height="20"/></div>](https://www.claudedesktop.com/)                                                                       | [Claude Desktop](https://www.claudedesktop.com/)                            | [Claude x MCP](https://modelcontextprotocol.io/quickstart)                                           |
| [<div align="center"><img src="https://zed.dev/_next/static/media/zed-logo.11b2d662.png" height="20"/></div>](https://zed.dev/)                                                          | [Zed Editor](https://zed.dev/)                                              | [Zed x MCP](https://zed.dev/blog/mcp)                                                      |
| [<div align="center"><img src="https://storage.googleapis.com/sourcegraph-assets/docs/images/cody/cody-logomark-default.svg" height="20"/></div>](https://sourcegraph.com/cody)          | [Sourcegraph Cody](https://sourcegraph.com/cody)                            | [Cody x MCP](https://sourcegraph.com/blog/cody-supports-anthropic-model-context-protocol) |
| [<div align="center"><img src="https://cdn.prod.website-files.com/663e06c56841363663ffbbcf/664c918ec47bacdd3acdc167_favicon%408x.png" height="20"/></div>](https://sourcegraph.com/cody) | [Continue](https://www.continue.dev/)                                       | [Continue x MCP](https://blog.continue.dev/model-context-protocol)                                  |
| [<div align="center"><img src="https://github.com/user-attachments/assets/211d0c2b-04de-471e-b1ed-97da94a58d82" height="20"/></div>](https://github.com/Upsonic/gpt-computer-assistant)  | [GPT Computer Assistant](https://github.com/Upsonic/gpt-computer-assistant) | [GCA x MCP](https://github.com/Upsonic/gpt-computer-assistant)                                      |
| [<div align="center"><img src="https://raw.githubusercontent.com/danny-avila/LibreChat/0855677a36d76cafa5e064b7e346eb3f74c6af2a/client/public/assets/logo.svg" height="20"/></div>](https://www.librechat.ai/) | [LibreChat](https://www.librechat.ai/) | [LibreChat Agents x MCP](https://www.librechat.ai/docs/features/agents#model-context-protocol-mcp) |
| [<div align="center"><img src="https://cursor.com/favicon.ico" height="20"/></div>](https://www.cursor.com/) | [Cursor](https://www.cursor.com/) | [Cursor x MCP](https://docs.cursor.com/advanced/model-context-protocol) |
| [<div align="center"><img src="https://www.enconvo.com/favicon.ico" height="20"/></div>](https://www.enconvo.com/) | [Enconvo](https://www.enconvo.com/) | [Enconvo x MCP](https://docs.enconvo.com/docs/features/model-context-protocol) |

<br />

## Server Implementations

- 📂 - [File Systems](#file-systems)
- 🔄 - [Version Control](#version-control)
- ☁️ - [Cloud Storage](#cloud-storage)
- 🗄️ - [Databases](#databases)
- 💬 - [Communication](#communication)
- 📈 - [Monitoring](#monitoring)
- 🔍 - [Search & Web](#search-web)
- 🗺️ - [Location Services](#location-services)
- 🎯 - [Marketing](#marketing)
- 📝 - [Note Taking](#note-taking)
- ⚡ - [Cloud Platforms](#cloud-platforms)
- 🤖 - [System Automation](#system-automation)
- 📱 - [Social Media](#social-media)
- 💹 - [Finance](#finance)
- 🧬 - [Research & Data](#research-data)
- 🤝 - [AI Services](#ai-services)
- 📦 - [Virtualization](#virtualization)
- 💻 - [Development Tools](#development-tools)
- 📊 - [Data Visualization](#data-visualization)
- 🆔 - [Identity](#identity)

<sup><details>

<summary>Legend</summary>

- <sup>⭐</sup> Official protocol implementation
- <sup>1</sup> First implementation (when multiple implementations exist)
- <sup>2</sup> Second implementation
- <sup>3</sup> Third implementation
- <sup>n</sup> Subsequent implementations
</details></sup>

<br />

## Tools & Utilities

See [Helpful Tools & Utilities](#helpful-tools-&-utilities) section for tools to help manage, configure, and work with MCP servers.

<br />

## 📂 <a name="file-systems"></a>File Systems

> Provides direct access to local file systems with configurable permissions. Enables AI models to read, write, and manage files within specified directories.

- <img src="https://cdn.simpleicons.org/files/2196F3" height="14"/> [FileSystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)<sup><sup>1</sup></sup> - Direct local file system access
- <img src="https://cdn.simpleicons.org/files/4A90E2" height="14"/> [FileSystem](https://github.com/mark3labs/mcp-filesystem-server)<sup><sup>2</sup></sup> - Golang implementation for local file system access
- <img src="https://cdn.simpleicons.org/files/4CAF50" height="14"/> [Everything Search](https://github.com/mamertofabian/mcp-everything-search) - Lightning-fast Windows file search powered by Everything SDK
- <img src="https://cdn.simpleicons.org/files/4CAF50" height="14"/> [llm-context](https://github.com/cyberchitta/llm-context.py) - Share code context with LLMs via Model Context Protocol or clipboard

<br />

## 🔄 <a name="version-control"></a>Version Control

> Interact with Git repositories and version control platforms. Enables repository management, code analysis, pull request handling, issue tracking, and other version control operations through standardized APIs.

- <img src="https://cdn.simpleicons.org/github/8A8A8A" height="14"/> [GitHub](https://github.com/modelcontextprotocol/servers/tree/main/src/github) - GitHub API integration for repository management, PRs, issues, and more
- <img src="https://cdn.simpleicons.org/gitlab/FC6D26" height="14"/> [GitLab](https://github.com/modelcontextprotocol/servers/tree/main/src/gitlab) - GitLab platform integration for project management and CI/CD operations
- <img src="https://cdn.simpleicons.org/git/F05032" height="14"/> [Git](https://github.com/modelcontextprotocol/servers/tree/main/src/git) - Direct Git repository operations including reading, searching, and analyzing local repositories
- <img src="https://cdn.simpleicons.org/phabricator/5865F2" height="14"/> [Phabricator](https://github.com/baba786/phabricator-mcp-server) - Phabricator API integration for repository and project management

<br />

## ☁ <a name="cloud-storage"></a>Cloud Storage

> Access and manage files stored in cloud storage platforms. Enables searching, reading, and organizing cloud-stored documents and data.

- <img src="https://cdn.simpleicons.org/googledrive/4285F4" height="14"/> [Google Drive](https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive) - Google Drive integration for file access, search, and management

<br />

## 🗄️ <a name="databases"></a>Databases

> Secure database access with schema inspection capabilities. Enables querying and analyzing data while maintaining read-only safety by default.

- <img src="https://cdn.simpleicons.org/postgresql/5865F2" height="14"/> [PostgreSQL](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres) - PostgreSQL database integration with schema inspection and query capabilities
- <img src="https://cdn.simpleicons.org/sqlite/0F80CC" height="14"/> [SQLite](https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite) - SQLite database operations with built-in analysis features
- <img src="https://cdn.simpleicons.org/duckdb/FDC000" height="14"/> [DuckDB](https://github.com/ktanaka101/mcp-server-duckdb) - DuckDB database integration with schema inspection and query capabilities
- <img src="https://cdn.simpleicons.org/googlebigquery/669DF6" height="14"/> [BigQuery](https://github.com/LucasHild/mcp-server-bigquery)<sup><sup>1</sup></sup> - BigQuery database integration with schema inspection and query capabilities
- <img src="https://cdn.simpleicons.org/googlebigquery/669DF6" height="14"/> [BigQuery](https://github.com/ergut/mcp-bigquery-server)<sup><sup>2</sup></sup> - A BigQuery MCP server for read-only SQL queries and schema exploration (available on npm)
- <img src="https://neon.tech/favicon.ico" height="14"/> [Neon](https://github.com/neondatabase/mcp-server-neon)<sup><sup>⭐</sup></sup> - Neon MCP Server. Allows natural language interactions with Neon for database management.
- <img src="https://qdrant.tech/img/brand-resources-logos/logomark.svg" height="14"/> [Qdrant](https://github.com/qdrant/mcp-server-qdrant/)<sup><sup>⭐</sup></sup> - A Qdrant MCP server for keeping and retrieving memories in the Qdrant vector search engine.
- <img src="https://cdn.simpleicons.org/mongodb/47A248" height="14"/> [MongoDB](https://github.com/kiliczsh/mcp-mongo-server) - A Model Context Protocol Server for querying and analyzing MongoDB collections.
- <img src="https://cdn.simpleicons.org/mysql" height="14"/> [MySQL](https://github.com/designcomputer/mysql_mcp_server) - MySQL database integration with configurable access controls and schema inspection
- <img src="https://cdn.simpleicons.org/airtable" height="14"/> [Airtable](https://github.com/domdomegg/airtable-mcp-server) - Read and write access to Airtable databases, with schema inspection.
- <img src="https://cdn.simpleicons.org/snowflake" height="14"/> [Snowflake](https://github.com/isaacwasserman/mcp-snowflake-server) - Snowflake database integration with read/write capabilities and insight tracking.
- <img src="https://jiejue.obs.ap-southeast-1.myhuaweicloud.com/20250209205317622.webp" height="14"/> [DBUtils](https://github.com/donghao1393/mcp-dbutils) - A unified database access service for MCP that seamlessly integrates PostgreSQL and SQLite with a clean abstraction layer.

<br />

## 💬 <a name="communication"></a>Communication

> Integration with communication platforms for message management and channel operations. Enables AI models to interact with team communication tools.

- <img src="https://cdn.simpleicons.org/slack/E01E5A" height="14"/> [Slack](https://github.com/modelcontextprotocol/servers/tree/main/src/slack) - Slack workspace integration for channel management and messaging
- <img src="https://cdn.simpleicons.org/linear/5E6AD2" height="14"/> [Linear](https://github.com/jerhadf/linear-mcp-server) - Linear MCP Server. Provides integration with Linear's issue tracking system through MCP.

<br />

## 📈 <a name="monitoring"></a>Monitoring

> Access and analyze application monitoring data. Enables AI models to review error reports and performance metrics.

- <img src="https://cdn.simpleicons.org/sentry/546E7A" height="14"/> [Sentry](https://github.com/modelcontextprotocol/servers/tree/main/src/sentry) - Sentry.io integration for error tracking and performance monitoring
- <img src="https://raygun.com/favicon.ico" height="14"/> [Raygun](https://github.com/MindscapeHQ/mcp-server-raygun) - Raygun API V3 integration for crash reporting and real user monitoring
- <img src="https://metoro.io/static/images/logos/Metoro.svg" height="14"/> **[Metoro](https://github.com/metoro-io/metoro-mcp-server)** - Query and interact with kubernetes environments monitored by Metoro

<br />

## 🔍 <a name="search-web"></a>Search & Web

> Web content access and automation capabilities. Enables searching, scraping, and processing web content in AI-friendly formats.

- <img src="https://cdn.simpleicons.org/puppeteer/00D8A2" height="14"/> [Puppeteer](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer) - Browser automation for web scraping and interaction
- <img src="https://cdn.simpleicons.org/brave/FB542B" height="14"/> [Brave Search](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search) - Web search capabilities using Brave's Search API
- <img src="https://cdn.simpleicons.org/curl/00ADD8" height="14"/> [Fetch](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch) - Efficient web content fetching and processing for AI consumption
- <img src="https://cdn.simpleicons.org/kagi/4173FF" height="14"/> [Kagi Search](https://github.com/ac3xx/mcp-servers-kagi) - TypeScript-based MCP server that integrates the Kagi Search API
- <img src="https://www.tryleap.ai/assets/integrations/exa.svg" height="14"/> [Exa Search](https://github.com/exa-labs/exa-mcp-server)<sup><sup>⭐</sup></sup> - Integration with Exa AI Search API for real-time web information retrieval
- <img src="https://cdn.simpleicons.org/newyorktimes/E34234" height="14"/> [NYTimes](https://github.com/angheljf/nyt) - Search articles using the NYTimes API
- <img src="https://cdn.simpleicons.org/googlenews/4285F4" height="14"/> [Google News](https://github.com/ChanMeng666/server-google-news) - Google News search with automatic categorization, multi-language support, and comprehensive search options
- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/800px-Vector_search_icon.svg.png" height="14"/> [Search1API](https://github.com/fatwang2/search1api-mcp) - Search via search1api (requires paid API key)
- <img src="https://tavily.com/favicon.ico" height="14"/> [Tavily](https://github.com/Tomatio13/mcp-server-tavily) - Tavily AI search API integration
- <img src="https://cdn.simpleicons.org/arxiv/B31B1B" height="14"/> [ArXiv](https://github.com/blazickjp/arxiv-mcp-server) - Search ArXiv research papers
- <img src="https://playwright.dev/img/playwright-logo.svg" height="14"/> [Playwright](https://github.com/executeautomation/mcp-playwright) - A Model Context Protocol server that provides browser automation capabilities using Playwright.

<br />

## 🗺️ <a name="location-services"></a>Location Services

> Geographic and location-based services integration. Enables access to mapping data, directions, and place information.

- <img src="https://cdn.simpleicons.org/googlemaps/4285F4" height="14"/> [Google Maps](https://github.com/modelcontextprotocol/servers/tree/main/src/google-maps) - Google Maps integration for location services, routing, and place details

<br />

## 🎯 <a name="marketing"></a>Marketing

> Tools that help marketers write better content and run better campaigns.

- <img src="https://openstrategypartners.com/fileadmin/Bilder/logo/OSP_logo_colors_green1.png" height="14"/> [Open Strategy Partners Marketing Tools](https://github.com/open-strategy-partners/osp_marketing_tools)<sup><sup>⭐</sup></sup> - a standardized editing code system, writing guidelines, web metadata generator, and product communication framework.

<br />

## 📝 <a name="note-taking"></a>Note Taking

> Integration with note-taking applications and personal knowledge management tools. Enables access to notes, documents, and personal information stores.

- <img src="https://cdn.simpleicons.org/obsidian/7C3AED" height="14"/> [Obsidian](https://github.com/MarkusPfundstein/mcp-obsidian)<sup><sup>1</sup></sup> - Obsidian vault integration with tools for file management, search, and content manipulation
- <img src="https://cdn.simpleicons.org/obsidian/7C3AED" height="14"/> [Obsidian](https://github.com/calclavia/mcp-obsidian)<sup><sup>2</sup></sup> - Alternative implementation for reading and searching Markdown notes
- <img src="https://cdn.simpleicons.org/notion/787878" height="14"/> [Notion](https://github.com/danhilse/notion_mcp)<sup><sup>1</sup></sup> - Notion API integration for managing personal todo lists and notes
- <img src="https://cdn.simpleicons.org/notion/787878" height="14"/> [Notion](https://github.com/suekou/mcp-notion-server)<sup><sup>2</sup></sup> - Alternative implementation for Notion API integration
- <img src="https://cdn.simpleicons.org/apple/999999" height="14"/> [Apple Notes](https://github.com/sirmews/apple-notes-mcp) - Read from local Apple Notes database (macOS only)
- <img src="https://cdn.simpleicons.org/todoist/E44332" height="14"/> [Todoist](https://github.com/abhiz123/todoist-mcp-server) - An MCP server implementation for Todoist, enabling natural language task management.

<br />

## ⚡ <a name="cloud-platforms"></a>Cloud Platforms

> Cloud platform service integration. Enables management and interaction with cloud infrastructure and services.

- <img src="https://cdn.simpleicons.org/cloudflare/F38020" height="14"/> [Cloudflare](https://github.com/cloudflare/mcp-server-cloudflare)<sup><sup>⭐</sup></sup> - Integration with Cloudflare services including Workers, KV, R2, and D1
- <img src="https://cdn.simpleicons.org/kubernetes/326CE5" height="14"/> [Kubernetes](https://github.com/strowk/mcp-k8s-go) - Kubernetes cluster operations through MCP
- <img src="https://tinybird.co/favicon.ico" height="14"/> [Tinybird](https://github.com/tinybirdco/mcp-tinybird)<sup><sup>⭐</sup></sup> - Interact with a Tinybird Workspace from any MCP client.

<br />

## 🤖 <a name="system-automation"></a>System Automation

> Tools for shell access, system control, and task automation. Enables AI models to execute commands and interact with the operating system.

- <img src="https://api.iconify.design/mdi:console.svg?color=%2390EE90" height="14"/> [Shell](https://github.com/rusiaaman/wcgw) - Autonomous shell execution and computer control (Mac)
- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Windows_logo_-_2021.svg/1024px-Windows_logo_-_2021.svg.png" height="14"/> [Windows CLI](https://github.com/SimonB97/win-cli-mcp-server) - Windows CLI MCP Server for secure command-line interactions on Windows systems, enabling controlled access to PowerShell, CMD, and Git Bash shells.
- <img src="https://cdn.simpleicons.org/gnometerminal/2196F3" height="14"/> [Command Line](https://github.com/phialsbasement/cmd-mcp-server) - MCP server allowing any and all command execution over CMD(BE CAREFUL).
- <img src="https://cdn.simpleicons.org/apple/999999" height="14"/> [Apple Shortcuts](https://github.com/recursechat/mcp-server-apple-shortcuts) - An MCP Server Integration with Apple Shortcuts

<br />

## 📱 <a name="social-media"></a>Social Media

> Integration with social media platforms and content sharing services. Enables interaction with social networks and content platforms.

- <img src="https://cdn.simpleicons.org/bluesky/0085FF" height="14"/> [BlueSky](https://github.com/keturiosakys/bluesky-context-server) - Bluesky API integration for querying and searching feeds and posts
- <img src="https://cdn.simpleicons.org/youtube/FF0000" height="14"/> [YouTube](https://github.com/anaisbetts/mcp-youtube)<sup><sup>1</sup></sup> - YouTube integration using yt-dlp for subtitle downloading and video analysis
- <img src="https://cdn.simpleicons.org/youtube/FF0000" height="14"/> [YouTube](https://github.com/kimtaeyoon83/mcp-server-youtube-transcript)<sup><sup>2</sup></sup> - Alternative implementation for fetching YouTube subtitles and transcripts
- <img src="https://cdn.simpleicons.org/spotify/1DB954" height="14"/> [Spotify](https://github.com/varunneal/spotify-mcp) - Connects with Spotify for playback control and track/album/artist/playlist management.

<br />

## 💹 <a name="finance"></a>Finance

> Financial data and cryptocurrency information services.

- <img src="https://cdn.simpleicons.org/coinmarketcap/FF8C00" height="14"/> [CoinMarket](https://github.com/anjor/coinmarket-mcp-server) - Coinmarket API integration for cryptocurrency data
- <img src="https://cdn.simpleicons.org/stripe" height="14"/> [Stripe](https://github.com/stripe/agent-toolkit/tree/main)<sup><sup>⭐</sup></sup> - Allows you to integrate with Stripe APIs

<br />

## 🧬 <a name="research-data"></a>Research & Data

> Access to research papers, genetic data, and specialized datasets.

- <img src="https://cdn.simpleicons.org/arxiv/B31B1B" height="14"/> [ArXiv](https://github.com/blazickjp/arxiv-mcp-server) - Search ArXiv research papers
- <img src="https://api.iconify.design/mdi:dna.svg?color=%23E34234" height="14"/> [Ancestry](https://github.com/reeeeemo/ancestry-mcp) - Read .ged files and genetic data

<br />

## 🤝 <a name="ai-services"></a>AI Services

> Integration with AI and machine learning services.

- <img src="https://cdn.simpleicons.org/openai/00A67E" height="14"/> [OpenAI](https://github.com/pierrebrunelle/mcp-server-openai) - Query OpenAI models directly from Claude using MCP protocol
- <img src="https://cdn.simpleicons.org/openai/00A67E" height="14"/> [OpenAI Compatible Chat](https://github.com/pyroprompts/any-chat-completions-mcp) - Chat with models from OpenAI-compatible APIs (Perplexity, Groq, xAI, etc.)
- <img src="https://cdn.simpleicons.org/perplexity" height="14"/> [Perplexity](https://github.com/tanigami/mcp-server-perplexity) Chat with Perplexity via MCP
- <img src="https://cloud.llamaindex.ai/favicon.ico" height="14"/> [LlamaCloud](https://github.com/run-llama/mcp-server-llamacloud) - LlamaCloud MCP Server. A TypeScript-based MCP server connecting to a managed index on LlamaCloud.
- <img src="https://huggingface.co/favicon.ico" height="14"/> [HuggingFace Spaces](https://github.com/evalstate/mcp-hfspace) - Use HuggingFace spaces from your MCP Client. Supports Images, Audio, Text and more.
- <img src="https://piapi.ai/piapi_favicon.webp" height="14"> [PiAPI](https://github.com/apinetwork/piapi-mcp-server) - PiAPI MCP server makes user able to generate media content with Midjourney/Flux/Kling/Hunyuan/Udio/Trellis directly from Claude or any other MCP-compatible apps.
<br />

## 📦 <a name="virtualization"></a>Virtualization

> Secure sandbox environments for code execution and testing. Enables safe execution of code snippets and development workflows.

- <img src="https://e2b.dev/favicon.ico" height="14"/> [E2B](https://github.com/e2b-dev/mcp-server)<sup><sup>⭐</sup></sup> - Secure cloud development environments for AI agents. Enables safe code execution and testing in isolated containers.
- <img src="https://cdn.simpleicons.org/docker/0db7ed" height="14"/> [Docker](https://github.com/QuantGeekDev/docker-mcp) - An MCP server for Docker operations, enabling seamless container and compose stack management.

<br />

## 💻 <a name="development-tools"></a>Development Tools

> Tools and servers that assist with software development workflows. Enables integration with development-related services and APIs.

- <img src="https://raw.githubusercontent.com/open-rpc/design/master/icons/open-rpc-logo-noText/open-rpc-logo-noText%20(PNG)/256x256.png" height="14"/> [OpenRPC](https://github.com/shanejonas/openrpc-mpc-server) - A Model Context Protocol server that provides JSON-RPC functionality through OpenRPC.
- <img src="https://cdn.simpleicons.org/postman" height="14" /> [Postman](https://github.com/delano/postman-mcp-server) - Interact with [Postman API](https://www.postman.com/postman/postman-public-workspace/).
- <img src="https://raw.githubusercontent.com/marimo-team/marimo/main/docs/_static/marimo-logotype-thick.svg" height="14" /> [marimo](https://github.com/marimo-team/codemirror-mcp)<sup><sup>⭐</sup></sup> - CodeMirror extension that implements the Model Context Protocol (MCP) for resource mentions and prompt commands.
- <img src="https://static.figma.com/app/icon/1/favicon.ico" height="14" /> [Figma](https://github.com/GLips/Figma-Context-MCP) - Paste a link to your Figma design to get its data in a ready-to-implement format.

<br />

## 📊 <a name="data-visualization"></a>Data Visualization

> Tools for creating and managing data visualizations. Enables generation of charts, graphs, and other visual representations of data.

- <img src="https://vega.github.io/favicon.ico" height="14"/> [VegaLite](https://github.com/isaacwasserman/mcp-vegalite-server) - Generate visualizations from fetched data using the VegaLite format and renderer

<br />

## 🆔 <a name="identity"></a>Identity

> Tools for identity and access management. Enables user authentication, authorization.

- <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Keycloak_Logo.png" height="14"/> [Keycloak](https://github.com/ChristophEnglisch/keycloak-model-context-protocol) - MCP server implementation for managing Keycloak users, groups, and realms using natural language queries.

<br />

# Tools & Utilities

> Tools that help manage, configure, and work with MCP servers. These utilities simplify the installation process and improve the user experience.

### Server Managers

- [mcp-get](https://github.com/michaellatman/mcp-get) - CLI tool for installing and managing MCP servers. Simplifies server installation and configuration for Claude Desktop.
  - Supports NPM-based servers
  - Automatic configuration generation
  - Easy server management
- [Remote MCP](https://github.com/ssut/Remote-MCP) - Solution to Remote MCP Communication, enabling effortless integration for centralized management of Model Context

<br />

Please read the [contribution guidelines](CONTRIBUTING.md) if you want to contribute.

---

### License

[![CC0](http://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, [Stephen Akinyemi](https://github.com/appcypher) has waived all copyright and related or neighboring rights to this work.
