# HTML to Markdown Conversion Guide

This guide will help you convert HTML files to Markdown format while maintaining Jekyll compatibility.

## Markdown Syntax Reference

### Headers

```markdown
# H1 Header {#id .class}

## H2 Header {#id .class}

### H3 Header {#id .class}
```

### Links

```markdown
[Link Text](URL)
[Email](mailto:email@domain.com)
```

### Lists

```markdown
-   Unordered list item
-   Another item
    -   Nested item

1. Ordered list item
2. Another item
```

### Emphasis

```markdown
_italic text_
**bold text**
**_bold and italic_**
```

### Images

```markdown
![Alt Text](/path/to/image.jpg)
```

### HTML in Markdown

You can still use HTML when needed:

```html
<center>
	<button class="btn">Custom Button</button>
</center>

<div class="custom-class"> Custom HTML content </div>
```

### Jekyll Front Matter

Always start your .md files with:

```yaml
---
layout: default
title: "Page Title"
description: "Page description for SEO"
keywords: "keyword1, keyword2, keyword3"
header_title: "Header Title" # Optional, defaults to title
robots: "noindex, nofollow" # Optional, for pages you don't want indexed
---
```

## Conversion Steps

1. **Rename file**: Change `.html` to `.md`
2. **Add front matter**: Include YAML front matter at the top
3. **Convert content**:
    - Replace `<h2>` with `##`
    - Replace `<h3>` with `###`
    - Replace `<p>` content with plain text
    - Convert `<ul><li>` to markdown lists
    - Keep complex HTML as-is when needed
4. **Remove HTML structure**: Remove `<html>`, `<body>`, `<nav>`, etc. (handled by layout)
5. **Test**: Run `bundle exec jekyll serve` to test locally

## Benefits of Markdown

-   **Cleaner content**: Focus on content, not markup
-   **Easier editing**: More readable and faster to edit
-   **Consistent formatting**: Jekyll ensures consistent styling
-   **SEO friendly**: Better structured content for search engines
-   **Version control friendly**: Easier to track changes in Git

## When to Use HTML in Markdown

-   Complex layouts with specific CSS classes
-   Interactive elements like buttons
-   Custom styling that Markdown doesn't support
-   Legacy components that are working well

## Custom Blockquotes

The site supports custom blockquotes with prompt styling:

### Basic Blockquote

```markdown
> This is a standard blockquote with left border styling.
```

> This is a standard blockquote with left border styling.

### Prompt Blockquotes

#### Tip Prompt

```markdown
> Use this for helpful tips and suggestions.
> {: .prompt-tip }
```

> Use this for helpful tips and suggestions.
> {: .prompt-tip }

#### Info Prompt

```markdown
> Use this for informational content.
> {: .prompt-info }
```

> Use this for informational content.
> {: .prompt-info }

#### Warning Prompt

```markdown
> Use this for warnings and important notes.
> {: .prompt-warning }
```

> Use this for warnings and important notes.
> {: .prompt-warning }

#### Danger Prompt

```markdown
> Use this for errors and critical information.
> {: .prompt-danger }
```

> Use this for errors and critical information.
> {: .prompt-danger }

### Usage Notes

-   Use Kramdown's attribute list syntax `{: .class-name }`
-   Each prompt includes appropriate Font Awesome icons
-   Colors match your site's design system
-   Fully responsive design

Remember: You can always mix Markdown and HTML in the same file!
