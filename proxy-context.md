# Null MDX - AI Agent Proxy Context

> **Purpose**: This file provides context for AI agents in the parent application to understand how to write and format documentation pages for **Null MDX**. This is a reference guide for content creation, MDX component usage, and best practices.

---

## Table of Contents

1. [File Structure](#file-structure)
2. [Frontmatter Schema](#frontmatter-schema)
3. [Supported MDX Components](#supported-mdx-components)
4. [Markdown Formatting](#markdown-formatting)
5. [Code Blocks](#code-blocks)
6. [Best Practices](#best-practices)
7. [Common Patterns](#common-patterns)

---

## File Structure

Documentation content is organized in the `content/` directory:

```
content/
├── docs/                    # Documentation pages
│   ├── introduction.mdx
│   ├── installation.mdx
│   ├── getting-started.mdx
│   ├── api.mdx
│   └── guides/              # Nested guides
│       ├── configuration.mdx
│       └── writing-content.mdx
└── blog/                    # Blog posts
    ├── hello-world.mdx
    └── tech-stack-2025.mdx
```

### File Naming Conventions

- Use **kebab-case** for file names: `getting-started.mdx`, `api-reference.mdx`
- File names become URL slugs: `installation.mdx` → `/docs/installation`
- Nested folders create nested routes: `guides/configuration.mdx` → `/docs/guides/configuration`

---

## Frontmatter Schema

Every MDX file **must** begin with YAML frontmatter wrapped in `---` delimiters.

### Documentation Pages (`content/docs/`)

```yaml
---
title: "Page Title"          # Required - Display title (also used for SEO)
description: "Brief summary"  # Required - Used in meta tags and page previews
order: 1                      # Optional - Controls sidebar ordering (lower = higher)
---
```

### Blog Posts (`content/blog/`)

```yaml
---
title: "Blog Post Title"      # Required
description: "Post summary"   # Required
date: "2025-01-03"            # Required - ISO date format YYYY-MM-DD
author: "Author Name"         # Optional
tags: ["tag1", "tag2"]        # Optional - Array of tags
draft: false                  # Optional - Set to true to hide from production
---
```

### Frontmatter Rules

- Always wrap string values in quotes
- Use ISO date format for dates: `YYYY-MM-DD`
- Tags must be an array: `["tag1", "tag2"]`
- The `order` field is only used for docs, not blog posts

---

## Supported MDX Components

The following custom React components are available for use directly in MDX files without imports:

### 1. Callout

Displays a styled callout box for important information.

**Syntax:**
```mdx
<Callout type="info">
  This is helpful information with **markdown** support.
</Callout>
```

**Available Types:**
| Type | Style | Use Case |
|------|-------|----------|
| `info` | Blue | General information, tips |
| `warning` | Amber/Yellow | Caution, important notices |
| `error` | Red | Critical warnings, breaking changes |
| `success` | Green | Completion confirmations, good practices |

**Examples:**
```mdx
<Callout type="info">
  Make sure you have Node.js 18+ installed.
</Callout>

<Callout type="warning">
  This feature is experimental and may change.
</Callout>

<Callout type="error">
  Never expose your API keys in client-side code.
</Callout>

<Callout type="success">
  Your configuration is complete!
</Callout>
```

---

### 2. Steps / Step

Creates numbered step-by-step instructions with automatic numbering.

**Syntax:**
```mdx
<Steps>

<Step>

### First Step Title

Content for the first step goes here.

</Step>

<Step>

### Second Step Title

Content for the second step.

```bash
npm install
```

</Step>

</Steps>
```

**Important Notes:**
- Each `<Step>` must be wrapped inside `<Steps>`
- Leave **empty lines** before and after the `<Step>` content
- Steps are automatically numbered (1, 2, 3, etc.)
- You can include any markdown content inside steps including code blocks

---

### 3. Tabs / TabsList / TabsTrigger / TabsContent

Creates tabbed content sections for organizing related information.

**Syntax:**
```mdx
<Tabs defaultValue="npm">
  <TabsList>
    <TabsTrigger value="npm">npm</TabsTrigger>
    <TabsTrigger value="pnpm">pnpm</TabsTrigger>
    <TabsTrigger value="yarn">yarn</TabsTrigger>
  </TabsList>
  <TabsContent value="npm">
    ```bash
    npm install package-name
    ```
  </TabsContent>
  <TabsContent value="pnpm">
    ```bash
    pnpm add package-name
    ```
  </TabsContent>
  <TabsContent value="yarn">
    ```bash
    yarn add package-name
    ```
  </TabsContent>
</Tabs>
```

**Important Notes:**
- The `defaultValue` must match one of the `TabsTrigger` values
- Each `TabsContent` value must match its corresponding `TabsTrigger` value
- Content inside tabs supports full markdown/MDX

---

## Markdown Formatting

All standard markdown is supported with enhanced styling.

### Headings

```markdown
# H1 - Page title (use sparingly, typically only once per page)
## H2 - Major sections (includes border-bottom styling)
### H3 - Subsections
#### H4 - Minor subsections
```

**Notes:**
- H2 and H3 headings automatically generate anchor links for navigation
- Heading IDs are auto-generated from the heading text

### Text Formatting

```markdown
**Bold text** for emphasis
*Italic text* for definitions or terms
`inline code` for code references, file names, commands
~~Strikethrough~~ for deprecated content
```

### Links

```markdown
[Internal link](/docs/installation)
[External link](https://example.com)
```

- Internal links should use root-relative paths: `/docs/...`, `/blog/...`
- External links automatically open in new tabs with `noopener noreferrer`

### Lists

```markdown
Unordered:
- First item
- Second item
  - Nested item

Ordered:
1. First step
2. Second step
3. Third step
```

### Blockquotes

```markdown
> This is a blockquote for emphasis or quotations.
> It can span multiple lines.
```

### Horizontal Rule

```markdown
---
```

### Tables

Use standard GFM (GitHub Flavored Markdown) table syntax:

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

**Alignment:**
```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| L    |   C    |     R |
```

### Images

```markdown
![Alt text description](https://example.com/image.jpg)
![Alt text](/path/to/local/image.jpg)
```

- Images are automatically styled with rounded corners and captions
- The alt text becomes the image caption if provided
- Supports both external URLs and local paths

---

## Code Blocks

Enhanced syntax highlighting powered by `rehype-pretty-code`.

### Basic Code Block

````markdown
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```
````

### Code Block with Title

````markdown
```tsx title="components/button.tsx"
export function Button({ children }) {
  return <button className="btn">{children}</button>;
}
```
````

### Supported Languages

Common languages with full syntax highlighting:
- `javascript` / `js`
- `typescript` / `ts`
- `tsx` / `jsx`
- `bash` / `shell`
- `json`
- `yaml`
- `markdown` / `mdx`
- `css`
- `html`
- `python`
- `env` (for environment variables)

### Inline Code

Use single backticks for inline code:

```markdown
Run `npm install` to install dependencies.
The `Button` component accepts a `variant` prop.
```

---

## Best Practices

### Content Structure

1. **Start with context** - Begin pages with a brief introduction
2. **Use progressive disclosure** - Start simple, add complexity gradually
3. **Include practical examples** - Show code that users can copy
4. **Link to related content** - Connect to relevant docs

### Component Usage

1. **Callouts** - Use sparingly for truly important information
2. **Steps** - Use for sequential instructions (installation, setup)
3. **Tabs** - Use when showing equivalent alternatives (npm/pnpm/yarn)
4. **Code blocks** - Always specify the language for proper highlighting

### Writing Style

1. Use **second person** ("you") to address the reader
2. Use **imperative mood** for instructions ("Run the command")
3. Keep paragraphs **short and scannable**
4. Use **code formatting** for file names, commands, and technical terms

### SEO Considerations

1. **Title** - Should be descriptive and unique (50-60 characters ideal)
2. **Description** - Summarize the page content (150-160 characters ideal)
3. **Headings** - Use logical hierarchy (don't skip levels)
4. **Links** - Use descriptive link text (not "click here")

---

## Common Patterns

### Installation Guide Pattern

```mdx
---
title: "Installation"
description: "Learn how to install and configure the project."
order: 2
---

## Prerequisites

- Node.js 18 or later
- npm, yarn, or pnpm

## Installation

<Tabs defaultValue="npm">
  <TabsList>
    <TabsTrigger value="npm">npm</TabsTrigger>
    <TabsTrigger value="pnpm">pnpm</TabsTrigger>
  </TabsList>
  <TabsContent value="npm">
    ```bash
    npm install package-name
    ```
  </TabsContent>
  <TabsContent value="pnpm">
    ```bash
    pnpm add package-name
    ```
  </TabsContent>
</Tabs>

<Callout type="info">
  Verify installation by running `package-name --version`.
</Callout>
```

### Step-by-Step Tutorial Pattern

```mdx
---
title: "Quick Start"
description: "Get started in 5 minutes."
---

## Quick Start

<Steps>

<Step>

### Initialize Your Project

Create a new directory and initialize the project:

```bash
mkdir my-project
cd my-project
npm init -y
```

</Step>

<Step>

### Install Dependencies

```bash
npm install required-package
```

</Step>

<Step>

### Run the Application

```bash
npm start
```

<Callout type="success">
  Your app is now running at http://localhost:3000
</Callout>

</Step>

</Steps>
```

### API Reference Pattern

```mdx
---
title: "API Reference"
description: "Complete API documentation."
---

## Endpoints

### GET /api/items

Fetches a list of items.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | number | No | Max items to return |
| `offset` | number | No | Pagination offset |

**Response:**

```json
{
  "items": [],
  "total": 100
}
```

<Callout type="warning">
  Rate limited to 100 requests per minute.
</Callout>
```

---

## Quick Reference Card

| Element | Syntax | Notes |
|---------|--------|-------|
| Callout | `<Callout type="info">...</Callout>` | Types: info, warning, error, success |
| Steps | `<Steps><Step>...</Step></Steps>` | Auto-numbered |
| Tabs | `<Tabs defaultValue="x">...</Tabs>` | Match values carefully |
| Code block | ` ```lang title="file.ts" ` | Language + optional title |
| Inline code | `` `code` `` | For commands, names |
| Internal link | `[Text](/docs/page)` | Root-relative paths |
| Image | `![Alt](url)` | Alt text becomes caption |

---

## Notes for AI Agents

1. **Always validate frontmatter** - Missing required fields will cause build errors
2. **Test component syntax** - Invalid JSX will break the page
3. **Preserve empty lines** - Required around Steps/Step components
4. **Use consistent casing** - kebab-case for files, proper casing in titles
5. **Avoid hardcoded namespaces** - Use root-relative paths like `/docs/...`
6. **Include practical examples** - Users benefit from copy-paste code
7. **Match tab values exactly** - Mismatched values cause silent failures

---

*Last updated: 2025-01-03*
