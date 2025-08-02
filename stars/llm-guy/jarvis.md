---
repo: llm-guy/jarvis
url: 'https://github.com/llm-guy/jarvis'
homepage: ''
starredAt: '2025-07-23T23:21:48Z'
createdAt: '2025-07-23T01:56:03Z'
updatedAt: '2025-08-02T16:03:01Z'
language: Python
license: NA
branch: main
stars: 75
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-08-02T22:32:27.894Z'
description: >-
  Jarvis is a voice-activated, conversational AI assistant powered by a local
  LLM (Qwen via Ollama). It listens for a wake word, processes spoken commands
  using a local language model with LangChain, and responds out loud via TTS. It
  supports tool-calling for dynamic functions like checking the current time.
tags: []
---

# 🧠 Jarvis – Local Voice-Controlled AI Assistant

**Jarvis** is a voice-activated, conversational AI assistant powered by a local LLM (Qwen via Ollama). It listens for a wake word, processes spoken commands using a local language model with LangChain, and responds out loud via TTS. It supports tool-calling for dynamic functions like checking the current time.

---

## 🚀 Features

- 🗣 Voice-activated with wake word **"Jarvis"**
- 🧠 Local language model (Qwen 3 via Ollama)
- 🔧 Tool-calling with LangChain
- 🔊 Text-to-speech responses via `pyttsx3`
- 🌍 Example tool: Get the current time in a given city
- 🔐 Optional support for OpenAI API integration

---


## ▶️ How It Works (`main.py`)

1. **Startup & local LLM Setup**
   - Initializes a local Ollama model (`qwen3:1.7b`) via `ChatOllama`
   - Registers tools (`get_time`) using LangChain

2. **Wake Word Listening**
   - Listens via microphone (e.g., `device_index=0`)
   - If it hears the word **"Jarvis"**, it enters "conversation mode"

3. **Voice Command Handling**
   - Records the user’s spoken command
   - Passes the command to the LLM, which may invoke tools
   - Responds using `pyttsx3` text-to-speech (with optional custom voice)

4. **Timeout**
   - If the user is inactive for more than 30 seconds in conversation mode, it resets to wait for the wake word again.

---

## 🤖 How To Start Jarvis

1. **Install Dependencies**  
   Make sure you have installed all required dependencies listed in `requirements.txt`:
   ```bash
   pip install -r requirements.txt
   ```

2. **Set Up the Local Model**  
   Ensure you have the `qwen3:1.7b` model available in Ollama.

3. **Run Jarvis**  
   Start the assistant by running:
   ```bash
   python main.py
   ```
---

