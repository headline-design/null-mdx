# AI Assistant for Documentation Sites

A drop-in, AI-powered assistant for documentation websites built with Next.js. Provides semantic search, contextual answers, source citations, and intelligent navigation help.

## Features

- **Conversational AI** - Natural language Q&A about your documentation
- **Semantic Search** - AI-powered search that understands intent
- **Source Citations** - Links back to relevant documentation pages
- **Page Context** - Understands what page the user is viewing
- **Suggested Questions** - Contextual follow-up suggestions
- **Tool System** - Extensible with custom tools
- **Keyboard Shortcuts** - Cmd+K to toggle
- **Mobile Responsive** - Works on all devices
- **Theme Aware** - Inherits your site's design tokens

## Quick Start

### 1. Add the Provider

Wrap your layout with the `AIAssistantProvider`:

```tsx
// app/layout.tsx
import { AIAssistantProvider } from '@/ai-assistant'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AIAssistantProvider
          config={{
            ui: {
              title: 'Docs Assistant',
              welcomeMessage: 'How can I help you today?'
            }
          }}
        >
          {children}
        </AIAssistantProvider>
      </body>
    </html>
  )
}
```

### 2. API Routes

The assistant requires two API routes (included in `/app/api/ai-assistant/`):

- `/api/ai-assistant/chat` - Main chat endpoint
- `/api/ai-assistant/search` - Documentation search endpoint

### 3. Use the Hook (Optional)

Control the assistant programmatically:

```tsx
import { useAIAssistant } from '@/ai-assistant'

function NavBar() {
  const { open, isOpen } = useAIAssistant()
  
  return (
    <button onClick={open}>
      Ask AI
    </button>
  )
}
```

## Configuration

```tsx
<AIAssistantProvider
  config={{
    // Model configuration (uses Vercel AI Gateway)
    model: 'openai/gpt-4o-mini',
    
    // Custom system prompt (optional)
    systemPrompt: 'You are a helpful assistant...',
    
    // Feature flags
    enableSearch: true,
    enableCitations: true,
    enableSuggestions: true,
    
    // Content sources
    contentSources: {
      llmsTxt: '/llms.txt',
      searchApi: '/api/ai-assistant/search',
    },
    
    // UI customization
    ui: {
      position: 'bottom-right', // 'bottom-right' | 'bottom-left' | 'center'
      trigger: 'both', // 'button' | 'cmd-k' | 'both'
      theme: 'inherit', // 'inherit' | 'light' | 'dark'
      title: 'Documentation Assistant',
      placeholder: 'Ask about the docs...',
      welcomeMessage: 'Hi! How can I help you?',
    },
    
    // Branding
    branding: {
      name: 'Docs AI',
      logo: '/logo.svg',
      accentColor: '#0066FF',
    },
  }}
>
```

## Available Tools

The assistant comes with built-in tools:

| Tool | Type | Description |
|------|------|-------------|
| `searchDocs` | Server | Searches documentation content |
| `getPageContext` | Client | Gets current page information |
| `suggestNavigation` | Server | Suggests related pages |
| `askConfirmation` | Client | Asks user for confirmation |

### Adding Custom Tools

```tsx
import { tool } from 'ai'
import { z } from 'zod'

const myCustomTool = tool({
  description: 'Description for the AI',
  inputSchema: z.object({
    param: z.string(),
  }),
  async *execute({ param }) {
    yield { state: 'loading' }
    // Do something
    yield { state: 'ready', result: 'done' }
  },
})
```

## Component Exports

### UI Components

- `AIAssistantProvider` - Main provider component
- `AIChatDialog` - Chat dialog component
- `AIChatTrigger` - Trigger button (FAB/button/minimal)
- `AIChatSearchTrigger` - Search bar style trigger
- `AIChatMessages` - Message list component
- `AIChatSuggestions` - Suggested questions
- `AICitation` / `AICitationList` - Source citations

### Hooks

- `useAIAssistant()` - Access assistant from context
- `useAIChat()` - Standalone chat hook
- `useAISearch()` - Search hook with SWR

### Utilities

- `extractPageContext()` - Extract current page info
- `buildConversationContext()` - Build AI context
- `indexDocumentation()` - Index docs for search
- `generateSuggestedQuestions()` - Generate suggestions

## Styling

The assistant uses your site's CSS variables from `globals.css`:

- `--background` / `--foreground`
- `--primary` / `--primary-foreground`
- `--muted` / `--muted-foreground`
- `--border`
- `--popover` / `--popover-foreground`

No additional styling configuration needed.

## Requirements

- Next.js 14+ (App Router)
- AI SDK (`ai` package)
- React 18+
- Tailwind CSS (for default styling)

## File Structure

```
ai-assistant/
├── components/
│   ├── ai-assistant-provider.tsx
│   ├── ai-chat-dialog.tsx
│   ├── ai-chat-messages.tsx
│   ├── ai-chat-suggestions.tsx
│   ├── ai-chat-trigger.tsx
│   └── ai-citation.tsx
├── hooks/
│   ├── use-ai-chat.ts
│   └── use-ai-search.ts
├── lib/
│   ├── ai-config.ts
│   ├── ai-context.ts
│   ├── ai-prompts.ts
│   ├── ai-tools.ts
│   ├── context-builder.ts
│   └── docs-indexer.ts
├── types/
│   └── ai-types.ts
├── index.ts
└── README.md
```

## License

MIT
