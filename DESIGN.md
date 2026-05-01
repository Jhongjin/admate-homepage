# Design System: AdMate Homepage

**Project ID:** admate-homepage

## 1. Visual Theme & Atmosphere

AdMate Homepage uses a calm operational platform aesthetic with the clarity of a brand landing page. The page should feel trustworthy, structured, and quietly futuristic rather than promotional or decorative. It combines the discipline of an internal advertising operations console with the narrative flow of an AI Agent platform overview.

The atmosphere is:

- **Operationally calm:** Light gray workspace surfaces, white cards, thin dividers, and status-like badges communicate reliability.
- **Brand-forward but restrained:** The first viewport clearly introduces AdMate as the platform identity, while diagrams and lifecycle sections explain the product ecosystem.
- **Enterprise precise:** Information is dense enough for executives and media planners, but spacing remains generous and readable.
- **AI-native without spectacle:** Agent Core is shown as a connective intelligence layer, using structured diagrams and deep navy surfaces instead of heavy gradients or abstract decoration.

Avoid a flashy startup marketing mood. The design should read as an AI operations platform that is already close to real workflows.

## 2. Color Palette & Roles

- **Operational Canvas Gray (#F7F7F7):** Primary page background. Used to create a quiet console-like workspace.
- **Clean Surface White (#FFFFFF):** Main card, table, header, and content surfaces. Used for high readability.
- **Soft Section White (#FBFBFB):** Alternating section background. Used to separate long landing page chapters without visual heaviness.
- **Primary Ink Black (#0D0D0D):** Main text and primary buttons. Used for decisive hierarchy and Vercel-like precision.
- **Deep Agent Navy (#111827):** Agent Core and final CTA surfaces. Used for the platform engine and high-level strategic moments.
- **Secondary Graphite (#5E5E5E):** Supporting body copy and utility text. Used for long explanations.
- **Muted Operational Gray (#9A9A9A):** Eyebrows, timestamps, helper text, and secondary metadata.
- **Hairline Border (#E5E5E5):** Default border for cards, headers, dividers, tables, and badges.
- **AdMate Purple (#5E6AD2):** Primary AI/Agent accent. Used sparingly for Agent Core links, focus rings, and system highlights.
- **Compass Indigo (#4F63D8):** Product accent for AdMate Compass. Used on small icons, tags, and card highlights.
- **Sentinel Emerald (#177D4E):** Product accent for AdMate Sentinel. Used for validation, monitoring, and safety indicators.
- **Lens Violet (#7C3AED):** Product accent for AdMate Lens. Used for capture and visual proof surfaces.
- **Foresight Amber (#B45309):** Product accent for AdMate Foresight. Used for planning, forecast, and cost-aware moments.
- **Soft Purple Tint (#ECEDF9):** Low-emphasis Agent/Compass background.
- **Soft Green Tint (#EFFAF4):** Low-emphasis success/monitoring background.
- **Soft Violet Tint (#F3E8FF):** Low-emphasis capture background.
- **Soft Amber Tint (#FFF8EC):** Low-emphasis planning/cost background.

Color usage should be functional. Product colors should appear as small signals, not full-page themes.

## 3. Typography Rules

The interface uses **Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif**. Typography should feel like a polished product dashboard expanded into a brand page.

- **Hero brand name:** Large, direct, and weighty. Use 56-72px on desktop, with normal letter spacing.
- **Hero subtitle:** Strong but smaller than the brand name. Use 28-32px on desktop.
- **Section headings:** 24-32px, semibold, compact line height, no negative letter spacing.
- **Card titles:** 16-20px, semibold, highly readable.
- **Body copy:** 14-16px, relaxed 1.65-1.75 line height for Korean readability.
- **Metadata and badges:** 11-12px, semibold, concise.
- **Mono-style metrics:** Use a monospace fallback only for IDs, process labels, or numeric dashboards when needed.

Do not scale type with viewport width. Use responsive breakpoints and fixed type steps.

## 4. Component Stylings

### Buttons

Buttons are compact, rectangular, and operational.

- **Primary buttons:** Primary Ink Black (#0D0D0D) background with white text. Used for the main CTA.
- **Secondary buttons:** White or transparent surfaces with Hairline Border (#E5E5E5). Used for document links and secondary navigation.
- **Shape:** Subtly rounded corners, usually 6-8px. Avoid pill buttons for primary page actions.
- **Icons:** Use Lucide icons inside buttons when actions benefit from visual scanning. Icons should be 16px and quiet.

### Cards / Containers

Cards are clean product surfaces, not decorative blocks.

- **Background:** Clean Surface White (#FFFFFF).
- **Border:** Hairline Border (#E5E5E5).
- **Radius:** Subtly rounded corners, 8px by default.
- **Shadow:** Mostly flat. Use whisper-soft shadow only for high-level hero or CTA containers.
- **Padding:** 20-24px for regular cards; 32-48px for large strategic panels.

Do not nest cards inside cards unless a small internal status tile is necessary inside a diagram.

### Badges

Badges are used for status, product subtitles, section eyebrows, and phase labels.

- **Shape:** Pill-shaped for small metadata only.
- **Tone:** White or soft-tinted background with a thin border.
- **Text:** 11-12px semibold.
- **Product colors:** May appear in badges as subtle border or text accents.

### Navigation

The header is sticky and restrained.

- **Height:** 56px.
- **Background:** Operational Canvas Gray (#F7F7F7) at high opacity with blur.
- **Border:** Bottom Hairline Border (#E5E5E5).
- **Logo:** Small black square mark with an icon, followed by the AdMate wordmark.
- **Desktop navigation:** Compact text links using NavigationMenu-style spacing.
- **Mobile navigation:** Simple dropdown panel with white background and thin border.

### Tables

Tables should feel like operational summaries.

- **Header:** Muted gray background.
- **Rows:** Thin bottom borders.
- **Cells:** 14px text, generous vertical padding.
- **Badges:** Used for roadmap phase labels instead of heavy colored cells.

### Diagrams

Diagrams communicate system relationships and campaign flow.

- Use thin lines, small cards, and product-colored icon chips.
- Agent Core may use Deep Agent Navy (#111827) to indicate central intelligence.
- Avoid busy arrows, complex gradients, and decorative blobs.

## 5. Layout Principles

The page uses a single-column landing narrative with constrained inner width.

- **Max content width:** 1240px.
- **Section padding:** About 80px vertical on desktop, reduced on mobile.
- **Grid:** Product and impact sections use two or three-column grids on desktop, collapsing to one column on mobile.
- **Hero:** Two-column layout on desktop, stacked on mobile. The brand message should remain first.
- **Lifecycle:** Six-step horizontal flow on desktop, stacked sequential flow on mobile.
- **Alternating sections:** Use #F7F7F7 and #FBFBFB to provide chapter rhythm without heavy section cards.

Every section should answer a business question:

- What is AdMate?
- Why is it needed?
- What products exist?
- How do they connect in a campaign lifecycle?
- What does Agent Core do?
- What impact does this create?
- How is AI cost and evolution managed?

## 6. Depth & Elevation

Depth is intentionally minimal.

- Default surfaces are flat with hairline borders.
- Soft shadows are reserved for hero diagrams and final CTA panels.
- Deep navy panels create hierarchy through contrast rather than elevation.
- No glassmorphism, floating gradient orbs, or heavy bokeh effects.

The visual hierarchy should come from layout, spacing, typography, and semantic color use.

## 7. Do's and Don'ts

### Do

- Keep Korean business copy clear enough for both executives and media planners.
- Use AdMate Compass, AdMate Sentinel, AdMate Lens, AdMate Foresight, and AdMate Agent Core consistently.
- Treat Openclaw and Hermes as internal Agent Core engines, not standalone external products.
- Use Lucide icons for scanning and tool-like affordance.
- Use shadcn-style primitives for cards, buttons, badges, tabs, tooltips, navigation, and tables.
- Keep product colors as restrained accents.

### Don't

- Do not use `Sentinel beta` in public-facing copy.
- Do not use Guide, Capture Pro, or Planner as final product names.
- Do not invent ROI numbers or unverified efficiency claims.
- Do not show real advertiser, campaign, credential, token, or secret values.
- Do not make the homepage look like a pure internal admin console.
- Do not make the homepage look like an overanimated startup landing page.
- Do not overuse gradients, one-note purple palettes, or decorative blobs.

## 8. Responsive Behavior

- **Mobile first:** All sections must collapse into a single readable column.
- **Header:** Desktop nav becomes a compact mobile dropdown.
- **Hero diagram:** Stacks below the copy and must remain readable without horizontal scroll.
- **Product tabs:** Horizontal scrolling is acceptable for the tab list; card content stays within the viewport.
- **Lifecycle:** Horizontal process becomes a vertical step list.
- **Tables:** Roadmap table may scroll horizontally if needed, but text should remain legible.
- **Touch targets:** Buttons and navigation controls should be at least 40px tall where practical.

## 9. Agent Prompt Guide

When generating new AdMate homepage screens, use this prompt direction:

```text
Create a calm, enterprise-grade AI Agent platform page for AdMate.
Use a light operational canvas (#F7F7F7), white bordered cards (#FFFFFF / #E5E5E5), compact Inter typography, and restrained product accent colors.
The page should feel like Openclaw operational reliability expanded into a brand landing page.
Show system relationships through clean diagrams, lifecycle steps, cards, badges, tabs, and tables.
Avoid flashy startup gradients, decorative blobs, fake ROI metrics, or anything that makes AI feel like it replaces people.
```

Quick reference:

- Background: #F7F7F7
- Card: #FFFFFF
- Border: #E5E5E5
- Text: #0D0D0D
- Muted text: #5E5E5E / #9A9A9A
- Agent Core: #111827 + #5E6AD2
- Compass: #4F63D8
- Sentinel: #177D4E
- Lens: #7C3AED
- Foresight: #B45309
