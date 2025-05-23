---
repo: remorses/ai-fallback
url: 'https://github.com/remorses/ai-fallback'
homepage: null
starredAt: '2024-11-29T22:59:58Z'
createdAt: '2024-11-28T14:38:22Z'
updatedAt: '2025-02-25T07:58:22Z'
language: TypeScript
license: NA
branch: main
stars: 51
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:18.172Z'
description: >-
  Automatically switch AI SDK model provider when one of the providers has
  downtime
tags: []
---

### AI Fallback

Automatically switch between AI model providers when one experiences downtime or errors.

#### Why?

AI providers can encounter:

-   Rate limiting
-   Service outages
-   API errors
-   Capacity issues
-   Timeouts

This package ensures reliability by specifying multiple AI models as fallbacks. It automatically switches to the next available model if the primary fails, maintaining application uptime.

---

### Installation

```bash
npm install ai-fallback
```

---

### Models Fallback Reset

Reset to the primary model after a delay (e.g., 1 minute):

```javascript
const model = createFallback({
    models: [
        anthropic('claude-3-haiku-20240307'), // Use Claude as preferred model
        openai('gpt-3.5-turbo'),
    ],
    onError: (error, modelId) => {
        console.error(`Error with model ${modelId}:`, error)
    },
    modelResetInterval: 60000, // Reset to first model after 1 minute of the first error
})
```

---

### Usage

#### Create a Fallback Model

```javascript
import { createFallback } from 'ai-fallback'
import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'

const model = createFallback({
    models: [anthropic('claude-3-haiku-20240307'), openai('gpt-3.5-turbo')],
})
```

---

### Retry After Output

The `retryAfterOutput` option allows retrying with a different model even if some tokens were already streamed. This is useful when you want to restart the generation from scratch if an error occurs mid-stream:

```ts
import { createFallback } from 'ai-fallback'
import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'

let fullText = ''

const model = createFallback({
    models: [anthropic('claude-3-haiku-20240307'), openai('gpt-3.5-turbo')],
    retryAfterOutput: true, // Enable retrying even after partial output
    onError: (err) => {
        console.error('Error:', err)
        // reset the full text because error happened when some tokens were already streamed in
        fullText = ''
    },
})

const stream = await streamText({
    model,
    system: 'You are a helpful assistant.',
    messages: [{ role: 'user', content: 'Write a long story.' }],
})

for await (const chunk of stream.textStream) {
    fullText += chunk
    console.log('Current text:', fullText)
}
```

---

### Text Generation

Generate text with automatic fallback:

```javascript
const result = await generateText({
    model,
    system: 'You are a helpful assistant.',
    messages: [{ role: 'user', content: 'Count from 1 to 5.' }],
})
```

---

### Streaming Responses

Stream text responses:

```javascript
const stream = await streamText({
    model,
    system: 'You are a helpful assistant.',
    messages: [{ role: 'user', content: 'Count from 1 to 5.' }],
})

for await (const chunk of stream.textStream) {
    console.log(chunk)
}
```

---

### Structured Output

Stream typed objects using `Zod` schemas:

```javascript
import { z } from 'zod'

const stream = await streamObject({
    model,
    system: 'You are a helpful assistant.',
    messages: [
        {
            role: 'user',
            content: 'Give me a person object with name and age properties.',
        },
    ],
    schema: z.object({
        name: z.string(),
        age: z.number(),
    }),
})

for await (const chunk of stream.partialObjectStream) {
    console.log(chunk)
}
```
