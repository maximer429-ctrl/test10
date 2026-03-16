# Design Tokens

# Colors
primary: #3B82F6 // Bright friendly blue for primary actions and CTAs
secondary: #F59E0B // Warm amber for secondary CTAs and highlights
accent: #10B981 // Vibrant green for success and positive reinforcement
background: #FFFFFF // App background
surface: #F8FAFC // Elevated surface background (cards, panels)
text-primary: #0F172A // Main UI text (high contrast)
text-muted: #64748B // Muted UI text (labels, meta)
border: #E2E8F0 // Neutral border for inputs and dividers
shadow-1: rgba(15,23,42,0.06) // Subtle shadow for small elevation
shadow-2: rgba(15,23,42,0.10) // Stronger shadow for raised elements
success: #10B981 // Success states and confirmations
warning: #F59E0B // Warnings and subtle alerts
danger: #EF4444 // Error states and destructive actions
link: #2563EB // Link color for interactive text
focus-ring: #A78BFA // Soft purple focus ring for keyboard focus
muted-fill: #EFF6FF // Soft fill for placeholders and tags

# Typography
font-family-base: Poppins, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif // Friendly rounded sans-serif
font-weight-regular: 400
font-weight-medium: 600
font-weight-bold: 700
font-size-h1: 2.25rem // ~36px
font-size-h2: 1.75rem // ~28px
font-size-h3: 1.25rem // ~20px
font-size-body: 1rem // 16px
font-size-caption: 0.875rem // 14px
line-height-tight: 1.1
line-height-normal: 1.4
line-height-relaxed: 1.6

# Spacing (px)
space-xxs: 4px
space-xs: 8px
space-s: 12px
space-m: 16px
space-l: 24px
space-xl: 32px
space-xxl: 48px

# Radii
radius-sm: 6px
radius-md: 12px
radius-lg: 18px

# Elevation
elevation-1: 0 1px 2px shadow-1
elevation-2: 0 6px 20px shadow-2

# Motion
motion-duration-fast: 150ms
motion-duration-medium: 300ms
motion-duration-slow: 500ms
motion-easing: cubic-bezier(.2,.9,.2,1)
reduced-motion: reduce // Respect prefers-reduced-motion

# Layout / Accessibility
tap-target-min: 44px // Minimum recommended dimension for touch targets
breakpoint-mobile: 640px
breakpoint-tablet: 1024px
z-index-dropdown: 900
z-index-modal: 1000
z-index-toast: 1100

# Notes
- Color tokens chosen for a playful, high-contrast palette suitable for children while meeting WCAG AA for body text on background. Use `text-primary` on `background` for main text; use `text-muted` for labels and meta.
- Use `accent` for micro-interactions/rewards; keep primary for core CTAs.
- Prefer inline SVGs for illustrations to keep them crisp and easily recolorable.
