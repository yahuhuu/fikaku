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

## 10. Fikaku Application Shell Layout

> Added after manual exploration of `https://antested.netlify.app/`. Use this as the default dashboard shell direction for Fikaku going forward.

### Shell Structure

The dashboard shell should be a fixed/near-fixed application frame with three main regions:

```txt
viewport
├── sidebar/menu       fixed left
├── header             top, right of sidebar
└── content            below header, right of sidebar
```

Use a consistent shell gap of `16px` between major regions:

```css
--shell-gap: 16px;
--sidebar-expanded: 272px;
--sidebar-collapsed: 96px;
--header-height: 64px;
--shell-radius: 16px;
```

### Sidebar/Menu Geometry

Expanded sidebar:

```css
.sidebar {
  position: fixed;
  inset-block: 0;
  left: 0;
  width: 272px;
  padding: 32px;
  border-radius: 0 16px 16px 0;
  background: #0d0c27;
  transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1), padding 220ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

Collapsed sidebar:

```css
.sidebar[data-collapsed="true"] {
  width: 96px;
  padding-inline: 24px;
}
```

Important sidebar rules:

- Sidebar touches the left, top, and bottom viewport edges.
- Sidebar has no outer left margin.
- Sidebar right side should be rounded (`16px`) to create a panel feel.
- Expanded internal padding is `32px`.
- Navigation item width in expanded mode is `224px` (`272px - 64px padding`).
- Collapsed nav item width is `48px`, icon centered, text hidden.
- Settings link should be anchored at the bottom using `margin-top: auto`.

### Sidebar Header/Brand Row

Expanded brand row:

```txt
x: 32px from viewport left
 y: 32px from viewport top
height: 32px
logo: 32×32
brand text: 20–22px, bold
collapse button: 32×32, aligned right inside sidebar
```

Collapsed brand behavior:

- Show logo only.
- Hide brand text with opacity/width animation, not abrupt display jumps.
- Move the collapse button below the logo or keep it aligned in the collapsed column.

Recommended animation:

```css
.sidebar-label {
  overflow: hidden;
  white-space: nowrap;
  opacity: 1;
  transform: translateX(0);
  transition: opacity 180ms ease, transform 180ms ease, width 220ms cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar[data-collapsed="true"] .sidebar-label {
  width: 0;
  opacity: 0;
  transform: translateX(-8px);
}
```

### Sidebar Navigation

From the reference site:

```txt
MENU label top: around 88px from viewport top
first nav item top: around 112px
nav item height: 44px
nav item gap: 4px
nav item radius: 12px
```

Fikaku should use:

```css
.nav-section {
  margin-top: 40px;
}

.nav-label {
  font-size: 11px;
  letter-spacing: 0.18em;
  color: #94a3b8;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.nav-item {
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-inline: 16px;
  color: #94a3b8;
  transition: background-color 200ms ease, color 200ms ease, padding 220ms cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item[data-active="true"] {
  background: color-mix(in oklab, #53b6e0 10%, transparent);
  color: #53b6e0;
}

.sidebar[data-collapsed="true"] .nav-item {
  width: 48px;
  justify-content: center;
  padding-inline: 0;
}
```

### Header Geometry

Expanded sidebar mode:

```css
.header-shell {
  position: sticky;
  top: 16px;
  margin-left: calc(272px + 16px);
  margin-right: 16px;
  height: 64px;
  border-radius: 16px;
  background: #0d0c27;
}
```

Collapsed sidebar mode:

```css
.shell[data-sidebar="collapsed"] .header-shell {
  margin-left: calc(96px + 16px);
}
```

Important header rules:

- Header top offset is `16px` from viewport top.
- Header right offset is `16px` from viewport right.
- Header starts `16px` after sidebar right edge.
- Header height is `64px`.
- Header border radius is `16px`.
- Header content aligns to the right.
- Icon buttons are `32×32`, circular, and spaced by `16px`.
- Profile block sits at the far right and uses a `32px` avatar.

### Main Content Geometry

Expanded sidebar mode:

```css
.content-shell {
  margin-left: calc(272px + 16px);
  margin-right: 16px;
  margin-top: 16px;
  padding-right: 8px;
}
```

Collapsed sidebar mode:

```css
.shell[data-sidebar="collapsed"] .content-shell {
  margin-left: calc(96px + 16px);
}
```

Important content rules:

- Content starts below header: header top `16px` + height `64px` + gap `16px` = first content top around `96px`.
- Content left aligns with header left.
- Content width expands smoothly when sidebar collapses.
- Content should scroll independently if needed, but shell spacing must remain stable.

### Sidebar Collapse Interaction

Behavior must match the reference style:

- Collapse button lives in the sidebar near the top.
- Expanded width: `272px`.
- Collapsed width: `96px`.
- Header and content move horizontally with the sidebar state.
- Use smooth transition for sidebar width, header margin, content margin, nav text opacity, and nav item alignment.
- Avoid instant `display: none` for labels during animation. Prefer `opacity`, `width`, `transform`, and `overflow: hidden`.
- Store sidebar state in React state; optionally persist it in `localStorage`.

Recommended React state shape:

```tsx
const [collapsed, setCollapsed] = useState(false);

return (
  <div data-sidebar={collapsed ? "collapsed" : "expanded"}>
    <aside data-collapsed={collapsed}>
      <button aria-label="Toggle sidebar" onClick={() => setCollapsed((value) => !value)} />
    </aside>
    <header />
    <main />
  </div>
);
```

### Fikaku Adaptation

The reference site uses a dark shell. Fikaku's global brand is light/white, but for dashboard shell layout we should borrow the structure and motion:

- Keep Fikaku content/cards light unless explicitly moving to dark dashboard.
- Sidebar/header may use either:
  - dark panel `#0d0c27` for closer reference fidelity, or
  - white panel with the same geometry if preserving light Fikaku style.
- The most important requirement is geometry: sidebar has `16px` inset from left/top/bottom, header floats with top/right gaps, and content aligns with header after a `16px` gap.
- Animation behavior should match the reference regardless of light/dark color choice.

### Implementation Checklist for Fikaku Sidebar/Header

- [ ] Use a client `DashboardShell` component for collapse state.
- [ ] Sidebar expanded width `272px`, collapsed width `96px`.
- [ ] Sidebar padding `32px` expanded, `24px` collapsed.
- [ ] Header top/right gap `16px`.
- [ ] Header/content left offset = sidebar width + `16px`.
- [ ] Content top begins around `96px` from viewport top.
- [ ] Nav items are `44px` high, `12px` radius.
- [ ] Nav labels animate away smoothly on collapse.
- [ ] Header/content margins transition using the same easing as sidebar.
- [ ] Settings link anchored to bottom.

## 11. Dark & Light Mode

Fikaku supports two explicit theme modes: `dark` and `light`.

### Storage and DOM Contract

Use localStorage key:

```txt
fikaku-theme
```

Supported values:

```txt
dark
light
```

Apply the theme to the root element:

```html
<html data-theme="dark">
<html data-theme="light">
```

Default fallback is `dark`, because the dashboard shell is inspired by the dark `antested.netlify.app` layout.

### Theme Tokens

The app shell must read these CSS variables instead of hardcoded shell colors:

```css
--shell-bg
--shell-panel
--shell-panel-strong
--shell-text
--shell-muted
--shell-border
--shell-hover
--shell-card-shadow
--shell-overlay
```

Theme toggle button:

- Lives in the header action group.
- Uses `Sun` icon when current theme is dark, meaning “switch to light”.
- Uses `Moon` icon when current theme is light, meaning “switch to dark”.
- Persists the selected theme to `localStorage`.
- Updates `document.documentElement.dataset.theme` immediately.

### Implementation Rules

- Avoid theme-specific duplicated JSX.
- Prefer CSS variables and Tailwind arbitrary values like `bg-[var(--shell-panel)]`.
- Keep transition smooth: `background-color`, `color`, and `border-color` should animate around `180ms–200ms`.
- Avoid theme flash by injecting a small root script in `app/layout.tsx` before rendering children.
- Legacy hardcoded classes such as `bg-white`, `text-[#000000]`, `border-[#e5e5e5]`, and `bg-[#e5fbff]` should be overridden in dark mode until components are fully tokenized.

## 12. Mobile UX Polish

Mobile layout should feel like a first-class workspace, not only a scaled desktop shell.

### Mobile Shell Rules

- Header remains floating with 16px outer spacing.
- Header shows current section title using route-derived labels.
- Mobile sidebar is fully hidden; primary mobile movement uses bottom navigation.
- Header is fixed on mobile so the current section remains visible while scrolling.
- Sidebar uses a 16px inset from left/top/bottom on desktop, matching the floating header spacing.
- Header/content left offset should account for sidebar width plus the 16px sidebar inset and 16px gap (`sidebarWidth + 32px`).
- Content bottom padding must leave space for mobile bottom navigation.

### Family Feature Decisions

- Users may belong to multiple families.
- Family owners can add members by registered email only.
- Family `transactionMode` options:
  - `AUTO_FAMILY`: if it is the user's only family, new transactions automatically enter that family; when multiple families require family transactions, user picks the target family.
  - `ALLOW_PERSONAL`: transaction form may include a Personal option.
- Transaction ownership remains the creator `userId`; family visibility is tracked by nullable `familyId`.
- Family report uses `familyId`; personal report uses the current user's transactions.
- Family members may edit other family transactions; updates store `editedById` and `editedAt`.
- Delete policy: creator can delete their own family transaction; family owner can delete any transaction in that family.
- Family owner can delete a family; existing transactions are detached from that family report.
- Family page separates settings, add-member form, and danger-zone delete action.
- Transaction amount inputs use a client-side Rupiah mask (`Rp. 1.000.000`) while submitting plain numeric values.

### Mobile Bottom Navigation

Use a fixed bottom navigation on mobile only:

```txt
Home
Transaksi
Wallet
Family
Reports
Settings
```

Rules:

- 6-column layout.
- Minimum touch target around 48px.
- Active item uses `#53b6e0` accent.
- Hidden on `md` and larger screens.
- Main content uses extra bottom padding (`pb-28`) so bottom nav does not cover forms/tables.

### Mobile Charts

- Use smaller card padding on mobile (`p-4`, `sm:p-6`).
- Chart height should be around `h-64` on mobile, `h-72` on larger screens.
- Axis labels should use smaller font around `10px`.
- Avoid horizontal overflow; root/body should hide accidental x-overflow.
