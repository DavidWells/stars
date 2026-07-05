---
repo: Airbolt-AI/airbolt
url: 'https://github.com/Airbolt-AI/airbolt'
homepage: null
starredAt: '2025-08-05T19:39:59Z'
createdAt: '2025-07-01T22:36:59Z'
updatedAt: '2025-08-18T09:35:09Z'
language: TypeScript
license: MIT
branch: main
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-08-23T22:30:27.075Z'
description: null
tags: []
---

# Airbolt

**Never put API keys in frontend code. Airbolt is the secure backend for calling LLMs from your apps.**

## Why You Need This

**The Problem**: If you put your AI provider API keys in frontend code, anyone can:

- View it in browser DevTools (it's visible in your JavaScript)
- Use it to make unlimited API calls on your dime
- Potentially rack up thousands in charges before you notice
- Access your entire AI provider account and usage history

**The Solution**: Airbolt is a secure backend proxy that:

- Keeps your API keys on the server only
- Issues time-limited JWT tokens to your frontend users
- Validates every request with cryptographic signatures
- Rate limits to prevent abuse
- Logs usage for monitoring

## Getting Started

**Deploy the Airbolt backend**

Deploy our production-ready LLM proxy to Render. You'll get your own private API that securely handles LLM calls:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Airbolt-AI/airbolt)

**What this deploys:**

- Secure LLM proxy with JWT authentication
- Rate limiting and abuse prevention
- Multi-provider AI integration (OpenAI, Anthropic, and more)
- Production logging and error handling

**What you need:**

- Service name (this becomes your URL, e.g., `my-ai-backend` → `https://my-ai-backend.onrender.com`)
- AI provider API key:
  - OpenAI ([get one here](https://platform.openai.com/api-keys))
  - Anthropic ([get one here](https://console.anthropic.com/))

After deployment, Render will show your API URL (e.g., `https://my-ai-backend.onrender.com`). Copy this URL - you'll use it in the SDK below.

> **Note**: If using Render's free tier, the server sleeps after 15 minutes of inactivity. The SDK automatically handles this with smart retries and extended timeouts.

Then add to your app:

```bash
# Latest stable version
npm install @airbolt/react-sdk

# Beta version (latest features)
npm install @airbolt/react-sdk@beta
```

```tsx
import { ChatWidget } from '@airbolt/react-sdk';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <ChatWidget baseURL="https://my-ai-backend.onrender.com" />
    </div>
  );
}
```

That's it! Your app now has secure AI chat that can't be abused by random users.

> **Coming soon**: Skip deployment entirely with our hosted solution. [Sign up for the closed beta](https://forms.gle/2yWKszvJBZReN6kf7)

## What you get today

**Secure LLM proxy** - Your AI provider API keys stay on the server. Frontend gets short-lived JWT tokens (15 min expiry) that can only access the chat endpoint.

**How the security works**:

1. Frontend either requests an internal JWT from `/api/tokens` OR uses an external auth provider token
2. Internal tokens are signed with server's JWT_SECRET (HS256 algorithm)
3. External tokens are validated via JWKS, public key, or shared secret
4. Frontend includes token in `Authorization: Bearer <token>` header
5. Backend verifies token signature and claims on every request
6. Invalid/expired tokens are rejected with 401 Unauthorized

**Abuse prevention built-in** - Even if someone gets a token, they can only use it for 15 minutes. Token-based rate limiting prevents runaway usage:

- **Token limits**: 1,000 tokens per hour per user (configurable)
- **Request limits**: 10 requests per minute per user (configurable)
- **Real-time usage tracking**: Know exactly how much each user consumes
- **Automatic 429 responses**: When limits are exceeded, clients get clear rate limit errors

**Pre-built backend** - We provide the backend, you just deploy it. One-click to Render or any Node.js hosting platform. No custom server code to write or maintain.

**TypeScript SDKs** - Auto-generated Javascript and React libraries with full type safety. The SDK handles token refresh automatically.

**Production-ready patterns** - Zod validation on all inputs, Fastify error handling, secure environment configuration, and structured logging.

This is an MVP to validate the core concept. We're learning what the "Stripe for LLMs" should actually look like based on real developer feedback.

## Bring Your Own Auth (BYOA)

Use your existing authentication provider (Auth0, Clerk, Firebase, Supabase) with Airbolt.

### Quick Start

**Development (Zero-Config)**

In development, Airbolt automatically validates tokens from common providers - no configuration needed!

```javascript
// Frontend - Pass your auth provider's token
import { chat } from '@airbolt/sdk';

const response = await chat([{ role: 'user', content: 'Hello!' }]);
```

```bash
# Backend - Automatically validates tokens from known providers
# Just start the server and it works!
NODE_ENV=development
```

**Production (Secure by Default)**

Production requires explicit configuration for security:

```bash
NODE_ENV=production
JWT_SECRET=your-32-char-minimum-secret  # Required in production
EXTERNAL_JWT_ISSUER=https://your-auth-provider.com/
EXTERNAL_JWT_AUDIENCE=your-api-identifier  # Recommended
```

### How It Works

1. **Frontend**: Pass your auth provider's token to the SDK
2. **Backend**:
   - Development: Auto-discovers JWKS from recognized providers (Auth0, Clerk, Firebase, Supabase)
   - Production: Only validates tokens from your configured issuer
3. **Security**: Rate limiting by issuer + user ID prevents abuse

### Migration Guide

**Existing Users**: No changes required! Your current `EXTERNAL_JWT_ISSUER` configuration continues to work.

**New Users**:

- Development: No configuration needed
- Production: Set `JWT_SECRET`, `EXTERNAL_JWT_ISSUER`, and optionally `EXTERNAL_JWT_AUDIENCE`

### Auth0 Setup Example

1. **Frontend Integration**:

   ```javascript
   import { Auth0Provider } from '@auth0/auth0-react';

   <Auth0Provider
     domain="your-tenant.auth0.com"
     clientId="your-client-id"
     authorizationParams={{
       redirect_uri: window.location.origin,
       audience: 'https://airbolt-api', // Important: prevents opaque tokens
     }}
   >
     <App />
   </Auth0Provider>;
   ```

2. **Backend Configuration**:
   - **Development**: Automatically validates Auth0 tokens (no config needed)
   - **Production**: Configure your specific Auth0 tenant:
   ```bash
   NODE_ENV=production
   JWT_SECRET=your-32-char-minimum-secret  # Required
   EXTERNAL_JWT_ISSUER=https://your-tenant.auth0.com/
   EXTERNAL_JWT_AUDIENCE=https://airbolt-api  # Should match frontend
   ```

See the [Auth0 example](examples/auth0-authenticated) for a complete implementation.

### Custom Auth Providers

For other auth providers or server-side rendering:

```javascript
const response = await chat(messages, {
  getAuthToken: () => myAuth.getToken(),
});
```

> **Note**: Legacy configuration using `EXTERNAL_JWT_PUBLIC_KEY` or `EXTERNAL_JWT_SECRET` is still supported for manual key management, but we recommend using JWKS auto-discovery with `EXTERNAL_JWT_ISSUER` for better security and key rotation support.

## What's coming soon

**Hosted solution** - Skip the deployment step entirely. Import the SDK, configure your API key, start building. [Currently in private beta](https://forms.gle/2yWKszvJBZReN6kf7).

**Streaming responses (Available Now!)** - Real-time message streaming for better user experience.

**Function calling** - Let AI models call your application functions and APIs.

**Enhanced multi-provider support** - Already supports OpenAI and Anthropic. Coming soon: Google Gemini, local models, and more.

**Conversation management** - Persistent chat sessions, message history, and context management.

The roadmap is driven by feedback from developers using Airbolt.

## Examples

### Basic usage

```tsx
<ChatWidget baseURL="https://my-ai-backend.onrender.com" />
```

### Custom system prompt and styling

```tsx
<ChatWidget
  baseURL="https://my-ai-backend.onrender.com"
  system="You are a helpful assistant for my e-commerce store. Help customers with orders, returns, and product questions."
  title="Customer Support"
  theme="dark"
  position="fixed-bottom-right"
/>
```

### Build your own chat interface

```tsx
import { useChat } from '@airbolt/react-sdk';

function CustomChat() {
  const { messages, input, setInput, send, isLoading, usage } = useChat({
    baseURL: 'https://my-ai-backend.onrender.com',
    system:
      'You are a coding assistant. Help users debug their code and suggest improvements.',
  });

  return (
    <div className="chat-container">
      {/* Display usage info when available */}
      {usage && usage.tokens && (
        <div className="usage-info">
          Tokens: {usage.tokens.used}/{usage.tokens.limit}
          (resets {new Date(usage.tokens.resetAt).toLocaleTimeString()})
        </div>
      )}

      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
        {isLoading && <div className="typing">AI is thinking...</div>}
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();
          send();
        }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me anything about your code..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
```

### Non-React applications

```javascript
import { chat } from '@airbolt/sdk';

async function askAI(question) {
  const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: question },
  ];

  console.log('AI: ');

  // Stream the response (default behavior)
  for await (const chunk of chat(messages, {
    baseURL: 'https://my-ai-backend.onrender.com',
  })) {
    if (chunk.type === 'chunk') {
      process.stdout.write(chunk.content);
    }
  }
  console.log('\n');
}

// Usage
await askAI('Explain how React hooks work');
// AI will stream the response in real-time...
```

**See more examples**:

- [Anonymous Chat Example](examples/anonymous-chat/) - Zero-config authentication with built-in JWT
- [Auth0 Example](examples/auth0-authenticated/) - Complete BYOA integration with debug panel
- [React SDK Interactive Examples](packages/react-sdk#interactive-demo) - Live Ladle demos with ChatWidget and useChat hook
- [Node.js CLI Example](packages/sdk/examples/node-cli/) - Command-line chat

## Alternative deployment options

### Self-hosting

Deploy the Airbolt backend to any hosting platform:

```bash
git clone https://github.com/Airbolt-AI/airbolt
cd airbolt
npm install
npm run build

# Set environment variables
export NODE_ENV=production
export JWT_SECRET=your-32-char-minimum-secret # Required in production
export AI_PROVIDER=openai # or anthropic
export OPENAI_API_KEY=sk-... # or ANTHROPIC_API_KEY for Anthropic

npm start
```

## Roadmap

**Phase 1: Foundation** (Current)

- ✅ Core chat API with multi-provider support (OpenAI, Anthropic)
- ✅ TypeScript SDKs for Node.js and React
- ✅ One-click deployment to Render
- ✅ Production-ready error handling and validation

**Phase 2: Developer Experience**

- 🚧 Hosted solution ([private beta](https://forms.gle/2yWKszvJBZReN6kf7))
- ✅ Auth provider integrations (Auth0, Clerk, Supabase, Firebase Auth)
- ✅ Response streaming for real-time chat
- 🚧 Function calling and tool use
- 🚧 Enhanced multi-provider support (Google, local models, etc.)

**Phase 3: Production Scale**

- 📋 Conversation and session management
- 📋 RAG integration for knowledge bases
- 📋 Caching layer for cost optimization
- 📋 Batch processing for high throughput

**Phase 4: Enterprise**

- 📋 SSO/SAML authentication
- 📋 Role-based access control
- 📋 Usage quotas and billing management
- 📋 Compliance tools (SOC2, GDPR, etc.)

**Want to influence the roadmap?** [Share your use case](https://github.com/Airbolt-AI/airbolt/discussions). We prioritize features based on real developer needs.

## Architecture

Built on modern TypeScript infrastructure:

- **Fastify backend** - High-performance, type-safe API server
- **Zod validation** - Runtime type safety for all inputs and outputs
- **Auto-generated SDKs** - Fern-based client generation from OpenAPI specs
- **Comprehensive testing** - Unit, integration, and mutation testing with 90%+ coverage
- **Quality automation** - Pre-commit hooks, CI/CD, security scanning

The monorepo structure makes it easy to contribute and understand how everything works together. See [CONTRIBUTING.md](https://github.com/Airbolt-AI/airbolt/blob/main/docs/CONTRIBUTING.md) for development setup.

## Documentation

- **[SDK Documentation](https://airbolt-ai.github.io/airbolt/)** - Complete API reference for both Core and React SDKs
- **[React SDK Guide](packages/react-sdk/README.md)** - Getting started with React components and hooks
- **[Core SDK Guide](packages/sdk/README.md)** - TypeScript client for any JavaScript environment
- **[Example Apps](examples/)** - Working examples including anonymous chat and Auth0 integration
- **[Development Guide](https://github.com/Airbolt-AI/airbolt/blob/main/docs/CONTRIBUTING.md)** - Set up the project locally and contribute

## Community

- **[GitHub Discussions](https://github.com/Airbolt-AI/airbolt/discussions)** - Feature requests and roadmap input
- **[Issues](https://github.com/Airbolt-AI/airbolt/issues)** - Bug reports and technical questions

## Why Airbolt?

**Stop rebuilding the same AI plumbing.** Every AI-powered app needs the same backend infrastructure: secure API key storage, user authentication, rate limiting, logging, provider switching. You shouldn't have to rebuild this from scratch every time.

**Enable truly backend-free AI apps.** Just like you can build entire apps with Stripe + Auth0 + Firebase, you should be able to add AI without spinning up servers. Airbolt makes that possible.

**Focus on the AI experience, not the infrastructure.** The hard part is building great AI interactions for your users. The proxy handles the boring production-ready bits so you can focus on what makes your app unique.

As Andrej Karpathy said: "The code was actually the easy part… all of this DevOps stuff was… extremely slow." We're here to fix that.

## License

MIT © [Airbolt AI](https://github.com/Airbolt-AI)

---

**Airbolt is in active development.** We're a small team building thoughtfully based on real developer feedback. If you're using Airbolt in production, we'd love to hear about your experience and help you succeed.

<!-- Alternative tagline options for consideration:
1. "A production-ready backend for calling LLMs from your frontend securely."
2. "The secure proxy between your frontend and AI providers."
3. "Deploy once, call LLMs safely from any frontend."
4. "Your AI API keys stay secret. Your frontend stays simple."
5. "The missing backend for frontend AI apps."
6. "Stop exposing API keys. Start shipping AI features."
7. "A JWT-secured proxy for AI provider APIs."
8. "The auth layer for LLM APIs you don't want to build."
9. "Frontend AI without the API key nightmares."
10. "Open-source backend for secure LLM access."
-->
