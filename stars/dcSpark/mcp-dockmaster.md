---
repo: dcSpark/mcp-dockmaster
url: 'https://github.com/dcSpark/mcp-dockmaster'
homepage: 'https://mcp-dockmaster.com'
starredAt: '2025-06-13T21:41:49Z'
createdAt: '2025-02-21T19:23:58Z'
updatedAt: '2025-06-13T21:41:49Z'
language: Rust
license: MIT
branch: main
stars: 65
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-06-14T22:31:09.633Z'
description: >-
  MCP Dockmaster allows you to easily install and manage MCP servers. Available
  for Mac, Windows and Linux as a Desktop App, CLI and a library.
tags:
  - ai
  - crypto
  - mcp
  - tools
---

# 🚀 MCP Dockmaster

> **The Ultimate AI Tool Manager** - Install, manage, and supercharge your AI assistants with the power of Model Context Protocol (MCP)

[![Demo Video](assets/dockmaster-screenshot.png)](https://mcp-dockmaster.com/dockmaster-demo.mp4)

## ✨ What is MCP Dockmaster?

MCP Dockmaster transforms how you work with AI assistants like Claude by giving them superpowers through **Model Context Protocol (MCP) servers**. Think of it as an App Store for AI tools that seamlessly integrates with your favorite AI assistants.

🎯 **One-Click Installation** → Browse, install, and manage MCP servers  
🔗 **Auto-Integration** → Automatically connects with Claude and other MCP-compatible AI assistants  
🌐 **Multi-Platform** → Available as Desktop App, CLI, and library for Mac, Windows, and Linux  
⚡ **Zero Config** → Works out of the box with automatic setup and updates  

### 🔥 Key Features

- **🛍️ AI Tool Marketplace** - Discover and install powerful MCP servers from our curated store
- **🔧 Smart Management** - Install, update, and remove AI tools with a simple click
- **🎨 Beautiful Interface** - Modern, intuitive desktop app built with Tauri + React
- **🚀 Lightning Fast** - Rust-powered backend for blazing performance
- **🔌 Universal Compatibility** - Supports Node.js, Python, and Docker-based AI tools
- **⚙️ Advanced Configuration** - Fine-tune settings for power users

## 🎬 See It In Action

**[📺 Watch Demo Video](https://mcp-dockmaster.com/dockmaster-demo.mp4)**

Experience how MCP Dockmaster transforms your AI workflow in under 2 minutes!

## 🚀 Quick Start

### 💻 Desktop App (Recommended)

1. **Download** the latest release for your platform from [mcp-dockmaster.com](https://mcp-dockmaster.com/)
2. **Install** and launch MCP Dockmaster
3. **Browse** the AI Tool Store and install your first MCP server
4. **Integrate** Follow the integration steps at home to connect the app with Claude, Cursor, or any other supported app—and enjoy you AI with superpowers!

### 🔨 Development Setup

Want to contribute or run from source? Here's how:

#### Prerequisites
- **Node.js** v18+ 
- **Rust** (for Tauri development)
- **Git**

#### Get Started
```bash
# Clone the repository
git clone https://github.com/your-username/mcp-dockmaster.git
cd mcp-dockmaster

# Install dependencies
npm ci

# Start the desktop app in development mode
npx nx serve mcp-dockmaster
```

#### Available Commands
```bash
# 🖥️ Desktop App Development
npx nx serve mcp-dockmaster               # Start desktop app with hot reload

# 🧪 Testing & Quality
npx nx run-many -t test                   # Run all tests
```

## 🏗️ Architecture

MCP Dockmaster is built as a modern monorepo with multiple specialized applications:

```
📦 mcp-dockmaster/
├── 🖥️ apps/mcp-dockmaster/        # Main desktop app (Tauri + React)
├── 💻 apps/mcp-dockmaster-cli/    # Command-line interface  
├── 🔄 apps/mcp-proxy-server/      # MCP proxy server
├── 🌐 apps/mcp-server-hello-world/ # Example MCP server
└── 📚 libs/mcp-core/              # Shared Rust libraries
```

## 🤝 Contributing

We love contributions! Whether you're:
- 🐛 **Reporting bugs**
- 💡 **Suggesting features** 
- 📝 **Improving documentation**
- 🔧 **Writing code**

Check out our [Contributing Guide](CONTRIBUTING.md) to get started!

## 📖 Learn More

- 📚 [Model Context Protocol Docs](https://modelcontextprotocol.io/docs)
- 🎯 [MCP Server Examples](https://github.com/modelcontextprotocol/servers)
- 💬 [Community Discord](https://discord.gg/mcp)
- 🐛 [Report Issues](https://github.com/your-username/mcp-dockmaster/issues)

## 📄 License

This project is licensed under the [MIT License](LICENSE.md) - see the file for details.

---

<div align="center">

**⭐ Star this repo if MCP Dockmaster powers up your AI workflow!**

Made with ❤️ by the MCP Dockmaster team

</div>
