# Bravado Real Estate (B|RE) -- Definitive Brand Guide

---

## 1. Brand Positioning

Bravado Real Estate is a boutique NYC brokerage that operates with institutional discipline and entrepreneurial intensity. Founded in 2018 by Oluwatobi Bello, Bravado exists at the intersection of data-driven analysis and boots-on-the-ground tenacity.

**What makes Bravado different:**

- Not a volume shop. Every client gets a senior agent, not a junior associate.
- Institutional-grade market intelligence applied to individual transactions.
- Track record: 15+ years combined experience, $140M+ in transaction volume, 2,000+ deals closed.
- Full-spectrum: investment sales, commercial leasing, residential brokerage, advisory.
- NYC-native. Not a national franchise with a local office. Born here. Built here.

**Brand promise:** We decode value, forecast opportunity, and execute with precision.

**Competitive frame:** Bravado is not competing with Compass or Douglas Elliman on volume. It competes on intelligence, access, and results. The brand should feel like a private wealth advisor who happens to specialize in real estate -- not like a retail brokerage.

---

## 1b. Logo Construction

The B|RE logo is composed of three discrete image assets extracted from the original master file:

| Asset | File | Content | Inversion |
|-------|------|---------|-----------|
| B | `logo-b.png` | Solid black Bodoni B | Inverts to white on dark backgrounds |
| Pipe | `logo-pipe.png` | Oxblood red vertical bar | NEVER inverts -- always red |
| RE | `logo-re.png` | Outlined Bodoni R and E | Inverts to white on dark backgrounds |

### Logo Rules
- **Minimum size:** 40px height (h-10 in Tailwind). Below this the outlined RE becomes illegible.
- **Clear space:** Maintain at least 0.5x the logo height as clear space on all sides.
- **Dark backgrounds (default):** B and RE invert to white via `brightness-0 invert`. The red pipe stays red.
- **Light backgrounds:** B and RE remain black. The red pipe stays red. Set `invertColors={false}` on the component.
- **Never:** Place the logo on a red background. Never stretch, rotate, or separate the three parts beyond their natural spacing. Never add drop shadows or outlines.
- **Favicon:** Simplified to just "B|" at 64x64 in SVG format (`/favicon.svg`).

### Component Usage
```tsx
<BRELogo height="h-14" />                    // Default: white B|RE on dark bg
<BRELogo height="h-14" invertColors={false} /> // Black B|RE on light bg
```

---

## 2. Brand Personality

Five adjectives that define B|RE:

1. **Authoritative** -- We speak from expertise, not opinion. Every claim has evidence.
2. **Precise** -- No filler, no fluff. Every word earns its space.
3. **Bold** -- The name is "Bravado." We are confident, not cautious.
4. **Institutional** -- Our processes mirror the rigor of a hedge fund, not a storefront agency.
5. **Grounded** -- Despite the premium positioning, we are real people solving real problems. No pretension.

---

## 3. Color System

### Primary -- Oxblood Red
- **Value:** `hsl(0, 100%, 45%)`
- **Usage:** The red pipe `|`, CTA buttons, accent text, progress indicators, hover states.
- **Never:** Background fills on large areas. Red is always a surgical accent, never a flood.

### Secondary -- Burgundy
- **Value:** `hsl(352, 60%, 28%)`
- **Usage:** Secondary buttons, badges, subtle accents, selection highlights, focus rings.
- **Role:** The "quiet confidence" color. Used where oxblood would be too loud.

### Neutrals -- Near-Black to White
| Token | Value | Usage |
|-------|-------|-------|
| neutral-950 | `hsl(0, 0%, 4%)` | Primary background (dark mode default) |
| neutral-900 | `hsl(0, 0%, 8%)` | Cards, elevated surfaces |
| neutral-800 | `hsl(0, 0%, 15%)` | Borders, dividers |
| neutral-700 | `hsl(0, 0%, 25%)` | Muted text, inactive states |
| neutral-500 | `hsl(0, 0%, 48%)` | Body text (secondary) |
| neutral-400 | `hsl(0, 0%, 62%)` | Captions, labels |
| neutral-100 | `hsl(0, 0%, 95%)` | Light backgrounds |
| white | `hsl(0, 0%, 100%)` | Primary text on dark, CTAs |

### Color Rules
- The page is dark by default (neutral-950). Light accents, not light pages.
- Red appears only through the pipe motif, buttons, and animated counters.
- No gradients on text. Gradients are reserved for subtle background washes.
- The only "color" on the page should be red. Everything else is grayscale.

---

## 4. Typography

### Display Font -- Bodoni Moda
- **Why:** The B|RE logo is set in a Bodoni-style serif. The thick-thin stroke contrast of Bodoni mirrors the vertical pipe `|` of the logo. It is the typographic DNA of the brand.
- **Usage:** All headings (h1-h4), stat counters, brand statements, hero text.
- **Weight:** 400 (regular) for most display use, with `font-light` + `italic` for emphasis phrases.
- **Feature:** Enable discretionary ligatures (`dlig`) for premium feel.

### Body Font -- Inter
- **Why:** Clean, highly legible, designed for screens. The neutrality of Inter lets Bodoni Moda shine.
- **Usage:** All body copy, labels, captions, buttons, navigation.
- **Weight:** 400 for body, 500 for labels, 600 for emphasis.

### Type Scale
| Class | Size | Line Height | Usage |
|-------|------|------------|-------|
| `text-display-xl` | clamp(3.5rem, 8vw, 8rem) | 0.9 | Hero headline only |
| `text-display-lg` | clamp(2.5rem, 6vw, 6rem) | 0.95 | Section headlines |
| `text-display-md` | clamp(2rem, 4vw, 4rem) | 1.0 | Sub-headlines |
| `text-body-lg` | 1.125rem | 1.7 | Lead paragraphs |
| `text-body` | 1rem | 1.6 | Standard body |
| `text-caption` | 0.875rem | 1.5 | Labels, uppercase tracking |

### Typography Rules
- Headlines must be LARGE. The hero h1 should fill the viewport width at 70-80%.
- Always use negative letter-spacing on display text: -0.02em to -0.04em.
- Body text never exceeds 65 characters per line (max-w-lg or max-w-xl).
- Uppercase tracking for labels: 0.2em minimum.
- The pipe character `|` in text is always colored red and set at 0.5em relative to surrounding text.

---

## 5. The Red Pipe -- Brand Element Rules

The `|` is not decoration. It is the structural spine of the B|RE brand.

### What the pipe IS:
- A divider between stat columns (mimicking B|RE)
- A left-border accent on cards, testimonials, and list items
- A section header marker (pipe + label)
- A separator in inline lists (Tribeca | SoHo | Chelsea)
- Corner accents on CTA frames (animated draw-in)
- The literal character in the logo

### What the pipe is NOT:
- A horizontal rule replacement
- A random decoration scattered across the page
- An underline
- A background element

### Pipe Specifications:
- **Width:** 2-3px (never thicker)
- **Color:** `hsl(0, 100%, 45%)` -- always. No opacity variations.
- **Border radius:** `rounded-full` (pill-shaped ends)
- **Animation:** When used as border accent, it should "grow" into position (scaleY or height transition)

### Usage Patterns:
1. **Section header:** `[pipe] + uppercase label` -- appears before every section
2. **Stat divider:** Columns divided by red pipe borders
3. **Testimonial left border:** 2px red pipe running full height
4. **CTA frame corners:** Animated L-shaped pipe accents at top-left and bottom-right
5. **Marquee separator:** Red pipe between neighborhood names
6. **Inline text:** `Built on Trust | Strengthened by Expertise`

---

## 6. Photography Direction

### Mood
- Dark, moody, architectural. Think late-evening golden hour or blue hour.
- The city as protagonist -- steel, glass, stone, sky.
- Interior shots: luxury finishes, natural light, clean lines.
- Never stock-photo smiling agents with crossed arms.

### Subject Matter
- Manhattan skyline (the hero image)
- Architectural details -- facades, lobbies, crown moldings
- Empty luxury interiors (let the viewer project themselves)
- Night cityscapes with warm interior glow
- Aerial/drone perspectives of neighborhoods

### Treatment
- High contrast, slightly desaturated
- Warm shadows, cool highlights
- When overlaid: 70-80% dark overlay to maintain text legibility
- Noise/grain texture at 3-4% opacity for editorial feel

### The Hero Image
- The existing Manhattan skyline photo is the brand's signature image
- Used as parallax background in hero, or as editorial split image
- Always overlaid with dark gradient -- never shown bright/saturated

---

## 7. Spacing and Layout

### Grid
- 8pt base grid (all spacing values are multiples of 8)
- `executive-container`: max-width 1400px, 24px horizontal padding (16px mobile)
- Generous whitespace is mandatory. When in doubt, add more space.

### Section Spacing
- Between major sections: 96px (py-24) to 128px (py-32)
- Between section header and content: 64px (mb-16)
- Between cards in a grid: 32px (gap-8) to 48px (gap-12)

### Layout Principles
- Asymmetry creates tension and interest. Do not center everything.
- The hero is left-aligned. Content hugs the left, letting the right breathe.
- Use the pipe as a vertical rhythm device -- it creates visual columns.
- Mobile: single column, generous padding, stacked elements.
- Desktop: max 3-4 columns. Never more.

### Responsive Breakpoints
- Mobile: < 768px (single column, stacked)
- Tablet: 768-1024px (2 columns)
- Desktop: > 1024px (full layout, 2-4 columns)

---

## 8. Animation Principles

### Core Philosophy
Every animation must answer: "What does this help the user understand?"
If the answer is "nothing, it just looks cool" -- remove it.

### Approved Patterns
1. **Fade-up reveal** -- Elements enter from 30px below with opacity 0 to 1. Duration: 0.7s. Ease: [0.22, 1, 0.36, 1].
2. **Stagger children** -- Grid items enter sequentially with 0.12s delay between each.
3. **Parallax background** -- Hero image moves at 25-30% of scroll speed. Subtle.
4. **Animated counters** -- Numbers count up when entering viewport. Once only.
5. **Pipe draw-in** -- Pipe accents animate their height/width from 0. Duration: 0.6s.
6. **Marquee ticker** -- Neighborhood names scroll horizontally. Continuous, linear, 30-35s loop.
7. **Hover transitions** -- Border color, background opacity, transform translateY(-2px). Duration: 200-300ms.

### Forbidden Patterns
- Bounce animations
- Rotating elements
- Parallax on mobile (performance)
- Animations that repeat (except marquee)
- Entrance animations that delay content visibility by more than 1.5s

### Easing
- Default: `[0.22, 1, 0.36, 1]` (custom ease-out)
- Hover: `ease-out` or `200ms ease`
- Marquee: `linear`
- Never: `ease-in` alone (feels sluggish)

---

## 9. Tone of Voice

### Confident, Not Arrogant
- YES: "We decode value, forecast opportunity, and execute with precision."
- NO: "We are the best brokerage in NYC and everyone knows it."

### Specific, Not Vague
- YES: "$47M Midtown investment. Closed 45 days ahead of schedule."
- NO: "We close big deals fast."

### Institutional, Not Casual
- YES: "Institutional discipline applied to New York's most complex real estate."
- NO: "We crush it in NYC real estate!"

### Active Voice, Short Sentences
- YES: "We saved our clients $73K on average."
- NO: "An average of $73K was saved by our clients through our services."

### The Brand Statement
"We don't follow the market | We decode it."
This single sentence captures the entire brand. It uses the pipe. It is confident without being arrogant. It is specific about what Bravado does differently.

---

## 10. UI Wireframe -- V8 Section Flow

The ideal home page follows this emotional journey:
**Awe -> Trust -> Understanding -> Desire -> Action**

### Section 1: HERO (Awe)
- Full viewport height, dark parallax background (Manhattan skyline)
- Pipe + overline: "Est. 2018 -- New York City"
- Massive Bodoni Moda headline: "Built on Trust | Strengthened by Expertise"
- One paragraph of positioning copy
- Two CTAs: "View Properties" (primary/white) + "| Contact Us" (text link with pipe)
- Trust stats strip at bottom of hero: 15+ | $140M+ | 2,000+
- Scroll indicator

### Section 2: SOCIAL PROOF BAR (Trust)
- Thin strip below hero
- Pipe-separated trust signals: "2,000+ clients | 4.9/5 rating | $73K avg. savings"
- No icons. Just text and pipes. Clean.

### Section 3: FEATURED PROPERTIES (Desire)
- Pipe + label: "Portfolio"
- Headline: "Featured Properties" (with italic emphasis)
- PropertyGrid component: 6 featured listings
- "View All" link with pipe and arrow

### Section 4: VALUE PROPOSITION (Understanding)
- Pipe + label: "The Bravado Advantage"
- Three columns with pipe left-borders
- Off-Market Access | Data-Driven Pricing | Dedicated Team
- Each with concise description (2-3 sentences)

### Section 5: DEAL HIGHLIGHTS (Trust + Desire)
- Pipe + label: "Proof of Execution"
- Three deal cards with animated counters
- $47M | 150K SQFT | 94% -- each with context
- Pipe-divided layout (mimicking B|RE)

### Section 6: TESTIMONIALS (Trust)
- Pipe + label: "Client Voices"
- Three testimonials with pipe left-borders
- Specific numbers in quotes (not vague praise)
- Name + role only. No avatars. No stars. Let the words speak.

### Section 7: BRAND STATEMENT (Awe, redux)
- Full-width centered
- Massive Bodoni text: "We don't follow the market | We decode it."
- Pipe used as punctuation within the statement

### Section 8: NEIGHBORHOOD MARQUEE (Understanding)
- Continuous horizontal scroll
- Neighborhood names separated by red pipes
- Tribeca | SoHo | Chelsea | Midtown | ...

### Section 9: CTA (Action)
- Pipe-framed box with animated corner accents
- "Ready to make your move?"
- Two CTAs: "View Properties" + "Contact Us"
- Clean, direct, no clutter

---

## 11. Component Patterns

### Cards
- Background: neutral-900
- Border: 1px solid white/8%
- Hover: border transitions to red/30%, translateY(-2px)
- Pipe accent: 2px red left border that grows on hover
- No border-radius (sharp corners = premium)

### Buttons
- Primary: white background, neutral-950 text, uppercase tracking
- Secondary: transparent, neutral border, pipe accent on hover
- Never rounded. Sharp corners or no radius.
- Uppercase text, tracking-wider, 14px

### Section Headers
- Pattern: `[3px red pipe, h-6] + [uppercase label, tracking 0.2em, neutral-500]`
- Always left-aligned
- 64px margin-bottom before content

### Testimonials
- 2px red pipe left border, full height
- Italic quote text in neutral-300
- Name in white, role in neutral-600
- No quotation mark icons. Use real typographic quotes.

### Stats
- Bodoni Moda, large (5xl-6xl), font-light
- Red pipe dividers between columns
- Uppercase label below in neutral-500
- Animated counter on viewport entry

### CTA Frame
- Thin border (white/8%)
- Animated red pipe corner accents (top-left + bottom-right)
- Centered content
- Two-button layout (primary + secondary)

---

## 12. Performance Requirements

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Total page weight: < 500KB (excluding images)
- Images: lazy-loaded except hero
- Animations: 60fps, will-change on animated elements
- No layout shift from font loading (font-display: swap)
- Mobile: disable parallax, reduce animation complexity

---

*This brand guide is the single source of truth for all Bravado Real Estate digital experiences. Every design decision should trace back to a principle documented here.*
