# Component Catalogue

This document lists core components, their variants, states, and accessibility notes. Each component references tokens from `design-system/TOKENS.md`.

## Buttons
- Primary
  - Use: Primary CTA (e.g., "Play", "Try again")
  - Styles: background: `primary`; color: `background` (white); border-radius: `radius-md`; padding: `space-s` `space-m`;
  - States: hover (slightly darker, use opacity 0.95), active (scale 0.98), focus (outline using `focus-ring` 3px), disabled (opacity 0.5, `text-muted` label)
  - Accessibility: text contrast >= 4.5:1 with background; provide `aria-label` when icon-only; minimum tap area `tap-target-min`.

- Secondary
  - Use: Secondary actions (e.g., "Practice")
  - Styles: background: transparent; border: 2px solid `secondary`; color: `text-primary`; border-radius: `radius-md`;
  - States: hover (background `muted-fill`), focus: `focus-ring` outline

- Danger
  - Use: Destructive actions (e.g., "Delete", reset progress)
  - Styles: background: `danger`; color: `background`;
  - States: same focus/hover rules as primary; require confirmation for destructive flows.

- Sizes
  - Small: min-height 36px
  - Regular: min-height 44px (recommended)
  - Large: min-height 56px

## Card
- Variants: default, interactive (clickable), selectable (toggled state)
- Structure: container with `surface` background, `radius-md`, padding `space-m`, drop shadow `elevation-1`
- States: hover (elevation-2), selected (accent outline + subtle glow), disabled (reduced opacity)
- Accessibility: ensure focusable cards receive a visible focus ring and keyboard activation

## Inputs
- Text field
  - Label: use visible label above field; helper text below
  - Styles: background `background` or `muted-fill` (for filled style); border `border`; radius `radius-sm`; padding `space-s`
  - States: focus (2px `focus-ring`), error (border `danger`, error text `danger`), disabled (muted appearance)
  - Accessibility: associate label with input via `for` and `id`, use `aria-invalid` on error

- Numeric/Stepper
  - Use for simple numeric inputs in games; include increment/decrement buttons sized to `tap-target-min`

- Toggle / Checkbox / Radio
  - Use rounded, filled style with accent color for checked state; ensure labels are clickable

## Feedback Components
- Toast
  - Use for brief confirmations; position bottom-center; background `primary` or `surface` depending on content; accessible role `status` and `aria-live="polite"`.

- Inline callout (success/failure)
  - Use `success` or `danger` background/border with accessible heading and short supportive text.

## Game Atoms
- Progress Bar
  - Use accessible progress with `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow` and visible label.
  - Visual: rounded track with accent fill color showing progress; animate fill on change with `motion-duration-medium`.

- Badge / Reward
  - Small pill with `accent` or `primary` background and white text; radius `radius-lg`.

- Avatar Tile
  - Circular tile with image or initial; size variants (40px, 56px, 72px); use `surface` background and subtle border.

## Layout Tokens
- Container widths: full-bleed on mobile, constrained (max-width 980px) on desktop
- Spacing & rhythm: follow `space-*` tokens consistently for margins and paddings

## Accessibility Notes (component-level)
- Ensure all interactive components have keyboard focus and visible focus indicators.
- Provide descriptive `aria-label` or visible labels where a control's purpose may be ambiguous.
- Use `aria-live` politely for non-blocking updates (scores, hints).

## Example usage snippets
- Primary button (HTML): `<button class="btn btn-primary" aria-label="Play">Play</button>`
- Text field (HTML): `<label for="name">Name</label><input id="name" type="text" />`

