# DESIGN_SYSTEM.md

## Overview
This design system provides the visual language and accessibility baseline for the project: a playful, colorful, and kid-friendly learning app targeted primarily at children aged 8–10. The system focuses on clarity, approachable typography, bold colors, and accessible interactions.

## Design Principles
- Playful Clarity: Visuals should be bright and friendly but never noisy — use space and clear hierarchy.
- Encourage Learning: Feedback is supportive; failure screens encourage retry/practice with positive language.
- Accessibility First: Aim for WCAG AA for text contrast and ensure keyboard and screen-reader accessibility.
- Performance-conscious: Use inline SVGs and optimized assets; keep mockups single-file and low-weight.

## Accessibility Baseline
- Target: WCAG AA for body text (contrast ratio >= 4.5:1). Use `text-primary` on `background` for readable text.
- Focus: All interactive elements must show a visible focus state using `focus-ring` token.
- Labels: Every input must have an associated visible label or `aria-label`.
- Motion: Respect `prefers-reduced-motion`; provide reduced-motion alternatives.

## Motion & Animation Policy
- Use short, celebratory motion (150–300ms) for positive feedback, with easing `motion-easing`.
- For transitions that may be jarring, provide reduced-motion alternatives (fade instead of translate/scale).
- Micro-transitions: button presses scale 0.98 for tactile feel.

## Tokens & Theming
- Tokens live in `TOKENS.md`. Use tokens as the single source of truth for colors, spacing, typography, and elevation.
- For implementation, map tokens to CSS variables (e.g., `--color-primary`, `--space-m`) in a global stylesheet.

## Component Composition Rules
- Build complex UI from documented atoms (buttons, inputs, cards). Reuse spacing tokens for consistent rhythm.
- Prioritize accessible defaults: labels, keyboard focus, and ARIA roles are required on all components.
- Reserve `accent` and `primary` for reward and CTA semantics respectively; avoid overusing both in the same view.

## Illustration & Iconography
- Style: rounded, filled shapes with limited strokes; use bright flat colors and simple shadows.
- Format: inline SVGs preferred for scaling and color-theming.
- Mascot: if added later, keep expressions simple and universally friendly.

## Breakpoints
- Mobile (default): up to `breakpoint-mobile` (640px)
- Tablet: up to `breakpoint-tablet` (1024px)
- Desktop: wider than `breakpoint-tablet`

## Mockup & Component Documentation Rules
- Every mockup must include top-of-file metadata (MOCKUP-ID, Title, Story, Design-System-Refs).
- Mockups must be single-file HTML/CSS, embed assets where practical, and reference tokens.
- Register mockups in `design-system/MOCKUPS.md` using the format `[ID]|mockup html file|status`.

## Implementation Handoff
- Provide CSS variables and a minimal component CSS module for frontend implementers.
- Include a small example page (in `mockups/`) demonstrating buttons, cards, inputs, and feedback states.

## Maintenance
- When updating tokens, revise all mockups that rely on changed tokens and mark them for review.
- Keep `COMPONENTS.md` updated with new variants (e.g., new game UI atoms) as backlog stories introduce them.

