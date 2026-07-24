# Design System Inspired by My Google AI Studio App

> Auto-extracted from `https://antested.netlify.app/` on 2026-07-24

## 1. Visual Theme & Atmosphere

Energetic and playful with bold colors and confident hierarchy.

**Key Characteristics:**
- Inter as the heading font
- ui-sans-serif as the body font for all running text
- Light/white background (#ffffff) as the primary canvas
- Primary accent `#53b6e0` used for CTAs and brand highlights
- 3 shadow level(s) detected — tinted shadows
- Rounded corners (16px+) creating a friendly, approachable feel
- Tags: light, rounded, colorful, compact, sans-serif

## 2. Color Palette & Roles

### Primary
- **Primary Accent** (`#53b6e0`) · `--color-primary`: Brand color, CTA backgrounds, link text, interactive highlights.
- **Secondary Accent** (`#facc15`) · `--color-secondary`: Secondary brand, hover states, complementary highlights.
- **Background** (`#ffffff`) · `--color-bg`: Page background, primary canvas.
- **Background Secondary** (`#e5fbff`) · `--color-bg-secondary`: Cards, surfaces, alternating sections.

### Text
- **Text Primary** (`#000000`) · `--color-text`: Headings and body text.
- **Text Secondary** (`#94a3b8`) · `--color-text-secondary`: Muted text, captions, placeholders.

### Borders & Surfaces
- **Border** (`#e5e5e5`) · `--color-border`: Dividers, outlines, input borders.

### Full Extracted Palette

| # | Hex | CSS Variable | Role | Area | Contrast |
|---|---|---|---|---|---|
| 1 | `#0d0c27` | `--palette-1` | section | large | text-light |
| 2 | `#e5fbff` | `--palette-2` | text-accent | medium | text-dark |
| 3 | `#111033` | `--palette-3` | button | medium | text-light |
| 4 | `#94a3b8` | `--palette-4` | text-accent | small | text-dark |
| 5 | `#01001a` | `--palette-5` | badge | small | text-light |
| 6 | `#53b6e0` | `--palette-6` | badge | small | text-dark |
| 7 | `#ffffff` | `--palette-7` | badge | small | text-dark |
| 8 | `#facc15` | `--palette-8` | text-accent | small | text-dark |
| 9 | `#fb923c` | `--palette-9` | text-accent | small | text-dark |
| 10 | `#ec4899` | `--palette-10` | text-accent | small | text-dark |
| 11 | `#a855f7` | `--palette-11` | text-accent | small | text-dark |

## 3. Typography Rules

- **Heading Font:** `Inter`, sans-serif
- **Body Font:** `ui-sans-serif`, sans-serif

### Type Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| H3 | ui-sans-serif | 16px | 600 | 24px | normal |
| H4 | ui-sans-serif | 14px | 600 | 20px | normal |
| Body | ui-sans-serif | 14px | 400 | 20px | normal |
| Small | ui-sans-serif | 14px | 500 | 20px | normal |

### Type Scale

| Token | Size | Suggested Usage |
|---|---|---|
| Display | `30px` | headings |
| H1 | `20px` | headings |
| H2 | `16px` | headings |
| H3 | `14px` | headings |
| H4 | `12px` | headings |
| Body L | `11px` | body / supporting text |
| Body | `10px` | body / supporting text |

## 4. Component Stylings

### Primary Button

```css
.btn-primary {
  background: #53b6e0;
  color: #ffffff;
  border-radius: 8px;
  padding: 0px 0px;
  font-size: 16px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

### Ghost Button

```css
.btn-ghost {
  background: transparent;
  color: #94a3b8;
  border-radius: 6px;
  padding: 6px 6px;
  font-size: 16px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

### Filled Button

```css
.btn-filled {
  background: transparent;
  color: #53b6e0;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
}
```

### Pill Button

```css
.btn-pill {
  background: #01001a;
  color: #94a3b8;
  border-radius: 33554400px;
  padding: 0px 0px;
  font-size: 16px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

### Ghost Button 2

```css
.btn-ghost-2 {
  background: transparent;
  color: #e5fbff;
  border-radius: 0px;
  padding: 0px 0px;
  font-size: 16px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

### Pill Button 2

```css
.btn-pill-2 {
  background: transparent;
  color: #e5fbff;
  border-radius: 33554400px;
  padding: 0px 0px;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid oklab(0.734034 -0.0723538 -0.0829208 / 0.2);
  cursor: pointer;
}
```

## 5. Layout Principles

- **Base spacing unit:** `16px` — use multiples (32px, 48px, 64px, etc.)

### Spacing Scale (extracted from real elements)

| Token | Value | Role |
|---|---|---|
| spacing-1 | `16px` | element |
| spacing-2 | `12px` | element |
| spacing-3 | `24px` | card |
| spacing-4 | `6px` | element |
| spacing-5 | `8px` | element |
| spacing-6 | `4px` | element |
| spacing-7 | `2px` | element |
| spacing-8 | `10px` | element |

### Border Radius Scale

| Token | Value | Element |
|---|---|---|
| radius-card | `16px` | card |
| radius-button | `12px` | button |
| radius-button | `6px` | button |
| radius-button | `8px` | button |

## 6. Depth & Elevation

| Level | Shadow | Usage |
|---|---|---|
| Low | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0...` | Cards, subtle elevation |
| Low | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0...` | Cards, subtle elevation |
| Mid | `rgba(0, 0, 0, 0.1) 0px 4px 6px -1px` | Dropdowns, popovers |


## 7. Do's and Don'ts

### Do
- Use `#ffffff` as the primary background color
- Use `Inter` for all headings and `ui-sans-serif` for body text
- Use `#53b6e0` as the single dominant accent/CTA color
- Maintain `16px` as the base spacing unit — all gaps should be multiples
- Use rounded corners (`16px`+) consistently for all interactive elements
- Embrace bold color combinations — playful energy is the point
- Apply the shadow system for elevation — use the extracted shadow values

### Don't
- Don't use colors outside the extracted palette without justification
- Don't substitute Inter/ui-sans-serif with generic alternatives
- Don't use irregular spacing — stick to 16px grid
- Don't use dark/black backgrounds — this is a light-themed design
- Don't use sharp corners — they feel hostile in this rounded design language
- Don't use oversized hero text — this brand uses restrained type
- Don't use pure black (#000000) for text — use `#000000` instead
- Don't add decorative elements not present in the original design — no badges, ribbons, banners, or ornaments unless the source site uses them
- Don't invent UI patterns the source site doesn't have — if the original has no NEW badge, don't add one just because a red is in the palette

## 8. Responsive Behavior

| Breakpoint | Width | Notes |
|---|---|---|
| Mobile | < 640px | Single column, stack sections, reduce font sizes ~80% |
| Tablet | 640–1024px | 2-column where appropriate, maintain spacing ratios |
| Desktop | 1024–1440px | Full layout as designed |
| Wide | > 1440px | Max-width container, center content |

- Touch targets: minimum 44×44px on mobile
- Maintain 16px base unit across breakpoints — only scale multipliers

## 9. Agent Prompt Guide

### Quick Color Reference

```
Background:  #ffffff
Text:        #000000
Accent:      #53b6e0
Secondary:   #facc15
Border:      #e5e5e5
```

### Example Prompts

1. "Build a hero section with a `#ffffff` background, `Inter` heading in `#000000`, and a `#53b6e0` CTA button with 8px radius."
2. "Create a pricing card using background `#e5fbff`, border `#e5e5e5`, `ui-sans-serif` for text, and 48px padding."
3. "Design a navigation bar — `#ffffff` background, `#000000` links, `#53b6e0` for active state."
4. "Build a feature grid with 3 columns, 48px gap, each card using the card component style."
5. "Create a footer with `#000000` background, `#ffffff` text, and 32px padding."

### Iteration Guide

1. Start with layout structure (sections, grid, spacing)
2. Apply colors from the palette — background first, then text, then accents
3. Set typography — font families, sizes from the type scale, weights
4. Add components — buttons, cards, inputs using the specs above
5. Apply border-radius consistently across all elements
6. Add shadows for depth — use the extracted shadow values, not defaults
7. Check responsive behavior — test mobile and tablet layouts
8. Final pass — verify all colors match, spacing is consistent, fonts are correct
