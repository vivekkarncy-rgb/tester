# Figma Integration Rules for This Workspace

Use these rules when converting Figma designs into this project so output matches the current architecture and style system.

## Tech and project shape

- Stack: vanilla `HTML + CSS + JavaScript` (no framework or bundler).
- Entry files: `index.html`, `styles.css`, `script.js`.
- UI sections are mostly semantic blocks (`header`, `main > section`, `footer`) with utility-like class naming.

## Design tokens and visual language

- Keep all core tokens in `:root` inside `styles.css`.
- Existing tokens to reuse first:
  - `--bg`
  - `--surface`
  - `--surface-border`
  - `--text`
  - `--muted`
  - `--accent`
  - `--accent-2`
- Prefer adding new variables over hardcoded values when Figma introduces new colors, spacing scales, shadows, or radii.

## Component patterns to map from Figma

- **Glass surfaces**: use `.glass-panel` as the base treatment for frosted cards and panels.
- **Primary/secondary actions**: use `.btn-primary` and `.btn-secondary`.
- **Section skeleton**: use `.section` + `.section-title`.
- **Card interactions**: add `.tilt-card` only when interactive tilt is needed.
- **Scroll reveal animation**: add `.reveal` to elements meant to animate on entry.

## Layout and responsiveness

- Desktop layout uses max width container pattern: `width: min(1120px, calc(100% - 2rem))`.
- Main breakpoint is `@media (max-width: 960px)`.
- Convert multi-column Figma layouts into:
  - grid for content areas (`.benefit-grid`, `.review-strip`, `.formula-section`)
  - single-column collapse at mobile breakpoint.

## Motion and effects mapping

- Parallax layers must use `.parallax-layer` and `data-speed` attributes.
- Entrance animations should use the existing `IntersectionObserver` reveal flow in `script.js`.
- Continuous decorative effects should use CSS keyframes (`sweep`, `spin`, `spinReverse`) before adding new JS animation code.

## Asset and icon guidance

- No asset pipeline is configured; reference static assets directly from relative paths.
- If Figma exports icons/illustrations, place them in a predictable folder (for example `assets/`) and reference via HTML/CSS URLs.
- Prefer SVG for icons and lightweight decorative graphics.

## Figma-to-code conversion rules

1. Reuse existing classes before introducing new ones.
2. Keep naming descriptive and section-scoped (similar to `formula-orb`, `review-strip`).
3. Preserve semantic HTML structure from existing page patterns.
4. Keep interactions progressive: visuals in CSS, behavior in `script.js`.
5. Do not introduce framework-specific patterns unless the project is intentionally migrated.

## Acceptance checklist for imported Figma UI

- Uses existing token variables where possible.
- Passes mobile behavior at `<= 960px`.
- Maintains readability contrast with current dark/glass theme.
- New interactive nodes are connected to existing reveal/tilt/parallax systems only when necessary.
- Avoids duplicate style primitives already covered by `.glass-panel`, buttons, and section classes.
