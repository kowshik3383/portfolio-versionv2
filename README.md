# Kowshik Valipireddy — Portfolio Homepage Architecture

> Production-ready engineering portfolio built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and the **Astryx Design System** (Meta Astryx & Matcha Theme).

---

## 1. Homepage Content & Section Flow

The homepage is composed of 10 modular sections engineered for speed, clarity, and narrative flow:

```
┌────────────────────────────────────────────────────────────┐
│ 01. Top Navigation Bar (Astryx Geometric Monogram & Pill)  │
├────────────────────────────────────────────────────────────┤
│ 02. Hero Banner (Start anywhere. Change anything. Ship)    │
├────────────────────────────────────────────────────────────┤
│ 03. Astryx 4-Card Bento Features (Themes, 170+ Comps, MCP) │
├────────────────────────────────────────────────────────────┤
│ 04. Astryx Foundations (Speed, Reliability, Ready for Next)│
├────────────────────────────────────────────────────────────┤
│ 05. About Me & First-Principles Focal Point                │
├────────────────────────────────────────────────────────────┤
│ 06. Interactive KowshikTerminal CLI Engine                 │
├────────────────────────────────────────────────────────────┤
│ 07. Technical Toolchain (Mobile, Web, Backend, Database)   │
├────────────────────────────────────────────────────────────┤
│ 08. Engineering Track Record (Milestone Timeline)          │
├────────────────────────────────────────────────────────────┤
│ 09. Selected Projects (Native Mobile & High-Load Web Apps) │
├────────────────────────────────────────────────────────────┤
│ 10. Technical Articles & Research (Stay in the Know)       │
├────────────────────────────────────────────────────────────┤
│ 11. Astryx Discovery CTA Banner                            │
├────────────────────────────────────────────────────────────┤
│ 12. Astryx Multi-Column Footer (Sitemap, IST Clock, Links) │
└────────────────────────────────────────────────────────────┘
```

### Section Breakdown & Content Blueprint

#### 01. Astryx Top Navigation (`portfolio/components/Navbar.tsx`)
* **Brand Monogram**: Astryx geometric SVG mark + `KOWSHIK.` wordmark + `Systems Engineer` role label.
* **Navigation Links**: Pill-shaped center cluster: `About`, `Pillars`, `Stack`, `Experience`, `Projects`, `Terminal`, `Blog`.
* **Theme Status**: Live `Matcha theme` pill badge with an emerald pulse dot.
* **Actions**: One-click GitHub link and primary `Get started` pill button with smooth hover translation.
* **Mobile Drawer**: Responsive backdrop blur drawer with categorical site map links.

#### 02. Hero Banner (`portfolio/app/_components/Banner.tsx`)
* **Status Kicker**: `"Matcha theme · Currently in Beta · Built on React 19+ and Next.js 15"` with pulse indicator.
* **Master Headline**:
  * Line 1: `Start anywhere. Change anything.`
  * Line 2: `Ship faster.` (Astryx Royal Blue accent)
* **Elevator Pitch**: Concise statement framing Kowshik's production expertise across React Native, Next.js 15, and autonomous agent architectures.
* **Action CTAs**:
  * Primary: `Get started` (Astryx Royal Blue pill with diagonal arrow)
  * Secondary: `Browse components` (White outline pill with right arrow)
* **Live Telemetry Bar**: Pills for `Latency < 16ms`, `120 FPS Worklets`, `Agent-Ready MCP`, `170+ Components`.
* **Perimeter Spray Cards**: 8 achievement and architecture cards on the left/right flanks:
  * Left: Figma to Code Plugin (1.5k+ Installs), React Native 120 FPS Native, 20k+ App Users Driven, React 19 Server Actions.
  * Right: 1,500+ Paid Users Onboarded, PostgreSQL p95 Latency < 25ms, 100% Core Web Vitals, End-to-End Type Safety.
* **GSAP Convergence Animation**: On scroll, perimeter cards calculate real-time vector coordinates and converge directly into Kowshik's photo in the About section.

#### 03. Astryx 4-Card Bento Features (`portfolio/app/_components/AstryxBentoFeatures.tsx`)
Directly implements the Astryx system templates:
1. **Themes that fit your brand (Span 7)**: Live interactive theme switcher enabling real-time preview of `Matcha` (`#0D8626`), `Astryx Blue` (`#0064E0`), `Cyan Slate` (`#089DD0`), and `Warm Coral` (`#EB6E00`) with dynamic token chip feedback.
2. **Aa · Over 170 components (Span 5)**: Interactive micro-component preview containing an operational toggle switch, click-to-scrub progress bar (`85%`), and status chips.
3. **A design system that your agent can use (Span 5)**: Embedded terminal container showcasing the Model Context Protocol (MCP) CLI toolchain with one-click command copying (`npx astryx-mcp scaffold --template=mobile-next`).
4. **Ready to ship templates (Span 7)**: 3-column architectural blueprint cards: `01 · Mobile` (React Native / Expo), `02 · Full Stack` (Next.js 15 Platform), and `03 · AI Agent` (MCP Tool Pipeline).

#### 04. Astryx Foundations (`portfolio/app/_components/AstryxFoundations.tsx`)
* **Impact Metric**: *"Powers over 500,000+ users across web & mobile"*.
* **Three Foundation Pillars**:
  1. **Design for speed**: Foundations you can trust, speed you can feel (Sub-second LCP, 120 FPS native gesture worklets).
  2. **Built by the people who use it**: Battle-tested production feedback loop and strict type invariants.
  3. **Ready for what's next**: Autonomous agent toolchains, MCP servers, and AI-augmented developer workflows.

#### 05. About Me & First-Principles Statement (`portfolio/app/_components/AboutMe.tsx`)
* **Author Photo Convergence Target**: Concentric precision hairline rings (`border-[#0064E0]/35` and `border-[#E8E3DA]`) with continuous counter-rotation.
* **Architectural Statement**: *"Governed by verifiable latency, frame budgets, & deterministic state invariants."*

#### 06. Personal CLI Terminal Bot (`portfolio/app/_components/KowshikTerminal.tsx`)
* Real-time interactive zsh-style terminal loaded with profile data, project metrics, resume downloads, and interactive commands (`apps`, `experience`, `skills`, `notice`, `sudo hire-me`).

#### 07. Technical Toolchain (`portfolio/app/_components/Skills.tsx`)
* 6 rounded-3xl cards categorized into Mobile, Frontend, Backend, Database, Cloud/Deployment, and DevOps. Each technology features an SVG logo and interactive hover feedback.

#### 08. Engineering Track Record (`portfolio/app/_components/Experiences.tsx`)
* Chronological timeline featuring company roles, duration badges, and bold highlight bullet points formatted with markdown parsing.

#### 09. Selected Production Work (`portfolio/app/_components/ProjectList.tsx` & `Project.tsx`)
* High-impact project list with mobile/web badges, technology tags, live product links, and case study routes.

#### 10. Stay in the Know (`portfolio/app/_components/LatestBlogs.tsx` & `portfolio/app/blog`)
* Technical research articles matching Astryx's article rhythm: category badge, author name, publication date, reading time (`6 min read`), and read arrow link.

#### 11. Astryx Discovery CTA Banner (`portfolio/app/_components/AstryxDiscoveryBanner.tsx`)
* Large rounded-3xl container with radial aurora glows: *"Discover the full engineering system — Browse 170+ components, explore production-ready templates, and tune themes to match your brand."*

#### 12. Astryx Multi-Column Footer (`portfolio/components/Footer.tsx`)
* 4-column structured sitemap (`Architecture`, `Production`, `Connect`), live IST clock (`Asia/Kolkata`), one-click email copy button with feedback toast, and legal copyright notices.

---

## 2. Design Tokens Specification

The design tokens are centralized in [`tokens.css`](file:///C:/Users/saipr/portfolio-versionv2/portfolio/tokens.css) and wired into Tailwind CSS via [`globals.css`](file:///C:/Users/saipr/portfolio-versionv2/portfolio/app/globals.css) and [`tailwind.config.ts`](file:///C:/Users/saipr/portfolio-versionv2/portfolio/tailwind.config.ts).

### 2.1 Color Palette Tokens

| Token Name | Value | Usage |
| :--- | :--- | :--- |
| `--color-brand` | `#0064E0` | Astryx Royal Blue primary accent, active indicators, brand monogram |
| `--color-brand-hover` | `#0052B3` | Hover state for primary buttons and interactive links |
| `--color-brand-subtle` | `#EBF4FF` | Subtle tint backgrounds for blue badges and chips |
| `--color-matcha` | `#0D8626` | Matcha theme green accent, availability pulse, success state |
| `--color-matcha-hover` | `#0B7320` | Hover state for secondary actions |
| `--color-matcha-subtle` | `#EAF7EE` | Tint background for Matcha pill badges |
| `--color-paper` | `#FAF8F5` | Primary canvas / page background (warm alabaster) |
| `--color-paper-light` | `#F4EFEA` | Secondary container / panel fill |
| `--color-card` | `#FFFFFF` | Card surface background with 100% opacity |
| `--color-card-subtle` | `#F8FAFC` | Sub-card / nested component sandbox fill |
| `--color-ink` | `#0A1317` | Deep carbon primary text (high-contrast readability) |
| `--color-ink-muted` | `#4E606F` | Neutral slate secondary text for body paragraphs and captions |
| `--color-ink-faint` | `#8A94A0` | Low-emphasis metadata, dividers, and disabled labels |
| `--color-border` | `#E8E3DA` | Primary hairline border (1px solid) |
| `--color-border-subtle`| `#F0ECE4` | Inner dividers and sub-card borders |
| `--color-border-accent`| `rgba(0, 100, 224, 0.25)` | Card hover outline and focus ring |
| `--color-warning` | `#E2A400` | Warning badges and amber tags |
| `--color-error` | `#E3193B` | Destructive actions and error status |

### 2.2 Ambient Aurora Gradient Tokens

```css
:root {
  --x---aurora-left: rgba(0, 100, 224, 0.08);   /* Astryx Blue */
  --x---aurora-center: rgba(13, 134, 38, 0.05); /* Matcha Green */
  --x---aurora-right: rgba(226, 164, 0, 0.05);  /* Warm Amber */
}

/* Aurora Utility */
.astryx-aurora {
  background-image:
    radial-gradient(at 15% 15%, rgba(0, 100, 224, 0.08) 0px, transparent 55%),
    radial-gradient(at 85% 20%, rgba(13, 134, 38, 0.06) 0px, transparent 50%),
    radial-gradient(at 50% 80%, rgba(226, 164, 0, 0.04) 0px, transparent 55%);
}
```

### 2.3 Typography Hierarchy

| Level | Font Family | Size | Weight | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Outfit | `48px` - `76px` (`3rem - 4.75rem`) | 800 (Extrabold) | `1.08` | `-0.035em` |
| **Section Head 1** | Outfit | `32px` - `48px` (`2rem - 3rem`) | 800 (Extrabold) | `1.12` | `-0.03em` |
| **Section Head 2** | Outfit | `24px` - `32px` (`1.5rem - 2rem`) | 700 (Bold) | `1.2` | `-0.025em` |
| **Card Title** | Outfit | `18px` - `24px` (`1.125rem - 1.5rem`)| 700 (Bold) | `1.3` | `-0.02em` |
| **Body Large** | DM Sans | `16px` - `18px` (`1rem - 1.125rem`) | 400 (Normal) | `1.6` | `0` |
| **Body Standard** | DM Sans | `14px` - `15px` (`0.875rem - 0.9375rem`)| 400 / 500 | `1.5` | `0` |
| **Mono Badges** | JetBrains Mono| `11px` - `12px` (`0.6875rem - 0.75rem`)| 500 / 600 | `1.4` | `+0.05em` |
| **Code Snippets** | JetBrains Mono| `12px` - `13px` | 400 | `1.5` | `0` |

---

## 3. Spacing & Layout Architecture

### 3.1 Spacing Scale (4-Point System)

```
Token          Value    Tailwind Equivalent
--spacing-0    0px      p-0, m-0, gap-0
--spacing-1    4px      p-1, m-1, gap-1
--spacing-2    8px      p-2, m-2, gap-2
--spacing-3    12px     p-3, m-3, gap-3
--spacing-4    16px     p-4, m-4, gap-4
--spacing-5    20px     p-5, m-5, gap-5
--spacing-6    24px     p-6, m-6, gap-6
--spacing-7    28px     p-7, m-7, gap-7
--spacing-8    32px     p-8, m-8, gap-8
--spacing-10   40px     p-10, m-10, gap-10
--spacing-12   48px     p-12, m-12, gap-12
--spacing-16   64px     p-16, m-16, gap-16
```

### 3.2 Container Widths & Grids

* **Primary Content Max Width**: `max-w-6xl` (`1152px`) with horizontal padding `px-4 sm:px-6 lg:px-8`
* **Text / Lead Pitch Max Width**: `max-w-2xl` (`672px`) to `max-w-3xl` (`768px`)
* **Section Padding Vertical**:
  * Standard section: `py-20 sm:py-28` (`80px` mobile, `112px` desktop)
  * Discovery banner: `py-12 sm:py-16` (`48px` mobile, `64px` desktop)
  * Footer: `pt-16 pb-12 sm:pt-20 sm:pb-16` (`64px - 80px`)
* **Grid Gaps**: `gap-6 lg:gap-8` (`24px` mobile, `32px` desktop) across Bento and Card clusters

### 3.3 Radii & Elevation Matrix

```css
:root {
  /* Corner Radii */
  --radius-inner: 4px;       /* Micro tags, inner indicators */
  --radius-element: 8px;     /* Buttons, input controls, small chips */
  --radius-container: 16px;  /* Bento cards, project cards */
  --radius-page: 24px;       /* Major feature panels, rounded-3xl */
  --radius-full: 9999px;     /* Pill buttons, theme tags, avatars */

  /* Elevation Shadows */
  --shadow-low: 0px 1px 2px rgba(10, 19, 23, 0.04), 0px 2px 6px rgba(10, 19, 23, 0.02);
  --shadow-med: 0px 2px 4px rgba(10, 19, 23, 0.05), 0px 8px 18px rgba(10, 19, 23, 0.04);
  --shadow-high: 0px 4px 8px rgba(10, 19, 23, 0.06), 0px 16px 36px rgba(10, 19, 23, 0.08);
}
```

### 3.4 Responsive Breakpoint System

* **Mobile Small (`< 480px`)**: Single-column vertical flow, spray cards suppressed for clean focus, sticky top navigation retracts into slide-out drawer, font sizes scale down proportionately (`text-4xl`).
* **Tablet (`640px - 1023px`)**: 2-column bento grids, full terminal accessibility, mobile nav drawer.
* **Desktop (`1024px+`)**: Full 12-column Bento layouts, perimeter telemetry cards active with live GSAP convergence, full top navigation bar with Matcha theme pill, floating dock active upon reaching principles section.

---

## 4. Key Files & Structure

```
portfolio/
├── app/
│   ├── _components/
│   │   ├── AstryxBentoFeatures.tsx   # 4-Card Bento Grid (Theme switcher, sandbox, MCP)
│   │   ├── AstryxDiscoveryBanner.tsx # Bottom full-system CTA banner
│   │   ├── AstryxFoundations.tsx     # 3-Pillar speed, reliability & scale section
│   │   ├── Banner.tsx                # Hero section with Astryx headline & telemetry
│   │   ├── AboutMe.tsx               # First-principles statement & focal convergence
│   │   ├── KowshikTerminal.tsx       # Interactive personal CLI terminal
│   │   ├── Skills.tsx                # Technical toolchain & framework grid
│   │   ├── Experiences.tsx           # Engineering track record timeline
│   │   ├── ProjectList.tsx           # Production projects container
│   │   ├── Project.tsx               # Individual project card with live links
│   │   └── LatestBlogs.tsx           # "Stay in the know" technical articles
│   ├── globals.css                   # Tailwind layers, Astryx Aurora, glass tokens
│   ├── layout.tsx                    # Next.js Root Layout with Outfit, DM Sans & Navbar
│   └── page.tsx                      # Main homepage assembly
├── components/
│   ├── Button.tsx                    # Astryx pill button with active scale micro-interactions
│   ├── SectionTitle.tsx              # Astryx section badge kicker + Outfit heading
│   ├── Navbar.tsx                    # Astryx top navigation with Matcha pill
│   ├── Footer.tsx                    # 4-column Astryx sitemap & IST clock
│   └── FloatingNavDock.tsx           # Floating desktop navigation dock
├── tokens.css                        # Complete Astryx Design System CSS tokens
└── tailwind.config.ts                # Extended theme colors, fonts, and spacing scale
```

---

## 5. Development Guidelines

* **Do not run `pnpm build`** unless explicitly requested by the project owner.
* For local development, run:
  ```bash
  cd portfolio && pnpm dev
  ```
* To check TypeScript types in-memory without emitting build artifacts:
  ```bash
  cd portfolio && pnpm exec tsc --noEmit
  ```
