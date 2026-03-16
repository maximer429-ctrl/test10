# mockups/

Placement and file rules
- No subfolders: place mockup HTML files directly in the repository `mockups/` directory (do not create nested folders).
- No exports: do not create separate `exports/` or `assets/` folders for mockups — each mockup must be a single, self-contained HTML file.
- Mandatory design-system file: `mockups/design-system.html` must be created by the designer prior to implementation and included in the tracker.

Mockup requirements (must be followed by designers and agents)
- Token source: all tokens, type styles, and components are defined in `design-system/TOKENS.md` and `design-system/COMPONENTS.md`. Mockups must use only values from those files.
- The file `mockups/design-system.html` is the HTML rendering of the design system and must be created alongside the `design-system/` markdown files.
- Single-file and self-contained: each mockup must be a single HTML file placed in `mockups/`. The file must contain its CSS (inline `<style>` preferred) and embed assets inside the HTML where possible (inline SVG for vector art, data URIs for raster images, and base64-encoded fonts) so the file is portable. If embedding is impractical due to size or licensing, include assets as relative paths in `mockups/`.
- Static HTML/CSS only: mockups must use HTML and CSS only. No JavaScript is allowed.
- States: show all relevant states for components and screens (empty, filled, error, success, disabled, hover/active where applicable). State variations must be visible in the same HTML file in clearly labeled sections.
- Mobile-first and responsive: markup and styling must be mobile-first and adapt to larger viewports responsively.
- Accessibility: use semantic HTML, appropriate ARIA where necessary, and meaningful alt text for images. If images are embedded as data URIs, include accessible text equivalents in the markup.

How to add a mockup entry to the tracker
1. Add the mockup HTML file to `mockups/` (for example `mockups/design-system.html`).
2. Add a line to `design-system/MOCKUPS.md` in the format `[ID]|mockups/filename.html|pending`.
3. Update the status to `ready` once the reviewer checklist in `AGENTS.md` is satisfied.

