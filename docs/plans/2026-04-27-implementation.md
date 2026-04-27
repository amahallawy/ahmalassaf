# ahmalassaf.com Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the static HTML/CSS/JS production site for ahmalassaf.com — visual parity with the approved mockups (`mockups/home.html`, `mockups/post.html`), refactored from monolithic mockup files into modular shared CSS + per-page HTML.

**Architecture:** Pure static — single shared `css/site.css`, single shared `js/site.js`, hand-authored HTML per page. No build pipeline. Three Google Fonts loaded over network (Aref Ruqaa display, Cairo UI, Amiri body). Vanilla JS using Web Speech API, CSS Grid, custom properties, `prefers-reduced-motion`, `:focus-visible`, `IntersectionObserver`-style patterns.

**Tech Stack:** HTML5 · CSS (custom properties, Grid, `clamp()`, `backdrop-filter`, `aspect-ratio`) · vanilla JavaScript (ES2020+) · Google Fonts.

**Repository:** `projects/ahmalassaf.com/` inside the Company workspace, pushing to `https://github.com/amahallawy/ahmalassaf.git`. Workspace conventions: feature-branch workflow (no direct main commits), specific-file `git add` (no `-A`), Claude trailer on commits.

---

## File Structure

After implementation, the project tree will be:

```
projects/ahmalassaf.com/
├── README.md                         (exists)
├── .gitignore                        (exists)
├── docs/
│   ├── design-spec.md                (exists)
│   └── plans/
│       └── 2026-04-27-implementation.md   (this file)
├── mockups/                          (exists — reference only)
│   ├── home.html
│   ├── post.html
│   └── README.md
├── index.html                        Home — 9 sections
├── about.html                        Stub linking back to home about section
├── contact.html                      Stub linking back to home contact section
├── posts/
│   ├── _template.html                Starter for new posts
│   ├── aadad-wizariya.html           Demo post 1 — used during dev to verify post layout
│   ├── dalail-aaraqa.html            Demo post 2
│   ├── mudawanat-asr-raqami.html     Demo post 3
│   ├── aalam-tafkir-qanuni.html      Demo post 4
│   ├── min-masail-aaraqa.html        Demo post 5
│   ├── abu-najm.html                 Demo post 6
│   ├── al-malik-khalid.html          Demo post 7
│   ├── samnudi-tabib-faisal.html     Demo post 8
│   ├── muthaqaf-uzla.html            Demo post 9
│   ├── nizam-hukm-mawardi.html       Demo post 10
│   ├── maena-mawsim.html             Demo post 11
│   └── iqtisad-rai.html              Demo post 12
├── css/
│   └── site.css                      Single shared stylesheet
├── js/
│   └── site.js                       Single shared script
└── images/
    ├── brand/
    │   └── portrait.jpg              Localized author portrait
    └── posts/
        └── (featured images cached locally over time)
```

The implementation refactors the working mockup HTML files (which inline all CSS and JS) into modular shared resources. Mockups stay as visual source-of-truth.

---

## Testing Approach

This is a static showcase with **no build pipeline** by design. Adding a JS test framework (Jest, Vitest, Playwright) would introduce npm/Node dependency, contradicting the spec.

**Verification strategy is manual visual + behavioral inspection in a real browser.** Each task has explicit verification steps:
- Open the affected page(s) in Chrome and Firefox
- Compare rendering against the approved mockup at `mockups/home.html` or `mockups/post.html`
- Test keyboard interactions (Tab, arrows, Esc, /, Enter)
- Test reduced-motion by enabling `prefers-reduced-motion: reduce` in browser dev tools
- Test responsive breakpoints at 360px, 768px, 1024px, 1440px

If a future phase wants automated tests, Playwright runs from CLI without affecting static delivery and can be added retroactively.

---

## Phasing — 12 PRs, each independently shippable

| # | Branch | Goal |
|---|---|---|
| 1 | `feat/01-foundation` | Design tokens, fonts, base styles, placeholder index.html |
| 2 | `feat/02-shared-chrome` | Masthead, nav, footer (used by every page) |
| 3 | `feat/03-hero-carousel` | Home hero carousel with autoplay, keyboard nav, reduced-motion |
| 4 | `feat/04-credo-archive` | Credo card + filterable archive (sidebar filter + numbered list) |
| 5 | `feat/05-about-contact-newsletter` | Remaining home sections — about vignette, contact form, newsletter card |
| 6 | `feat/06-search-popover` | Client-side search popover with `/` shortcut |
| 7 | `feat/07-post-foundation` | Post page layout, reading progress, TOC scroll-spy |
| 8 | `feat/08-tts-voice-reader` | Web Speech API voice reader with speed control |
| 9 | `feat/09-post-engagement` | Comments, share gutter, author card, related articles |
| 10 | `feat/10-demo-content` | 11 additional demo articles + about/contact stubs |
| 11 | `feat/11-accessibility` | Skip link, focus rings, ARIA, reduced-motion verification |
| 12 | `feat/12-visual-parity` | Side-by-side comparison vs mockups, fix discrepancies |

Each PR follows: branch → commits → push → PR to `main` → merge → delete branch.

---

## Commit & PR Conventions (workspace)

**Branch naming:** `feat/NN-descriptive-slug`

**Commit message format:**
```
type: subject

- Detailed bullet 1
- Detailed bullet 2

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

**Allowed types:** `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `perf`, `test`

**File staging:** Always specific files. Never `git add -A` / `git add .`.

**Push:** `git push -u origin feat/NN-...`

**PR:** Open on GitHub, target `main`, merge after review.

---

## Phase 1: Foundation — design tokens, fonts, base styles

**Branch:** `feat/01-foundation`

**Files:**
- Create: `projects/ahmalassaf.com/css/site.css`
- Create: `projects/ahmalassaf.com/index.html` (minimal — just to verify tokens render)

**Goal:** Set up the CSS custom properties (palette, typography, spacing, layout), load the three Google Fonts, define base reset and typography. After this phase, `index.html` shows a placeholder centered title using Aref Ruqaa on the cream/blue/gold palette — proving the foundation works.

- [ ] **Step 1: Create the feature branch**

```bash
cd projects/ahmalassaf.com
git checkout main
git pull origin main
git checkout -b feat/01-foundation
```

- [ ] **Step 2: Create `css/site.css` with tokens, fonts, reset, base typography**

Path: `projects/ahmalassaf.com/css/site.css`

```css
/* ============================================================
   ahmalassaf.com — site styles
   Foundation: tokens, fonts, reset, base typography.
   See docs/design-spec.md §5 for design system rationale.
============================================================ */

@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Aref+Ruqaa:wght@400;700&display=swap');

:root {
  /* Palette (5 colors) */
  --blue:        #1E5591;
  --blue-deep:   #143E69;
  --bg:          #F9F9F9;
  --paper:       #FFFFFF;
  --ink:         #4A4A4A;
  --ink-soft:    #6B6358;
  --gold:        #C9974F;
  --gold-deep:   #A87A2E;
  --gold-soft:   rgba(201,151,79,.18);
  --footer-bg:   #152033;
  --paper-cream: linear-gradient(135deg, #fbf8f0 0%, #ffffff 100%);

  /* Typography */
  --font-display: 'Aref Ruqaa', 'Amiri', serif;
  --font-ui:      'Cairo', system-ui, sans-serif;
  --font-body:    'Amiri', Georgia, serif;

  /* Spacing (8-pt) */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;

  /* Layout */
  --max-prose:   640px;
  --max-content: 880px;
  --max-page:    1200px;
  --radius-pill: 999px;
}

/* ===== reset ===== */
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
img, svg { display: block; max-width: 100%; }
button { font: inherit; color: inherit; cursor: pointer; }
a { color: inherit; }

/* ===== base ===== */
body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-ui);
  direction: rtl;
  text-align: right;
  font-feature-settings: "tnum" 1;
  -webkit-font-smoothing: antialiased;
}

/* ===== reduced motion ===== */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ===== focus rings ===== */
:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 3px;
}

/* ===== visually hidden (sr-only) ===== */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

/* ===== container utilities ===== */
.container {
  max-width: var(--max-page);
  margin: 0 auto;
  padding: 0 var(--space-8);
}
```

- [ ] **Step 3: Create minimal `index.html` to verify the foundation**

Path: `projects/ahmalassaf.com/index.html`

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مدوَّنة العسَّاف — قيد البناء</title>
<meta name="description" content="مدوَّنة في القراءة والكتابة والسير ـ منذ ٢٠٠٨">
<link rel="stylesheet" href="css/site.css">
</head>
<body>
  <main class="container" style="text-align: center; padding: var(--space-24) var(--space-8);">
    <h1 style="font-family: var(--font-display); font-weight: 700; font-size: clamp(48px, 8vw, 88px); color: var(--ink); margin: 0 0 var(--space-4);">الـعَـسَّـاف</h1>
    <p style="font-family: var(--font-body); font-style: italic; font-size: 18px; color: var(--ink-soft); margin: 0 0 var(--space-12);">
      قيد البناء — سيُطلَق قريباً
    </p>
    <div style="display: flex; align-items: center; justify-content: center; gap: var(--space-3);">
      <span style="width: 72px; height: 1px; background: var(--gold); opacity: .65;"></span>
      <span style="width: 10px; height: 10px; background: var(--blue); border: 1.5px solid var(--gold); transform: rotate(45deg);"></span>
      <span style="width: 72px; height: 1px; background: var(--gold); opacity: .65;"></span>
    </div>
  </main>
</body>
</html>
```

- [ ] **Step 4: Open `index.html` in a browser and verify**

Open `projects/ahmalassaf.com/index.html` directly:
- Centered Aref Ruqaa "الـعَـسَّـاف" title in dark gray on off-white background
- Italic Amiri "قيد البناء — سيُطلَق قريباً" subtitle in muted gray
- Below the subtitle: gold rule + blue diamond with gold outline + gold rule

If fonts haven't loaded (first paint), the title shows in serif fallback. After ~500ms the Aref Ruqaa font swaps in.

- [ ] **Step 5: Commit**

```bash
cd projects/ahmalassaf.com
git add css/site.css index.html
git commit -m "$(cat <<'EOF'
feat: foundation CSS tokens and minimal index.html

Set up the design system foundation:

- css/site.css with @font-face imports (Aref Ruqaa, Cairo,
  Amiri), CSS custom properties for the 5-color palette
  (blue, ink, bg, paper, gold) plus derived shades, the
  3-font typography stack, the 8-pt spacing scale, and
  layout max-width tokens.
- Reset, base body styling (RTL, Cairo UI default), reduced-
  motion media query, brand-colored focus rings, and the
  sr-only utility.
- index.html stub displaying the brand title with the
  diamond+gold-rule flourish to verify fonts and tokens
  load correctly.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push -u origin feat/01-foundation
```

- [ ] **Step 6: Open PR on GitHub and merge to main**

PR title: `feat: foundation CSS tokens and minimal index.html`

After merge: `git checkout main && git pull && git branch -d feat/01-foundation`

---

## Phase 2: Shared Chrome — masthead, nav, footer

**Branch:** `feat/02-shared-chrome`

**Files:**
- Modify: `css/site.css` — add masthead, nav, footer component sections
- Modify: `index.html` — replace placeholder with full masthead + nav + footer (empty middle)
- Create: `about.html`, `contact.html` — stubs that share masthead+nav+footer

**Goal:** All three pages share the same masthead, sticky nav, and footer. After this phase, navigating between `index.html`, `about.html`, `contact.html` shows consistent chrome with empty middle sections.

- [ ] **Step 1: Create the feature branch**

```bash
cd projects/ahmalassaf.com
git checkout main && git pull
git checkout -b feat/02-shared-chrome
```

- [ ] **Step 2: Append masthead + nav + footer CSS to `css/site.css`**

Open `mockups/home.html` and copy these CSS sections into `css/site.css` (append to the existing file):

1. The `/* ============ MASTHEAD ============ */` block — includes `.masthead`, `.masthead::after`, `.masthead::before`, `.mast-inner`, `.mast-date`, `.mast-title` and its variants, `.mast-social`. Search the mockup file for `/* ============ MASTHEAD ============ */`.
2. The `/* ============ NAV ============ */` block — `.nav`, `.nav-inner`, `.nav-item`, `.nav-item.active`, `.nav-item.muted`, `.nav-divider`. Search for `/* ============ NAV ============ */`.
3. The `/* ============ FOOTER ============ */` block — `footer`, `footer::before`, `footer::after`, `.foot-inner`, `.foot-top`, `.foot-col`, `.foot-brand`, `.foot-mono-sm`, `.foot-tag`, `.foot-bottom`. Search for `/* ============ FOOTER ============ */`.

These are paste-as-is — they reference the design tokens already defined in Phase 1. Do not modify them.

- [ ] **Step 3: Replace `index.html` with the full chrome shell**

Path: `projects/ahmalassaf.com/index.html`

Replace the entire file with this. The content between `<!-- HOME SECTIONS GO HERE -->` and `<!-- /HOME SECTIONS -->` will be filled in subsequent phases.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مدوَّنة أحمد بن عبدالمحسن العسَّاف</title>
<meta name="description" content="مدوَّنة في القراءة والكتابة والسير ـ منذ ٢٠٠٨">
<link rel="stylesheet" href="css/site.css">
</head>
<body>

  <!-- skip link (visible on keyboard focus) -->
  <a href="#archive" class="skip-link">تخطّي إلى الأرشيف</a>

  <!-- ============ MASTHEAD ============ -->
  <header class="masthead">
    <div class="mast-inner">
      <div class="mast-date">
        <b>السبت ٢٧ شوال ١٤٤٧</b>
        الموافق ٢٥ أبريل ٢٠٢٦
      </div>
      <div class="mast-title">
        <a href="/" style="text-decoration:none;">
          <div class="word">الـعَـسَّـاف</div>
          <div class="flourish"><div class="line"></div><div class="diamond"></div><div class="line"></div></div>
          <div class="sub">مدوَّنة في القراءة والكتابة والسير</div>
        </a>
      </div>
      <div class="mast-social">
        <!-- copy the 5 social icon links from mockups/home.html -->
        <!-- (X, Telegram, WhatsApp, Email, Search) -->
        <!-- For now, paste the entire <div class="mast-social">...</div> from the mockup -->
      </div>
    </div>
  </header>

  <!-- ============ NAV ============ -->
  <nav class="nav">
    <div class="nav-inner">
      <a class="nav-item active" href="/">قراءة وكتابة</a>
      <a class="nav-item" href="/?cat=shariah">شريعة وقانون</a>
      <a class="nav-item" href="/?cat=siyar">سير وأعلام</a>
      <a class="nav-item" href="/?cat=siyasah">سياسة واقتصاد</a>
      <a class="nav-item" href="/?cat=mawasim">مواسم ومجتمع</a>
      <a class="nav-item" href="/?cat=idarah">إدارة وتربية</a>
      <span class="nav-divider"></span>
      <a class="nav-item muted" href="/about.html">تعريف</a>
      <a class="nav-item muted" href="/contact.html">اتصل</a>
    </div>
  </nav>

  <!-- HOME SECTIONS GO HERE -->
  <main style="min-height: 50vh; padding: var(--space-16) var(--space-8); text-align: center;">
    <p style="font-family: var(--font-body); font-style: italic; color: var(--ink-soft);">
      محتوى الصفحة سيُضاف في المراحل التالية.
    </p>
  </main>
  <!-- /HOME SECTIONS -->

  <!-- ============ FOOTER ============ -->
  <footer>
    <!-- copy the entire <footer>...</footer> body from mockups/home.html -->
  </footer>

</body>
</html>
```

Now copy the actual content from `mockups/home.html`:
- The full `<div class="mast-social">...</div>` (5 icons with their SVGs)
- The full `<footer>...<div class="foot-inner">...</div></footer>` block

The skip-link and masthead+nav structure are already in place. Only `mast-social` and `<footer>` need to be filled from the mockup.

- [ ] **Step 4: Add the skip-link CSS to `css/site.css`**

Append this to `css/site.css` (it lives with the accessibility primitives — Phase 11 expands these but the skip-link belongs with the chrome since the chrome links to `#archive`).

```css
/* ============ SKIP LINK ============ */
.skip-link {
  position: absolute;
  top: -64px;
  right: 16px;
  background: var(--blue);
  color: var(--paper);
  padding: 12px 22px;
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  border: 1.5px solid var(--gold);
  z-index: 1000;
  transition: top .2s ease;
  box-shadow: 0 4px 16px rgba(0,0,0,.2);
}
.skip-link:focus {
  top: 16px;
  outline: none;
}
```

- [ ] **Step 5: Create `about.html` and `contact.html` stubs**

Path: `projects/ahmalassaf.com/about.html`

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تعريف وتنويه — مدوَّنة العسَّاف</title>
<link rel="stylesheet" href="css/site.css">
</head>
<body>
  <a href="/#archive" class="skip-link">تخطّي إلى المحتوى</a>

  <!-- COPY THE EXACT MASTHEAD + NAV FROM index.html -->

  <main class="container" style="padding: var(--space-16) var(--space-8); max-width: var(--max-content);">
    <h1 style="font-family: var(--font-display); font-weight: 700; font-size: clamp(36px, 5vw, 56px); color: var(--ink); margin: 0 0 var(--space-6);">تعريف وتنويه</h1>
    <p style="font-family: var(--font-body); font-style: italic; font-size: 19px; line-height: 1.95; color: var(--ink); max-width: var(--max-prose);">
      أحمد بن عبد المحسن العسَّاف — كاتب ومدوِّن سعودي منذ العام ٢٠٠٨ ـ يُعنى بالأدب، والسير، والشريعة، والشأن العام. للمزيد عن المؤلف والمدوَّنة، يُرجى زيارة قسم «عن المؤلف» في الصفحة الرئيسية.
    </p>
    <p style="margin-top: var(--space-8);">
      <a href="/#about" style="font-family: var(--font-ui); font-weight: 700; color: var(--blue); border-bottom: 1px solid var(--gold);">العودة إلى قسم التعريف في الصفحة الرئيسية ←</a>
    </p>
  </main>

  <!-- COPY THE EXACT FOOTER FROM index.html -->
</body>
</html>
```

Copy masthead + nav from `index.html` (verbatim) into the marked location.
Copy footer from `index.html` (verbatim) into the marked location.

Path: `projects/ahmalassaf.com/contact.html` — same structure but the H1 is "اتصل بنا" and the body says:

```html
<h1 style="font-family: var(--font-display); font-weight: 700; font-size: clamp(36px, 5vw, 56px); color: var(--ink); margin: 0 0 var(--space-6);">اتصل بنا</h1>
<p style="font-family: var(--font-body); font-style: italic; font-size: 19px; line-height: 1.95; color: var(--ink);">
  للتواصل المباشر، يُرجى استخدام نموذج الاتصال في الصفحة الرئيسية أو إحدى وسائل التواصل البديلة.
</p>
<p style="margin-top: var(--space-8);">
  <a href="/#contact" style="font-family: var(--font-ui); font-weight: 700; color: var(--blue); border-bottom: 1px solid var(--gold);">العودة إلى قسم الاتصال في الصفحة الرئيسية ←</a>
</p>
```

- [ ] **Step 6: Verify in browser**

Open `index.html`, `about.html`, `contact.html`:
- All three show the masthead with the date column (right), centered logotype "الـعَـسَّـاف" with diamond flourish, and 5 social icons (X · Telegram · WhatsApp · Email · Search) on the left
- Sticky nav with active "قراءة وكتابة" highlighted
- Empty middle section
- Footer in deep blue-charcoal with gold accents
- Press Tab — skip-link slides in from top-right with brand colors
- Hover any social icon — circle flips to brand blue

- [ ] **Step 7: Commit**

```bash
cd projects/ahmalassaf.com
git add css/site.css index.html about.html contact.html
git commit -m "$(cat <<'EOF'
feat: shared chrome — masthead, sticky nav, dark footer

Lift masthead, nav, and footer styles from the mockup into
css/site.css and apply them to index.html plus about.html
and contact.html stubs. All three pages now share:

- Masthead: 3-column grid with date column, centered Aref
  Ruqaa logotype + diamond flourish, 5-icon social row.
- Sticky nav: 6 categories + 2 muted utility links, with
  the gold/blue gradient underline on active and hover.
- Footer: deep blue-charcoal #152033 with gold gradient top
  rule, gold-fill brand monogram, italic Amiri credits.
- Skip link: keyboard-focus-only pill at top-right.

About and contact are minimal redirect stubs that point
back to the home page sections (the home page carries the
full content; these pages are SEO/permalink stubs).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push -u origin feat/02-shared-chrome
```

- [ ] **Step 8: Open PR + merge to main + delete branch**

---

## Phase 3: Hero Carousel

**Branch:** `feat/03-hero-carousel`

**Files:**
- Modify: `css/site.css` — add hero/carousel CSS section
- Modify: `index.html` — add hero carousel section after the nav
- Create: `js/site.js` — first script file, contains carousel logic
- Modify: `index.html` — add `<script src="js/site.js"></script>` before `</body>`

**Goal:** Working 3-slide carousel between nav and the eventual archive section. Autoplay every 6s with gold→blue progress bar, thumbnail-image dots, arrow buttons (right `›` = next, left `‹` = prev), keyboard arrow nav when focused, pause on hover/focus, respect `prefers-reduced-motion`.

- [ ] **Step 1: Branch**

```bash
git checkout main && git pull
git checkout -b feat/03-hero-carousel
```

- [ ] **Step 2: Add hero/carousel CSS to `css/site.css`**

Open `mockups/home.html` and copy the `/* ============ HERO ============ */` CSS block — includes `.hero`, `.hero-inner`, `.carousel`, `.slide`, `.slide .img-wrap`, `.slide .img`, `.slide .scrim`, `.slide .text-bg`, `.slide .content`, `.slide .kicker`, `.slide h2`, `.slide .lede`, `.slide .meta-row`, `.slide .meta-rule`, `.slide .meta`, `.arrows`, `.arrows button`, `.thumb-dots`, `.thumb-dots button`, `.progress`, `.progress .bar`, `@keyframes prog`. Append all of it to `css/site.css`.

- [ ] **Step 3: Add hero HTML section to `index.html`**

Replace the placeholder `<main>...</main>` block with this:

```html
<!-- ============ HERO CAROUSEL ============ -->
<section class="hero">
  <div class="hero-inner">
    <div class="carousel" id="car" tabindex="0" role="region" aria-roledescription="carousel" aria-label="آخر المقالات">
      <!-- COPY ALL 3 <div class="slide">...</div> blocks from mockups/home.html verbatim -->
      <!-- COPY <div class="arrows">...</div> -->
      <!-- COPY <div class="thumb-dots">...</div> -->
      <!-- COPY <div class="progress">...</div> -->
    </div>
  </div>
</section>

<main>
  <!-- remaining home sections will be added in subsequent phases -->
</main>
```

The 3 slides reference Unsplash demo images. Keep these for now; replace with real article featured images in Phase 10 (demo content).

- [ ] **Step 4: Create `js/site.js` with carousel logic**

Path: `projects/ahmalassaf.com/js/site.js`

```javascript
// ============================================================
// ahmalassaf.com — site script
// All client-side interactivity lives here.
// ============================================================

(function () {
  'use strict';

  // Eastern Arabic-Indic digit conversion
  const toAr = (n) => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);

  // ============ HERO CAROUSEL ============
  const initCarousel = () => {
    const carEl = document.getElementById('car');
    if (!carEl) return;

    const slides = carEl.querySelectorAll('.slide');
    const dots = carEl.querySelectorAll('.thumb-dots button');
    const progBar = carEl.querySelector('.progress .bar');
    const prevBtn = carEl.querySelector('#prev');
    const nextBtn = carEl.querySelector('#next');
    let i = 0, timer;

    const restartProgress = () => {
      if (!progBar) return;
      progBar.classList.remove('run');
      void progBar.offsetWidth;     // force reflow so the animation restarts
      progBar.classList.add('run');
    };

    const go = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('active', k === i));
      dots.forEach((d, k) => d.classList.toggle('active', k === i));
      restartProgress();
    };

    const start = () => {
      stop();
      timer = setInterval(() => go(i + 1), 6000);
    };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };

    dots.forEach((d, k) => d.addEventListener('click', () => { go(k); start(); }));
    if (nextBtn) nextBtn.addEventListener('click', () => { go(i + 1); start(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { go(i - 1); start(); });

    carEl.addEventListener('mouseenter', stop);
    carEl.addEventListener('mouseleave', start);

    // keyboard navigation when carousel is focused
    carEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); start(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); start(); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); start(); }
      else if (e.key === 'End') { e.preventDefault(); go(slides.length - 1); start(); }
    });
    carEl.addEventListener('focus', stop);
    carEl.addEventListener('blur', start);

    // honor reduced motion: don't autoplay
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      stop();
    } else {
      start();
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
  });

  // expose toAr for future modules in this file
  window.AHMALASSAF = { toAr };
})();
```

- [ ] **Step 5: Add `<script src="js/site.js"></script>` before `</body>` in `index.html`**

```html
  ...
  <script src="js/site.js" defer></script>
</body>
```

- [ ] **Step 6: Verify in browser**

Open `index.html`:
- 3 slides crossfade every 6s
- Progress bar fills gold→blue from 0 to 100% during each slide
- Thumbnail dots at the bottom; clicking a dot jumps to that slide
- Right arrow `›` → next slide; left arrow `‹` → previous
- Hover on the carousel pauses autoplay; mouse-leave resumes
- Tab to focus the carousel (gold focus ring appears) → ArrowRight/ArrowLeft change slides
- In Chrome dev tools, set "Emulate CSS prefers-reduced-motion: reduce" → carousel should stop autoplaying

- [ ] **Step 7: Commit + push + PR**

```bash
git add css/site.css js/site.js index.html
git commit -m "$(cat <<'EOF'
feat: hero carousel with autoplay and keyboard nav

Add the hero carousel section to the home page:

- 3-slide crossfade carousel with 6s autoplay
- Gold→blue gradient progress bar that resets per slide
- Thumbnail-image dots and arrow buttons (right=next, left=prev)
- Keyboard navigation (ArrowRight/ArrowLeft/Home/End) when
  the carousel container is focused
- Pause on hover and on focus
- Respects prefers-reduced-motion: reduce — autoplay disabled,
  ken-burns zoom collapsed
- Carousel container has role/aria-roledescription/aria-label
  for screen-reader announcement
- Demo Unsplash images for now; will swap with real article
  featured images during phase 10

js/site.js scaffolded as the single shared script. Wraps
everything in an IIFE; exposes the toAr() Arabic-digit
helper on a window namespace for future modules.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push -u origin feat/03-hero-carousel
```

---

## Phase 4: Credo + Archive

**Branch:** `feat/04-credo-archive`

**Files:**
- Modify: `css/site.css` — add credo card and archive sections
- Modify: `index.html` — add credo card and archive between hero and the future about section
- Modify: `js/site.js` — add archive filter logic (category + year)

**Goal:** Below the hero, render the publication's credo card (corner brackets + oversized blue guillemets + the framing statement). Below that, the archive section with sticky right-side filter sidebar (category + year) and 12 numbered demo essay rows. Filter clicks update the visible essays in real-time and the archive title.

- [ ] **Step 1: Branch**

```bash
git checkout main && git pull
git checkout -b feat/04-credo-archive
```

- [ ] **Step 2: Add credo + archive CSS to `css/site.css`**

Open `mockups/home.html` and copy these CSS blocks to `css/site.css`:

1. `/* ============ QUOTE CARD ============ */` — `.quote-section`, `.q-intro`, `.q-outro`, `.quote-card`, `.quote-card .corner`, `.quote-card .open-mark`, `.quote-card .close-mark`, `.quote-card .body`, `.quote-card .body em`, `.quote-card .body b`
2. `/* ============ section header — centered diamond ============ */` — `.section-h`, `.section-h .line`, `.section-h .diamond`, `.section-h h2`
3. `/* ============ ARCHIVE WITH SIDE-MENU FILTER ============ */` — all of `.archive-section`, `.archive-header`, `.archive-layout`, `.side-menu`, `.menu-label`, `.filter-list`, `.filter-item`, `.essay`, `.essay-num`, `.essay-cat`, `.essay-title`, `.essay-meta`, `.archive-empty`, `.archive-more`

- [ ] **Step 3: Add credo + archive HTML to `index.html`**

After the hero `</section>` closing tag, before `<main>`:

```html
<!-- ============ PUBLICATION CREDO ============ -->
<section class="quote-section">
  <!-- COPY <div class="q-intro">...</div> from mockups/home.html -->
  <!-- COPY <div class="quote-card">...</div> from mockups/home.html -->
  <!-- COPY <div class="q-outro">...</div> from mockups/home.html -->
</section>

<!-- ============ ARCHIVE ============ -->
<section class="archive-section" id="archive">
  <!-- COPY <div class="archive-header">...</div> from mockups/home.html -->
  <!-- COPY <div class="archive-layout">...</div> with the sidebar filter and the 12 .essay rows -->
</section>
```

The 12 demo essay rows have category + year data attributes (`data-cat="..."`, `data-year="..."`) used by the filter JS. Keep them intact.

- [ ] **Step 4: Append archive filter logic to `js/site.js`**

Add this function inside the IIFE (after `initCarousel`):

```javascript
// ============ ARCHIVE FILTER ============
const initArchiveFilter = () => {
  const catFilter = document.getElementById('cat-filter');
  if (!catFilter) return;
  const yearFilter = document.getElementById('year-filter');
  const essays = document.querySelectorAll('.essay');
  const cntVisible = document.getElementById('cnt-visible');
  const empty = document.getElementById('empty');
  const titleEl = document.getElementById('ah-title');

  let activeCat = 'all';
  let activeYear = 'all';

  const applyFilters = () => {
    let visible = 0;
    essays.forEach(e => {
      const cat = e.dataset.cat;
      const year = e.dataset.year;
      const ok = (activeCat === 'all' || cat === activeCat) &&
                 (activeYear === 'all' || year === activeYear);
      e.classList.toggle('hidden', !ok);
      if (ok) visible++;
    });
    if (cntVisible) cntVisible.textContent = toAr(visible);
    if (empty) empty.classList.toggle('show', visible === 0);

    if (titleEl) {
      const catEl = catFilter.querySelector(`[data-cat="${activeCat}"]`);
      const yearEl = yearFilter ? yearFilter.querySelector(`[data-year="${activeYear}"]`) : null;
      if (activeCat === 'all' && activeYear === 'all') {
        titleEl.textContent = 'كل المقالات';
      } else {
        const parts = [];
        if (activeCat !== 'all' && catEl) parts.push(catEl.firstChild.textContent.trim());
        if (activeYear !== 'all' && yearEl) parts.push(yearEl.firstChild.textContent.trim());
        titleEl.textContent = parts.join(' · ');
      }
    }
  };

  const setActive = (group, el) => {
    document.querySelectorAll(`#${group} .filter-item`).forEach(b => b.classList.toggle('active', b === el));
  };

  catFilter.querySelectorAll('.filter-item').forEach(b => {
    b.addEventListener('click', () => { activeCat = b.dataset.cat; setActive('cat-filter', b); applyFilters(); });
  });
  if (yearFilter) {
    yearFilter.querySelectorAll('.filter-item').forEach(b => {
      b.addEventListener('click', () => { activeYear = b.dataset.year; setActive('year-filter', b); applyFilters(); });
    });
  }

  // expose reset for the empty-state link
  window.AHMALASSAF.resetFilters = () => {
    activeCat = 'all';
    activeYear = 'all';
    setActive('cat-filter', catFilter.querySelector('[data-cat="all"]'));
    if (yearFilter) setActive('year-filter', yearFilter.querySelector('[data-year="all"]'));
    applyFilters();
  };
};
```

Then add `initArchiveFilter();` inside the `DOMContentLoaded` listener:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initArchiveFilter();
});
```

The archive's empty state has an `onclick="resetFilters()"`. Update that to call `AHMALASSAF.resetFilters()` to match the namespacing — find the line in `index.html` and change accordingly.

- [ ] **Step 5: Verify in browser**

Open `index.html`:
- Below the carousel: "عن هذا المكان" centered diamond label → credo card with gold corner brackets, oversized blue guillemets, italic Amiri statement with gold-tinted "مقالاتٍ هادئةً" and blue "الناس والكُتب"
- Below the credo: archive section with the dynamic header ("كل المقالات / تظهر ١٢ من أصل ١٢ مقالاً")
- Sticky right sidebar: category filter (with counts), year filter (with counts)
- 12 numbered essay rows on the left
- Click "سير وأعلام" → archive filters to 5 essays, header changes to "سير وأعلام", counter shows "تظهر ٥ من أصل ١٢"
- Click "إدارة وتربية" (count 0) → empty state shows "لا توجد مقالات تطابق اختيارك" + reset link
- Click reset → returns to "كل المقالات / 12 من ١٢"
- Combine: "سير وأعلام" + "٢٠٢٦" → 5 essays, title becomes "سير وأعلام · ٢٠٢٦"

- [ ] **Step 6: Commit + push + PR**

```bash
git add css/site.css js/site.js index.html
git commit -m "$(cat <<'EOF'
feat: publication credo and filterable archive

Add the two main "what is this place" sections to the home
page below the hero:

- Credo card framed with gold corner brackets and oversized
  blue guillemets; italic Amiri statement with gold-tinted
  and blue-italic emphasis on key phrases. Section opens
  with a centered "عن هذا المكان" line·diamond·line flourish.
- Archive section with composite header (italic Amiri kicker
  "للتصفّح والاطّلاع" + dynamic Aref Ruqaa H2 + counter on
  the leading edge), 12 demo essay rows, and a sticky filter
  sidebar with category (6 + all) and year (3 + all) filters.

js/site.js now also carries the archive filter logic. The
filter applies category + year together (AND), updates the
counter and dynamic title in real time, shows an empty state
on no matches, and exposes resetFilters() on the AHMALASSAF
window namespace for the empty-state reset link.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push -u origin feat/04-credo-archive
```

---

## Phase 5: About + Contact + Newsletter — home sections complete

**Branch:** `feat/05-about-contact-newsletter`

**Files:**
- Modify: `css/site.css` — add about, contact, newsletter sections
- Modify: `index.html` — add three more sections after archive
- Modify: `js/site.js` — add form success state handlers

**Goal:** Home page is functionally complete. About section has author vignette + bio + CTA. Contact section has form on the left + 4 contact-method cards on the right. Newsletter card with envelope icon + flourish + form. Submitting the contact or newsletter form shows the bouncy-check success state.

- [ ] **Step 1: Branch**

```bash
git checkout main && git pull
git checkout -b feat/05-about-contact-newsletter
```

- [ ] **Step 2: Add about, contact, newsletter CSS to `css/site.css`**

Copy from `mockups/home.html`:
- `/* ============ ABOUT SECTION ============ */` — `.about-section`, `.about-inner`, `.about-grid`, `.vignette` and its pseudo-elements + children, `.about-text`, `.about-kicker`, `.about-role`, `.about-bio`, `.about-cta`
- `/* ============ CONTACT SECTION ============ */` — `.contact-section`, `.contact-inner`, `.contact-grid`, `.contact-form`, `.form-success` (and the hide/show class rules), `.form-row`, `.form-field`, `.form-submit`, `.btn-primary`, `.form-note`, `.contact-meta`, `.contact-card`
- `/* ============ NEWSLETTER SECTION ============ */` — `.news-section`, `.news-inner`, `.news-card` and its pseudo-elements + children, `.news-card .card-flourish`, `.news-form`

- [ ] **Step 3: Add about + contact + newsletter HTML to `index.html`**

After the archive `</section>`:

```html
<!-- COPY <section class="about-section">...</section> from mockups/home.html -->
<!-- COPY <section class="contact-section">...</section> from mockups/home.html -->
<!-- COPY <section class="news-section">...</section> from mockups/home.html -->
```

The author portrait inside the vignette currently points to the X profile URL. Localize it during Phase 10 (demo content).

- [ ] **Step 4: Append form success-state JS to `js/site.js`**

Inside the IIFE, add:

```javascript
// ============ FORM SUCCESS STATES ============
const initFormSuccessStates = () => {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.classList.add('sent');
    });
  }
  const newsCard = document.getElementById('newsCard');
  if (newsCard) {
    const newsForm = newsCard.querySelector('.news-form');
    if (newsForm) {
      newsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        newsCard.classList.add('sent');
      });
    }
  }
};
```

Add `initFormSuccessStates();` to the `DOMContentLoaded` listener.

The contact form's `<form id="contactForm" onsubmit="submitContact(event);">` and the newsletter's `<form ... onsubmit="submitNews(event);">` were inline-handler bindings in the mockup. Update both `<form>` tags in `index.html` to remove the `onsubmit` attribute — the addEventListener bindings handle it now. Cleaner separation of concerns.

- [ ] **Step 5: Verify in browser**

Open `index.html`:
- About section "عن المؤلف" with the vignette card (cream gradient bg, double gold rule top, portrait, full name + role-with-tenure) on the right + bio paragraphs + CTA on the left
- Contact section "للتواصل" with form on the left + 4 contact cards on the right (each lifts on hover, icon flips from gold-soft to solid blue)
- Submit the contact form (any input, click "إرسال الرسالة ←") → form fades, blue circle with white check pops in (with the 0.5s elastic bounce), "وصلتك إلى البريد · شكراً على رسالتك..." in Aref Ruqaa + Amiri italic
- Newsletter card at the bottom of the home content area: envelope SVG icon + flourish + "كل أسبوع ـ مقالٌ واحد" + form
- Submit the newsletter → "تمَّ الاشتراك · سيصلك أوَّل مقال خلال أيَّام"

- [ ] **Step 6: Commit + push + PR**

```bash
git add css/site.css js/site.js index.html
git commit -m "$(cat <<'EOF'
feat: about, contact, newsletter sections — home complete

Complete the home page below the archive:

- About section with author vignette card (cream gradient,
  double gold-rule top, portrait inside gold-bordered circle
  with white inset ring, full name + italic Amiri role-with-
  tenure line) on the right and bio paragraphs + CTA on the
  left.
- Contact section with cream-gradient form (3px gold top
  rule) on the left and four contact-method cards (email, X,
  RSS, newsletter) on the right.
- Newsletter card with envelope SVG icon and centered flourish
  echoing the vignette mark.
- Form success states: blue circle + gold ring + bouncy check
  pop with italic Amiri confirmation message. Bound via
  addEventListener (replacing the mockup's inline onsubmit
  attributes for cleaner separation).

Home page is now functionally complete. Search popover and
final accessibility hardening land in subsequent phases.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push -u origin feat/05-about-contact-newsletter
```

---

## Phase 6: Search Popover

**Branch:** `feat/06-search-popover`

**Files:**
- Modify: `css/site.css` — add search popover CSS
- Modify: `index.html` — wrap the search icon in `.search-wrap` and add the popover markup
- Modify: `js/site.js` — add search popover logic (open/close, live filter, `/` shortcut, `Esc` to close)

**Goal:** Click the masthead search icon (or press `/` from anywhere on the page) to open a cream-gradient popover with a text input. Type → live filter the archive entries by title and category. Up to 8 results, matched substring highlighted. Esc, click-outside, or Enter on a result closes.

- [ ] **Step 1: Branch**

```bash
git checkout main && git pull
git checkout -b feat/06-search-popover
```

- [ ] **Step 2: Add search popover CSS to `css/site.css`**

Copy `/* ============ SEARCH POPOVER ============ */` block from `mockups/home.html` — `.search-wrap`, `.search-pop`, `.search-pop::before`, `.search-pop input`, `.search-pop .results`, `.search-pop .result`, `.search-pop .result em`, `.search-pop .result-meta`, `.search-pop .footer`, `.search-pop .empty`. Also add the `.mast-social a:hover .ic, .search-wrap.open #searchTrigger .ic` rule that keeps the trigger highlighted while the popover is open.

- [ ] **Step 3: Wrap the search icon in `.search-wrap` + add popover markup**

In `index.html`, find the existing search `<a aria-label="بحث">...</a>` inside `.mast-social`. Replace it with the structure from the mockup (`mockups/home.html` — search for `<div class="search-wrap"`). The structure is:

```html
<div class="search-wrap" id="searchWrap">
  <a aria-label="بحث" id="searchTrigger" tabindex="0" role="button" aria-expanded="false" aria-controls="searchPop">
    <span class="ic"><!-- magnifying glass SVG, same as before --></span>
  </a>
  <div class="search-pop" id="searchPop" role="dialog" aria-label="البحث في المقالات">
    <input type="text" id="searchInput" placeholder="ابحث في عناوين المقالات..." aria-label="نص البحث">
    <div class="results" id="searchResults"></div>
    <div class="footer">
      <span class="count"><b id="searchCount">١٢</b> مقالاً</span>
      <span class="hint">اضغط <kbd>Esc</kbd> للإغلاق</span>
    </div>
  </div>
</div>
```

- [ ] **Step 4: Append search popover JS to `js/site.js`**

Inside the IIFE:

```javascript
// ============ SEARCH POPOVER ============
const initSearchPopover = () => {
  const wrap = document.getElementById('searchWrap');
  if (!wrap) return;
  const trigger = document.getElementById('searchTrigger');
  const pop = document.getElementById('searchPop');
  const input = document.getElementById('searchInput');
  const resultsEl = document.getElementById('searchResults');
  const countEl = document.getElementById('searchCount');

  // build searchable index from existing archive entries
  const essays = Array.from(document.querySelectorAll('.essay')).map(e => {
    const titleEl = e.querySelector('.essay-title');
    const catEl = e.querySelector('.essay-cat');
    const metaB = e.querySelector('.essay-meta b');
    const metaText = e.querySelector('.essay-meta');
    return {
      title: titleEl ? titleEl.textContent.trim() : '',
      cat:   catEl   ? catEl.textContent.trim()   : '',
      date:  metaB   ? metaB.textContent.trim()   : '',
      meta:  metaText ? metaText.textContent.replace(metaB?.textContent || '', '').trim() : '',
    };
  });

  const open = () => {
    wrap.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    setTimeout(() => input.focus(), 100);
    render('');
  };
  const close = () => {
    wrap.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    input.value = '';
  };
  const toggle = () => wrap.classList.contains('open') ? close() : open();

  const highlight = (text, q) => {
    if (!q) return text;
    const i = text.indexOf(q);
    if (i < 0) return text;
    return text.slice(0, i) + '<em>' + text.slice(i, i + q.length) + '</em>' + text.slice(i + q.length);
  };

  const render = (q) => {
    const ql = q.trim().toLowerCase();
    const filtered = ql === '' ? essays : essays.filter(e =>
      e.title.toLowerCase().includes(ql) ||
      e.cat.toLowerCase().includes(ql)
    );
    countEl.textContent = toAr(filtered.length);

    if (filtered.length === 0) {
      resultsEl.innerHTML = '<div class="empty">لا نتائج تطابق «' + q + '»</div>';
      return;
    }

    resultsEl.innerHTML = filtered.slice(0, 8).map(e => `
      <a class="result">
        <div class="cat">${e.cat}</div>
        <div class="title">${highlight(e.title, q.trim())}</div>
        <div class="result-meta">${e.date} · ${e.meta}</div>
      </a>
    `).join('');
  };

  trigger.addEventListener('click', (e) => { e.preventDefault(); toggle(); });
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
  input.addEventListener('input', () => render(input.value));
  input.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  document.addEventListener('click', (e) => {
    if (wrap.classList.contains('open') && !wrap.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && wrap.classList.contains('open')) close();
    if (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      open();
    }
  });
};
```

Add `initSearchPopover();` to the `DOMContentLoaded` listener.

- [ ] **Step 5: Verify in browser**

Open `index.html`:
- Click the masthead search icon → popover drops down with cream gradient, gold top edge, gold pointer
- Or press `/` from anywhere → popover opens, focus moves to input
- Type "سير" → up to 8 results shown, "سير" substring highlighted in blue text on gold tint
- Type "ماورد" → 1 result, "ماورد" highlighted
- Type something nonsense → empty state "لا نتائج تطابق «xxx»"
- Counter at the bottom updates live ("٥ مقالاً")
- Press Esc → popover closes
- Click outside → popover closes
- Search icon trigger stays in its highlighted (blue background) state while popover is open

- [ ] **Step 6: Commit + push + PR**

```bash
git add css/site.css js/site.js index.html
git commit -m "$(cat <<'EOF'
feat: client-side search popover

Add the masthead search affordance:

- Click the magnifying glass or press "/" from anywhere to
  open a cream-gradient popover anchored to the search icon.
  Gold top edge with a small gold pointer marking which icon
  it belongs to. Soft blue shadow.
- Live filter as user types — searches archive titles AND
  categories. Matched substring rendered in blue text on a
  faint gold underline-tint.
- Up to 8 results; counter at the bottom updates live.
- Empty state with the searched term embedded.
- Esc, click outside, or selecting a result closes the
  popover. Trigger stays highlighted while open.
- Search dialog has role/aria-label/aria-expanded attributes
  for screen-reader announcement.

The search index is built once on DOMContentLoaded from the
DOM-rendered archive entries — no separate JSON or fetch.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push -u origin feat/06-search-popover
```

---

## Phase 7: Post Page Foundation

**Branch:** `feat/07-post-foundation`

**Files:**
- Modify: `css/site.css` — add post-page CSS (compact masthead variant, breadcrumb, article header, body, TOC, reading progress, featured image)
- Create: `posts/_template.html` — starter for new posts
- Create: `posts/aadad-wizariya.html` — first demo post (used to verify post layout)
- Modify: `js/site.js` — add reading progress and TOC scroll-spy

**Goal:** A working post page at `posts/aadad-wizariya.html` with the compact masthead, breadcrumb, big article header, featured image, body content with the right-side sticky TOC (numbered, scroll-spy active state), and the top-fixed reading progress bar that fills gold→blue as the user scrolls.

- [ ] **Step 1: Branch**

```bash
git checkout main && git pull
git checkout -b feat/07-post-foundation
```

- [ ] **Step 2: Add post-page CSS to `css/site.css`**

From `mockups/post.html`, copy these CSS sections (append to `css/site.css`):

1. `.reading-progress` and `.reading-progress .bar`
2. The post-page masthead variant: `.masthead.post-page` (you'll need to add the `.post-page` class to the existing `.masthead` rules and add `.mast-back` styling)
   - Note: in the mockup, the post page reuses the same `.masthead` selectors. Since we already have masthead styles from Phase 2, add only `.mast-back` styling. Use `.masthead-compact` if you want to differentiate styling later.
3. `.crumb` and its child rules
4. `.article-head` and its children: `.kicker`, `h1`, `.lede`, `.article-meta`, `.item`, `.author`, `.spacer`
5. `.tts-player` and all its children (will be used in Phase 8 — paste now to keep CSS contiguous)
6. `.featured-img` and `.wrap` and `.caption`
7. `.article-body-wrap`, `.toc`, `.toc .label`, `.toc ol`, `.toc li`, `.toc a` and active variants
8. `.article-content` and all its descendant rules: `p`, `h2` (with the `::before` gradient short rule), `h3`, `a`, `em`, `strong`, `ul/ol`, `li`, `blockquote`, `figure`, `figcaption`, and the full `.pull-quote` block
9. `.gutter` and `.gutter-share` (Phase 9 will use these but the CSS should land now)
10. The post-page-specific media queries at the end of the mockup file (`@media (max-width: 1024px)`)

- [ ] **Step 3: Create `posts/_template.html`**

Path: `projects/ahmalassaf.com/posts/_template.html`

This is the starter for new posts. Use the structure from `mockups/post.html` but with placeholder content the author replaces. Copy the entire structure from the mockup, then replace:
- `<title>` → `<title>عنوان المقال — مدوَّنة العسَّاف</title>`
- The article H1, lede, body paragraphs → `<!-- TODO: replace with article content -->`
- The TOC list → `<!-- TODO: list of H2 sections -->`
- The featured image src → `images/posts/<slug>.jpg`
- The TTS, comments, related sections — keep as scaffolding (Phase 8/9 will activate)

Add a comment at the top:

```html
<!--
  Starter template for a new post.
  How to use:
    1. Copy this file to posts/<slug>.html (slug must be ASCII-Latin)
    2. Update <title>, the article H1, lede, and body content
    3. Add your H2 sections — for each, also add a TOC entry
    4. Update meta line (date, reading time, word count)
    5. Update breadcrumb category + final crumb text
    6. Place featured image at images/posts/<slug>.jpg
    7. Update the related-articles cards
-->
```

- [ ] **Step 4: Create `posts/aadad-wizariya.html` — first demo post**

Path: `projects/ahmalassaf.com/posts/aadad-wizariya.html`

Copy the entire `mockups/post.html` content, then:
- Update `<link rel="stylesheet">` to `../css/site.css`
- Update `<script src=>` to `../js/site.js` (will be added in Step 5)
- Remove the inline `<style>` block (CSS lives in `site.css` now)
- Remove the inline `<script>` block (JS lives in `site.js` now — to be added in Step 5)
- Keep the article content (the demo "أعداد وزارية" essay) for now; it serves as the live verification target

After this step, the page will be missing TTS, scroll-spy, comments interactivity, etc. Those land in subsequent phases.

- [ ] **Step 5: Append reading progress + TOC scroll-spy to `js/site.js`**

Inside the IIFE:

```javascript
// ============ READING PROGRESS BAR ============
const initReadingProgress = () => {
  const bar = document.getElementById('rp');
  if (!bar) return;
  const update = () => {
    const h = document.documentElement;
    const denom = (h.scrollHeight - h.clientHeight) || 1;
    const pct = (h.scrollTop / denom) * 100;
    bar.style.width = pct + '%';
  };
  document.addEventListener('scroll', update, { passive: true });
  update();
};

// ============ TOC SCROLL-SPY ============
const initTocScrollSpy = () => {
  const items = document.querySelectorAll('.toc li');
  if (!items.length) return;
  const headings = Array.from(items).map(li => {
    const a = li.querySelector('a');
    return a ? document.getElementById(a.getAttribute('href').slice(1)) : null;
  });
  const update = () => {
    const top = window.scrollY + 120;
    let active = 0;
    headings.forEach((h, i) => { if (h && h.offsetTop <= top) active = i; });
    items.forEach((it, i) => it.classList.toggle('active', i === active));
  };
  document.addEventListener('scroll', update, { passive: true });
  document.querySelectorAll('.toc a').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const t = document.getElementById(id);
    if (t) window.scrollTo({ top: t.offsetTop - 100, behavior: 'smooth' });
  }));
  update();
};
```

Add both to the `DOMContentLoaded` listener:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initArchiveFilter();
  initFormSuccessStates();
  initSearchPopover();
  initReadingProgress();
  initTocScrollSpy();
});
```

- [ ] **Step 6: Verify in browser**

Open `posts/aadad-wizariya.html`:
- Compact masthead at top with "← العودة للرئيسية" link, centered "الـعَـسَّـاف" logotype, social icons
- Sticky nav with "سياسة واقتصاد" highlighted
- Reading progress bar at very top of viewport (3px gold→blue gradient)
- Breadcrumb: الرئيسية › سياسة واقتصاد › أعداد وزارية
- Article header with kicker, big H1 "أعداد وزارية", italic lede, meta strip
- Featured image
- Body: TOC sticky on the right (4 numbered items), article body in 19px Amiri / 2.0 line-height in the center
- Scroll the page → reading progress fills, TOC active item updates in sync with H2 sections crossing the viewport top
- Click a TOC entry → smooth scroll to that section, active state moves with it
- Pull-quote breakout mid-article with gold rules + oversized blue guillemets
- Inline links: blue text + gold underline

- [ ] **Step 7: Commit + push + PR**

```bash
git add css/site.css js/site.js posts/_template.html posts/aadad-wizariya.html
git commit -m "$(cat <<'EOF'
feat: post page foundation — layout, reading progress, TOC

Build the article-page foundation with one demo article:

- Post-page CSS: compact masthead variant, breadcrumb, big
  article header (Aref Ruqaa H1, italic Amiri lede, meta
  strip with author chip + date + reading time + word count),
  featured image, three-column body layout (sticky right TOC
  + 19px Amiri body + left share gutter scaffold), pull-quote
  breakout, inline links with gold underline + blue hover.
- Reading progress bar fixed at viewport top, gold→blue
  gradient, fills based on scrollTop / scrollHeight.
- TOC scroll-spy: tracks the H2 currently above the 120px
  threshold, applies the gold→blue gradient bar to the
  active item; click on TOC entry smooth-scrolls to that
  section.
- posts/_template.html — starter file with placeholder
  comments and authoring instructions.
- posts/aadad-wizariya.html — first demo post (the working
  verification target for the post page).

TTS player, comments, share gutter buttons, author card
liveness, and related-articles section will land in
subsequent phases.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push -u origin feat/07-post-foundation
```

---

## Phase 8: TTS Voice Reader

**Branch:** `feat/08-tts-voice-reader`

**Files:**
- Modify: `js/site.js` — add TTS player logic

**Goal:** The TTS widget visible below the article meta becomes functional. Click play → browser reads the article aloud (chunked by paragraph) using `lang="ar-SA"`. Speed cycle button toggles 0.85× / 1.0× / 1.25× / 1.5×. Click on the progress bar seeks to that paragraph. Browser without `speechSynthesis` shows a disabled state.

- [ ] **Step 1: Branch**

```bash
git checkout main && git pull
git checkout -b feat/08-tts-voice-reader
```

- [ ] **Step 2: Append TTS logic to `js/site.js`**

Inside the IIFE:

```javascript
// ============ TTS VOICE READER ============
const initTts = () => {
  const player = document.getElementById('ttsPlayer');
  if (!player) return;
  const playBtn = document.getElementById('ttsPlayBtn');
  const speedBtn = document.getElementById('ttsSpeed');
  const filled = document.getElementById('ttsFilled');
  const progress = document.getElementById('ttsProgress');

  if (!('speechSynthesis' in window)) {
    player.classList.add('unsupported');
    return;
  }

  const synth = window.speechSynthesis;
  const speeds = [0.85, 1.0, 1.25, 1.5];
  const speedLabels = ['٠٫٨٥×', '١٫٠×', '١٫٢٥×', '١٫٥×'];
  let speedIdx = 1;
  let chunks = [];
  let currentChunk = 0;
  let totalChunks = 0;
  let isPlaying = false;

  const getChunks = () =>
    Array.from(document.querySelectorAll('.article-content p, .article-content h2, .article-content h3, .article-content blockquote p, .article-content .pull-quote p, .article-content li'))
      .map(el => el.textContent.trim())
      .filter(t => t.length > 0);

  const updateProgress = () => {
    const pct = totalChunks > 0 ? (currentChunk / totalChunks) * 100 : 0;
    filled.style.width = pct + '%';
  };

  const speakNext = () => {
    if (currentChunk >= chunks.length) {
      isPlaying = false;
      player.classList.remove('playing');
      currentChunk = 0;
      updateProgress();
      return;
    }
    const u = new SpeechSynthesisUtterance(chunks[currentChunk]);
    u.lang = 'ar-SA';
    u.rate = speeds[speedIdx];
    u.onend   = () => { currentChunk++; updateProgress(); if (isPlaying) speakNext(); };
    u.onerror = () => { currentChunk++;                    if (isPlaying) speakNext(); };
    synth.speak(u);
  };

  playBtn.addEventListener('click', () => {
    if (!isPlaying) {
      if (synth.paused) {
        synth.resume();
      } else {
        chunks = getChunks();
        totalChunks = chunks.length;
        currentChunk = 0;
        speakNext();
      }
      isPlaying = true;
      player.classList.add('playing');
    } else {
      synth.pause();
      isPlaying = false;
      player.classList.remove('playing');
    }
  });

  speedBtn.addEventListener('click', () => {
    speedIdx = (speedIdx + 1) % speeds.length;
    speedBtn.textContent = speedLabels[speedIdx];
    if (isPlaying) {
      synth.cancel();
      speakNext();
    }
  });

  progress.addEventListener('click', (e) => {
    if (totalChunks === 0) return;
    const rect = progress.getBoundingClientRect();
    // RTL: progress visually fills from the right edge
    const pct = 1 - ((e.clientX - rect.left) / rect.width);
    currentChunk = Math.floor(pct * totalChunks);
    if (isPlaying) {
      synth.cancel();
      speakNext();
    } else {
      updateProgress();
    }
  });

  // stop on page hidden (tab switch, etc.)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && isPlaying) {
      synth.cancel();
      isPlaying = false;
      player.classList.remove('playing');
    }
  });
};
```

Add `initTts();` to the `DOMContentLoaded` listener.

- [ ] **Step 3: Verify in browser**

Open `posts/aadad-wizariya.html`:
- TTS pill below the meta strip — gold right-rule, blue play button
- Click play → button switches to pause icon, right-rule turns blue (`.playing` class)
- Browser starts reading the article aloud in Arabic (Web Speech API uses the default Arabic voice — varies by OS)
- Progress bar fills as paragraphs complete
- Click on the progress bar mid-article → playback jumps to that paragraph
- Click speed → cycles through ٠٫٨٥× → ١٫٠× → ١٫٢٥× → ١٫٥× (label updates; rate applies to next utterance)
- Switch browser tabs → TTS stops automatically
- In a browser without Web Speech API support (or simulate by overriding `speechSynthesis` in dev tools), the player shows the unsupported state

- [ ] **Step 4: Commit + push + PR**

```bash
git add js/site.js
git commit -m "$(cat <<'EOF'
feat: TTS voice reader via Web Speech API

Wire up the TTS player widget that lives below the article
meta strip:

- Reads article body chunks (p, h2, h3, blockquote p,
  .pull-quote p, li) one utterance at a time.
- Each utterance has lang="ar-SA" so browsers select an
  Arabic voice when available.
- Speed cycle button: 0.85× → 1.0× → 1.25× → 1.5×, with
  Eastern Arabic-Indic decimals using U+066B and tabular
  numerals.
- Click on the progress bar seeks to that paragraph
  (RTL-aware — bar visually fills from the right).
- Pause on hidden tab via visibilitychange.
- Player adds a .playing class while reading; CSS uses it
  to flip the right-edge gold rule to brand blue.
- Browser without speechSynthesis support: player adds an
  .unsupported class and the CSS dims the controls and
  shows the "غير مدعومة" message.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push -u origin feat/08-tts-voice-reader
```

---

## Phase 9: Post Engagement — comments, share gutter, author card, related

**Branch:** `feat/09-post-engagement`

**Files:**
- Modify: `css/site.css` — add comments and share-strip CSS (the mockup also has a share-strip block we don't ship; only the gutter)
- Modify: `js/site.js` — add copy-link toast + comment form success state
- Modify: `posts/aadad-wizariya.html` — verify all engagement sections render

**Goal:** Below the article body, the share gutter (left, sticky) is functional — clicking the copy-link button copies `window.location.href` to clipboard and shows a brief toast. The author card shows the portrait + bio + 3 inline links. Related articles section shows 3 thumbnail cards. Comments section shows the comment form + 4 sample comments, with the author-reply variant styled distinctly. Submitting the comment form fades it and shows a success state.

- [ ] **Step 1: Branch**

```bash
git checkout main && git pull
git checkout -b feat/09-post-engagement
```

- [ ] **Step 2: Add author-card, related, comments CSS to `css/site.css`**

From `mockups/post.html`:
- `/* ============ AUTHOR CARD ============ */` — `.author-card`, `.author-card .inner`, `.author-card .portrait`, `.author-card .stack`, `.author-card .label`, `.author-card .name`, `.author-card .bio`, `.author-card .links`, `.author-card .links a`
- `/* ============ RELATED ============ */` — `.related-section`, `.related-h`, `.related-grid`, `.related-card` and children
- `/* ============ COMMENTS ============ */` — `.comments-section`, `.comments-h`, `.comments-h h2`, `.comments-h .count`, `.comment-form` and children, `.comment-list`, `.comment` and children, `.comment.reply`, `.comment.author-reply` and the badge

Also copy the `.copied` toast styles (the inline-styled element in the mockup; promote to a class):

```css
/* copy-link toast */
.copied-toast {
  display: none;
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--ink);
  color: var(--paper);
  padding: 10px 20px;
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 14px;
  z-index: 200;
}
.copied-toast.show { display: inline-block; }
```

- [ ] **Step 3: Update `posts/aadad-wizariya.html`**

The mockup has all these sections inline. Verify they render correctly in the demo post (inherited from the Phase 7 copy). Update the inline-styled `.copied` element to use the class:

Find the existing inline-styled toast and replace with:

```html
<span class="copied-toast" id="copiedNote">تمَّ نسخ الرابط ✓</span>
```

- [ ] **Step 4: Append copy-link + comment-form success JS to `js/site.js`**

Inside the IIFE:

```javascript
// ============ COPY LINK + TOAST ============
const initCopyLink = () => {
  const note = document.getElementById('copiedNote');
  if (!note) return;
  const showToast = () => {
    note.classList.add('show');
    setTimeout(() => note.classList.remove('show'), 2000);
  };
  document.querySelectorAll('[data-copy-link]').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard?.writeText(window.location.href);
      showToast();
    });
  });
};

// ============ COMMENT FORM SUCCESS ============
const initCommentForm = () => {
  const form = document.querySelector('.comment-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Replace the form content with a small success block
    form.innerHTML = `
      <div style="text-align:center; padding: 28px 16px;">
        <div style="width: 56px; height: 56px; margin: 0 auto 16px; border-radius: 50%; background: var(--blue); border: 2px solid var(--gold); color: var(--paper); display: flex; align-items: center; justify-content: center;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <h3 style="font-family: var(--font-display); font-weight: 700; font-size: 22px; margin: 0 0 8px; color: var(--ink);">تمَّ استلام تعليقك</h3>
        <p style="font-family: var(--font-body); font-style: italic; font-size: 15px; color: var(--ink-soft); margin: 0;">
          سيظهر بعد المراجعة. شكراً.
        </p>
      </div>
    `;
  });
};
```

Add both to `DOMContentLoaded`:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initArchiveFilter();
  initFormSuccessStates();
  initSearchPopover();
  initReadingProgress();
  initTocScrollSpy();
  initTts();
  initCopyLink();
  initCommentForm();
});
```

In `posts/aadad-wizariya.html`, the share-gutter copy-link button needs the `data-copy-link` attribute. Find:

```html
<button aria-label="نسخ الرابط" id="copyTop">...</button>
```

Replace with:

```html
<button aria-label="نسخ الرابط" data-copy-link>...</button>
```

(Drops the obsolete `id="copyTop"` since the share strip is gone; uses the data attribute so any number of copy buttons can be wired with the same handler.)

- [ ] **Step 5: Verify in browser**

Open `posts/aadad-wizariya.html`:
- Vertical share gutter on the left, sticky as you scroll: rotated "شارك" label + 4 circular icon buttons (X, WhatsApp, Telegram, Copy-link)
- Click the copy-link button → clipboard contains the page URL; "تمَّ نسخ الرابط ✓" toast appears at viewport bottom for 2 seconds
- Author card below the article body: large gold-bordered portrait, Aref Ruqaa name, italic Amiri bio, 3 inline links (تعريف بالمؤلف · كل مقالاته · تابع على إكس)
- Related articles section: "من القسم نفسه" header + 3 thumbnail cards (4:3 image, italic Amiri category, Cairo title, date+reading-time)
- Comments section: header "التعليقات" + counter "٤ تعليقات على هذا المقال"
- Comment form on top with name + optional email + textarea + blue submit
- Submit form → form replaces with bouncy check + "تمَّ استلام تعليقك" success message
- Below: 4 sample comments. The author's reply (أحمد العسَّاف) has the gold avatar and "المؤلف" badge; indented with cream tint background.

- [ ] **Step 6: Commit + push + PR**

```bash
git add css/site.css js/site.js posts/aadad-wizariya.html
git commit -m "$(cat <<'EOF'
feat: post engagement — share gutter, author, related, comments

Wire up the engagement sections of the post page:

- Author card with 128px gold-bordered portrait, Aref Ruqaa
  name, italic Amiri bio, and 3 inline links.
- Related-articles 3-card grid in the same column as the
  comments and share strip.
- Comments section with form on top and 4 sample comments.
  Author replies use the .author-reply variant — gold avatar,
  "المؤلف" badge next to the name, indented with a cream tint
  background.
- Share gutter copy-link button now copies window.location.href
  via navigator.clipboard.writeText and shows the .copied-toast
  at viewport bottom for 2s. Wired by data-copy-link attribute
  so any number of copy buttons can be added.
- Comment form submission replaces the form with a centered
  blue-circle check + Aref Ruqaa "تمَّ استلام تعليقك" + italic
  Amiri "سيظهر بعد المراجعة. شكراً.".

Post page is now functionally complete. Phase 10 adds the
remaining demo articles + about/contact stubs.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push -u origin feat/09-post-engagement
```

---

## Phase 10: Demo Content — additional posts + portrait localization

**Branch:** `feat/10-demo-content`

**Files:**
- Create: 11 additional `posts/<slug>.html` files using `_template.html`
- Add: `images/brand/portrait.jpg` (download once from the X profile URL)
- Modify: `index.html`, all post pages, `about.html`, `contact.html` — point to local portrait
- Modify: `index.html` — replace Unsplash carousel images with article-specific images (where available)

**Goal:** The repo carries 12 demo articles (aadad-wizariya from Phase 7 + 11 new ones). The author portrait is a local file (no third-party CDN dependency). Carousel slides use article-specific featured images.

- [ ] **Step 1: Branch**

```bash
git checkout main && git pull
git checkout -b feat/10-demo-content
```

- [ ] **Step 2: Localize the author portrait**

Download `https://pbs.twimg.com/profile_images/1851248011503935488/he5MabI6_400x400.jpg` to `projects/ahmalassaf.com/images/brand/portrait.jpg`. Use any browser or `curl`:

```bash
curl -L -o projects/ahmalassaf.com/images/brand/portrait.jpg "https://pbs.twimg.com/profile_images/1851248011503935488/he5MabI6_400x400.jpg"
```

- [ ] **Step 3: Update all `<img src="...he5MabI6_400x400.jpg">` references**

In each file (`index.html`, `posts/_template.html`, `posts/aadad-wizariya.html`), find the X-CDN portrait URL and replace with `images/brand/portrait.jpg` (or `../images/brand/portrait.jpg` from inside `posts/`).

- [ ] **Step 4: Create 11 additional demo posts**

For each of these 11 articles, copy `posts/_template.html` to `posts/<slug>.html` and fill in the placeholder content. Titles and slugs:

| Slug | Title | Category |
|---|---|---|
| `dalail-aaraqa.html` | دلائل على العراقة الأسرية | سير وأعلام |
| `mudawanat-asr-raqami.html` | المدوَّنات في العصر الرقمي | قراءة وكتابة |
| `aalam-tafkir-qanuni.html` | أعلام التفكير القانوني | شريعة وقانون |
| `min-masail-aaraqa.html` | من مسائل العراقة | سير وأعلام |
| `abu-najm.html` | أبو نجم: روح عنيزة! | سير وأعلام |
| `al-malik-khalid.html` | الملك خالد: ملك خالد! | سير وأعلام |
| `samnudi-tabib-faisal.html` | سيف الدين السمنودي: طبيب الفيصل | سير وأعلام |
| `muthaqaf-uzla.html` | المثقف بين العزلة والاشتباك | قراءة وكتابة |
| `nizam-hukm-mawardi.html` | قراءة في «نظام الحكم» للماوردي | شريعة وقانون |
| `maena-mawsim.html` | في معنى الموسم | مواسم ومجتمع |
| `iqtisad-rai.html` | عن الاقتصاد الريعي | سياسة واقتصاد |

For each post, use placeholder content (the demo essay structure from `aadad-wizariya.html` works well — 4 H2 sections, ~3 paragraphs each, one pull-quote in the middle). Update:
- `<title>` to the actual article title
- Article H1 + lede
- Body content (placeholder Arabic essay text — 4 sections matching the TOC)
- TOC entries
- Meta line: date, reading time, word count
- Breadcrumb: الرئيسية › <category> › <title>
- Featured image (use `images/posts/<slug>.jpg` placeholder; for now you can leave the Unsplash URL or substitute with images from the original site's archive)
- Related-article cards (link to 3 other posts in the same category)

- [ ] **Step 5: Verify in browser**

Open each of the 12 demo posts. Each should:
- Render the compact masthead, breadcrumb, article header, featured image, body, TOC, share gutter, author card, related, comments
- Have appropriate H1 + category for that article
- Click "← العودة للرئيسية" → returns to index.html

Open `index.html` and click an essay row in the archive. The link target should match the slug (`posts/<slug>.html`). Update the archive entries' `<a href="...">` if any are missing.

- [ ] **Step 6: Commit + push + PR**

```bash
git add images/brand/portrait.jpg posts/dalail-aaraqa.html posts/mudawanat-asr-raqami.html posts/aalam-tafkir-qanuni.html posts/min-masail-aaraqa.html posts/abu-najm.html posts/al-malik-khalid.html posts/samnudi-tabib-faisal.html posts/muthaqaf-uzla.html posts/nizam-hukm-mawardi.html posts/maena-mawsim.html posts/iqtisad-rai.html index.html posts/_template.html posts/aadad-wizariya.html
git commit -m "$(cat <<'EOF'
feat: demo content — 11 additional posts + local portrait

- Localize author portrait to images/brand/portrait.jpg
  (was X CDN). All references in index.html, post pages,
  and template updated.
- Add 11 demo posts using _template.html as the starter,
  covering all 6 categories. Each post has a placeholder
  4-section structure (مقدِّمة, body sections, ملاحظات
  ختاميَّة) with one pull-quote, matching the showcase scope.
- Update archive entry href values in index.html to point
  to the correct posts/<slug>.html targets.

Showcase content scope: 12 articles. Real-content migration
of all 126 essays is a separate operations task per the
design spec §13.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push -u origin feat/10-demo-content
```

---

## Phase 11: Accessibility Hardening

**Branch:** `feat/11-accessibility`

**Files:**
- Modify: `css/site.css` — verify focus rings on all components, add any missing focus-visible rules
- Modify: `index.html` and post pages — add ARIA where missing, verify semantic HTML
- Modify: `js/site.js` — verify keyboard nav patterns

**Goal:** Comprehensive accessibility verification pass. Skip link (already present), brand-colored focus rings on every interactive element, ARIA labels on icon-only buttons, semantic landmarks (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`, `<footer>`) used correctly, reduced-motion respected, lang/dir attributes correct.

- [ ] **Step 1: Branch**

```bash
git checkout main && git pull
git checkout -b feat/11-accessibility
```

- [ ] **Step 2: Audit and add missing ARIA labels**

Walk through `index.html` and each `posts/*.html`. For each `<a>` or `<button>` that contains only an icon (SVG, no text), ensure it has `aria-label` in Arabic. Examples:
- Each social icon already has `aria-label="X / تويتر"`, etc.
- Carousel arrow buttons have `aria-label="السابق"` / `aria-label="التالي"`
- Search trigger has `aria-label="بحث"`
- Share gutter buttons have `aria-label="X"`, `aria-label="WhatsApp"`, etc.
- Copy-link button has `aria-label="نسخ الرابط"`
- TTS play button has `aria-label="استمع للمقال"`

Also verify:
- `<main>` wraps the primary content area on each page
- `<nav>` wraps the category nav
- `<aside>` wraps the archive filter sidebar and the TOC sidebar
- `<article>` wraps the post body (single article per post page)
- `<header>` wraps the masthead
- `<footer>` is the actual footer

- [ ] **Step 3: Verify focus-visible rules cover every interactive element**

In `css/site.css`, after the existing `:focus-visible` rule, add component-specific overrides:

```css
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 3px;
}

.carousel:focus-visible {
  outline: 3px solid var(--gold);
  outline-offset: -3px;
}

.filter-item:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 4px;
}

.nav-item:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: -4px;
}
```

- [ ] **Step 4: Verify reduced-motion handling**

Open `posts/aadad-wizariya.html` and `index.html` in Chrome. Open dev tools → Rendering panel → "Emulate CSS prefers-reduced-motion: reduce". Reload and verify:
- Carousel doesn't autoplay
- Reading progress still updates on scroll (motion is requested by user — fine)
- Pulse animation on the carousel slide thumbnails (if any) is stopped

The `@media (prefers-reduced-motion: reduce)` block in `css/site.css` from Phase 1 already handles most. If you find any leftover animation that ignores the rule, add it to the list.

- [ ] **Step 5: Verify keyboard nav across the page**

Open `index.html`. Press Tab from the start. The focus order should be:
1. Skip link (slides in from top-right)
2. Masthead title link "العَسَّاف" (logo / home)
3. 5 social icons (X, Telegram, WhatsApp, Email, Search)
4. Search popover open → focus moves to input
5. (close popover, continue tabbing)
6. 6 category nav items + 2 utility links
7. Carousel container (single tab stop) — arrow keys navigate slides; Tab moves on
8. Filter sidebar buttons (category list, year list)
9. Essay row links
10. Vignette CTA "اقرأ السيرة الكاملة"
11. Contact form fields → submit
12. Contact-method cards
13. Newsletter form input → submit
14. Footer links

Each focused element shows the gold outline ring.

- [ ] **Step 6: Verify on screen reader (optional)**

If VoiceOver (macOS) or NVDA (Windows) is available:
- Carousel announces "آخر المقالات, region, carousel"
- Search trigger announces "بحث, button, collapsed" / "expanded" when toggled
- Each icon-only link announces its `aria-label`
- Comment-author reply badge ("المؤلف") announces correctly

- [ ] **Step 7: Commit + push + PR**

```bash
git add css/site.css index.html about.html contact.html posts/_template.html posts/aadad-wizariya.html
git commit -m "$(cat <<'EOF'
feat: accessibility hardening pass

Comprehensive audit and harden of accessibility primitives:

- Verify ARIA labels on every icon-only interactive element
  across home and post pages (carousel arrows, social icons,
  search trigger, copy-link, TTS play, share gutter buttons).
- Verify semantic landmarks on each page: header, nav, main,
  article, aside, section, footer used correctly.
- Verify focus-visible rules cover every interactive element
  with brand-gold outlines (component-specific overrides for
  carousel, filter buttons, nav items).
- Verify @media (prefers-reduced-motion: reduce) covers all
  animations and transitions.
- Verify keyboard tab order is sensible from skip-link
  through to footer.
- Verify lang="ar" and dir="rtl" on every page's <html>.

No new features — just hardening the existing structure to
treat keyboard and screen-reader users as first-class.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push -u origin feat/11-accessibility
```

---

## Phase 12: Visual Parity Verification

**Branch:** `feat/12-visual-parity`

**Files:**
- Modify: any file requiring fix to match the mockup

**Goal:** Side-by-side comparison of the implementation pages (`index.html`, `posts/aadad-wizariya.html`) against the approved mockups (`mockups/home.html`, `mockups/post.html`). Fix any visual discrepancies. After this phase, the implementation should be visually indistinguishable from the mockups at desktop, tablet, and mobile breakpoints.

- [ ] **Step 1: Branch**

```bash
git checkout main && git pull
git checkout -b feat/12-visual-parity
```

- [ ] **Step 2: Open implementation and mockup side-by-side**

In two browser windows (or split tabs):
- Window A: `mockups/home.html`
- Window B: `index.html`

Compare each section in order:
1. Masthead — date column, logotype + flourish, social icons row
2. Sticky nav — active state, hover underline
3. Hero carousel — slides, scrim, arrows, dots, progress bar
4. Credo card — corner brackets position, guillemets opacity, body type sizes
5. Archive — sidebar layout, filter active state, essay row hover, gradient bar
6. About — vignette portrait + name + role line, bio paragraphs, CTA
7. Contact — form field focus state, contact-method card hover
8. Newsletter — envelope icon size, flourish placement, side rules visibility
9. Footer — color, gold accents, link hover translateX

For each discrepancy, note the issue and fix in `css/site.css` or the HTML. Common gotchas:
- Margins between sections (mockup may have `padding: 96px 32px` you missed)
- Typography line-height (especially Amiri at 1.95)
- Color of subtle borders (`rgba(201,151,79,.18)` vs `.30` etc.)
- `aspect-ratio` declarations on hero/related card thumbnails

- [ ] **Step 3: Repeat for post page**

Window A: `mockups/post.html`
Window B: `posts/aadad-wizariya.html`

Compare:
1. Compact masthead, breadcrumb
2. Article header — H1 size, lede italic, meta row
3. TTS player — speed button width, progress bar gradient
4. Featured image — aspect ratio, caption styling
5. TOC sidebar — numbered prefix, active gradient bar
6. Article body — H2 with `::before` short rule, pull-quote breakout
7. Share gutter — vertical "شارك" label, arrow buttons
8. Author card — portrait size, name + bio sizing
9. Related articles — thumbnail aspect, hover translate
10. Comments — comment form, sample comment styling, author-reply variant

- [ ] **Step 4: Test responsive breakpoints**

In Chrome dev tools → Toggle device toolbar. Test at:
- 360 × 800 (small phone)
- 768 × 1024 (tablet portrait)
- 1024 × 768 (tablet landscape)
- 1440 × 900 (laptop)

Verify at each:
- Masthead remains usable (date column may stack on mobile)
- Nav items wrap reasonably
- Carousel content + meta-row remain readable
- Archive layout collapses gracefully (sidebar should stack above on mobile per the mockup's 1024px media query)
- Forms remain usable on mobile

Add or refine `@media` queries as needed.

- [ ] **Step 5: Commit + push + PR**

```bash
git add css/site.css index.html posts/aadad-wizariya.html  # (and any other files that needed parity fixes)
git commit -m "$(cat <<'EOF'
fix: visual parity with approved mockups

Pixel-level audit pass. Implementation now matches the
approved mockups at mockups/home.html and mockups/post.html:

- (List specific discrepancies fixed during the audit, e.g.,
  "Adjust .vignette padding from 28px to 32px", "Tighten
  .essay-meta line-height from 1.5 to 1.4", etc.)
- Verify responsive behavior at 360, 768, 1024, 1440px
  breakpoints. Archive sidebar stacks above the essay list
  on viewports under 1024px per the mockup's media query.

Implementation phase complete — site is visually consistent
with the approved design across desktop, tablet, and mobile.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push -u origin feat/12-visual-parity
```

---

## Self-Review Checklist (run after each phase)

Before opening the PR for any phase, run through:

- [ ] Open the affected page(s) in Chrome — does it render without console errors?
- [ ] Open in Firefox — same? (`backdrop-filter` and `:focus-visible` differences possible)
- [ ] Tab from page top — focus visible on every interactive element?
- [ ] Inspect dev tools "Issues" tab — any accessibility or HTML warnings?
- [ ] Check `git status` — all intended files staged, no stray files?
- [ ] Commit message has the Claude trailer?
- [ ] Branch name follows `feat/NN-...` convention?
- [ ] PR title matches commit subject?

---

## Spec Coverage Map

Cross-references each spec section/requirement to the phase that implements it:

| Spec section | Implemented in |
|---|---|
| §4.1 Stack — fonts, no build, vanilla JS | Phase 1 (foundation) |
| §4.2 Project structure | Phases 1 (root), 7 (posts/), 10 (more posts) |
| §4.3 Image strategy | Phase 10 (portrait localization) |
| §5.1 Palette tokens | Phase 1 |
| §5.2 Color usage rules | All phases (enforced through CSS custom properties) |
| §5.3 Typography (3 fonts) | Phase 1 (font loading), all subsequent (component sizing) |
| §5.4 Spacing scale | Phase 1 (tokens), used throughout |
| §5.5 Layout tokens | Phase 1 (tokens) |
| §5.6 Motion | Phase 1 (reduced-motion default), Phase 3 (carousel), Phase 11 (verification) |
| §6 IA + site map | Phase 2 (nav), Phase 4 (archive filter handles category browsing) |
| §7.1 Home page sections | Phases 2 (chrome) + 3 (hero) + 4 (credo, archive) + 5 (about, contact, newsletter) |
| §7.2 Post page sections | Phases 7 (foundation) + 8 (TTS) + 9 (engagement) |
| §7.3 About + Contact dedicated pages | Phase 2 (stubs) |
| §7.4 Category landing pages — replaced by filter | Phase 4 |
| §8 Components catalog (15) | All phases — each component lands with its section |
| §9.1 Search popover | Phase 6 |
| §9.2 Archive filter | Phase 4 |
| §9.3 Hero carousel | Phase 3 |
| §9.4 TTS voice reader | Phase 8 |
| §9.5 Reading progress | Phase 7 |
| §9.6 TOC scroll-spy | Phase 7 |
| §9.7 Forms with success states | Phase 5 (contact, newsletter) + Phase 9 (comment form) |
| §9.8 Copy link | Phase 9 |
| §10 Accessibility (skip link, focus, keyboard, ARIA, reduced motion, contrast, RTL) | Phase 1 (initial) + Phase 11 (verification pass) |
| §11.1 Font performance — note for future | Documented in §13 known followups; not implemented |
| §11.2 Image strategy — `loading="lazy"`, `decoding="async"` | Phase 10 |
| §11.3 CSS/JS architecture — single shared files | Phase 1 (site.css), Phase 3 (site.js) |
| §11.4 Runtime — passive scroll listeners | Phase 7 (reading progress, TOC scroll-spy) |
| §12 Browser support | All phases via vanilla CSS/JS; verification in Phase 12 |
| §13 Out of scope / known followups | Not implemented (intentional) |
| §14 Acceptance criteria | Phase 12 verification |

---

## Known followups (deferred per spec §13)

These items are explicitly NOT implemented in this plan:

- Hero photo identity stabilization (unified blue tint or curated set) — Phase 10 may or may not provide article-specific imagery; full curation is content work
- About-bio reading rhythm (lede first paragraph, hairline rules between)
- Social proof widget on home page (recent comments, comment counts)
- Inline form validation (required field marks, email format check)
- Form backend wiring (real POST endpoints)
- Comment moderation backend
- Real-content migration of all 126 articles (showcase scope is 12)
- Post page: featured-image weight reduction
- Post page: relative comment timestamps
- Post page: previous/next-in-category links
- Production font loading (subsetting + self-hosting + preload headers)

Each of these can become its own future PR after the showcase is shipped.
