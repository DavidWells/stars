---
repo: kristianfreeman/smart-cache
url: 'https://github.com/kristianfreeman/smart-cache'
homepage: null
starredAt: '2025-01-30T23:38:09Z'
createdAt: '2025-01-28T20:25:35Z'
updatedAt: '2025-02-21T19:43:18Z'
language: TypeScript
license: NA
branch: main
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:09.053Z'
description: 'AI-driven edge caching of any origin, using Cloudflare Workers and Deepseek AI'
tags: []
---

# Intelligent Caching Middleware

A Cloudflare Workers middleware that implements intelligent caching with AI-driven cache duration and proper content type handling.

## Features

- Automated cache duration decisions using AI analysis
- Preserves and restores content types
- Backwards compatible with legacy cache entries
- Robust parsing of AI responses
- Fallback mechanisms for error cases

## How It Works

### Cache Storage

The middleware stores cache entries as JSON objects with the following structure:

```typescript
interface CacheEntry {
  content: string;
  contentType: string;
  timestamp: number;
}
```

### Request Flow

1. **Cache Check**: First attempts to retrieve content from cache using the URL pathname as key
2. **Origin Fetch**: If not cached, fetches from origin server
3. **AI Analysis**: Sends content to AI for cache duration recommendation
4. **Cache Storage**: Stores content with metadata in cache using AI-recommended duration

### AI Response Handling

The AI provides cache duration recommendations in this format:
```
<think>
Analysis reasoning here
</think>
3600
```

The middleware processes this by:
1. Removing the `<think>` tags and their content
2. Extracting the last numeric value from the remaining text
3. Falling back to a default of 1 hour (3600 seconds) if parsing fails

### Content Type Handling

- Content type is preserved from the origin response
- Stored alongside content in cache entry
- Properly restored when serving cached content
- Includes fallback handling for legacy cache entries

## Configuration

Required environment variables:
- `ORIGIN`: Base URL of the origin server
- `CACHE`: KV namespace for cache storage
- `AI`: AI service binding for analysis

## Error Handling

The middleware includes several fallback mechanisms:
- Default cache duration of 1 hour if AI analysis fails
- Graceful handling of legacy cache entries
- Default content type of 'text/plain' if none provided

## Example Usage

```typescript
// Worker script
import app from './middleware';
export default app;
```

## Implementation Details

### Cache Key Generation
Uses URL pathname as the cache key, allowing for path-based caching while maintaining query parameter flexibility.

### AI Analysis Parameters
The AI considers:
- Content type (dynamic vs static)
- Time sensitivity
- Update frequency

### Performance Considerations
- Minimal parsing overhead
- Efficient cache entry structure
- Backwards compatibility without performance penalty

## Best Practices

1. Monitor cache hit rates to verify effectiveness
2. Periodically review AI-suggested cache durations
3. Consider implementing manual cache invalidation using the timestamp
4. Test with various content types to ensure proper handling

## Future Enhancements

Potential improvements to consider:
- Cache variation by query parameters
- Manual cache invalidation endpoints
- Cache warmup mechanisms
- Stale-while-revalidate implementation
- Analytics for cache performance
