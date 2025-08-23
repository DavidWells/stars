---
repo: charles-adedotun/notifications-mcp-server
url: 'https://github.com/charles-adedotun/notifications-mcp-server'
homepage: ''
starredAt: '2025-08-06T20:00:46Z'
createdAt: '2025-03-16T23:20:46Z'
updatedAt: '2025-08-20T16:30:36Z'
language: Python
license: MIT
branch: main
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-08-23T22:30:26.887Z'
description: >-
  A Model Context Protocol (MCP) server that provides notifications for Claude
  Desktop on macOS. It plays configurable system sounds when Claude completes a
  task, enhancing user experience by eliminating the need for constant visual
  monitoring.
tags:
  - claude
  - llm-tools
  - macos
  - mcp
  - notification-system
---

# Claude Notification Server

A lightweight MCP server that provides both auditory and visual notifications for Claude Desktop on macOS. This server lets you know when Claude starts processing your request and when it has completed a task.

## Features

- 🔔 Different sound notifications at the beginning and end of Claude responses
- 💻 Compatible with macOS native system sounds (`.aiff` files)
- 🎵 Easily customizable notification sounds via environment variables
- 🔔 Visual desktop notifications through macOS Notification Center
- 🖼️ Custom icons for visual notifications
- 🚀 Simple setup with minimal dependencies
- 📱 Multiple notification methods with fallbacks (PyObjC, pync, AppleScript, terminal-notifier)

## Installation and Setup

### Prerequisites
- macOS (notifications rely on macOS-specific features)
- Python 3.8 or higher
- Claude Desktop application

### Quick Install

1. **Clone the repository:**
   ```bash
   git clone https://github.com/charles-adedotun/notifications-mcp-server.git
   cd notifications-mcp-server
   ```

2. **Install uv (if not already installed):**
   ```bash
   # Option 1: Using curl
   curl -LsSf https://astral.sh/uv/install.sh | sh
   
   # Option 2: Using Homebrew
   brew install uv
   ```

3. **Install the package and dependencies:**
   ```bash
   # Install the package in development mode
   uv pip install -e .
   
   # Or install directly from the repository
   uv pip install git+https://github.com/charles-adedotun/notifications-mcp-server.git
   
   # Install visual notification dependencies (recommended)
   uv pip install pyobjc-core pyobjc-framework-Cocoa
   ```

4. **Test the installation:**
   ```bash
   # Run the test script to verify notifications are working
   uv run python test_notification.py
   
   # Run the notification server directly
   uv run claude-notifications
   ```

5. **Configure Claude Desktop:**

   Edit Claude's configuration to include the notification server:

   ```json
   {
     "mcpServers": {
       "notify-user": {
         "command": "uv",
         "args": [
           "run",
           "--with",
           "fastmcp",
           "fastmcp",
           "run",
           "/path/to/server.py"
         ]
       }
     }
   }
   ```
   
   Replace `/path/to/server.py` with the absolute path to the server.py file on your system.
   
   If the `mcpServers` object already exists, just add this new server configuration to it.

6. **Restart Claude Desktop**

7. **Test the notifications:**
   ```bash
   uv run python test_notification.py
   ```
   This will test all available notification methods and help diagnose any issues.

## How It Works

Once installed, the server automatically connects with Claude Desktop and offers the `task_status` notification tool. Claude will call this tool at the start and end of each interaction, producing both audible and visual notifications.

### Architecture

```
┌─────────────────┐     MCP Protocol      ┌─────────────────┐     System Command    ┌─────────────┐
│                 │ ──────────────────>   │                 │ ──────────────────>   │ macOS Sound │
│  Claude Desktop │                       │   Notification  │                       │    System   │
│   Application   │ <──────────────────   │   MCP Server    │ <──────────────────   │             │
│                 │                       │                 │                       └─────────────┘
                                          │                 │                       ┌───────────-──┐
                                          │                 │ ──────────────────>   │ macOS        │
                                          │                 │                       │ Notification │
                                          │                 │ <──────────────────   │ Center       │
                                          └─────────────────┘                       └─────────────-┘
```

The notification server uses multiple methods to deliver visual notifications, with automatic fallbacks:

1. **PyObjC** (native macOS notifications) - Tried first
2. **pync** (if installed) - Tried if PyObjC fails
3. **AppleScript** (works consistently) - Used as fallback
4. **terminal-notifier** (if installed) - Last resort option

This ensures that at least one notification method should work on your system.

## Project Structure

The Claude Notifications MCP Server is now organized into a modular structure:

```
notifications/
├── __init__.py             # Package initialization with version info
├── core/                   # Core functionality
│   ├── __init__.py
│   ├── sound_manager.py    # Sound playback management
│   └── notification_manager.py  # Visual notification management
├── platform/               # Platform-specific implementations
│   ├── __init__.py
│   └── macos/              # macOS-specific code
│       ├── __init__.py
│       ├── sound.py        # macOS sound functions
│       └── notification.py # macOS notification methods
├── utils/                  # Utility functions
│   ├── __init__.py
│   ├── config.py           # Configuration constants and helpers
│   └── logging.py          # Logging setup
└── server.py               # MCP server implementation
```

This modular structure improves maintainability and makes it easier to add support for additional platforms in the future.

## MCP Configuration for LLMs

To configure an LLM to use this notification server, add the following to your MCP configuration:

```json
{
  "notify-user": {
    "command": "uv",
    "args": [
      "run",
      "--with",
      "fastmcp",
      "fastmcp",
      "run",
      "/path/to/server.py"
    ]
  }
}
```

Replace `/path/to/server.py` with the absolute path to the server.py file on your system.

This configuration uses the `uv` command to run the notification server with the required dependencies.

## Customizing Notifications

### Sound Notifications

#### Default Sounds
- Start of task: "Glass.aiff" from macOS system sounds
- End of task: "Hero.aiff" from macOS system sounds

#### Customizing Sounds

```bash
# For start notifications
export CLAUDE_START_SOUND="/System/Library/Sounds/Ping.aiff"

# For completion notifications
export CLAUDE_COMPLETE_SOUND="/System/Library/Sounds/Purr.aiff"

# After setting environment variables, restart the notification server
```

### Visual Notifications

```bash
# Disable visual notifications
export CLAUDE_VISUAL_NOTIFICATIONS="false"

# Set custom notification icon
export CLAUDE_NOTIFICATION_ICON="/path/to/your/custom/icon.png"

# After setting environment variables, restart the notification server
```

### Making Settings Permanent

Add to your shell profile (~/.zshrc, ~/.bashrc, or similar):

```bash
# For different sounds
echo 'export CLAUDE_START_SOUND="/System/Library/Sounds/Ping.aiff"' >> ~/.zshrc
echo 'export CLAUDE_COMPLETE_SOUND="/System/Library/Sounds/Purr.aiff"' >> ~/.zshrc

# For visual notifications
echo 'export CLAUDE_VISUAL_NOTIFICATIONS="true"' >> ~/.zshrc
echo 'export CLAUDE_NOTIFICATION_ICON="/path/to/your/icon.png"' >> ~/.zshrc

source ~/.zshrc
```

### Available System Sounds

macOS provides these built-in sounds in `/System/Library/Sounds/`:

| Sound Name | Description |
|------------|-------------|
| Basso.aiff | Deep, serious tone |
| Blow.aiff | Wind-like sound |
| Bottle.aiff | Bottle pop sound |
| Frog.aiff | Frog croak |
| Funk.aiff | Funky electronic sound |
| Glass.aiff | Glass tapping sound (default) |
| Hero.aiff | Triumphant sound |
| Morse.aiff | Short morse code beep |
| Ping.aiff | Classic ping notification |
| Pop.aiff | Short pop sound |
| Purr.aiff | Gentle purr sound |
| Sosumi.aiff | Apple's classic alert |
| Submarine.aiff | Submarine ping |
| Tink.aiff | Light tink sound |

You can preview these sounds with:
```bash
afplay /System/Library/Sounds/Glass.aiff
```

You can also use your own .aiff files by providing the full path.

## Troubleshooting

### Visual Notifications Not Working

1. **Run the test script:**
   ```bash
   uv run python test_notification.py
   ```
   This comprehensive test will try all notification methods and provide diagnostic information.

2. **Check notification permissions:**
   - Go to System Preferences → Notifications
   - Look for applications that might handle notifications:
     - Python
     - Terminal
     - osascript (AppleScript)
   - Ensure notifications are enabled for these applications
   
   You can open notification preferences directly with:
   ```bash
   open "x-apple.systempreferences:com.apple.preference.notifications"
   ```

3. **Try installing terminal-notifier:**
   ```bash
   brew install terminal-notifier
   ```
   This provides an additional fallback method for notifications.

4. **Check the server logs:**
   - Look for error messages in the terminal where the server is running
   - In Claude Desktop, enable Developer Mode (Help menu → Enable Developer Mode)
   - Check the MCP Log File in the Developer menu

### Sound Notifications Not Working

1. **Verify your macOS sound settings:**
   - Make sure your system volume is not muted
   - Try playing a sound directly: `afplay /System/Library/Sounds/Glass.aiff`

2. **Check custom sound paths:**
   - If you specified custom sounds, make sure the paths are correct
   - Use only `.aiff` files for best compatibility

### Server Not Connecting

1. **Verify Claude Desktop configuration:**
   - Check that the path to the server.py file is correct in claude_desktop_config.json
   - Make sure the server is properly configured in your Claude Desktop settings

2. **Restart everything:**
   - Restart Claude Desktop
   - Restart your computer if necessary

3. **Check dependencies:**
   - Make sure all required packages are installed: `uv pip list | grep fastmcp`
   - Try reinstalling: `uv pip install -e .`

4. **Check the server logs:**
   - Look for error messages in the terminal where the server is running
   - In Claude Desktop, enable Developer Mode (Help menu → Enable Developer Mode)
   - Check the MCP Log File in the Developer menu

## Uninstallation

1. **Remove the repository:**
   ```bash
   rm -rf /path/to/notifications-mcp-server
   ```

2. **If you installed Python packages:**
   ```bash
   # Remove packages installed with uv
   uv pip uninstall notifications-mcp-server fastmcp pyobjc-core pyobjc-framework-Cocoa pync
   ```

## Development

- **Requirements:** Python 3.10+, fastmcp library, notification libraries
- **Running tests with uv:** 
  ```bash
  uv pip install pytest pytest-cov
  pytest
  ```

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Built using the [FastMCP](https://github.com/anthropics/mcp) library from Anthropic
- Special thanks to all contributors and the Claude community
