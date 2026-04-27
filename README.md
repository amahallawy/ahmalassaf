# ahmalassaf.com — redesign

A static HTML/CSS/JS redesign of [ahmalassaf.com](https://ahmalassaf.com), a serious Arabic literary blog by Ahmad bin Abdulmohsin Al-Assaf.

This repo contains the **redesign showcase** — home page, post page, and supporting components — built as plain static files. The current state of the world (commit history below) reflects the move from a dated WordPress theme to a modern editorial publication aesthetic, while preserving the existing color palette and information architecture.

## Status

**Design phase: complete.** Implementation phase: starting.

- ✅ Design spec — [`docs/design-spec.md`](docs/design-spec.md)
- ✅ Approved mockups — [`mockups/`](mockups/)
- ⏳ Implementation in progress

## Quick view

The mockups are self-contained HTML files. Open them directly in any modern browser:

```
mockups/home.html        ← Home page (masthead, carousel, archive, about, contact, newsletter, footer)
mockups/post.html        ← Article page (TOC, TTS, comments, related, share gutter)
```

Or once implementation begins, the production files will be:

```
index.html               ← Home
about.html               ← Author bio (تعريف وتنويه)
contact.html             ← Contact form (اتصل بنا)
posts/<slug>.html        ← Individual essays
```

## Design at a glance

- **Direction:** bold contemporary Arabic literary magazine
- **Languages:** Arabic only (RTL)
- **Palette:** brand blue `#1E5591` + ink `#4A4A4A` + page-bg `#F9F9F9` + paper `#FFFFFF` + honey gold `#C9974F`
- **Typography:**
  - **Aref Ruqaa** (calligraphic) — display titles, section headers
  - **Cairo** (modern sans) — UI scaffolding, nav, buttons, meta
  - **Amiri** (italic naskh) — body, ledes, editorial flourishes
- **No build pipeline** — pure static files; open and ship

Full rationale: [`docs/design-spec.md`](docs/design-spec.md).

## Project structure

```
.
├── README.md              ← This file
├── docs/
│   └── design-spec.md     ← Source-of-truth design document
├── mockups/               ← Working HTML mockups (design-phase artifacts)
│   ├── home.html
│   ├── post.html
│   └── README.md
└── (implementation files — added during build phase)
```

## How to add a new post (planned)

Once the implementation includes `posts/_template.html`, copy it to `posts/<your-slug>.html` and replace the placeholder content. Keep the slug ASCII-Latin (Arabic title goes inside the page); Eastern Arabic-Indic numerals (٠١٢٣) for dates.

## Author

Ahmad bin Abdulmohsin Al-Assaf — [ahmalassaf.com](https://ahmalassaf.com) · [@ahmalassaf](https://x.com/ahmalassaf)

## License

TBD.
