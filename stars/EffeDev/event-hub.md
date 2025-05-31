---
repo: EffeDev/event-hub
url: 'https://github.com/EffeDev/event-hub'
homepage: null
starredAt: '2025-05-01T03:47:17Z'
createdAt: '2023-12-12T09:33:36Z'
updatedAt: '2025-05-01T03:47:17Z'
language: TypeScript
license: MIT
branch: main
stars: 17
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-03T22:30:41.424Z'
description: null
tags: []
---

# EventHub For Front Ends (Effe)

<div align="center">

[![Pipeline](https://github.com/serverless-dna/effe/actions/workflows/pipeline.yml/badge.svg)](https://github.com/serverless-dna/effe/actions/workflows/pipeline.yml)

</div>

## The Swiss Army Knife for Front-End Event Architecture

Effe (pronounced "e-ff-y") is a powerful, composable toolkit that connects your frontend JavaScript applications to backend Event Driven Architecture (EDA). It provides a framework-agnostic approach to event handling with a modular design that lets you build exactly what you need.

## Core Components

Effe is built on four foundational components that work together seamlessly while maintaining clear separation of concerns:

### 1. EventHub - The Central Nervous System

The EventHub provides a familiar pub/sub interface for your front-end components:

- **Channel-based messaging** - Organize your events by logical channels
- **Wildcard subscriptions** - Subscribe to all events with the `*` channel
- **Type-safe events** - Leverage TypeScript for type safety across your event system
- **Asynchronous by design** - Built for modern async/await patterns

```typescript
import { EventHub } from '@effedev/effe';

// Define type-safe event interfaces
interface UserLoginEvent {
  userId: string;
  timestamp: number;
  sessionId: string;
}

interface UserLogoutEvent {
  userId: string;
  timestamp: number;
  sessionDuration: number;
}

// Create an EventHub
const eventHub = new EventHub();

// Subscribe to events with type safety
const subscription = eventHub.subscribe<UserLoginEvent>('user-login', (event) => {
  console.log(`User ${event.userId} logged in at ${new Date(event.timestamp)}`);
  // TypeScript knows event has userId, timestamp, and sessionId properties
});

// Publish a type-safe event
await eventHub.publish<UserLoginEvent>('user-login', {
  userId: 'user123',
  timestamp: Date.now(),
  sessionId: 'sess_abc123'
});

// Later, unsubscribe when no longer needed
subscription.unsubscribe();
```

### 2. Connectors - The Bridge Builders

Connectors establish the flow of events between your EventHub and external systems:

- **SourceConnector** - Brings external events into your EventHub
- **SinkConnector** - Sends EventHub events to external systems
- **Bidirectional flows** - Combine source and sink connectors for two-way communication
- **Channel mapping** - Route external events to specific EventHub channels

```typescript
import { EventHub, SourceConnector, SinkConnector, SourceTransport, SinkTransport } from '@effedev/effe';

// Define domain-specific types
interface ServerMessage {
  type: 'notification' | 'update' | 'error';
  payload: unknown;
  timestamp: number;
}

interface ClientMessage {
  action: string;
  data: unknown;
  requestId: string;
}

// Example implementation of a WebSocket source connector with type safety
class WebSocketSourceConnector extends SourceConnector<string, ServerMessage> {
  constructor(eventHub: EventHub, url: string, channel: string) {
    // Create a transport for the WebSocket connection
    const transport = new WebSocketSourceTransport(url);
    super(eventHub, transport, channel);
  }
}

// Example implementation of a WebSocket sink connector with type safety
class WebSocketSinkConnector extends SinkConnector<ClientMessage, string> {
  constructor(eventHub: EventHub, url: string, channel: string) {
    // Create a transport for the WebSocket connection
    const transport = new WebSocketSinkTransport(url);
    super(eventHub, transport, channel);
  }
}

// Create connectors
const sourceConnector = new WebSocketSourceConnector(eventHub, 'wss://api.example.com', 'server-events');
const sinkConnector = new WebSocketSinkConnector(eventHub, 'wss://api.example.com', 'client-events');

// Connect to start the flow of events
await sourceConnector.connect();
await sinkConnector.connect();
```

### 3. Transports - The Communication Layer

Transports handle the actual communication with external systems:

- **SourceTransport** - Receives data from external sources
- **SinkTransport** - Sends data to external destinations
- **Connection management** - Handles connection lifecycle and state
- **Protocol abstraction** - Encapsulates protocol-specific details

```typescript
import { SourceTransport, SinkTransport } from '@effedev/effe';

// Define domain-specific types
interface ServerMessage {
  type: 'notification' | 'update' | 'error';
  payload: unknown;
  timestamp: number;
}

interface ClientMessage {
  action: string;
  data: unknown;
  requestId: string;
}

// Example implementation of a WebSocket source transport with type safety
class WebSocketSourceTransport extends SourceTransport<string, ServerMessage> {
  private ws: WebSocket;
  
  constructor(private url: string) {
    super(`ws-source-${url}`);
  }
  
  async connect(): Promise<void> {
    this.ws = new WebSocket(this.url);
    this._connected = true;
    
    this.ws.onmessage = async (event) => {
      // Process incoming messages through the pipeline if set
      await this.messageHandler(event.data);
    };
  }
  
  async disconnect(): Promise<void> {
    this.ws.close();
    this._connected = false;
  }
}

// Example implementation of a WebSocket sink transport with type safety
class WebSocketSinkTransport extends SinkTransport<ClientMessage, string> {
  private ws: WebSocket;
  
  constructor(private url: string) {
    super(`ws-sink-${url}`);
  }
  
  async connect(): Promise<void> {
    this.ws = new WebSocket(this.url);
    this._connected = true;
  }
  
  async disconnect(): Promise<void> {
    this.ws.close();
    this._connected = false;
  }
  
  protected async sendMessage(data: string): Promise<void> {
    this.ws.send(data);
  }
}
```

### 4. Pipelines - The Data Transformation Engine

Pipelines process and transform data as it flows through your system:

- **Multi-stage processing** - Chain filters for complex transformations
- **Type-safe transformations** - Maintain type safety between pipeline stages
- **Error handling** - Graceful handling of transformation errors
- **Validation** - Validate data at any stage of processing

```typescript
import { Pipeline, IPipelineFilter, PipelineResult } from '@effedev/effe';

// Define domain-specific types
interface ServerMessage {
  type: 'notification' | 'update' | 'error';
  payload: unknown;
  timestamp: number;
}

interface UserNotification {
  userId: string;
  message: string;
  level: 'info' | 'warning' | 'error';
  timestamp: Date;
}

// Example filter that parses JSON strings into ServerMessage objects
class JsonParserFilter implements IPipelineFilter<string, ServerMessage> {
  async process(data: string): Promise<PipelineResult<ServerMessage>> {
    try {
      const parsed = JSON.parse(data);
      
      // Validate the parsed data has the required structure
      if (!parsed.type || !parsed.timestamp) {
        return { 
          success: false, 
          error: new Error('Invalid message format: missing required fields') 
        };
      }
      
      // Convert to ServerMessage type
      const message: ServerMessage = {
        type: parsed.type,
        payload: parsed.payload,
        timestamp: parsed.timestamp
      };
      
      return { success: true, data: message };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }
}

// Example filter that transforms ServerMessage to UserNotification when applicable
class NotificationTransformerFilter implements IPipelineFilter<ServerMessage, UserNotification | null> {
  async process(data: ServerMessage): Promise<PipelineResult<UserNotification | null>> {
    try {
      // Only transform notification type messages
      if (data.type !== 'notification') {
        return { success: true, data: null };
      }
      
      // Ensure payload has the expected structure
      const payload = data.payload as any;
      if (!payload.userId || !payload.message) {
        return { 
          success: false, 
          error: new Error('Invalid notification payload') 
        };
      }
      
      // Transform to UserNotification
      const notification: UserNotification = {
        userId: payload.userId,
        message: payload.message,
        level: payload.level || 'info',
        timestamp: new Date(data.timestamp)
      };
      
      return { success: true, data: notification };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }
}

// Create a pipeline that transforms string data to UserNotification objects
const pipeline = new Pipeline<string>()
  .add(new JsonParserFilter())
  .add(new NotificationTransformerFilter());

// Use the pipeline in a transport
const transport = new WebSocketSourceTransport('wss://api.example.com');
transport.usePipeline(pipeline);
```

## Composable Architecture

Effe's power comes from its composable design. Mix and match components to create exactly the event architecture you need:

1. **EventHub alone** - Use it as a simple pub/sub system within your application
2. **EventHub + Connectors** - Connect your application to external event sources
3. **Add Pipelines** - Transform, validate, and enrich data as it flows through your system
4. **Multiple Connectors** - Connect to multiple backends simultaneously
5. **Custom Transports** - Implement custom transports for any protocol

## Real-World Examples

### WebSocket Integration

```typescript
import { EventHub, SourceConnector, SinkConnector, Pipeline, IPipelineFilter, PipelineResult } from '@effedev/effe';

// Define domain-specific types
interface ChatMessage {
  messageId: string;
  sender: string;
  content: string;
  timestamp: number;
  room: string;
}

interface UserPresence {
  userId: string;
  status: 'online' | 'away' | 'offline';
  lastActive: number;
}

interface OutgoingMessage {
  type: 'chat' | 'presence';
  data: ChatMessage | UserPresence;
}

// Create custom filters
class JsonParserFilter implements IPipelineFilter<string, any> {
  async process(data: string): Promise<PipelineResult<any>> {
    try {
      return { success: true, data: JSON.parse(data) };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }
}

class MessageTypeRouter implements IPipelineFilter<any, ChatMessage | UserPresence | null> {
  async process(data: any): Promise<PipelineResult<ChatMessage | UserPresence | null>> {
    try {
      if (data.type === 'chat') {
        const chatMessage: ChatMessage = {
          messageId: data.id,
          sender: data.from,
          content: data.text,
          timestamp: data.time,
          room: data.room
        };
        return { success: true, data: chatMessage };
      } else if (data.type === 'presence') {
        const presence: UserPresence = {
          userId: data.userId,
          status: data.status,
          lastActive: data.lastActive
        };
        return { success: true, data: presence };
      }
      return { success: true, data: null };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }
}

// Create custom transports and connectors (implementation details omitted for brevity)
class WebSocketSourceTransport extends SourceTransport<string, ChatMessage | UserPresence> { /* ... */ }
class WebSocketSinkTransport extends SinkTransport<OutgoingMessage, string> { /* ... */ }

class WebSocketSourceConnector extends SourceConnector<string, ChatMessage | UserPresence> { /* ... */ }
class WebSocketSinkConnector extends SinkConnector<OutgoingMessage, string> { /* ... */ }

// Create an EventHub
const eventHub = new EventHub();

// Create a bidirectional WebSocket connection
const wsSourceTransport = new WebSocketSourceTransport('wss://chat.example.com');
const wsSinkTransport = new WebSocketSinkTransport('wss://chat.example.com');

const wsSource = new WebSocketSourceConnector(eventHub, wsSourceTransport, 'incoming-messages');
const wsSink = new WebSocketSinkConnector(eventHub, wsSinkTransport, 'outgoing-messages');

// Add data transformation
const inboundPipeline = new Pipeline<string>()
  .add(new JsonParserFilter())
  .add(new MessageTypeRouter());
wsSourceTransport.usePipeline(inboundPipeline);

// Connect everything
await wsSource.connect();
await wsSink.connect();

// Now your UI can interact with the chat server via EventHub
eventHub.subscribe<ChatMessage>('incoming-messages', (message) => {
  if (message.room === currentRoom) {
    displayChatMessage(message);
  }
});

eventHub.subscribe<UserPresence>('incoming-messages', (presence) => {
  updateUserStatus(presence);
});

// Send a message when the user clicks the send button
sendButton.addEventListener('click', () => {
  const message: OutgoingMessage = {
    type: 'chat',
    data: {
      messageId: generateId(),
      sender: currentUser,
      content: messageInput.value,
      timestamp: Date.now(),
      room: currentRoom
    }
  };
  eventHub.publish('outgoing-messages', message);
  messageInput.value = '';
});
```

### Multi-Backend Integration

```typescript
import { EventHub } from '@effedev/effe';

// Define domain-specific types
interface UserActivity {
  userId: string;
  action: string;
  page: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

interface ApiRequest {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  headers?: Record<string, string>;
}

interface NotificationMessage {
  userId: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: number;
}

// Create custom connectors (implementation details omitted for brevity)
class WebSocketConnector { /* ... */ }
class RestApiConnector { /* ... */ }
class AnalyticsConnector { /* ... */ }

// Create an EventHub
const eventHub = new EventHub();

// Connect to multiple backends
const wsConnector = new WebSocketConnector(eventHub, 'wss://realtime.example.com');
const restConnector = new RestApiConnector(eventHub, 'https://api.example.com');
const analyticsConnector = new AnalyticsConnector(eventHub, 'user-activity');

// Connect everything
await Promise.all([
  wsConnector.connect(),
  restConnector.connect(),
  analyticsConnector.connect()
]);

// Your UI interacts with a single EventHub, but events flow to multiple backends
eventHub.publish<UserActivity>('user-activity', {
  userId: 'user123',
  action: 'page-view',
  page: '/dashboard',
  timestamp: Date.now(),
  metadata: {
    referrer: document.referrer,
    viewport: `${window.innerWidth}x${window.innerHeight}`
  }
});

// Send API requests through the EventHub
eventHub.publish<ApiRequest>('api-requests', {
  endpoint: '/users/profile',
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
});

// Handle notifications from the server
eventHub.subscribe<NotificationMessage>('notifications', (notification) => {
  showToast(notification.message, notification.type);
});
```

## Why Effe?

- **Framework agnostic** - Works with React, Vue, Angular, or vanilla JS
- **Lightweight** - Small footprint, no heavy dependencies
- **Extensible** - Easy to extend with custom connectors and transports
- **Type-safe** - Built with TypeScript for robust type checking
- **Testable** - Easy to mock and test each component independently
- **Separation of concerns** - Clean architecture with clear responsibilities

## Getting Started

```bash
npm install @effedev/effe
```

```typescript
import { EventHub } from '@effedev/effe';

// Define your event types
interface NotificationEvent {
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error';
}

interface UserActionEvent {
  action: string;
  elementId: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

// Create an EventHub
const eventHub = new EventHub();

// Subscribe to events with type safety
eventHub.subscribe<NotificationEvent>('notifications', (data) => {
  showNotification(data.title, data.message, data.type);
});

// Create your custom connector implementation
class WebSocketConnector {
  constructor(eventHub, url) {
    // Implementation details...
  }
  
  async connect() {
    // Connect to WebSocket and set up event flow
  }
}

// Connect to a WebSocket server
const connector = new WebSocketConnector(eventHub, 'wss://api.example.com');
await connector.connect();

// Publish a type-safe event
eventHub.publish<UserActionEvent>('user-action', {
  action: 'button-click',
  elementId: 'submit-btn',
  timestamp: Date.now()
});
```

## Connect Your Events to Everything!

With Effe, you can connect your front-end to:

- WebSockets for real-time communication
- REST APIs for traditional request/response
- AWS EventBridge for serverless event routing
- Kafka topics for high-throughput messaging
- Momento Topics for serverless pub/sub
- Custom protocols via custom transports
- Other EventHubs for federated architectures

The possibilities are endless. Mix, match, and compose to build the exact event architecture your application needs.
