# Design System Documentation

A comprehensive, visually distinctive design system built with CSS Modules and modern CSS features. This design system emphasizes accessibility, consistency, and memorable visual identity.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Using CSS Variables](#using-css-variables-in-components)
  - [Using TypeScript Tokens](#using-typescript-design-tokens)
- [Color System](#color-system)
- [Typography](#typography)
- [Spacing & Layout](#spacing--layout)
- [Components](#components)
- [Utilities](#utilities)
- [Dark Mode](#dark-mode)
- [Accessibility](#accessibility)
- [Examples](#examples)

## Overview

This design system provides a complete foundation for building professional, accessible web interfaces with a unique visual identity. It includes:

- **7 Color Palettes**: Primary (cyan-blue), Secondary (purple), Accent (amber-coral), plus semantic colors (success, warning, error, info)
- **Complete Typography Scale**: Responsive display text, headings, body text, captions, labels
- **Layout System**: Containers, sections, flexbox, and grid utilities
- **Component Library**: Cards, badges, links with multiple variants
- **Visual Effects**: Gradients, accents, hover effects, animations
- **Dark Mode**: Automatic color scheme adaptation with WCAG compliance

### Design Principles

1. **Visual Distinctiveness**: Unique three-color palette (cyan-blue, purple, amber-coral) with striking gradients
2. **Accessibility**: WCAG AA compliant colors, motion preferences respected, keyboard navigation
3. **Consistency**: Systematic spacing, typography, and component patterns
4. **Performance**: CSS-only effects, minimal JavaScript dependencies
5. **Responsiveness**: Mobile-first with fluid typography and layouts

## Getting Started

### Installation

Import the entire design system in your root layout:

```typescript
// app/layout.tsx or pages/_app.tsx
import '@/styles/index.css';
```

Or import globals and components individually for granular control:

```typescript
import '@/app/globals.css';
import '@/styles/components/card.css';
import '@/styles/components/badge.css';
import '@/styles/components/link.css';
```

### Using CSS Variables in Components

All design tokens are available as CSS custom properties:

```css
/* components/MyComponent/MyComponent.module.css */
.myComponent {
  color: var(--color-primary-600);
  padding: var(--spacing-4) var(--spacing-6);
  border-radius: var(--radius-md);
  font-size: var(--font-size-lg);
  transition: all var(--transition-normal);
}
```

### Using TypeScript Design Tokens

For programmatic access to design tokens in JavaScript/TypeScript (e.g., for charts, dynamic styling, or computations), import from `styles/tokens.ts`:

```typescript
// Import all tokens
import tokens from '@/styles/tokens';

// Or import specific categories
import { colors, spacing, typography } from '@/styles/tokens';

// Access color values
const primaryColor = colors.primary[600]; // '#0891b2'
const successColor = colors.success[500]; // '#10b981'

// Access spacing values
const cardPadding = spacing[6]; // '1.5rem'
const sectionSpacing = spacing[12]; // '3rem'

// Access typography values
const headingSize = typography.fontSize['4xl']; // '2.25rem'
const fontFamily = typography.fontFamily.sans;

// Access layout values
const breakpointMd = tokens.layout.breakpoints.md; // '768px'
const containerWidth = tokens.layout.containerMaxWidth.xl; // '1280px'
```

**Available Token Categories:**
- `colors` - All color palettes (primary, secondary, accent, semantic colors)
- `typography` - Font families, sizes, weights, line heights, letter spacing
- `spacing` - Consistent spacing scale (1-24)
- `layout` - Breakpoints, container widths, content widths
- `borderRadius` - Rounded corner values
- `transition` - Animation timing values
- `shadow` - Elevation shadows
- `zIndex` - Layering scale

**Use Cases:**
- **Charts & Data Visualization**: Use color tokens for consistent chart colors
- **Dynamic Theming**: Access tokens programmatically for theme generation
- **Canvas/WebGL**: Use design system values in canvas-based graphics
- **JavaScript Animations**: Reference spacing and timing values
- **Responsive Logic**: Use breakpoint values in JavaScript media queries

## Color System

### Brand Colors

The design system uses a distinctive three-palette color scheme:

#### Primary (Cyan-Blue)
**USE FOR**: Primary actions, links, brand elements, CTAs

- `--color-primary-50` to `--color-primary-900` (9 shades)
- Main brand color: `--color-primary-600` (#0891b2)
- Light backgrounds: Use 50-100
- Dark text: Use 600-900
- Hover states: Shift one shade darker

#### Secondary (Purple)
**USE FOR**: Secondary actions, accents, supporting UI elements

- `--color-secondary-50` to `--color-secondary-900`
- Main color: `--color-secondary-600` (#9333ea)
- Complementary to primary for visual interest

#### Accent (Amber-Coral)
**USE FOR**: Highlights, important notices, warm accents

- `--color-accent-50` to `--color-accent-900`
- Main color: `--color-accent-600` (#ea580c)
- Warm contrast to cool primary/secondary

### Semantic Colors

#### Success (Emerald Green)
**USE FOR**: Positive feedback, completed states, confirmations

- `--color-success-50` to `--color-success-900`
- Main: `--color-success-600` (#059669)

#### Warning (Amber)
**USE FOR**: Caution states, important notices, pending actions

- `--color-warning-50` to `--color-warning-900`
- Main: `--color-warning-600` (#d97706)

#### Error (Red)
**USE FOR**: Errors, destructive actions, critical alerts

- `--color-error-50` to `--color-error-900`
- Main: `--color-error-600` (#dc2626)

#### Info (Sky Blue)
**USE FOR**: Informational messages, tips, neutral notifications

- `--color-info-50` to `--color-info-900`
- Main: `--color-info-600` (#0284c7)

### Neutral Colors

- `--color-neutral-50` to `--color-neutral-900`
- Use for text, borders, backgrounds

### Surface Colors

- `--color-background`: Main background color
- `--color-foreground`: Main text color
- `--color-muted`: Secondary text color
- `--color-border`: Default border color
- `--color-border-hover`: Interactive border states

## Typography

### Type Scale

The typography system uses a fluid scale with responsive sizing:

```css
--font-size-xs: 0.75rem;    /* 12px - Fine print, captions */
--font-size-sm: 0.875rem;   /* 14px - Small UI text, labels */
--font-size-base: 1rem;     /* 16px - Body text */
--font-size-lg: 1.125rem;   /* 18px - Lead paragraphs */
--font-size-xl: 1.25rem;    /* 20px - Small headings */
--font-size-2xl: 1.5rem;    /* 24px - H4, H5 */
--font-size-3xl: 1.875rem;  /* 30px - H3 */
--font-size-4xl: 2.25rem;   /* 36px - H2 */
--font-size-5xl: 3rem;      /* 48px - H1 */
--font-size-6xl: 3.75rem;   /* 60px - Display */
--font-size-7xl: 4.5rem;    /* 72px - Large display */
--font-size-8xl: 6rem;      /* 96px - Hero */
--font-size-9xl: 8rem;      /* 128px - Extra large hero */
```

### Display Text (Fluid Typography)

For large, responsive headings:

```css
.display-2xl  /* clamp(6rem, 12vw, 8rem) - 96-128px */
.display-xl   /* clamp(4.5rem, 10vw, 6rem) - 72-96px */
.display-lg   /* clamp(3.75rem, 8vw, 4.5rem) - 60-72px */
.display-md   /* clamp(3rem, 6vw, 3.75rem) - 48-60px */
.display-sm   /* clamp(2.25rem, 5vw, 3rem) - 36-48px */
```

### Typography Utilities

```css
/* Text Alignment */
.text-left
.text-center
.text-right
.text-justify

/* Text Truncation */
.text-truncate          /* Single line with ellipsis */
.text-truncate-2        /* 2 lines with ellipsis */
.text-truncate-3        /* 3 lines with ellipsis */

/* Text Styles */
.lead                   /* Prominent intro text (18px) */
.text-uppercase
.text-lowercase
.text-capitalize

/* Gradient Text */
.text-gradient-primary
.text-gradient-secondary
.text-gradient-accent
.text-gradient-brand
```

### Letter Spacing

```css
--letter-spacing-tighter: -0.04em;  /* Extra large display text */
--letter-spacing-tight: -0.02em;    /* H1, H2 */
--letter-spacing-normal: -0.01em;   /* H3, H4 */
--letter-spacing-base: 0em;         /* Body text, H5, H6 */
--letter-spacing-wide: 0.01em;      /* Labels, UI text */
--letter-spacing-wider: 0.05em;     /* Uppercase text */
--letter-spacing-widest: 0.1em;     /* Overlines, all-caps */
```

## Spacing & Layout

### Spacing Scale

Consistent spacing based on 4px increments:

```css
--spacing-1: 0.25rem;   /* 4px - Tight */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px - Medium */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px - Large */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px - Extra Large */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */
```

**Usage Patterns:**
- **Tight (1-3)**: Icon spacing, dense UI, badges
- **Medium (4-6)**: Component padding, card spacing, buttons
- **Large (8-12)**: Section spacing, grid gaps, card margins
- **Extra Large (16-24)**: Page sections, hero spacing, major layout divisions

### Container Utilities

```css
.container              /* Responsive container with max-width and padding */
.container-sm           /* Small container (640px) */
.container-md           /* Medium container (768px) */
.container-lg           /* Large container (1024px) */
.container-xl           /* Extra large (1280px) */
.container-2xl          /* 2X large (1536px) */
.container-prose        /* Optimal reading width (65ch) */
.container-narrow       /* Narrow content (672px) */
.container-wide         /* Wide content (1200px) */
```

### Section Utilities

```css
.section                /* Responsive vertical padding (48px → 64px) */
.section-sm             /* Small section (32px → 48px) */
.section-lg             /* Large section (64px → 96px) */
.section-xl             /* Extra large (96px → 128px) */
```

### Layout Utilities

#### Flexbox

```css
/* Display */
.flex

/* Direction */
.flex-row
.flex-col
.flex-row-reverse
.flex-col-reverse

/* Wrapping */
.flex-wrap
.flex-nowrap

/* Justify */
.justify-start
.justify-center
.justify-between
.justify-around
.justify-evenly

/* Align */
.items-start
.items-center
.items-end
.items-baseline
.items-stretch

/* Quick centering */
.flex-center            /* Centers both axes */
```

#### Grid

```css
.grid                   /* Grid display */
.grid-cols-1            /* 1 column */
.grid-cols-2            /* 2 columns */
.grid-cols-3            /* 3 columns */
/* ... up to .grid-cols-12 */

/* Auto-responsive grids */
.grid-auto-fit          /* Auto-fit, min 250px */
.grid-auto-fill         /* Auto-fill, min 250px */

/* Responsive variants */
.sm\:grid-cols-2        /* 2 columns at small breakpoint */
.md\:grid-cols-3        /* 3 columns at medium breakpoint */
.lg\:grid-cols-4        /* 4 columns at large breakpoint */
```

#### Gap Utilities

```css
.gap-1 to .gap-12       /* Flex/grid gap using spacing scale */
```

### Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

## Components

### Card Component

Flexible containers for grouping related content.

#### Variants

```css
.card                   /* Base card */
.card-basic             /* Simple border and shadow */
.card-outlined          /* Emphasized border, transparent bg */
.card-elevated          /* Prominent shadow */
.card-interactive       /* Clickable with hover lift */
.card-gradient          /* Unique gradient border */
```

#### Structure

```css
.card-header            /* Title and subtitle area */
.card-title             /* Card heading */
.card-subtitle          /* Secondary heading */
.card-body              /* Main content area */
.card-footer            /* Actions and metadata */
.card-media             /* Image or video area */
```

#### Sizes

```css
.card-sm                /* Compact card */
.card-lg                /* Large card */
```

#### Layouts

```css
.card-horizontal        /* Side-by-side layout */
.card-compact           /* Reduced spacing */
```

#### Example

```html
<div class="card card-interactive">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
    <p class="card-subtitle">Card Subtitle</p>
  </div>
  <div class="card-body">
    <p>Card content goes here...</p>
  </div>
  <div class="card-footer">
    <button>Action</button>
  </div>
</div>
```

### Badge Component

Small inline labels for tags, status, and metadata.

#### Color Variants

```css
.badge-primary
.badge-secondary
.badge-accent
.badge-success
.badge-warning
.badge-error
.badge-info
.badge-neutral
```

#### Size Variants

```css
.badge-sm               /* Small (10px font) */
.badge                  /* Medium (12px font) - default */
.badge-lg               /* Large (14px font) */
```

#### Style Variants

```css
.badge-outlined         /* Transparent bg, colored border */
.badge-solid            /* Vibrant bg, white text, glow */
```

#### Shape Variants

```css
.badge-pill             /* Fully rounded */
.badge-dot              /* Small circular indicator */
```

#### Special Features

```css
.badge-interactive      /* Clickable with hover */
.badge-removable        /* With close button */
.badge-count            /* Notification count style */
.badge-positioned       /* For overlays on avatars/icons */
```

#### Example

```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success badge-outlined">Success</span>
<span class="badge badge-solid badge-error">Error</span>
<span class="badge badge-pill badge-accent">Pill Badge</span>
```

### Link Component

Text links with hover effects and semantic variants.

#### Base Styles

```css
.link                   /* Base link with gradient underline */
.link-inline            /* For inline text with underline */
.link-nav               /* Navigation with background highlight */
.link-subtle            /* Muted for secondary navigation */
.link-button            /* Button-style link */
```

#### Color Variants

```css
.link-primary
.link-secondary
.link-accent
.link-muted
```

#### Size Variants

```css
.link-sm                /* Small link */
.link-lg                /* Large link */
```

#### Special Features

```css
.link-external          /* External link with arrow (↗) */
.link-disabled          /* Disabled state */
.link-icon              /* Link with animated icon */
.link-badge             /* Link with notification badge */
.link-breadcrumb        /* Breadcrumb navigation */
.link-skip              /* Skip link for accessibility */
```

#### Groups

```css
.link-group             /* Horizontal link group */
.link-group-vertical    /* Vertical link group */
```

#### Example

```html
<a href="/about" class="link link-nav">About</a>
<a href="https://example.com" class="link link-external">External Site</a>
<a href="/contact" class="link link-button">Contact Us</a>
```

## Utilities

### Gradient Utilities

#### Background Gradients

```css
.gradient-primary       /* Cyan-blue gradient */
.gradient-secondary     /* Purple gradient */
.gradient-accent        /* Amber-coral gradient */
.gradient-brand         /* Multi-color brand gradient */
.gradient-vibrant       /* High-energy multi-stop */
.gradient-subtle        /* Low-contrast gradient */
.gradient-animated      /* Animated shifting gradient */
```

#### Text Gradients

```css
.text-gradient-primary
.text-gradient-secondary
.text-gradient-accent
.text-gradient-brand
.text-gradient-animated
```

#### Gradient Borders

```css
.gradient-border        /* Wrapper with gradient border */
.gradient-border-simple /* Simple border-image */
.gradient-border-bottom /* Bottom border divider */
```

### Accent Decorations

Visual elements that create unique identity:

```css
.accent-line            /* 4rem gradient line */
.accent-line-sm         /* Small line (2rem) */
.accent-line-lg         /* Large line (8rem) */
.accent-line-full       /* Full width line */

.accent-dot             /* 8px decorative dot */
.accent-dot-lg          /* 12px decorative dot */

.accent-corner          /* Corner decoration */
.accent-corner-tl       /* Top-left corner */
.accent-corner-tr       /* Top-right corner */
.accent-corner-bl       /* Bottom-left corner */
.accent-corner-br       /* Bottom-right corner */

.accent-glow            /* Multi-color glow */
.accent-glow-primary    /* Primary color glow */
.accent-glow-secondary  /* Secondary color glow */
.accent-glow-accent     /* Accent color glow */

.accent-pattern         /* Subtle radial pattern */
.accent-highlight       /* Text highlight with gradient */
```

### Interaction Utilities

#### Link Effects

```css
.link-underline         /* Animated underline (left-to-right) */
.link-underline-center  /* Underline from center */
.link-glow              /* Text glow on hover */
.link-arrow             /* Animated arrow (→) */
```

#### Card Effects

```css
.card-lift              /* Lift 8px on hover */
.card-scale             /* Subtle scale on hover */
.card-glow              /* Lift with colored glow */
.card-gradient-border   /* Reveal gradient border */
.card-tilt              /* 3D perspective tilt */
```

#### Interactive Elements

```css
.interactive-bounce     /* Bounce feedback on click */
.interactive-ripple     /* Material ripple effect */
.interactive-pulse      /* Gentle pulsing animation */
.interactive-shake      /* Shake for attention */
.interactive-smooth     /* Smooth transitions */
```

#### Focus States

```css
.focus-ring             /* Enhanced focus outline */
.focus-ring-glow        /* Focus ring with glow */
```

#### Image Effects

```css
.image-zoom             /* Scale on hover */
.image-color-reveal     /* Grayscale to color */
.image-brighten         /* Brightness increase */
```

#### Other Effects

```css
.icon-spin              /* Rotate icon on hover */
.skeleton               /* Shimmer loading */
.spinner                /* Rotating spinner */
```

## Dark Mode

The design system automatically adapts to the user's system color scheme preference.

### How It Works

Dark mode is implemented using the `prefers-color-scheme` media query:

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Color variables are automatically inverted */
  }
}
```

### Testing Dark Mode

- **macOS**: System Preferences → General → Appearance → Dark
- **Windows**: Settings → Personalization → Colors → Dark
- **Browser DevTools**: Toggle `prefers-color-scheme` in rendering panel

### Contrast Compliance

All text colors maintain WCAG AA minimum contrast ratios:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Background to foreground: >15:1 (exceeds AAA)

## Accessibility

The design system is built with accessibility as a core principle:

### Color Contrast

- All text colors meet WCAG AA standards (4.5:1 minimum for normal text)
- Large text (18px+) meets 3:1 minimum
- Interactive elements are clearly distinguishable

### Motion Preferences

All animations respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  /* Animations are disabled or simplified */
}
```

### Keyboard Navigation

- All interactive elements have visible focus states
- Focus rings are enhanced with color and glow effects
- Tab order follows logical content flow

### Screen Readers

- Semantic HTML encouraged
- Skip links provided (`.link-skip`)
- ARIA labels recommended for icon-only buttons

### Best Practices

1. **Use semantic HTML**: `<button>`, `<nav>`, `<main>`, `<article>`, etc.
2. **Provide alt text** for all images
3. **Use proper heading hierarchy**: h1 → h2 → h3, no skipping
4. **Test with keyboard navigation**: Ensure all features are accessible via keyboard
5. **Add ARIA labels** when visual labels aren't sufficient
6. **Check contrast** for custom color combinations
7. **Respect motion preferences**: Don't force animations
8. **Provide text alternatives** for icon-only UI elements

## Examples

### Hero Section

```html
<section class="section section-xl gradient-brand">
  <div class="container-narrow">
    <div class="accent-line"></div>
    <h1 class="display-xl text-gradient-brand">
      Welcome to Our Site
    </h1>
    <p class="lead" style="color: var(--color-foreground);">
      Building amazing experiences with modern design.
    </p>
    <a href="/get-started" class="link link-button">
      Get Started
    </a>
  </div>
</section>
```

### Card Grid

```html
<div class="container">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="card card-interactive">
      <div class="card-header">
        <h3 class="card-title">Feature One</h3>
      </div>
      <div class="card-body">
        <p>Description of the feature...</p>
      </div>
      <div class="card-footer">
        <a href="#" class="link link-primary">Learn More</a>
      </div>
    </div>
    <!-- More cards... -->
  </div>
</div>
```

### Badge Showcase

```html
<div class="flex flex-wrap gap-2">
  <span class="badge badge-primary">React</span>
  <span class="badge badge-secondary">TypeScript</span>
  <span class="badge badge-accent">Next.js</span>
  <span class="badge badge-success badge-outlined">Deployed</span>
</div>
```

### Navigation

```html
<nav>
  <ul class="link-group">
    <li><a href="/" class="link link-nav">Home</a></li>
    <li><a href="/about" class="link link-nav">About</a></li>
    <li><a href="/work" class="link link-nav">Work</a></li>
    <li><a href="/contact" class="link link-nav">Contact</a></li>
  </ul>
</nav>
```

### Interactive Card with Effects

```html
<div class="card card-elevated card-lift card-gradient-border">
  <div class="card-media">
    <img src="project.jpg" alt="Project screenshot" class="image-zoom">
  </div>
  <div class="card-header">
    <h3 class="card-title text-gradient-primary">Amazing Project</h3>
    <p class="card-subtitle">A brief description</p>
  </div>
  <div class="card-body">
    <div class="flex flex-wrap gap-2">
      <span class="badge badge-primary badge-sm">React</span>
      <span class="badge badge-secondary badge-sm">Node.js</span>
    </div>
  </div>
  <div class="card-footer">
    <a href="/project" class="link link-button">View Project</a>
    <a href="https://demo.com" class="link link-external link-sm">Live Demo</a>
  </div>
</div>
```

---

## Support & Contributions

For questions, issues, or contributions to this design system, please refer to the project's main documentation or contact the development team.

**File Structure:**
- `app/globals.css` - Core design system (variables, utilities, base styles)
- `styles/index.css` - Central import file
- `styles/components/` - Reusable component styles
- `styles/README.md` - This documentation

**Last Updated:** January 2026
