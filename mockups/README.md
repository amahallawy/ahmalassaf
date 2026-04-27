# Mockups

Working HTML files from the design phase. These are the **approved design source-of-truth**, demonstrating every component, typography choice, color token, and interaction documented in [`../docs/design-spec.md`](../docs/design-spec.md).

## Files

| File | Purpose | Sections demonstrated |
|---|---|---|
| `home.html` | Home page mockup | Masthead, sticky nav with search popover, hero carousel, credo card, archive with category+year filter, about with vignette, contact form, newsletter card, footer |
| `post.html` | Article page mockup | Reading progress, breadcrumb, article header, TTS voice reader, featured image, body with TOC + share gutter, pull-quote, author card, related articles, comments, footer |

## How to view

Open either file directly in a modern browser. They're self-contained — Google Fonts load over the network, but no other dependencies. To view side-by-side mobile/desktop, resize the window or use browser dev tools.

```
# Windows
start mockups/home.html

# macOS
open mockups/home.html

# Linux
xdg-open mockups/home.html
```

## Status

**Reference-only after implementation begins.** Production files (`index.html`, `posts/<slug>.html`, `css/site.css`, `js/site.js` etc.) are the deliverables. Mockups are kept here as the design-source-of-truth for visual fidelity verification during implementation.

## Why two files instead of separate CSS/JS

These are mockups, not the production architecture. Each file inlines its CSS and JS for portability and review during the design phase. The production version (per the spec) splits into shared `css/site.css` and `js/site.js` with per-page HTML.
