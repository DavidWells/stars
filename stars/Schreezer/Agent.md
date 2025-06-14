---
repo: Schreezer/Agent
url: 'https://github.com/Schreezer/Agent'
homepage: null
starredAt: '2025-06-09T17:07:21Z'
createdAt: '2025-06-05T06:34:25Z'
updatedAt: '2025-06-13T09:47:39Z'
language: JavaScript
license: NOASSERTION
branch: main
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-06-14T22:31:10.582Z'
description: null
tags: []
---

# Claude Code Telegram Bot

A direct Telegram interface to Claude Code CLI with intelligent output filtering and seamless chat integration.

## Features

- **Direct Claude Code Access**: All messages route directly to Claude Code CLI (no OpenRouter routing)
- **Intelligent Output Cleaning**: LLM-powered filtering removes noise and formats output for mobile chat
- **PTY Session Management**: Full terminal emulation supporting Claude Code's interactive features
- **File Upload Integration**: Upload files via Telegram and access them in Claude Code sessions
- **Session Persistence**: Conversations persist across Claude Code restarts with context preservation
- **Modular Architecture**: Clean, maintainable codebase with separated utility components

## Current Architecture & Flow

```
User Message → MessageHandler → ClaudeCodeManager (PTY) → Claude Code CLI
                                        ↓
User ← OutputCleanerService (LLM) ← SessionManager ← Claude Code Output
```

### Directory Structure

```
openrouter-claude-bot/
├── src/
│   ├── managers/
│   │   ├── ClaudeCodeManager.js    # Claude CLI orchestration via PTY
│   │   └── SessionManager.js       # Session & conversation tracking
│   ├── handlers/
│   │   ├── MessageHandler.js       # Telegram message routing
│   │   └── CallbackHandler.js      # Inline keyboard handling
│   ├── services/
│   │   └── OutputCleanerService.js # LLM-based output filtering
│   ├── utils/
│   │   ├── ClaudeAuthenticator.js  # Claude Code authentication
│   │   ├── PTYSessionHandler.js    # PTY process management
│   │   ├── OutputDetector.js       # Processing state detection
│   │   ├── fileManager.js          # File upload handling
│   │   └── logger.js               # Winston logging
│   └── OpenRouterClaudeBot.js      # Main bot orchestrator
├── config/
│   └── config.js                   # Configuration management
├── telegram-uploads/               # User uploaded files (auto-created)
├── index.js                        # Entry point
└── package.json
```

## Installation

1. **Clone and Setup**:
   ```bash
   cd openrouter-claude-bot
   npm install
   ```

2. **Install Claude Code CLI**:
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

3. **Environment Configuration**:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Create Logs Directory**:
   ```bash
   mkdir logs
   ```

## Configuration

### Required Environment Variables

- `TELEGRAM_BOT_TOKEN`: Your Telegram bot token from @BotFather

### Optional Environment Variables

- `OPENROUTER_API_KEY`: OpenRouter API key for LLM-based output cleaning (recommended)
- `TELEGRAM_AUTHORIZED_CHATS`: Comma-separated chat IDs for access control (leave empty for public access)
- `CLAUDE_INIT_TIMEOUT`: Claude Code initialization timeout in seconds (default: 30)

## Usage

1. **Start the Bot**:
   ```bash
   npm start
   ```

2. **Development Mode**:
   ```bash
   npm run dev
   ```

3. **Telegram Commands**:
   - `/start` - Welcome message and help
   - `/new` - Start fresh conversation (clears session and history)
   - `/status` - Bot and session status
   - `/files` - List uploaded files
   - `/delete <filename>` - Delete specific file
   - `/cleanup` - Delete all files with confirmation
   - `/restart` - Restart Claude Code agent
   - `/interrupt` - Send ESC key to interrupt processing
   - `/cancel` - Cancel active sessions

## How It Works

1. **User sends message** → Directly routed to Claude Code CLI via PTY
2. **Claude Code processes** → Full interactive terminal session with all features
3. **Output generated** → Buffered and detected using ⏺ symbol pattern
4. **LLM cleaning** → OutputCleanerService filters noise using conversation context
5. **Cleaned output** → Delivered to user via Telegram with proper formatting

## Key Components

### ClaudeCodeManager
- Orchestrates Claude CLI interactions using PTY sessions
- Manages agent lifecycle and intelligent output detection
- Handles authentication and command routing
- Uses modular utility components (ClaudeAuthenticator, PTYSessionHandler, OutputDetector)

### SessionManager
- Tracks Claude Code sessions and conversation history
- Manages file uploads and storage per chat
- Provides session statistics and cleanup
- Maintains conversation context for LLM cleaning

### OutputCleanerService
- Uses LLM (Gemini 2.5 Flash) to intelligently filter Claude Code output
- Removes noise, ANSI codes, progress indicators, and duplicate content
- Formats output for mobile chat consumption
- Considers conversation context for better cleaning decisions

### MessageHandler
- Routes all Telegram messages directly to Claude Code
- Handles file uploads and command processing
- Manages user responses to Claude Code questions
- Coordinates output cleaning and delivery

### Utility Components
- **ClaudeAuthenticator**: Handles Claude Code CLI authentication flow
- **PTYSessionHandler**: Manages PTY process creation and communication
- **OutputDetector**: Detects Claude Code processing state and completion patterns
- **FileManager**: Handles file uploads to `./telegram-uploads/chat_<id>/`

## Logging

Logs are written to both console and file (`logs/openrouter-claude-bot.log`). Log level can be configured via `LOG_LEVEL` environment variable.

## Technical Features

### PTY Integration
- Uses `node-pty` for full terminal emulation
- Supports interactive prompts and questions
- Handles ANSI codes and escape sequences
- Real-time output streaming with intelligent buffering

### Output Processing Pipeline
1. **Buffer Management**: Collects Claude output in chunks
2. **Smart Detection**: Identifies when Claude is waiting vs. still processing using ⏺ symbol
3. **LLM Cleaning**: Filters noise, combines related outputs, formats for mobile
4. **Telegram Delivery**: Handles message chunking and formatting

### Session Management
- **Context Preservation**: Sessions persist even when Claude Code exits
- **Automatic Restart**: Completed sessions automatically restart when user sends new messages
- **One session per chat**: New Claude sessions automatically terminate existing ones
- **File Integration**: Uploaded files are saved to `./telegram-uploads/chat_<id>/` and made available to Claude

### Error Handling
- Graceful shutdown with cleanup of all Claude processes
- Automatic session recovery with context preservation
- Comprehensive error logging with Winston
- Modular error handling in separate utility components

## Contributing

1. Follow the existing modular architecture
2. Add proper error handling and logging
3. Update documentation for new features
4. Test with various Telegram scenarios

## License

Apache License 2.0 - see LICENSE file for details.

This project is licensed under the Apache License 2.0, which allows for commercial use, modification, and distribution while requiring attribution to the original work. See the NOTICE file for attribution requirements.
