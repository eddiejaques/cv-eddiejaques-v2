# eddiejaques.me — Product Requirements Document

**Project:** Director-Level Data & AI Product Portfolio Website  
**Author:** Gaurav Kumar Dani  
**Status:** Specification Draft  
**Last Updated:** June 2026  
**Target Launch:** Q3 2026  

---

## 1. PRODUCT OVERVIEW

### 1.1 Mission Statement
A minimalistic, original personal portfolio that positions Gaurav Kumar Dani as a hands-on Director of Data & AI Products — someone who leads, builds teams, prioritizes ruthlessly, and ships metric-driven products. The homepage is a simple, focused introduction to who Gaurav is, acting as a clean entry point into a body of case studies spanning different stages of his career. The site is a **narrative device**, not a resume dump: it tells the story of a leader who moves fast, thinks systemically, and delivers against ambiguous problems — without relying on borrowed visual tropes from other portfolios.

### 1.2 Target Audience
- **Primary:** Hiring partners, talent scouts, and executive recruiters evaluating director-level data/AI roles across **Germany, India, UAE, Singapore, Malaysia**
- **Secondary:** Potential advisors, co-founders, and technical peers conducting due diligence
- **Tertiary:** Career-track professionals inspired by frameworks and methodologies

### 1.3 Core Value Proposition
Gaurav doesn't tell you *how much* he's shipped. He shows you *what it cost*, *who paid the price*, and *what changed*. The portfolio is intentionally metrics-first, narrative-second, and designed to survive print and email without layout collapse.

---

## 2. DESIGN SYSTEM & VISUAL LANGUAGE

### 2.1 The Palette
A high-contrast, monochromatic foundation with a single electric accent that refuses to be ignored:

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| Background (light) | Alabaster Warm White | `#FAF9F6` | Page background, safe space |
| Surface (cards, blocks) | Brilliant White | `#FFFFFF` | Card surfaces, content zones |
| Primary Text | Inkwell Black | `#0D0E10` | Headlines, body copy |
| Secondary Text | Granite Gray | `#48494B` | Metadata, timestamps, supplementary info |
| Tertiary Text | Fog Gray | `#A8A8A8` | Disabled, faint, helper text |
| Accent (electric) | International Orange-Red | `#FF5A00` | CTAs, hovers, highlights, focal points |
| Border/Divider | `rgba(13, 14, 16, 0.08)` | — | Structural lines, grid boundaries |

**Rationale:** The orange accent is used sparingly — for CTAs, links, hovers, and metric highlights — so it draws attention without shouting. The monochromatic base keeps the focus on *content hierarchy*, not decoration. Generous white space, restrained typography, and a single accent color are the entire visual language; there is no decorative grid pattern, texture, or borrowed layout motif.

### 2.2 Typography Stack

#### Display/Headlines
- **Font:** Space Grotesk (weights: 600, 700)
- **Usage:** Page titles, section headers, case study headlines
- **Characteristics:** Geometric, high-contrast, deliberately artificial; no serifs, no warmth
- **Letter Spacing:** -0.02em (tight, aggressive)
- **Line Height:** 1.1 (compressed headlines)

#### Body/UI
- **Font:** Inter (weights: 400, 500, 600)
- **Usage:** Paragraph copy, descriptions, button labels, navigation
- **Characteristics:** Humanist sans-serif; legible at small sizes; professional without being corporate
- **Line Height:** 1.5–1.6 (generous for readability)

#### Data/Technical
- **Font:** JetBrains Mono (weights: 400, 500, 600)
- **Usage:** Metrics, timestamps, file names, code snippets, run logs
- **Characteristics:** Technical, monospaced; reinforces engineering rigor and transparency
- **Tracking:** +0.01em (breathing room in mono)

**Typographic Hierarchy:**
```
H1 (Hero Title)      40–60px Space Grotesk 700 -0.02em
H2 (Section Title)   28–36px Space Grotesk 600 -0.015em
H3 (Subsection)      20–24px Space Grotesk 600 -0.01em
Body (Standard)      16px Inter 400 1.6lh
Caption (Meta)       12–13px JetBrains Mono 500
Button/CTA           14px Inter 600
```

### 2.3 Spacing & Grid System

#### Base Unit
- **1 unit = 8px** (all spacing derives from multiples of 8: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, etc.)

#### Grid Architecture
- **Desktop:** 12-column grid, 980px max-width, 28px side gutters
- **Tablet:** 8-column grid, gutters collapse to 20px
- **Mobile:** Single-column, 16px horizontal padding

#### Vertical Rhythm
- **Section padding:** 72px top/bottom (desktop), 54px (tablet), 40px (mobile)
- **Card padding:** 32px (standard), 24px (compact)
- **Line height ratio:** 1.5–1.6 to maintain visual rhythm across text sizes

### 2.4 The Signature Layout: Simple Uniform Card Grid

The Case Studies section uses a **clean, uniform grid** — every cell holds a card, no decorative empty cells or diagonal patterns. The signature is restraint: generous gutters, consistent card heights, and a calm reading rhythm.

#### Grid Logic
```
Row 1:  [Card]  [Card]  [Card]
Row 2:  [Card]  [Card]  [Card]
Row 3:  [Card]  [Card]  [Card]
... (pattern repeats)
```

**Interactive Behavior:**
- On hover, the card itself reveals a **Before/After performance metric** (e.g., "CTR: 5% → 25%", "Cost: $700K → $0") inline within the card — replacing or appended below the description, with a smooth fade-in and a left-border accent stripe in orange
- Clicking the card navigates to the full case study
- On mobile: Grid collapses to single column; metric appears inline below each card description by default (no hover needed)

#### Why This Works
1. **Cognitive Load:** A uniform grid scans quickly and predictably; nothing competes for attention except content
2. **Originality:** Avoids common "gallery" gimmicks (diagonal tiles, masonry) in favor of a calm, confident layout
3. **Print-Friendly:** Uniform cards stack linearly with no layout reflow required

---

## 3. SITE ARCHITECTURE & PAGES

### 3.1 Information Architecture

```
eddiejaques.me
├── / (Homepage)
│   ├── Hero Section
│   ├── Metric-Driven Narrative
│   └── "Pick Your Poison" Dual CTA
│
├── /case-studies (Case Studies Hub)
│   ├── Uniform Card Grid Layout
│   ├── Category Filters (AI | Data Platforms | Marketing Tech | Growth)
│   ├── Experience-Stage Filters (by organization/era: Joyn | Optum | Vodafone | Earlier roles)
│   └── Search/Sort (Newest, Impact, Industry)
│
├── /case-studies/[slug] (Individual Case Study)
│   ├── Full narrative + metrics
│   └── Back to Grid
│
├── /blog (Blog / Run Logs)
│   ├── Reverse-chronological list
│   ├── Timestamps & categories
│   └── Search functionality
│
├── /blog/[slug] (Individual Article)
│   ├── Full article
│   └── Back to Blog
│
├── /resume (Printable Resume Page)
│   ├── Interactive timeline
│   ├── Downloadable PDF link
│   └── Print-optimized layout
│
└── /about (Brief bio page)
    └── Quick bio + links

```

### 3.2 Page Specifications

---

#### 3.2.1 HOMEPAGE (`/`)

**Purpose:** Lure. Hook. Force a decision.

**Content Flow:**
1. **Header (Fixed, Minimal Navigation)**
   - Logo: "eddiejaques" in Space Grotesk 700, 18px, color: `#0D0E10`
   - Navigation: Home | Case Studies | Blog | Resume | About
   - Social Links: GitHub, LinkedIn, Email
   - All links are text-only, no icons; hover state: orange accent, underline

2. **Hero Section (Viewport Height 100vh)**
   - Background: `#FAF9F6`
   - Layout: Vertical flex, center-aligned
   - Headline: Space Grotesk 700, 52px–64px (scales with viewport)
     ```
     Director of Data & AI Products
     Who Ships, Leads, and Proves It Works
     ```
   - Subheadline: Inter 400, 18px, `#48494B`, max-width 70ch
     ```
     14+ years moving fast across data platforms, AI products, and marketing tech.
     Currently rebuilding how Joyn's product works.
     Targeting your team next.
     ```
   - Metric Banner (below subheadline):
     - 3-column layout, text-center
     - Metric title (JetBrains Mono 12px, orange)
     - Metric value (Space Grotesk 700, 36px, `#0D0E10`)
     - Example:
       ```
       [COST AVOIDED]    [CTR IMPROVEMENT]    [TEAMS LED]
       $1M+              >200%                8+
       ```

3. **The Pick Your Poison CTA (Below Metrics)**
   - Split button: Two equal-width CTAs in a row (desktop) or stacked (mobile)
   - Left: "Read a Stat" → Links to `/case-studies`
   - Right: "Read a Thought" → Links to `/blog`
   - Button styling: Inverse colors on hover (background: orange, text: white)
   - Border: 2px solid orange on hover

4. **Credibility Section (Optional, Below CTA)**
   - Three small text callouts (Inter 14px, muted gray):
     ```
     Led 8+ cross-functional teams | Shipped 0→1 products | Built frameworks adopted company-wide
     ```

5. **Career Stages Strip (Entry Point into Case Studies)**
   - A simple horizontal row of text links/pills, one per experience stage (e.g., "Joyn" | "Optum" | "Vodafone" | "Earlier Roles")
   - Each links to `/case-studies?stage=<stage>`, pre-filtering the hub to that chapter of Gaurav's career
   - Style: Inter 500, 14px, `#48494B`, orange on hover/active; minimal pill or underline treatment — no heavy borders or icons
   - Purpose: gives visitors a second, chronological way into the case studies beyond the "Pick Your Poison" split, reinforcing the narrative of progression across stages

6. **Scroll Indicator (Subtle)**
   - Small text + down arrow: "Scroll for more" (Inter 12px, fog gray)
   - Appears below CTA, disappears on scroll

**Responsive Behavior:**
- Desktop: Full hero, metrics in 3 columns, buttons side-by-side
- Tablet: Hero scaled, metrics in 3 columns (responsive text sizing)
- Mobile: Hero condensed, metrics stack vertically, buttons full-width stacked

---

#### 3.2.2 CASE STUDIES HUB (`/case-studies`)

**Purpose:** Let the work speak. Showcase breadth and depth without noise.

**Layout:**
1. **Header Section**
   - Title: "Case Studies" (Space Grotesk 700, 48px)
   - Subtitle: "Metric-driven product work across AI, data platforms, and marketing tech" (Inter 400, 16px, muted)
   - Category Filters (horizontal): "All" | "AI Products" | "Data Platforms" | "Marketing Tech" | "Growth"
   - Experience-Stage Filters (horizontal, secondary row): "All Stages" | "Joyn" | "Optum" | "Vodafone" | "Earlier Roles" — lets a visitor browse the body of work by which chapter of Gaurav's career it belongs to
   - Search box (Inter 400, 16px): Placeholder "Search case studies..."

2. **Uniform Card Grid Layout (3 columns, Desktop)**
   ```
   [Case Study Card]  [Case Study Card]  [Case Study Card]
   [Case Study Card]  [Case Study Card]  [Case Study Card]
   ```
   - **Card Anatomy:**
     - Background: `#FFFFFF`, 1px border (`rgba(13, 14, 16, 0.08)`)
     - Padding: 32px
     - Hover: Subtle shadow increase, border color shifts to orange
     - Title: Space Grotesk 600, 22px
     - Category Tag + Stage Tag: JetBrains Mono 11px, all-caps, color: orange, margin-bottom 12px (e.g., "AI PRODUCTS · JOYN")
     - Description: Inter 400, 15px, `#48494B`, 3-line truncation (line-clamp: 3)
     - CTA: "Read full case" (Inter 600, 14px, orange)

   - **Hover Metric Reveal:**
     - On hover, a **Before/After performance metric** (e.g., "CTR: 5% → 25%") fades in within the card, below the description:
       - Background: `rgba(255, 90, 0, 0.05)` (very light orange wash)
       - Left border: 3px solid `#FF5A00`
       - Padding: 16px
       - Metric title: JetBrains Mono 11px, orange, all-caps
       - Metric value: Space Grotesk 700, 24px, `#0D0E10`
       - Animation: `opacity 0.3s ease, transform 0.3s ease` (slight upward slide)

3. **Pagination / Load More**
   - Display 12 cards initially (4 full "rows" in 3-column grid)
   - "Load More" button: 48px height, full-width (responsive), Inter 600, 14px
   - Or: Infinite scroll (on scroll to 80% viewport height, load next 12)

**Responsive Behavior:**
- Tablet (760px–1024px): 2-column grid
- Mobile (<760px): 1-column; metric appears inline below card description by default (no hover state needed)

---

#### 3.2.3 INDIVIDUAL CASE STUDY (`/case-studies/[slug]`)

**Purpose:** Deep narrative with proof.

**Layout:**
1. **Top Navigation Bar**
   - Back link: "← Back to Case Studies" (Inter 500, 14px, orange on hover)
   - Breadcrumb: "Case Studies / [Title]"

2. **Hero Section**
   - Background: Subtle gradient or solid `#FAF9F6`
   - Category tag (JetBrains Mono, orange)
   - Title: Space Grotesk 700, 48px, max-width 60ch
   - Subtitle/Problem: Inter 400, 18px, `#48494B`, max-width 70ch
   - Metadata row:
     - Date (JetBrains Mono 12px): "Published [Month, Year]"
     - Read time: "~ [X] min read"
     - Organization: "Seven.One | Optum | Vodafone"

3. **Main Content Area**
   - Max-width: 720px (narrow column for legibility)
   - Typography: Inter 400, 16px, 1.6lh
   - Headings: Space Grotesk 600, scaled appropriately (H2: 32px, H3: 24px, H4: 20px)
   - Lists: Unordered with orange bullets (—)
   - Blockquotes: Italic, left-border orange, 24px padding-left
   - Code blocks: JetBrains Mono, dark background (`#0D0E10`), white text, 12px, padding 16px
   - Images: Full-width, 1px border, subtle shadow on hover

4. **Key Metrics Section** (Highlighted callout)
   - Background: `#FAF9F6`, 1px border, padding 32px
   - Grid: 2–3 columns
   - Metric blocks:
     - Value: Space Grotesk 700, 36px, orange
     - Label: Inter 500, 14px, `#48494B`
   - Example:
     ```
     $1M+               200%+               72%
     Avoided Cost       CTR Improvement     Support Ticket Reduction
     ```

5. **Bottom CTA Section**
   - "Back to Case Studies" (full-width button)
   - Optional: "Read Next Case Study" (linked to adjacent case)

**Print Style:**
- Metrics section becomes a simple table
- Images scale to fit page width
- Page breaks handled gracefully (no content split awkwardly)

---

#### 3.2.4 BLOG HUB (`/blog`)

**Purpose:** Thought leadership, frameworks, and live field notes.

**Layout:**
1. **Header Section**
   - Title: "Run Logs" or "Blog" (Space Grotesk 700, 48px)
   - Subtitle: "Tactical frameworks, product decisions, and lessons from the field" (Inter 400, 16px, muted)
   - Search box (optional)

2. **Post List** (Reverse chronological)
   - Max-width: 720px
   - Each post item:
     - Run log timestamp (JetBrains Mono 11px, orange): "[RUN-LOG // 2026.06.14]"
     - Title (Space Grotesk 600, 28px): Clickable link
     - Excerpt (Inter 400, 15px, muted): 2 lines, line-clamp
     - Tags (Inter 500, 12px, light gray): "Product Strategy" | "AI" | "Data"
     - Separator: 1px border, `rgba(13, 14, 16, 0.08)`

3. **Pagination or Infinite Scroll**
   - Show 10 posts initially; load more on scroll or button click

---

#### 3.2.5 INDIVIDUAL BLOG POST (`/blog/[slug]`)

**Purpose:** Narrative depth with technical rigor.

**Layout:**
1. **Header Section** (Same as case studies)
   - Back link
   - Run log timestamp
   - Title
   - Metadata (publish date, estimated read time)

2. **Main Content Area**
   - Max-width: 720px
   - Typography: Inter 400, 16px, 1.6lh
   - Headings, blockquotes, code: Same rules as case studies

3. **Post Metadata (End of Article)**
   - Author: "Gaurav Kumar Dani"
   - Published: [Date]
   - Tags (clickable): Link to `/blog?tag=ProductStrategy`

4. **Navigation Footer**
   - "← Previous Post" | "Next Post →" (centered, Inter 500, 14px)

---

#### 3.2.6 RESUME PAGE (`/resume`)

**Purpose:** Compact, print-friendly, chronological, leadership-first.

**Layout:**
1. **Header Section**
   - Name: Space Grotesk 700, 32px
   - Title: Space Grotesk 600, 18px
   - Contact: Inter 400, 12px
     ```
     Munich, Germany | +49-170-550-8071 | gauravdani@duck.com
     LinkedIn: [link] | GitHub: [link]
     ```

2. **Executive Summary** (Optional, ~2 sentences)
   - Inter 400, 15px, `#48494B`

3. **Core Competencies** (Inline, keyword-heavy)
   - Inter 500, 13px
   - Grouped by category: "AI Product Strategy | Data Platform Architecture | Marketing Technology | ..."

4. **Professional Experience** (Timeline)
   - Organization & Role: Space Grotesk 600, 18px
   - Dates: JetBrains Mono 12px, muted
   - Location: Inter 400, 13px
   - Bullet points: Inter 400, 14px, 1.55lh
     - Lead with metric or outcome
     - Use em-dash bullet style
     - Max 2 sentences per bullet

5. **Education Section**
   - School: Space Grotesk 600, 16px
   - Degree & field: Inter 400, 14px
   - Graduation date: JetBrains Mono 12px

6. **Skills Section** (Categorical)
   - Category (JetBrains Mono, orange): Product Strategy | AI & ML | Analytics | Ad-Tech | Privacy & Compliance
   - Skills (Inter 400, 13px): Comma-separated

7. **Certifications** (If notable)
   - Cert Name | Issuing Body | Date

**Print Optimization:**
- On `@media print`:
  - Remove header navigation, footer, any CTAs
  - Use single-column layout
  - Adjust margins: 0.75" (top/bottom), 0.75" (left/right)
  - Font sizes scale down slightly for A4 fit
  - Links become plain text (no underlines)
  - Background colors removed (all backgrounds: white)
  - Breaks: Avoid breaking org blocks; allow section breaks

---

#### 3.2.7 ABOUT PAGE (`/about`)

**Purpose:** Quick bio, credibility, and personality.

**Layout:**
1. **Hero**
   - Title: "About" or "Who I Am"
   - Brief bio (2–3 paragraphs, Inter 400, 16px)

2. **Key Stats**
   - 3–4 callouts (Space Grotesk 600, values; Inter 500, labels)
   - Examples: "14+ Years in Product", "8+ Teams Led", "$1M+ in Measurable Impact"

3. **What I Care About** (Optional)
   - Bullet list of core principles
   - Example: "Building first-party data stacks that don't leak privacy. Measuring everything. Shipping incrementally."

4. **Currently**
   - What Gaurav is working on / interested in
   - Open to conversations about: [Director roles in DACH, India, Singapore, UAE]

5. **Say Hello**
   - Email link, LinkedIn, GitHub
   - Optional: Calendly link for quick calls

---

## 4. COMPONENT LIBRARY & SPECIFICATIONS

### 4.1 Header / Navigation

**Desktop:**
- Fixed or sticky positioning (initially fixed, becomes sticky on scroll past hero)
- Height: 72px
- Layout: Flex, space-between
- Logo (left): "eddiejaques" (Space Grotesk 700, 18px, `#0D0E10`)
- Nav Links (center, Inter 500, 14px):
  - Home | Case Studies | Blog | Resume | About
  - Hover: Orange underline (2px, fade-in 0.2s)
  - Active: Orange underline + orange text
- Social Links (right, Inter 500, 14px):
  - GitHub | LinkedIn | Email
  - Same hover state as nav

**Mobile (<760px):**
- Hamburger menu icon (3 horizontal lines, 24×24px)
- On click: Slide-in navigation panel from right (width: 100%, or 80% of viewport)
- Panel background: `#FAF9F6`, border-left: 2px solid orange
- Nav items stack vertically, full-width, padding: 20px
- Close button (X icon) in top-right

---

### 4.2 Button Styles

**Primary CTA (Orange)**
- Background: `#FF5A00`
- Text: `#FFFFFF`, Inter 600, 14px
- Padding: 14px 24px (height: 48px min)
- Border: None
- Border-radius: 4px
- Hover: Brightness 0.9 (slightly darker orange)
- Active: Brightness 0.8
- Transition: background 0.2s ease

**Secondary CTA (Orange Outline)**
- Background: transparent
- Border: 2px solid `#FF5A00`
- Text: `#FF5A00`, Inter 600, 14px
- Padding: 12px 22px (height: 48px min)
- Border-radius: 4px
- Hover: Background: `#FF5A00`, Text: `#FFFFFF`
- Transition: background 0.2s ease, color 0.2s ease

**Text Link**
- Color: `#FF5A00`
- Text decoration: None
- Hover: Underline (2px solid orange, fade-in 0.2s)
- Transition: color 0.2s ease

---

### 4.3 Card Component

**Base Card:**
- Background: `#FFFFFF`
- Border: 1px solid `rgba(13, 14, 16, 0.08)`
- Border-radius: 8px
- Padding: 32px
- Box-shadow: `0 1px 3px rgba(0, 0, 0, 0.05)` (subtle, barely visible)
- Hover shadow: `0 8px 16px rgba(0, 0, 0, 0.1)` (increase depth on hover)
- Transition: all 0.3s ease

**Case Study Card (Specific):**
- Category tag: JetBrains Mono 11px, all-caps, color: orange, margin-bottom 12px
- Title: Space Grotesk 600, 22px, `#0D0E10`, margin-bottom 8px
- Description: Inter 400, 15px, `#48494B`, line-clamp: 3, margin-bottom 16px
- CTA Link: Inter 600, 14px, orange, margin-top 12px
- On hover:
  - Border color: `#FF5A00`
  - Background: `rgba(255, 90, 0, 0.02)` (very faint orange wash)

---

### 4.4 Form Inputs

**Text Input / Textarea**
- Background: `#FFFFFF`
- Border: 1px solid `rgba(13, 14, 16, 0.12)`
- Border-radius: 4px
- Padding: 12px 16px
- Font: Inter 400, 14px
- Placeholder: `#A8A8A8` (fog gray)
- Focus: Border color: orange, outline: none, box-shadow: `0 0 0 3px rgba(255, 90, 0, 0.1)`
- Transition: border 0.2s ease, box-shadow 0.2s ease

---

### 4.5 Metric Block Component

**Metrics Callout:**
- Layout: CSS Grid, 2–3 equal columns (responsive)
- Text alignment: center
- Metric Value: Space Grotesk 700, 36px, orange
- Metric Label: Inter 500, 14px, `#48494B`
- Separator (between columns): 1px solid `rgba(13, 14, 16, 0.08)`

---

## 5. TECHNICAL STACK & ARCHITECTURE

### 5.1 Frontend Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | React 18+ | Component reusability, state management, strong ecosystem |
| **State Management** | Redux (Redux Toolkit) | Centralized app state, case study filters, blog search, navigation state |
| **Routing** | React Router v6 | Client-side navigation, dynamic route params (e.g., `/case-studies/[slug]`) |
| **Styling** | CSS-in-JS (Tailwind CSS + CSS Modules) | Utility-first + scoped styles for components; easy theming; excellent PSD/Figma → code workflow |
| **Build Tool** | Vite | Fast cold start, instant HMR, optimized production builds |
| **Package Manager** | pnpm | Speed, disk efficiency, monorepo-ready |
| **Type Safety** | TypeScript | Catch errors at compile time, improve IDE experience |

### 5.2 Project Structure

```
eddiejaques.me/
├── public/
│   ├── case-studies/
│   │   ├── joyn-cdp/
│   │   │   ├── hero.jpg
│   │   │   ├── architecture.png
│   │   │   └── ...
│   │   └── [other case studies]
│   └── images/
│       ├── og-image.png
│       └── ...
│
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── Card.tsx
│   │   ├── Button.tsx
│   │   ├── Metrics.tsx
│   │   ├── CaseStudyCard.tsx
│   │   ├── BlogPostItem.tsx
│   │   └── Footer.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── CaseStudiesHub.tsx
│   │   ├── CaseStudyDetail.tsx
│   │   ├── BlogHub.tsx
│   │   ├── BlogPostDetail.tsx
│   │   ├── Resume.tsx
│   │   ├── About.tsx
│   │   └── NotFound.tsx
│   │
│   ├── store/
│   │   ├── store.ts (Redux configuration)
│   │   ├── slices/
│   │   │   ├── caseStudiesSlice.ts
│   │   │   ├── blogSlice.ts
│   │   │   └── uiSlice.ts (theme, mobile menu state)
│   │   └── selectors/
│   │       ├── caseStudiesSelectors.ts
│   │       └── blogSelectors.ts
│   │
│   ├── data/
│   │   ├── caseStudies.ts (Static case study metadata + content)
│   │   ├── blogPosts.ts (Static blog posts)
│   │   └── resume.ts (Resume data structure)
│   │
│   ├── styles/
│   │   ├── globals.css (CSS reset, base typography, design tokens)
│   │   ├── tailwind.config.js (Theme configuration)
│   │   ├── fonts.css (Space Grotesk, Inter, JetBrains Mono imports)
│   │   └── print.css (@media print overrides)
│   │
│   ├── utils/
│   │   ├── slugify.ts (Title → slug transformation)
│   │   ├── dateFormat.ts (Date formatting helpers)
│   │   └── analytics.ts (Optional: GA4 tracking)
│   │
│   ├── types/
│   │   ├── CaseStudy.ts
│   │   ├── BlogPost.ts
│   │   └── Resume.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── tests/
│   ├── components/
│   └── pages/
│
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

### 5.3 Data Model

#### CaseStudy Type
```typescript
interface CaseStudy {
  id: string;                  // Unique identifier
  slug: string;                // URL-safe slug
  title: string;               // Display title
  category: 'AI' | 'Data Platforms' | 'Marketing Tech' | 'Growth';
  organization: string;        // Joyn, Optum, Vodafone, etc.
  experienceStage: 'Joyn' | 'Optum' | 'Vodafone' | 'Earlier Roles'; // Career chapter, used for stage filtering
  description: string;         // 2–3 sentence teaser
  keyMetrics: {
    label: string;
    value: string;             // E.g., "25%", "$1M+", "200%+"
  }[];
  publishedDate: string;       // ISO 8601
  readTime: number;            // Minutes
  contentPath: string;         // Path to markdown/HTML content
  heroImage?: string;          // Path to hero image
  tags?: string[];             // Search/filtering tags
}
```

#### BlogPost Type
```typescript
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;         // Excerpt
  content: string;             // Markdown or HTML
  publishedDate: string;       // ISO 8601
  readTime: number;            // Minutes
  tags: string[];              // Categories
  featured?: boolean;          // Show on homepage
}
```

---

## 6. FEATURE SPECIFICATIONS

### 6.1 Case Studies Grid (Uniform Layout)

**CSS Grid Implementation:**

```css
.case-studies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;                   /* 3 × 8px base unit */
}

@media (max-width: 1024px) {
  .case-studies-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 760px) {
  .case-studies-grid {
    grid-template-columns: 1fr;
  }
}
```

**Hover Metric Rendering (React/JS):**

```typescript
// On card hover/focus, reveal the metric block within the same card
const handleCardHover = (cardId: string) => {
  // Toggle a visible class on the card's metric block
  // Fade in + slight upward slide via CSS transition
};
```

### 6.2 Navigation & Routing

**React Router Configuration:**

```typescript
const routes = [
  { path: '/', element: <Home /> },
  { path: '/case-studies', element: <CaseStudiesHub /> },
  { path: '/case-studies/:slug', element: <CaseStudyDetail /> },
  { path: '/blog', element: <BlogHub /> },
  { path: '/blog/:slug', element: <BlogPostDetail /> },
  { path: '/resume', element: <Resume /> },
  { path: '/about', element: <About /> },
  { path: '*', element: <NotFound /> },
];
```

### 6.3 Redux State Shape

```typescript
interface RootState {
  caseStudies: {
    items: CaseStudy[];
    selectedCategory: string | null;
    selectedStage: string | null; // Joyn | Optum | Vodafone | Earlier Roles
    searchTerm: string;
    loading: boolean;
    error: string | null;
  };
  blog: {
    posts: BlogPost[];
    selectedTag: string | null;
    searchTerm: string;
    loading: boolean;
  };
  ui: {
    mobileMenuOpen: boolean;
    scrollPosition: number;
    theme: 'light'; // Only light theme for now
  };
}
```

### 6.4 Search & Filtering

**Case Studies:**
- Filter by category (AI, Data Platforms, Marketing Tech, Growth)
- Filter by experience stage / organization (Joyn, Optum, Vodafone, Earlier Roles)
- Search by title, description, or tags (client-side, no backend needed for MVP)
- Sort by: Newest, Oldest, Alphabetical

**Blog:**
- Filter by tag (Product Strategy, AI, Data, etc.)
- Search by title or content excerpt
- Sort by: Newest, Oldest

**Implementation:** Redux selectors + client-side filtering (fast enough for ~20–30 items)

### 6.5 Print Optimization

**CSS @media print:**

```css
@media print {
  /* Remove navigation, CTAs, ads */
  header, footer, nav, .cta-button { display: none; }

  /* Adjust margins for A4/Letter */
  body { margin: 0.75in; }

  /* Prevent page breaks mid-content */
  section { page-break-inside: avoid; }

  /* Backgrounds off */
  * { background: white !important; }

  /* Links as plain text */
  a { text-decoration: none; color: #0D0E10; }

  /* Ensure good contrast for B&W printing */
  * { color: #0D0E10; }

  /* Optimize spacing for print */
  section { margin-bottom: 1in; }
}
```

**PDF Export (Optional):**
- Use Puppeteer or Playwright server-side to render HTML → PDF
- Or: Browser's native Print → Save as PDF (better UX, lower overhead)
- CSS will handle layout correctly via `@media print`

---

## 7. CONTENT STRATEGY

### 7.1 Case Study Metadata Format

Each case study will have:
1. **Title** (unique, descriptive)
2. **Category** (AI Products | Data Platforms | Marketing Tech | Growth)
3. **Organization** (Joyn | Optum | Vodafone | Rockalytics, etc.)
4. **Key Metrics** (2–4 headline metrics, formatted for display)
5. **Description** (teaser, 2–3 sentences)
6. **Content** (HTML or Markdown, max-width 720px when rendered)
7. **Hero Image** (optional, 1200×600px minimum)
8. **Publish Date**
9. **Read Time** (auto-calculated from word count)

**Current Case Studies (10):**
- Joyn CDP Migration
- Joyn Recommendation Platform
- Joyn Search & Product Discovery
- Marketing Data Maturity Framework
- Hightouch Audience Activation
- Marketing Tech Implementation (Running Campaigns App)
- Mixpanel + Databricks + Python
- Mixpanel Implementation (25–30 hours)
- Segment / Segment-Like CDP Implementation (50–55 hours)
- [Additional case studies TBD; Gaurav mentioned ~20 total]

**Future Case Study Additions:**
- Gaurav can add more case studies without code changes (just append to `caseStudies.ts`)
- Admin panel TBD for non-developers to add/edit case studies

### 7.2 Blog Posting Workflow

**Format:** Markdown (.md) files in `src/data/blogPosts/`
- Title, date, excerpt, tags, content (in YAML front-matter + markdown body)
- Parsed at build time into BlogPost objects
- Deploy: Commit → Rebuild → Deploy (no CMS needed for MVP)

**Example Post Structure:**
```markdown
---
id: "2026-06-14-director-vs-pm"
slug: "director-vs-pm"
title: "Director vs. PM: Where the Role Splits"
description: "Leadership is not management. Here's what changes."
publishedDate: "2026-06-14"
tags: ["Product Strategy", "Leadership", "Career"]
featured: false
---

# Director vs. PM: Where the Role Splits

[Content here...]
```

---

## 8. DEPLOYMENT & HOSTING

### 8.1 Hosting Platform
- **Provider:** Vercel (optimal for Next.js/React + Vite projects)
- **Domain:** eddiejaques.me (custom domain, HTTPS auto-managed)
- **Environment:** Production only (no staging needed for MVP)

### 8.2 Build & Deploy Pipeline
1. Code committed to GitHub
2. Vercel auto-builds on every push to `main` branch
3. Build succeeds → Auto-deployed to production
4. CDN caching for assets (images, CSS, JS)

### 8.3 Performance Targets
- **Lighthouse Score:** 90+ across all pages
- **Core Web Vitals:**
  - LCP (Largest Contentful Paint): <2.5s
  - FID (First Input Delay): <100ms
  - CLS (Cumulative Layout Shift): <0.1
- **Bundle Size:** <150KB (gzipped) for homepage

### 8.4 Analytics (Optional)
- **Tool:** Google Analytics 4 or Plausible (privacy-first)
- **Track:** Page views, CTA clicks, case study opens, blog post reads
- **Goal:** Understand which case studies resonate with visitors

---

## 9. ACCESSIBILITY & SEO

### 9.1 Accessibility (WCAG 2.1 AA)
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
- Color contrast ratio: 4.5:1 for normal text, 3:1 for large text
- Focus visible states on all interactive elements
- Form labels properly associated with inputs
- Image alt text for all meaningful images
- Keyboard navigation: Tab through links/buttons without mouse

### 9.2 SEO
- **Meta Tags:** Title, description, og:image, og:url for each page
- **Structured Data:** JSON-LD for Person schema (homepage), BlogPosting schema (blog), CreativeWork schema (case studies)
- **Sitemap:** Auto-generated `sitemap.xml`
- **Robots.txt:** Allow all
- **Open Graph:** Optimized for LinkedIn/social shares
- **Keywords:** Director, Product, Data, AI, Case Studies, Portfolio

---

## 10. PRODUCT ROADMAP & PHASING

### **Phase 1: MVP (Target: End of Q3 2026)**
- [x] Design system finalized
- [x] React + Redux scaffold
- [ ] Homepage (hero + CTAs)
- [ ] Case Studies Hub (grid + chess-board layout)
- [ ] Case Study Detail pages (9 case studies live)
- [ ] Blog Hub (structure ready, 2–3 initial posts)
- [ ] Blog Post Detail pages
- [ ] Resume page (print-optimized)
- [ ] About page
- [ ] Header + Navigation
- [ ] Deployment to eddiejaques.me

### **Phase 2: Post-Launch (Q4 2026)**
- Case study search & filtering
- Blog post search & tagging
- Admin interface (for adding case studies/blog posts without code)
- Analytics integration (GA4)
- Newsletter signup (optional)
- Comments on blog posts (optional)

### **Phase 3: Enhancement (2027+)**
- CMS integration (Contentful, Notion, Sanity)
- Dark mode toggle (optional; currently light-only per design)
- Interactive visualizations (charts, graphs for metrics)
- Social proof (testimonials, recommendations)
- Speaking engagements / Press page

---

## 11. DESIGN TOKENS & CSS VARIABLES

All colors, spacing, and typography defined as CSS custom properties for easy theming:

```css
:root {
  /* Colors */
  --bg-primary: #FAF9F6;
  --bg-surface: #FFFFFF;
  --color-ink: #0D0E10;
  --color-muted: #48494B;
  --color-faint: #A8A8A8;
  --color-accent: #FF5A00;
  --color-border: rgba(13, 14, 16, 0.08);

  /* Typography */
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --space-unit: 8px;
  --space-xs: calc(var(--space-unit) * 1);    /* 8px */
  --space-sm: calc(var(--space-unit) * 2);    /* 16px */
  --space-md: calc(var(--space-unit) * 3);    /* 24px */
  --space-lg: calc(var(--space-unit) * 4);    /* 32px */
  --space-xl: calc(var(--space-unit) * 6);    /* 48px */
  --space-2xl: calc(var(--space-unit) * 9);   /* 72px */

  /* Typography Scale */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 28px;
  --text-4xl: 36px;
  --text-5xl: 48px;
  --text-6xl: 60px;

  /* Border & Shadow */
  --border-width: 1px;
  --border-radius: 8px;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 8px 16px rgba(0, 0, 0, 0.1);

  /* Z-index */
  --z-base: 1;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal: 1000;
}
```

---

## 12. CONTENT CHECKLIST (MVP LAUNCH)

- [ ] All 9 case study HTML files converted to React components
- [ ] Case study metadata structured (title, category, metrics, slug)
- [ ] 3–5 blog posts written (frameworks, product philosophy, lessons learned)
- [ ] Resume content audited and formatted for page
- [ ] About page bio written (2–3 paragraphs)
- [ ] All images optimized for web (WebP + fallback JPEG)
- [ ] Social preview images generated (og:image)
- [ ] Meta descriptions written for each page
- [ ] Contact links verified (email, LinkedIn, GitHub)

---

## 13. SUCCESS METRICS & KPIs

**Qualitative:**
- Hiring feedback on portfolio clarity and credibility
- Ease of understanding Gaurav's leadership approach from site
- Clear differentiation from generic portfolio sites

**Quantitative (Post-Launch):**
- **Homepage:** Engagement rate on "Pick Your Poison" CTAs (case studies vs. blog split)
- **Case Studies:** Scroll depth, time spent, click-through to full case study
- **Blog:** Read time vs. actual time spent, return visitor rate
- **Resume:** Print conversion rate (users hitting Cmd+P)
- **Overall:** Bounce rate, average session duration, pages per session

---

## 14. TECH DEBT & FUTURE CONSIDERATIONS

1. **Image Optimization:** Consider Next.js Image component or similar for automatic srcset generation
2. **Content Management:** Evaluate CMS (Contentful, Sanity) if adding >30 case studies
3. **Comments/Engagement:** Blog comments require backend; consider Disqus or similar
4. **Video Case Studies:** Some case studies could benefit from embedded video demos
5. **Internationalization:** Consider multi-language support (German, Hindi) if targeting non-English audiences
6. **Dark Mode:** Currently out of scope; requires careful design iteration

---

## 15. HANDOFF & DEVELOPMENT PRIORITIES

### Immediate Actions (Week 1)
1. Finalize design in Figma (all components, states, responsive breakpoints)
2. Set up React + Vite project scaffold
3. Implement design system (CSS variables, component library)
4. Build Header, Navigation, Footer components

### Core Build (Week 2–4)
1. Implement Homepage layout
2. Build Case Studies Grid with chess-board layout
3. Create Case Study detail page template
4. Build Blog Hub and Blog Post template
5. Implement Resume page with print styles

### Content & QA (Week 5–6)
1. Convert all case study HTML to React components
2. Add case study metadata + images
3. Write 3–5 blog posts
4. Test responsiveness (desktop, tablet, mobile)
5. Test print functionality (Cmd+P on each page)
6. Lighthouse / performance audit

### Launch (Week 7)
1. Final QA and bug fixes
2. Deploy to Vercel
3. Domain routing (eddiejaques.me)
4. Monitor uptime and error tracking
5. Iterate based on user feedback

---

## APPENDIX A: DESIGN PRINCIPLES

**Originality Note:** This design is developed independently for eddiejaques.me and does not replicate the layout or visual identity of any existing portfolio site. The guiding principle is restraint — "good design is as little design as possible" — applied through whitespace, typographic hierarchy, and a single disciplined accent color rather than borrowed motifs.

**Color Palette Reference:**
- Alabaster (#FAF9F6): Warm, inviting, less harsh than pure white
- International Orange (#FF5A00): Authority, urgency, emergency (perfect for CTAs)
- Inkwell Black (#0D0E10): Warm black, slightly softer than #000000

---

## APPENDIX B: CONTENT CALENDAR (BLOG)

| Date | Title | Category | Status |
|------|-------|----------|--------|
| 2026-06-14 | Director vs. PM | Leadership | Draft |
| 2026-06-21 | Why Your Data Pipeline Is Broken | Data | Outline |
| 2026-06-28 | Five Levels of Marketing Data Maturity | Product | Draft |
| 2026-07-05 | Building Recommendation Systems That Ship | AI/Product | Outline |
| 2026-07-12 | CDPs Are Not Magic | Data | Outline |

---

**Document Approval:**
- [ ] Design finalized
- [ ] Technical architecture approved
- [ ] Content roadmap confirmed
- [ ] Launch date confirmed

**Last Revision:** June 14, 2026  
**Next Review:** Upon completion of Phase 1 (MVP)
