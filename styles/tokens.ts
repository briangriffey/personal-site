/**
 * Design System Tokens
 *
 * TypeScript constants for programmatic access to design tokens.
 * These values match the CSS variables defined in app/globals.css
 * and can be used in JavaScript/TypeScript for dynamic styling,
 * chart generation, or other programmatic use cases.
 *
 * USAGE:
 * import { colors, spacing, typography } from '@/styles/tokens';
 *
 * const primaryColor = colors.primary[500];
 * const cardPadding = spacing[6];
 * const headingSize = typography.fontSize['4xl'];
 */

/* ============================================
   COLOR TOKENS
   ============================================ */

/**
 * Color Palette Type
 * Represents a full color palette with shades from 50 to 900
 */
export type ColorPalette = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

/**
 * Semantic Color Type
 * Application-wide color roles that adapt in dark mode
 */
export type SemanticColors = {
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
};

/**
 * Primary Colors (Cyan-Blue)
 * Main brand color - vibrant, modern, tech-forward
 * USE FOR: Primary buttons, main links, brand elements, key CTAs
 */
export const primary: ColorPalette = {
  50: '#ecfeff',
  100: '#cffafe',
  200: '#a5f3fc',
  300: '#67e8f9',
  400: '#22d3ee',
  500: '#06b6d4',
  600: '#0891b2',
  700: '#0e7490',
  800: '#155e75',
  900: '#164e63',
} as const;

/**
 * Secondary Colors (Purple)
 * Complementary cool tone for accents and secondary actions
 * USE FOR: Secondary buttons, alternative links, complementary UI elements
 */
export const secondary: ColorPalette = {
  50: '#faf5ff',
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7',
  600: '#9333ea',
  700: '#7e22ce',
  800: '#6b21a8',
  900: '#581c87',
} as const;

/**
 * Accent Colors (Warm Amber-Coral)
 * Warm accent for visual interest, CTAs, and highlighting
 * USE FOR: Call-to-action buttons, highlights, important notices, warm accents
 */
export const accent: ColorPalette = {
  50: '#fff7ed',
  100: '#ffedd5',
  200: '#fed7aa',
  300: '#fdba74',
  400: '#fb923c',
  500: '#f97316',
  600: '#ea580c',
  700: '#c2410c',
  800: '#9a3412',
  900: '#7c2d12',
} as const;

/**
 * Success Colors (Emerald Green)
 * Semantic color for positive feedback, confirmations, and success states
 * USE FOR: Success messages, confirmation dialogs, positive status badges
 */
export const success: ColorPalette = {
  50: '#ecfdf5',
  100: '#d1fae5',
  200: '#a7f3d0',
  300: '#6ee7b7',
  400: '#34d399',
  500: '#10b981',
  600: '#059669',
  700: '#047857',
  800: '#065f46',
  900: '#064e3b',
} as const;

/**
 * Warning Colors (Amber)
 * Semantic color for warnings, caution states, and pending actions
 * USE FOR: Warning messages, caution alerts, pending status, save prompts
 */
export const warning: ColorPalette = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
} as const;

/**
 * Error Colors (Red)
 * Semantic color for errors, validation failures, and destructive actions
 * USE FOR: Error messages, validation errors, delete confirmations, failed states
 */
export const error: ColorPalette = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
} as const;

/**
 * Info Colors (Sky Blue)
 * Semantic color for informational messages, tips, and neutral notifications
 * USE FOR: Info messages, help text, tooltips, neutral notifications
 */
export const info: ColorPalette = {
  50: '#f0f9ff',
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',
  600: '#0284c7',
  700: '#0369a1',
  800: '#075985',
  900: '#0c4a6e',
} as const;

/**
 * Neutral Colors (Gray)
 * Grayscale palette for text, borders, and backgrounds
 */
export const neutral: ColorPalette = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
} as const;

/**
 * Semantic Colors
 * Application-wide color roles (referenced from other palettes)
 */
export const semantic: SemanticColors = {
  background: '#ffffff',
  foreground: neutral[900],
  muted: neutral[100],
  mutedForeground: neutral[600],
  border: neutral[200],
} as const;

/**
 * All color palettes combined
 */
export const colors = {
  primary,
  secondary,
  accent,
  success,
  warning,
  error,
  info,
  neutral,
  semantic,
} as const;

/* ============================================
   TYPOGRAPHY TOKENS
   ============================================ */

/**
 * Font Families
 */
export const fontFamily = {
  sans: "var(--font-inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif)",
  mono: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
} as const;

/**
 * Font Sizes
 * Consistent type scale for all text elements
 */
export const fontSize = {
  /** 12px - Captions, small labels */
  xs: '0.75rem',
  /** 14px - Secondary text, navigation */
  sm: '0.875rem',
  /** 16px - Body text (default) */
  base: '1rem',
  /** 18px - Lead paragraphs, large body */
  lg: '1.125rem',
  /** 20px - h5, large UI text */
  xl: '1.25rem',
  /** 24px - h4 */
  '2xl': '1.5rem',
  /** 30px - h3 */
  '3xl': '1.875rem',
  /** 36px - h2 */
  '4xl': '2.25rem',
  /** 48px - h1 */
  '5xl': '3rem',
  /** 60px - Large hero */
  '6xl': '3.75rem',
  /** 72px - Extra large hero */
  '7xl': '4.5rem',
  /** 96px - Display text */
  '8xl': '6rem',
  /** 128px - Massive display text */
  '9xl': '8rem',
} as const;

/**
 * Responsive Font Sizes (Fluid Typography)
 * Uses CSS clamp() for viewport-based scaling
 */
export const fontSizeDisplay = {
  /** 36px - 48px */
  sm: 'clamp(2.25rem, 5vw, 3rem)',
  /** 48px - 60px */
  md: 'clamp(3rem, 6vw, 3.75rem)',
  /** 60px - 72px */
  lg: 'clamp(3.75rem, 8vw, 4.5rem)',
  /** 72px - 96px */
  xl: 'clamp(4.5rem, 10vw, 6rem)',
  /** 96px - 128px */
  '2xl': 'clamp(6rem, 12vw, 8rem)',
} as const;

/**
 * Specialty Text Sizes
 */
export const fontSizeSpecialty = {
  /** 12px - Small explanatory text */
  caption: '0.75rem',
  /** 14px - Form labels, small headings */
  label: '0.875rem',
  /** 12px - Uppercase text above headings */
  overline: '0.75rem',
} as const;

/**
 * Font Weights
 */
export const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

/**
 * Line Heights
 */
export const lineHeight = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const;

/**
 * Letter Spacing (Tracking)
 * Tighter tracking for headings, normal to loose for body text
 */
export const letterSpacing = {
  /** Very tight - for extra large display text */
  tighter: '-0.04em',
  /** Tight - for large headings (h1, h2) */
  tight: '-0.02em',
  /** Slightly tight - for medium headings (h3, h4) */
  normal: '-0.01em',
  /** Default - for body text and small headings */
  base: '0em',
  /** Slightly wide - for labels and UI text */
  wide: '0.01em',
  /** Wide - for uppercase text */
  wider: '0.05em',
  /** Very wide - for overlines and all-caps headings */
  widest: '0.1em',
} as const;

/**
 * All typography tokens combined
 */
export const typography = {
  fontFamily,
  fontSize,
  fontSizeDisplay,
  fontSizeSpecialty,
  fontWeight,
  lineHeight,
  letterSpacing,
} as const;

/* ============================================
   SPACING TOKENS
   ============================================ */

/**
 * Spacing Scale
 * Based on 4px base unit (0.25rem) for visual rhythm
 */
export const spacing = {
  /** 4px - Minimal spacing, icon gaps */
  1: '0.25rem',
  /** 8px - Tight padding, small gaps */
  2: '0.5rem',
  /** 12px - Button padding, compact layouts */
  3: '0.75rem',
  /** 16px - Default padding, standard gaps */
  4: '1rem',
  /** 20px - Medium-large padding */
  5: '1.25rem',
  /** 24px - Card padding, moderate spacing */
  6: '1.5rem',
  /** 32px - Large padding, section spacing */
  8: '2rem',
  /** 40px - Extra large padding */
  10: '2.5rem',
  /** 48px - Section vertical padding */
  12: '3rem',
  /** 64px - Large section spacing */
  16: '4rem',
  /** 80px - Extra large sections */
  20: '5rem',
  /** 96px - Hero/feature section spacing */
  24: '6rem',
} as const;

/* ============================================
   LAYOUT TOKENS
   ============================================ */

/**
 * Responsive Breakpoints
 * Standard breakpoint values for responsive design
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Container Max-Widths
 * Maximum widths for content containers at different breakpoints
 */
export const containerMaxWidth = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Content Widths
 * Specialized widths for different content types
 */
export const contentWidth = {
  /** Optimal reading width for text-heavy content (60-75 characters per line) */
  prose: '65ch',
  /** For forms, centered content - 672px */
  narrow: '42rem',
  /** For general layouts - 1200px */
  wide: '75rem',
} as const;

/**
 * All layout tokens combined
 */
export const layout = {
  breakpoints,
  containerMaxWidth,
  contentWidth,
} as const;

/* ============================================
   VISUAL EFFECT TOKENS
   ============================================ */

/**
 * Border Radius
 * Consistent rounded corners
 */
export const borderRadius = {
  /** 4px - Tight radius for badges, tags */
  sm: '0.25rem',
  /** 8px - Standard buttons, inputs */
  md: '0.5rem',
  /** 12px - Cards, panels */
  lg: '0.75rem',
  /** 16px - Large cards, hero sections */
  xl: '1rem',
  /** Fully rounded - pills, circular avatars */
  full: '9999px',
} as const;

/**
 * Transitions
 * Consistent animation timing
 */
export const transition = {
  /** 150ms - Quick interactions */
  fast: '150ms ease-in-out',
  /** 250ms - Standard animations */
  normal: '250ms ease-in-out',
  /** 350ms - Deliberate movements */
  slow: '350ms ease-in-out',
} as const;

/**
 * Shadows
 * Elevation depth for UI elements
 */
export const shadow = {
  /** Subtle depth */
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  /** Standard elevation */
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  /** High elevation */
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  /** Maximum elevation */
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

/**
 * Z-Index Scale
 * Layering order for overlapping elements
 */
export const zIndex = {
  /** Normal document flow */
  base: 0,
  /** Dropdown menus */
  dropdown: 1000,
  /** Sticky headers, navigation */
  sticky: 1100,
  /** Fixed positioned elements */
  fixed: 1200,
  /** Modal dialogs, overlays */
  modal: 1300,
  /** Popovers, tooltips (non-modal) */
  popover: 1400,
  /** Tooltips (highest priority) */
  tooltip: 1500,
} as const;

/* ============================================
   DEFAULT EXPORTS
   ============================================ */

/**
 * Complete design tokens object
 * Contains all design system values organized by category
 */
export const tokens = {
  colors,
  typography,
  spacing,
  layout,
  borderRadius,
  transition,
  shadow,
  zIndex,
} as const;

export default tokens;
