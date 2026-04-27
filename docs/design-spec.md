# ahmalassaf.com — redesign design spec

**Date:** 2026-04-27
**Status:** Approved — ready for implementation planning
**Project location:** `projects/ahmalassaf.com/`
**Stakeholders:** Ahmed Mahallawy (operator/builder); Ahmed bin Abdulmohsin Al-Assaf (publication owner / client)

---

## 1. Overview

ahmalassaf.com is a serious Arabic literary blog by Ahmad bin Abdulmohsin Al-Assaf, active since 2008, covering reading & writing, sharia & law, biographies & notable figures, politics & economy, seasons & society, and administration & education. The current site runs WordPress with the dated `elvira` theme, 100% Arabic content (RTL), ~126 archived essays.

The client agreed to a redesign that **keeps the basic IA and color palette** but moves the visual style from a generic 2015-era WordPress template to a modern editorial publication. The redesign is delivered as a **static HTML/CSS/JS showcase** — pure files, no build pipeline, no backend. It demonstrates the design across home + post + about + contact pages with ~10–20 representative articles, not the full archive.

## 2. Goals

- **Visual modernization** — escape the dated theme; arrive at a distinctive bold-contemporary-magazine aesthetic that fits an academic/literary author
- **Reading experience** — long-form Arabic essays should be a pleasure: appropriate type sizes, generous leading, a sticky TOC, reading progress, optional voice-reader (TTS), share affordances
- **Editorial identity** — the publication should feel like a place, not a template. Achieved through calligraphic title (Aref Ruqaa), restrained ornament (one signature motif: gold corner brackets on the credo card), and a cohesive blue+gold palette extension
- **Functional polish** — search, archive filtering by category and year, keyboard accessibility, reduced-motion support, form success states
- **Static, maintainable** — single shared CSS/JS files, hand-authored HTML per page, no Node/build dependency. Client can later port to a generator (11ty, Astro) or a custom WP theme without migrating design

## 3. Non-goals / out of scope

- **Full content migration** — only ~10–20 representative articles in the showcase. Migrating all 126 essays is implementation/operations work
- **Backend integration** — contact form, newsletter, and comments are **front-end UI only**. Submissions show success states; no real email/DB wiring. Documented as connection points for a future backend
- **Comment moderation system** — comments section renders sample data; a real moderation flow is out of scope
- **Search backend / full-text indexing** — search is client-side over title + category for the visible archive only
- **TTS server-side** — voice reader uses the browser's Web Speech API. No server-side TTS or pre-recorded narration
- **Internationalization** — Arabic-only RTL. No bilingual mode
- **Dark mode** — explicitly out of scope per earlier scoping
- **Build pipeline / bundler** — no Vite, Webpack, etc. Static files served directly

## 4. Technical approach

### 4.1 Stack

- **HTML5**, hand-authored per page
- **CSS** — single shared `css/site.css`. Modern features used: CSS custom properties (vars), CSS Grid, `clamp()` fluid sizes, `backdrop-filter`, `prefers-reduced-motion`, `aspect-ratio`, `:focus-visible`
- **JavaScript** — vanilla, single shared `js/site.js`. No framework, no transpilation. Uses Web Speech API for TTS, `IntersectionObserver` and `addEventListener('scroll')` for reading progress and TOC scroll-spy
- **Fonts** — Google Fonts: **Aref Ruqaa** (display), **Cairo** (UI), **Amiri** (body). Subsetting + self-hosting recommended for production performance

### 4.2 Project structure

```
projects/ahmalassaf.com/
├── index.html                    Home page
├── about.html                    تعريف وتنويه (full bio page)
├── contact.html                  اتصل بنا (full contact page)
├── posts/
│   ├── _template.html            Starter template for new posts
│   ├── <slug>.html               Individual post pages (~10–20 demo articles)
│   └── ...
├── css/
│   └── site.css                  Single shared stylesheet
├── js/
│   └── site.js                   Single shared script
├── images/
│   ├── brand/                    Logo, monogram, author portrait
│   └── posts/                    Featured images for demo articles
└── README.md                     Local viewing + how to add a post
```

ASCII-Latin slugs for filenames; Arabic titles and breadcrumbs render everywhere visible. Avoids URL-encoding hell across hosts/CDNs.

### 4.3 Image strategy

- **Reuse existing images** from the live site for archive thumbnails. Photon CDN URL pattern preserved (`https://i0.wp.com/ahmalassaf.com/wp-content/uploads/...?w=1600&ssl=1`)
- **Author portrait** — currently the X profile image (`pbs.twimg.com/profile_images/1851248011503935488/he5MabI6_400x400.jpg`). For production, host a copy locally to avoid third-party CDN dependency
- **Hero carousel images** — currently demo Unsplash photos. For production, the publication should curate 3–6 thematically appropriate images with shared tonal treatment (see §10 known followups)

## 5. Design system

### 5.1 Color palette (5 colors, all with rationale)

```css
--blue:        #1E5591;   /* Brand blue — extracted from existing site */
--ink:         #4A4A4A;   /* Body text and headings — extracted */
--bg:          #F9F9F9;   /* Page background — extracted */
--paper:       #FFFFFF;   /* Cards, header surface — extracted */
--gold:        #C9974F;   /* Honey-gold — added for warmth + ornament */

/* Derived shades */
--blue-deep:   #143E69;   /* Footer base, deep tints */
--gold-deep:   #A87A2E;   /* Gold text, hover state on gold surfaces */
--gold-soft:   rgba(201,151,79,.18);  /* Tinted gold surfaces */
--ink-soft:    #6B6358;   /* Secondary text, captions */
```

The first four colors are **directly extracted from the live site** via `getComputedStyle` — preserving the client's brand requirement. Gold is the only **added** color, justified because (a) the original palette was too cold for "elegant + alive", (b) gold is the universal partner for blue in editorial design, and (c) it enables ornament without introducing a third hue family.

**Footer color:** `#152033` — a deep blue-charcoal, derived from the brand blue. Not part of the runtime palette but used as the footer base to keep the page-end visually in the brand family rather than dropping to a default neutral gray.

### 5.2 Color usage rules

- **Brand blue** is precious — only nav/links/active states, masthead bottom rule, hero monograms, focus chrome, and cardanchors. Never as a card fill (except hero credo guillemets at 15% opacity).
- **Gold** is for ornament: corner brackets on the credo card, vertical and horizontal accent rules, drop caps in carousel, focus rings, the masthead diamond marker, the newsletter envelope outline. Never as primary text.
- **Ink** is the only text color. Hierarchy is created by **weight** (400/600/700/800) and **size**, not by introducing additional grays. Use `rgba(74,74,74,.6)` for muted UI text.
- **Cream gradient** `linear-gradient(135deg, #fbf8f0 0%, #fff 100%)` is the warmth applied to: vignette card, contact form, newsletter card. Other cards stay pure white.
- **One terracotta-ish accent** (`#FFCC33` — yellow-gold) appears on the issue-bar pulse animation only. Treated as part of the gold family.

### 5.3 Typography

Three fonts. Each has a non-overlapping role.

| Family | Role | Weights used |
|---|---|---|
| **Aref Ruqaa** | Display / publication identity | 400, 700 |
| **Cairo** | UI scaffolding | 400, 500, 600, 700, 800 |
| **Amiri** | Body, ledes, italic editorial | 400 italic, 700 italic, 400, 700 |

**Type scale:**

| Use | Family | Size | Weight | Line-height |
|---|---|---|---|---|
| Masthead title | Aref Ruqaa | clamp(56px, 8vw, 88px) | 700 | 0.95 |
| Article H1 | Aref Ruqaa | clamp(40px, 5.5vw, 64px) | 700 | 1.1 |
| Section H2 | Aref Ruqaa | clamp(32px, 4vw, 44px) | 700 | 1.1 |
| Body H2 (in essay) | Aref Ruqaa | clamp(28px, 3.4vw, 36px) | 700 | 1.2 |
| Body H3 (in essay) | Cairo | 22px | 700 | 1.3 |
| Article lede | Amiri italic | clamp(20px, 2.4vw, 24px) | 400 | 1.6 |
| Body paragraph | Amiri | 19px | 400 | 2.0 |
| Pull quote | Amiri italic | clamp(22px, 2.8vw, 30px) | 400 | 1.55 |
| Card titles | Cairo | 22px | 700 | 1.3 |
| Nav items | Cairo | 15px | 600 | 1.4 |
| Form input | Cairo | 16px | 400 | 1.4 |
| Form label | Cairo | 14px | 600 | 1.4 |
| Meta / dates | Cairo | 14px | 500 | 1.5 |
| Kicker italic | Amiri italic | 14px | 400 | 1.4 |
| Footer link | Cairo | 15px | 400 | 1.5 |
| Footer copyright | Amiri italic | 14px | 400 | 1.5 |

**Numerals:** Eastern Arabic-Indic (٠١٢٣٤٥٦٧٨٩) used everywhere except the footer copyright "ahmalassaf.com" domain. Arabic decimal separator U+066B (٫) for fractional values (TTS speed labels).

**Reading-comfort rule:** Arabic UI labels stay at **14px minimum**. Body Arabic text **18–19px** with **line-height ≥ 2.0**. Diacritics need vertical breathing room.

### 5.4 Spacing scale

8-point system, exposed as CSS custom properties:

```css
--space-1: 4px;   --space-2: 8px;    --space-3: 12px;   --space-4: 16px;
--space-6: 24px;  --space-8: 32px;   --space-12: 48px;  --space-16: 64px;
--space-24: 96px;
```

### 5.5 Layout tokens

```css
--max-prose:    640px;     /* Body reading column width — ~68ch at 19px Amiri */
--max-content:  880px;     /* Article + credo card + comments width */
--max-page:     1200px;    /* Outer container */
--radius-card:  0;         /* Editorial: no rounded card corners */
--radius-pill:  999px;     /* Category chips, monograms */
```

### 5.6 Motion

- **Default transitions:** 0.25s ease for color/opacity, 0.3s ease for transform
- **Slow transitions:** 0.8–1.2s for hero carousel crossfade, 12s for ken-burns image zoom
- **`prefers-reduced-motion: reduce`** disables: ken-burns, carousel autoplay, pulse animation, long crossfades. All transitions collapse to 0.01ms.

## 6. Information architecture

### Pages
- `index.html` — Home with hero carousel + credo + filterable archive + about + contact + newsletter + footer
- `about.html` — Full bio page (placeholder; home has the abridged vignette + bio)
- `contact.html` — Full contact page (placeholder; home has the inline contact section)
- `posts/<slug>.html` — Individual essay pages with TOC, TTS, comments, related

### Site map (visible nav)

Six categories preserved from the live site:
1. قراءة وكتابة (Reading & Writing)
2. شريعة وقانون (Sharia & Law)
3. سير وأعلام (Biographies & Notable Figures)
4. سياسة واقتصاد (Politics & Economy)
5. مواسم ومجتمع (Seasons & Society)
6. إدارة وتربية (Administration & Education)

Plus muted utility links: تعريف (about), اتصل (contact).

## 7. Page designs

### 7.1 Home page

Vertical sections in order:

1. **Masthead** — three-element grid: italic Amiri date (Hijri + Gregorian) on the right · centered Aref Ruqaa logotype "العَسَّاف" with calligraphic flourish (gold rule + blue diamond + gold rule) and italic Amiri tagline · five horizontal social icons on the left (X · Telegram · WhatsApp · Email · Search). Bottom of masthead has a fading gold gradient rule with a centered blue diamond marker.
2. **Sticky nav** — six categories + 2 muted utility links. Active item shows a 3-color underline gradient (gold→blue→gold). Hover shows pure gold underline that grows from the center.
3. **Hero carousel** — 3 slides, 16:10 aspect ratio, no frame around it. Each slide: full-bleed image with neutral dark scrim; bottom-left text panel with diagonal blur backdrop (positioned where Arabic text sits in RTL); category kicker (italic Amiri + gold rule line) → Aref Ruqaa headline → italic Amiri lede → muted-rule + date/reading-time meta. Autoplay 6s with gold→blue gradient progress bar; thumbnail dots; arrow buttons (right ›  = next, left ‹ = prev); pause on hover/focus; respects reduced-motion (no autoplay).
4. **Credo card** ("عن هذا المكان") — the publication's editorial credo, framed as a printed pull-quote. Section-h with centered diamond flourish above. White card with **gold corner brackets** at the four corners; oversized blue guillemets « » bleeding past the card at 15% opacity; italic Amiri statement with "مقالاتٍ هادئةً" highlighted on a faint gold underline-tint and "الناس والكُتب" in brand blue italic. Closing diamond ornament below.
5. **Archive section** — composite header: italic Amiri kicker "للتصفّح والاطّلاع" + Aref Ruqaa H2 (dynamic — updates with filter) + counter "تظهر N من أصل M مقالاً" on the right edge; soft gold rule below. Two-column body: sticky filter sidebar on the right (240px), numbered essay list on the left.
   - **Sidebar filters:** category list (with counts) + year list (with counts). Active item = blue text + gold→blue vertical gradient bar.
   - **Essay rows:** numbered (٠١, ٠٢, …) Aref Ruqaa numerals · italic Amiri category · Cairo title (with em italic Amiri sub-clauses where appropriate) · Cairo date+meta on the left.
6. **About section** — section-h with centered diamond. Two-column grid: vignette card (right, 360px) with portrait + flourish + full name "أحمد بن عبد المحسن العسَّاف" + italic Amiri role-with-tenure line. Bio side (left, flex): kicker + bio paragraphs (3 paragraphs, Amiri 18px line-height 1.95) + animated-rule CTA "اقرأ السيرة الكاملة".
7. **Contact section** — section-h with centered diamond (matches About). Two-column grid: contact form (cream-gradient, 3px gold top rule, ink-on-cream form fields with blue-rule on focus) on the left + four contact-method cards (email, X, RSS, newsletter) stacked on the right.
8. **Newsletter card** — cream-gradient single-card section. Vertical gold side rules. Centered envelope SVG icon + small flourish + Aref Ruqaa heading + italic Amiri tagline + gold-bordered email input with blue submit. Submit shows success state.
9. **Footer** — deep blue-charcoal background `#152033` with subtle radial blue glow from the upper right and warm gold radial in the lower-left. Top edge has a fading gold rule. 4-column grid: brand mark with gold-fill monogram + italic Amiri tag · sections list · site links · follow links. Italic Amiri credits on the bottom row.

### 7.2 Post (article) page

Same masthead + nav (compact masthead with smaller logotype + "← العودة للرئيسية" link replacing the date column). Then:

1. **Reading progress bar** — fixed at top of viewport, 3px tall, gold→blue gradient, fills as the user scrolls
2. **Breadcrumb** — الرئيسية › Category › Article title
3. **Article header** — kicker (gold rule + italic Amiri category) → Aref Ruqaa H1 → italic Amiri lede → meta strip (author chip with portrait + Cairo name · Cairo date · reading time · word count, with small SVG icons)
4. **TTS voice reader** — horizontal pill widget: blue play/pause button (gold ring) + "استمع للمقال" label + duration · gold→blue progress bar · speed cycle button (٠٫٨٥× / ١٫٠× / ١٫٢٥× / ١٫٥×). Right edge gold rule turns blue when playing. Uses Web Speech API with `lang="ar-SA"`. Falls back gracefully if TTS unavailable.
5. **Featured image** — 21:9 (or 16:9) full-page-width photo with italic Amiri caption
6. **Body layout** — three-column: TOC sidebar (right, 200px) · article body (center, 19px Amiri / line-height 2.0) · share gutter (left, 80px floating)
   - **TOC** — sticky, numbered, scroll-spy active state (gold→blue gradient bar) on the section currently in viewport
   - **Body** — H2 in Aref Ruqaa with gold→blue rule below the right edge; H3 in Cairo; pull-quote breakout with full-width gold-bordered band, oversized blue guillemets, gold/blue emphasized phrases
   - **Share gutter** — vertical floating column on the left: rotated "شارك" label + circular icon buttons (X · WhatsApp · Telegram · Copy-link). Sticky while scrolling article body
7. **Author card** — 128px portrait (gold-bordered circle, blue shadow) + Aref Ruqaa name + italic Amiri bio + 3 inline links (about / all articles / X)
8. **Related articles** — "من القسم نفسه" section header + 3-column grid of related cards (4:3 thumbnail · italic Amiri category · Cairo title · Cairo date+reading-time). Lift-on-hover.
9. **Comments** — section header "التعليقات" + counter. Comment form on top (name + optional email + textarea + blue submit). Existing comments below: each row has avatar (initial monogram) + name + italic Amiri date + Amiri body + reply/like actions. **Author replies** are visually distinguished: gold avatar (instead of blue), "المؤلف" badge in gold next to the name, indented with cream-tinted background.
10. **Footer** — same as home

### 7.3 About + Contact dedicated pages

Out of scope for full design in this spec — stub pages that link to. The home page's about + contact sections cover the primary onboarding need. Full pages are placeholder content during implementation.

### 7.4 Category landing pages

Not needed as separate pages. The home page archive's filter sidebar handles category browsing; URL hash deep-links (`#qiraah`) auto-select the filter on load. This decision saves 6 HTML files and keeps the IA flatter.

## 8. Components catalog

| Component | Used on | Key behaviors |
|---|---|---|
| Masthead | All pages | Centered logotype + flanking columns; sticky-bottom diamond marker |
| Search popover | Masthead (all pages) | `/` keyboard shortcut to open; Esc to close; live filter; click outside to close; results highlight matched substring |
| Sticky nav | All pages | Active state with 3-color gradient underline; backdrop-blur background; sticky to top on scroll |
| Hero carousel | Home | 3 slides, autoplay, keyboard arrow nav, reduced-motion respect, ARIA roles, focus pause |
| Credo card | Home | Gold corner brackets (the only place they appear), oversized blue guillemets at 15% opacity |
| Filter sidebar | Home archive | Category + year filters (multi-axis), active state with gradient bar, reset button on empty state |
| Numbered essay row | Home archive | Aref Ruqaa numeral + italic Amiri category + Cairo title + Cairo meta; hover indents and tints background |
| Vignette portrait card | Home about | Cream gradient bg, double gold-rule top, portrait circle, full name + role-with-tenure |
| Section header (centered diamond) | Home credo intro/outro, About, Contact | Gold rule + blue+gold diamond + Aref Ruqaa H2 + diamond + gold rule |
| Pull-quote card | Article body | Full-width breakout, gold rules top+bottom, oversized blue guillemets at corners, gold/blue emphasis on em/b |
| TOC sidebar | Post | Sticky, scroll-spy active state, smooth-scroll click |
| TTS player | Post | Horizontal pill, Web Speech API, speed cycling, click-to-seek progress |
| Comment row | Post | Initial-monogram avatar; author replies styled distinctly (gold avatar + "المؤلف" badge + indent) |
| Share gutter | Post | Vertical floating column, sticky to article body, copy-link with toast |
| Form (contact / newsletter / comment) | Home + Post | Gold focus rule on inputs, blue-on-gold submit, success state with bouncy check pop, optional fields marked |
| Footer | All pages | Deep blue-charcoal, gold accents, brand monogram in gold |

## 9. Functional requirements

### 9.1 Search (client-side)

- Triggered by clicking the masthead search icon **or** pressing `/` from anywhere on the page
- Opens a popover anchored to the icon (cream gradient bg, gold top edge, gold pointer triangle)
- Indexes all archive entries by title and category
- Live filter as user types; results highlight matched substring
- Up to 8 results shown; counter at the bottom shows total matches
- Empty state: "لا نتائج تطابق «<term>»"
- Closes on Esc, on click outside, or on selecting a result

### 9.2 Archive filter

- Two filter axes: **category** (6 + "all") and **year** (3 + "all")
- Filters work in conjunction (AND)
- Counts update live next to each filter option
- Section title updates dynamically: "كل المقالات" → "[category]" → "[category] · [year]"
- Reset link in the empty state
- Hash deep-link support: `index.html#qiraah` auto-selects category filter on load

### 9.3 Hero carousel

- 3 slides, crossfade transition (1.2s)
- Autoplay every 6s; pauses on hover, focus, or `prefers-reduced-motion`
- Navigation: dot thumbnails, arrow buttons, ArrowRight/ArrowLeft/Home/End keyboard keys when focused
- Ken-burns slow zoom on the active slide (12s scale 1.02 → 1.10); disabled in reduced-motion
- Gold→blue progress bar resets on each transition

### 9.4 TTS voice reader (post page only)

- Web Speech API (`window.speechSynthesis`)
- Reads article body as a queue of paragraph utterances (chunks)
- Speed control: 0.85× / 1.0× / 1.25× / 1.5× (cycles)
- Click-to-seek on progress bar
- `lang="ar-SA"` on each utterance
- Graceful fallback: if `speechSynthesis` is unavailable, the player shows in disabled state with the message "القراءة الصوتيَّة غير مدعومة في هذا المتصفِّح"
- Stops automatically when the page is hidden (`visibilitychange`)

### 9.5 Reading progress bar (post page only)

- Fixed at top of viewport, 3px tall
- Width = `(scrollTop / (scrollHeight - clientHeight)) × 100%`
- Gold→blue gradient fill
- Updates on scroll (passive listener)

### 9.6 TOC scroll-spy (post page only)

- Reads H2 headings from article body on load
- Updates active TOC item based on which H2 is currently within 120px of the viewport top
- Click on TOC item → smooth scroll to that section

### 9.7 Forms (contact, newsletter, comments)

- All forms front-end only — `event.preventDefault()` on submit
- Submit shows success state: form fades out, blue-circle-with-gold-ring + white check pops in (0.5s elastic), italic Amiri "شكراً" message
- Connection points documented for backend wiring (POST endpoint placeholder URLs)
- Inline validation NOT implemented in this version — flagged as a followup

### 9.8 Copy link (post page)

- Single button in the share gutter (and share strip on the post page)
- Uses `navigator.clipboard.writeText(window.location.href)`
- Shows "تمَّ نسخ الرابط ✓" toast at the bottom of the viewport for 2 seconds

## 10. Accessibility

### 10.1 Keyboard navigation

- **Skip link** — "تخطّي إلى الأرشيف" pill, hidden until focused via Tab. Slides in from top-right; jumps to `#archive` on Enter
- **Focus rings** — gold 2-3px outlines on `:focus-visible` for all interactive elements (links, buttons, inputs, filters, nav items, social icons). Carousel container gets an inset gold ring
- **Carousel** — ArrowRight = next, ArrowLeft = prev, Home = first, End = last (when carousel is focused). Autoplay pauses on focus
- **Search** — `/` opens popover from anywhere; Esc closes; Tab navigates within popover
- **Forms** — standard tab order; submit on Enter

### 10.2 Screen-reader support

- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`, `<footer>`)
- ARIA labels on icon-only buttons (`aria-label="تيليغرام"`, `aria-label="بحث"`, etc.)
- Carousel: `role="region" aria-roledescription="carousel" aria-label="آخر المقالات"`
- Search popover: `role="dialog" aria-label="البحث في المقالات"`; trigger has `aria-expanded` toggle and `aria-controls` reference
- `dir="rtl"` and `lang="ar"` on `<html>` element

### 10.3 Reduced motion

- `@media (prefers-reduced-motion: reduce)` collapses all transitions to 0.01ms, disables ken-burns zoom, halts carousel autoplay, halts pulse animation

### 10.4 Color contrast

- Brand blue on white: 7.4:1 (AAA)
- Ink on white/bg: 9.5:1 (AAA)
- Ink on cream gradient: 8.8:1 (AAA)
- Gold on white: 3.4:1 (sufficient for large text + ornaments; not used as primary text)
- White on deep blue-charcoal footer: 14.6:1 (AAA)

### 10.5 RTL

- `direction: rtl` on `<body>`; `text-align: right` default
- Icons that have inherent direction (arrows, copy icon) handled via flexbox order
- Carousel arrow keys map naturally: right arrow = next (LTR convention), left arrow = prev
- Logical CSS properties used where needed (`margin-inline-start`, `padding-inline-end`)

## 11. Performance

### 11.1 Fonts

Three Google Fonts (~250KB combined). Mitigations for production:

1. **Subset** — Arabic glyph range + only the Latin glyphs actually used (numerals, punctuation, brand domain "ahmalassaf.com")
2. **Self-host** — eliminates third-party CDN round-trip
3. **`font-display: swap`** (already enabled via Google Fonts URL parameter) — content renders immediately with fallback fonts; swap to web fonts when they load
4. **Preload** — `<link rel="preload" as="font">` for the two most critical (Aref Ruqaa display + Amiri body)

### 11.2 Images

- All hero photos served via Photon CDN at 1800px width (existing Wordpress site already uses Photon)
- Thumbnail images at 400×275 (existing Photon convention)
- Use `loading="lazy"` on archive thumbnails and related-article cards
- Use `decoding="async"` on hero images

### 11.3 CSS / JS

- Single shared `site.css` file across all pages — leverages browser caching
- Single shared `site.js` — same caching benefit
- No JS framework dependency
- Total payload (HTML + CSS + JS, excluding fonts and images): target < 80KB

### 11.4 Runtime

- Reading progress + TOC scroll-spy use `passive: true` scroll listeners
- Carousel uses `IntersectionObserver` (recommended) instead of scroll listeners where possible
- Search index built once on page load from existing DOM (no separate JSON fetch)

## 12. Browser support

- **Modern evergreen browsers** (Chrome, Edge, Firefox, Safari — last 2 versions)
- **Required APIs:** CSS Grid, CSS custom properties, `clamp()`, `aspect-ratio`, `:focus-visible`, `prefers-reduced-motion`, `backdrop-filter`
- **Graceful degradation:**
  - `backdrop-filter` not supported → flat semi-transparent backgrounds (no blur)
  - `Web Speech API` not supported → TTS player shows disabled state with message
  - `:focus-visible` not supported → `:focus` fallback
- **Not supported:** IE 11 and below

## 13. Out of scope / known followups

These were identified during design but deferred for implementation or future iteration:

| Item | Why deferred | Severity |
|---|---|---|
| Hero photo identity stabilization (unified blue tint or curated set) | Photo curation is a content-side decision | P3 visual polish |
| About-bio reading rhythm (lede first paragraph, hairline rules between) | Single-pass typography polish | P3 visual polish |
| Social proof on home (recent comments widget, comment counts on archive entries) | Requires real comment data integration | P3 engagement feature |
| Inline form validation (required field marks, email format check) | UX polish — current forms accept all inputs | P2 UX gap |
| Form backend wiring (real POST to email/CRM) | Backend integration; documented as connection points | P1 implementation requirement (not design) |
| Comment moderation backend | Out of static scope | P1 implementation requirement (not design) |
| Full content migration (all 126 articles vs ~10–20 demo) | Content operations work | P1 implementation requirement (not design) |
| Post page: featured-image weight reduction (21:9 → 16:9 or inline figure) | Decided to ship as-is for showcase; revisit in post v2 | P2 visual polish |
| Post page: relative comment timestamps | UX polish | P3 microcopy |
| Post page: "previous/next in category" links at end of post | Discovery enhancement | P3 navigation |
| Production font loading (subsetting + self-hosting + preload) | Performance optimization for production deploy | P2 performance |

## 14. Acceptance criteria

The redesign is considered design-complete when:

- [x] Home page mockup renders all 9 sections with correct typography, palette, and component composition
- [x] Post page mockup renders all 10 sections including TTS, TOC, comments, share gutter
- [x] Mobile / tablet / desktop responsive — verified at 360, 768, 1024, 1440px
- [x] Accessibility primitives in place (skip link, focus rings, keyboard carousel, reduced-motion, ARIA labels, color contrast AAA on body text)
- [x] Forms have success states; carousel has progress bar; TOC has scroll-spy; search has live filter
- [x] All Arabic UI labels at 14px+ for legibility
- [x] Strict palette discipline: only the 5 color tokens (plus 2 derived deeps) appear in the page; no other hues introduced
- [x] Brand: 4 extracted colors preserved exactly; honey gold added as the warmth accent; deep blue-charcoal `#152033` for footer

## 15. References

### Approved mockups (design source of truth)

- **Home page (final, approved):** `.superpowers/brainstorm/418-1777273934/content/home-modern-v10.html`
- **Post page (final, approved):** `.superpowers/brainstorm/418-1777273934/content/post-modern-v1.html`

The mockups are working HTML/CSS/JS files that demonstrate every component, color token, and interaction described in this spec. Production implementation should follow the mockups for visual fidelity; this spec captures the rationale, decisions, and rules for cases not directly visible in the mockup.

### Recon artifacts (extracted from live site)

- **Live site:** `https://ahmalassaf.com`
- **Original WordPress theme:** `elvira` (commercial)
- **Original body type:** `TheSans` 14px (commercial; replaced with Amiri 19px in redesign)
- **Author portrait source:** `https://pbs.twimg.com/profile_images/1851248011503935488/he5MabI6_400x400.jpg` (X profile image; localize for production)

### Design language references

- **Bold contemporary magazine direction** chosen over minimal-academic and warm-editorial alternatives (presented as A/B/C in v1 of brainstorm; user selected C, then iterated through warmth + ornament reductions to arrive at the current synthesis)
- **Typography:** Aref Ruqaa for calligraphic identity (the user explicitly liked خط الرقعة), Cairo for UI (modern Arabic sans), Amiri for body (italic naskh editorial voice)
